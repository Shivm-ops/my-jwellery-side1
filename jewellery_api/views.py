from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
import json
import uuid
from datetime import datetime
import logging

from .models import Product, CartItem, Order, ContactMessage, User

logger = logging.getLogger('jewellery_api')

def log_request(endpoint, data=None, method='GET'):
    """Helper function to log incoming requests"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f"🔄 [{timestamp}] {method} {endpoint}")
    if data:
        logger.info(f"📦 Request data: {data}")
    logger.info("-" * 50)

@api_view(['GET'])
def home(request):
    log_request('/api/home')
    return Response({"message": "Welcome to Home!"})

@api_view(['GET'])
def get_products(request):
    """Get all products"""
    log_request('/api/products')
    
    try:
        products = Product.objects.all()
        products_data = []
        
        for product in products:
            products_data.append({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': float(product.price),
                'material': product.material,
                'category': product.category,
                'imageUrl': product.imageUrl,
                'inStock': product.inStock,
                'featured': product.featured,
            })
        
        logger.info(f"✅ Retrieved {len(products_data)} products")
        
        return Response({
            "success": True,
            "products": products_data
        })
        
    except Exception as e:
        logger.error(f"❌ Error retrieving products: {str(e)}")
        return Response({
            "success": False,
            "message": "Error retrieving products"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
def contact(request):
    if request.method == 'POST':
        data = request.data
        log_request('/api/contact', data, 'POST')
        
        # Save contact message to database
        contact_msg = ContactMessage.objects.create(
            name=data.get('name', ''),
            email=data.get('email', ''),
            subject=data.get('subject', ''),
            message=data.get('message', '')
        )
        
        return Response({
            "success": True,
            "message": "Contact form submitted successfully!",
            "data": data
        })
    else:
        log_request('/api/contact')
        return Response({"message": "Contact us at contact@example.com"})

@api_view(['GET'])
def get_cart(request):
    log_request('/api/cart')
    
    # For simplicity, we'll use session-based cart
    session_key = request.session.session_key
    if not session_key:
        request.session.create()
        session_key = request.session.session_key
    
    cart_items = CartItem.objects.filter(session_id=session_key)
    total_items = sum(item.quantity for item in cart_items)
    
    return Response({
        "success": True,
        "cart": [{"productId": item.product.id, "quantity": item.quantity} for item in cart_items],
        "totalItems": total_items
    })

@api_view(['POST'])
def add_to_cart(request):
    data = request.data
    product_id = data.get('productId')
    quantity = data.get('quantity', 1)
    
    log_request('/api/cart/add', data, 'POST')
    
    try:
        # Get or create session
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        
        # Get product
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({
                "success": False,
                "message": "Product not found"
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Check if cart item already exists for this product and session
        try:
            cart_item = CartItem.objects.get(
                product=product,
                session_id=session_key
            )
            # Item exists, increment quantity
            cart_item.quantity += quantity
            cart_item.save()
            logger.info(f"🔄 Updated existing cart item: {product.name} quantity to {cart_item.quantity}")
        except CartItem.DoesNotExist:
            # Item doesn't exist, create new one
            cart_item = CartItem.objects.create(
                product=product,
                session_id=session_key,
                quantity=quantity
            )
            logger.info(f"➕ Created new cart item: {product.name} with quantity {quantity}")
        
        logger.info(f"✅ Cart operation completed: {product.name} now has quantity {cart_item.quantity}")
        
        return Response({
            "success": True,
            "productId": product_id,
            "quantity": cart_item.quantity,
            "message": f"Added {quantity} item(s) to cart"
        })
        
    except Exception as e:
        logger.error(f"❌ Error adding to cart: {str(e)}")
        return Response({
            "success": False,
            "message": "Error adding item to cart"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def update_cart(request):
    data = request.data
    product_id = data.get('productId')
    quantity = data.get('quantity')
    
    log_request('/api/cart/update', data, 'PUT')
    
    try:
        session_key = request.session.session_key
        if not session_key:
            return Response({
                "success": False,
                "message": "Session not found"
            }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            cart_item = CartItem.objects.get(
                product_id=product_id,
                session_id=session_key
            )
            cart_item.quantity = quantity
            cart_item.save()
            
            logger.info(f"✅ Updated product {product_id} quantity to {quantity}")
            
            return Response({
                "success": True,
                "productId": product_id,
                "quantity": quantity,
                "message": f"Updated quantity to {quantity}"
            })
            
        except CartItem.DoesNotExist:
            return Response({
                "success": False,
                "message": "Product not found in cart"
            }, status=status.HTTP_404_NOT_FOUND)
            
    except Exception as e:
        logger.error(f"❌ Error updating cart: {str(e)}")
        return Response({
            "success": False,
            "message": "Error updating cart item"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def remove_from_cart(request):
    data = request.data
    product_id = data.get('productId')
    
    log_request('/api/cart/remove', data, 'DELETE')
    
    try:
        session_key = request.session.session_key
        if not session_key:
            return Response({
                "success": False,
                "message": "Session not found"
            }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            cart_item = CartItem.objects.get(
                product_id=product_id,
                session_id=session_key
            )
            cart_item.delete()
            
            logger.info(f"✅ Removed product {product_id} from cart")
            
            return Response({
                "success": True,
                "productId": product_id,
                "message": "Item removed from cart"
            })
            
        except CartItem.DoesNotExist:
            return Response({
                "success": False,
                "message": "Product not found in cart"
            }, status=status.HTTP_404_NOT_FOUND)
            
    except Exception as e:
        logger.error(f"❌ Error removing from cart: {str(e)}")
        return Response({
            "success": False,
            "message": "Error removing item from cart"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def buy(request):
    data = request.data
    items = data.get('items', [])
    timestamp = data.get('timestamp')
    
    log_request('/api/buy', data, 'POST')
    
    try:
        session_key = request.session.session_key
        if not session_key:
            return Response({
                "success": False,
                "message": "Session not found"
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Calculate total
        total_amount = sum(item.get('total', 0) for item in items)
        
        # Create order
        order_id = f"ORD-{datetime.now().strftime('%Y%m%d-%H%M%S')}-{str(uuid.uuid4())[:8]}"
        
        order = Order.objects.create(
            order_id=order_id,
            items=items,
            total_amount=total_amount,
            status='completed'
        )
        
        # Clear cart after successful purchase
        CartItem.objects.filter(session_id=session_key).delete()
        
        logger.info(f"💳 Processing purchase for {len(items)} items")
        logger.info("🛒 Cart cleared after successful purchase")
        
        return Response({
            "success": True,
            "message": "Purchase completed successfully!",
            "itemsPurchased": len(items),
            "timestamp": timestamp,
            "orderId": order_id
        })
        
    except Exception as e:
        logger.error(f"❌ Error processing purchase: {str(e)}")
        return Response({
            "success": False,
            "message": "Error processing purchase"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Authentication Views
@api_view(['POST'])
@csrf_exempt
def register_user(request):
    """Register a new user"""
    data = request.data
    
    log_request('/api/auth/register', data, 'POST')
    
    try:
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        # Validate required fields
        if not all([name, email, password]):
            return Response({
                "success": False,
                "message": "Name, email, and password are required"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({
                "success": False,
                "message": "User with this email already exists"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create new user
        user = User.objects.create(
            username=email,  # Use email as username
            email=email,
            name=name,
            password=make_password(password)
        )
        
        logger.info(f"✅ New user registered: {email}")
        
        return Response({
            "success": True,
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        })
        
    except Exception as e:
        logger.error(f"❌ Error registering user: {str(e)}")
        return Response({
            "success": False,
            "message": "Error registering user"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@csrf_exempt
def login_user(request):
    """Login a user"""
    data = request.data
    
    log_request('/api/auth/login', data, 'POST')
    
    try:
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        # Validate required fields
        if not all([email, password]):
            return Response({
                "success": False,
                "message": "Email and password are required"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            logger.info(f"✅ User logged in: {email}")
            
            return Response({
                "success": True,
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
            })
        else:
            return Response({
                "success": False,
                "message": "Invalid email or password"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
    except Exception as e:
        logger.error(f"❌ Error logging in user: {str(e)}")
        return Response({
            "success": False,
            "message": "Error logging in user"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@csrf_exempt
def logout_user(request):
    """Logout a user"""
    log_request('/api/auth/logout', {}, 'POST')
    
    try:
        logout(request)
        logger.info("✅ User logged out")
        
        return Response({
            "success": True,
            "message": "Logout successful"
        })
        
    except Exception as e:
        logger.error(f"❌ Error logging out user: {str(e)}")
        return Response({
            "success": False,
            "message": "Error logging out user"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

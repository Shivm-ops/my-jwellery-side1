from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure logging to show requests in console
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# In-memory cart storage (in production, use a database)
cart_items = {}

def log_request(endpoint, data=None):
    """Helper function to log incoming requests"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f"🔄 [{timestamp}] {request.method} {endpoint}")
    if data:
        logger.info(f"📦 Request data: {data}")
    logger.info(f"🌐 IP: {request.remote_addr}")
    logger.info("-" * 50)

@app.route('/api/home', methods=['GET'])
def home():
    log_request('/api/home')
    return jsonify({"message": "Welcome to Home!"})

@app.route('/api/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        data = request.get_json()
        log_request('/api/contact', data)
        return jsonify({
            "success": True, 
            "message": "Contact form submitted successfully!",
            "data": data
        })
    else:
        log_request('/api/contact')
        return jsonify({"message": "Contact us at contact@example.com"})

@app.route('/api/cart', methods=['GET'])
def get_cart():
    log_request('/api/cart')
    return jsonify({
        "success": True,
        "cart": cart_items,
        "totalItems": sum(item['quantity'] for item in cart_items.values())
    })

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('productId')
    quantity = data.get('quantity', 1)
    
    log_request('/api/cart/add', data)
    
    if product_id in cart_items:
        cart_items[product_id]['quantity'] += quantity
    else:
        cart_items[product_id] = {
            'productId': product_id,
            'quantity': quantity,
            'addedAt': datetime.now().isoformat()
        }
    
    logger.info(f"✅ Added {quantity}x of product {product_id} to cart")
    
    return jsonify({
        "success": True,
        "productId": product_id,
        "quantity": cart_items[product_id]['quantity'],
        "message": f"Added {quantity} item(s) to cart"
    })

@app.route('/api/cart/update', methods=['PUT'])
def update_cart():
    data = request.get_json()
    product_id = data.get('productId')
    quantity = data.get('quantity')
    
    log_request('/api/cart/update', data)
    
    if product_id in cart_items:
        cart_items[product_id]['quantity'] = quantity
        logger.info(f"✅ Updated product {product_id} quantity to {quantity}")
        return jsonify({
            "success": True,
            "productId": product_id,
            "quantity": quantity,
            "message": f"Updated quantity to {quantity}"
        })
    else:
        return jsonify({
            "success": False,
            "message": "Product not found in cart"
        }), 404

@app.route('/api/cart/remove', methods=['DELETE'])
def remove_from_cart():
    data = request.get_json()
    product_id = data.get('productId')
    
    log_request('/api/cart/remove', data)
    
    if product_id in cart_items:
        del cart_items[product_id]
        logger.info(f"✅ Removed product {product_id} from cart")
        return jsonify({
            "success": True,
            "productId": product_id,
            "message": "Item removed from cart"
        })
    else:
        return jsonify({
            "success": False,
            "message": "Product not found in cart"
        }), 404

@app.route('/api/buy', methods=['POST'])
def buy():
    data = request.get_json()
    items = data.get('items', [])
    timestamp = data.get('timestamp')
    
    log_request('/api/buy', data)
    
    # Simulate purchase logic
    total_items = len(items)
    logger.info(f"💳 Processing purchase for {total_items} items")
    
    # Clear cart after successful purchase
    cart_items.clear()
    logger.info("🛒 Cart cleared after successful purchase")
    
    return jsonify({
        "success": True,
        "message": "Purchase completed successfully!",
        "itemsPurchased": total_items,
        "timestamp": timestamp,
        "orderId": f"ORD-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    })

if __name__ == '__main__':
    app.run(port=5000)
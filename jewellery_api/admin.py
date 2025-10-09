from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Product, CartItem, Order, ContactMessage, User

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'category', 'inStock', 'featured', 'created_at']
    list_filter = ['category', 'inStock', 'featured', 'created_at']
    search_fields = ['name', 'description', 'material']
    ordering = ['-created_at']

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['product', 'quantity', 'session_id', 'updated_at', 'created_at']
    list_filter = ['updated_at', 'created_at']
    search_fields = ['product__name', 'session_id']
    ordering = ['-updated_at']  # Show most recently updated first

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'total_amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['order_id']
    readonly_fields = ['order_id', 'created_at']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['email', 'name', 'is_staff', 'is_active', 'date_joined']
    list_filter = ['is_staff', 'is_active', 'date_joined']
    search_fields = ['email', 'name']
    ordering = ['email']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

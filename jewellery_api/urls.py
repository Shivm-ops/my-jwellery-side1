from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('products/', views.get_products, name='get_products'),
    path('contact/', views.contact, name='contact'),
    path('cart/', views.get_cart, name='get_cart'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/update/', views.update_cart, name='update_cart'),
    path('cart/remove/', views.remove_from_cart, name='remove_from_cart'),
    path('buy/', views.buy, name='buy'),
    # Authentication URLs
    path('auth/register/', views.register_user, name='register_user'),
    path('auth/login/', views.login_user, name='login_user'),
    path('auth/logout/', views.logout_user, name='logout_user'),
]

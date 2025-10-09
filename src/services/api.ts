const API_BASE_URL = 'http://localhost:8000/api';

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartRequest {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartRequest {
  productId: string;
}

// API service functions
export const apiService = {
  // Add item to cart
  addToCart: async (productId: string, quantity: number = 1): Promise<any> => {
    console.log(`🛒 Adding to cart: Product ${productId}, Quantity: ${quantity}`);
    
    const response = await fetch(`${API_BASE_URL}/cart/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add item to cart: ${response.statusText}`);
    }

    return response.json();
  },

  // Update cart item quantity
  updateCartItem: async (productId: string, quantity: number): Promise<any> => {
    console.log(`📝 Updating cart: Product ${productId}, New Quantity: ${quantity}`);
    
    const response = await fetch(`${API_BASE_URL}/cart/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update cart item: ${response.statusText}`);
    }

    return response.json();
  },

  // Remove item from cart
  removeFromCart: async (productId: string): Promise<any> => {
    console.log(`🗑️ Removing from cart: Product ${productId}`);
    
    const response = await fetch(`${API_BASE_URL}/cart/remove/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to remove item from cart: ${response.statusText}`);
    }

    return response.json();
  },

  // Get cart contents
  getCart: async (): Promise<any> => {
    console.log('📦 Fetching cart contents');
    
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    return response.json();
  },

  // Purchase items
  purchase: async (cartItems: any[]): Promise<any> => {
    console.log(`💳 Processing purchase for ${cartItems.length} items`);
    
    const response = await fetch(`${API_BASE_URL}/buy/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to process purchase: ${response.statusText}`);
    }

    return response.json();
  },

  // Contact form submission
  contact: async (contactData: any): Promise<any> => {
    console.log('📧 Submitting contact form');
    
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit contact form: ${response.statusText}`);
    }

    return response.json();
  },

  // Get all products
  getProducts: async (): Promise<any> => {
    console.log('🛍️ Fetching products');
    
    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return response.json();
  },
};

// @ts-nocheck

import { useState, useEffect } from 'react'
import './App.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import hoodie from './assets/ryuji_hoodie.jpg'
import keyboard from './assets/mechanical_keyboard.jpg'
import backpack from './assets/backpack.png'
import wireless from './assets/wireless.jpg'
import sneakers from './assets/sneakers.png'
import feet from './assets/feet.png'

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
  rating: number
  stock: number
}

interface CartItem extends Product {
  quantity: number
}

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
}

interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
}

import ProvidenceAgent from 'agent';

const agent = new ProvidenceAgent({
  backendUrl: 'http://localhost:5001/api/record',
  projectID: 'cfc15e83-970b-42cd-989f-b87b785a1fd4',
  // debug: true,
  onEventRecorded: (event) => {
    // console.log('Event recorded:', event);
  },
});


function App() {
  // Your existing products array (keep exactly as is)
  const products: Product[] = [
    {
      id: 1,
      name: 'Premium Laptop',
      price: 999.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      description: 'High-performance laptop with the latest specifications',
      rating: 4.5,
      stock: 10
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics',
      price: 99.99,
      description: 'Noise-cancelling wireless headphones with premium sound',
      rating: 4.3,
      stock: 15
    },
    {
      id: 3,
      name: 'Mouse',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
      category: 'Electronics',
      price: 29.99,
      description: 'High-precision gaming mouse with RGB lighting',
      rating: 4.7,
      stock: 20
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      image: keyboard,
      category: 'Electronics',
      price: 59.99,
      description: 'Mechanical gaming keyboard with customizable backlighting',
      rating: 4.4,
      stock: 12
    },
    {
      id: 5,
      name: 'Premium T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      category: 'Clothing',
      price: 19.99,
      description: 'Comfortable cotton t-shirt with modern design',
      rating: 4.2,
      stock: 25
    },
    {
      id: 6,
      name: 'Designer Jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
      category: 'Clothing',
      price: 49.99,
      description: 'Stylish denim jeans with perfect fit',
      rating: 4.6,
      stock: 18
    },
    {
      id: 7,
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      category: 'Electronics',
      price: 199.99,
      description: 'Feature-rich smartwatch with health tracking',
      rating: 4.8,
      stock: 14
    },
    {
      id: 8,
      name: 'Running Shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      category: 'Footwear',
      price: 79.99,
      description: 'Comfortable running shoes with advanced cushioning',
      rating: 4.5,
      stock: 22
    },
    {
      id: 9,
      name: 'Bluetooth Speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
      category: 'Electronics',
      price: 39.99,
      description: 'Portable speaker with rich bass and clear sound',
      rating: 4.1,
      stock: 30
    },
    {
      id: 10,
      name: 'Winter Jacket',
      image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543',
      category: 'Clothing',
      price: 89.99,
      description: 'Warm winter jacket with water-resistant coating',
      rating: 4.4,
      stock: 16
    },
    {
      id: 11,
      name: 'Tablet',
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764',
      category: 'Electronics',
      price: 299.99,
      description: '10-inch tablet with high-resolution display',
      rating: 4.6,
      stock: 8
    },
    {
      id: 12,
      name: 'Dress Shoes',
      image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1',
      category: 'Footwear',
      price: 69.99,
      description: 'Classic leather dress shoes for formal occasions',
      rating: 4.3,
      stock: 20
    },
    {
      id: 13,
      name: 'Digital Camera',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      category: 'Electronics',
      price: 449.99,
      description: 'Professional digital camera with 4K video',
      rating: 4.7,
      stock: 5
    },
    {
      id: 14,
      name: 'Hoodie',
      image: hoodie,
      category: 'Clothing',
      price: 34.99,
      description: 'Comfortable cotton hoodie for casual wear',
      rating: 4.2,
      stock: 28
    },
    {
      id: 15,
      name: 'Gaming Console',
      image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128',
      category: 'Electronics',
      price: 399.99,
      description: 'Next-gen gaming console with 4K graphics',
      rating: 4.9,
      stock: 7
    },
    {
      id: 16,
      name: 'Sneakers',
      image: sneakers,
      category: 'Footwear',
      price: 59.99,
      description: 'Casual sneakers with modern design',
      rating: 4.4,
      stock: 24
    },
    {
      id: 17,
      name: 'Earbuds',
      image: wireless,
      category: 'Electronics',
      price: 79.99,
      description: 'True wireless earbuds with long battery life',
      rating: 4.5,
      stock: 18
    },
    {
      id: 18,
      name: 'Backpack',
      image: backpack,
      category: 'Accessories',
      price: 44.99,
      description: 'Durable backpack with laptop compartment',
      rating: 4.3,
      stock: 32
    },
    {
      id: 19,
      name: 'Summer Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      category: 'Clothing',
      price: 39.99,
      description: 'Light and comfortable summer dress',
      rating: 4.4,
      stock: 21
    },
    {
      id: 20,
      name: 'Fitness Tracker',
      image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3',
      category: 'Electronics',
      price: 49.99,
      description: 'Smart fitness tracker with heart rate monitoring',
      rating: 4.6,
      stock: 25
    },
    {
      id: 21,
      name: 'Feet Pics',
      image: feet,
      category: 'Top Secret',
      price: 549.99,
      description: 'Picks of feet',
      rating: 1.4,
      stock: 1
    }
  ]

  // Existing state
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sortBy, setSortBy] = useState('name')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // New checkout state
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [showCheckout, setShowCheckout] = useState(false)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  })
  const [orderProcessing, setOrderProcessing] = useState(false)
  const [inventory, setInventory] = useState<{ [key: number]: number }>({}) 

  useEffect(() => {
    const startRecording = () => {
      console.log('App loaded');
      agent.startRecord();
    };

    if (document.readyState === 'complete') {
      startRecording();
    } else {
      window.addEventListener('load', startRecording);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('load', startRecording);
      agent.stopRecord();
    };
  }, []);

  useEffect(() => {
    const initialInventory = products.reduce((acc, product) => {
      acc[product.id] = product.stock
      return acc
    }, {} as { [key: number]: number })
    setInventory(initialInventory)
  }, [])

  // Existing useEffect hooks
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode)
  }, [isDarkMode])

  // Your existing filter and sort logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPriceRange = () => {
      switch (priceRange) {
        case 'under25': return product.price < 25
        case '25to50': return product.price >= 25 && product.price <= 50
        case 'over50': return product.price > 50
        default: return true
      }
    }
    return matchesSearch && matchesCategory && matchesPriceRange()
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name)
      case 'priceLow': return a.price - b.price
      case 'priceHigh': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return 0
    }
  })

  const addToCart = (product: Product) => {
    if (!inventory[product.id]) {
      toast.error('Sorry, this item is out of stock!')
      return
    }
  
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        if (existingItem.quantity >= inventory[product.id]) {
          toast.warning('Maximum available quantity reached!')
          return prevCart
        }
        toast.success('Item quantity updated in cart!')
        setInventory(prev => ({
          ...prev,
          [product.id]: prev[product.id] - 1
        }))
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      toast.success('Item added to cart!')
      setInventory(prev => ({
        ...prev,
        [product.id]: prev[product.id] - 1
      }))
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === productId)
      if (item) {
        setInventory(prev => ({
          ...prev,
          [productId]: prev[productId] + item.quantity
        }))
      }
      return prevCart.filter(item => item.id !== productId)
    })
    toast.info('Item removed from cart')
  }

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change
          if (change > 0) {
            if (inventory[productId] < 1) {
              toast.warning('Maximum available quantity reached!')
              return item
            }
            setInventory(prev => ({
              ...prev,
              [productId]: prev[productId] - 1
            }))
          } else {
            setInventory(prev => ({
              ...prev,
              [productId]: prev[productId] + 1
            }))
          }
          if (newQuantity < 1) {
            toast.info('Item removed from cart')
            return item
          }
          return { ...item, quantity: newQuantity }
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  // New checkout functions
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateShippingInfo()) {
      setCheckoutStep(1)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePaymentInfo()) {
      setOrderProcessing(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        // Don't restore inventory on successful checkout
        toast.success('Order placed successfully!')
        setCart([])
        setCheckoutStep(2)
      } catch (error) {
        // Restore inventory if checkout fails
        cart.forEach(item => {
          setInventory(prev => ({
            ...prev,
            [item.id]: prev[item.id] + item.quantity
          }))
        })
        toast.error('Error processing order')
      } finally {
        setOrderProcessing(false)
      }
    } else {
      toast.error('Please fill in all payment details')
    }
  }

  const validateShippingInfo = (): boolean => {
    const { firstName, lastName, email, address, city, state, zipCode, phone } = shippingInfo
    return !!(firstName && lastName && email && address && city && state && zipCode && phone)
  }

  const validatePaymentInfo = (): boolean => {
    const { cardNumber, cardName, expiry, cvv } = paymentInfo
    return !!(cardNumber && cardName && expiry && cvv)
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
  }

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{0,2})/, '$1/$2')
  }

  // Modified checkout function
  const checkout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    setShowCheckout(true)
    setShowCart(false)
  }

  const categories = ['all', ...new Set(products.map(p => p.category))]
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>Ye Olde Shop</h1>
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button 
              className="cart-button"
              onClick={() => setShowCart(!showCart)}
            >
              🛒 ({totalItems})
            </button>
          </div>
        </div>
      </header>

      {!showCheckout ? (
        <>
          <div className="filters">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under25">Under $25</option>
              <option value="25to50">$25 to $50</option>
              <option value="over50">Over $50</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="main-content">
            <div className="products">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onClick={() => setSelectedProduct(product)}
                  />
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <div className="product-details">
                    <span className="category">{product.category}</span>
                    <span className="rating">★ {product.rating}</span>
                  </div>
                  <p className="stock">
                    {inventory[product.id] > 0 
                      ? `${inventory[product.id]} in stock` 
                      : 'Out of stock'
                    }
                  </p>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={inventory[product.id] === 0}
                  >
                    {inventory[product.id] === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>

            {showCart && (
              <div className="cart">
                <div className="cart-header">
                  <h2>Shopping Cart</h2>
                  <button 
                    className="close-cart"
                    onClick={() => setShowCart(false)}
                  >
                    ×
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                          <h3>{item.name}</h3>
                          <p className="item-price">${item.price}</p>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                          <p className="item-total">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="remove-button"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="cart-total">
                      <div className="total-details">
                        <p>Items: {totalItems}</p>
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                      </div>
                      <button 
                        className="checkout-button"
                        onClick={checkout}
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="checkout-container">
          <div className="checkout-steps">
            {['Shipping', 'Payment', 'Confirmation'].map((step, index) => (
              <div 
                key={step} 
                className={`step ${index === checkoutStep ? 'active' : ''} ${index < checkoutStep ? 'completed' : ''}`}
              >
                <div className="step-number">{index < checkoutStep ? '✓' : index + 1}</div>
                <div className="step-title">{step}</div>
              </div>
            ))}
          </div>

          <div className="checkout-content">
            {checkoutStep === 0 && (
              <form onSubmit={handleShippingSubmit} className="checkout-form">
                <h3>Shipping Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={e => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={e => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={e => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={e => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={e => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="checkout-button">Continue to Payment</button>
              </form>
            )}

            {checkoutStep === 1 && (
              <form onSubmit={handlePaymentSubmit} className="checkout-form">
                <h3>Payment Information</h3>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={e => setPaymentInfo({ 
                      ...paymentInfo, 
                      cardNumber: formatCardNumber(e.target.value) 
                    })}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    value={paymentInfo.cardName}
                    onChange={e => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={paymentInfo.expiry}
                      onChange={e => setPaymentInfo({ 
                        ...paymentInfo, 
                        expiry: formatExpiry(e.target.value) 
                      })}
                      maxLength={5}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      value={paymentInfo.cvv}
                      onChange={e => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="checkout-button"
                  disabled={orderProcessing}
                >
                  {orderProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            )}

            {checkoutStep === 2 && (
              <div className="order-confirmation">
                <div className="success-animation">✓</div>
                <h3>Order Confirmed!</h3>
                <p>Thank you for your purchase.</p>
                <p>Order confirmation has been sent to: {shippingInfo.email}</p>
                <button 
                  onClick={() => {
                    setShowCheckout(false)
                    setCheckoutStep(0)
                  }}
                  className="continue-shopping"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {totalPrice > 100 ? 
                  'Free' : 
                  '$10.00'
                }
              </span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>
                ${(totalPrice + (totalPrice > 100 ? 0 : 10) + (totalPrice * 0.08)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p className="modal-price">${selectedProduct.price}</p>
            <p className="modal-description">{selectedProduct.description}</p>
            <div className="modal-details">
              <p>Category: {selectedProduct.category}</p>
              <p>Rating: ★ {selectedProduct.rating}</p>
              <p>Stock: {selectedProduct.stock}</p>
            </div>
            <button 
              onClick={() => {
                addToCart(selectedProduct)
                setSelectedProduct(null)
              }}
              disabled={selectedProduct.stock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App
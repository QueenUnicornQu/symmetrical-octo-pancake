import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ShoppingCart, Star, Search, Menu, User, Heart, Truck, Shield, Zap, TrendingUp, Package, Globe, ExternalLink } from 'lucide-react'
import './App.css'

// Import analytics functions
import {
  trackPageView,
  trackProductView,
  trackAddToCart,
  trackAddToWishlist,
  trackSearch,
  trackCategoryFilter,
  trackButtonClick,
  trackProductClick,
  trackExternalLink,
  trackFormSubmission,
  trackEngagement
} from './utils/analytics.js'

// Trending products data with real marketplace links
const trendingProducts = [
  {
    id: 1,
    name: "Bakuchiol Serum",
    category: "Skincare",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 2847,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Plant-Based Retinol Alternative",
    description: "Natural retinol alternative that provides anti-aging benefits without irritation. Perfect for sensitive skin.",
    links: {
      amazon: "https://amazon.com/dp/B08XXXXX",
      shopify: "https://your-store.myshopify.com/products/bakuchiol-serum",
      ebay: "https://ebay.com/itm/bakuchiol-serum",
      etsy: "https://etsy.com/listing/bakuchiol-serum"
    }
  },
  {
    id: 2,
    name: "Toe Spacers",
    category: "Health & Wellness",
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviews: 1523,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Foot Health",
    description: "Gel toe separators for bunion relief and improved foot alignment. Comfortable for daily wear.",
    links: {
      amazon: "https://amazon.com/dp/B09XXXXX",
      shopify: "https://your-store.myshopify.com/products/toe-spacers",
      ebay: "https://ebay.com/itm/toe-spacers",
      etsy: "https://etsy.com/listing/toe-spacers"
    }
  },
  {
    id: 3,
    name: "ADHD Support Supplement",
    category: "Supplements",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 892,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Cognitive Support",
    description: "Natural supplement blend designed to support focus and attention. Made with premium ingredients.",
    links: {
      amazon: "https://amazon.com/dp/B07XXXXX",
      shopify: "https://your-store.myshopify.com/products/adhd-supplement",
      ebay: "https://ebay.com/itm/adhd-supplement",
      etsy: "https://etsy.com/listing/adhd-supplement"
    }
  },
  {
    id: 4,
    name: "Padel Racket",
    category: "Sports",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 456,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Fastest Growing Sport",
    description: "Professional padel racket perfect for beginners and intermediate players. Lightweight and durable.",
    links: {
      amazon: "https://amazon.com/dp/B06XXXXX",
      shopify: "https://your-store.myshopify.com/products/padel-racket",
      ebay: "https://ebay.com/itm/padel-racket",
      etsy: "https://etsy.com/listing/padel-racket"
    }
  },
  {
    id: 5,
    name: "Mushroom Chocolate",
    category: "Health Food",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviews: 1234,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Functional Food",
    description: "Delicious chocolate infused with functional mushrooms for cognitive support and energy.",
    links: {
      amazon: "https://amazon.com/dp/B05XXXXX",
      shopify: "https://your-store.myshopify.com/products/mushroom-chocolate",
      ebay: "https://ebay.com/itm/mushroom-chocolate",
      etsy: "https://etsy.com/listing/mushroom-chocolate"
    }
  },
  {
    id: 6,
    name: "Bamboo Baby Pajamas",
    category: "Baby & Kids",
    price: 32.99,
    originalPrice: 45.99,
    rating: 4.8,
    reviews: 678,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Eco-Friendly",
    description: "Ultra-soft bamboo pajamas for babies. Hypoallergenic and temperature regulating.",
    links: {
      amazon: "https://amazon.com/dp/B04XXXXX",
      shopify: "https://your-store.myshopify.com/products/bamboo-pajamas",
      ebay: "https://ebay.com/itm/bamboo-pajamas",
      etsy: "https://etsy.com/listing/bamboo-pajamas"
    }
  },
  {
    id: 7,
    name: "Niacinamide Body Lotion",
    category: "Skincare",
    price: 16.99,
    originalPrice: 24.99,
    rating: 4.6,
    reviews: 2145,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Vitamin B3",
    description: "Nourishing body lotion with niacinamide to improve skin texture and hydration.",
    links: {
      amazon: "https://amazon.com/dp/B03XXXXX",
      shopify: "https://your-store.myshopify.com/products/niacinamide-lotion",
      ebay: "https://ebay.com/itm/niacinamide-lotion",
      etsy: "https://etsy.com/listing/niacinamide-lotion"
    }
  },
  {
    id: 8,
    name: "Creatine Gummies",
    category: "Fitness",
    price: 28.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviews: 1876,
    image: "/api/placeholder/300/300",
    trending: true,
    badge: "Easy to Take",
    description: "Convenient creatine gummies for muscle building and performance. Great taste, no mixing required.",
    links: {
      amazon: "https://amazon.com/dp/B02XXXXX",
      shopify: "https://your-store.myshopify.com/products/creatine-gummies",
      ebay: "https://ebay.com/itm/creatine-gummies",
      etsy: "https://etsy.com/listing/creatine-gummies"
    }
  }
]

const categories = [
  "All Products",
  "Skincare",
  "Health & Wellness", 
  "Supplements",
  "Sports",
  "Health Food",
  "Baby & Kids",
  "Fitness"
]

const platforms = [
  { name: "Amazon", icon: "📦", color: "bg-orange-500" },
  { name: "Shopify", icon: "🛍️", color: "bg-green-500" },
  { name: "eBay", icon: "🔨", color: "bg-blue-500" },
  { name: "Etsy", icon: "🎨", color: "bg-purple-500" }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Track page view on component mount
  useEffect(() => {
    trackPageView('Home Page', window.location.href);
    
    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent % 25 === 0 && scrollPercent > 0) {
        trackEngagement('scroll', 'engagement', `${scrollPercent}%`, scrollPercent);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = trendingProducts.filter(product => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product) => {
    setCart([...cart, product])
    trackAddToCart(product)
    trackButtonClick('Add to Cart', `Product: ${product.name}`)
  }

  const toggleWishlist = (productId) => {
    const product = trendingProducts.find(p => p.id === productId)
    const isAdding = !wishlist.includes(productId)
    
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
    
    if (isAdding && product) {
      trackAddToWishlist(product)
      trackButtonClick('Add to Wishlist', `Product: ${product.name}`)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    if (value.length > 2) {
      trackSearch(value, selectedCategory !== "All Products" ? selectedCategory : null)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    trackCategoryFilter(category)
    trackButtonClick('Category Filter', category)
  }

  const handleProductClick = (product, platform = null) => {
    trackProductView(product)
    trackProductClick(product, selectedCategory, filteredProducts.indexOf(product))
    
    if (platform && product.links[platform.toLowerCase()]) {
      trackExternalLink(product.links[platform.toLowerCase()], `${product.name} - ${platform}`)
      window.open(product.links[platform.toLowerCase()], '_blank')
    } else {
      setSelectedProduct(product)
    }
  }

  const handlePlatformClick = (product, platform) => {
    const platformKey = platform.toLowerCase()
    if (product.links[platformKey]) {
      trackExternalLink(product.links[platformKey], `${product.name} - ${platform}`)
      trackButtonClick(`Shop on ${platform}`, `Product: ${product.name}`)
      window.open(product.links[platformKey], '_blank')
    }
  }

  const handleNewsletterSubmit = (email) => {
    trackFormSubmission('Newsletter Signup', true)
    trackButtonClick('Newsletter Subscribe', 'Footer')
    // Add newsletter signup logic here
  }

  const scrollToProducts = () => {
    trackButtonClick('Shop Trending Products', 'Hero Section')
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dropship Empire
                </h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search trending products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => trackButtonClick('Account', 'Header')}
              >
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => trackButtonClick('Wishlist', 'Header')}
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="relative"
                onClick={() => trackButtonClick('Cart', 'Header')}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <TrendingUp className="h-4 w-4 mr-2" />
              2025's Hottest Products
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover What's
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Trending Now
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
              From viral TikTok products to Amazon bestsellers - we've curated the most popular items that everyone's talking about
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
                onClick={scrollToProducts}
              >
                <Zap className="h-5 w-5 mr-2" />
                Shop Trending Products
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
                onClick={() => trackButtonClick('View All Platforms', 'Hero Section')}
              >
                <Globe className="h-5 w-5 mr-2" />
                View All Platforms
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free worldwide shipping on all trending products</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">30-day money-back guarantee on all purchases</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always Trending</h3>
              <p className="text-gray-600">Updated weekly with the latest viral products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {selectedCategory === "All Products" ? "Trending Products" : selectedCategory}
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked products that are taking the world by storm
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div 
                      className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                    {product.trending && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {product.badge}
                  </Badge>
                  <CardTitle 
                    className="text-lg mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                    onClick={() => handleProductClick(product)}
                  >
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-3">
                    {product.category}
                  </CardDescription>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  {/* Platform Links */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.name}
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 h-auto"
                        onClick={() => handlePlatformClick(product, platform.name)}
                      >
                        <span className="mr-1">{platform.icon}</span>
                        {platform.name}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integration */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Available on All Major Platforms</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Our products are available across multiple marketplaces to ensure maximum reach and convenience
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platforms.map((platform) => (
              <div 
                key={platform.name}
                className="bg-white/10 rounded-lg p-6 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all"
                onClick={() => trackButtonClick(`Platform: ${platform.name}`, 'Platform Section')}
              >
                <div className="text-4xl mb-2">{platform.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                <p className="text-gray-300 text-sm">
                  {platform.name === 'Shopify' && 'Premium store experience'}
                  {platform.name === 'Amazon' && 'Global marketplace reach'}
                  {platform.name === 'eBay' && 'Auction & fixed price'}
                  {platform.name === 'Etsy' && 'Handmade & unique items'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold">Dropship Empire</h3>
              </div>
              <p className="text-gray-400">
                Your one-stop destination for the hottest trending products of 2025.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors"
                    onClick={() => trackButtonClick('About Us', 'Footer')}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors"
                    onClick={() => trackButtonClick('Contact', 'Footer')}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors"
                    onClick={() => trackButtonClick('Shipping Info', 'Footer')}
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors"
                    onClick={() => trackButtonClick('Returns', 'Footer')}
                  >
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(1).map((category) => (
                  <li key={category}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-colors"
                      onClick={() => {
                        handleCategoryChange(category)
                        trackButtonClick(`Category: ${category}`, 'Footer')
                        scrollToProducts()
                      }}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">
                Stay updated with the latest trending products
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter email" 
                  className="bg-gray-800 border-gray-700"
                  id="newsletter-email"
                />
                <Button 
                  size="sm"
                  onClick={() => {
                    const email = document.getElementById('newsletter-email').value
                    if (email) {
                      handleNewsletterSubmit(email)
                    }
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Dropship Empire. All rights reserved. Built for maximum conversions across all platforms.</p>
            <p className="mt-2 text-sm">
              Google Analytics tracking enabled for comprehensive business insights and optimization.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
                
                <div>
                  <Badge className="mb-2">{selectedProduct.badge}</Badge>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(selectedProduct.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {selectedProduct.rating} ({selectedProduct.reviews.toLocaleString()})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="text-3xl font-bold text-green-600">
                      ${selectedProduct.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${selectedProduct.originalPrice}
                    </span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold">Available on:</h4>
                    {platforms.map((platform) => (
                      <Button
                        key={platform.name}
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => handlePlatformClick(selectedProduct, platform.name)}
                      >
                        <span className="flex items-center">
                          <span className="mr-2">{platform.icon}</span>
                          Shop on {platform.name}
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => {
                      addToCart(selectedProduct)
                      setSelectedProduct(null)
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App


// Google Analytics 4 (GA4) Integration
// This file contains all analytics tracking functions for the dropshipping store

// Initialize Google Analytics
export const initGA = (measurementId) => {
  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href
  });
};

// Track page views
export const trackPageView = (page_title, page_location) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title,
      page_location
    });
  }
};

// Track product views
export const trackProductView = (product) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1
      }]
    });
  }
};

// Track add to cart events
export const trackAddToCart = (product, quantity = 1) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity
      }]
    });
  }
};

// Track remove from cart events
export const trackRemoveFromCart = (product, quantity = 1) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'remove_from_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity
      }]
    });
  }
};

// Track wishlist events
export const trackAddToWishlist = (product) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'add_to_wishlist', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1
      }]
    });
  }
};

// Track search events
export const trackSearch = (searchTerm, category = null) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      ...(category && { search_category: category })
    });
  }
};

// Track category filter events
export const trackCategoryFilter = (category) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'filter_category', {
      category: category,
      event_category: 'engagement',
      event_label: 'product_filter'
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      event_category: 'engagement',
      event_label: buttonName,
      event_location: location
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_submit', {
      event_category: 'engagement',
      event_label: formName,
      success: success
    });
  }
};

// Track purchases (for future e-commerce integration)
export const trackPurchase = (transactionId, items, value) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    });
  }
};

// Track begin checkout
export const trackBeginCheckout = (items, value) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: value,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    });
  }
};

// Track user engagement
export const trackEngagement = (action, category, label, value) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Track custom events
export const trackCustomEvent = (eventName, parameters) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }
};

// Track user properties
export const setUserProperties = (properties) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      user_properties: properties
    });
  }
};

// Track conversion events
export const trackConversion = (conversionName, value = null) => {
  if (typeof window.gtag !== 'undefined') {
    const eventData = {
      event_category: 'conversion',
      event_label: conversionName
    };
    
    if (value !== null) {
      eventData.value = value;
      eventData.currency = 'USD';
    }
    
    window.gtag('event', 'conversion', eventData);
  }
};

// Enhanced E-commerce tracking for product lists
export const trackProductList = (listName, products, listPosition = null) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_item_list', {
      item_list_name: listName,
      items: products.map((product, index) => ({
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        index: listPosition || index
      }))
    });
  }
};

// Track product clicks from lists
export const trackProductClick = (product, listName, position) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'select_item', {
      item_list_name: listName,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        index: position
      }]
    });
  }
};

// Track social media shares
export const trackSocialShare = (platform, url, contentType) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'share', {
      method: platform,
      content_type: contentType,
      item_id: url
    });
  }
};

// Track video interactions
export const trackVideoInteraction = (action, videoTitle, progress = null) => {
  if (typeof window.gtag !== 'undefined') {
    const eventData = {
      event_category: 'video',
      event_label: videoTitle,
      action: action
    };
    
    if (progress !== null) {
      eventData.progress = progress;
    }
    
    window.gtag('event', 'video_interaction', eventData);
  }
};

// Track file downloads
export const trackFileDownload = (fileName, fileType) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'file_download', {
      event_category: 'engagement',
      event_label: fileName,
      file_type: fileType
    });
  }
};

// Track external link clicks
export const trackExternalLink = (url, linkText) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      link_text: linkText,
      transport_type: 'beacon'
    });
  }
};

// Track newsletter signups
export const trackNewsletterSignup = (email, source) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'sign_up', {
      method: 'email',
      event_category: 'engagement',
      event_label: source,
      user_email: email
    });
  }
};

// Track error events
export const trackError = (errorMessage, errorLocation, errorType = 'javascript') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      error_location: errorLocation,
      error_type: errorType
    });
  }
};

// Track performance metrics
export const trackPerformance = (metricName, value, unit = 'ms') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'timing_complete', {
      name: metricName,
      value: value,
      event_category: 'performance',
      unit: unit
    });
  }
};

// Track user demographics (when available)
export const trackUserDemographics = (age, gender, interests) => {
  if (typeof window.gtag !== 'undefined') {
    const userProperties = {};
    
    if (age) userProperties.age_group = age;
    if (gender) userProperties.gender = gender;
    if (interests) userProperties.interests = interests;
    
    setUserProperties(userProperties);
  }
};

// Track session quality metrics
export const trackSessionQuality = (timeOnSite, pagesViewed, bounceRate) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'session_quality', {
      event_category: 'engagement',
      time_on_site: timeOnSite,
      pages_viewed: pagesViewed,
      bounce_rate: bounceRate
    });
  }
};

export default {
  initGA,
  trackPageView,
  trackProductView,
  trackAddToCart,
  trackRemoveFromCart,
  trackAddToWishlist,
  trackSearch,
  trackCategoryFilter,
  trackButtonClick,
  trackScrollDepth,
  trackFormSubmission,
  trackPurchase,
  trackBeginCheckout,
  trackEngagement,
  trackCustomEvent,
  setUserProperties,
  trackConversion,
  trackProductList,
  trackProductClick,
  trackSocialShare,
  trackVideoInteraction,
  trackFileDownload,
  trackExternalLink,
  trackNewsletterSignup,
  trackError,
  trackPerformance,
  trackUserDemographics,
  trackSessionQuality
};


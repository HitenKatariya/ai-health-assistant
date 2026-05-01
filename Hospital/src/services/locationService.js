/**
 * Location Service for Hospital Registration
 * Gets hospital's GPS coordinates using browser geolocation API
 */

/**
 * Get current location using browser geolocation API
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
        console.log('Location detected:', coords)
        resolve(coords)
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location.'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access to detect hospital coordinates.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.'
            break
          default:
            errorMessage = 'An unknown error occurred while getting location.'
        }
        
        console.error('Geolocation error:', error)
        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}

/**
 * Reverse geocode coordinates to address using Nominatim API (OpenStreetMap)
 */
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'User-Agent': 'AI-Health-Assistant-Hospital-Portal'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch address from coordinates')
    }

    const data = await response.json()
    
    if (!data.address) {
      throw new Error('No address found for these coordinates')
    }

    return {
      city: data.address.city || data.address.town || data.address.village || data.address.suburb || '',
      state: data.address.state || '',
      pincode: data.address.postcode || ''
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    throw error
  }
}

/**
 * Format coordinates for display
 */
export const formatCoordinates = (lat, lng) => {
  return {
    latitude: parseFloat(lat).toFixed(6),
    longitude: parseFloat(lng).toFixed(6)
  }
}

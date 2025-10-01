const API_BASE_URL = 'http://localhost:5000';

class AuthService {
  // Login user
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during login');
    }
  }

  // Register new user
  static async signup(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during registration');
    }
  }

  // Verify token validity
  static async verifyToken() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/verify-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      this.logout(); // Clear invalid token
      throw new Error(error.message || 'Token verification failed');
    }
  }

  // Get dashboard data
  static async getDashboardData() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error while fetching dashboard data');
    }
  }

  // Logout user
  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('cropAppUser'); // Clear existing user data
  }

  // Get current user from localStorage
  static getCurrentUser() {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  }

  // Get auth token
  static getToken() {
    return localStorage.getItem('authToken');
  }
}

export default AuthService;
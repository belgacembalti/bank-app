const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Load token from localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    // Add device info
    const deviceId = localStorage.getItem('device_id') || 'unknown';
    const deviceName = navigator.userAgent;
    headers['Device-ID'] = deviceId;
    headers['Device-Name'] = deviceName;

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || data.message || 'An error occurred',
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Auth endpoints
  async register(email: string, password: string, username: string, enableBiometric: boolean) {
    return this.request<{
      user: any;
      tokens: { access: string; refresh: string };
    }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        username,
        enable_biometric: enableBiometric,
        password2: password,
      }),
    });
  }

  async login(email: string, password: string, use2FA: boolean = false) {
    const response = await this.request<{
      user?: any;
      tokens?: { access: string; refresh: string };
      otp_required?: boolean;
      otp_code?: string;
      message?: string;
    }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password, use_2fa: use2FA }),
    });

    if (response.data?.tokens?.access) {
      this.setToken(response.data.tokens.access);
    }

    return response;
  }

  async verifyOTP(code: string) {
    const response = await this.request<{
      user: any;
      tokens: { access: string; refresh: string };
    }>('/auth/verify-otp/', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });

    if (response.data?.tokens?.access) {
      this.setToken(response.data.tokens.access);
    }

    return response;
  }

  async facialLogin() {
    const response = await this.request<{
      user: any;
      tokens: { access: string; refresh: string };
    }>('/auth/facial-login/', {
      method: 'POST',
    });

    if (response.data?.tokens?.access) {
      this.setToken(response.data.tokens.access);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me/');
  }

  async saveBiometricData(encryptedData: string) {
    return this.request('/auth/biometric/', {
      method: 'POST',
      body: JSON.stringify({ encrypted_data: encryptedData }),
    });
  }

  // Banking endpoints
  async getDashboard() {
    return this.request<any>('/banking/dashboard/');
  }

  async getAccountBalance() {
    return this.request<{ balance: number; account_id: number }>('/banking/account/balance/');
  }

  async getVirtualCards() {
    return this.request<any[]>('/banking/cards/');
  }

  async createVirtualCard() {
    return this.request<any>('/banking/cards/', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async getTransactions() {
    return this.request<any[]>('/banking/transactions/');
  }

  // Security endpoints
  async getSecurityDashboard() {
    return this.request<any>('/security/dashboard/');
  }

  async getAccessLogs() {
    return this.request<any[]>('/security/access-logs/');
  }

  async getSecurityAlerts() {
    return this.request<any[]>('/security/alerts/');
  }

  // Trusted devices
  async getTrustedDevices() {
    return this.request<any[]>('/auth/devices/');
  }

  async deleteTrustedDevice(deviceId: number) {
    return this.request(`/auth/devices/${deviceId}/`, {
      method: 'DELETE',
    });
  }

  // Admin endpoints
  async getAdminDashboard() {
    return this.request<any>('/admin/dashboard/');
  }

  async getUserMonitoring() {
    return this.request<any[]>('/admin/users/');
  }

  async getBiometricAudit() {
    return this.request<any[]>('/admin/biometric-audit/');
  }

  logout() {
    this.setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('device_id');
    }
  }
}

// Initialize device ID
if (typeof window !== 'undefined' && !localStorage.getItem('device_id')) {
  const deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('device_id', deviceId);
}

export const apiClient = new ApiClient(API_BASE_URL);


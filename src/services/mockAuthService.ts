import { User, UserProfile } from '../types';

interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationId?: string;
}

interface AuthResponse {
  user: User;
  profile: UserProfile;
  token: string;
}

// Default credentials
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin@10';

const mockUser: User = {
  UserID: 'user-001',
  Username: DEFAULT_USERNAME,
  Email: 'admin@enterprise.com',
  UserType: 'admin',
  FirstName: 'Admin',
  LastName: 'User',
  DisplayName: 'Admin User',
  AvatarURL: '',
  OrganizationID: 'org-001',
  Roles: ['admin', 'user'],
};

const mockProfile: UserProfile = {
  ProfileID: 'profile-001',
  UserID: 'user-001',
  FirstName: 'Admin',
  LastName: 'User',
  DisplayName: 'Admin User',
  AvatarURL: '',
  Bio: 'System Administrator',
  Department: 'IT',
  JobTitle: 'System Administrator',
  Phone: '+1234567890',
  Address: '123 Enterprise Street',
  City: 'Business City',
  State: 'CA',
  Country: 'USA',
  PostalCode: '12345',
  PreferredLanguage: 'en',
  TimeZone: 'UTC',
  NotificationPreferences: {
    email: true,
    push: true,
    sms: false,
  },
};

const generateToken = (): string => {
  return 'mock-jwt-token-' + Math.random().toString(36).substring(2);
};

export const mockAuthService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const username = credentials.username || credentials.email;
    const password = credentials.password;

    // Check against default credentials
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      const token = generateToken();
      
      // Store in localStorage
      localStorage.setItem('auth-user', JSON.stringify(mockUser));
      localStorage.setItem('auth-profile', JSON.stringify(mockProfile));
      localStorage.setItem('auth-token', token);

      return {
        user: mockUser,
        profile: mockProfile,
        token,
      };
    }

    throw new Error('Invalid credentials. Please use admin/admin@10');
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // For demo purposes, always register successfully with default user
    const token = generateToken();
    
    const newUser: User = {
      ...mockUser,
      UserID: 'user-' + Math.random().toString(36).substring(2),
      Username: data.username,
      Email: data.email,
      FirstName: data.firstName,
      LastName: data.lastName,
      DisplayName: `${data.firstName} ${data.lastName}`,
    };

    const newProfile: UserProfile = {
      ...mockProfile,
      ProfileID: 'profile-' + Math.random().toString(36).substring(2),
      UserID: newUser.UserID,
      FirstName: data.firstName,
      LastName: data.lastName,
      DisplayName: `${data.firstName} ${data.lastName}`,
    };

    localStorage.setItem('auth-user', JSON.stringify(newUser));
    localStorage.setItem('auth-profile', JSON.stringify(newProfile));
    localStorage.setItem('auth-token', token);

    return {
      user: newUser,
      profile: newProfile,
      token,
    };
  },

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-profile');
    localStorage.removeItem('auth-token');
  },

  async forgotPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock implementation - just return success
    console.log('Password reset email sent to:', email);
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock implementation
    console.log('Password reset with token:', token);
  },

  async verifyEmail(token: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock implementation
    console.log('Email verified with token:', token);
  },

  async getCurrentUser(): Promise<{ user: User; profile: UserProfile }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const userStr = localStorage.getItem('auth-user');
    const profileStr = localStorage.getItem('auth-profile');

    if (!userStr || !profileStr) {
      throw new Error('No authenticated user found');
    }

    return {
      user: JSON.parse(userStr),
      profile: JSON.parse(profileStr),
    };
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const profileStr = localStorage.getItem('auth-profile');
    if (!profileStr) {
      throw new Error('No profile found');
    }

    const profile = JSON.parse(profileStr);
    const updatedProfile = { ...profile, ...data };

    localStorage.setItem('auth-profile', JSON.stringify(updatedProfile));

    return updatedProfile;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock implementation
    console.log('Password changed');
  },
};

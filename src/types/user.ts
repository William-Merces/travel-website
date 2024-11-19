export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
    created_at: Date;
    updated_at: Date;
}

export interface UserProfile extends User {
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
    preferences?: {
        newsletter: boolean;
        notifications: boolean;
        currency: string;
        language: string;
    };
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
}
export type Role = 'admin' | 'seller' | 'user';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'coffee' | 'beans' | 'snacks';
    image: string;
    available: boolean;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    name: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
    id: string;
    userId: string;
    userName: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string;
}

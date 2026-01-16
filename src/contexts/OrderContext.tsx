'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderItem, User } from '@/lib/types';
import { initialOrders, users } from '@/lib/data';

interface OrderContextType {
    orders: Order[];
    currentUser: User;
    createOrder: (items: OrderItem[], total: number) => Order;
    getOrdersByUser: (userId: string) => Order[];
    getOrderById: (orderId: string) => Order | undefined;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'coffee-shop-orders';
const USER_KEY = 'coffee-shop-current-user';

// Generate unique order ID with timestamp
const generateOrderId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `ORD-${timestamp}-${random}`;
};

// Load orders from localStorage
const loadOrders = (): Order[] => {
    if (typeof window === 'undefined') return initialOrders;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load orders from localStorage:', error);
    }
    return initialOrders;
};

// Save orders to localStorage
const saveOrders = (orders: Order[]): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
        console.error('Failed to save orders to localStorage:', error);
        // Handle localStorage full error
        if (error instanceof Error && error.name === 'QuotaExceededError') {
            alert('Storage is full. Please clear some old orders.');
        }
    }
};

// Load current user from localStorage or use default
const loadCurrentUser = (): User => {
    if (typeof window === 'undefined') return users[0]; // Default to first user

    try {
        const stored = localStorage.getItem(USER_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load user from localStorage:', error);
    }

    // Default to first user (John Doe)
    const defaultUser = users[0];
    localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
};

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentUser, setCurrentUser] = useState<User>(users[0]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage on mount
    useEffect(() => {
        const loadedOrders = loadOrders();
        const loadedUser = loadCurrentUser();
        setOrders(loadedOrders);
        setCurrentUser(loadedUser);
        setIsInitialized(true);
    }, []);

    // Save to localStorage whenever orders change (but only after initialization)
    useEffect(() => {
        if (isInitialized) {
            saveOrders(orders);
        }
    }, [orders, isInitialized]);

    const createOrder = (items: OrderItem[], total: number): Order => {
        // Validation
        if (!items || items.length === 0) {
            throw new Error('Cannot create order with empty cart');
        }

        if (items.some(item => item.quantity <= 0 || item.price < 0)) {
            throw new Error('Invalid item data: quantities and prices must be positive');
        }

        const calculatedTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        if (Math.abs(calculatedTotal - total) > 0.01) {
            throw new Error('Order total does not match item prices');
        }

        // Check for ID collision (very unlikely but good practice)
        let orderId = generateOrderId();
        let attempts = 0;
        while (orders.some(o => o.id === orderId) && attempts < 10) {
            orderId = generateOrderId();
            attempts++;
        }

        if (attempts >= 10) {
            console.error('Failed to generate unique order ID after 10 attempts');
            throw new Error('Failed to generate unique order ID');
        }

        const newOrder: Order = {
            id: orderId,
            userId: currentUser.id,
            userName: currentUser.name,
            items: [...items], // Create a copy to avoid mutations
            total,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        setOrders(prev => [newOrder, ...prev]); // Add to beginning for newest-first ordering
        return newOrder;
    };

    const getOrdersByUser = (userId: string): Order[] => {
        return orders
            .filter(order => order.userId === userId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    };

    const getOrderById = (orderId: string): Order | undefined => {
        return orders.find(order => order.id === orderId);
    };

    const updateOrderStatus = (orderId: string, status: Order['status']): void => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                currentUser,
                createOrder,
                getOrdersByUser,
                getOrderById,
                updateOrderStatus,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}

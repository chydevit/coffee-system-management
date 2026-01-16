import { Product, Order, User } from './types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Signature Espresso',
        description: 'A rich, full-bodied espresso with notes of dark chocolate and caramel.',
        price: 3.5,
        category: 'coffee',
        image: '/images/hero.png',
        available: true,
    },
    {
        id: '2',
        name: 'Creamy Latte',
        description: 'Smooth steamed milk poured over a double shot of our signature espresso.',
        price: 4.5,
        category: 'coffee',
        image: '/images/latte.png',
        available: true,
    },
    {
        id: '3',
        name: 'Dark Roast Beans',
        description: '500g of our finest ethically sourced dark roasted beans.',
        price: 18.0,
        category: 'beans',
        image: '/images/beans.png',
        available: true,
    },
    {
        id: '4',
        name: 'Butter Croissant',
        description: 'Flaky, buttery, and freshly baked every morning.',
        price: 3.0,
        category: 'snacks',
        image: '/images/latte.png',
        available: true,
    },
];

export const users: User[] = [
    { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: 's1', name: 'Sarah Barista', email: 'sarah@aura.coffee', role: 'seller' },
    { id: 'a1', name: 'Admin Aura', email: 'admin@aura.coffee', role: 'admin' },
];

export const initialOrders: Order[] = [
    {
        id: 'ord1',
        userId: 'u1',
        userName: 'John Doe',
        items: [{ productId: '1', quantity: 2, price: 3.5, name: 'Signature Espresso' }],
        total: 7.0,
        status: 'completed',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'ord2',
        userId: 'u1',
        userName: 'John Doe',
        items: [{ productId: '2', quantity: 1, price: 4.5, name: 'Creamy Latte' }],
        total: 4.5,
        status: 'pending',
        createdAt: new Date().toISOString(),
    },
];

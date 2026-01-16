'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Product, OrderItem, Order } from '@/lib/types';
import OrderConfirmation from '@/components/OrderConfirmation';
import { useOrders } from '@/contexts/OrderContext';

export default function UserDashboard() {
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [category, setCategory] = useState<string>('all');
    const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
    const { createOrder } = useOrders();

    const filteredProducts = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.productId === product.id);
            if (existing) {
                return prev.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
        });
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleConfirmOrder = () => {
        if (cart.length === 0) return;

        try {
            const order = createOrder(cart, cartTotal);
            setConfirmedOrder(order);
            setCart([]); // Clear cart after successful order
        } catch (error) {
            console.error('Failed to create order:', error);
            alert(error instanceof Error ? error.message : 'Failed to create order. Please try again.');
        }
    };

    const handleCloseConfirmation = () => {
        setConfirmedOrder(null);
    };

    const handleOrderMore = () => {
        // Just close the modal, user is already on the menu page
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Menu Area */}
                <div className="flex-1">
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold text-coffee-dark mb-4">Our Coffee Menu</h1>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {['all', 'coffee', 'beans', 'snacks'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${category === cat
                                        ? 'bg-coffee-dark text-white shadow-lg'
                                        : 'bg-coffee-cream/50 text-coffee-roast hover:bg-coffee-cream'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>

                {/* Cart Sidebar */}
                <div className="w-full lg:w-96">
                    <div className="glass p-8 rounded-[2.5rem] sticky top-24 border border-coffee-accent/10">
                        <h2 className="text-2xl font-bold text-coffee-dark mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Your Order
                        </h2>

                        {cart.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-coffee-cream/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-coffee-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="text-coffee-roast/60 text-sm italic">Nothing in your cart yet...</p>
                            </div>
                        ) : (
                            <div className="space-y-4 mb-8">
                                {cart.map((item) => (
                                    <div key={item.productId} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-coffee-accent text-white flex items-center justify-center text-xs font-bold">
                                                {item.quantity}x
                                            </div>
                                            <span className="text-coffee-dark font-medium underline decoration-coffee-accent/20 transition-all group-hover:decoration-coffee-accent">{item.name}</span>
                                        </div>
                                        <span className="text-coffee-roast font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}

                                <div className="pt-6 mt-6 border-t border-coffee-accent/10">
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="text-coffee-dark font-bold">Total</span>
                                        <span className="text-coffee-dark font-black text-2xl">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleConfirmOrder}
                            disabled={cart.length === 0}
                            className="w-full py-4 rounded-2xl bg-coffee-dark text-white font-bold hover:bg-coffee-roast transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-coffee-dark/20"
                        >
                            Confirm Order
                        </button>
                        <p className="mt-4 text-center text-[10px] text-coffee-roast/40 uppercase tracking-widest font-bold">
                            Secure Checkout • Points +12
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Confirmation Modal */}
            {confirmedOrder && (
                <OrderConfirmation
                    order={confirmedOrder}
                    onClose={handleCloseConfirmation}
                    onOrderMore={handleOrderMore}
                />
            )}
        </div>
    );
}

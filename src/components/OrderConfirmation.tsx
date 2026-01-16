'use client';

import { Order } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface OrderConfirmationProps {
    order: Order;
    onClose: () => void;
    onOrderMore: () => void;
}

export default function OrderConfirmation({ order, onClose, onOrderMore }: OrderConfirmationProps) {
    const router = useRouter();

    const handleViewOrders = () => {
        router.push('/user/orders');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="glass max-w-md w-full rounded-[2.5rem] p-8 border border-coffee-accent/10 animate-slideUp">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-scaleIn">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-coffee-dark text-center mb-2">
                    Order Confirmed!
                </h2>
                <p className="text-coffee-roast/60 text-center mb-6">
                    Your coffee is being prepared with care
                </p>

                {/* Order Details */}
                <div className="bg-coffee-cream/30 rounded-2xl p-6 mb-6 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-coffee-accent/10">
                        <span className="text-coffee-roast/60 text-sm font-medium">Order ID</span>
                        <span className="text-coffee-dark font-mono font-bold text-sm">{order.id}</span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-coffee-dark font-semibold text-sm mb-3">Items:</h3>
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-lg bg-coffee-accent/20 text-coffee-dark flex items-center justify-center text-xs font-bold">
                                        {item.quantity}
                                    </span>
                                    <span className="text-coffee-dark text-sm">{item.name}</span>
                                </div>
                                <span className="text-coffee-roast font-semibold text-sm">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-3 border-t border-coffee-accent/10">
                        <div className="flex justify-between items-center">
                            <span className="text-coffee-dark font-bold">Total</span>
                            <span className="text-coffee-dark font-black text-xl">
                                ${order.total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <svg className="w-4 h-4 text-coffee-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-coffee-roast/60 text-xs">
                            Estimated time: 10-15 minutes
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleViewOrders}
                        className="w-full py-4 rounded-2xl bg-coffee-dark text-white font-bold hover:bg-coffee-roast transition-all shadow-xl shadow-coffee-dark/20"
                    >
                        View Order History
                    </button>
                    <button
                        onClick={() => {
                            onOrderMore();
                            onClose();
                        }}
                        className="w-full py-4 rounded-2xl bg-coffee-cream/50 text-coffee-dark font-bold hover:bg-coffee-cream transition-all"
                    >
                        Order More
                    </button>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-coffee-cream/50 hover:bg-coffee-cream transition-all flex items-center justify-center"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5 text-coffee-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useOrders } from '@/contexts/OrderContext';
import { OrderStatus } from '@/lib/types';
import Link from 'next/link';

type FilterType = 'all' | OrderStatus;

export default function OrderHistoryPage() {
    const { orders, currentUser, getOrdersByUser } = useOrders();
    const [filter, setFilter] = useState<FilterType>('all');
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const userOrders = getOrdersByUser(currentUser.id);
    const filteredOrders = filter === 'all'
        ? userOrders
        : userOrders.filter(order => order.status === filter);

    const getStatusColor = (status: OrderStatus): string => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'preparing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'ready':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'completed':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: OrderStatus) => {
        switch (status) {
            case 'pending':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'preparing':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            case 'ready':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'completed':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'cancelled':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/user"
                    className="inline-flex items-center gap-2 text-coffee-roast hover:text-coffee-dark transition-colors mb-4"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Menu
                </Link>
                <h1 className="text-4xl font-bold text-coffee-dark mb-2">Order History</h1>
                <p className="text-coffee-roast/60">
                    Track your orders and view past purchases
                </p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 overflow-x-auto pb-2 mb-8 scrollbar-hide">
                {(['all', 'pending', 'preparing', 'ready', 'completed', 'cancelled'] as FilterType[]).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap ${filter === status
                            ? 'bg-coffee-dark text-white shadow-lg'
                            : 'bg-coffee-cream/50 text-coffee-roast hover:bg-coffee-cream'
                            }`}
                    >
                        {status}
                        {status !== 'all' && (
                            <span className="ml-2 text-xs opacity-70">
                                ({userOrders.filter(o => o.status === status).length})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="glass rounded-[2.5rem] p-12 text-center border border-coffee-accent/10">
                    <div className="w-20 h-20 bg-coffee-cream/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-coffee-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-coffee-dark mb-2">
                        {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
                    </h3>
                    <p className="text-coffee-roast/60 mb-6">
                        {filter === 'all'
                            ? 'Start by browsing our menu and placing your first order!'
                            : `You don't have any ${filter} orders at the moment.`}
                    </p>
                    <Link
                        href="/user"
                        className="inline-block px-8 py-3 rounded-2xl bg-coffee-dark text-white font-bold hover:bg-coffee-roast transition-all shadow-xl shadow-coffee-dark/20"
                    >
                        Browse Menu
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="glass rounded-2xl border border-coffee-accent/10 overflow-hidden transition-all hover:shadow-lg"
                        >
                            {/* Order Header */}
                            <div
                                className="p-6 cursor-pointer"
                                onClick={() => toggleOrderExpansion(order.id)}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-coffee-dark font-mono">
                                                {order.id}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-coffee-roast/60 text-sm">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-coffee-roast/60 text-xs mb-1">Total</p>
                                            <p className="text-2xl font-black text-coffee-dark">
                                                ${order.total.toFixed(2)}
                                            </p>
                                        </div>
                                        <svg
                                            className={`w-6 h-6 text-coffee-accent transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details (Expandable) */}
                            {expandedOrderId === order.id && (
                                <div className="px-6 pb-6 pt-0 border-t border-coffee-accent/10">
                                    <div className="mt-4 space-y-3">
                                        <h4 className="text-sm font-bold text-coffee-dark mb-3">Order Items:</h4>
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-coffee-accent/20 text-coffee-dark flex items-center justify-center text-xs font-bold">
                                                        {item.quantity}x
                                                    </div>
                                                    <span className="text-coffee-dark font-medium">{item.name}</span>
                                                </div>
                                                <span className="text-coffee-roast font-semibold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            {userOrders.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="glass rounded-2xl p-6 border border-coffee-accent/10">
                        <p className="text-coffee-roast/60 text-sm mb-1">Total Orders</p>
                        <p className="text-3xl font-black text-coffee-dark">{userOrders.length}</p>
                    </div>
                    <div className="glass rounded-2xl p-6 border border-coffee-accent/10">
                        <p className="text-coffee-roast/60 text-sm mb-1">Total Spent</p>
                        <p className="text-3xl font-black text-coffee-dark">
                            ${userOrders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="glass rounded-2xl p-6 border border-coffee-accent/10">
                        <p className="text-coffee-roast/60 text-sm mb-1">Active Orders</p>
                        <p className="text-3xl font-black text-coffee-dark">
                            {userOrders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status)).length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

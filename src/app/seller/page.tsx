'use client';

import { useOrders } from '@/contexts/OrderContext';
import { OrderStatus } from '@/lib/types';

export default function SellerDashboard() {
    const { orders, updateOrderStatus } = useOrders();

    const updateStatus = (orderId: string, newStatus: OrderStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    const statusColors = {
        pending: 'bg-amber-100 text-amber-700 border-amber-200',
        preparing: 'bg-blue-100 text-blue-700 border-blue-200',
        ready: 'bg-green-100 text-green-700 border-green-200',
        completed: 'bg-gray-100 text-gray-500 border-gray-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-coffee-dark mb-2">Barista Kitchen</h1>
                    <p className="text-coffee-roast/60">Live orders appearing in real-time.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-coffee-cream text-center">
                        <p className="text-[10px] uppercase font-bold text-coffee-roast/40 tracking-wider">Active Orders</p>
                        <p className="text-2xl font-black text-coffee-dark">{orders.filter(o => o.status !== 'completed').length}</p>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-coffee-cream text-center">
                        <p className="text-[10px] uppercase font-bold text-coffee-roast/40 tracking-wider">Completed</p>
                        <p className="text-2xl font-black text-coffee-leaf">{orders.filter(o => o.status === 'completed').length}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {orders.map((order) => (
                    <div key={order.id} className={`bg-white rounded-[2rem] p-8 shadow-sm border-l-8 transition-all hover:shadow-md ${order.status === 'pending' ? 'border-amber-400' :
                        order.status === 'preparing' ? 'border-blue-400' : 'border-green-400'
                        }`}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-bold text-coffee-dark">Order #{order.id.slice(-4).toUpperCase()}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColors[order.status]}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-coffee-roast/60">{order.userName} • {new Date(order.createdAt).toLocaleTimeString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-coffee-dark">${order.total.toFixed(2)}</p>
                                <p className="text-xs text-coffee-roast/40">{order.items.length} items</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8 bg-coffee-cream/10 p-4 rounded-xl">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-coffee-roast">
                                    <span className="font-medium"><span className="text-coffee-accent font-bold">x{item.quantity}</span> {item.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {order.status === 'pending' && (
                                <button
                                    onClick={() => updateStatus(order.id, 'preparing')}
                                    className="px-6 py-2 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-colors"
                                >
                                    Start Preparing
                                </button>
                            )}
                            {order.status === 'preparing' && (
                                <button
                                    onClick={() => updateStatus(order.id, 'ready')}
                                    className="px-6 py-2 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors"
                                >
                                    Mark as Ready
                                </button>
                            )}
                            {order.status === 'ready' && (
                                <button
                                    onClick={() => updateStatus(order.id, 'completed')}
                                    className="px-6 py-2 rounded-xl bg-gray-800 text-white font-bold text-sm hover:bg-black transition-colors"
                                >
                                    Complete Delivery
                                </button>
                            )}
                            {order.status !== 'completed' && order.status !== 'cancelled' && (
                                <button
                                    onClick={() => updateStatus(order.id, 'cancelled')}
                                    className="px-6 py-2 rounded-xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-100 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

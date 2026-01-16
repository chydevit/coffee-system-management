'use client';

import { products } from '@/lib/data';
import { useOrders } from '@/contexts/OrderContext';
import Image from 'next/image';

export default function AdminDashboard() {
    const { orders } = useOrders();
    const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
    const totalOrders = orders.length;
    const lowStock = products.slice(0, 2); // Mock low stock items

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-coffee-dark mb-2">Management Console</h1>
                <p className="text-coffee-roast/60">Overview of your coffee business performance.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Total Revenue', value: `$${totalSales.toFixed(2)}`, trend: '+12.5%', icon: '💰' },
                    { label: 'Order Volume', value: totalOrders, trend: '+4.2%', icon: '📦' },
                    { label: 'Active Sellers', value: '3', trend: 'Stable', icon: '👤' },
                    { label: 'Avg Order Value', value: `$${(totalSales / totalOrders).toFixed(2)}`, trend: '-0.8%', icon: '📈' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-coffee-cream">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-coffee-roast/50 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-coffee-dark">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inventory Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-coffee-cream">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-coffee-dark">Menu Management</h2>
                            <button className="px-4 py-2 bg-coffee-dark text-white rounded-xl text-sm font-bold hover:bg-coffee-roast transition-all">
                                + Add Item
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-coffee-roast/40 text-xs uppercase tracking-widest font-bold border-b border-coffee-cream">
                                        <th className="pb-4">Product</th>
                                        <th className="pb-4 text-center">Price</th>
                                        <th className="pb-4 text-center">Status</th>
                                        <th className="pb-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-coffee-cream/50">
                                    {products.map((product) => (
                                        <tr key={product.id} className="group hover:bg-coffee-cream/10 transition-colors">
                                            <td className="py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-coffee-cream">
                                                        <Image src={product.image} alt={product.name} width={40} height={40} className="object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-coffee-dark text-sm">{product.name}</p>
                                                        <p className="text-xs text-coffee-roast/50 capitalize">{product.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-center font-semibold text-coffee-roast text-sm">${product.price.toFixed(2)}</td>
                                            <td className="py-4 text-center">
                                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">In Stock</span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="text-coffee-accent hover:text-coffee-roast font-bold text-xs p-2">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Alerts/Activity Column */}
                <div className="space-y-8">
                    <div className="bg-orange-50 rounded-[2.5rem] p-8 border border-orange-100">
                        <h2 className="text-xl font-bold text-orange-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Inventory Alerts
                        </h2>
                        <div className="space-y-4">
                            {lowStock.map((item) => (
                                <div key={item.id} className="bg-white/50 p-4 rounded-2xl border border-orange-200 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm text-orange-900">{item.name}</p>
                                        <p className="text-xs text-orange-700/60">Only 5 units left</p>
                                    </div>
                                    <button className="text-xs font-black text-orange-600 hover:underline">Restock</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-coffee-dark rounded-[2.5rem] p-8 text-white">
                        <h2 className="text-xl font-bold mb-6">Recent Sales</h2>
                        <div className="space-y-6">
                            {orders.slice(0, 3).map((order) => (
                                <div key={order.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                                            {order.userName[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{order.userName}</p>
                                            <p className="text-[10px] text-white/40">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-coffee-accent">+${order.total.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-sm font-bold">
                            View All Transactions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

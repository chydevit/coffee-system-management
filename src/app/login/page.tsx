'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRoleSelect = (role: string) => {
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            router.push(`/${role}`);
        }, 800);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-coffee-cream/20 p-4">
            <div className="max-w-md w-full glass p-8 rounded-[2rem] shadow-2xl border border-white/50">
                <div className="text-center mb-10">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="mx-auto mb-4 rounded-2xl shadow-lg"
                    />
                    <h1 className="text-3xl font-bold text-coffee-dark mb-2">Welcome Back</h1>
                    <p className="text-coffee-roast/60 text-sm">Select your role to continue to the system</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleRoleSelect('user')}
                        disabled={loading}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-transparent hover:border-coffee-accent hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-coffee-dark">Customer</p>
                                <p className="text-xs text-coffee-roast/50">Browse menu & order coffee</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-coffee-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleRoleSelect('seller')}
                        disabled={loading}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-transparent hover:border-coffee-accent hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-coffee-dark">Seller / Barista</p>
                                <p className="text-xs text-coffee-roast/50">Manage orders & fulfillment</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-coffee-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleRoleSelect('admin')}
                        disabled={loading}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-transparent hover:border-coffee-accent hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-coffee-dark">Administrator</p>
                                <p className="text-xs text-coffee-roast/50">Full system control & data</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-coffee-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {loading && (
                    <div className="mt-8 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-accent"></div>
                    </div>
                )}

                <p className="mt-8 text-center text-xs text-coffee-roast/40">
                    By continuing, you agree to Aura Coffee's <Link href="#" className="underline">Terms of Service</Link>
                </p>
            </div>
        </div>
    );
}

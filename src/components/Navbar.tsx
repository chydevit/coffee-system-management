'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-coffee-accent/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/images/logo.png"
                            alt="Aura Coffee"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="text-coffee-dark font-bold text-xl tracking-tight">AURA COFFEE</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-coffee-roast hover:text-coffee-accent transition-colors">Menu</Link>
                        <Link href="/about" className="text-coffee-roast hover:text-coffee-accent transition-colors">About Us</Link>
                        <Link href="/login" className="px-5 py-2 rounded-full bg-coffee-dark text-white hover:bg-coffee-roast transition-all shadow-lg hover:shadow-coffee-accent/20">
                            Order Now
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-xs text-coffee-roast/50 hover:text-coffee-accent">Admin</Link>
                        <Link href="/seller" className="text-xs text-coffee-roast/50 hover:text-coffee-accent">Seller</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

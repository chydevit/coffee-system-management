'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-coffee-cream">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-coffee-dark font-semibold text-sm">
                    ${product.price.toFixed(2)}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-coffee-dark">{product.name}</h3>
                    <span className="text-xs uppercase tracking-widest text-coffee-accent font-semibold">{product.category}</span>
                </div>
                <p className="text-coffee-roast/70 text-sm mb-6 line-clamp-2">
                    {product.description}
                </p>

                <button
                    onClick={() => onAddToCart?.(product)}
                    className="w-full py-3 rounded-xl bg-coffee-cream text-coffee-dark font-bold hover:bg-coffee-accent hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <span>Add to Order</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

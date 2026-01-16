import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Coffee Shop Hero"
          fill
          priority
          className="object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 rounded-full bg-coffee-accent/20 border border-coffee-accent/30 text-coffee-cream text-sm font-medium mb-6 backdrop-blur-sm">
            Est. 2025 • Artisanal Roastery
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Elevate Your <span className="text-coffee-accent italic font-serif">Coffee</span> Experience
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            From bean to cup, we deliver the finest artisanal coffee crafted with passion
            and precision. Pure, bold, and unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-coffee-accent text-coffee-dark font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-coffee-accent/20"
            >
              Order for Delivery
            </Link>
            <Link
              href="#menu"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-md border border-white/20"
            >
              View Our Menu
            </Link>
          </div>
        </div>

        {/* Floating element */}
        <div className="absolute bottom-10 left-10 hidden lg:block animate-bounce-slow">
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image src="/images/beans.png" alt="Beans" width={48} height={48} className="object-cover" />
            </div>
            <div>
              <p className="text-coffee-dark font-bold text-sm">Freshly Roasted</p>
              <p className="text-coffee-roast/60 text-xs text-nowrap">Just 2 hours ago</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-20 bg-coffee-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-coffee-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-coffee-dark mb-2">Sourced Ethically</h3>
              <p className="text-coffee-roast/70">Supporting farmers directly with fair trade practices.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-coffee-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-coffee-dark mb-2">Fast Brewing</h3>
              <p className="text-coffee-roast/70">Optimized workflows for the perfect cup in minutes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-coffee-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-coffee-dark mb-2">Artisan Taste</h3>
              <p className="text-coffee-roast/70">Expertly roasted to bring out unique flavor profiles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-coffee-accent font-bold tracking-widest uppercase text-sm block mb-4">Our Menu</span>
            <h2 className="text-4xl md:text-5xl font-bold text-coffee-dark">Crafted with Precision</h2>
          </div>
          <p className="text-coffee-roast/70 max-w-md">
            Explore our curated selection of premium blends and freshly baked treats,
            designed to awaken your senses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-coffee-dark font-bold hover:text-coffee-accent transition-colors group"
          >
            <span>Browse Full Menu</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-coffee-dark py-12 text-white/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="opacity-80" />
            <span className="font-bold text-white tracking-tight">AURA COFFEE</span>
          </div>
          <div className="flex gap-8 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
          </div>
          <p className="text-xs">© 2025 Aura Coffee System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

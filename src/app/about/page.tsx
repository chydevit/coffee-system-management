import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-coffee-cream/20">
      <section className="relative overflow-hidden">
        <Image
          src="/images/latte.png"
          alt="Latte art"
          fill
          priority
          className="object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/40 via-coffee-dark/30 to-coffee-dark/70" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 md:py-32">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-white text-sm tracking-wide uppercase border border-white/20">
            About the app
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight">
            Brew, order, and discover coffee that fits your day.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Aura Coffee is a companion app for customers and baristas alike. From smart
            ordering to curated tasting notes, it turns every cup into a story you can
            track, share, and revisit.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="px-8 py-4 bg-coffee-accent text-coffee-dark font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-coffee-accent/30"
            >
              Get Started
            </Link>
            <Link
              href="/#menu"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-md border border-white/20"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-coffee-cream">
              <h2 className="text-xl font-bold text-coffee-dark">Personalized brews</h2>
              <p className="mt-3 text-coffee-roast/70">
                Save your go-to recipes, roast preferences, and custom notes for every drink.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-coffee-cream">
              <h2 className="text-xl font-bold text-coffee-dark">Live order tracking</h2>
              <p className="mt-3 text-coffee-roast/70">
                Follow your order from grind to pour with real-time updates from the bar.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-coffee-cream">
              <h2 className="text-xl font-bold text-coffee-dark">Rewards that matter</h2>
              <p className="mt-3 text-coffee-roast/70">
                Collect beans, unlock limited roasts, and earn experiences beyond discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-coffee-accent font-bold tracking-widest uppercase text-sm">How it works</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-coffee-dark">
              A smooth flow from craving to cup.
            </h2>
            <p className="mt-4 text-coffee-roast/70 leading-relaxed">
              The app keeps your entire coffee journey in one place, whether you are grabbing
              a quick espresso or exploring rare seasonal micro-lots.
            </p>
            <div className="mt-8 grid gap-6">
              {[
                {
                  title: "Build your profile",
                  text: "Set flavor preferences and auto-match blends you will love.",
                },
                {
                  title: "Order ahead",
                  text: "Choose pickup times, add customization, and skip the line.",
                },
                {
                  title: "Taste smarter",
                  text: "Receive brew tips, pairing notes, and roast story cards.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-coffee-accent/20 text-coffee-accent flex items-center justify-center font-bold">
                    {item.title.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-coffee-dark">{item.title}</h3>
                    <p className="text-coffee-roast/70">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[420px] rounded-[32px] overflow-hidden shadow-xl">
            <Image
              src="/images/hero.png"
              alt="Coffee brewing"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/60 via-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5">
              <p className="text-coffee-dark font-bold">Today is a signature brew day</p>
              <p className="text-coffee-roast/70 text-sm">
                New Rwanda Nyungwe roast available in-store and in-app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-coffee-dark text-white p-6">
              <p className="text-3xl font-bold">4.9</p>
              <p className="text-white/70">Average rating</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-coffee-cream">
              <p className="text-3xl font-bold text-coffee-dark">1.8k</p>
              <p className="text-coffee-roast/70">Daily brews tracked</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-coffee-cream">
              <p className="text-3xl font-bold text-coffee-dark">32</p>
              <p className="text-coffee-roast/70">Origins featured</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-coffee-cream">
              <p className="text-3xl font-bold text-coffee-dark">15 min</p>
              <p className="text-coffee-roast/70">Average pickup time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-coffee-dark text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to taste what is next?</h2>
            <p className="mt-3 text-white/70 max-w-xl">
              Join the Aura community and unlock a smarter, more personal coffee ritual.
            </p>
          </div>
          <Link
            href="/login"
            className="px-8 py-4 bg-white text-coffee-dark font-bold rounded-full hover:bg-coffee-cream transition-all"
          >
            Start Brewing
          </Link>
        </div>
      </section>
    </div>
  );
}

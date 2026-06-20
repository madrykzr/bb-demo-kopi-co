/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  Coffee, 
  Compass, 
  Sparkles, 
  Calendar, 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  X, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus,
  ArrowUpRight,
  Send,
  Sliders,
  Utensils
} from 'lucide-react';

import { MENU_ITEMS } from './data/menu';
import { MenuItem, Reservation } from './types';
import SteamCanvas from './components/SteamCanvas';
import CursorTrail from './components/CursorTrail';

// Hero drink data with rich assets, customized colors and parameters
const HERO_DRINKS = [
  {
    id: "h-01",
    name: "Golden Crema Espresso",
    description: "Double ristretto shot of our proprietary roasted Ethiopian heirloom beans, boasting rich nectar, orange blossom, and clear dark cocoa sugar notes.",
    price: "$4.50",
    numericPrice: 4.50,
    sizes: ["Single", "Double"],
    tag: "92.5°C EXTRACTION",
    origin: "Kochere, Ethiopia",
    image: "https://images.unsplash.com/photo-151097252790b-af4f902e1de7?q=80&w=600&auto=format&fit=crop",
    gradient: "from-[#C77B4A]/40 to-[#1E1511]",
    glowColor: "rgba(199, 123, 74, 0.45)"
  },
  {
    id: "h-02",
    name: "Gibraltar Salted Caramel",
    description: "Cold-shaken double espresso layered with creamy oat milk and a dense scratch-made butterscotch caramel reduction poured over raw block ice.",
    price: "$5.75",
    numericPrice: 5.75,
    sizes: ["Regular", "Grande"],
    tag: "ORGANIC MILKS",
    origin: "Caldas, Colombia",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop",
    gradient: "from-[#D2DFD3]/40 to-[#1E1511]",
    glowColor: "rgba(210, 223, 211, 0.35)"
  },
  {
    id: "h-03",
    name: "18H Kyoto Glass Drip",
    description: "Slow-dripped cold water extraction through physical vertical glass towers over eighteen hours, yielding zero bitterness and notes of organic wild peach tea.",
    price: "$6.20",
    numericPrice: 6.20,
    sizes: ["300ml Bottle", "500ml Sharing"],
    tag: "SLOW COLD DRIP",
    origin: "Tarrazú, Costa Rica",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    gradient: "from-[#8a6852]/40 to-[#1E1511]",
    glowColor: "rgba(138, 104, 82, 0.45)"
  },
  {
    id: "h-04",
    name: "Ceremonial Matcha Ristretto",
    description: "Thick hand-whisked stoneground Uji matcha floated elegantly over velvety microfoam oat milk and centered by a balanced, sweet ristretto core.",
    price: "$6.00",
    numericPrice: 6.00,
    sizes: ["Standard Size"],
    tag: "SIGNATURE FUSION",
    origin: "Kyoto, Japan / Uji",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop",
    gradient: "from-[#A6B29C]/40 to-[#1E1511]",
    glowColor: "rgba(166, 178, 156, 0.4)"
  }
];

// Testimonials
const CUSTOMER_REVIEWS = [
  {
    id: "t1",
    name: "Harith Kamal",
    role: "Regular · Bangsar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    comment: "The 18-hour cold brew has completely altered my definition of iced coffee. The flavor is clean, tea-like, and wonderfully floral. Kopi & Co isn't just a shop; it is a ritual."
  },
  {
    id: "t2",
    name: "Aisha Rahman",
    role: "Architect",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    comment: "The warm, editorial aesthetic matches the perfection of the brewing. Sitting inside, smelling the charcoal robusta while listening to classic jazz vinyl is absolute bliss."
  },
  {
    id: "t3",
    name: "Marcus Chen",
    role: "Specialty Grader",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    comment: "Their double shot espresso extraction is flawless. Clean crema, balanced acidity, and zero bitterness. To pair it with the pandan canelé is a sensory masterpiece."
  },
  {
    id: "t4",
    name: "Nurul Huda",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    comment: "This space does what very few cafes manage: combining modern aesthetic precision with authentic local heart. The Sambal Grilled Cheese is food engineering at its peak."
  },
  {
    id: "t5",
    name: "Sanjay Raj",
    role: "Daily Visitor",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
    comment: "The precision is tangible. The barista weighed the dose, verified the water temperature, and poured with incredible focus. Truly high-definition brewing."
  },
  {
    id: "t6",
    name: "Elena Rostova",
    role: "Coffee Writer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    comment: "As a coffee journalist, I am hard to impress. But Kopi & Co. achieves a rare synergy between traditional East Asian Kissaten culture and progressive modern techniques."
  }
];

interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const brewRef = useRef<HTMLDivElement>(null);
  
  // Interactive Navigation States
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [brewProgress, setBrewProgress] = useState(0);

  // Cart Local States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Selected size on Hero details card
  const [heroSizeSelected, setHeroSizeSelected] = useState("Regular");

  // Filter for featured drinks/pastries
  const [menuFilter, setMenuFilter] = useState<'all' | 'drinks' | 'pastries' | 'sandwiches'>('all');

  // Interactive Reservation popup modal
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveName, setReserveName] = useState('');
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const [reserveGuests, setReserveGuests] = useState(2);
  const [reserveTime, setReserveTime] = useState('10:00');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<Reservation | null>(null);

  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  // Handle active drink index from scroll progress
  // Maps 0-1 continuous scroll range into 4 index segments
  const rawIndex = scrollProgress * 3.99;
  const activeHeroIdx = Math.min(3, Math.floor(rawIndex));
  const subProgress = rawIndex - activeHeroIdx; // progress factor inside active drink (0 to 1)

  // Initialize smooth scroll with Lenis on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Track natural window scroll elements
    const handleScrollTracking = () => {
      // 1. Hero scroll calculation
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const totalRange = rect.height - window.innerHeight;
        if (totalRange > 0) {
          const progress = Math.max(0, Math.min(1, -rect.top / totalRange));
          setScrollProgress(progress);
        }
      }

      // 2. Brew progress section calculation
      if (brewRef.current) {
        const rect = brewRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        // starts tracking when brew section top is 80% up the viewport
        const triggerPoint = rect.top - (viewHeight * 0.8);
        const totalBrewRange = rect.height + (viewHeight * 0.2);
        const progress = Math.max(0, Math.min(1, -triggerPoint / (totalBrewRange || 1)));
        setBrewProgress(progress);
      }

      // 3. Section Anchor triggers for right-hand tracker
      const sections = ['hero-block', 'menu-showcase', 'how-its-brewed', 'daily-deal', 'testimonials'];
      let currentSection = 'hero';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= window.innerHeight * 0.4) {
            currentSection = id.replace('-block', '').replace('-showcase', '');
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    handleScrollTracking();

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScrollTracking);
    };
  }, []);

  // Sync size selection array when active drink swings
  useEffect(() => {
    const drink = HERO_DRINKS[activeHeroIdx];
    if (drink && !drink.sizes.includes(heroSizeSelected)) {
      setHeroSizeSelected(drink.sizes[0]);
    }
  }, [activeHeroIdx]);

  // Next / Prev triggers for Slider
  const scrollToDrinkIdx = (idx: number) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const totalRange = rect.height - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + (idx / 3) * totalRange + 2; // subtle offset
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const handleNextHero = () => {
    const nextIdx = (activeHeroIdx + 1) % HERO_DRINKS.length;
    scrollToDrinkIdx(nextIdx);
  };

  const handlePrevHero = () => {
    const prevIdx = (activeHeroIdx - 1 + HERO_DRINKS.length) % HERO_DRINKS.length;
    scrollToDrinkIdx(prevIdx);
  };

  // Cart Interactions
  const addToCart = (product: { id: string; name: string; price: number; size: string; image: string }) => {
    const cartId = `${product.id}-${product.size}`;
    setCartItems((prev) => {
      const match = prev.find((item) => item.cartId === cartId);
      if (match) {
        return prev.map((item) => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, cartId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const adjustQty = (cartId: string, delta: number) => {
    setCartItems((prev) => 
      prev.map((item) => {
        if (item.cartId === cartId) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const handleHeroAddCart = () => {
    const activeDrink = HERO_DRINKS[activeHeroIdx];
    addToCart({
      id: activeDrink.id,
      name: activeDrink.name,
      price: activeDrink.numericPrice,
      size: heroSizeSelected,
      image: activeDrink.image
    });
  };

  // Booking handlers
  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveName || !reserveEmail) return;

    setIsSubmittingBooking(true);
    setTimeout(() => {
      setBookingResponse({
        name: reserveName,
        email: reserveEmail,
        date: reserveDate || new Date().toISOString().split('T')[0],
        time: reserveTime,
        guests: reserveGuests
      });
      setIsSubmittingBooking(false);
    }, 1100);
  };

  const resetBooking = () => {
    setBookingResponse(null);
    setReserveName('');
    setReserveEmail('');
    setReserveDate('');
    setReserveTime('10:00');
    setReserveGuests(2);
  };

  // Newsletter handler
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('success');
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterStatus('idle');
    }, 4000);
  };

  // Helper values
  const cartItemCount = cartItems.reduce((acc, current) => acc + current.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, current) => acc + (current.price * current.quantity), 0);

  return (
    <div className="relative min-h-screen bg-bg-dark text-text-cream selection:bg-terracotta selection:text-text-cream font-sans-jakarta">
      {/* Scattered particles ambient cursor effect */}
      <CursorTrail />

      {/* FIXED NAVIGATION TRACKER (Right Edge) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5 items-center bg-black/40 backdrop-blur-md px-3 py-6 rounded-full border border-white/5 shadow-2xl">
        <button 
          onClick={() => document.getElementById('hero-block')?.scrollIntoView({ behavior: 'smooth' })}
          className={`p-2 rounded-full transition-all duration-300 transform active:scale-90 relative group ${activeSection === 'hero' ? 'bg-terracotta text-white' : 'text-text-muted hover:text-[#FFFFFF]'}`}
          title="Brew Carousel"
        >
          <Coffee size={18} />
          <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-black py-1 px-2.5 rounded text-[8px] font-mono tracking-widest text-[#FFFFFF] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">Hero Carousel</span>
        </button>

        <button 
          onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })}
          className={`p-2 rounded-full transition-all duration-300 transform active:scale-90 relative group ${activeSection === 'menu' ? 'bg-terracotta text-white' : 'text-text-muted hover:text-[#FFFFFF]'}`}
          title="Featured Menu"
        >
          <Compass size={18} />
          <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-black py-1 px-2.5 rounded text-[8px] font-mono tracking-widest text-[#FFFFFF] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">Featured Drinks</span>
        </button>

        <button 
          onClick={() => document.getElementById('how-its-brewed')?.scrollIntoView({ behavior: 'smooth' })}
          className={`p-2 rounded-full transition-all duration-300 transform active:scale-90 relative group ${activeSection === 'how-its-brewed' ? 'bg-terracotta text-white' : 'text-text-muted hover:text-[#FFFFFF]'}`}
          title="How We Brew"
        >
          <Sparkles size={18} />
          <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-black py-1 px-2.5 rounded text-[8px] font-mono tracking-widest text-[#FFFFFF] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">Brew Precision</span>
        </button>

        <button 
          onClick={() => document.getElementById('daily-deal')?.scrollIntoView({ behavior: 'smooth' })}
          className={`p-2 rounded-full transition-all duration-300 transform active:scale-90 relative group ${activeSection === 'daily-deal' ? 'bg-terracotta text-white' : 'text-text-muted hover:text-[#FFFFFF]'}`}
          title="Daily Deals"
        >
          <Calendar size={18} />
          <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-black py-1 px-2.5 rounded text-[8px] font-mono tracking-widest text-[#FFFFFF] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">Special Deals</span>
        </button>

        <button 
          onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
          className={`p-2 rounded-full transition-all duration-300 transform active:scale-90 relative group ${activeSection === 'testimonials' ? 'bg-terracotta text-white' : 'text-text-muted hover:text-[#FFFFFF]'}`}
          title="Loved By Many"
        >
          <Heart size={18} />
          <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-black py-1 px-2.5 rounded text-[8px] font-mono tracking-widest text-[#FFFFFF] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">Testimonials</span>
        </button>
      </div>

      {/* HEADER INTEGRATION */}
      <header className="sticky top-0 z-40 bg-zinc-950/60 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center text-white font-serif-fraunces font-bold text-lg select-none group-hover:scale-105 duration-300">
              K
            </div>
            <div>
              <span className="font-serif-fraunces text-base md:text-lg font-bold tracking-tight text-text-cream block leading-tight">
                Kopi & Co.
              </span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-terracotta uppercase block">
                SPECIALTY ROASTERS
              </span>
            </div>
          </button>

          {/* Quick links & Cart */}
          <div className="flex items-center gap-4 md:gap-7">
            <nav className="hidden md:flex items-center gap-7 font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
              <button 
                onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-terracotta transition-colors cursor-pointer"
              >
                Featured Menu
              </button>
              <button 
                onClick={() => document.getElementById('how-its-brewed')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-terracotta transition-colors cursor-pointer"
              >
                Methodology
              </button>
              <button 
                onClick={() => document.getElementById('daily-deal')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-terracotta transition-colors cursor-pointer"
              >
                Offers
              </button>
            </nav>

            <div className="h-4 w-[1px] bg-white/15 hidden md:block" />

            <div className="flex items-center gap-3">
              {/* Table Booking CTA */}
              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white hover:text-black py-2 px-4 rounded-sm font-mono text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer text-text-cream"
              >
                <Calendar size={13} />
                Reserve Space
              </button>

              {/* Shopping Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#3A2A22]/80 border border-[#C77B4A]/30 text-text-cream hover:bg-terracotta hover:text-white transition-all duration-300 cursor-pointer shadow-md"
                aria-label="Open Cart"
              >
                <ShoppingBag size={18} />
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-terracotta text-white rounded-full text-[9px] font-mono h-4 min-w-4 flex items-center justify-center px-1 font-bold border border-bg-dark"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main>

        {/* SECTION 1 — HERO Sticky Product Swap Carousel */}
        <div ref={heroRef} className="relative h-[380vh] bg-[#1E1511]" id="hero-block">
          
          {/* Main sticky container holding items */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 md:py-16">
            
            {/* Soft Ambient Background Image & Radial Glocolors */}
            <div className="absolute inset-0 z-0">
              {/* Dynamic colorful radial glow backed by high-def blurring */}
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full filter blur-[140px] opacity-25 mix-blend-screen pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: HERO_DRINKS[activeHeroIdx].glowColor }}
              />

              {/* Barista background video asset fallback or misty ambient background */}
              <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-15 filter blur-[2px] transition-all duration-1000 transform scale-102"
                   style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200')` }} />
              
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-[#1E1511]/30 to-zinc-950" />
            </div>

            {/* Static Header Elements over scroll page */}
            <div className="container mx-auto px-6 md:px-12 z-20 text-center pointer-events-none mt-2">
              <span className="font-mono text-[9px] md:text-xs tracking-[0.35em] text-terracotta uppercase block animate-fade-in mb-3">
                ROASTED DAILY, POURED WITH CARE
              </span>
              <h1 className="font-serif-cormorant text-5xl md:text-8xl tracking-tight text-text-cream font-bold select-none leading-none max-w-4xl mx-auto uppercase">
                Brewed To Perfection
              </h1>
            </div>

            {/* Main Center Stage Render swap tracks */}
            <div className="relative flex-1 w-full flex items-center justify-center z-10 max-w-7xl mx-auto px-6">
              
              {/* LEFT FLOATING glass-panel card displaying dynamic parameters */}
              <div className="absolute left-6 md:left-12 bottom-6 sm:bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 w-full max-w-[325px] flex flex-col gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={HERO_DRINKS[activeHeroIdx].id}
                    initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="bg-black/45 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4 text-left"
                  >
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-terracotta font-bold">
                        {HERO_DRINKS[activeHeroIdx].tag}
                      </span>
                      <h3 className="font-serif-fraunces text-2xl font-bold text-text-cream tracking-tight mt-1 leading-snug">
                        {HERO_DRINKS[activeHeroIdx].name}
                      </h3>
                      <p className="font-sans-jakarta text-xs text-text-muted leading-relaxed font-light mt-1.5">
                        {HERO_DRINKS[activeHeroIdx].description}
                      </p>
                    </div>

                    <div className="h-[1px] w-full bg-white/10" />

                    {/* Sizing selections */}
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#FFFFFF]/50">Choose Portion</span>
                      <div className="flex gap-2">
                        {HERO_DRINKS[activeHeroIdx].sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setHeroSizeSelected(size)}
                            className={`flex-1 py-1 rounded-sm border font-mono text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                              heroSizeSelected === size 
                                ? 'bg-[#FFFFFF] text-black border-[#FFFFFF] font-bold shadow-lg' 
                                : 'bg-transparent text-text-cream border-white/20 hover:border-white/50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price and Cart checkout */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-[#FFFFFF]/40 uppercase tracking-widest">PRICE</span>
                        <span className="font-serif-fraunces text-2xl text-terracotta font-semibold leading-none">{HERO_DRINKS[activeHeroIdx].price}</span>
                      </div>

                      <button
                        onClick={handleHeroAddCart}
                        className="flex-1 flex justify-center items-center gap-2 bg-terracotta text-[#FFFFFF] hover:bg-[#D78A58] py-2.5 px-4 rounded-lg font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-lg active:scale-95 text-center font-bold"
                      >
                        Add to Cart
                        <ArrowRight size={14} />
                      </button>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CENTER 3D-feel floating drink image render (Dynamic scale, opacity, and swivel) */}
              <div className="relative w-72 h-96 sm:w-80 sm:h-[450px] overflow-visible flex items-center justify-center">
                {HERO_DRINKS.map((drink, idx) => {
                  const isActive = idx === activeHeroIdx;
                  // Calculate dynamic distance/offset
                  const offset = idx - activeHeroIdx;
                  
                  return (
                    <motion.div
                      key={drink.id}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0, scale: 0.75, rotate: -15, filter: 'blur(10px)' }}
                      animate={{ 
                        opacity: isActive ? 1 : (Math.abs(offset) === 1 ? 0.15 : 0), 
                        scale: isActive ? 1 : 0.8, 
                        rotate: isActive ? 0 : offset * 20,
                        x: isActive ? 0 : offset * 180,
                        zIndex: isActive ? 20 : 10,
                        filter: isActive ? 'blur(0px)' : 'blur(4px)'
                      }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 90, 
                        damping: 18,
                        mass: 0.9
                      }}
                    >
                      {/* Glass Bottle Frame with reflection highlighting */}
                      <div className="relative w-64 h-80 sm:w-72 sm:h-[390px] rounded-[32px] overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center p-2">
                        {/* Realistic glass reflection shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none z-10" />
                        
                        <img 
                          src={drink.image} 
                          alt={drink.name} 
                          className="w-full h-full object-cover rounded-[24px] sepia-[0.05] brightness-95"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Decorative dark vignette inside card frame */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-[24px] pointer-events-none" />

                        {/* Geographic badge */}
                        <span className="absolute bottom-4 inset-x-4 bg-black/50 backdrop-blur-md py-1.5 px-3 rounded-full text-center font-mono text-[8px] uppercase tracking-[0.25em] text-[#FFFFFF]/80 border border-white/5">
                          {drink.origin}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* RIGHT SLIDES NAVIGATOR WITH DOTS & COUNTER */}
              <div className="absolute right-6 md:right-12 bottom-6 sm:bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 flex flex-col md:items-end gap-4 text-right">
                
                {/* Index Count Indicator */}
                <div className="bg-black/30 backdrop-blur-md py-1.5 px-3 rounded-md border border-white/10 text-right font-mono text-[10px] text-text-cream/80 tracking-widest leading-none select-none">
                  <span className="text-terracotta font-bold">0{activeHeroIdx + 1}</span>
                  <span className="opacity-30 px-1">/</span>
                  <span className="opacity-60">0{HERO_DRINKS.length}</span>
                </div>

                {/* Left / Right Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevHero}
                    className="w-11 h-11 rounded-full bg-black/60 hover:bg-terracotta text-text-cream border border-white/15 hover:border-terracotta flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer text-[#FFFFFF] transform active:scale-90"
                    aria-label="Previous Premium Drink"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextHero}
                    className="w-11 h-11 rounded-full bg-black/60 hover:bg-terracotta text-text-cream border border-white/15 hover:border-terracotta flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer text-[#FFFFFF] transform active:scale-90"
                    aria-label="Next Premium Drink"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Vertical Scroll index lines */}
                <div className="flex md:flex-col gap-2.5 mt-2 justify-end">
                  {HERO_DRINKS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToDrinkIdx(idx)}
                      className={`h-1 hover:bg-white duration-300 transition-all cursor-pointer rounded-full ${
                        idx === activeHeroIdx ? 'w-10 md:w-10 bg-terracotta' : 'w-4 md:w-5 bg-white/20'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

            </div>

            {/* Down Scrolling Reminder Banner */}
            <div className="z-10 text-center flex flex-col items-center mt-3 pointer-events-none select-none max-w-sm mx-auto">
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#FFFFFF]/30 uppercase">SCROLL DIVERSE PORTFOLIO</span>
              <div className="w-[1px] h-9 bg-[#C77B4A]/60 mt-2 relative overflow-hidden rounded-full">
                <motion.div 
                  animate={{ y: [0, 36, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 w-full h-3 bg-terracotta rounded-full"
                />
              </div>
            </div>

          </div>

        </div>

        {/* TWO-TONE TRANSITION ZONE: Section 2 - Menu has Cream/Sage Palette */}
        {/* SECTION 2 — MENU SHOWCASE ("Featured Drinks") */}
        <section className="relative bg-cream-card text-[#2B1F19] py-20 px-6 md:px-12 border-t border-[#FFFFFF]/5 filter drop-shadow-[0_-15px_15px_rgba(0,0,0,0.15)]" id="menu-showcase">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Labeling */}
            <div className="text-center space-y-3 mb-12">
              <span className="font-mono text-[10px] tracking-[0.3em] text-terracotta font-bold uppercase inline-block bg-sage-light/60 px-3 py-1 rounded-sm border border-sage/40">
                † ARTIFACTS ORAL / FOLIO B
              </span>
              <h2 className="font-serif-cormorant text-4xl md:text-6xl font-bold uppercase tracking-tight text-coffee">
                Curated Craft Drinks
              </h2>
              <div className="w-16 h-[2px] bg-terracotta mx-auto rounded-full" />
              <p className="font-serif-fraunces text-base md:text-lg italic text-coffee/70 max-w-xl mx-auto leading-relaxed">
                "charcoal robusta beans roasted slowly with coconut butter, hand-matched to slow Japanese drip filtration."
              </p>
            </div>

            {/* Styled category toggle row (Modern pill styling) */}
            <div className="flex flex-wrap justify-center items-center gap-2 max-w-xl mx-auto mb-12 border-b border-coffee/10 pb-4">
              {[
                { key: 'all', label: 'All Items' },
                { key: 'drinks', label: 'Artisan Drinks' },
                { key: 'pastries', label: 'Baked Pastries' },
                { key: 'sandwiches', label: 'Savory Sandwiches' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMenuFilter(tab.key as any)}
                  className={`px-4.5 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    menuFilter === tab.key 
                      ? 'bg-coffee text-text-cream shadow-md font-bold' 
                      : 'bg-transparent text-coffee/60 hover:text-coffee border border-coffee/15 hover:border-coffee/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Staggered Frame Grids */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-16"
            >
              <AnimatePresence mode="popLayout">
                {MENU_ITEMS.filter(item => menuFilter === 'all' || item.category === menuFilter).map((item, idx) => {
                  
                  // Moody background Unsplash links matching the exact categories
                  let bgImg = "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400"; // espresso
                  if (item.name.toLowerCase().includes('matcha')) bgImg = "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400";
                  else if (item.name.toLowerCase().includes('black')) bgImg = "https://images.unsplash.com/photo-151097252790b-af4f902e1de7?q=80&w=400";
                  else if (item.name.toLowerCase().includes('kaya') || item.category === 'pastries') bgImg = "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400";
                  else if (item.category === 'sandwiches') bgImg = "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=400";
                  else if (item.name.toLowerCase().includes('white') || item.name.toLowerCase().includes('kopi c')) bgImg = "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400";

                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      className="bg-[#FFFFFF] border border-coffee/5 hover:border-terracotta/20 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                    >
                      {/* Interactive photo block floating upper */}
                      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-coffee/5 mb-4 bg-zinc-100">
                        <img 
                          src={bgImg} 
                          alt={item.name} 
                          className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 duration-700 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                        {item.signature && (
                          <span className="absolute top-3 left-3 bg-[#C77B4A] text-white font-mono text-[7px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-lg border border-white/20">
                            SIGNATURE
                          </span>
                        )}
                        <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-[#FFFFFF] font-mono text-[8px] font-bold tracking-wider px-2 py-0.5 rounded-sm">
                          {item.id.toUpperCase()}
                        </span>
                      </div>

                      {/* Info block */}
                      <div className="space-y-2 flex-grow text-left">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif-fraunces text-lg font-bold text-coffee group-hover:text-terracotta transition-colors leading-tight">
                            {item.name}
                          </h4>
                          <span className="font-serif-fraunces text-base font-bold text-terracotta whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        
                        {item.localName && (
                          <p className="font-mono text-[9px] uppercase tracking-wider text-coffee/50 font-medium">
                            {item.localName}
                          </p>
                        )}
                        
                        <p className="font-sans-jakarta text-[11px] text-coffee/70 leading-relaxed font-light">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.ingredients.slice(0, 3).map((ing, i) => (
                            <span key={i} className="font-mono text-[7px] text-coffee/40 uppercase tracking-wide bg-coffee/5 px-2 py-0.5 rounded-sm">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Buy Action pill bottom */}
                      <div className="pt-4 border-t border-coffee/5 mt-4 flex items-center justify-between">
                        <span className="font-sans-jakarta text-[10px] text-coffee/40 font-mono tracking-widest">MALAYSIAN ORIGIN</span>
                        <button
                          onClick={() => addToCart({
                            id: item.id,
                            name: item.name,
                            price: parseFloat(item.price.replace('RM', '').trim()) * 0.25, // convert roughly to USD pricing for demo consistency
                            size: "Standard",
                            image: bgImg
                          })}
                          className="bg-coffee hover:bg-terracotta text-text-cream hover:text-white py-1.5 px-4.5 rounded-full font-mono text-[8.5px] tracking-widest uppercase transition-all duration-300 transform active:scale-95 cursor-pointer shadow-sm border border-coffee/5 font-semibold"
                        >
                          Quick Add
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Dynamic wide promo cards (Section 2 child content) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-coffee/10">
              
              {/* Promo Item 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-64 rounded-2xl overflow-hidden border border-coffee/5 shadow-md flex items-center justify-start p-8 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-cover bg-center duration-700 group-hover:scale-105 pointer-events-none"
                     style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800')` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-coffee/95 via-coffee/70 to-transparent" />
                
                <div className="relative z-10 max-w-xs space-y-4 text-left">
                  <span className="bg-terracotta text-white font-mono text-[8.5px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg border border-white/10">
                    WEEKDAY SECRET
                  </span>
                  <h3 className="font-serif-cormorant text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                    Buy 1 Get 1 <br />Cocoa Biscuit
                  </h3>
                  <p className="font-sans-jakarta text-[11px] text-text-muted leading-relaxed font-light">
                    Redeem on orders before 11AM from Monday to Thursday. Crafted with high-fat cocoa shells.
                  </p>
                  <button 
                    onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1.5 text-[#FFFFFF] hover:text-terracotta transition-colors font-mono text-[9px] font-bold uppercase tracking-widest"
                  >
                    Claim Butter Offer <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>

              {/* Promo Item 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-64 rounded-2xl overflow-hidden border border-coffee/5 shadow-md flex items-center justify-start p-8 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-cover bg-center duration-700 group-hover:scale-105 pointer-events-none"
                     style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800')` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-coffee/95 via-coffee/70 to-transparent" />
                
                <div className="relative z-10 max-w-xs space-y-4 text-left">
                  <span className="bg-[#D2DFD3] text-coffee font-mono text-[8.5px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg border border-white/10">
                    COFFEE WEEKENDER
                  </span>
                  <h3 className="font-serif-cormorant text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                    Get 50% Off <br />Iced Mocha Latte
                  </h3>
                  <p className="font-sans-jakarta text-[11px] text-text-muted leading-relaxed font-light">
                    Melted single origin chocolate blended with local double espresso foam on crushed block ice crystals.
                  </p>
                  <button 
                    onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1.5 text-[#FFFFFF] hover:text-terracotta transition-colors font-mono text-[9px] font-bold uppercase tracking-widest"
                  >
                    Claim Iced Mocha <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* SECTION 3 — "HOW IT'S BREWED" (Numbered Step Scroll Reveal) */}
        <section ref={brewRef} className="relative bg-[#1E1511] text-text-cream py-24 px-6 md:px-12 overflow-hidden border-t border-b border-white/5" id="how-its-brewed">
          
          {/* Faint grid lines backing */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
            
            {/* Left Hand Numbered Stepper */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-10 z-10 text-left">
              
              <div className="space-y-4">
                <span className="font-mono text-[10px] tracking-[0.35em] text-terracotta block uppercase font-bold">
                  PRECISION METHODOLOGY / STEP REVEAL
                </span>
                <h2 className="font-serif-cormorant text-4xl md:text-6xl font-bold uppercase tracking-tight text-text-cream font-optical-headline">
                  From Bean to Cup
                </h2>
                <div className="h-0.5 w-16 bg-terracotta rounded-full" />
                <p className="font-serif-fraunces text-base md:text-lg italic text-[#D1C5B5] max-w-xl">
                  Each bean undergoes a highly disciplined four-stage sequence, ensuring optimal chemical yields and structural aroma integrity.
                </p>
              </div>

              {/* Numbered Stepper Column */}
              <div className="relative pl-6 border-l border-white/10 space-y-8 mt-12">
                {[
                  {
                    num: "01",
                    title: "Single-Origin Sourcing",
                    desc: "We buy raw green beans directly from sustainable micro-lots in Gedeo, Ethiopia and Caldas, Colombia at fair trade premium values."
                  },
                  {
                    num: "02",
                    title: "Thermostatic Micro-Roasts",
                    desc: "Green beans are locally caramelised in micro-batches with slow coconut-butter treatments to create deep, dark, aromatic sugars."
                  },
                  {
                    num: "03",
                    title: "Hydro-Extraction",
                    desc: "Slow gravity filtration uses water pressurized strictly to 9 bar and heated to exactly 92.5°C to extract aromatic oils flawlessly."
                  },
                  {
                    num: "04",
                    title: "Thermos Bottle Seal",
                    desc: "Beverages are poured instantly in chilled wax-sealed apothecary bottles or thick double-walled clay cups to block air oxidation."
                  }
                ].map((step, i) => {
                  // Determine whether this step is currently highlighted based on scrolled progress
                  // Segment divisions: 0.1-0.3, 0.3-0.5, 0.5-0.7, 0.7-0.9
                  const startProgress = 0.15 + (i * 0.2);
                  const endProgress = startProgress + 0.2;
                  const isHighlighted = brewProgress >= startProgress && brewProgress <= endProgress;

                  return (
                    <div key={i} className="relative group transition-all duration-300">
                      
                      {/* Active indicator horizontal tick line */}
                      <div className="absolute -left-[25px] top-3.5 w-3 h-[1px] bg-white transition-all duration-300"
                           style={{ backgroundColor: isHighlighted ? '#C77B4A' : 'rgba(255,255,255,0.15)', width: isHighlighted ? '14px' : '8px' }} />

                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-terracotta font-bold tracking-wider">{step.num} //</span>
                          <h4 className="font-serif-fraunces text-xl font-bold transition-all duration-300 uppercase tracking-tight"
                              style={{ color: isHighlighted ? '#FFFFFF' : 'rgba(245,239,230,0.45)' }}>
                            {step.title}
                          </h4>
                        </div>
                        <p className="font-sans-jakarta text-[11.5px] leading-relaxed transition-all duration-300 max-w-md font-light"
                           style={{ color: isHighlighted ? '#D1C5B5' : 'rgba(209,197,181,0.25)' }}>
                          {step.desc}
                        </p>
                      </div>

                    </div>
                  );
                })}

                {/* Vertical Scroll Scrub Progress Track line overlay */}
                <div className="absolute left-0 top-0 h-full w-[1px] bg-white/5 -translate-x-[25px]" />
                <div className="absolute left-0 top-0 w-[1px] bg-terracotta -translate-x-[25px] transition-all duration-150"
                     style={{ height: `${brewProgress * 100}%` }} />

              </div>

            </div>

            {/* Right Hand Static High-fidelity Bag Illustration / Coffee close-up */}
            <div className="lg:col-span-5 flex justify-center items-center relative z-10 p-6">
              <div className="relative w-full max-w-[340px] aspect-[4/5] bg-zinc-950/40 rounded-2xl border border-white/10 p-4 shadow-2xl flex flex-col justify-between overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-10" />
                
                {/* Image backing */}
                <div className="absolute inset-2 overflow-hidden rounded-xl bg-bg-dark border border-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800" 
                    alt="Precision filter drip close-up" 
                    className="w-full h-full object-cover grayscale-[15%] opacity-90 scale-102 group-hover:scale-105 duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1511]/90 via-transparent to-[#1E1511]/30" />
                </div>

                {/* Steaming absolute Canvas overlay on container */}
                <SteamCanvas />

                {/* Typography branding overlays */}
                <div className="relative z-10 flex justify-between items-start w-full text-white font-mono text-[8px] uppercase tracking-[0.25em] p-1">
                  <span>MALAYSIAN ROASTER</span>
                  <span>NO. 00-4</span>
                </div>

                <div className="relative z-10 space-y-1.5 p-2 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg text-left">
                  <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#C77B4A] font-bold">BATCH SPECS</span>
                  <p className="font-serif-fraunces text-base font-semibold leading-tight text-white mb-0.5">
                    "Ethio-Colombia House Blend"
                  </p>
                  <div className="flex gap-4 font-mono text-[6.5px] text-[#FFFFFF]/50 uppercase tracking-widest leading-none pt-1">
                    <span>9 bar extract</span>
                    <span>1:15 ratio</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4 — DAILY DEAL (Bento grid style over Wood/Coffee aesthetic) */}
        <section className="relative bg-[#FAF6F0] text-coffee py-20 px-6 md:px-12 border-b border-coffee/10" id="daily-deal">
          <div className="max-w-7xl mx-auto">
            
            {/* Header label */}
            <div className="text-center space-y-3 mb-12">
              <span className="font-mono text-[10px] tracking-[0.3em] text-terracotta font-bold uppercase inline-block bg-sage-light/60 px-3 py-1 rounded-sm border border-sage/40">
                † EXCLUSIVE OFFERS / COMPANIONSHIP
              </span>
              <h2 className="font-serif-cormorant text-4xl md:text-6xl font-bold uppercase tracking-tight text-coffee">
                Daily Coffee Rituals
              </h2>
              <p className="font-serif-fraunces text-base md:text-lg italic text-coffee/70 max-w-xl mx-auto">
                Carefully composed pairings designed to maximize sweetness and bring warmth to slow urban mornings.
              </p>
            </div>

            {/* Bento grids containing Deals and Newsletters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              
              {/* Card 1: Deal Discount ticket-strip mock */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:col-span-5 bg-coffee text-text-cream rounded-2xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                {/* Stained wood background image overlay */}
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15 pointer-events-none"
                     style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400')` }} />
                
                <div className="relative z-10 space-y-4 text-left">
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] bg-terracotta/20 text-[#C77B4A] border border-[#C77B4A]/40 px-3 py-1 rounded">
                    PROMO TICKET DE-09
                  </span>
                  <h3 className="font-serif-fraunces text-3xl font-bold tracking-tight text-text-cream leading-tight">
                    The Afternoon Slow Filter Set
                  </h3>
                  <p className="font-sans-jakarta text-[11.5px] text-[#D1C5B5] leading-relaxed font-light">
                    Redeem one pour-over drip coffee of any Single Origin micro-lot paired with our signature warm crusty Kaya Butter Toast for a sweet, caramelized lunch reward.
                  </p>

                  <div className="flex gap-4 pt-4 text-left">
                    <div className="flex flex-col">
                      <span className="font-mono text-[7px] text-[#FFFFFF]/35 uppercase tracking-widest">ORIGINAL</span>
                      <span className="font-serif-fraunces text-lg text-[#FFFFFF]/50 line-through">RM 24.00</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[7px] text-terracotta uppercase tracking-widest">SET PRICE</span>
                      <span className="font-serif-fraunces text-xl text-white font-bold">RM 16.50 only</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 relative z-10">
                  <button 
                    onClick={() => {
                      addToCart({
                        id: "promo-set-01",
                        name: "Afternoon Slow Filter Set",
                        price: 4.20, // USD consistency
                        size: "Promo Combo",
                        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400"
                      });
                    }}
                    className="w-full bg-[#FFFFFF] hover:bg-terracotta hover:text-white text-coffee font-mono text-[9px] font-bold uppercase tracking-widest py-3 px-5 rounded-lg shadow-md transition-all duration-300 cursor-pointer text-center"
                  >
                    Add Ritual to Cart
                  </button>
                  <span className="text-[7.5px] font-mono text-center block mt-2 text-[#FFFFFF]/35 tracking-wider">REDEEMABLE INSTANTLY VIA MOBILE CHECKOUT</span>
                </div>
              </motion.div>

              {/* Card 2: Food pairing close-up photo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
                className="lg:col-span-4 bg-white rounded-2xl p-6 flex flex-col justify-between border border-coffee/5 shadow-sm overflow-hidden group"
              >
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-coffee/5">
                  <img 
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600" 
                    alt="Artisanal French croissant and drip coffee on table" 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-103 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F19]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="space-y-1.5 pt-4 text-left">
                  <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#CE7F51] font-bold">CRAFT PAIRINGS</span>
                  <h4 className="font-serif-fraunces text-base font-bold text-coffee uppercase">Salted Duck Egg & Canele</h4>
                  <p className="font-sans-jakarta text-[11px] text-coffee/60 leading-relaxed font-light">
                    French canelé flavored with Malacca palm Gula Melaka sugar, and a flaky gold laminated croissant containing cured salted egg yolks.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Modern Newsletter signup card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="lg:col-span-3 bg-[#EBF1EC] rounded-2xl p-8 flex flex-col justify-between border border-sage/60 shadow-sm relative overflow-hidden text-left"
              >
                {/* Visual leaf sketch background hint */}
                <div className="space-y-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#C77B4A] font-bold">
                    SUBSCRIBE / LOG BOOK
                  </span>
                  <h3 className="font-serif-fraunces text-2xl font-bold tracking-tight text-coffee leading-tight">
                    Join the Coffee Log
                  </h3>
                  <p className="font-sans-jakarta text-[11px] text-coffee/70 leading-relaxed font-light">
                    Receive weekly analytical essays, green bean micro-lot roast arrivals, and priority booking passcodes.
                  </p>
                </div>

                <form onSubmit={handleNewsletter} className="mt-8 space-y-3.5 relative z-10">
                  <div className="space-y-1">
                    <label htmlFor="news-email" className="font-mono text-[7px] text-coffee/50 uppercase tracking-widest block">EMAILING ADDRESS</label>
                    <input 
                      id="news-email"
                      type="email" 
                      placeholder="e.g. harith@bangsar.my"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-sage text-xs py-2 px-3 rounded text-coffee focus:outline-none focus:ring-1 focus:ring-terracotta"
                      required
                    />
                  </div>

                  {newsletterStatus === 'success' ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-green-100 border border-green-200 text-green-900 py-2 px-3 rounded text-[10px] font-mono flex items-center gap-1.5"
                    >
                      <Check size={12} />
                      Log updated. Welcome!
                    </motion.div>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 bg-coffee hover:bg-terracotta text-text-cream hover:text-white py-2 px-4 rounded font-mono text-[9px] tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
                    >
                      Subscribe
                      <Send size={11} />
                    </button>
                  )}
                </form>

              </motion.div>

            </div>

          </div>
        </section>

        {/* SECTION 5 — TESTIMONIALS ("Loved By Many") */}
        <section className="relative bg-[#FFFFFF] text-coffee py-24 px-6 md:px-12 overflow-hidden" id="testimonials">
          
          {/* Circular color spots blurred behind grids */}
          <div className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full bg-[#FAF6F0] filter blur-[100px] pointer-events-none opacity-40" />
          <div className="absolute right-1/4 bottom-1/3 w-96 h-96 rounded-full bg-[#EBF1EC] filter blur-[100px] pointer-events-none opacity-40" />

          <div className="max-w-7xl mx-auto space-y-14">
            
            {/* Title Block */}
            <div className="text-center space-y-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-terracotta font-bold uppercase inline-block bg-sage-light/60 px-3 py-1 rounded-sm border border-sage/40">
                † CUSTOMER JOURNAL / TESTIMONIALS
              </span>
              <h2 className="font-serif-cormorant text-4xl md:text-6xl font-bold uppercase tracking-tight text-coffee leading-tight max-w-3xl mx-auto">
                Loyal Customers. Unforgettable Taste.
              </h2>
              <div className="w-16 h-[2px] bg-terracotta mx-auto rounded-full" />
              <p className="font-serif-fraunces text-base md:text-lg italic text-coffee/70 max-w-lg mx-auto">
                "We make slow days better. Read through our daily visitors logs in Bangsar, Kuala Lumpur."
              </p>
            </div>

            {/* Grid of 6 glass-panel style cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CUSTOMER_REVIEWS.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true, margin: '-5%' }}
                  className="bg-[#FAF6F0]/65 hover:bg-[#FAF6F0] backdrop-blur-md rounded-2xl p-6 border border-[#2B1F19]/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <p className="font-serif-fraunces text-xs italic text-coffee/85 leading-relaxed font-light mb-6">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-coffee/5">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full object-cover border border-coffee/10 grayscale-[30%]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif-fraunces text-xs font-bold text-coffee uppercase leading-tight">{review.name}</h4>
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-coffee/40 font-medium">{review.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Explore CTA Button */}
            <div className="text-center pt-6">
              <button
                onClick={() => {
                  document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 bg-coffee hover:bg-terracotta hover:text-white text-text-cream transition-all duration-300 py-3.5 px-8 rounded-full font-mono text-[9px] tracking-widest uppercase font-semibold cursor-pointer shadow-lg hover:-translate-y-0.5"
              >
                Explore Full Menu
                <Utensils size={13} />
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative bg-[#1E1511] text-[#FAF6F0] pt-20 pb-12 border-t border-white/5 px-6 md:px-12 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-16">
          
          {/* Logo & Info column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group text-left cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center text-white font-serif-fraunces font-bold text-lg">
                K
              </div>
              <div>
                <span className="font-serif-fraunces text-base md:text-lg font-bold tracking-tight text-white block">
                  Kopi & Co.
                </span>
                <span className="font-mono text-[8px] tracking-[0.2em] text-terracotta uppercase block">
                  · Established 2026 ·
                </span>
              </div>
            </div>
            
            <p className="font-sans-jakarta text-[11.5px] text-text-muted leading-relaxed font-light">
              We curate slow coffee rituals, bringing Japanese Kissaten-standard filtered drip coffee and traditional charcoal-roasted robustas to quiet spaces.
            </p>

            <div className="flex gap-2.5 pt-2">
              <span className="font-mono text-[8px] uppercase tracking-widest text-terracotta font-bold">ADDRESS //</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-text-muted">Bangsar, Kuala Lumpur</span>
            </div>
          </div>

          {/* Sibling column: Shop menu */}
          <div className="space-y-4">
            <h4 className="font-serif-fraunces text-sm font-bold uppercase tracking-wider text-white">Featured Menu</h4>
            <ul className="space-y-2.5 font-mono text-[10px] text-text-muted uppercase tracking-widest">
              <li>
                <button onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-terracotta transition-colors">Traditional Black Kopi O</button>
              </li>
              <li>
                <button onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-terracotta transition-colors">18H Kyoto Glass Drip</button>
              </li>
              <li>
                <button onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-terracotta transition-colors">Matcha Oat Ristretto</button>
              </li>
              <li>
                <button onClick={() => document.getElementById('menu-showcase')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-terracotta transition-colors">Kaya Butter Sourdough Toast</button>
              </li>
            </ul>
          </div>

          {/* Our coffee metrics */}
          <div className="space-y-4">
            <h4 className="font-serif-fraunces text-sm font-bold uppercase tracking-wider text-white">Our Coffee Philosophy</h4>
            <ul className="space-y-2.5 font-mono text-[10px] text-text-muted uppercase tracking-widest">
              <li>92.5°C precise brew water</li>
              <li>9 bar mechanical extraction</li>
              <li>Charcoal coconut butter roast</li>
              <li>Fair-trade sustainable farms</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-5">
            <h4 className="font-serif-fraunces text-sm font-bold uppercase tracking-wider text-white">Contact Space</h4>
            
            <div className="space-y-2.5 font-mono text-[10px] text-text-muted tracking-wide">
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-terracotta" />
                <span>+60 3-2284 9900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-terracotta" />
                <span>hello@kopicodesign.my</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-terracotta" />
                <span>Jalan Telawi, Bangsar Baru, KL</span>
              </div>
            </div>

            <button 
              onClick={() => setIsReserveModalOpen(true)}
              className="w-full bg-white text-black hover:bg-terracotta hover:text-white py-2 px-4 rounded font-mono text-[9px] tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer text-center"
            >
              Book Table
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center text-text-muted font-mono text-[9px] tracking-widest uppercase gap-4">
          <span className="opacity-40">© 2026 Kopi & Co. All rights reserved.</span>
          <div className="flex gap-6 opacity-60">
            <span className="hover:text-terracotta cursor-pointer transition-colors">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-terracotta cursor-pointer transition-colors">Zine Terms of Use</span>
          </div>
        </div>
      </footer>

      {/* RETHINKING RESERVATIONS: GLASS DRAWER MODAL */}
      <AnimatePresence>
        {isReserveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Inner Ticket form modal inside perspective container */}
            <motion.div
              initial={{ scale: 0.93, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 25, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-md bg-warm-cream text-coffee rounded-2xl border border-coffee/15 shadow-2xl p-6 md:p-8 overflow-hidden zine-paper-texture flex flex-col justify-between"
            >
              
              {/* Outer physical tear detail on top of dialogue frame */}
              <div className="absolute top-0 inset-x-0 h-4 bg-coffee opacity-5 ticket-edge-top" />

              <div className="flex justify-between items-start pt-1">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-terracotta font-bold">
                    † LOG BOOK ARCHIVES / SEATING RESERVATION
                  </span>
                  <h3 className="font-serif-fraunces text-2xl font-bold uppercase tracking-tight text-coffee mt-1">
                    Book Seating Space
                  </h3>
                </div>
                <button 
                  onClick={() => setIsReserveModalOpen(false)}
                  className="p-1 text-coffee/30 hover:text-coffee transition-colors rounded-full cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {bookingResponse ? (
                // Successfully printed physical-style receipt mock
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-6 pt-6 text-left"
                >
                  <div className="bg-[#FFFFFF] border-2 border-dashed border-coffee/20 p-5 rounded-lg font-mono text-[10px] text-coffee space-y-4">
                    <div className="text-center font-bold tracking-wider uppercase border-b border-coffee/10 pb-3">
                      <span>** KOPI & CO. CONFIRMATION **</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-coffee/40 uppercase block text-[8px]">PASS HOLDER</span>
                        <span className="font-bold">{bookingResponse.name}</span>
                      </div>
                      <div>
                        <span className="text-coffee/40 uppercase block text-[8px]">CONTACT SECURE</span>
                        <span>{bookingResponse.email}</span>
                      </div>
                      <div>
                        <span className="text-coffee/40 uppercase block text-[8px]">CALENDAR DATE</span>
                        <span className="font-bold">{bookingResponse.date}</span>
                      </div>
                      <div>
                        <span className="text-coffee/40 uppercase block text-[8px]">CLOCK HOUR</span>
                        <span className="font-bold">{bookingResponse.time}</span>
                      </div>
                      <div>
                        <span className="text-coffee/40 uppercase block text-[8px]">TOTAL PARTY</span>
                        <span>{bookingResponse.guests} Visitors</span>
                      </div>
                      <div>
                        <span className="text-coffee/40 uppercase block text-[8px]">STATUS ENTRY</span>
                        <span className="text-green-700 font-bold">APPROVED PASSPORT</span>
                      </div>
                    </div>

                    <div className="text-center border-t border-coffee/10 pt-4 leading-relaxed font-serif-fraunces italic text-coffee/60 text-xs">
                      "held in quiet observation. Traditional pour-over scheduled."
                    </div>

                    {/* Barcode representation */}
                    <div className="h-8 bg-zinc-900 overflow-hidden flex justify-between gap-0.5 px-3 py-1 opacity-80">
                      {[1,3,1,1,4,2,3,1,1,2,4,1,3,1,3,1,2,3,1,1,4,1,3,2,1].map((bar, idx) => (
                        <div key={idx} className="h-full bg-white block flex-grow rounded-xs" style={{ width: `${bar * 1}px` }} />
                      ))}
                    </div>

                  </div>

                  <button
                    onClick={resetBooking}
                    className="w-full bg-coffee hover:bg-terracotta text-text-cream hover:text-white py-3 px-5 rounded-lg font-mono text-[9px] tracking-widest uppercase transition-all duration-300 font-bold text-center cursor-pointer"
                  >
                    Reserve another Space
                  </button>
                </motion.div>
              ) : (
                // Reservation Input form HTML
                <form onSubmit={submitBooking} className="space-y-4 pt-6 text-left">
                  <div className="space-y-1">
                    <label htmlFor="fullname" className="font-mono text-[8px] text-coffee/50 uppercase tracking-widest block font-bold">YOUR FULL NAME</label>
                    <input 
                      id="fullname"
                      type="text" 
                      placeholder="e.g. Harith Kamal"
                      value={reserveName}
                      onChange={(e) => setReserveName(e.target.value)}
                      className="w-full bg-[#FFFFFF]/80 border border-coffee/15 focus:border-terracotta text-xs py-3 px-4 rounded focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="emailaddress" className="font-mono text-[8px] text-coffee/50 uppercase tracking-widest block font-bold">EMAIL FOR PASSPORT CONFIRMATION</label>
                    <input 
                      id="emailaddress"
                      type="email" 
                      placeholder="e.g. harith@bangsar.my"
                      value={reserveEmail}
                      onChange={(e) => setReserveEmail(e.target.value)}
                      className="w-full bg-[#FFFFFF]/80 border border-coffee/15 focus:border-terracotta text-xs py-3 px-4 rounded focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="bookingdate" className="font-mono text-[8px] text-coffee/50 uppercase tracking-widest block font-bold">RESERVATION DATE</label>
                      <input 
                        id="bookingdate"
                        type="date" 
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full bg-[#FFFFFF]/80 border border-coffee/15 focus:border-terracotta text-xs py-3 px-3 rounded focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="bookingtime" className="font-mono text-[8px] text-coffee/50 uppercase tracking-widest block font-bold">SEATING TIME</label>
                      <select 
                        id="bookingtime"
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full bg-[#FFFFFF]/80 border border-coffee/15 focus:border-terracotta text-xs py-3 px-3 rounded focus:outline-none"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="totalguests" className="font-mono text-[8px] text-coffee/50 uppercase tracking-widest block font-bold">NUMBER of GUESTS</label>
                    <select 
                      id="totalguests"
                      value={reserveGuests}
                      onChange={(e) => setReserveGuests(parseInt(e.target.value))}
                      className="w-full bg-[#FFFFFF]/80 border border-coffee/15 focus:border-terracotta text-xs py-3 px-4 rounded focus:outline-none"
                    >
                      <option value="1">1 Person (Solo table)</option>
                      <option value="2">2 Persons (Standard table)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons (Sharing board)</option>
                      <option value="6">6 Persons (Large family box)</option>
                    </select>
                  </div>

                  <div className="bg-[#FFFFFF]/40 border border-coffee/10 p-4.5 rounded-lg space-y-1 text-xs">
                    <span className="font-mono text-[8px] text-terracotta uppercase tracking-widest block font-bold">TICKET TERMS</span>
                    <p className="font-sans-jakarta text-[10.5px] leading-relaxed text-coffee/60 font-light">
                       seatholders are requested to maintain ambient quiet, respecting the silent study hours from 2PM to 5PM daily.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full bg-coffee hover:bg-terracotta text-text-cream hover:text-white py-3.5 px-5 rounded-lg font-mono text-[10px] tracking-widest uppercase transition-all duration-300 font-bold text-center cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingBooking ? 'Acquiring Entry...' : 'Print Invitation Passport'}
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHOPPING CART DRAWER (Slide in from Right) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop closer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              className="relative w-full max-w-md h-full bg-[#FAF6F0] text-coffee shadow-2xl flex flex-col justify-between border-l border-coffee/10 z-10"
            >
              
              {/* Receipt edge top decoration */}
              <div className="absolute top-0 inset-x-0 h-4 bg-coffee opacity-5 ticket-edge-top z-10 pointer-events-none" />

              {/* Header inside the drawer */}
              <div className="p-6 md:p-8 border-b border-coffee/15 flex justify-between items-center bg-[#FFFFFF] pt-10">
                <div>
                  <span className="font-mono text-[80%] uppercase tracking-widest text-[#CE7F51] font-bold">ESTABLISHED PASS</span>
                  <h3 className="font-serif-fraunces text-2xl font-bold tracking-tight text-coffee mt-0.5 flex items-center gap-1.5 uppercase">
                    Your Cart <span className="font-mono text-[11px] bg-coffee text-text-cream rounded-full px-2 py-0.5">{cartItemCount}</span>
                  </h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-coffee/30 hover:text-coffee transition-colors rounded-full border border-coffee/10 hover:border-coffee/20 cursor-pointer"
                  aria-label="Close Shopping Cart"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart Items list area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 pointer-events-none select-none">
                    <div className="w-16 h-16 rounded-full bg-coffee/5 flex items-center justify-center text-coffee/30">
                      <ShoppingBag size={28} />
                    </div>
                    <div className="space-y-1">
                      <span className="font-serif-fraunces text-lg font-bold text-coffee">Your Cart is Empty</span>
                      <p className="font-sans-jakarta text-xs text-coffee/50 max-w-xs font-light">
                        Select a premium single-origin drink or caramelized pandan canelé to launch your coffee log experience.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div 
                        key={item.cartId}
                        className="flex items-center gap-4 bg-[#FFFFFF] p-3 rounded-xl border border-coffee/5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 rounded-lg object-cover border border-coffee/10 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex-1 min-w-0 text-left space-y-1">
                          <h4 className="font-serif-fraunces text-xs font-bold text-coffee truncate uppercase">{item.name}</h4>
                          <span className="font-mono text-[8px] uppercase tracking-wider block text-coffee/40">Size: {item.size}</span>
                          <span className="font-mono text-xs text-terracotta font-semibold">${item.price.toFixed(2)} each</span>
                        </div>

                        {/* Adjust qty pill */}
                        <div className="flex items-center gap-2 border border-coffee/10 rounded-lg px-2 py-1">
                          <button 
                            onClick={() => adjustQty(item.cartId, -1)}
                            className="p-0.5 text-coffee/60 hover:text-coffee transition-colors cursor-pointer"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-mono text-[11px] font-bold min-w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => adjustQty(item.cartId, 1)}
                            className="p-0.5 text-coffee/60 hover:text-coffee transition-colors cursor-pointer"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal summary drawer footer */}
              {cartItems.length > 0 && (
                <div className="p-6 md:p-8 bg-[#FFFFFF] border-t border-coffee/15 space-y-4">
                  <div className="space-y-2.5 font-mono text-xs text-coffee">
                    <div className="flex justify-between items-center text-[10px] text-coffee/50">
                      <span>BAG INTEGRATION QUANTITY</span>
                      <span>{cartItemCount} Items</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-coffee/50">
                      <span>PACKAGING & LEVY FEE</span>
                      <span className="text-green-700">FREE ENTRY</span>
                    </div>
                    <div className="h-[1px] bg-coffee/10 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="font-serif-fraunces text-sm font-bold uppercase">Estimated Subtotal</span>
                      <span className="font-serif-fraunces text-xl font-bold text-terracotta">${cartSubtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Complete checkout mockup triggers alert state */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        alert(`Proceeding to checkout with estimated value of $${cartSubtotal.toFixed(2)}. Traditional single-origin extraction started!`);
                        setCartItems([]);
                        setIsCartOpen(false);
                      }}
                      className="w-full bg-coffee hover:bg-terracotta text-text-cream hover:text-white py-3.5 px-6 rounded-xl font-mono text-[10px] tracking-widest uppercase transition-all duration-300 font-bold block text-center cursor-pointer shadow-lg active:scale-95"
                    >
                      Complete Checkout
                    </button>
                    <span className="text-[7.5px] font-mono block text-center text-coffee/40 mt-2 uppercase tracking-wide">
                      Secure banking processing done via Kopi & Co gateway
                    </span>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

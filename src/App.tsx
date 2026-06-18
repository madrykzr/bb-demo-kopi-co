/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  Compass, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  Heart, 
  Calendar, 
  Check, 
  Coffee,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SLIDES = [
  {
    id: 'slide-01',
    category: '01 / ETHIOPIA KOCHERE',
    title: 'Kyoto Slow Drip',
    description: 'Cold-extracted over 18 slow hours in physical glass towers, yielding a transparent, nectar-like body with crisp notes of white peach, lavender, and absolute clarity.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200&auto=format&fit=crop',
    strength: 'LIGHT BREW (94°C)',
    origin: 'Kochere, Gedeo, Ethiopia'
  },
  {
    id: 'slide-02',
    category: '02 / COLOMBIA SANTA CLARA',
    title: 'Gibraltar Cortado',
    description: 'An elegant, high-definition double espresso extraction sweetened slightly by expertly steamed, textured organic milk, presenting dense cocoa and butterscotch accents.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
    strength: 'INTENSE INTRO (92°C)',
    origin: 'Santa Clara, Caldas, Colombia'
  },
  {
    id: 'slide-03',
    category: '03 / COSTA RICA ANAEROBIC',
    title: 'V60 Hand Pour',
    description: 'Meticulously crafted filter coffee poured over conical copper ridges. Showcases a vibrant, complex acidity with hints of fresh blood orange and wildflower honey.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    strength: 'FILTER SPEC (91°C)',
    origin: 'Tarrazú, Costa Rica'
  },
  {
    id: 'slide-04',
    category: '04 / UJI CEREMONIAL GRADE',
    title: 'Signature Matcha Oat',
    description: 'Vibrant, hand-whisked stoneground Uji matcha layered gracefully over velvet-textured oat milk and a concentrated ristretto core. Perfectly balanced.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200&auto=format&fit=crop',
    strength: 'LATTE BLEND (80°C)',
    origin: 'Kyoto, Japan / Uji'
  }
];

import { MENU_ITEMS } from './data/menu';
import { MenuItem, Reservation } from './types';

// Import custom zine components
import SteamCanvas from './components/SteamCanvas';
import CursorTrail from './components/CursorTrail';
import WordReveal from './components/WordReveal';
import ScheduleIndicator from './components/ScheduleIndicator';
import ReceiptItemCard from './components/ReceiptItemCard';
import { V60Icon, KettleIcon, ScaleIcon, GrinderIcon } from './components/SvgIllustrations';

type PageType = 'home' | 'menu' | 'story' | 'visit';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Reservation States
  const [reserveName, setReserveName] = useState('');
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const [reserveTime, setReserveTime] = useState('09:00');
  const [reserveGuests, setReserveGuests] = useState(2);
  const [silentAgreement, setSilentAgreement] = useState(false);
  const [bookingReceipt, setBookingReceipt] = useState<Reservation | null>(null);
  const [bookingAnimProgress, setBookingAnimProgress] = useState(false);

  // Menu filter
  const [menuFilter, setMenuFilter] = useState<'all' | 'drinks' | 'pastries' | 'sandwiches'>('all');

  // Active slide for modern hero carousel
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Handle Lenis smooth scrolling configuration
  useEffect(() => {
    // Scroll to top instantly on view shift
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Enable Lenis smooth scroll on fine pointer (desktop) devices
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return;

    const lenis = new Lenis({
      duration: 1.8, // Slow kinetic scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [currentPage]);

  // Handle fake reservation trigger
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveName || !reserveEmail || !silentAgreement) return;

    setBookingAnimProgress(true);
    setBookingReceipt(null);

    // Simulate vintage mechanical ticket printer printing a ticket tape
    setTimeout(() => {
      setBookingReceipt({
        name: reserveName,
        email: reserveEmail,
        date: reserveDate || new Date().toISOString().split('T')[0],
        time: reserveTime,
        guests: reserveGuests,
        notes: "Held in quiet observation. Traditional pour-over scheduled."
      });
      setBookingAnimProgress(false);
    }, 1200);
  };

  const clearBooking = () => {
    setBookingReceipt(null);
    setReserveName('');
    setReserveEmail('');
    setReserveDate('');
    setReserveTime('09:00');
    setReserveGuests(2);
    setSilentAgreement(false);
  };

  const filteredMenuItems = menuFilter === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === menuFilter);

  return (
    <div className="relative min-h-screen bg-cream text-coffee font-serif-source flex flex-col justify-between overflow-hidden">
      {/* Coffee stains paper details overlay */}
      <div className="zine-overlay" />
      <div className="absolute inset-0 zine-paper-texture pointer-events-none" />

      {/* Chilled fine-pointer pointer cursor coffee stain trail */}
      <CursorTrail />

      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-coffee/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          
          {/* Logo Brand Emblem */}
          <button 
            id="nav-logo"
            onClick={() => setCurrentPage('home')}
            className="flex flex-col items-start cursor-pointer group text-left"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif-fraunces text-lg md:text-xl font-bold tracking-tight text-coffee group-hover:text-sepia transition-colors uppercase">
                Kopi & Co
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sepia inline-block animate-pulse" />
            </div>
            <span className="font-mono text-[8px] tracking-widest text-[#B07D4A] uppercase block -mt-0.5">
              · Kedai Kopi Lambat ·
            </span>
          </button>

          {/* Desktop Navigation Links (Large screens) */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase">
            {[
              { id: 'home', label: 'THE JOURNAL', labelAlt: 'Home' },
              { id: 'menu', label: 'THE RECEIPT', labelAlt: 'Menu' },
              { id: 'story', label: 'THE CHRONICLES', labelAlt: 'Our Story' },
              { id: 'visit', label: 'THE THRESHOLD', labelAlt: 'Visit Us' }
            ].map((navItem) => (
              <button
                key={navItem.id}
                id={`nav-link-${navItem.id}`}
                onClick={() => setCurrentPage(navItem.id as PageType)}
                className={`py-1 cursor-pointer transition-all duration-300 relative group flex flex-col items-center`}
              >
                <span className={`${currentPage === navItem.id ? 'text-coffee font-semibold' : 'text-coffee/60 hover:text-coffee'}`}>
                  {navItem.label}
                </span>
                <span className="text-[8px] opacity-40 lowercase group-hover:opacity-80 transition-opacity">
                  {navItem.labelAlt}
                </span>

                {currentPage === navItem.id && (
                  <motion.span 
                    layoutId="navUnderline" 
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-sepia rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Hamburguer Toggle */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-coffee p-1 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Slide Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-pane"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-14 left-0 w-full bg-warm-cream border-b border-coffee/15 z-30 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-5 font-mono text-xs tracking-wider uppercase">
              {[
                { id: 'home', title: 'THE JOURNAL (Home)' },
                { id: 'menu', title: 'THE RECEIPT (Menu)' },
                { id: 'story', title: 'THE CHRONICLES (Our Story)' },
                { id: 'visit', title: 'THE THRESHOLD (Hours & Booking)' }
              ].map((navItem) => (
                <button
                  key={navItem.id}
                  id={`mobile-nav-${navItem.id}`}
                  onClick={() => {
                    setCurrentPage(navItem.id as PageType);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 border-b border-coffee/5 transition-colors ${
                    currentPage === navItem.id ? 'text-sepia font-bold pl-2 border-l-2 border-sepia' : 'text-coffee/70'
                  }`}
                >
                  {navItem.title}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIMARY VIEWER CONTAINER */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="w-full"
          >
            
            {/* =======================================
                PAGE 1: JOURNAL (HOME) 
                ======================================= */}
            {currentPage === 'home' && (
              <div id="view-home">
                
                {/* HERO AREA WITH IMAGERY CAROUSEL */}
                <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center border-b border-coffee/10 bg-[#12141a] text-warm-cream py-16 lg:py-24 overflow-hidden" id="hero-block">
                  {/* Subtle vector grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                  
                  {/* Decorative modern side stamp */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-12 pointer-events-none text-[9px] font-mono tracking-[0.3em] uppercase text-warm-cream/30 z-20 select-none [writing-mode:vertical-lr]">
                    <span>ESTABLISHED MCMLXXVI</span>
                    <span className="w-[1px] h-12 bg-white/20" />
                    <span>BANGSAR SPECIALTY ROASTER</span>
                  </div>

                  <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
                    
                    {/* Left text column - animated based on activeSlide */}
                    <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-20 flex flex-col items-center lg:items-start" id="hero-text-panel">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSlide}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                          className="space-y-4 md:space-y-6"
                        >
                          <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-sepia uppercase block">
                            † {SLIDES[activeSlide].category}
                          </span>
                          
                          <h1 className="font-serif-fraunces text-4xl sm:text-5xl md:text-6xl text-warm-cream font-semibold tracking-tight leading-[1.1] font-optical-headline">
                            {SLIDES[activeSlide].title}
                          </h1>
                          
                          <p className="font-serif-source text-base md:text-lg italic text-warm-cream/80 max-w-xl leading-relaxed">
                            "{SLIDES[activeSlide].description}"
                          </p>
                          
                          {/* Rich product characteristics badges */}
                          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 pt-2">
                            <span className="font-mono text-[9px] uppercase tracking-wider bg-white/10 text-warm-cream px-3 py-1 rounded-sm border border-white/15">
                              {SLIDES[activeSlide].strength}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-wider bg-sepia/20 text-sepia px-3 py-1 rounded-sm border border-sepia/35">
                              {SLIDES[activeSlide].origin}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Action buttons */}
                      <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-4">
                        <button
                          id="hero-action-menu"
                          onClick={() => setCurrentPage('menu')}
                          className="font-mono text-xs uppercase tracking-widest text-[#12141A] bg-warm-cream px-7 py-3.5 rounded-sm shadow-md hover:bg-sepia hover:text-warm-cream transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                        >
                          Read the Menu
                        </button>
                        <button
                          id="hero-action-visit"
                          onClick={() => setCurrentPage('visit')}
                          className="font-mono text-xs uppercase tracking-widest text-warm-cream border border-warm-cream/30 bg-white/5 px-7 py-3.5 rounded-sm hover:bg-white hover:text-[#12141A] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                        >
                          Visit Cafe
                        </button>
                      </div>
                    </div>

                    {/* Right column: Immersive Sliding Image Frame */}
                    <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full z-10" id="hero-image-frame-container">
                      
                      {/* The Main Big Image Track Screen */}
                      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] max-w-[500px] bg-black border border-white/10 rounded-sm overflow-hidden shadow-2xl group">
                        
                        {/* Horizontal Image slider track */}
                        <div 
                          className="absolute inset-0 flex transition-transform duration-700 ease-[0.25,1,0.5,1]" 
                          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                        >
                          {SLIDES.map((slide, idx) => (
                            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                              <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              {/* Rich filmic dark overlay vignette */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/45 pointer-events-none" />
                            </div>
                          ))}
                        </div>

                        {/* Line Art cup detail on bottom center of active slide container */}
                        <div className="absolute bottom-6 left-6 z-20 pointer-events-none bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 hidden sm:flex items-center gap-2">
                          <svg width="24" height="18" viewBox="0 0 48 34" fill="none" stroke="#FFF8E8" strokeWidth="2.2" className="opacity-90">
                            <path d="M 12 10 L 12 28 C 12 31, 32 31, 32 28 L 32 10 Z" />
                            <path d="M 32 14 C 38 14, 38 22, 32 22" />
                            <path d="M 8 28 L 36 28" />
                          </svg>
                          <span className="font-mono text-[7px] tracking-widest text-[#FFF8E8] uppercase">
                            STEAMING ACTIVE
                          </span>
                        </div>

                        {/* Floating Dynamic Steam Canvas absolute overlay */}
                        <div className="absolute inset-0 w-full h-[88%] pointer-events-none z-30 opacity-75">
                          <SteamCanvas />
                        </div>

                        {/* Next / Prev Translucent Circular Buttons Overlay inside the frame */}
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-40">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevSlide();
                            }}
                            className="w-10 h-10 rounded-full bg-black/45 hover:bg-sepia text-warm-cream border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-300 transform active:scale-95 cursor-pointer hover:border-sepia shadow-lg"
                            aria-label="Previous Slide"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextSlide();
                            }}
                            className="w-10 h-10 rounded-full bg-black/45 hover:bg-sepia text-warm-cream border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-300 transform active:scale-95 cursor-pointer hover:border-sepia shadow-lg"
                            aria-label="Next Slide"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>

                        {/* Slider Progress Indicator / Index tag */}
                        <div className="absolute top-4 right-4 z-40 bg-black/55 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 font-mono text-[10px] text-warm-cream tracking-wider flex items-center gap-2">
                          <span className="text-sepia">0{activeSlide + 1}</span>
                          <span className="opacity-30">/</span>
                          <span className="opacity-60">0{SLIDES.length}</span>
                        </div>

                        {/* Progress Bar Line at bottom of image display */}
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-40">
                          <motion.div 
                            className="h-full bg-sepia"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((activeSlide + 1) / SLIDES.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      {/* Bottom Dot indicators for direct indexing navigation */}
                      <div className="flex items-center gap-3 mt-4 z-20">
                        {SLIDES.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === activeSlide ? 'w-8 bg-sepia' : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                    </div>

                  </div>
                </section>

                {/* THE PHILOSOPHY SECTION */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-coffee/10">
                  <div className="md:col-span-4 font-mono text-[10px] tracking-widest text-sepia uppercase">
                    NO. 02 // INTENTIONAL DELAY
                    <span className="block text-xl font-serif-fraunces text-coffee leading-none mt-2 font-optical-headline">
                      the philosophy
                    </span>
                  </div>
                  <div className="md:col-span-8 space-y-6 text-left">
                    <p className="font-serif-source text-lg md:text-xl text-coffee/90 leading-relaxed">
                      We believe in letting morning hours linger. In our Bangsar corner, we roast in small batches, pulling espresso on vintage lever pistons, and pouring water slowly through folded paper filters.
                    </p>
                    <p className="font-serif-source text-base md:text-lg text-coffee/75 leading-relaxed">
                      We brought the quiet Kissaten morning to Kuala Lumpur. There are no automatic queues, no digital status screens, and no rush. We extract premium robusta alongside seasonal arabica microlots, pouring each on walnut timber slabs. Leave your hurry behind.
                    </p>
                    
                    <button 
                      onClick={() => setCurrentPage('story')}
                      className="inline-flex items-center gap-2 font-mono text-xs text-sepia tracking-widest uppercase hover:text-coffee transition-colors pt-2 group cursor-pointer"
                    >
                      <span>Read our complete story</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </section>

                {/* TODAY'S BREW SPECIFICATION HIGHLIGHT */}
                <section className="relative bg-warm-cream/50 border-b border-coffee/10 py-16">
                  {/* Subtle Background Grinder Illustration */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-15 hidden lg:block">
                    <GrinderIcon size={180} />
                  </div>

                  <div className="max-w-3xl mx-auto px-6 text-center space-y-6 relative">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-sepia bg-cream px-3 py-1 border border-coffee/10 rounded-full">
                      ★ Today's Pour-over Highlight
                    </span>
                    <h2 className="font-serif-fraunces text-3xl md:text-4xl text-coffee font-semibold tracking-tight font-optical-headline">
                      Sumatra Mandheling
                    </h2>
                    
                    <div className="border-t border-b border-dashed border-coffee/20 py-4 max-w-md mx-auto my-4 font-mono text-xs text-coffee/75 space-y-1">
                      <div className="flex justify-between"><span className="opacity-60 text-[10px]">ROAST PROFILE:</span><span className="font-bold text-coffee">Dark, Charcoal</span></div>
                      <div className="flex justify-between"><span className="opacity-60 text-[10px]">TASTING PROFILE:</span><span className="font-bold text-coffee">Earthy, Cocoa, Cedar Wood</span></div>
                      <div className="flex justify-between"><span className="opacity-60 text-[10px]">EXTRACTION:</span><span className="font-bold text-coffee">V60 Pour-over Only</span></div>
                      <div className="flex justify-between"><span className="opacity-60 text-[10px]">ALTITUDE:</span><span className="font-bold text-coffee">1,300m above sea level</span></div>
                    </div>

                    <p className="font-serif-source italic text-sm md:text-base text-coffee/75 max-w-lg mx-auto leading-relaxed">
                      "A heavy, slow cup. Bold herbal complexity with zero acidity and a rich, persistent finish of unsweetened dark cocoa butter."
                    </p>
                  </div>
                </section>

                {/* MENU PREVIEW SECTION */}
                <section className="max-w-6xl mx-auto px-6 md:px-8 py-20 space-y-12">
                  <div className="text-center space-y-3">
                    <span className="font-mono text-[9px] tracking-widest text-sepia uppercase">THE RECEIPT SAMPLE</span>
                    <h2 className="font-serif-fraunces text-3xl md:text-4xl text-coffee font-bold tracking-tight font-optical-headline">
                      Selected Offerings
                    </h2>
                    <p className="font-serif-source text-xs md:text-sm text-coffee/60 max-w-md mx-auto">
                      A visual selection of local Kopitiam classics side-by-side with modern filter extracts. Hover or tap each to view components.
                    </p>
                  </div>

                  {/* 3 Sample Items displaying Ticket Edge style */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MENU_ITEMS.filter(it => it.signature).slice(0, 3).map((item) => (
                      <div key={item.id}>
                        <ReceiptItemCard item={item} />
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <button
                      id="view-full-menu-btn"
                      onClick={() => setCurrentPage('menu')}
                      className="font-mono text-xs uppercase tracking-widest text-[#FFF8E8] bg-[#3D2A1A] hover:bg-[#B07D4A] px-8 py-4 rounded-xs shadow-sm transition-colors cursor-pointer"
                    >
                      View Full Ticket-stub Menu
                    </button>
                  </div>
                </section>

                {/* VISUAL GAZETTEER GALLERY SECTION */}
                <section className="bg-warm-cream/20 border-t border-b border-coffee/10 py-16">
                  <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-8">
                    <div className="flex justify-between items-end border-b border-coffee/10 pb-4">
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-sepia uppercase">NOJS-GAZETTEER</span>
                        <h3 className="font-serif-fraunces text-xl md:text-2xl font-bold leading-tight font-optical-headline text-coffee">
                          Zine Editorial Snaps
                        </h3>
                      </div>
                      <span className="font-mono text-[9px] text-coffee/50">FOLIO A · 2026</span>
                    </div>

                    {/* Elegant slow grid layout referencing Kinfolk magazine styling (borders, custom negative space, typography) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Photo Block 1 */}
                      <div className="md:col-span-5 bg-warm-cream border border-coffee/15 rounded-sm p-5 flex flex-row gap-5 h-[300px] zine-paper-texture overflow-hidden group hover:shadow-md transition-shadow duration-300">
                        <div className="flex-1 flex flex-col justify-between h-full">
                          <span className="font-mono text-[9px] text-sepia block">SIGHT #09</span>
                          <div className="my-auto space-y-2">
                            <p className="font-serif-fraunces text-lg leading-tight italic text-coffee">
                              "The water drops hitting the fiber, swelling in concentric rings."
                            </p>
                            <p className="font-serif-source text-[11px] text-coffee/70 leading-relaxed font-serif-source">
                              The visual geometry of slow filtration. Hand-mixed robusta blooms and extracts gracefully at 92 degrees Celsius.
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[8px] font-mono text-coffee/40">
                            <span>BANGSAR</span>
                            <span>FILE-004</span>
                          </div>
                        </div>
                        
                        {/* Vertical Image nested frame inside the card */}
                        <div className="w-[100px] sm:w-[130px] h-full rounded-xs bg-[#2D1B10] border border-coffee/10 overflow-hidden relative self-stretch flex-shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop"
                            alt="Conical filter coffee extraction"
                            className="w-full h-full object-cover opacity-90 sepia-[0.10] filter grayscale-[10%] duration-500 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Photo Block 2 */}
                      <div className="md:col-span-7 bg-coffee text-[#F5EDD7] rounded-sm p-8 flex flex-col justify-between h-[300px] relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                        {/* Immersive background photo of a turntable spinning or cozy timber room overlayed */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                          <img
                            src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop"
                            alt="Retro vinyl spinning record player warm illumination"
                            className="w-full h-full object-cover opacity-20 mix-blend-luminosity filter blur-[0.5px] transition-opacity duration-700 group-hover:opacity-35"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Kettle line illustration backing over photo for custom depth */}
                        <div className="absolute right-4 bottom-4 opacity-15 pointer-events-none z-10">
                          <KettleIcon size={180} />
                        </div>
                        
                        <span className="font-mono text-[10px] text-sepia z-10">SOUND #03</span>
                        <div className="my-auto max-w-sm space-y-2 z-10">
                          <p className="font-serif-fraunces text-2xl font-bold font-optical-headline">
                            Soft jazz records rotating on walnut timber.
                          </p>
                          <p className="font-serif-source text-xs text-cream/70 font-serif-source">
                            We curate 1950s cool jazz classics on Japanese pressings. Played quietly, so you can hear the steam valve whistling and the scratch of pencil on a journal pad.
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#F5EDD7]/40 z-10 w-full">
                          <span>AUDIO PREFERENCE</span>
                          <span>33 RPM</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>

                {/* VISIT US PREVIEW */}
                <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-sepia">THE INVITATION</span>
                  <h2 className="font-serif-fraunces text-3xl md:text-4xl text-coffee font-semibold font-optical-headline">
                    Come, take a stool.
                  </h2>
                  <p className="font-serif-source text-base text-coffee/80 max-w-lg mx-auto leading-relaxed">
                    We keep 12 wooden stools along the coffee bar and 3 small wall alcoves. No reservations needed for walk-ins, but you can request table holding before threshold entry.
                  </p>
                  
                  <div className="flex justify-center items-center gap-6 pt-4">
                    <button
                      onClick={() => setCurrentPage('visit')}
                      className="font-mono text-xs text-sepia border-b border-sepia uppercase tracking-widest pb-1 hover:text-coffee hover:border-coffee transition-all cursor-pointer"
                    >
                      Check operational hours & Hold Table
                    </button>
                  </div>
                </section>

              </div>
            )}

            {/* =======================================
                PAGE 2: MENU (THE MENU)
                ======================================= */}
            {currentPage === 'menu' && (
              <div id="view-menu" className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-12">
                
                {/* Menu Header */}
                <div className="text-center space-y-4 max-w-xl mx-auto">
                  <span className="font-mono text-[10px] tracking-widest text-[#B07D4A] uppercase block">
                    THE COMPLETE RECEIPT (BILL OF FARE)
                  </span>
                  <h1 className="font-serif-fraunces text-4xl md:text-5xl font-bold text-[#3D2A1A] leading-tight font-optical-headline">
                    The Beverage & Fuel list
                  </h1>
                  <p className="font-serif-source text-sm text-[#3D2A1A]/70 leading-relaxed">
                    Traditional Malayan Kopitiam favorites stand alongside modern pour-overs. Receipts are handcrafted on thick ivory parchment paper. Hover or tab on items to inspect components!
                  </p>
                  
                  {/* Equipment icon drawing decoration */}
                  <div className="flex justify-center gap-3 pt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B07D4A]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B07D4A]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B07D4A]" />
                  </div>
                </div>

                {/* Visual Menu Showcase Banner */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  id="menu-photo-banner"
                  className="relative w-full h-64 md:h-80 rounded-sm overflow-hidden border border-coffee/15 shadow-sm group"
                >
                  {/* Overlay text description on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#251810]/85 via-[#251810]/20 to-[#251810]/45 z-10 flex flex-col justify-between p-6 md:p-8">
                    <div className="flex justify-between items-start text-[#F5EDD7] font-mono text-[9px] tracking-widest uppercase">
                      <span>FOLIO B // COFFEE & PLATES</span>
                      <span>[ EXHIBIT B ]</span>
                    </div>
                    
                    <div className="space-y-2 text-left max-w-lg">
                      <span className="inline-block font-mono text-[8.5px] uppercase tracking-widest bg-sepia text-warm-cream px-2.5 py-0.5 rounded-full border border-warm-cream/15">
                        Authentic brewing methods
                      </span>
                      <h3 className="font-serif-fraunces text-xl md:text-3xl font-semibold text-[#FFF8E8] tracking-tight leading-tight font-optical-headline">
                        Traditional Malaysian Kopitiam roasting, met by slow Kissaten-standard filtered drip.
                      </h3>
                    </div>
                  </div>
                  
                  <img
                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop"
                    alt="Artisanal pouring coffee and visual toast showcase"
                    className="w-full h-full object-cover sepia-[0.10] filter brightness-[0.8] duration-700 ease-out group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 font-mono text-[10px] whitespace-nowrap tracking-widest uppercase border-b border-t border-coffee/10 py-3 max-w-2xl mx-auto">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'drinks', label: 'Drinks / Liquid' },
                    { id: 'pastries', label: 'Pastries / Oven' },
                    { id: 'sandwiches', label: 'Sandwiches / Toast' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      id={`filter-menu-${cat.id}`}
                      onClick={() => setMenuFilter(cat.id as any)}
                      className={`px-3 py-1 cursor-pointer transition-colors duration-300 rounded ${
                        menuFilter === cat.id 
                          ? 'bg-[#3D2A1A] text-[#FFF8E8] font-semibold' 
                          : 'text-[#3D2A1A]/60 hover:text-[#3D2A1A]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Menu Receipt Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  {filteredMenuItems.map((item) => (
                    <div key={item.id}>
                      <ReceiptItemCard item={item} />
                    </div>
                  ))}
                </div>

                {/* Sub-label information about fake site */}
                <div className="max-w-md mx-auto text-center border-t border-dashed border-coffee/20 pt-8 mt-12 space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-sepia text-[10px] font-mono uppercase">
                    <Info size={11} />
                    <span>Visual Demo Notice</span>
                  </div>
                  <p className="font-serif-source text-xs italic text-coffee/50">
                    *This is a fictional coffee house demonstration interface. All currency calculations, menu specifications, and sensory descriptors are visual decoration only.
                  </p>
                </div>

              </div>
            )}

            {/* =======================================
                PAGE 3: STORY (THE STORY)
                ======================================= */}
            {currentPage === 'story' && (
              <div id="view-story" className="max-w-4xl mx-auto px-6 md:px-8 py-16 space-y-16">
                
                {/* Header Title */}
                <div className="text-center space-y-4">
                  <span className="font-mono text-[10px] tracking-widest text-[#B07D4A] uppercase block">
                    THE CHRONICLES · NO. 03
                  </span>
                  <h1 className="font-serif-fraunces text-4xl md:text-5xl font-bold text-[#3D2A1A] font-optical-headline">
                    A quiet morning in Bangsar.
                  </h1>
                  <p className="font-mono text-[9px] text-[#3D2A1A]/50">
                    LOGGED IN OBSERVED TIME · SINCE ESTABLISHMENT 2023
                  </p>
                  
                  <div className="border-t border-coffee/15 max-w-xs mx-auto pt-4" />
                </div>

                {/* Custom illustrations floating decor */}
                <div className="flex justify-around items-center pt-4 opacity-75">
                  <KettleIcon size={90} className="text-[#3D2A1A]" />
                  <span className="w-1 h-32 border-l border-dashed border-coffee/20 hidden md:block" />
                  <GrinderIcon size={90} className="text-[#3D2A1A]" />
                </div>

                {/* Sequential story blocks utilizing WORD-BY-WORD SCROLL REVEAL component */}
                <div className="space-y-14 text-left max-w-2xl mx-auto">
                  
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-[#B07D4A] uppercase tracking-widest block">
                      CHAP. I · THE SPARK
                    </span>
                    <WordReveal 
                      text="Founded in 2023 in a quiet corner shop in Bangsar. We started Kopi & Co because we missed the slow mornings of Tokyo's old kissaten — where coffee is poured one cup at a time, paper filter fibers expand slowly, and time is allowed to pass without transactional hurry." 
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-[#B07D4A] uppercase tracking-widest block">
                      CHAP. II · THE SYNCRETISM
                    </span>
                    <WordReveal 
                      text="In Malaysia, coffee is a communal culture. However, the modern pace demands efficiency. We refuse this. For us, a cup of kopi represents ten minutes of physical meditation. We use local Robusta beans roasted with sweet butter in ancient drums, next to single-origin Arabicas brewed on precision scales. There is no contradiction. Only patience." 
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-[#B07D4A] uppercase tracking-widest block">
                      CHAP. III · THE THRESHOLD
                    </span>
                    <WordReveal 
                      text="Come, sit on our curved walnut stools. Leave the notifications outside. Listen to the slow jazz crackle on the turntable, see the steam rise from our copper kettle, and let the morning settle." 
                    />
                  </div>

                </div>

                {/* Beautiful quote board */}
                <div className="bg-warm-cream border border-coffee/10 rounded-sm p-6 max-w-xl mx-auto text-center space-y-4 zine-paper-texture">
                  <span className="font-mono text-[9px] text-sepia uppercase block">OUR GUIDING CHARTER</span>
                  <p className="font-serif-fraunces text-lg italic text-[#3D2A1A]">
                    "We allow coffee to expand. We allow silence to settle. We pour one drop at a time, and never rush the flame."
                  </p>
                  <p className="font-mono text-[8.5px] text-[#3D2A1A]/40 uppercase tracking-widest">
                    · KOPI & CO CRAFTSMAN DIRECTIVE ·
                  </p>
                </div>

              </div>
            )}

            {/* =======================================
                PAGE 4: VISIT (VISIT & BOOK)
                ======================================= */}
            {currentPage === 'visit' && (
              <div id="view-visit" className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-3">
                  <span className="font-mono text-[10px] tracking-widest text-sepia uppercase block">
                    THE THRESHOLD & CHRONOLOGY
                  </span>
                  <h1 className="font-serif-fraunces text-4xl md:text-5xl font-bold text-coffee font-optical-headline">
                    Hold a walnut stool
                  </h1>
                  <p className="font-serif-source text-sm text-coffee/65 max-w-md mx-auto">
                    Take a step into Jalan Telawi. Walk in freely at any time, or drop your credentials below to hold a guaranteed stool along our walnut bar.
                  </p>
                </div>

                {/* Column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
                  
                  {/* LEFT COLUMN: Hours, Address, and Custom Map drawing */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Live indicator block */}
                    <ScheduleIndicator />

                    {/* Fictional physical location details */}
                    <div className="border border-coffee/15 bg-warm-cream/20 p-5 rounded-sm text-left font-mono text-xs text-coffee/85 space-y-3">
                      <span className="text-[10px] uppercase text-sepia tracking-widest block">COORDINATES & ACCESS</span>
                      
                      <div className="space-y-1.5 font-serif-source">
                        <div className="flex items-start gap-2.5">
                          <MapPin size={15} className="mt-1 text-sepia shrink-0" />
                          <div>
                            <p className="font-semibold text-coffee">Kopi & Co.</p>
                            <p className="text-xs text-coffee/75">
                              Jalan Telawi 3, Bangsar Baru,<br />
                              59100 Kuala Lumpur, Malaysia
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-coffee/10 my-3" />

                        <div className="flex items-center gap-2.5 text-xs text-coffee/75">
                          <Mail size={13} className="text-sepia shrink-0" />
                          <span>hello@kopimelayu.co</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-[#3D2A1A]/75">
                          <Phone size={13} className="text-sepia shrink-0" />
                          <span>+60 3-2282 0495 (fictional)</span>
                        </div>
                      </div>
                    </div>

                    {/* CUSTOM HAND-DRAWN VEKTOR MAP */}
                    <div className="border border-coffee/15 bg-[#FFF8E8] p-5 rounded-sm text-left space-y-3 zine-paper-texture">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#B07D4A] block">
                        KISSATEN SECTOR MAP (HAND ILLUSTRATED)
                      </span>
                      
                      {/* Stylized local street grid mapping vector inside ivory card */}
                      <div className="w-full h-44 bg-cream/30 border border-coffee/10 relative rounded-xs p-2 overflow-hidden flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                          {/* Slashes/Fills backdrop */}
                          <line x1="10" y1="20" x2="190" y2="20" stroke="#3D2A1A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
                          <line x1="10" y1="100" x2="190" y2="100" stroke="#3D2A1A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
                          
                          {/* Grid/Streets */}
                          {/* Jalan Ara */}
                          <line x1="40" y1="10" x2="40" y2="110" stroke="#3D2A1A" strokeWidth="1.2" opacity="0.4" />
                          <text x="45" y="105" fontFamily="monospace" fontSize="4.5" fill="#3D2A1A" opacity="0.5" transform="rotate(-90 45 105)">Jalan Ara</text>
                          
                          {/* Jalan Telawi 3 */}
                          <line x1="0" y1="60" x2="200" y2="60" stroke="#3D2A1A" strokeWidth="2.5" />
                          <text x="75" y="55" fontFamily="monospace" fontSize="5.5" fill="#3D2A1A" fontWeight="600" letterSpacing="0.5">Jalan Telawi 3</text>
                          
                          {/* Jalan Telawi 2 */}
                          <line x1="150" y1="10" x2="150" y2="110" stroke="#3D2A1A" strokeWidth="1" opacity="0.4" />
                          <text x="155" y="105" fontFamily="monospace" fontSize="4.5" fill="#3D2A1A" opacity="0.5" transform="rotate(-90 155 105)">Jalan Telawi 2</text>
                          
                          {/* Shop marker point */}
                          <circle cx="110" cy="60" r="14" fill="#3D2A1A" opacity="0.1" />
                          <circle cx="110" cy="60" r="4" fill="#B07D4A" />
                          
                          {/* Label banner */}
                          <rect x="75" y="68" width="70" height="15" rx="1" fill="#3D2A1A" stroke="#FFF8E8" strokeWidth="0.8" />
                          <text x="110" y="77" fontFamily="serif" fontSize="5" fill="#FFF8E8" textAnchor="middle" fontWeight="bold">KOPI & CO (Corner unit)</text>
                          
                          {/* Hand compass */}
                          <line x1="180" y1="25" x2="180" y2="45" stroke="#3D2A1A" strokeWidth="0.5" />
                          <line x1="170" y1="35" x2="190" y2="35" stroke="#3D2A1A" strokeWidth="0.5" />
                          <text x="180" y="23" fontFamily="monospace" fontSize="5" fill="#3D2A1A" textAnchor="middle">N</text>
                        </svg>
                      </div>
                      <p className="font-serif-source text-[11px] italic text-[#3D2A1A]/60 leading-relaxed text-center">
                        *Located directly behind Bangsar Village mall. Green corner storefront.
                      </p>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: Interactive stool holding form */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    <div className="border border-coffee/15 bg-warm-cream p-6 md:p-8 rounded-sm text-left relative zine-paper-texture">
                      
                      {/* Interactive block wrapper */}
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#B07D4A] block mb-2">
                        BAR STOOL ARRANGEMENT REQUEST
                      </span>
                      <h2 className="font-serif-fraunces text-2xl font-bold text-coffee mb-6 pb-2 border-b border-coffee/10 font-optical-headline">
                        Check-in Table Request
                      </h2>

                      {/* Display printing animation spinner if printing */}
                      {bookingAnimProgress && (
                        <div className="flex flex-col items-center justify-center py-16 space-y-4">
                          <div className="w-10 h-10 border-4 border-sepia border-t-coffee rounded-full animate-spin" />
                          <p className="font-mono text-xs text-sepia animate-pulse uppercase tracking-wider">
                            printing paper stub reservation...
                          </p>
                        </div>
                      )}

                      {/* Display calculated success tape output if booked */}
                      {bookingReceipt && !bookingAnimProgress && (
                        <motion.div
                          id="booking-confirmation-tape"
                          initial={{ opacity: 0, height: 0, scaleY: 0.9 }}
                          animate={{ opacity: 1, height: 'auto', scaleY: 1 }}
                          className="bg-[#FFF8E8] border border-[#B07D4A]/30 p-6 rounded-xs relative ticket-edge-top shadow-md zine-paper-texture overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 right-0 h-2 bg-cream ticket-edge-top" />
                          
                          <div className="text-center space-y-2 mt-2">
                            <span className="font-mono text-[9px] tracking-widest text-sepia uppercase block">
                              SEAT CONFIRMED · RESERVATION SLIP
                            </span>
                            <div className="flex justify-center my-1">
                              <span className="bg-emerald-500/10 text-emerald-800 text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded border border-emerald-500/20">
                                COMPLETED PRINT
                              </span>
                            </div>
                            <h3 className="font-serif-fraunces text-2xl font-semibold leading-tight text-[#3D2A1A] font-optical-headline text-center">
                              Held for {bookingReceipt.name}
                            </h3>
                            <p className="font-mono text-[10px] text-coffee/65">CODE: KC-{(Math.random() * 8999 + 1000).toFixed(0)}</p>
                          </div>

                          <div className="border-t border-dashed border-coffee/20 my-4" />

                          <div className="font-mono text-xs text-[#3D2A1A]/85 space-y-2 max-w-sm mx-auto">
                            <div className="flex justify-between">
                              <span className="opacity-60 text-[10.5px]">STOOL PARTY SIZING:</span>
                              <span className="font-bold">{bookingReceipt.guests} Persons</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-60 text-[10.5px]">DEPARTURE DATE:</span>
                              <span className="font-bold">{bookingReceipt.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-60 text-[10.5px]">TARGETED HOUR:</span>
                              <span className="font-bold">{bookingReceipt.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-60 text-[10.5px]">STANDARDS:</span>
                              <span className="font-bold uppercase text-sepia">Slow Kissaten Agreement</span>
                            </div>
                          </div>

                          <div className="border-t border-dashed border-coffee/20 my-4" />

                          <div className="space-y-2 text-center">
                            <p className="font-serif-source text-xs italic text-[#3D2A1A]/70 px-2">
                              "We hold seats for up to 15 minutes past target. Please arrive with quiet attention. We await your silence."
                            </p>
                            <button
                              id="reset-booking-btn"
                              onClick={clearBooking}
                              className="mt-4 font-mono text-[9px] uppercase tracking-wider text-sepia border border-sepia/30 px-3 py-1.5 rounded hover:bg-sepia hover:text-[#FFF8E8] transition-colors"
                            >
                              File another holding request
                            </button>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 h-2 bg-cream ticket-edge-bottom" />
                        </motion.div>
                      )}

                      {/* Display original form if not submitted */}
                      {!bookingReceipt && !bookingAnimProgress && (
                        <form onSubmit={handleBookingSubmit} className="space-y-5">
                          
                          {/* Name */}
                          <div className="flex flex-col gap-1 text-left">
                            <label className="font-mono text-[10px] text-sepia uppercase tracking-widest">
                              RECIPIENT NAME
                            </label>
                            <input
                              type="text"
                              required
                              value={reserveName}
                              onChange={(e) => setReserveName(e.target.value)}
                              placeholder="e.g. Ahmad Shahrir"
                              className="w-full font-serif-source bg-cream/50 border border-coffee/20 text-coffee p-3 text-sm rounded-xs focus:outline-none focus:ring-1 focus:ring-sepia"
                            />
                          </div>

                          {/* Email */}
                          <div className="flex flex-col gap-1 text-left">
                            <label className="font-mono text-[10px] text-sepia uppercase tracking-widest">
                              CONTACT ELECTRONIC MAIL
                            </label>
                            <input
                              type="email"
                              required
                              id="input-customer-email"
                              value={reserveEmail}
                              onChange={(e) => setReserveEmail(e.target.value)}
                              placeholder="e.g. shahrir@notmail.my"
                              className="w-full font-serif-source bg-cream/50 border border-coffee/20 text-coffee p-3 text-sm rounded-xs focus:outline-none focus:ring-1 focus:ring-sepia"
                            />
                          </div>

                          {/* Date & Time */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div className="flex flex-col gap-1 text-left">
                              <label className="font-mono text-[10px] text-sepia uppercase tracking-widest">
                                CHRONOS TARGET (DATE)
                              </label>
                              <input
                                type="date"
                                value={reserveDate}
                                onChange={(e) => setReserveDate(e.target.value)}
                                className="w-full font-mono bg-cream/50 border border-coffee/20 text-coffee p-3 text-xs rounded-xs focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1 text-left">
                              <label className="font-mono text-[10px] text-sepia uppercase tracking-widest">
                                CHRONOS TARGET (HOUR)
                              </label>
                              <select
                                value={reserveTime}
                                onChange={(e) => setReserveTime(e.target.value)}
                                className="w-full font-mono bg-cream/50 border border-coffee/20 text-coffee p-2.5 text-xs rounded-xs focus:outline-none"
                              >
                                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                                  <option key={time} value={time}>{time} (8 AM - 4 PM)</option>
                                ))}
                              </select>
                            </div>

                          </div>

                          {/* Party Size */}
                          <div className="flex flex-col gap-1 text-left">
                            <label className="font-mono text-[10px] text-sepia uppercase tracking-widest">
                              PARTY SIZING (STOOLS COUNT)
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {[1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setReserveGuests(num)}
                                  className={`p-2.5 font-mono text-xs border rounded-xs transition-colors cursor-pointer ${
                                    reserveGuests === num 
                                      ? 'bg-coffee border-coffee text-warm-cream font-bold' 
                                      : 'border-coffee/20 text-coffee/70 hover:border-coffee'
                                  }`}
                                >
                                  {num} {num === 1 ? 'Stool' : 'Stools'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Slow Place Agreement Checkbox */}
                          <div className="flex items-start gap-3 bg-cream/40 p-4.5 rounded-sm border border-coffee/10 mt-2">
                            <input
                              type="checkbox"
                              id="silent-agreement"
                              required
                              checked={silentAgreement}
                              onChange={(e) => setSilentAgreement(e.target.checked)}
                              className="mt-1 accent-sepia cursor-pointer h-4 w-4 shrink-0 rounded"
                            />
                            <label htmlFor="silent-agreement" className="font-serif-source text-xs text-coffee/80 select-none cursor-pointer leading-normal">
                              I understand that Kopi & Co is a committed **slow-quiet space**. I agree to keep conversations to gentle whispers, mute digital devices, and respect our neighbors' silence.
                            </label>
                          </div>

                          {/* Actions */}
                          <button
                            type="submit"
                            id="submit-reserve-form-btn"
                            className="w-full font-mono text-xs uppercase tracking-widest text-warm-cream bg-coffee p-4 rounded-xs shadow-md hover:bg-sepia transition-colors duration-300 cursor-pointer text-center"
                          >
                            Send Bar holding request (Hold stool)
                          </button>

                        </form>
                      )}

                    </div>

                    {/* Left corner decoration illustration scales */}
                    <div className="flex justify-center opacity-60">
                      <ScaleIcon size={120} />
                    </div>

                  </div>

                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="bg-warm-cream border-t border-coffee/15 py-12 px-6 md:px-8 mt-12 text-left z-10 font-mono">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1 */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="font-serif-fraunces text-base font-bold uppercase tracking-tight text-coffee font-optical-headline">
                Kopi & Co
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sepia inline-block" />
            </div>
            <p className="font-serif-source text-xs text-coffee/70 max-w-sm leading-relaxed">
              An artisan Malaysian-Japanese kissaten concept nestled in a warm, wood-panelled street corner of Bangsar, KL. Roastings are made seasonally in ancient iron spinners.
            </p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-4 space-y-2.5 text-xs text-coffee/85">
            <span className="text-[10px] text-sepia uppercase tracking-widest font-semibold block">CHRONOLOGICAL LINKS</span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button onClick={() => setCurrentPage('home')} className="hover:text-sepia text-left cursor-pointer">† The Journal (Home)</button>
              <button onClick={() => setCurrentPage('menu')} className="hover:text-sepia text-left cursor-pointer">† The Receipt (Menu)</button>
              <button onClick={() => setCurrentPage('story')} className="hover:text-sepia text-left cursor-pointer">† Chronicles (Story)</button>
              <button onClick={() => setCurrentPage('visit')} className="hover:text-sepia text-left cursor-pointer">† Threshold (Visit)</button>
            </div>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-4 space-y-2 text-xs text-coffee/60 flex flex-col justify-end h-full">
            <span className="text-sepia text-[10px] tracking-widest uppercase font-semibold">METRICS & COMPLIANCE</span>
            <p className="font-serif-source italic text-[11px] leading-relaxed">
              "To pour is to wait. To drink is to observe." Estd 2023. Tokyo kisses, Bangsar soil.
            </p>
            <div className="border-t border-coffee/10 pt-2.5 mt-2 flex justify-between items-center text-[10px]">
              <span>Demo Concept</span>
              <span>
                built by{' '}
                <a 
                  href="https://bluebutterstudio.my" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-coffee hover:text-sepia underline decoration-sepia/40"
                >
                  Bluebutter Studio · bluebutterstudio.my
                </a>
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

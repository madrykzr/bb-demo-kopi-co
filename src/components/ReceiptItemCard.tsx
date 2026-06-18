/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MenuItem } from '../types';

// Curated high-resolution Unsplash images matching the zine's warm coffee and pastry aesthetic
const getMenuItemImage = (id: string): string => {
  const images: Record<string, string> = {
    k01: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=400&auto=format&fit=crop', // Kopi O - Traditional Black Cup
    k02: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop', // Kopi C - Warm Cup with Milk extraction
    k03: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop', // Kopi Peng - Cold Sweet Iced
    k04: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop', // V60 Pour Over Drip
    k05: 'https://images.unsplash.com/photo-151097252790b-af4f902e1de7?q=80&w=400&auto=format&fit=crop', // Aeropress Immersion Coffee
    k06: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop', // Flat White Cup Art
    p01: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop', // Kaya Toast Crusty Bread
    p02: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop', // Sweet Pandan Canelé Style
    p03: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop', // Golden Croissants
    s01: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400&auto=format&fit=crop', // Sambal Melted Sourdough Cheese Sando
    s02: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=400&auto=format&fit=crop', // Crispy Serai Chicken style
    s03: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=400&auto=format&fit=crop', // Miso Jam Egg Boule Slices
  };
  return images[id] || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop';
};

interface ReceiptItemCardProps {
  item: MenuItem;
}

export default function ReceiptItemCard({ item }: ReceiptItemCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleToggleFlip}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="group relative w-full h-[280px] perspective-1000 cursor-pointer select-none"
      id={`menu-item-${item.id}`}
    >
      {/* 3D Inner Container */}
      <div
        className={`relative w-full h-full duration-700 preserve-3d transition-all ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        
        {/* -- FRONT OF RECEIPT -- */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between bg-warm-cream border border-coffee/15 rounded-sm p-5 shadow-sm overflow-hidden z-10 zine-paper-texture">
          {/* Top Perforated Receipt Cutouts (rendered using radial gradients or dashed layout) */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-cream ticket-edge-top opacity-50" />
          
          {/* Receipt Header */}
          <div className="flex justify-between items-start pt-2">
            <div className="text-left">
              <span className="font-mono text-[9px] tracking-widest text-sepia uppercase block">KOPI & CO · ESTD 2023</span>
              <p className="font-mono text-[9px] text-coffee/60">BANGSAR / KUALA LUMPUR</p>
            </div>
            {item.signature && (
              <span className="px-1.5 py-0.5 border border-sepia font-mono text-[8px] text-sepia tracking-wider rounded uppercase">
                ★ Signature
              </span>
            )}
          </div>

          {/* Divider line */}
          <div className="border-t border-dashed border-coffee/20 my-1" />

          {/* Content Block */}
          <div className="flex-grow flex flex-col justify-center text-center py-2 h-auto">
            {item.localName && (
              <p className="font-mono text-[10px] tracking-wider text-sepia/70 uppercase mb-1">
                {item.localName}
              </p>
            )}
            <h3 className="font-serif-fraunces text-2xl lg:text-3xl text-coffee font-semibold leading-tight px-1 font-optical-headline">
              {item.name}
            </h3>
            
            {item.isLocal && (
              <span className="inline-block mx-auto mt-2 px-2 py-0.5 bg-coffee/5 text-coffee/70 font-mono text-[8px] uppercase tracking-widest rounded-full">
                Kopitiam Classic
              </span>
            )}
          </div>

          {/* Price Block & Barcode */}
          <div>
            <div className="border-t border-dashed border-coffee/20 my-1.5" />
            <div className="flex justify-between items-center bg-cream/10 p-1.5 rounded">
              <span className="font-mono text-[9px] text-coffee/60 uppercase">AMT DUE</span>
              <span className="font-mono text-lg font-bold text-coffee tracking-tight">{item.price}</span>
            </div>
            
            {/* Mock Barcode */}
            <div className="flex justify-between items-center mt-2.5 pt-1">
              <div className="flex items-center gap-[1px] opacity-70 h-4">
                <span className="w-[1px] h-full bg-coffee" />
                <span className="w-[2px] h-full bg-coffee" />
                <span className="w-[1px] h-full bg-coffee" />
                <span className="w-[3px] h-full bg-coffee" />
                <span className="w-[1px] h-full bg-coffee" />
                <span className="w-[2px] h-full bg-coffee" />
                <span className="w-[1px] h-full bg-coffee" />
                <span className="w-[4px] h-full bg-coffee" />
                <span className="w-[1px] h-full bg-coffee" />
                <span className="w-[2px] h-full bg-coffee" />
                <span className="w-[1px] h-full bg-coffee" />
              </div>
              <span className="font-mono text-[80%] text-coffee/40 text-[8px]">
                {item.id.toUpperCase()}-STUB // FLIP
              </span>
            </div>
          </div>

          {/* Bottom Perforated Cutouts */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-cream ticket-edge-bottom opacity-50" />
        </div>

        {/* -- BACK OF RECEIPT (FLIPPED STATE) -- */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between bg-warm-cream border border-coffee/20 rounded-sm p-5 shadow-sm [transform:rotateY(180deg)] overflow-hidden zine-paper-texture">
          {/* Top Perforated Cutouts */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-cream ticket-edge-top opacity-50" />
          
          {/* Back Header */}
          <div className="pt-2">
            <span className="font-mono text-[9px] tracking-widest text-sepia uppercase block">PRODUCT METRICS</span>
            <div className="border-b border-dashed border-coffee/20 mt-1" />
          </div>

          {/* Curated Product Photo */}
          <div className="w-full h-24 overflow-hidden rounded-xs border border-coffee/10 mt-2 filter sepia-[0.12] contrast-[1.05]">
            <img
              src={getMenuItemImage(item.id)}
              alt={item.name}
              className="w-full h-full object-cover rounded-xs"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Long form storytelling */}
          <div className="flex-grow flex flex-col justify-between text-left py-2 font-serif-source text-xs leading-normal text-coffee/90 overflow-y-auto max-h-[105px] pr-0.5">
            <p className="italic text-[10px] sm:text-[10.5px] leading-relaxed text-coffee/85 mb-1.5">{item.description}</p>
            
            {/* Ingredients block */}
            <div className="mt-0.5">
              <span className="font-mono text-[80%] text-sepia uppercase tracking-widest block mb-0.5">
                Components
              </span>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-mono text-[8px] text-coffee/75">
                {item.ingredients.map((ing, k) => (
                  <li key={k} className="truncate">
                    · {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Back Footer */}
          <div>
            <div className="border-t border-dashed border-coffee/20 my-1" />
            <div className="flex justify-between items-center text-[8px] font-mono text-coffee/40 pt-1">
              <span>KOPI & CO · BANGSAR</span>
              <span>100% SATISFACTION</span>
            </div>
          </div>

          {/* Bottom Perforated Cutouts */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-cream ticket-edge-bottom opacity-50" />
        </div>

      </div>
    </div>
  );
}

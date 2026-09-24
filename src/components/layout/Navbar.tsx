"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useScroll, useMotionValueEvent } from 'motion/react';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest >= 60);
  });

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-white/85 backdrop-blur-xl border-b shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex flex-col items-start gap-0.5">
          <span className="font-heading text-2xl font-bold tracking-tight text-[#1E3A2F]">LSD</span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-[#C5A880]">Property Dealer & Developer</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/properties" className="group relative text-sm font-medium text-[#1E3A2F] transition-colors hover:text-[#C5A880]">
            Constructed Homes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/plots" className="group relative text-sm font-medium text-[#1E3A2F] transition-colors hover:text-[#C5A880]">
            Open Plots
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="group relative text-sm font-medium text-[#1E3A2F] transition-colors hover:text-[#C5A880]">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/contact">
            <Button className="bg-[#1E3A2F] text-white hover:bg-[#1E3A2F]/90 rounded-none px-6">Contact Us</Button>
          </Link>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

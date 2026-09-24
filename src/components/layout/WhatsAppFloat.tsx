"use client";
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="hidden md:flex bg-white px-4 py-2 rounded-full shadow-lg border border-border text-sm font-medium text-primary">
        Chat with us
      </div>
      <Link 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-emerald-700"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
        <MessageCircle className="relative h-7 w-7 text-white" />
      </Link>
    </div>
  );
}

"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, Phone, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: 'Constructed Homes', href: '/properties' },
    { name: 'Open Plots', href: '/plots' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-black/5 h-10 w-10 text-[#1E3A2F]">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background border-l border-border/50">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Links to pages.</SheetDescription>
          <div className="flex flex-col items-start gap-1 mt-6 mb-8">
            <span className="font-heading text-2xl font-bold tracking-tight text-primary">LSD</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Property Dealer & Developer</span>
          </div>
          <div className="flex flex-col gap-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-auto absolute bottom-8 left-6 right-6 flex flex-col gap-3">
            <Button className="w-full bg-primary hover:bg-primary/90 flex gap-2" onClick={() => setOpen(false)}>
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 flex gap-2" onClick={() => setOpen(false)}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

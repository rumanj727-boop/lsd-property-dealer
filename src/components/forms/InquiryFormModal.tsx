"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface InquiryFormModalProps {
  propertyTitle: string;
}

export default function InquiryFormModal({ propertyTitle }: InquiryFormModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Name and Phone number are required.");
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        ...formData,
        interest: propertyTitle
      };

      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success("Inquiry sent successfully! We will contact you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setOpen(false);
      } else {
        toast.error("Failed to send inquiry. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full flex items-center justify-center relative overflow-hidden group text-lg h-14 bg-gradient-to-r from-[#c5a059] via-[#dfba73] to-[#c5a059] text-[#1E3A2F] hover:text-[#1E3A2F] font-semibold border-none rounded-none shadow-[0_0_20px_rgba(197,168,128,0.3)] hover:shadow-[0_0_25px_rgba(197,168,128,0.5)] transition-all duration-300">
        <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        <MessageSquare className="w-5 h-5 mr-2 relative z-10" />
        <span className="relative z-10 uppercase tracking-wider">I am Interested</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair text-[#1E3A2F]">Inquire About This Property</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Interested in <strong>{propertyTitle}</strong>? Leave your details and we will get back to you.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="When is a good time to call you?" rows={3} />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-[#1E3A2F] hover:bg-[#1E3A2F]/90 text-white mt-4">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Sending...</> : "Submit Inquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

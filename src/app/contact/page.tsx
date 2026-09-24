"use client";
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageSquare, Loader2 } from 'lucide-react';
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", interest: "", message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Name and Phone number are required.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question about a property or looking to list yours? Our team is here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Form */}
            <div className="bg-background p-8 rounded-2xl border shadow-sm">
              <h2 className="font-heading text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <input
                    type="text" id="name" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <input
                      type="email" id="email"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full h-12 px-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <input
                      type="tel" id="phone" required
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full h-12 px-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="text-sm font-medium">Property Interest</label>
                  <select
                    id="interest"
                    value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="">Select an option</option>
                    <option value="Constructed Properties">Constructed Properties</option>
                    <option value="Open Plots">Open Plots</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                  <textarea
                    id="message" rows={5}
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                    placeholder="Tell us what you are looking for..."
                  ></textarea>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-[#1E3A2F] text-white hover:bg-[#1E3A2F]/90">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Right: Contact Info Cards */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                    <p className="text-muted-foreground mb-2">We're available Mon-Sat, 9am - 7pm</p>
                    <p className="font-semibold text-lg">+91 98765 43210</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Address</h3>
                    <p className="text-muted-foreground mb-2">Drop us an email anytime</p>
                    <p className="font-semibold text-lg">info@lsdproperties.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Office Address</h3>
                    <p className="text-muted-foreground mb-2">Visit us for a consultation</p>
                    <p className="font-semibold">
                      LSD Property Dealer & Developer<br />
                      Hyderabad, Telangana, India
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-[#1E3A2F] text-white">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">WhatsApp Us</h3>
                      <p className="text-white/80 text-sm">Get instant replies</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-white text-[#1E3A2F] bg-white hover:bg-white/90">
                    Chat Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

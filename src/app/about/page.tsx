import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Eye, Heart, Scale } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | LSD Property Dealer & Developer',
  description: 'We are a new-age property firm committed to transparency, quality, and customer delight based in Hyderabad.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About LSD Property Dealer & Developer
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a new-age property firm committed to transparency, quality, and customer delight. Based in Hyderabad, we specialize in premium constructed properties and verified open plots.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-heading text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-2xl font-heading italic text-primary/80">
              "To be the most trusted name in property dealing in Hyderabad."
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="p-8 bg-card border rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Transparency</h3>
                <p className="text-muted-foreground">Clear communication and no hidden costs. We believe in complete honesty at every step.</p>
              </div>
              
              {/* Card 2 */}
              <div className="p-8 bg-card border rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Quality</h3>
                <p className="text-muted-foreground">We partner with top builders and verify every plot to ensure premium standards.</p>
              </div>

              {/* Card 3 */}
              <div className="p-8 bg-card border rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Customer First</h3>
                <p className="text-muted-foreground">Your needs drive our business. We guide you to the perfect property for your lifestyle.</p>
              </div>

              {/* Card 4 */}
              <div className="p-8 bg-card border rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Scale className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Legal Clarity</h3>
                <p className="text-muted-foreground">RERA approved, clear titles, and comprehensive legal verification for your peace of mind.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              Ready to find your dream property?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/properties">
                <Button size="lg" className="w-full sm:w-auto bg-background text-[#1E3A2F] hover:bg-background/90 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/plots">
                <Button size="lg" className="w-full sm:w-auto bg-background text-[#1E3A2F] hover:bg-background/90 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all">
                  Browse Plots
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

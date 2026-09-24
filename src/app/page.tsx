import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { constructedProperties } from '@/data/properties';
import { openPlots } from '@/data/plots';
import PropertyCard from '@/components/properties/PropertyCard';
import PlotCard from '@/components/plots/PlotCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Home as HomeIcon, MapPin } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-muted overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Background image should be placed here, using a placeholder gradient for now or an image from properties if one exists */}
            <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl pt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            >
              Your Land. <span className="gold-gradient-text">Your Legacy.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
            >
              Trusted property dealing and development in Hyderabad. Find your perfect constructed home or premium open plot with complete legal transparency.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/properties">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 flex gap-2 items-center">
                  <HomeIcon className="w-5 h-5" /> Constructed Homes
                </Button>
              </Link>
              <Link href="/plots">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-accent text-accent hover:bg-accent/10 flex gap-2 items-center backdrop-blur-sm bg-black/20">
                  <MapPin className="w-5 h-5" /> Premium Open Plots
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-20 bg-background relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: 'Verified Listings', desc: 'Every property is personally verified by our expert team.' },
                { title: 'Legal Transparency', desc: 'Clear titles, RERA compliance, and complete documentation.' },
                { title: 'Zero Hidden Charges', desc: 'What you see is exactly what you pay. No surprises.' },
                { title: 'End-to-End Support', desc: 'From site visit to registration, we are with you.' }
              ].map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                  <div className="p-6 rounded-2xl bg-card border hover:border-accent/50 transition-colors h-full flex flex-col justify-center shadow-sm hover:shadow-md">
                    <h3 className="font-bold text-lg mb-2 text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-20 bg-muted/30 relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="font-heading text-3xl font-bold flex flex-col">
                    Handpicked Properties
                    <span className="w-24 h-1 bg-accent mt-3 rounded-full"></span>
                  </h2>
                  <p className="text-muted-foreground mt-4">Explore our premium constructed homes.</p>
                </div>
                <Link href="/properties" className="text-primary font-medium hover:text-accent transition-colors hidden sm:block">View All Properties &rarr;</Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {constructedProperties.slice(0, 3).map((prop, i) => (
                <ScrollReveal key={prop.id} delay={i * 0.1}>
                  <PropertyCard property={prop} />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/properties">
                <Button variant="outline" className="w-full border-primary text-primary">View All Properties</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Plots */}
        <section className="py-20 bg-background relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="font-heading text-3xl font-bold flex flex-col">
                    Premium Plots & Land
                    <span className="w-24 h-1 bg-accent mt-3 rounded-full"></span>
                  </h2>
                  <p className="text-muted-foreground mt-4">Invest in the best open plots in prime locations.</p>
                </div>
                <Link href="/plots" className="text-primary font-medium hover:text-accent transition-colors hidden sm:block">View All Plots &rarr;</Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {openPlots.slice(0, 3).map((plot, i) => (
                <ScrollReveal key={plot.id} delay={i * 0.1}>
                  <PlotCard plot={plot} />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/plots">
                <Button variant="outline" className="w-full border-primary text-primary">View All Plots</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

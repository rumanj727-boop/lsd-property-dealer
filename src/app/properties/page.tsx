import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import { constructedProperties } from '@/data/properties';

export default function PropertiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-bold">Constructed Properties</h1>
            <p className="text-muted-foreground mt-2">Browse our handpicked apartments, villas, and row houses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constructedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { constructedProperties } from '@/data/properties';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Metadata } from 'next';
import InquiryFormModal from '@/components/forms/InquiryFormModal';

export function generateStaticParams() {
  return constructedProperties.map((property: any) => ({
    slug: property.slug || property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const property = constructedProperties.find((p: any) => 
    p.slug === resolvedParams.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === resolvedParams.slug
  );
  if (!property) return { title: 'Property Not Found' };
  return {
    title: `${property.title} | LSD Property Dealer`,
    description: property.description.substring(0, 160),
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const property = constructedProperties.find((p: any) => 
    p.slug === resolvedParams.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === resolvedParams.slug
  );

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-20 pt-20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/properties" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#1E3A2F]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </div>

        <div className="container mx-auto px-4 mb-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image 
              src={property.images[0] || '/images/placeholder.jpg'} 
              alt={property.title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="object-cover" 
            />
            <Badge className={`absolute top-4 left-4 text-lg py-1 px-4 shadow-lg ${property.status === 'Sold Out' ? 'bg-red-600 text-white' : 'bg-[#1E3A2F] text-white'}`}>
              {property.status}
            </Badge>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-[#1E3A2F]">{property.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{property.subtitle}</p>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-2 h-5 w-5 text-[#C5A880]" />
                  <span>{property.locality}, {property.city}</span>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-[#1E3A2F]">{formatPrice(property.price)}</h2>
                <p className="text-gray-500 mt-1">@ \u20B9{property.pricePerSqFt}/sq.ft</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-[#FBFBF9] rounded-xl border border-[#1E3A2F]/10">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Configuration</p>
                  <p className="font-semibold flex items-center gap-2 text-[#1E3A2F]"><Bed className="h-4 w-4 text-[#C5A880]"/> {property.bhk} BHK</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Carpet Area</p>
                  <p className="font-semibold flex items-center gap-2 text-[#1E3A2F]"><Square className="h-4 w-4 text-[#C5A880]"/> {property.carpetArea} sq.ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Super Builtup</p>
                  <p className="font-semibold text-[#1E3A2F]">{property.superBuiltupArea} sq.ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Floor</p>
                  <p className="font-semibold text-[#1E3A2F]">{property.floorNumber ? `${property.floorNumber} out of ${property.totalFloors}` : property.totalFloors}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Facing</p>
                  <p className="font-semibold text-[#1E3A2F]">{property.facing}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Furnishing</p>
                  <p className="font-semibold text-[#1E3A2F]">{property.furnishing}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Parking</p>
                  <p className="font-semibold text-[#1E3A2F]">{property.parking}</p>
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-[#1E3A2F]">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-[#1E3A2F]">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities?.map((amenity: string, index: number) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 bg-[#1E3A2F]/5 text-[#1E3A2F] border border-[#1E3A2F]/10">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white border border-[#1E3A2F]/10 rounded-xl shadow-sm">
                <h3 className="font-playfair text-xl font-bold mb-4 text-[#1E3A2F]">Property Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Builder / Developer</p>
                    <p className="font-semibold text-[#1E3A2F]">{property.builderName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Society Name</p>
                    <p className="font-semibold text-[#1E3A2F]">{property.societyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ownership</p>
                    <p className="font-semibold text-[#1E3A2F]">{property.ownership}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Possession</p>
                    <p className="font-semibold text-[#1E3A2F]">{property.possessionStatus}</p>
                  </div>
                </div>
              </div>

              {property.status === 'Sold Out' ? (
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center shadow-sm">
                  <h3 className="font-playfair text-2xl font-bold mb-2 text-gray-800">Sold Out</h3>
                  <p className="text-gray-600 text-sm mb-6">This property is no longer available. Contact us to find similar properties in this area.</p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex w-full">
                    <Button variant="outline" className="w-full border-[#1E3A2F] text-[#1E3A2F] hover:bg-[#1E3A2F]/10 h-14 rounded-none text-lg">
                      Contact for Similar
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="p-6 bg-[#FBFBF9] border border-[#C5A880]/30 rounded-xl">
                  <h3 className="font-playfair text-xl font-bold mb-2 text-[#1E3A2F]">Interested?</h3>
                  <p className="text-gray-600 text-sm mb-6">Call us at +91 98765 43210, WhatsApp us, or leave your details for a quick callback.</p>
                  <div className="space-y-3">
                    <InquiryFormModal propertyTitle={property.title} />
                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex w-full">
                      <Button variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 h-14 rounded-none text-lg">
                        WhatsApp Us
                      </Button>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

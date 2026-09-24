import { openPlots } from '@/data/plots';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Metadata } from 'next';
import InquiryFormModal from '@/components/forms/InquiryFormModal';

export function generateStaticParams() {
  return openPlots.map((plot: any) => ({
    slug: plot.slug || plot.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const plot = openPlots.find((p: any) => 
    p.slug === resolvedParams.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === resolvedParams.slug
  );
  if (!plot) return { title: 'Plot Not Found' };
  return {
    title: `${plot.title} | LSD Property Dealer`,
    description: plot.description.substring(0, 160),
  };
}

export default async function PlotPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const plot = openPlots.find((p: any) => 
    p.slug === resolvedParams.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === resolvedParams.slug
  );

  if (!plot) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-20 pt-20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/plots" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#1E3A2F]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plots
          </Link>
        </div>

        <div className="container mx-auto px-4 mb-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image 
              src={plot.images[0] || '/images/placeholder.jpg'} 
              alt={plot.title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="object-cover" 
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className={`text-lg py-1 px-4 shadow-lg ${plot.status === 'Sold Out' ? 'bg-red-600 text-white' : 'bg-[#1E3A2F] text-white'}`}>
                {plot.status}
              </Badge>
              {plot.cornerPlot && (
                <Badge className="text-lg py-1 px-4 bg-[#C5A880] text-[#1E3A2F] shadow-lg">
                  Corner Plot
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-[#1E3A2F]">{plot.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{plot.subtitle}</p>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-2 h-5 w-5 text-[#C5A880]" />
                  <span>{plot.locality}, {plot.city}</span>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-[#1E3A2F]">{formatPrice(plot.price)}</h2>
                <p className="text-gray-500 mt-1">
                  @ \u20B9{plot.pricePerSqYard ? `${plot.pricePerSqYard}/sq.yard` : `${Math.round(plot.price / plot.totalArea)}/sq.yard`}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 py-4 border-y border-[#1E3A2F]/10">
                {plot.clearTitle && (
                  <Badge variant="outline" className="text-sm py-1.5 px-3 border-[#25D366]/30 text-[#25D366] bg-[#25D366]/5">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Clear Title
                  </Badge>
                )}
                {plot.approvingAuthority && (
                  <Badge variant="outline" className="text-sm py-1.5 px-3 border-blue-500/30 text-blue-700 bg-blue-50">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> {plot.approvingAuthority}
                  </Badge>
                )}
                {plot.reraApproved && (
                  <Badge variant="outline" className="text-sm py-1.5 px-3 border-indigo-500/30 text-indigo-700 bg-indigo-50">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> RERA Approved
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-[#FBFBF9] rounded-xl border border-[#1E3A2F]/10">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Area</p>
                  <p className="font-semibold text-[#1E3A2F]">{plot.totalArea} {plot.subType === 'Agricultural' ? 'Acres' : 'sq.yards'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Area (sq.ft)</p>
                  <p className="font-semibold text-[#1E3A2F]">{plot.areaInSqFt || (plot.totalArea * 9)} sq.ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                  <p className="font-semibold text-[#1E3A2F]">{plot.dimensions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Facing</p>
                  <p className="font-semibold text-[#1E3A2F]">{plot.facing}</p>
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-[#1E3A2F]">Description</h3>
                <p className="text-gray-600 leading-relaxed">{plot.description}</p>
              </div>

              <div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-[#1E3A2F]">Infrastructure & Facilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 border border-[#1E3A2F]/10 rounded-lg">
                    {plot.water ? <CheckCircle2 className="text-[#25D366]" /> : <XCircle className="text-red-500" />}
                    <span className="font-medium text-[#1E3A2F]">Water Connection</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-[#1E3A2F]/10 rounded-lg">
                    {plot.electricity ? <CheckCircle2 className="text-[#25D366]" /> : <XCircle className="text-red-500" />}
                    <span className="font-medium text-[#1E3A2F]">Electricity</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-[#1E3A2F]/10 rounded-lg">
                    {plot.drainage ? <CheckCircle2 className="text-[#25D366]" /> : <XCircle className="text-red-500" />}
                    <span className="font-medium text-[#1E3A2F]">Drainage System</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-[#1E3A2F]/10 rounded-lg">
                    {plot.streetLights ? <CheckCircle2 className="text-[#25D366]" /> : <XCircle className="text-red-500" />}
                    <span className="font-medium text-[#1E3A2F]">Street Lights</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white border border-[#1E3A2F]/10 rounded-xl shadow-sm">
                <h3 className="font-playfair text-xl font-bold mb-4 text-[#1E3A2F]">Plot Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Layout Name</p>
                    <p className="font-semibold text-[#1E3A2F]">{plot.layoutName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Road Width</p>
                    <p className="font-semibold text-[#1E3A2F]">{plot.roadWidth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Boundary</p>
                    <p className="font-semibold text-[#1E3A2F]">{plot.boundaryWall ? "Constructed" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gated Community</p>
                    <p className="font-semibold text-[#1E3A2F]">{plot.gatedLayout ? 'Yes' : 'No'}</p>
                  </div>
                  <hr className="border-[#1E3A2F]/10" />
                  <div>
                    <p className="text-sm text-gray-500">Max Permissible Floors</p>
                    <p className="font-semibold text-[#1E3A2F]">{plot.maxPermissibleFloors || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">FSI / FAR</p>
                    <p className="font-semibold text-[#1E3A2F]">{plot.fsi || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {plot.status === 'Sold Out' ? (
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center shadow-sm">
                  <h3 className="font-playfair text-2xl font-bold mb-2 text-gray-800">Sold Out</h3>
                  <p className="text-gray-600 text-sm mb-6">This plot is no longer available. Contact us to find similar plots in this area.</p>
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
                    <InquiryFormModal propertyTitle={plot.title} />
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

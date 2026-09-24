import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Property } from '@/types/property';

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.slug}`}>
      <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image src={property.images[0]} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform hover:scale-105" />
          <Badge className={`absolute top-3 left-3 ${property.status === 'Sold Out' ? 'bg-red-600 text-white' : 'bg-primary text-primary-foreground'}`}>{property.status}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-heading text-lg font-semibold line-clamp-1">{property.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{property.locality}, {property.city}</p>
          <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Bed className="h-4 w-4"/> {property.bhk} BHK</span>
            <span className="flex items-center gap-1"><Bath className="h-4 w-4"/> {property.bathrooms} Baths</span>
            <span className="flex items-center gap-1"><Square className="h-4 w-4"/> {property.carpetArea} sqft</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t mt-4 flex items-center justify-between">
          <span className="font-bold text-lg">{formatPrice(property.price)}</span>
          <span className="text-xs text-primary font-medium">View Details &rarr;</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, Maximize, Compass } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Plot } from '@/types/plot';

export default function PlotCard({ plot }: { plot: Plot }) {
  return (
    <Link href={`/plots/${plot.slug}`}>
      <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image src={plot.images[0]} alt={plot.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform hover:scale-105" />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge className={`w-fit ${plot.status === 'Sold Out' ? 'bg-red-600 text-white' : 'bg-primary text-primary-foreground'}`}>{plot.status}</Badge>
            <Badge className="w-fit bg-secondary text-secondary-foreground">{plot.subType}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-heading text-lg font-semibold line-clamp-1">{plot.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{plot.locality}, {plot.city}</p>
          <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Maximize className="h-4 w-4"/> {plot.areaInSqFt} sqft</span>
            <span className="flex items-center gap-1"><Compass className="h-4 w-4"/> {plot.facing}</span>
            <span className="flex items-center gap-1"><Map className="h-4 w-4"/> {plot.gatedLayout ? 'Gated' : 'Open'}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t mt-4 flex items-center justify-between">
          <span className="font-bold text-lg">{formatPrice(plot.price)}</span>
          <span className="text-xs text-primary font-medium">View Details &rarr;</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

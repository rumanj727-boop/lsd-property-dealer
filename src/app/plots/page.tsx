import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PlotCard from '@/components/plots/PlotCard';
import { openPlots } from '@/data/plots';

export default function PlotsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-bold">Premium Open Plots</h1>
            <p className="text-muted-foreground mt-2">Invest in fully verified and approved plots and land.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openPlots.map((plot) => (
              <PlotCard key={plot.id} plot={plot} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

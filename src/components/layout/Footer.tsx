import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">LSD</h3>
            <p className="text-sm text-muted-foreground">Your Land. Your Legacy. Premium property dealer and developer.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Properties</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/properties" className="hover:text-primary">Constructed Homes</Link></li>
              <li><Link href="/plots" className="hover:text-primary">Open Plots</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+91 98765 43210</li>
              <li>info@lsdproperties.com</li>
              <li>Hyderabad, Telangana</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LSD Property Dealer &amp; Developer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

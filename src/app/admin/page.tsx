import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Map, Users, CheckCircle } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export default function AdminDashboardPage() {
  let properties = [];
  let plots = [];
  let leads = [];

  try {
    properties = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/properties.json'), 'utf8'));
    plots = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/plots.json'), 'utf8'));
    leads = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/leads.json'), 'utf8'));
  } catch (e) {
    console.error("Error reading data files");
  }

  const totalProperties = properties.length;
  const totalPlots = plots.length;
  const totalLeads = leads.length;
  
  const activeProperties = properties.filter((p: any) => p.status === 'Available').length;
  const activePlots = plots.filter((p: any) => p.status === 'Available').length;
  const activeListings = activeProperties + activePlots;

  const recentLeads = leads.slice(0, 5); // top 5

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Snapshot of your real estate business.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-[#1E3A2F]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plots</CardTitle>
            <Map className="h-4 w-4 text-[#1E3A2F]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPlots}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-[#C5A880]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeListings}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card className="shadow-sm border-[#1E3A2F]/10">
          <CardHeader className="bg-white/50 border-b border-[#1E3A2F]/10">
            <CardTitle className="text-xl font-semibold text-[#1E3A2F]">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-b">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Interest</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead: any) => (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
                      <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                      <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{lead.interest}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          lead.status === 'New' ? 'bg-green-100 text-green-800' :
                          lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentLeads.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-6 text-gray-500">No leads found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

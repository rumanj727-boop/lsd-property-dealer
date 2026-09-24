"use client";
import React, { useState, useEffect } from "react";
import { Check, Eye, Trash2, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">New</Badge>;
      case "Contacted": return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">Contacted</Badge>;
      case "Qualified": return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-none">Qualified</Badge>;
      case "Lost": return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-none">Lost</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const updateLeadStatus = async (lead: any, newStatus: string) => {
    try {
      const payload = { ...lead, status: newStatus };
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(`Lead marked as ${newStatus}`);
        fetchLeads();
        if (selectedLead && selectedLead.id === lead.id) {
          setSelectedLead(payload);
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success("Lead deleted");
      setIsDialogOpen(false);
      fetchLeads();
    } else {
      toast.error("Failed to delete");
    }
  };

  const openDetails = (lead: any) => {
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  if (loading) return <div className="p-10 text-center">Loading leads...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-playfair font-bold text-[#1E3A2F]">Customer Leads & Inquiries</h1>
      </div>

      <Card className="border-[#1E3A2F]/10 shadow-md">
        <CardHeader className="bg-white/50 border-b border-[#1E3A2F]/10 pb-4">
          <CardTitle className="text-xl font-semibold text-[#1E3A2F]">Recent Leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FBFBF9] border-b border-[#1E3A2F]/10 text-[#1E3A2F] font-semibold text-sm">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Property/Plot Interest</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {leads.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No leads found.</td></tr>
                )}
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#1E3A2F]/5 hover:bg-black/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#1E3A2F]">{lead.name}</td>
                    <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-wxs">{lead.interest}</td>
                    <td className="px-6 py-4 text-gray-600">{lead.date}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {lead.status === "New" && (
                          <Button onClick={() => updateLeadStatus(lead, "Contacted")} variant="outline" size="sm" className="h-8 text-xs border-[#C5A880]/50 text-[#1E3A2F] hover:bg-[#FBFBF9]">
                            <Check className="h-3 w-3 mr-1" /> Contacted
                          </Button>
                        )}
                        <Button onClick={() => openDetails(lead)} variant="outline" size="sm" className="h-8 text-xs">
                          <Eye className="h-3 w-3 mr-1" /> Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between pr-6">
                  <span>Lead Details</span>
                  {getStatusBadge(selectedLead.status)}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-1 border-b pb-4">
                  <h3 className="font-semibold text-lg text-[#1E3A2F]">{selectedLead.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm gap-4">
                    <span className="flex items-center"><Phone className="w-3 h-3 mr-1"/> {selectedLead.phone}</span>
                    <span className="flex items-center"><Mail className="w-3 h-3 mr-1"/> {selectedLead.email}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <Calendar className="w-3 h-3 mr-1"/> Received on {selectedLead.date}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500">Interested In</Label>
                  <div className="font-medium bg-gray-50 p-3 rounded border border-gray-100">
                    {selectedLead.interest}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500">Customer Message</Label>
                  <div className="text-sm bg-gray-50 p-4 rounded border border-gray-100 min-h-[100px] whitespace-pre-wrap">
                    {selectedLead.message || "No message provided."}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Update Status</Label>
                  <Select value={selectedLead.status} onValueChange={(v) => updateLeadStatus(selectedLead, v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between items-center sm:justify-between border-t pt-4">
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => handleDelete(selectedLead.id)}>
                  <Trash2 className="w-4 h-4 mr-2"/> Delete Lead
                </Button>
                <Button className="bg-[#1E3A2F]" onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

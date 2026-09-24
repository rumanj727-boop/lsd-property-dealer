"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function PlotsManagementPage() {
  const [plots, setPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<any>(null);
  
  const initialForm = {
    title: "", subtitle: "", subType: "Residential", price: "", totalArea: "", dimensions: "",
    facing: "", cornerPlot: "false", gatedLayout: "false", boundaryWall: "false", roadWidth: "",
    approvalAuthority: "", reraApproved: "false", clearTitle: "true",
    waterSupply: "true", electricity: "true", drainage: "true", streetLights: "true",
    maxPermissibleFloors: "", fsi: "", layoutName: "", address: "", locality: "", city: "Hyderabad",
    state: "Telangana", pincode: "", description: "", images: "", featured: "false", status: "Available"
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPlots = async () => {
    try {
      const res = await fetch("/api/admin/plots");
      const data = await res.json();
      setPlots(data);
    } catch (e) {
      toast.error("Failed to load plots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  const openAddModal = () => {
    setEditingPlot(null);
    setFormData(initialForm);
    setIsDialogOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingPlot(p);
    setFormData({
      title: p.title || "", subtitle: p.subtitle || "", subType: p.subType || "Residential",
      price: p.price?.toString() || "", totalArea: p.totalArea?.toString() || "", dimensions: p.dimensions || "",
      facing: p.facing || "", cornerPlot: p.cornerPlot ? "true" : "false", gatedLayout: p.gatedLayout ? "true" : "false",
      boundaryWall: p.boundaryWall ? "true" : "false", roadWidth: p.roadWidth || "",
      approvalAuthority: p.approvalAuthority || "", reraApproved: p.reraApproved ? "true" : "false", clearTitle: p.clearTitle ? "true" : "false",
      waterSupply: p.waterSupply ? "true" : "false", electricity: p.electricity ? "true" : "false",
      drainage: p.drainage ? "true" : "false", streetLights: p.streetLights ? "true" : "false",
      maxPermissibleFloors: p.maxPermissibleFloors?.toString() || "", fsi: p.fsi?.toString() || "",
      layoutName: p.layoutName || "", address: p.address || "", locality: p.locality || "", city: p.city || "Hyderabad",
      state: p.state || "Telangana", pincode: p.pincode || "", description: p.description || "",
      images: p.images ? p.images.join(", ") : "", featured: p.featured ? "true" : "false", status: p.status || "Available"
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plot?")) return;
    const res = await fetch(`/api/admin/plots?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success("Plot deleted");
      fetchPlots();
    } else toast.error("Failed to delete");
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...(editingPlot || {}),
        type: "open_plot",
        title: formData.title, subtitle: formData.subtitle, subType: formData.subType,
        price: parseInt(formData.price) || 0, totalArea: parseInt(formData.totalArea) || 0, dimensions: formData.dimensions,
        facing: formData.facing, cornerPlot: formData.cornerPlot === "true", gatedLayout: formData.gatedLayout === "true",
        boundaryWall: formData.boundaryWall === "true", roadWidth: formData.roadWidth,
        approvalAuthority: formData.approvalAuthority, reraApproved: formData.reraApproved === "true", clearTitle: formData.clearTitle === "true",
        waterSupply: formData.waterSupply === "true", electricity: formData.electricity === "true",
        drainage: formData.drainage === "true", streetLights: formData.streetLights === "true",
        maxPermissibleFloors: parseInt(formData.maxPermissibleFloors) || null, fsi: parseFloat(formData.fsi) || null,
        layoutName: formData.layoutName, address: formData.address, locality: formData.locality, city: formData.city,
        state: formData.state, pincode: formData.pincode, description: formData.description,
        images: formData.images.split(",").map(s => s.trim()).filter(Boolean),
        featured: formData.featured === "true", status: formData.status,
      };

      const res = await fetch("/api/admin/plots", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(editingPlot ? "Plot updated!" : "Plot added!");
        setIsDialogOpen(false);
        fetchPlots();
      } else toast.error("Failed to save plot");
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading plots...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-playfair font-bold text-[#1E3A2F]">Manage Plots</h1>
        <Button onClick={openAddModal} className="bg-[#1E3A2F] hover:bg-[#1E3A2F]/90 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Plot
        </Button>
      </div>

      <Card className="border-[#1E3A2F]/10 shadow-md">
        <CardHeader className="bg-white/50 border-b border-[#1E3A2F]/10 pb-4">
          <CardTitle className="text-xl font-semibold text-[#1E3A2F]">All Open Plots</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FBFBF9] border-b border-[#1E3A2F]/10 text-[#1E3A2F] font-semibold text-sm">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {plots.map((plot) => (
                  <tr key={plot.id} className="border-b border-[#1E3A2F]/5 hover:bg-black/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-12 rounded overflow-hidden">
                        {plot.images && plot.images.length > 0 ? (
                          <img src={plot.images[0]} alt={plot.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-400">No Img</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#1E3A2F]">{plot.title}</td>
                    <td className="px-6 py-4 text-gray-600">{plot.locality}, {plot.city}</td>
                    <td className="px-6 py-4 font-medium">{formatPrice(plot.price || 0)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={plot.status === 'Sold Out' ? 'destructive' : 'outline'} className={plot.status === 'Available' ? 'border-[#C5A880] text-[#1E3A2F]' : ''}>
                        {plot.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => openEditModal(plot)} variant="outline" size="icon" className="h-8 w-8 text-[#C5A880] hover:text-[#1E3A2F]">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDelete(plot.id)} variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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
        <DialogContent className="max-w-[800px] max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2 border-b">
            <DialogTitle>{editingPlot ? "Edit Plot" : "Add New Plot"}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Basic Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2"><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                <div className="col-span-2 space-y-2"><Label>Subtitle</Label><Input value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} /></div>
                <div className="space-y-2"><Label>Plot Type</Label><Input value={formData.subType} onChange={e => setFormData({...formData, subType: e.target.value})} placeholder="Residential / Commercial" /></div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Sold Out">Sold Out</SelectItem>
                      <SelectItem value="Booking Open">Booking Open</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Pricing & Dimensions</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
                <div className="space-y-2"><Label>Total Area (sq.yards)</Label><Input type="number" value={formData.totalArea} onChange={e => setFormData({...formData, totalArea: e.target.value})} /></div>
                <div className="space-y-2"><Label>Dimensions (e.g. 40x60)</Label><Input value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} /></div>
                <div className="space-y-2"><Label>Facing</Label><Input value={formData.facing} onChange={e => setFormData({...formData, facing: e.target.value})} /></div>
                <div className="space-y-2"><Label>Road Width</Label><Input value={formData.roadWidth} onChange={e => setFormData({...formData, roadWidth: e.target.value})} /></div>
                <div className="space-y-2">
                  <Label>Corner Plot</Label>
                  <Select value={formData.cornerPlot} onValueChange={(v) => setFormData({...formData, cornerPlot: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Features & Legals</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2 space-y-2"><Label>Approval Authority</Label><Input value={formData.approvalAuthority} onChange={e => setFormData({...formData, approvalAuthority: e.target.value})} placeholder="HMDA / DTCP" /></div>
                <div className="space-y-2">
                  <Label>RERA Approved</Label>
                  <Select value={formData.reraApproved} onValueChange={(v) => setFormData({...formData, reraApproved: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gated Layout</Label>
                  <Select value={formData.gatedLayout} onValueChange={(v) => setFormData({...formData, gatedLayout: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Water Supply</Label>
                  <Select value={formData.waterSupply} onValueChange={(v) => setFormData({...formData, waterSupply: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Electricity</Label>
                  <Select value={formData.electricity} onValueChange={(v) => setFormData({...formData, electricity: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Drainage</Label>
                  <Select value={formData.drainage} onValueChange={(v) => setFormData({...formData, drainage: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Street Lights</Label>
                  <Select value={formData.streetLights} onValueChange={(v) => setFormData({...formData, streetLights: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Location & Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Layout Name</Label><Input value={formData.layoutName} onChange={e => setFormData({...formData, layoutName: e.target.value})} /></div>
                <div className="space-y-2"><Label>Locality</Label><Input value={formData.locality} onChange={e => setFormData({...formData, locality: e.target.value})} /></div>
                <div className="space-y-2"><Label>City</Label><Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /></div>
                <div className="space-y-2"><Label>State</Label><Input value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} /></div>
                <div className="col-span-2 space-y-2"><Label>Full Address</Label><Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></div>
                <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Media</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2"><Label>Images (comma separated URLs)</Label><Input value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} placeholder="/images/1.jpg, /images/2.jpg" /></div>
              </div>
            </div>

          </div>
          <DialogFooter className="p-6 border-t mt-auto">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-[#1E3A2F] text-white hover:bg-[#1E3A2F]/90">
              {editingPlot ? "Save Changes" : "Create Plot"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

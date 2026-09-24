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

export default function PropertiesManagementPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  
  const initialForm = {
    title: "", subtitle: "", subType: "Apartment", price: "", pricePerSqFt: "",
    bhk: "", bedrooms: "", bathrooms: "", balconies: "", carpetArea: "", superBuiltupArea: "",
    floorNumber: "", totalFloors: "", facing: "", furnishing: "Unfurnished",
    ageOfConstruction: "New Construction", possessionStatus: "Ready to Move",
    expectedPossession: "", parking: "", maintenanceCharges: "", builderName: "",
    societyName: "", ownership: "Freehold", address: "", locality: "", city: "Hyderabad",
    state: "Telangana", pincode: "", description: "", amenities: "", images: "", featured: "false", status: "Available"
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/admin/properties");
      const data = await res.json();
      setProperties(data);
    } catch (e) {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData(initialForm);
    setIsDialogOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProperty(p);
    setFormData({
      title: p.title || "", subtitle: p.subtitle || "", subType: p.subType || "Apartment",
      price: p.price?.toString() || "", pricePerSqFt: p.pricePerSqFt?.toString() || "",
      bhk: p.bhk?.toString() || "", bedrooms: p.bedrooms?.toString() || "", 
      bathrooms: p.bathrooms?.toString() || "", balconies: p.balconies?.toString() || "",
      carpetArea: p.carpetArea?.toString() || "", superBuiltupArea: p.superBuiltupArea?.toString() || "",
      floorNumber: p.floorNumber?.toString() || "", totalFloors: p.totalFloors?.toString() || "",
      facing: p.facing || "", furnishing: p.furnishing || "Unfurnished",
      ageOfConstruction: p.ageOfConstruction || "New Construction", possessionStatus: p.possessionStatus || "Ready to Move",
      expectedPossession: p.expectedPossession || "", parking: p.parking || "",
      maintenanceCharges: p.maintenanceCharges?.toString() || "", builderName: p.builderName || "",
      societyName: p.societyName || "", ownership: p.ownership || "Freehold", address: p.address || "",
      locality: p.locality || "", city: p.city || "Hyderabad", state: p.state || "Telangana",
      pincode: p.pincode || "", description: p.description || "",
      amenities: p.amenities ? p.amenities.join(", ") : "",
      images: p.images ? p.images.join(", ") : "",
      featured: p.featured ? "true" : "false",
      status: p.status || "Available"
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    const res = await fetch(`/api/admin/properties?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success("Property deleted");
      fetchProperties();
    } else toast.error("Failed to delete");
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...(editingProperty || {}),
        type: "constructed",
        title: formData.title, subtitle: formData.subtitle, subType: formData.subType,
        price: parseInt(formData.price) || 0, pricePerSqFt: parseInt(formData.pricePerSqFt) || 0,
        bhk: parseInt(formData.bhk) || 0, bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0, balconies: parseInt(formData.balconies) || 0,
        carpetArea: parseInt(formData.carpetArea) || 0, superBuiltupArea: parseInt(formData.superBuiltupArea) || 0,
        floorNumber: parseInt(formData.floorNumber) || null, totalFloors: parseInt(formData.totalFloors) || 0,
        facing: formData.facing, furnishing: formData.furnishing, ageOfConstruction: formData.ageOfConstruction,
        possessionStatus: formData.possessionStatus, expectedPossession: formData.expectedPossession,
        parking: formData.parking, maintenanceCharges: parseInt(formData.maintenanceCharges) || 0,
        builderName: formData.builderName, societyName: formData.societyName, ownership: formData.ownership,
        address: formData.address, locality: formData.locality, city: formData.city, state: formData.state, pincode: formData.pincode,
        description: formData.description,
        amenities: formData.amenities.split(",").map(s => s.trim()).filter(Boolean),
        images: formData.images.split(",").map(s => s.trim()).filter(Boolean),
        featured: formData.featured === "true",
        status: formData.status,
      };

      const res = await fetch("/api/admin/properties", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(editingProperty ? "Property updated!" : "Property added!");
        setIsDialogOpen(false);
        fetchProperties();
      } else toast.error("Failed to save property");
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading properties...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-playfair font-bold text-[#1E3A2F]">Manage Properties</h1>
        <Button onClick={openAddModal} className="bg-[#1E3A2F] hover:bg-[#1E3A2F]/90 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>

      <Card className="border-[#1E3A2F]/10 shadow-md">
        <CardHeader className="bg-white/50 border-b border-[#1E3A2F]/10 pb-4">
          <CardTitle className="text-xl font-semibold text-[#1E3A2F]">All Constructed Properties</CardTitle>
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
                {properties.map((property) => (
                  <tr key={property.id} className="border-b border-[#1E3A2F]/5 hover:bg-black/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-12 rounded overflow-hidden">
                        {property.images && property.images.length > 0 ? (
                          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-400">No Img</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#1E3A2F]">{property.title}</td>
                    <td className="px-6 py-4 text-gray-600">{property.locality}, {property.city}</td>
                    <td className="px-6 py-4 font-medium">{formatPrice(property.price || 0)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={property.status === 'Sold Out' ? 'destructive' : 'outline'} className={property.status === 'Available' ? 'border-[#C5A880] text-[#1E3A2F]' : ''}>
                        {property.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => openEditModal(property)} variant="outline" size="icon" className="h-8 w-8 text-[#C5A880] hover:text-[#1E3A2F]">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDelete(property.id)} variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
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
            <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Basic Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2"><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                <div className="col-span-2 space-y-2"><Label>Subtitle</Label><Input value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} /></div>
                <div className="space-y-2"><Label>Property Type</Label><Input value={formData.subType} onChange={e => setFormData({...formData, subType: e.target.value})} placeholder="Apartment / Villa" /></div>
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
              <h3 className="font-semibold text-lg border-b pb-2">Pricing & Area</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
                <div className="space-y-2"><Label>Price / SqFt</Label><Input type="number" value={formData.pricePerSqFt} onChange={e => setFormData({...formData, pricePerSqFt: e.target.value})} /></div>
                <div className="space-y-2"><Label>Maintenance</Label><Input type="number" value={formData.maintenanceCharges} onChange={e => setFormData({...formData, maintenanceCharges: e.target.value})} /></div>
                <div className="space-y-2"><Label>Carpet Area</Label><Input type="number" value={formData.carpetArea} onChange={e => setFormData({...formData, carpetArea: e.target.value})} /></div>
                <div className="space-y-2"><Label>Super Builtup</Label><Input type="number" value={formData.superBuiltupArea} onChange={e => setFormData({...formData, superBuiltupArea: e.target.value})} /></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Configuration</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2"><Label>BHK</Label><Input type="number" value={formData.bhk} onChange={e => setFormData({...formData, bhk: e.target.value})} /></div>
                <div className="space-y-2"><Label>Bedrooms</Label><Input type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} /></div>
                <div className="space-y-2"><Label>Bathrooms</Label><Input type="number" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} /></div>
                <div className="space-y-2"><Label>Balconies</Label><Input type="number" value={formData.balconies} onChange={e => setFormData({...formData, balconies: e.target.value})} /></div>
                <div className="space-y-2"><Label>Floor No.</Label><Input type="number" value={formData.floorNumber} onChange={e => setFormData({...formData, floorNumber: e.target.value})} /></div>
                <div className="space-y-2"><Label>Total Floors</Label><Input type="number" value={formData.totalFloors} onChange={e => setFormData({...formData, totalFloors: e.target.value})} /></div>
                <div className="space-y-2"><Label>Facing</Label><Input value={formData.facing} onChange={e => setFormData({...formData, facing: e.target.value})} /></div>
                <div className="space-y-2"><Label>Furnishing</Label><Input value={formData.furnishing} onChange={e => setFormData({...formData, furnishing: e.target.value})} /></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Location & Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Society Name</Label><Input value={formData.societyName} onChange={e => setFormData({...formData, societyName: e.target.value})} /></div>
                <div className="space-y-2"><Label>Builder Name</Label><Input value={formData.builderName} onChange={e => setFormData({...formData, builderName: e.target.value})} /></div>
                <div className="space-y-2"><Label>Locality</Label><Input value={formData.locality} onChange={e => setFormData({...formData, locality: e.target.value})} /></div>
                <div className="space-y-2"><Label>City</Label><Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /></div>
                <div className="col-span-2 space-y-2"><Label>Full Address</Label><Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></div>
                <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Media & Extras</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2"><Label>Amenities (comma separated)</Label><Input value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} placeholder="Pool, Gym, Lift..." /></div>
                <div className="space-y-2"><Label>Images (comma separated URLs)</Label><Input value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} placeholder="/images/1.jpg, /images/2.jpg" /></div>
              </div>
            </div>

          </div>
          <DialogFooter className="p-6 border-t mt-auto">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-[#1E3A2F] text-white hover:bg-[#1E3A2F]/90">
              {editingProperty ? "Save Changes" : "Create Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

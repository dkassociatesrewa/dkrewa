
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Edit, PlusCircle } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

const ServiceManagement = () => {
  const { servicesData, updateService } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (service, category) => {
    setIsEditing(true);
    setCurrentService({ ...service });
    setCurrentCategory(category);
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubServiceChange = (index, value) => {
    const newSubServices = [...currentService.subServices];
    newSubServices[index] = value;
    setCurrentService(prev => ({ ...prev, subServices: newSubServices }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateService(currentCategory.category, currentService.id, currentService);
    toast({ title: "Service Updated!", description: `${currentService.serviceName} has been updated.` });
    setOpen(false);
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Service Management</h2>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Service: {currentService?.serviceName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Service Name</Label><Input name="serviceName" value={currentService?.serviceName || ''} onChange={handleChange} /></div>
            <div><Label>Description</Label><Textarea name="description" value={currentService?.description || ''} onChange={handleChange} /></div>
            <div><Label>Base Price</Label><Input type="number" name="basePrice" value={currentService?.basePrice || ''} onChange={handleChange} /></div>
            <div><Label>Estimated Duration (mins)</Label><Input type="number" name="estimatedDuration" value={currentService?.estimatedDuration || ''} onChange={handleChange} /></div>
            <div className="space-y-2">
              <Label>Features (Top 3)</Label>
              {currentService?.subServices?.slice(0, 3).map((sub, index) => (
                <Input key={index} value={sub} onChange={(e) => handleSubServiceChange(index, e.target.value)} />
              ))}
            </div>
            <DialogFooter><Button type="submit">Save Changes</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-8">
        {servicesData.map(category => (
          <div key={category.category}>
            <h3 className="text-xl font-semibold mb-4">{category.categoryName}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.services.map(service => (
                <div key={service.id} className="border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <p className="font-bold">{service.serviceName}</p>
                    <p className="text-sm text-gray-500">₹{service.basePrice}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleOpen(service, category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceManagement;

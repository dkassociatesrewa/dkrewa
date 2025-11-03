
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RequestQuoteForm = ({ service, servicesData }) => {
  const { addCase } = useData();
  const [formData, setFormData] = useState({
    serviceCategory: service.category,
    serviceName: service.id,
    startDate: new Date(),
    shiftDuration: '',
    contractPeriod: '',
    numWorkers: '1',
    description: '',
    videoFile: null,
    contactName: '',
    contactPhone: '',
    workLocation: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = servicesData.find(c => c.category === formData.serviceCategory);
    const selectedService = selectedCategory.services.find(s => s.id === formData.serviceName);

    const caseData = {
      ...formData,
      serviceCategoryName: selectedCategory.categoryName,
      serviceNameString: selectedService.serviceName,
    };

    const newCase = addCase(caseData);
    toast({
      title: "Quote Request Sent!",
      description: `Your request number is ${newCase.id}. We will get back to you shortly.`,
    });
    // Here you would typically close the dialog
  };

  const currentCategory = servicesData.find(c => c.category === formData.serviceCategory);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1 max-h-[70vh] overflow-y-auto">
      <h3 className="text-lg font-medium mb-4">Request a Quote</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Service Category</Label>
          <Select value={formData.serviceCategory} onValueChange={(value) => setFormData({...formData, serviceCategory: value, serviceName: ''})}>
            <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
            <SelectContent>
              {servicesData.map(cat => (
                <SelectItem key={cat.category} value={cat.category}>{cat.categoryName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Nature of Service</Label>
          <Select value={formData.serviceName} onValueChange={(value) => setFormData({...formData, serviceName: value})} disabled={!formData.serviceCategory}>
            <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
            <SelectContent>
              {currentCategory?.services.map(serv => (
                <SelectItem key={serv.id} value={serv.id}>{serv.serviceName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="startDate">Service Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !formData.startDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={formData.startDate} onSelect={(date) => setFormData({...formData, startDate: date})} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="shiftDuration">Duration of Shift (e.g., 8 hours)</Label>
          <Input id="shiftDuration" name="shiftDuration" value={formData.shiftDuration} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="contractPeriod">Contract Period (e.g., 1 month)</Label>
          <Input id="contractPeriod" name="contractPeriod" value={formData.contractPeriod} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="numWorkers">Number of Workers</Label>
          <Input id="numWorkers" name="numWorkers" type="number" min="1" value={formData.numWorkers} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <Label htmlFor="description">More Description about Work</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
      </div>
      
      <div>
        <Label htmlFor="videoFile">Upload Video (Optional)</Label>
        <div className="relative">
          <Input id="videoFile" name="videoFile" type="file" accept="video/*" onChange={handleChange} className="pl-10" />
          <Upload className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactName">Your Name</Label>
            <Input id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input id="contactPhone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="workLocation">Work Location / Address</Label>
            <Input id="workLocation" name="workLocation" value={formData.workLocation} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Submit Request</Button>
      </div>
    </form>
  );
};

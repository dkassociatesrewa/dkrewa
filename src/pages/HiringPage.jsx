
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getAllServices } from '@/data/servicesData';
import { useData } from '@/contexts/DataContext';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Search, Upload, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ApplicationForm = ({ job, addApplication }) => {
  const [formData, setFormData] = useState({
    name: '', dob: null, phone: '', email: '', address: '',
    education: '', experience: '', location: '', availability: '', files: []
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 5 * 1024 * 1024) { // 5MB total limit
      toast({ title: "File size limit exceeded", description: "Total file size should not exceed 5MB.", variant: "destructive" });
      return;
    }
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = addApplication({ ...formData, jobId: job.id, jobTitle: job.title });
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job.title} is complete. Your ID is ${newApp.id}.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1 max-h-[70vh] overflow-y-auto">
      <h3 className="text-lg font-medium mb-4">Apply for {job.title}</h3>
      
      <div className="border-b pb-4">
        <h4 className="font-semibold mb-2">Basic Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" onChange={handleChange} required /></div>
          <div><Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !formData.dob && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={formData.dob} onSelect={(d) => setFormData({...formData, dob: d})} captionLayout="dropdown-buttons" fromYear={1950} toYear={2010} /></PopoverContent>
            </Popover>
          </div>
          <div><Label htmlFor="phone">Contact Number</Label><Input id="phone" name="phone" type="tel" onChange={handleChange} required /></div>
          <div><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" onChange={handleChange} required /></div>
          <div className="md:col-span-2"><Label htmlFor="address">Permanent Address</Label><Textarea id="address" name="address" onChange={handleChange} required /></div>
        </div>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold mb-2">Professional Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label htmlFor="education">Education Details</Label><Textarea id="education" name="education" onChange={handleChange} required /></div>
          <div><Label htmlFor="experience">Work Experience</Label><Textarea id="experience" name="experience" onChange={handleChange} /></div>
          <div><Label htmlFor="location">Desired Work Location</Label><Input id="location" name="location" onChange={handleChange} required /></div>
          <div><Label htmlFor="availability">Availability to Join</Label><Input id="availability" name="availability" placeholder="e.g., Immediately, 15 days" onChange={handleChange} required /></div>
        </div>
      </div>

      <div>
        <Label htmlFor="files">Upload Documents (Resume, ID, etc.)</Label>
        <div className="relative">
          <Input id="files" name="files" type="file" onChange={handleFileChange} multiple className="pl-10" />
          <Upload className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <p className="text-xs text-gray-500 mt-1">Max 5MB total. Allowed types: PDF, DOC, DOCX, JPG, PNG.</p>
        {files.length > 0 && <div className="mt-2 text-sm text-gray-600">{files.length} file(s) selected.</div>}
      </div>

      <div className="flex justify-end pt-4"><Button type="submit">Submit Application</Button></div>
    </form>
  );
};

const HiringPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addApplication } = useData();
  const allServices = getAllServices();

  const jobListings = allServices.map(service => ({
    id: `job-${service.id}`,
    title: service.serviceName,
    category: service.categoryName,
    categoryIcon: service.categoryIcon,
    description: `Join our team as a ${service.serviceName} professional`,
    employmentType: ['Salaried', 'Contractual'],
    requiredSkills: service.requiredSkills,
    payRange: { min: service.basePrice * 0.6, max: service.basePrice * 1.5 },
    location: 'Multiple Locations',
    isActive: true
  }));

  const filteredJobs = jobListings.filter(job =>
    searchQuery === '' ||
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Careers - Join D K Associates</title><meta name="description" content="Explore career opportunities at D K Associates. Join our team of professionals." /></Helmet>
      <div className="min-h-screen">
        <nav className="glass-effect sticky top-0 z-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"><ArrowLeft className="h-5 w-5" /><span className="font-semibold">Back to Home</span></Link>
              <Link to="/login"><Button variant="outline">Login</Button></Link>
            </div>
          </div>
        </nav>

        <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Join Our Team</h1>
              <p className="text-xl text-gray-600 mb-6">Build your career with D K Associates</p>
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <Input placeholder="Search job openings..." className="pl-12 h-12 text-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8"><h2 className="text-2xl font-bold mb-2">Available Positions</h2><p className="text-gray-600">{filteredJobs.length} openings across all categories</p></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <motion.div key={job.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div><span className="text-3xl mb-2 block">{job.categoryIcon}</span><h3 className="text-xl font-bold">{job.title}</h3><p className="text-sm text-gray-600">{job.category}</p></div>
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{job.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin className="h-4 w-4 text-red-600" /><span>{job.location}</span></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><DollarSign className="h-4 w-4 text-green-600" /><span>₹{job.payRange.min.toFixed(0)} - ₹{job.payRange.max.toFixed(0)}</span></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Clock className="h-4 w-4 text-blue-600" /><span>{job.employmentType.join(' / ')}</span></div>
                  </div>
                  {job.requiredSkills && job.requiredSkills.length > 0 && (
                    <div className="mb-4"><p className="text-sm font-semibold mb-2">Required Skills:</p><div className="flex flex-wrap gap-2">{job.requiredSkills.map((skill, idx) => (<span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{skill.replace(/_/g, ' ')}</span>))}</div></div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild><Button className="w-full mt-auto bg-gradient-to-r from-blue-600 to-indigo-600">Apply Now</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]"><DialogHeader><DialogTitle>Apply for {job.title}</DialogTitle></DialogHeader><ApplicationForm job={job} addApplication={addApplication} /></DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
            {filteredJobs.length === 0 && (<div className="text-center py-12"><p className="text-xl text-gray-600">No jobs found matching your search.</p></div>)}
          </div>
        </section>
      </div>
    </>
  );
};

export default HiringPage;

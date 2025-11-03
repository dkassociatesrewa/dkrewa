
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const CarouselManagement = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const { toast } = useToast();

  const fetchSlides = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('carousel_slides').select('*').order('created_at');
    if (error) {
      toast({ variant: 'destructive', title: 'Error fetching slides', description: error.message });
    } else {
      setSlides(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleOpen = (slide = null) => {
    if (slide) {
      setIsEditing(true);
      setCurrentSlide(slide);
    } else {
      setIsEditing(false);
      setCurrentSlide({ heading: '', subtext: '', image_url: '', is_enabled: true });
    }
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSlide(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setCurrentSlide(prev => ({ ...prev, is_enabled: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const { error } = await supabase.from('carousel_slides').update(currentSlide).eq('id', currentSlide.id);
      if (error) {
        toast({ variant: 'destructive', title: 'Update failed', description: error.message });
      } else {
        toast({ title: 'Slide updated!' });
      }
    } else {
      const { error } = await supabase.from('carousel_slides').insert([currentSlide]);
      if (error) {
        toast({ variant: 'destructive', title: 'Creation failed', description: error.message });
      } else {
        toast({ title: 'Slide created!' });
      }
    }
    setOpen(false);
    fetchSlides();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('carousel_slides').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Delete failed', description: error.message });
    } else {
      toast({ title: 'Slide deleted!' });
      fetchSlides();
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Homepage Carousel</h2>
        <Button onClick={() => handleOpen()} className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <PlusCircle className="h-4 w-4 mr-2" /> Add Slide
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{isEditing ? 'Edit Slide' : 'New Slide'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Heading" name="heading" value={currentSlide?.heading || ''} onChange={handleChange} required />
            <Input placeholder="Subtext" name="subtext" value={currentSlide?.subtext || ''} onChange={handleChange} required />
            <Input placeholder="Image URL" name="image_url" value={currentSlide?.image_url || ''} onChange={handleChange} required />
            <div className="flex items-center space-x-2">
              <Switch id="is_enabled" checked={currentSlide?.is_enabled} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="is_enabled">Enabled</Label>
            </div>
            <DialogFooter><Button type="submit">Save</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {loading ? <Spinner /> : (
        <div className="space-y-4">
          {slides.map(slide => (
            <div key={slide.id} className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={slide.image_url} alt={slide.heading} className="w-24 h-16 object-cover rounded-md" src="https://images.unsplash.com/photo-1484201927383-f03f6583b837" />
                <div>
                  <p className="font-bold">{slide.heading}</p>
                  <p className="text-sm text-gray-500">{slide.subtext}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${slide.is_enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {slide.is_enabled ? 'Enabled' : 'Disabled'}
                </span>
                <Button variant="ghost" size="icon" onClick={() => handleOpen(slide)}><Edit className="h-4 w-4" /></Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(slide.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselManagement;


import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { format } from 'date-fns';

const ApplicantManagement = () => {
  const { applications } = useData();
  const [selectedApp, setSelectedApp] = useState(null);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Applied': return 'default';
      case 'Interview': return 'secondary';
      case 'Hired': return 'success';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Applicant Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Applicant ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Applying For</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">{app.id}</td>
                <td className="p-3 font-medium">{app.name}</td>
                <td className="p-3">{app.jobTitle}</td>
                <td className="p-3">
                  <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                </td>
                <td className="p-3 text-right">
                  <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>View Details</Button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center p-8 text-gray-500">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Application: {selectedApp.id}</DialogTitle>
              <DialogDescription>Details for {selectedApp.name}.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <p><strong>Applying for:</strong> {selectedApp.jobTitle}</p>
              <p><strong>Date of Birth:</strong> {selectedApp.dob ? format(new Date(selectedApp.dob), "PPP") : 'N/A'}</p>
              <p><strong>Contact:</strong> {selectedApp.phone} | {selectedApp.email}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Education:</strong> {selectedApp.education}</p>
              <p><strong>Experience:</strong> {selectedApp.experience || 'N/A'}</p>
              <p><strong>Desired Location:</strong> {selectedApp.location}</p>
              <p><strong>Availability:</strong> {selectedApp.availability}</p>
              <p><strong>Status:</strong> <Badge variant={getStatusVariant(selectedApp.status)}>{selectedApp.status}</Badge></p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ApplicantManagement;

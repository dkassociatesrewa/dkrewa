
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { format } from 'date-fns';

const CaseManagement = () => {
  const { cases, users, updateCaseStatus } = useData();
  const [selectedCase, setSelectedCase] = useState(null);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'In Progress': return 'secondary';
      case 'Completed': return 'success';
      case 'Cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getWorkerName = (workerId) => {
    if (!workerId) return 'Not Assigned';
    const worker = users.find(u => u.id === workerId);
    return worker ? `${worker.personalInfo.firstName} ${worker.personalInfo.lastName}` : 'Unknown Worker';
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Case Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Request ID</th>
              <th className="text-left p-3">Service</th>
              <th className="text-left p-3">Client</th>
              <th className="text-left p-3">Worker</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.length > 0 ? cases.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">{c.id}</td>
                <td className="p-3 font-medium">{c.serviceNameString}</td>
                <td className="p-3">{c.contactName}</td>
                <td className="p-3">{getWorkerName(c.assignedWorker)}</td>
                <td className="p-3">
                  <Badge variant={getStatusVariant(c.status)}>{c.status}</Badge>
                </td>
                <td className="p-3 text-right">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCase(c)}>View Details</Button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500">No cases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Case Details: {selectedCase.id}</DialogTitle>
              <DialogDescription>Review and manage the service request.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p><strong>Client:</strong> {selectedCase.contactName} ({selectedCase.contactPhone})</p>
              <p><strong>Service:</strong> {selectedCase.serviceNameString}</p>
              <p><strong>Location:</strong> {selectedCase.workLocation}</p>
              <p><strong>Start Date:</strong> {format(new Date(selectedCase.startDate), "PPP")}</p>
              <p><strong>Description:</strong> {selectedCase.description || 'N/A'}</p>
              <p><strong>Status:</strong> <Badge variant={getStatusVariant(selectedCase.status)}>{selectedCase.status}</Badge></p>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => updateCaseStatus(selectedCase.id, 'In Progress')}>Start Progress</Button>
                <Button variant="secondary" className="bg-green-600 hover:bg-green-700" onClick={() => updateCaseStatus(selectedCase.id, 'Completed')}>Mark Completed</Button>
                <Button variant="destructive" onClick={() => updateCaseStatus(selectedCase.id, 'Cancelled')}>Cancel Case</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CaseManagement;

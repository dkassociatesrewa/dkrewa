
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { PlusCircle } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const FinanceModule = () => {
  const { finances, setFinances } = useData();
  const [open, setOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    description: '',
    amount: ''
  });

  const totalIncome = finances.income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = finances.expenses.reduce((acc, item) => acc + item.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      id: `fin-${Date.now()}`,
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString()
    };

    if (newTransaction.type === 'income') {
      setFinances(prev => ({ ...prev, income: [...prev.income, transaction] }));
    } else {
      setFinances(prev => ({ ...prev, expenses: [...prev.expenses, transaction] }));
    }
    
    toast({ title: "Transaction Added!", description: `A new ${newTransaction.type} record has been created.` });
    setOpen(false);
    setNewTransaction({ type: 'income', description: '', amount: '' });
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Income & Expense</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Transaction</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select onValueChange={(value) => setNewTransaction({...newTransaction, type: value})} defaultValue={newTransaction.type}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Description" name="description" value={newTransaction.description} onChange={handleChange} required />
              <Input type="number" placeholder="Amount" name="amount" value={newTransaction.amount} onChange={handleChange} required />
              <DialogFooter><Button type="submit">Add Transaction</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 text-center bg-green-50">
          <p className="text-sm text-green-700">Total Income</p>
          <p className="text-2xl font-bold text-green-800">₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="border rounded-lg p-4 text-center bg-red-50">
          <p className="text-sm text-red-700">Total Expenses</p>
          <p className="text-2xl font-bold text-red-800">₹{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="border rounded-lg p-4 text-center bg-blue-50">
          <p className="text-sm text-blue-700">Net Profit</p>
          <p className="text-2xl font-bold text-blue-800">₹{netProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Income</h3>
          <div className="space-y-2">
            {finances.income.map(item => (
              <div key={item.id} className="flex justify-between border-b pb-1">
                <span>{item.description}</span>
                <span className="font-medium text-green-600">+₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Expenses</h3>
          <div className="space-y-2">
            {finances.expenses.map(item => (
              <div key={item.id} className="flex justify-between border-b pb-1">
                <span>{item.description}</span>
                <span className="font-medium text-red-600">-₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;

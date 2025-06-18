import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface Expense {
  id: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      date: new Date(2023, 5, 15),
      category: "Food",
      description: "Lunch at restaurant",
      amount: 75000,
    },
    {
      id: "2",
      date: new Date(2023, 5, 16),
      category: "Transportation",
      description: "Taxi fare",
      amount: 45000,
    },
    {
      id: "3",
      date: new Date(2023, 5, 17),
      category: "Bills",
      description: "Electricity bill",
      amount: 250000,
    },
    {
      id: "4",
      date: new Date(2023, 5, 18),
      category: "Shopping",
      description: "New shirt",
      amount: 120000,
    },
  ]);

  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    date: new Date(),
    category: "",
    description: "",
    amount: 0,
  });

  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleAddExpense = () => {
    if (
      !newExpense.category ||
      !newExpense.description ||
      newExpense.amount <= 0
    ) {
      return;
    }

    const expense: Expense = {
      id: Math.random().toString(36).substring(2, 9),
      ...newExpense,
      date: date || new Date(),
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      date: new Date(),
      category: "",
      description: "",
      amount: 0,
    });
    setDate(new Date());
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const categories = [
    "Food",
    "Transportation",
    "Bills",
    "Shopping",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ];

  return (
    <div className="w-full bg-background p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-white">
              Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-300">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 hover:bg-gray-700"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">
                  Category
                </Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) =>
                    setNewExpense({ ...newExpense, category: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-gray-200 hover:bg-gray-700"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-300">
                  Amount (Rp)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newExpense.amount === 0 ? "" : newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      amount: Number(e.target.value),
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>
            <Button
              onClick={handleAddExpense}
              className="mt-6 w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              Add Expense
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-white">
              Expense History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800/50">
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Category</TableHead>
                    <TableHead className="text-gray-300">Description</TableHead>
                    <TableHead className="text-right text-gray-300">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense, index) => (
                    <motion.tr
                      key={expense.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        backgroundColor: "rgba(55, 65, 81, 0.3)",
                        transition: { duration: 0.1 },
                      }}
                      className="border-gray-700"
                    >
                      <TableCell className="font-medium text-gray-300">
                        {format(expense.date, "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {expense.category}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {expense.description}
                      </TableCell>
                      <TableCell className="text-right text-gray-300">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExpenseTracker;

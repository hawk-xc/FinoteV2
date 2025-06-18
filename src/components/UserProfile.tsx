import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Save, User } from "lucide-react";

interface UserProfileProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    currency: string;
  };
}

const UserProfile = ({
  initialData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+62 812 3456 7890",
    currency: "IDR (Rp)",
  },
}: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialData);
  const [tempData, setTempData] = useState(initialData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...tempData });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...userData });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-b from-gray-900 to-gray-800 p-4 md:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md mx-auto"
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-white">User Profile</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center space-y-3"
              >
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-gray-700 text-gray-300">
                    <User size={36} />
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium text-white">
                  {userData.name}
                </p>
              </motion.div>

              <Separator className="bg-gray-700" />

              <motion.div variants={itemVariants} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      name="name"
                      value={tempData.name}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-700 p-2 rounded-md">
                      {userData.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={tempData.email}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-700 p-2 rounded-md">
                      {userData.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-700 p-2 rounded-md">
                      {userData.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-gray-300">
                    Preferred Currency
                  </Label>
                  {isEditing ? (
                    <Input
                      id="currency"
                      name="currency"
                      value={tempData.currency}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-700 p-2 rounded-md">
                      {userData.currency}
                    </p>
                  )}
                </div>
              </motion.div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 pt-2">
              {isEditing ? (
                <motion.div className="flex space-x-2" variants={itemVariants}>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </motion.div>
              ) : (
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={handleEdit}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </motion.div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserProfile;

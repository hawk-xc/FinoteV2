import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Layout from "./Layout";
import ExpenseTracker from "./ExpenseTracker";
import ChatInterface from "./ChatInterface";
import UserProfile from "./UserProfile";

const Home = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Mobile Header */}
      <header className="flex items-center justify-between p-4 md:hidden">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Finotes
          </h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-gray-800 border-gray-700 text-white"
          >
            <nav className="flex flex-col gap-4 mt-8">
              <Button
                variant={activeTab === "expenses" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("expenses")}
              >
                Expenses
              </Button>
              <Button
                variant={activeTab === "chat" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("chat")}
              >
                Chat
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Layout */}
      <Layout>
        {/* Desktop Navigation */}
        <div className="hidden md:block mb-6">
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto bg-gray-800">
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            className="w-full max-w-6xl mx-auto px-4 pb-8"
          >
            {activeTab === "expenses" && <ExpenseTracker />}
            {activeTab === "chat" && <ChatInterface />}
            {activeTab === "profile" && <UserProfile />}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </div>
  );
};

export default Home;

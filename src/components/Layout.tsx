import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, MessageSquare, DollarSign, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children?: React.ReactNode;
  activeView?: "expenses" | "chat" | "profile";
  onViewChange?: (view: "expenses" | "chat" | "profile") => void;
}

const Layout = ({
  children,
  activeView = "expenses",
  onViewChange = () => {},
}: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleViewChange = (view: "expenses" | "chat" | "profile") => {
    onViewChange(view);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Finotes
          </span>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-gray-900 border-gray-800 text-white w-64 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Finotes
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    <li>
                      <Button
                        variant={
                          activeView === "expenses" ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => handleViewChange("expenses")}
                      >
                        <DollarSign className="mr-2 h-5 w-5" />
                        Expenses
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant={activeView === "chat" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleViewChange("chat")}
                      >
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Chat
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant={activeView === "profile" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleViewChange("profile")}
                      >
                        <User className="mr-2 h-5 w-5" />
                        Profile
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-2">
            <li>
              <Button
                variant={activeView === "expenses" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("expenses")}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Expenses
              </Button>
            </li>
            <li>
              <Button
                variant={activeView === "chat" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("chat")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </li>
            <li>
              <Button
                variant={activeView === "profile" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer - Mobile Navigation */}
      <footer className="md:hidden bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 p-2">
        <nav>
          <ul className="flex justify-around">
            <li>
              <Button
                variant="ghost"
                size="icon"
                className={activeView === "expenses" ? "bg-gray-800" : ""}
                onClick={() => handleViewChange("expenses")}
              >
                <DollarSign className="h-5 w-5" />
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                className={activeView === "chat" ? "bg-gray-800" : ""}
                onClick={() => handleViewChange("chat")}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                className={activeView === "profile" ? "bg-gray-800" : ""}
                onClick={() => handleViewChange("profile")}
              >
                <User className="h-5 w-5" />
              </Button>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;

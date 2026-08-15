import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Home, BookOpen, TrendingUp, MapPin, Calendar, User, LogOut, Settings, ChevronDown, Moon, Sun } from 'lucide-react';
import { UserProfile, User as UserType } from '../App';
import { DarkModeToggle } from './DarkModeToggle';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'courses' | 'career-path' | 'colleges' | 'timeline') => void;
  userProfile: UserProfile | null;
  user: UserType | null;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Navigation({ currentPage, onNavigate, userProfile, user, onLogout, isDarkMode, onToggleDarkMode }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'career-path', label: 'Career Path', icon: TrendingUp },
    { id: 'colleges', label: 'Colleges', icon: MapPin },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-primary">CareerCompass</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => onNavigate(item.id as any)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="ghost" className="flex items-center space-x-2 h-10">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">{user?.name || userProfile?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name || userProfile?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleDarkMode}>
                  {isDarkMode ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-2 mb-2">
            <div className="flex items-center space-x-2">
              <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id as any)}
                  className="flex flex-col items-center space-y-1 h-auto py-2 px-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
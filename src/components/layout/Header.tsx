import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Bell, 
  User, 
  Menu,
  RefreshCw,
  Calendar,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '@/types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSidebarToggle: () => void;
}

const roleLabels: Record<UserRole, string> = {
  [UserRole.GENERAL_MANAGER]: 'Executive',
  [UserRole.SALES_MANAGER]: 'Sales Manager',
  [UserRole.SERVICE_MANAGER]: 'Service Manager',
  [UserRole.FINANCE_MANAGER]: 'Finance Manager',
  [UserRole.SALESPERSON]: 'Salesperson',
  [UserRole.SERVICE_ADVISOR]: 'Service Advisor',
  [UserRole.TECHNICIAN]: 'Technician',
  [UserRole.PARTS_COUNTER]: 'Parts Counter',
  [UserRole.ACCOUNTANT]: 'Accountant'
};

const roleToPath: Record<UserRole, string> = {
  [UserRole.GENERAL_MANAGER]: '/general-manager',
  [UserRole.SALES_MANAGER]: '/sales-manager',
  [UserRole.SERVICE_MANAGER]: '/service-manager',
  [UserRole.FINANCE_MANAGER]: '/finance-manager',
  [UserRole.SALESPERSON]: '/salesperson',
  [UserRole.SERVICE_ADVISOR]: '/service-advisor',
  [UserRole.TECHNICIAN]: '/technician',
  [UserRole.PARTS_COUNTER]: '/parts-counter',
  [UserRole.ACCOUNTANT]: '/accountant'
};

const locationOptions = [
  { value: 'all', label: 'All Locations' },
  { value: 'lake-chevrolet', label: 'Lake Chevrolet' },
  { value: 'pritchard-ford-clear-lake', label: 'Pritchard Ford of Clear Lake' },
  { value: 'pritchard-motor-mason-city', label: 'Pritchard Motor Company of Mason City' },
  { value: 'pritchard-gmc', label: 'Pritchard GMC' },
  { value: 'pritchard-nissan', label: 'Pritchard Nissan' },
  { value: 'chrysler-forest-city', label: 'Chrysler of Forest City' },
  { value: 'forest-city-auto-center', label: 'Forest City Auto Center' },
  { value: 'pritchard-auto-britt', label: 'Pritchard Auto Britt' },
  { value: 'pritchard-auto-garner', label: 'Pritchard Auto Garner' }
];

/**
 * Header - Main application header with navigation and user controls
 * 
 * A comprehensive header component that provides global navigation, search functionality,
 * role switching, notifications, and user account management. The header is responsive
 * and adapts to different screen sizes with collapsible sidebar toggle on mobile.
 * 
 * @component
 * @example
 * ```tsx
 * <Header 
 *   currentRole={UserRole.GENERAL_MANAGER}
 *   onRoleChange={(role) => setCurrentRole(role)}
 *   onSidebarToggle={() => toggleSidebar()}
 * />
 * ```
 * 
 * @param {HeaderProps} props - Component props
 * @param {UserRole} props.currentRole - Currently selected user role
 * @param {(role: UserRole) => void} props.onRoleChange - Callback when role is changed
 * @param {() => void} props.onSidebarToggle - Callback to toggle sidebar visibility
 * 
 * @returns {JSX.Element} Rendered header component
 */
export function Header({ currentRole, onRoleChange, onSidebarToggle }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState(new Date());
  const [selectedLocation, setSelectedLocation] = React.useState('all');

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In a real app, this would trigger data refresh
  };

  const handleRoleChange = (role: UserRole) => {
    onRoleChange(role);
    navigate(roleToPath[role]);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // In a real app, this would trigger filtering logic
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getSelectedLocationLabel = () => {
    const location = locationOptions.find(opt => opt.value === selectedLocation);
    return location ? location.label : 'All Locations';
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="md:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers, vehicles, deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-9"
            />
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {formatTime(lastUpdated)}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Role Selector */}
          <Select value={currentRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-48 font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {roleLabels[role]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Location Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-9 min-w-[250px] justify-between px-3 font-semibold"
              >
                <span className="truncate">{getSelectedLocationLabel()}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px]">
              <DropdownMenuLabel>Select Location</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {locationOptions.map((location) => (
                <DropdownMenuItem 
                  key={location.value}
                  onClick={() => handleLocationChange(location.value)}
                  className={selectedLocation === location.value ? "bg-accent" : ""}
                >
                  {location.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New deal requires approval</p>
                  <p className="text-xs text-muted-foreground">Deal #12345 - $45,000</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Service appointment reminder</p>
                  <p className="text-xs text-muted-foreground">Customer: John Smith - 2:00 PM</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Parts order arrived</p>
                  <p className="text-xs text-muted-foreground">Order #PO-789 ready for pickup</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Demo User</p>
                  <p className="text-xs text-muted-foreground">{roleLabels[currentRole]}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Schedule</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}


import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { ScrapRate, Pickup } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, LogOut, Plus, RefreshCw, Edit, Save } from 'lucide-react';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'confirmed':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'completed':
      return 'bg-green-500 hover:bg-green-600';
    case 'cancelled':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

// Rate update form schema
const rateUpdateSchema = z.object({
  rate: z.coerce.number().min(1, "Rate must be at least 1"),
  trend: z.enum(['up', 'down', 'stable']),
});

const AdminDashboardPage = () => {
  const [_, navigate] = useLocation();
  const { isAuthenticated, loading, logout } = useAuth();
  const { toast } = useToast();
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<ScrapRate | null>(null);
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState<Pickup | null>(null);

  const rateForm = useForm<z.infer<typeof rateUpdateSchema>>({
    resolver: zodResolver(rateUpdateSchema),
    defaultValues: {
      rate: 0,
      trend: 'stable',
    }
  });

  const statusForm = useForm({
    defaultValues: {
      status: '',
    }
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  // Load rates
  const { data: rates, isLoading: ratesLoading, refetch: refetchRates } = useQuery<ScrapRate[]>({
    queryKey: ['/api/rates'],
  });

  // Load pickups
  const { data: pickups, isLoading: pickupsLoading, refetch: refetchPickups } = useQuery<Pickup[]>({
    queryKey: ['/api/pickups'],
  });

  // Count stats
  const pendingPickups = pickups?.filter(p => p.status === 'pending').length || 0;
  const completedPickups = pickups?.filter(p => p.status === 'completed').length || 0;
  const totalPickups = pickups?.length || 0;

  // Update rate mutation
  const { mutate: updateRate, isPending: isRateUpdating } = useMutation({
    mutationFn: async (data: { id: number, rate: number, trend: string }) => {
      const response = await apiRequest('PUT', `/api/rates/${data.id}`, { rate: data.rate, trend: data.trend });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Rate updated",
        description: "The scrap rate has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/rates'] });
      setIsRateDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update rate",
        variant: "destructive",
      });
    }
  });

  // Update pickup status mutation
  const { mutate: updatePickupStatus, isPending: isStatusUpdating } = useMutation({
    mutationFn: async (data: { id: number, status: string }) => {
      const response = await apiRequest('PUT', `/api/pickups/${data.id}/status`, { status: data.status });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: "The pickup status has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/pickups'] });
      setStatusUpdateOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  });

  const handleRateEdit = (rate: ScrapRate) => {
    setSelectedRate(rate);
    rateForm.setValue('rate', rate.rate);
    rateForm.setValue('trend', rate.trend as any);
    setIsRateDialogOpen(true);
  };

  const handleStatusEdit = (pickup: Pickup) => {
    setSelectedPickup(pickup);
    statusForm.setValue('status', pickup.status);
    setStatusUpdateOpen(true);
  };

  const onRateSubmit = (data: z.infer<typeof rateUpdateSchema>) => {
    if (selectedRate) {
      updateRate({ id: selectedRate.id, rate: data.rate, trend: data.trend });
    }
  };

  const onStatusSubmit = (data: { status: string }) => {
    if (selectedPickup) {
      updatePickupStatus({ id: selectedPickup.id, status: data.status });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="animate-spin h-5 w-5" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-white text-3xl mr-2">recycling</span>
            <h1 className="text-2xl font-heading font-bold">
              Scrap<span className="text-secondary">Wala</span> Admin
            </h1>
          </div>
          <Button variant="ghost" className="text-white" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Pending Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-yellow-500">{pendingPickups}</div>
              <p className="text-sm text-muted-foreground">Requires confirmation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Completed Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500">{completedPickups}</div>
              <p className="text-sm text-muted-foreground">Successfully processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Total Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{totalPickups}</div>
              <p className="text-sm text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pickups">
          <TabsList className="mb-4">
            <TabsTrigger value="pickups">Pickup Requests</TabsTrigger>
            <TabsTrigger value="rates">Scrap Rates</TabsTrigger>
          </TabsList>

          {/* Pickups Tab */}
          <TabsContent value="pickups" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Pickup Requests</h2>
              <Button size="sm" onClick={() => refetchPickups()}>
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardDescription>
                  Manage all pickup requests from customers. Update status as they progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pickupsLoading ? (
                  <div className="text-center py-4">Loading pickup requests...</div>
                ) : pickups && pickups.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Materials</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pickups.map((pickup) => (
                          <TableRow key={pickup.id}>
                            <TableCell>{pickup.id}</TableCell>
                            <TableCell>{pickup.name}</TableCell>
                            <TableCell>{pickup.phone}</TableCell>
                            <TableCell>{pickup.date}</TableCell>
                            <TableCell>{pickup.materials.join(', ')}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(pickup.status)}>
                                {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(pickup.createdAt.toString())}</TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center"
                                onClick={() => handleStatusEdit(pickup)}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Status
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
                    <p className="text-muted-foreground">No pickup requests found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rates Tab */}
          <TabsContent value="rates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Scrap Rates</h2>
              <Button size="sm" onClick={() => refetchRates()}>
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardDescription>
                  Manage scrap material rates. Keep them updated to reflect current market conditions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ratesLoading ? (
                  <div className="text-center py-4">Loading rates...</div>
                ) : rates && rates.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Material</TableHead>
                          <TableHead>Current Rate (₹/kg)</TableHead>
                          <TableHead>Trend</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rates.map((rate) => (
                          <TableRow key={rate.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <span className="material-icons mr-2" style={{ color: `hsl(var(--${rate.color}))` }}>
                                  {rate.icon}
                                </span>
                                {rate.materialName}
                              </div>
                            </TableCell>
                            <TableCell>₹{rate.rate}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {rate.trend === 'up' && <span className="material-icons text-secondary">trending_up</span>}
                                {rate.trend === 'down' && <span className="material-icons text-destructive">trending_down</span>}
                                {rate.trend === 'stable' && <span className="material-icons text-gray-500">trending_flat</span>}
                                <span className="ml-1">
                                  {rate.trend.charAt(0).toUpperCase() + rate.trend.slice(1)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(rate.lastUpdated.toString())}</TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center"
                                onClick={() => handleRateEdit(rate)}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
                    <p className="text-muted-foreground">No rates found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Rate Update Dialog */}
      <Dialog open={isRateDialogOpen} onOpenChange={setIsRateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Rate for {selectedRate?.materialName}</DialogTitle>
            <DialogDescription>
              Change the current rate and trend status. This will be immediately visible to customers.
            </DialogDescription>
          </DialogHeader>
          <Form {...rateForm}>
            <form onSubmit={rateForm.handleSubmit(onRateSubmit)} className="space-y-4">
              <FormField
                control={rateForm.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate (₹/kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter rate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rateForm.control}
                name="trend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trend</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trend" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="up">High Demand (Up)</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="down">Low Demand (Down)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={isRateUpdating}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isRateUpdating ? "Updating..." : "Update Rate"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={statusUpdateOpen} onOpenChange={setStatusUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Pickup Status</DialogTitle>
            <DialogDescription>
              Update the status for pickup request from {selectedPickup?.name}
            </DialogDescription>
          </DialogHeader>
          <Form {...statusForm}>
            <form onSubmit={statusForm.handleSubmit(onStatusSubmit)} className="space-y-4">
              <FormField
                control={statusForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStatusUpdateOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={isStatusUpdating}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isStatusUpdating ? "Updating..." : "Update Status"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardPage;

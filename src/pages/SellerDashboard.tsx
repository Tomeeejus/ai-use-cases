import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, DollarSign, TrendingUp, Package, ArrowLeft } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UseCase {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  created_at: string;
  category_id: string;
  categories?: { name: string };
}

interface DashboardStats {
  totalUseCases: number;
  publishedUseCases: number;
  totalRevenue: number;
}

export default function SellerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ totalUseCases: 0, publishedUseCases: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUseCases();
    fetchStats();
  }, [user, navigate]);

  const fetchUseCases = async () => {
    try {
      const { data, error } = await supabase
        .from('use_cases')
        .select(`
          *,
          categories (name)
        `)
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUseCases(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get use case stats
      const { data: useCaseData, error: useCaseError } = await supabase
        .from('use_cases')
        .select('status')
        .eq('seller_id', user?.id);

      if (useCaseError) throw useCaseError;

      const totalUseCases = useCaseData?.length || 0;
      const publishedUseCases = useCaseData?.filter(uc => uc.status === 'published').length || 0;

      // Get revenue stats
      const { data: revenueData, error: revenueError } = await supabase
        .from('orders')
        .select(`
          amount,
          use_cases!inner(seller_id)
        `)
        .eq('use_cases.seller_id', user?.id)
        .eq('status', 'completed');

      if (revenueError) throw revenueError;

      const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.amount), 0) || 0;

      setStats({ totalUseCases, publishedUseCases, totalRevenue });
    } catch (error: any) {
      console.error('Error fetching stats:', error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('use_cases')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setUseCases(useCases.filter(uc => uc.id !== id));
      toast({
        title: "Success",
        description: "Use case deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setDeleteId(null);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      published: 'default',
      archived: 'outline',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Seller Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your AI use cases and track performance</p>
          </div>
          <Button onClick={() => navigate('/upload-use-case')} className="gap-2">
            <Plus className="h-4 w-4" />
            New Use Case
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Use Cases</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUseCases}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedUseCases}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Use Cases</CardTitle>
            <CardDescription>
              Manage and monitor your submitted AI use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            {useCases.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No use cases yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first AI use case to showcase your expertise.
                </p>
                <Button onClick={() => navigate('/upload-use-case')}>
                  Create Your First Use Case
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{useCase.title}</h3>
                        {getStatusBadge(useCase.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {useCase.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>${useCase.price}</span>
                        <span>{useCase.categories?.name}</span>
                        <span>{new Date(useCase.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/edit-use-case/${useCase.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(useCase.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your use case.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
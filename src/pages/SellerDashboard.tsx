import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, DollarSign, Users, Star, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";

interface UseCase {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  featured: boolean;
  created_at: string;
}

interface Stats {
  totalUseCases: number;
  totalRevenue: number;
  totalOrders: number;
  averageRating: number;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUseCases: 0,
    totalRevenue: 0,
    totalOrders: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchSellerData();
  }, [user, navigate]);

  const fetchSellerData = async () => {
    if (!user) return;

    try {
      // Fetch use cases
      const { data: useCasesData, error: useCasesError } = await supabase
        .from("use_cases")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      if (useCasesError) throw useCasesError;
      setUseCases(useCasesData || []);

      // Use secure revenue function instead of accessing individual order amounts
      const { data: revenueData, error: revenueError } = await supabase
        .rpc('get_seller_revenue_stats', { seller_user_id: user.id });

      if (revenueError) throw revenueError;

      const revenue = revenueData?.[0] || { total_revenue: 0, total_orders: 0, avg_order_value: 0 };

      setStats({
        totalUseCases: useCasesData?.length || 0,
        totalRevenue: Number(revenue.total_revenue),
        totalOrders: Number(revenue.total_orders),
        averageRating: 4.5, // This would come from reviews table
      });
    } catch (error) {
      console.error("Error fetching seller data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default";
      case "draft":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your AI use cases and track performance</p>
          </div>
          <Button onClick={() => navigate("/upload-use-case")} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload New Use Case
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Use Cases</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUseCases}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(stats.totalRevenue / 100).toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases Management */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Use Cases</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : useCases.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-lg font-semibold mb-2">No use cases yet</h3>
                  <p className="text-muted-foreground mb-4">Upload your first AI use case to get started</p>
                  <Button onClick={() => navigate("/upload-use-case")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Use Case
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {useCases.map((useCase) => (
                  <Card key={useCase.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{useCase.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {useCase.description.substring(0, 150)}...
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(useCase.status)}>
                            {useCase.status}
                          </Badge>
                          {useCase.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">
                          ${(useCase.price / 100).toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Created {new Date(useCase.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="published">
            <div className="grid gap-4">
              {useCases
                .filter((uc) => uc.status === "published")
                .map((useCase) => (
                  <Card key={useCase.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                      <CardDescription>
                        {useCase.description.substring(0, 150)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">
                          ${(useCase.price / 100).toFixed(2)}
                        </div>
                        <Badge variant="default">Published</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="grid gap-4">
              {useCases
                .filter((uc) => uc.status === "draft")
                .map((useCase) => (
                  <Card key={useCase.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                      <CardDescription>
                        {useCase.description.substring(0, 150)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">
                          ${(useCase.price / 100).toFixed(2)}
                        </div>
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingCart, Lock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseFlowProps {
  useCase: {
    id: string;
    title: string;
    price: number;
    seller_id: string;
  };
  onPurchaseComplete?: () => void;
}

const PurchaseFlow = ({ useCase, onPurchaseComplete }: PurchaseFlowProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase this use case.",
        variant: "destructive",
      });
      return;
    }

    if (user.id === useCase.seller_id) {
      toast({
        title: "Cannot Purchase",
        description: "You cannot purchase your own use case.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          buyer_id: user.id,
          use_case_id: useCase.id,
          amount: useCase.price,
          status: "pending"
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // In a real implementation, you would:
      // 1. Call Stripe or another payment processor
      // 2. Handle the payment response
      // 3. Update the order status based on payment result
      
      // For demo purposes, we'll simulate successful payment
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("id", order.id);

      if (updateError) throw updateError;

      toast({
        title: "Purchase Successful!",
        description: "You now have access to this use case.",
      });

      setIsOpen(false);
      onPurchaseComplete?.();
    } catch (error: any) {
      console.error("Purchase error:", error);
      setError(error.message || "An error occurred during purchase.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Purchase ${(useCase.price / 100).toFixed(2)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Use Case</DialogTitle>
          <DialogDescription>
            Complete your purchase to gain access to this AI use case
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{useCase.title}</CardTitle>
            <CardDescription>
              You will get instant access to the complete implementation guide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${(useCase.price / 100).toFixed(2)}</span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant access to implementation guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Downloadable resources and templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  <span>Secure payment processing</span>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Button 
                  onClick={handlePurchase} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? "Processing..." : "Complete Purchase"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                By purchasing, you agree to our terms of service and privacy policy
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseFlow;
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import PurchaseFlow from "./PurchaseFlow";

interface UseCaseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  priceInCents: number;
  seller: {
    id: string;
    name: string;
    verified: boolean;
  };
}

const UseCaseCard = ({
  id,
  title,
  description,
  category,
  rating,
  reviews,
  price,
  priceInCents,
  seller
}: UseCaseCardProps) => {
  return (
    <div className="bg-gradient-card border rounded-xl p-6 shadow-card hover:shadow-glow transition-smooth group border-border">
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <div className="text-right">
              <div className="text-lg font-bold text-card-foreground">{price}</div>
              <div className="text-xs text-muted-foreground">one-time</div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Simple Implementation Focus */}
        <div className="py-3 border-t border-b border-border/50">
          <div className="text-center">
            <div className="text-sm font-medium text-primary">Easy Implementation</div>
            <div className="text-xs text-muted-foreground">Simple AI solution ready to deploy</div>
          </div>
        </div>

        {/* Rating & Seller */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-card-foreground">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium text-card-foreground">{seller.name}</div>
            {seller.verified && (
              <div className="text-xs text-primary">Verified Seller</div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2">
          <PurchaseFlow 
            useCase={{
              id,
              title,
              price: priceInCents,
              seller_id: seller.id
            }}
          />
          <Button variant="outline" size="sm" className="w-full group">
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UseCaseCard;
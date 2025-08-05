import { Button } from "@/components/ui/button";
import { 
  Bot, 
  MessageSquare, 
  Image, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  FileText, 
  Search 
} from "lucide-react";

const categories = [
  { id: 'all', name: 'All Categories', icon: Search, count: 547 },
  { id: 'automation', name: 'Process Automation', icon: Bot, count: 142 },
  { id: 'customer-service', name: 'Customer Service', icon: MessageSquare, count: 89 },
  { id: 'content', name: 'Content Generation', icon: FileText, count: 76 },
  { id: 'analytics', name: 'Data Analytics', icon: BarChart3, count: 64 },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: 52 },
  { id: 'computer-vision', name: 'Computer Vision', icon: Image, count: 43 },
  { id: 'hr', name: 'Human Resources', icon: Users, count: 38 },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                className={`justify-start h-auto p-4 ${
                  isSelected ? 'shadow-glow' : ''
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <Icon className="w-5 h-5" />
                  <div className="text-left flex-1">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs opacity-70">{category.count} use cases</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
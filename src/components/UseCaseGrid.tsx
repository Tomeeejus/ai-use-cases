import { useState } from "react";
import UseCaseCard from "./UseCaseCard";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";

const useCases = [
  {
    title: "E-commerce Recommendation Engine",
    description: "Boost sales with personalized product recommendations. Advanced collaborative filtering with real-time learning capabilities.",
    category: "E-commerce",
    rating: 4.6,
    reviews: 83,
    roi: "190%",
    timeToImplement: "2-3 weeks",
    price: "$1,699",
    seller: { name: "RetailAI Labs", verified: true }
  },
  {
    title: "HR Resume Screening Automation",
    description: "Streamline hiring with AI-powered resume analysis. Automatically rank candidates and identify top talent efficiently.",
    category: "Human Resources",
    rating: 4.5,
    reviews: 67,
    roi: "450%",
    timeToImplement: "1 week",
    price: "$999",
    seller: { name: "HireSmart AI", verified: true }
  },
  {
    title: "Content Generation Suite",
    description: "Create high-quality blog posts, social media content, and marketing copy. Includes brand voice training and SEO optimization.",
    category: "Content Generation",
    rating: 4.7,
    reviews: 129,
    roi: "220%",
    timeToImplement: "1-2 weeks",
    price: "$1,499",
    seller: { name: "ContentCraft", verified: true }
  },
  {
    title: "Quality Control Vision System",
    description: "Automated defect detection for manufacturing. Real-time inspection with 99.5% accuracy and detailed reporting.",
    category: "Computer Vision",
    rating: 4.8,
    reviews: 45,
    roi: "650%",
    timeToImplement: "4-6 weeks",
    price: "$4,999",
    seller: { name: "VisionTech Pro", verified: true }
  },
  {
    title: "Financial Risk Assessment Tool",
    description: "Advanced fraud detection and risk scoring for financial services. Machine learning models with explainable AI features.",
    category: "Data Analytics",
    rating: 4.9,
    reviews: 72,
    roi: "380%",
    timeToImplement: "3-4 weeks",
    price: "$3,899",
    seller: { name: "FinAI Solutions", verified: true }
  },
  {
    title: "Inventory Optimization Engine",
    description: "Reduce costs and prevent stockouts with predictive inventory management. Demand forecasting with supply chain integration.",
    category: "Process Automation",
    rating: 4.6,
    reviews: 91,
    roi: "310%",
    timeToImplement: "2-3 weeks",
    price: "$2,299",
    seller: { name: "SupplyChain AI", verified: true }
  }
];

const UseCaseGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                All Use Cases
              </h2>
              <p className="text-muted-foreground">
                Browse our complete collection of verified AI solutions
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="w-4 h-4 mr-2" />
                Sort by Rating
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Results Count */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="text-muted-foreground">
              Showing {useCases.length} of 547 use cases
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} {...useCase} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-8">
            <Button variant="outline" size="lg">
              Load More Use Cases
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseGrid;
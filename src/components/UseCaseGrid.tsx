import { useState, useMemo } from "react";
import UseCaseCard from "./UseCaseCard";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, SortAsc, Search, Grid, List } from "lucide-react";

const useCases = [
  {
    title: "E-commerce Recommendation Engine",
    description: "Boost sales with personalized product recommendations. Advanced collaborative filtering with real-time learning capabilities.",
    category: "E-commerce",
    rating: 4.6,
    reviews: 83,
    roi: "190%",
    timeToImplement: "2-3 weeks",
    price: "$299",
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
    price: "$149",
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
    price: "$199",
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
    price: "$599",
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
    price: "$449",
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
    price: "$349",
    seller: { name: "SupplyChain AI", verified: true }
  },
  {
    title: "Customer Sentiment Analyzer",
    description: "Real-time social media and review sentiment tracking. Multi-platform monitoring with actionable insights and alerts.",
    category: "Data Analytics",
    rating: 4.7,
    reviews: 112,
    roi: "275%",
    timeToImplement: "1-2 weeks",
    price: "$179",
    seller: { name: "SentimentIQ", verified: true }
  },
  {
    title: "Email Marketing Optimizer",
    description: "AI-powered email campaign optimization. A/B testing automation, send-time optimization, and personalized content.",
    category: "Content Generation",
    rating: 4.5,
    reviews: 88,
    roi: "195%",
    timeToImplement: "1 week",
    price: "$129",
    seller: { name: "MailAI Pro", verified: true }
  },
  {
    title: "Voice Assistant Integration",
    description: "Custom voice commands for business workflows. Natural language processing with multi-language support.",
    category: "Customer Service",
    rating: 4.6,
    reviews: 76,
    roi: "320%",
    timeToImplement: "2-3 weeks",
    price: "$249",
    seller: { name: "VoiceFlow AI", verified: true }
  }
];

const UseCaseGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedUseCases = useMemo(() => {
    let filtered = useCases.filter(useCase => {
      const matchesCategory = selectedCategory === 'all' || useCase.category.toLowerCase().includes(selectedCategory.replace('-', ' '));
      const matchesSearch = searchQuery === '' || 
        useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
        case 'price-high':
          return parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''));
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header with Search */}
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
                  Discover AI Solutions
                </h2>
                <p className="text-muted-foreground text-lg">
                  Affordable, verified AI use cases ready to transform your business
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search AI solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary/50 outline-none transition-colors"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="animate-fade-in">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Results Count and Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50 pb-4">
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedUseCases.length} of {useCases.length} use cases
              </p>
              {searchQuery && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Results for "{searchQuery}"
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Starting from <span className="text-primary font-semibold">$129</span>
            </div>
          </div>

          {/* Grid/List View */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          } animate-fade-in`}>
            {filteredAndSortedUseCases.map((useCase, index) => (
              <div 
                key={index} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <UseCaseCard {...useCase} />
              </div>
            ))}
          </div>

          {filteredAndSortedUseCases.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Load More */}
          {filteredAndSortedUseCases.length > 0 && (
            <div className="text-center pt-8 animate-fade-in">
              <Button variant="outline" size="lg" className="hover-scale">
                Load More Use Cases
                <span className="ml-2 text-xs text-primary">+{Math.max(0, 547 - filteredAndSortedUseCases.length)} more</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UseCaseGrid;
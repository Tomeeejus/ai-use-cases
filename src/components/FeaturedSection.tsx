import UseCaseCard from "./UseCaseCard";

const featuredUseCases = [
  {
    title: "AI-Powered Customer Support Automation",
    description: "Complete solution for automating 80% of customer inquiries using advanced NLP. Includes chatbot training, escalation workflows, and analytics dashboard.",
    category: "Customer Service",
    rating: 4.9,
    reviews: 127,
    roi: "340%",
    timeToImplement: "2-3 weeks",
    price: "$399",
    featured: true,
    seller: {
      name: "TechCorp Solutions",
      verified: true
    }
  },
  {
    title: "Document Processing & Analysis Pipeline",
    description: "Automated document extraction, classification, and insights generation. Processes invoices, contracts, and reports with 99.2% accuracy.",
    category: "Process Automation",
    rating: 4.8,
    reviews: 94,
    roi: "520%",
    timeToImplement: "1-2 weeks",
    price: "$279",
    featured: true,
    seller: {
      name: "DataFlow AI",
      verified: true
    }
  },
  {
    title: "Predictive Sales Analytics Engine",
    description: "ML-powered sales forecasting and lead scoring system. Integrates with CRM platforms and provides real-time insights for sales teams.",
    category: "Data Analytics",
    rating: 4.7,
    reviews: 156,
    roi: "280%",
    timeToImplement: "3-4 weeks",
    price: "$549",
    featured: true,
    seller: {
      name: "SalesAI Pro",
      verified: true
    }
  }
];

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured AI Use Cases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our top-rated, proven AI solutions that are delivering exceptional results 
            for businesses across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredUseCases.map((useCase, index) => (
            <UseCaseCard key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
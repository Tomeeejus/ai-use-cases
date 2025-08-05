import UseCaseCard from "./UseCaseCard";

const FeaturedSection = () => {
  const featuredUseCases = [
    {
      id: "featured1",
      title: "AI-Powered Customer Support Automation",
      description: "Complete solution for automating 80% of customer inquiries using advanced NLP. Includes chatbot training, escalation workflows, and analytics dashboard.",
      category: "Customer Service",
      rating: 4.9,
      reviews: 127,
      roi: "340%",
      timeToImplement: "2-3 weeks",
      price: "$399",
      priceInCents: 39900,
      featured: true,
      seller: {
        id: "featured-seller1",
        name: "TechCorp Solutions",
        verified: true
      }
    },
    {
      id: "featured2",
      title: "Document Processing & Analysis Pipeline",
      description: "Automated document extraction, classification, and insights generation. Processes invoices, contracts, and reports with 99.2% accuracy.",
      category: "Process Automation",
      rating: 4.8,
      reviews: 94,
      roi: "520%",
      timeToImplement: "1-2 weeks",
      price: "$279",
      priceInCents: 27900,
      featured: true,
      seller: {
        id: "featured-seller2",
        name: "DataFlow AI",
        verified: true
      }
    },
    {
      id: "featured3",
      title: "Predictive Analytics Dashboard",
      description: "Advanced forecasting models for sales, inventory, and market trends. Real-time data visualization with customizable alerts and reports.",
      category: "Data Analytics",
      rating: 4.7,
      reviews: 156,
      roi: "445%",
      timeToImplement: "3-4 weeks",
      price: "$549",
      priceInCents: 54900,
      featured: true,
      seller: {
        id: "featured-seller3",
        name: "AnalyticsPro",
        verified: true
      }
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured AI Solutions
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
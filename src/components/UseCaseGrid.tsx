import UseCaseCard from "./UseCaseCard";

const mockUseCases = [
  {
    id: "1",
    title: "AI Customer Service Chatbot",
    description: "Deploy an intelligent chatbot that handles 80% of customer inquiries automatically, reducing support costs and improving response times.",
    category: "Customer Support",
    rating: 4.8,
    reviews: 124,
    price: "$49",
    priceInCents: 4900,
    seller: {
      id: "seller-1",
      name: "TechCorp Solutions",
      verified: true
    }
  },
  {
    id: "2", 
    title: "Email Marketing Optimizer",
    description: "AI system that optimizes email subject lines, send times, and content for maximum engagement and conversion rates.",
    category: "Marketing",
    rating: 4.9,
    reviews: 87,
    price: "$79",
    priceInCents: 7900,
    seller: {
      id: "seller-2",
      name: "MarketAI Labs",
      verified: true
    }
  },
  {
    id: "3",
    title: "Document Classification System",
    description: "Automatically sort and classify incoming documents, emails, and files into predefined categories with 95% accuracy.",
    category: "Document Management",
    rating: 4.7,
    reviews: 156,
    price: "$39",
    priceInCents: 3900,
    seller: {
      id: "seller-3", 
      name: "DocuTech",
      verified: false
    }
  },
  {
    id: "4",
    title: "Sales Lead Scoring",
    description: "AI model that scores and prioritizes sales leads based on conversion probability, helping teams focus on high-value prospects.",
    category: "Sales",
    rating: 4.9,
    reviews: 203,
    price: "$89",
    priceInCents: 8900,
    seller: {
      id: "seller-4",
      name: "SalesForce Pro",
      verified: true
    }
  },
  {
    id: "5",
    title: "Inventory Demand Prediction",
    description: "Predict future inventory needs using AI to prevent stockouts and reduce excess inventory by up to 30%.",
    category: "Supply Chain",
    rating: 4.6,
    reviews: 91,
    price: "$129",
    priceInCents: 12900,
    seller: {
      id: "seller-5",
      name: "LogiTech AI",
      verified: true
    }
  },
  {
    id: "6",
    title: "Content Generation Assistant",
    description: "Generate high-quality blog posts, social media content, and marketing copy tailored to your brand voice and audience.",
    category: "Content Creation",
    rating: 4.8,
    reviews: 312,
    price: "$59",
    priceInCents: 5900,
    seller: {
      id: "seller-6",
      name: "ContentMaster",
      verified: true
    }
  },
  {
    id: "7",
    title: "Expense Report Automation",
    description: "AI-powered system that extracts data from receipts and automatically generates expense reports, saving 5+ hours per week.",
    category: "Finance",
    rating: 4.7,
    reviews: 89,
    price: "$69",
    priceInCents: 6900,
    seller: {
      id: "seller-7",
      name: "FinanceBot Inc",
      verified: false
    }
  },
  {
    id: "8",
    title: "Social Media Analytics AI",
    description: "Track brand mentions, sentiment analysis, and competitor insights across all social platforms with automated reporting.",
    category: "Analytics",
    rating: 4.5,
    reviews: 167,
    price: "$99",
    priceInCents: 9900,
    seller: {
      id: "seller-8",
      name: "SocialMetrics",
      verified: true
    }
  },
  {
    id: "9",
    title: "Resume Screening Assistant",
    description: "Automatically screen and rank job applications based on custom criteria, reducing hiring time by 60%.",
    category: "Human Resources",
    rating: 4.8,
    reviews: 145,
    price: "$79",
    priceInCents: 7900,
    seller: {
      id: "seller-9",
      name: "HireRight AI", 
      verified: true
    }
  }
];

const UseCaseGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockUseCases.map((useCase) => (
        <UseCaseCard key={useCase.id} {...useCase} />
      ))}
    </div>
  );
};

export default UseCaseGrid;
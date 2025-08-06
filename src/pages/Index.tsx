import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import UseCaseGrid from "@/components/UseCaseGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <UseCaseGrid />
    </div>
  );
};

export default Index;

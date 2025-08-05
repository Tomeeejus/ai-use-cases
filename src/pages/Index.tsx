import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import UseCaseGrid from "@/components/UseCaseGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturedSection />
      <UseCaseGrid />
    </div>
  );
};

export default Index;

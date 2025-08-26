import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/hero-ai-marketplace.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="AI Marketplace" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Find Simple AI Solutions <br />
                <span className="text-primary">Ready to Deploy</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Discover practical AI implementations that are cheap, easy to deploy, and deliver real results. No complexity, no enterprise overhead.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="xl" className="group">
                Explore Use Cases
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="premium" size="xl">
                Submit Your Solution
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Simple Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$49</div>
                <div className="text-sm text-muted-foreground">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Quick Setup</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Features can be added here if needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
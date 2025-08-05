import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/hero-ai-marketplace.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI Marketplace" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Premium AI Solutions
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Find & Deploy
                <span className="bg-gradient-primary bg-clip-text text-transparent"> High-Quality</span>
                <br />
                AI Use Cases
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Connect with verified AI solutions. Browse curated use cases, evaluate ROI potential, 
                and implement proven strategies that drive real business value.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button variant="cta" size="xl" className="group w-full sm:w-auto">
                Explore Use Cases
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="premium" size="xl" className="w-full sm:w-auto">
                Submit Your Solution
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Verified Use Cases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Avg. Response</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Quality Assured</h3>
                  <p className="text-muted-foreground">Every use case is verified by our expert team for real-world applicability</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Proven ROI</h3>
                  <p className="text-muted-foreground">Access detailed metrics and case studies showing measurable business impact</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Ready to Deploy</h3>
                  <p className="text-muted-foreground">Get implementation guides, code samples, and expert support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
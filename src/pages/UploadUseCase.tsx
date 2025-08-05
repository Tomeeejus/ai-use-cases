import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
}

const UploadUseCase = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    implementation_guide: "",
    price: "",
    category_id: "",
    difficulty_level: "",
    time_to_implement: "",
    roi: "",
    demo_url: "",
    case_study_url: "",
    tags: [] as string[],
    tools_required: [] as string[],
    status: "draft" as "draft" | "published"
  });

  const [newTag, setNewTag] = useState("");
  const [newTool, setNewTool] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchCategories();
  }, [user, navigate]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");
    
    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data || []);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addTool = () => {
    if (newTool.trim() && !formData.tools_required.includes(newTool.trim())) {
      setFormData({
        ...formData,
        tools_required: [...formData.tools_required, newTool.trim()]
      });
      setNewTool("");
    }
  };

  const removeTool = (toolToRemove: string) => {
    setFormData({
      ...formData,
      tools_required: formData.tools_required.filter(tool => tool !== toolToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError("");

    try {
      const priceInCents = Math.round(parseFloat(formData.price) * 100);
      
      const { error } = await supabase.from("use_cases").insert({
        title: formData.title,
        description: formData.description,
        implementation_guide: formData.implementation_guide,
        price: priceInCents,
        category_id: formData.category_id || null,
        difficulty_level: formData.difficulty_level || null,
        time_to_implement: formData.time_to_implement || null,
        roi: formData.roi || null,
        demo_url: formData.demo_url || null,
        case_study_url: formData.case_study_url || null,
        tags: formData.tags.length > 0 ? formData.tags : null,
        tools_required: formData.tools_required.length > 0 ? formData.tools_required : null,
        status: formData.status,
        seller_id: user.id
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your use case has been submitted successfully.",
      });

      navigate("/seller-dashboard");
    } catch (error: any) {
      console.error("Error submitting use case:", error);
      setError(error.message || "An error occurred while submitting your use case.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload AI Use Case</h1>
          <p className="text-muted-foreground">Share your AI solution with the community</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Use Case Details</CardTitle>
            <CardDescription>Provide comprehensive information about your AI use case</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter use case title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99.99"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your AI use case, its benefits, and target audience"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="implementation_guide">Implementation Guide</Label>
                <Textarea
                  id="implementation_guide"
                  value={formData.implementation_guide}
                  onChange={(e) => setFormData({ ...formData, implementation_guide: e.target.value })}
                  placeholder="Provide step-by-step implementation instructions"
                  rows={6}
                />
              </div>

              {/* Category and Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={formData.difficulty_level} onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time_to_implement">Time to Implement</Label>
                  <Input
                    id="time_to_implement"
                    value={formData.time_to_implement}
                    onChange={(e) => setFormData({ ...formData, time_to_implement: e.target.value })}
                    placeholder="e.g., 2-4 weeks"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roi">Expected ROI</Label>
                  <Input
                    id="roi"
                    value={formData.roi}
                    onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                    placeholder="e.g., 300% in 6 months"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    placeholder="https://example.com/demo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="case_study_url">Case Study URL</Label>
                <Input
                  id="case_study_url"
                  type="url"
                  value={formData.case_study_url}
                  onChange={(e) => setFormData({ ...formData, case_study_url: e.target.value })}
                  placeholder="https://example.com/case-study"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tools Required */}
              <div className="space-y-2">
                <Label>Tools Required</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    placeholder="Add a tool"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
                  />
                  <Button type="button" onClick={addTool} variant="outline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tools_required.map((tool) => (
                    <Badge key={tool} variant="outline" className="flex items-center gap-1">
                      {tool}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTool(tool)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Publication Status</Label>
                <Select value={formData.status} onValueChange={(value: "draft" | "published") => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="published">Publish Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Use Case"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/seller-dashboard")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadUseCase;
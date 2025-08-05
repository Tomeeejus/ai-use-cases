import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

export default function UploadUseCase() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    roi: '',
    time_to_implement: '',
    implementation_guide: '',
    tools_required: '',
    difficulty_level: '',
    tags: '',
    demo_url: '',
    case_study_url: '',
    status: 'draft'
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchCategories();
  }, [user, navigate]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const toolsArray = formData.tools_required 
        ? formData.tools_required.split(',').map(tool => tool.trim()).filter(Boolean)
        : [];
      
      const tagsArray = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];

      const { error } = await supabase
        .from('use_cases')
        .insert({
          seller_id: user?.id,
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id || null,
          price: parseFloat(formData.price),
          roi: formData.roi || null,
          time_to_implement: formData.time_to_implement || null,
          implementation_guide: formData.implementation_guide || null,
          tools_required: toolsArray,
          difficulty_level: formData.difficulty_level || null,
          tags: tagsArray,
          demo_url: formData.demo_url || null,
          case_study_url: formData.case_study_url || null,
          status: formData.status
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Use case created successfully!",
      });

      navigate('/seller-dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/seller-dashboard')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Use Case</CardTitle>
            <CardDescription>
              Share your AI expertise and help others implement successful solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="AI-Powered Customer Support Chatbot"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="49.99"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your AI use case, its benefits, and what makes it valuable..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
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
                    <Select value={formData.difficulty_level} onValueChange={(value) => handleInputChange('difficulty_level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roi">Expected ROI</Label>
                    <Input
                      id="roi"
                      value={formData.roi}
                      onChange={(e) => handleInputChange('roi', e.target.value)}
                      placeholder="300% increase in efficiency"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time_to_implement">Time to Implement</Label>
                    <Input
                      id="time_to_implement"
                      value={formData.time_to_implement}
                      onChange={(e) => handleInputChange('time_to_implement', e.target.value)}
                      placeholder="2-3 weeks"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Technical Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="implementation_guide">Implementation Guide</Label>
                  <Textarea
                    id="implementation_guide"
                    value={formData.implementation_guide}
                    onChange={(e) => handleInputChange('implementation_guide', e.target.value)}
                    placeholder="Step-by-step guide on how to implement this AI solution..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tools_required">Required Tools (comma-separated)</Label>
                  <Input
                    id="tools_required"
                    value={formData.tools_required}
                    onChange={(e) => handleInputChange('tools_required', e.target.value)}
                    placeholder="OpenAI API, Python, Flask, PostgreSQL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="chatbot, customer service, automation, nlp"
                  />
                </div>
              </div>

              {/* Additional Resources */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Resources</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo_url">Demo URL</Label>
                    <Input
                      id="demo_url"
                      type="url"
                      value={formData.demo_url}
                      onChange={(e) => handleInputChange('demo_url', e.target.value)}
                      placeholder="https://demo.example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case_study_url">Case Study URL</Label>
                    <Input
                      id="case_study_url"
                      type="url"
                      value={formData.case_study_url}
                      onChange={(e) => handleInputChange('case_study_url', e.target.value)}
                      placeholder="https://case-study.example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/seller-dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Use Case
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
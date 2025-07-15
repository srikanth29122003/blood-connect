import { useState } from 'react';
import {
  Heart, Users, Shield, Clock, Award, Globe,
  Phone, Mail, MapPin
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const About = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://645e38f48d08100293f9f277.mockapi.io/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });

        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the server.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "All donor information is encrypted and protected with industry-standard security measures."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Our platform is available round the clock to help you find donors when you need them most."
    },
    {
      icon: Users,
      title: "Large Network",
      description: "Connected with thousands of verified donors across multiple cities and blood groups."
    },
    {
      icon: Award,
      title: "Verified Donors",
      description: "All our registered donors go through a verification process to ensure authenticity."
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Our network spans across major cities in India, ensuring help is always within reach."
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Every connection made through our platform contributes to saving precious lives."
    }
  ];

  const stats = [
    { number: "1000+", label: "Registered Donors" },
    { number: "500+", label: "Lives Saved" },
    { number: "45+", label: "Cities Covered" },
    { number: "99%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Blood Connect
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            Connecting life-savers with those in need. Building a community where every drop of blood can make a difference.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Blood Connect was founded with a simple yet powerful mission: to bridge the gap between blood donors and those in critical need. We believe that technology can save lives by making blood donation more accessible, efficient, and transparent.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Every day, thousands of people require blood transfusions due to accidents, surgeries, or medical conditions. Our platform ensures that help is just a click away, connecting donors with recipients in real-time.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-red-600">
                  <Heart className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Save Lives</span>
                </div>
                <div className="flex items-center text-red-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Build Community</span>
                </div>
                <div className="flex items-center text-red-600">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Ensure Safety</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow">
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Blood Connect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built a platform that prioritizes safety, efficiency, and community impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
                <CardContent>
                  <feature.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions or need assistance? We're here to help. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-red-600 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+91 95144 92830</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-red-600 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">support@bloodconnect.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-red-600 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600">
                      123 Health Street<br />
                      Medical District, Chennai 400001<br />
                      Tamil Nadu, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Message subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heart className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of heroes who are making a difference in their communities.
          </p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Register as Donor
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;

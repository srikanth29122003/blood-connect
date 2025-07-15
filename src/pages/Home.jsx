import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, Clock, ArrowRight, Shield, Award, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const [counters, setCounters] = useState({
    donors: 0,
    requests: 0,
    locations: 0,
    saved: 0
  });

  const targetCounters = {
    donors: 500,
    requests: 340,
    locations: 5,
    saved: 150
  };

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const increment = 50;
      const steps = duration / increment;

      Object.keys(targetCounters).forEach((key) => {
        const target = targetCounters[key];
        const step = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, increment);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-white animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Save a Life.
            <span className="block text-red-200">Donate Blood.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
            Join thousands of heroes who are making a difference. Your donation can save up to 3 lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Become a Donor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/find-donors">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Find Donors
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="stats-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{
            icon: Users,
            value: counters.donors,
            label: "Registered Donors"
          }, {
            icon: Heart,
            value: counters.requests,
            label: "Requests Fulfilled"
          }, {
            icon: MapPin,
            value: counters.locations,
            label: "Cities Covered"
          }, {
            icon: Award,
            value: counters.saved,
            label: "Lives Saved"
          }].map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center p-6">
              <Icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{value.toLocaleString()}+</div>
              <div className="text-gray-600 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Blood Connect?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">We make blood donation simple, safe, and accessible for everyone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            icon: Shield,
            title: "Safe & Secure",
            desc: "All donor information is encrypted and secure. We follow strict medical protocols."
          }, {
            icon: Clock,
            title: "Quick Response",
            desc: "Find matching donors instantly with our smart filtering system."
          }, {
            icon: Globe,
            title: "Nationwide Network",
            desc: "Connected with donors across the country to ensure help is always available."
          }].map(({ icon: Icon, title, desc }, i) => (
            <Card key={i} className="text-center p-8 hover:shadow-lg transition-shadow duration-200">
              <CardContent>
                <Icon className="h-16 w-16 text-red-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
        <Heart className="h-16 w-16 mx-auto mb-6 text-white animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
          Join our community of lifesavers. Register as a donor today and help save lives in your community.
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Register Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Users, Shield, Star, MapPin, Clock, CreditCard, Phone, ArrowRight, Play, CheckCircle, Zap, Globe, Award } from 'lucide-react';

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({ rides: 0, users: 0, cities: 0, rating: 0 });

  useEffect(() => {
    // Animate stats on load
    const animateStats = () => {
      const targets = { rides: 50000, users: 25000, cities: 150, rating: 4.9 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setStats({
          rides: Math.floor(targets.rides * progress),
          users: Math.floor(targets.users * progress),
          cities: Math.floor(targets.cities * progress),
          rating: Math.min(targets.rating, targets.rating * progress)
        });

        if (step >= steps) clearInterval(timer);
      }, stepDuration);
    };

    animateStats();
  }, []);

  const features = [
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Professional Drivers',
      description: 'Verified, experienced drivers for your personal vehicle with background checks.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Smart Carpooling',
      description: 'Share rides, split costs, and connect with verified travelers on your route.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety First',
      description: 'Real-time tracking, emergency support, and comprehensive insurance coverage.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Seamless Payments',
      description: 'Secure digital wallet with instant payments and transparent pricing.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Choose Your Service',
      description: 'Select between booking a driver or sharing your ride',
      icon: <MapPin className="h-6 w-6" />
    },
    {
      step: '02',
      title: 'Match & Connect',
      description: 'Get matched with verified drivers or passengers instantly',
      icon: <Users className="h-6 w-6" />
    },
    {
      step: '03',
      title: 'Enjoy Your Journey',
      description: 'Track in real-time and enjoy a safe, comfortable ride',
      icon: <Star className="h-6 w-6" />
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Executive',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Carple has revolutionized my daily commute. The drivers are professional, punctual, and the app is incredibly user-friendly. I feel safe and comfortable every single ride.'
    },
    {
      name: 'Michael Chen',
      role: 'Software Developer',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'The carpooling feature is fantastic! I have saved hundreds of dollars on fuel costs while meeting amazing people. The verification process gives me complete peace of mind.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Outstanding service! The digital wallet makes payments effortless, and the real-time tracking keeps me informed. Carple has exceeded all my expectations.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 mb-8">
              <Zap className="h-4 w-4 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-indigo-700">Trusted by 25,000+ users</span>
            </div>

            <h1 className="text-6xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Smart Rides,
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Shared Journeys
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the future of transportation with professional drivers for your car 
              or smart carpooling to share costs and connect with fellow travelers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/book-driver"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-indigo-500/25 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Book a Driver
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/post-ride"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Share Your Ride
                  <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stats.rides.toLocaleString()}+
                </div>
                <div className="text-gray-600">Rides Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stats.users.toLocaleString()}+
                </div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stats.cities}+
                </div>
                <div className="text-gray-600">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stats.rating.toFixed(1)}★
                </div>
                <div className="text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Carple?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience transportation reimagined with cutting-edge technology and uncompromising safety
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl" 
                     style={{background: `linear-gradient(to right, var(--tw-gradient-stops))`}}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in just three simple steps and transform your travel experience
            </p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-2xl font-bold mb-8 shadow-2xl group-hover:shadow-indigo-500/25 transition-all duration-300 transform group-hover:scale-110">
                    {step.step}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their travel experience
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
              <div className="text-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-6 ring-4 ring-indigo-100"
                />
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-indigo-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join Carple today and experience the future of smart, safe, and sustainable transportation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-white text-indigo-600 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/rides"
              className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl hover:bg-white hover:text-indigo-600 transition-all duration-300 font-semibold text-lg transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                Browse Rides
                <MapPin className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Bank-level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Verified Drivers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span className="text-sm">150+ Cities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Carple</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                Making transportation smarter, safer, and more sustainable for everyone. 
                Join the revolution in urban mobility.
              </p>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-4">
                <li><Link to="/book-driver" className="text-gray-400 hover:text-white transition-colors">Book Driver</Link></li>
                <li><Link to="/post-ride" className="text-gray-400 hover:text-white transition-colors">Post Ride</Link></li>
                <li><Link to="/rides" className="text-gray-400 hover:text-white transition-colors">Find Rides</Link></li>
                <li><Link to="/wallet" className="text-gray-400 hover:text-white transition-colors">Wallet</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Carple. All rights reserved. Made with ❤️ for better transportation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
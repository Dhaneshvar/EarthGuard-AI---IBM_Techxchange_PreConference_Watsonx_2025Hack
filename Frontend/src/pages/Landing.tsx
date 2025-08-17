import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  AlertTriangle, 
  Brain,
  Satellite,
  Users,
  Award
} from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Agentic AI-Powered Prediction',
      description: 'Advanced machine learning models analyze patterns to predict natural disasters before they strike.'
    },
    {
      icon: AlertTriangle,
      title: 'Real-time Alerts',
      description: 'Instant notifications and warnings delivered to communities and emergency responders.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive visualizations of disaster trends, risk assessments, and response metrics.'
    },
    {
      icon: Satellite,
      title: 'Satellite Integration',
      description: 'Real-time satellite data processing for enhanced monitoring and early detection capabilities.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Worldwide disaster monitoring and prediction capabilities with regional customization.'
    },
    {
      icon: Shield,
      title: 'Emergency Response',
      description: 'Automated coordination tools for emergency services and disaster response teams.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-green-600 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
                <Award className="h-4 w-4 mr-2" />
                IBM TechXchange 2025 Pre-Conference Watsonx Hackathon
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                EarthGuard AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing disaster management with Agentic AI-powered prediction, real-time monitoring, 
              and intelligent response systems for a sustainable future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/solution"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Launch Agentic AI Assistant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold text-lg hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
              >
                View Dashboard
                <BarChart3 className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathon Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              About the Challenge
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Built for the IBM TechXchange 2025 Pre-Conference Watsonx Hackathon, 
              this solution leverages Generative Agentic AI to create sustainable disaster management systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Innovation</h3>
              <p className="text-slate-600">
                Cutting-edge AI models for predictive disaster analysis and prevention.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Sustainability</h3>
              <p className="text-slate-600">
                Contributing to global sustainability through proactive disaster management.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Impact</h3>
              <p className="text-slate-600">
                Protecting communities worldwide through intelligent early warning systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our comprehensive suite of Agentic AI-powered tools delivers end-to-end disaster management capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Save the World?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the future of disaster management with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/solution"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/team"
              className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Meet Our Team
              <Users className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
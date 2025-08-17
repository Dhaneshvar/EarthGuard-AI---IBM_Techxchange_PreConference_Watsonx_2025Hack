import React from 'react';
import { Linkedin, Github, Mail, Award, Users, Target, Lightbulb } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  image: string;
  linkedin: string;
  github?: string;
  email: string;
}

const TeamMembers: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dhaneshvar',
      role: 'Gen AI Engineer',
      expertise: 'Gen AI, Machine Learning, Frontend Development',
      bio: 'AI engineer with a focus on generative models and user-centric design.',
      image: 'https://avatars.githubusercontent.com/u/86231504?v=4',
      linkedin: 'https://linkedin.com/in/dhaneshvar',
      github: 'https://github.com/dhaneshvar',
      email: 'dhaneshvarcse@gmail.com'
    },
    {
      id: '2',
      name: 'Kalaivani',
      role: 'Full Stack Developer',
      expertise: 'React, Flutter, Backend, APIs',
      bio: 'Student developer with a passion for building scalable web applications and APIs. Experienced in React and Flutter.',
      image: 'https://avatars.githubusercontent.com/u/142688148?v=4',
      linkedin: 'https://www.linkedin.com/in/kalaivani-mahalatchoumy/',
      github: 'https://github.com/kalaivanimahalatchoumy',
      email: 'kalaivanikalai0308@gmail.com'
    },
  ];

  const projectValues = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To protect lives and communities through intelligent disaster prediction and response systems powered by cutting-edge AI technology.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'Leveraging IBM Watsonx and generative AI to create breakthrough solutions in disaster management and climate resilience.'
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'Bringing together diverse expertise in AI, meteorology, emergency management, and user experience design.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Award className="h-4 w-4 mr-2" />
            IBM TechXchange 2025 Hackathon Team
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet the <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">EarthGuard AI</span> Team
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A diverse group of passionate experts united by a common goal: revolutionizing disaster management 
            through artificial intelligence and sustainable innovation.
          </p>
        </div>

        {/* Project Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {projectValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Profile Image */}
              <div className="aspect-w-1 aspect-h-1 h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  // className=""
                  style={{
        width: "50%",   // fixed width
        height: "100%",  // fixed height
        objectFit: "cover", // keeps it proportional
        borderRadius: "12px", // optional rounding
        alignItems: "center", // centers the image
        justifyContent: "center",
      }}
                />
              </div>

              {/* Member Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-green-600 font-medium mb-3">{member.expertise}</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-200 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Recognition */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 rounded-2xl text-white text-center">
          <div className="mb-6">
            <Award className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">Building for Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our team is proud to participate in the IBM TechXchange 2025 Pre-Conference Watsonx Hackathon, 
              contributing to global sustainability through innovative AI solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">72</div>
              <div className="text-sm text-blue-100">Hours of Development</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm text-blue-100">Expert Team Members</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-sm text-blue-100">Lives We Aim to Save</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
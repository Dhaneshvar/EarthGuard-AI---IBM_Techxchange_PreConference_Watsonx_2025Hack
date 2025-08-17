import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, AlertTriangle, Globe, Activity, MapPin } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for charts
  const disasterTrends = [
    { month: 'Jan', floods: 12, earthquakes: 8, wildfires: 15, hurricanes: 3 },
    { month: 'Feb', floods: 18, earthquakes: 5, wildfires: 9, hurricanes: 1 },
    { month: 'Mar', floods: 25, earthquakes: 12, wildfires: 22, hurricanes: 2 },
    { month: 'Apr', floods: 32, earthquakes: 7, wildfires: 35, hurricanes: 4 },
    { month: 'May', floods: 28, earthquakes: 15, wildfires: 48, hurricanes: 6 },
    { month: 'Jun', floods: 35, earthquakes: 9, wildfires: 62, hurricanes: 8 },
  ];

  const queryTrends = [
    { day: 'Mon', queries: 1250 },
    { day: 'Tue', queries: 1580 },
    { day: 'Wed', queries: 1890 },
    { day: 'Thu', queries: 2100 },
    { day: 'Fri', queries: 1750 },
    { day: 'Sat', queries: 1350 },
    { day: 'Sun', queries: 1120 },
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 15, color: '#F97316' },
    { name: 'Critical Risk', value: 5, color: '#EF4444' },
  ];

  const globalHotspots = [
    { region: 'Pacific Ring of Fire', riskLevel: 'Critical', disasters: 156, population: '2.3M' },
    { region: 'Hurricane Alley', riskLevel: 'High', disasters: 89, population: '4.1M' },
    { region: 'Mediterranean Coast', riskLevel: 'Medium', disasters: 45, population: '890K' },
    { region: 'Tornado Corridor', riskLevel: 'High', disasters: 67, population: '1.7M' },
  ];

  const keywordCloud = [
    'flood prediction', 'earthquake monitoring', 'wildfire alerts', 'hurricane tracking',
    'emergency response', 'evacuation planning', 'risk assessment', 'weather patterns',
    'seismic activity', 'climate change', 'disaster preparedness', 'early warning'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Global Disaster Intelligence Dashboard
          </h1>
          <p className="text-slate-600">
            Real-time insights and analytics powered by EarthGuard AI
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Monitoring</p>
                <p className="text-3xl font-bold text-blue-600">247</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Alerts Issued</p>
                <p className="text-3xl font-bold text-red-600">89</p>
                <p className="text-xs text-red-600 mt-1">+23% from last week</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Global Coverage</p>
                <p className="text-3xl font-bold text-green-600">156</p>
                <p className="text-xs text-slate-600 mt-1">Countries monitored</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">People Protected</p>
                <p className="text-3xl font-bold text-purple-600">8.7M</p>
                <p className="text-xs text-green-600 mt-1">+5.2% growth</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Disaster Trends */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Disaster Trends (6 months)</h3>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disasterTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="floods" fill="#3B82F6" name="Floods" />
                  <Bar dataKey="earthquakes" fill="#EF4444" name="Earthquakes" />
                  <Bar dataKey="wildfires" fill="#F97316" name="Wildfires" />
                  <Bar dataKey="hurricanes" fill="#8B5CF6" name="Hurricanes" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Risk Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Query Analytics and Global Hotspots */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Query Trends */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Weekly Query Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queryTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="queries" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Global Hotspots */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Global Risk Hotspots</h3>
            <div className="space-y-4">
              {globalHotspots.map((hotspot, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{hotspot.region}</p>
                      <p className="text-sm text-slate-600">{hotspot.population} people affected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      hotspot.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                      hotspot.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {hotspot.riskLevel}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{hotspot.disasters} events</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Keyword Analytics */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Popular Search Terms</h3>
          <div className="flex flex-wrap gap-3">
            {keywordCloud.map((keyword, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:shadow-md cursor-pointer ${
                  index % 4 === 0 ? 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200' :
                  index % 4 === 1 ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' :
                  index % 4 === 2 ? 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200' :
                  'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200'
                }`}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Live Status */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">System Status: Operational</h3>
              <p className="text-blue-100">
                All monitoring systems active • Last updated: {new Date().toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
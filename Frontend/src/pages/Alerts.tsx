import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, Users, Eye, Bell, Filter } from 'lucide-react';

interface Alert {
  id: string;
  type: 'flood' | 'earthquake' | 'wildfire' | 'hurricane' | 'tornado';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  affectedPopulation: number;
  isActive: boolean;
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState(3);

  // Mock alerts data
  useEffect(() => {
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'flood',
        severity: 'critical',
        title: 'Flash Flood Warning',
        description: 'Heavy rainfall has triggered flash flood conditions in the downtown area. Immediate evacuation recommended for low-lying areas.',
        location: 'Downtown District, Metro City',
        timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
        affectedPopulation: 45000,
        isActive: true,
      },
      {
        id: '2',
        type: 'wildfire',
        severity: 'high',
        title: 'Wildfire Containment Alert',
        description: 'Forest fire expanding rapidly due to strong winds. Evacuation orders in effect for surrounding residential areas.',
        location: 'Pine Ridge Forest, North County',
        timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
        affectedPopulation: 12000,
        isActive: true,
      },
      {
        id: '3',
        type: 'earthquake',
        severity: 'medium',
        title: 'Seismic Activity Detected',
        description: 'Moderate earthquake activity recorded. No immediate damage reported. Continue monitoring for aftershocks.',
        location: 'San Andreas Region',
        timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
        affectedPopulation: 230000,
        isActive: false,
      },
      {
        id: '4',
        type: 'hurricane',
        severity: 'high',
        title: 'Hurricane Watch',
        description: 'Category 3 hurricane approaching coastline. Residents advised to complete evacuation preparations.',
        location: 'Gulf Coast Region',
        timestamp: new Date(Date.now() - 6 * 60 * 60000), // 6 hours ago
        affectedPopulation: 890000,
        isActive: true,
      },
      {
        id: '5',
        type: 'tornado',
        severity: 'medium',
        title: 'Tornado Watch',
        description: 'Conditions favorable for tornado development. Stay alert and monitor weather updates closely.',
        location: 'Midwest Plains Area',
        timestamp: new Date(Date.now() - 12 * 60 * 60000), // 12 hours ago
        affectedPopulation: 67000,
        isActive: false,
      },
    ];

    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flood': return '🌊';
      case 'earthquake': return '🌍';
      case 'wildfire': return '🔥';
      case 'hurricane': return '🌀';
      case 'tornado': return '🌪️';
      default: return '⚠️';
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : filter === 'active' 
    ? alerts.filter(alert => alert.isActive)
    : alerts.filter(alert => alert.severity === filter);

  const activeAlertsCount = alerts.filter(alert => alert.isActive).length;
  const criticalAlertsCount = alerts.filter(alert => alert.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Alerts</p>
                <p className="text-3xl font-bold text-red-600">{activeAlertsCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Critical Events</p>
                <p className="text-3xl font-bold text-orange-600">{criticalAlertsCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">People Affected</p>
                <p className="text-3xl font-bold text-blue-600">1.2M</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Notifications</p>
                <p className="text-3xl font-bold text-green-600">{notifications}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <AlertTriangle className="h-7 w-7 mr-2 text-red-600" />
              Disaster Alerts Dashboard
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-slate-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-lg border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Alerts</option>
                  <option value="active">Active Only</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div className="text-sm text-slate-600">
                {filteredAlerts.length} alerts found
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 transition-all duration-200 hover:shadow-md ${
                alert.severity === 'critical' ? 'border-l-red-500' :
                alert.severity === 'high' ? 'border-l-orange-500' :
                alert.severity === 'medium' ? 'border-l-yellow-500' :
                'border-l-blue-500'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{getTypeIcon(alert.type)}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900">{alert.title}</h3>
                        
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        
                        {alert.isActive && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      
                      <p className="text-slate-700 mb-3">{alert.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{alert.timestamp.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{alert.affectedPopulation.toLocaleString()} people affected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                  
                  {alert.isActive && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                      Emergency Response
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Updates */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Real-time Monitoring Active</h3>
              <p className="text-blue-100">
                EarthGuard AI is continuously monitoring global conditions for potential threats.
              </p>
            </div>
            
            <div className="hidden sm:block">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
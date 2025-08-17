import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, FileText, Bot, User, Loader } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Report {
  title: string;
  content: string;
  generatedAt: Date;
  messageId: string;
  rating?: 'up' | 'down' | null;
}

const Solution: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showInitialPrompt, setShowInitialPrompt] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = {
      'flood': `# Flood Risk Analysis Report

## Current Situation
Based on recent meteorological data and satellite imagery, we've identified elevated flood risks in several regions.

### Key Findings:
- **High-risk areas**: Coastal regions and river basins
- **Precipitation forecast**: 150-200mm expected in next 48 hours
- **Soil saturation**: Currently at 85% capacity

### Recommendations:
1. **Immediate Actions**
   - Issue evacuation warnings for low-lying areas
   - Deploy emergency response teams
   - Activate flood barriers and pumping stations

2. **Monitoring**
   - Continue satellite surveillance
   - Monitor river levels hourly
   - Track weather pattern changes

### Risk Level: **HIGH** ⚠️`,
      
      'earthquake': `# Earthquake Risk Assessment

## Seismic Activity Analysis
Our AI models have detected unusual seismic patterns in the target region.

### Current Status:
- **Magnitude probability**: 4.5-6.2 range
- **Time frame**: Next 72 hours
- **Affected population**: ~2.3 million residents

### Preparedness Measures:
1. **Public Safety**
   - Alert emergency services
   - Activate earthquake response protocols
   - Ensure hospital readiness

2. **Infrastructure**
   - Check critical facility status
   - Inspect bridges and high-rise buildings
   - Secure hazardous materials

### Alert Level: **MODERATE** ⚡`,
      
      'wildfire': `# Wildfire Threat Assessment

## Fire Risk Conditions
Current environmental conditions show elevated wildfire risk.

### Risk Factors:
- **Temperature**: 38°C+ (100°F+)
- **Humidity**: Below 15%
- **Wind speed**: 45+ km/h sustained
- **Vegetation dryness**: Critical levels

### Prevention Strategy:
1. **Fire Suppression**
   - Position firefighting aircraft
   - Establish firebreaks
   - Monitor ignition sources

2. **Community Safety**
   - Issue red flag warnings
   - Prepare evacuation routes
   - Distribute safety guidelines

### Threat Level: **ELEVATED** 🔥`
    };

    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.toLowerCase().includes(key)) {
        return response;
      }
    }

    return `# General Disaster Analysis

## AI Assessment Complete
Thank you for your query about "${userMessage}". Our AI system has analyzed current conditions and available data.

### Analysis Results:
- **Data sources processed**: Satellite imagery, weather stations, seismic monitors
- **Risk assessment**: Currently evaluating patterns
- **Confidence level**: 87%

### Current Recommendations:
1. Continue monitoring environmental conditions
2. Maintain emergency preparedness protocols
3. Stay informed of weather and geological updates

### Status: **MONITORING** 📊

For specific disaster types, try queries like "flood risk", "earthquake prediction", or "wildfire assessment".`;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!inputValue.trim()) return;

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     content: inputValue,
  //     isUser: true,
  //     timestamp: new Date(),
  //   };

  //   setMessages(prev => [...prev, userMessage]);
  //   setInputValue('');
  //   setIsLoading(true);
  //   setShowInitialPrompt(false);

  //   // Simulate AI processing delay
  //   setTimeout(() => {
  //     const aiResponse = simulateAIResponse(inputValue);
  //     const aiMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       content: aiResponse,
  //       isUser: false,
  //       timestamp: new Date(),
  //     };

  //     setMessages(prev => [...prev, aiMessage]);
  //     setIsLoading(false);

  //     // Generate report
  //     const report: Report = {
  //       title: `Disaster Analysis Report - ${new Date().toLocaleDateString()}`,
  //       content: aiResponse,
  //       generatedAt: new Date(),
  //       messageId: aiMessage.id,
  //       rating: null,
  //     };
  //     setReports(prev => [...prev, report]);
  //     setSelectedReportId(aiMessage.id);
  //   }, 2000);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    content: inputValue,
    isUser: true,
    timestamp: new Date(),
  };

  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setIsLoading(true);
  setShowInitialPrompt(false);

  try {
    // Call your BeeAI workflow API
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: inputValue }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    console.log("AI Response:", data);


    // Assuming BeeAI API returns { ai_response: "..." }
    const aiResponse = data.ai_response || "No response received.";

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);

    // Generate report
    const report: Report = {
      title: `Disaster Analysis Report - ${new Date().toLocaleDateString()}`,
      content: aiResponse,
      generatedAt: new Date(),
      messageId: aiMessage.id,
      rating: null,
    };
    setReports(prev => [...prev, report]);
    setSelectedReportId(aiMessage.id);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    setIsLoading(false);
  }
};


  const handleRating = (messageId: string, rating: 'up' | 'down') => {
    setReports(prev => prev.map(report => 
      report.messageId === messageId 
        ? { ...report, rating: report.rating === rating ? null : rating }
        : report
    ));
    
    // Also update the message to show rating
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, rating }
        : msg
    ));
  };

  const downloadReport = () => {
    const currentReport = reports.find(r => r.messageId === selectedReportId);
    if (!currentReport) return;
    
    const element = document.createElement('a');
    const file = new Blob([currentReport.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentReport.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-slate-900">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 text-slate-800">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mb-2 text-slate-700">$1</h3>')
      .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-6rem)]">
          {/* Chat Section */}
          <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-lg border border-slate-200">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-green-50 rounded-t-2xl">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                <Bot className="h-6 w-6 mr-2 text-blue-600" />
                EarthGuard AI Assistant
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Ask about disaster predictions, risk assessments, or emergency protocols
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {showInitialPrompt && messages.length === 0 && (
                <div className="text-center py-12">
                  <Bot className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Welcome to EarthGuard AI
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    I'm here to help with disaster analysis, prediction, and emergency response planning. 
                    Ask me about floods, earthquakes, wildfires, or any disaster-related concerns.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {['Analyze flood risk', 'Earthquake prediction', 'Wildfire assessment'].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => setInputValue(prompt)}
                        className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl p-4 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isUser ? (
                        <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Bot className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-600" />
                      )}
                      <div className="flex-1">
                        {message.isUser ? (
                          <p>{message.content}</p>
                        ) : (
                          <div>
                            <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                            
                            {/* Rating buttons for AI messages */}
                            <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-slate-200">
                              <span className="text-xs text-slate-500">Rate this response:</span>
                              <button
                                onClick={() => handleRating(message.id, 'up')}
                                className={`p-1 rounded-md transition-colors ${
                                  reports.find(r => r.messageId === message.id)?.rating === 'up'
                                    ? 'bg-green-100 text-green-600'
                                    : 'text-slate-400 hover:text-green-600 hover:bg-green-50'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleRating(message.id, 'down')}
                                className={`p-1 rounded-md transition-colors ${
                                  reports.find(r => r.messageId === message.id)?.rating === 'down'
                                    ? 'bg-red-100 text-red-600'
                                    : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.293 10.707l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setSelectedReportId(message.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 ml-2"
                              >
                                View Report
                              </button>
                            </div>
                          </div>
                        )}
                        <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-slate-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl p-4 rounded-2xl bg-slate-100">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-blue-600" />
                      <Loader className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-slate-600">Analyzing data...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-slate-200">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about disaster risks, predictions, or emergency protocols..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Report Panel */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-2xl">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Live Report
              </h3>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {reports.length > 0 ? (
                <div className="space-y-4">
                  {/* Report Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Select Report ({reports.length} available)
                    </label>
                    <select
                      value={selectedReportId || ''}
                      onChange={(e) => setSelectedReportId(e.target.value || null)}
                      className="w-full rounded-lg border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a report...</option>
                      {reports.map((report, index) => (
                        <option key={report.messageId} value={report.messageId}>
                          Report #{reports.length - index} - {report.generatedAt.toLocaleTimeString()}
                          {report.rating && ` (${report.rating === 'up' ? '👍' : '👎'})`}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedReportId && (() => {
                    const currentReport = reports.find(r => r.messageId === selectedReportId);
                    return currentReport ? (
                      <>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-1">{currentReport.title}</h4>
                          <p className="text-sm text-slate-600">Generated: {currentReport.generatedAt.toLocaleString()}</p>
                          {currentReport.rating && (
                            <div className="flex items-center mt-2">
                              <span className="text-sm text-slate-600 mr-2">Rating:</span>
                              <span className={`text-sm font-medium ${
                                currentReport.rating === 'up' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {currentReport.rating === 'up' ? '👍 Helpful' : '👎 Not Helpful'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div 
                          className="prose prose-sm max-w-none bg-white p-4 rounded-lg border border-slate-200"
                          dangerouslySetInnerHTML={{ __html: formatMessage(currentReport.content) }}
                        />
                        
                        <button
                          onClick={downloadReport}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download Report</span>
                        </button>
                      </>
                    ) : null;
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">
                    Reports will appear here after AI analysis
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Start a conversation to generate your first report
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageCircle, 
  Users, 
  Clock, 
  TrendingUp, 
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Search
} from 'lucide-react';
import { getChatAnalytics, getKnowledgeBase, addKnowledgeBaseEntry } from '../services/aiChatService';

interface KnowledgeBaseEntry {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
  confidence: number;
}

const ChatAnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseEntry[]>([]);
  const [selectedTab, setSelectedTab] = useState<'analytics' | 'knowledge'>('analytics');
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    category: '',
    keywords: '',
    question: '',
    answer: '',
    confidence: 0.8
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAnalytics(getChatAnalytics());
    setKnowledgeBase(getKnowledgeBase());
  };

  const handleAddEntry = () => {
    const entry = {
      category: newEntry.category,
      keywords: newEntry.keywords.split(',').map(k => k.trim()),
      question: newEntry.question,
      answer: newEntry.answer,
      confidence: newEntry.confidence
    };

    addKnowledgeBaseEntry(entry);
    setKnowledgeBase(getKnowledgeBase());
    setShowAddEntry(false);
    setNewEntry({ category: '', keywords: '', question: '', answer: '', confidence: 0.8 });
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  if (!analytics) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Customer Support Analytics</h1>
          <p className="text-gray-600">Monitor chat performance and manage AI knowledge base</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setSelectedTab('analytics')}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'analytics'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
              <button
                onClick={() => setSelectedTab('knowledge')}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'knowledge'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                Knowledge Base
              </button>
            </nav>
          </div>
        </div>

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-primary">{analytics.totalSessions}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Messages</p>
                    <p className="text-2xl font-bold text-primary">{analytics.totalMessages}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Escalation Rate</p>
                    <p className="text-2xl font-bold text-primary">{formatPercentage(analytics.escalationRate)}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
                    <p className="text-2xl font-bold text-primary">{analytics.averageSatisfaction.toFixed(1)}/5</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Questions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Most Common Questions</h3>
              <div className="space-y-3">
                {analytics.topQuestions?.map((q: any, index: number) => (
                  <div key={q.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium capitalize">{q.category.replace('_', ' ')}</span>
                    </div>
                    <span className="text-gray-600">{q.count} questions</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Recent Chat Sessions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Session ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Started</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Messages</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Escalated</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentSessions?.map((session: any) => (
                      <tr key={session.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm font-mono">{session.id.slice(0, 8)}...</td>
                        <td className="py-3 px-4 text-sm">{formatTime(session.startedAt)}</td>
                        <td className="py-3 px-4 text-sm">{session.messages?.length || 0}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            session.escalated 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {session.escalated ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {session.userSatisfaction ? `${session.userSatisfaction}/5` : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Base Tab */}
        {selectedTab === 'knowledge' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">Knowledge Base Management</h3>
              <button
                onClick={() => setShowAddEntry(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-mauve-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </button>
            </div>

            {/* Knowledge Base Entries */}
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search knowledge base..."
                    className="flex-1 border-none outline-none text-gray-600"
                  />
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {knowledgeBase.map((entry) => (
                  <div key={entry.id} className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{entry.question}</h4>
                        <p className="text-sm text-gray-600 capitalize">{entry.category.replace('_', ' ')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {formatPercentage(entry.confidence)}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{entry.answer}</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.keywords.map((keyword, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Entry Modal */}
        {showAddEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
              <h3 className="text-lg font-semibold text-primary mb-4">Add Knowledge Base Entry</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="pricing">Pricing</option>
                    <option value="safety">Safety</option>
                    <option value="verification">Verification</option>
                    <option value="rental_process">Rental Process</option>
                    <option value="technical">Technical</option>
                    <option value="affiliate">Affiliate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={newEntry.question}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, question: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="What question does this answer?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma-separated)</label>
                  <input
                    type="text"
                    value={newEntry.keywords}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, keywords: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="pricing, fee, cost, price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={newEntry.answer}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, answer: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Detailed answer with emojis and formatting..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confidence (0.1 - 1.0)</label>
                  <input
                    type="number"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={newEntry.confidence}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, confidence: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddEntry(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEntry}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAnalyticsPage; 
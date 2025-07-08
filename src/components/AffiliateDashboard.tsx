import React, { useState } from 'react';

const AffiliateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'earnings' | 'materials'>('overview');

  const stats = {
    totalReferrals: 23,
    activeReferrals: 18,
    totalEarnings: 1247.50,
    thisMonth: 342.80,
    conversionRate: 78.3,
    averageCommission: 54.24
  };

  const recentReferrals = [
    { name: 'Sarah Johnson', date: '2024-01-15', status: 'Active', earnings: 45.00 },
    { name: 'Mike Chen', date: '2024-01-14', status: 'Active', earnings: 32.50 },
    { name: 'Lisa Rodriguez', date: '2024-01-13', status: 'Pending', earnings: 0 },
    { name: 'David Kim', date: '2024-01-12', status: 'Active', earnings: 67.25 },
    { name: 'Emma Wilson', date: '2024-01-11', status: 'Active', earnings: 28.75 }
  ];

  const earningsHistory = [
    { month: 'Jan 2024', amount: 342.80, referrals: 6 },
    { month: 'Dec 2023', amount: 298.45, referrals: 5 },
    { month: 'Nov 2023', amount: 456.20, referrals: 8 },
    { month: 'Oct 2023', amount: 149.05, referrals: 3 }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">💰 Affiliate Dashboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            Active
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">${stats.totalEarnings}</div>
          <div className="text-gray-600">Total Earnings</div>
          <div className="text-sm text-green-600 mt-1">+${stats.thisMonth} this month</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
          <div className="text-2xl font-bold text-green-600">{stats.totalReferrals}</div>
          <div className="text-gray-600">Total Referrals</div>
          <div className="text-sm text-green-600 mt-1">{stats.activeReferrals} active</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</div>
          <div className="text-gray-600">Conversion Rate</div>
          <div className="text-sm text-purple-600 mt-1">${stats.averageCommission} avg commission</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'referrals', label: 'Referrals', icon: '👥' },
            { id: 'earnings', label: 'Earnings', icon: '💰' },
            { id: 'materials', label: 'Materials', icon: '📱' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentReferrals.slice(0, 3).map((referral, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{referral.name}</div>
                      <div className="text-sm text-gray-600">{referral.date}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        referral.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {referral.status}
                      </div>
                      <div className="text-sm text-gray-600">${referral.earnings}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  📋 Copy Referral Link
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  📱 Share on Social Media
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  📄 Download Materials
                </button>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                  💳 Request Payout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'referrals' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Referrals</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Data
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReferrals.map((referral, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{referral.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{referral.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        referral.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${referral.earnings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h3>
              <div className="space-y-3">
                {earningsHistory.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{month.month}</div>
                      <div className="text-sm text-gray-600">{month.referrals} referrals</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${month.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Information</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Available Balance</div>
                    <div className="text-2xl font-bold text-green-600">${stats.thisMonth}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Next Payout Date</div>
                    <div className="font-medium text-gray-900">January 31, 2024</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Minimum Payout</div>
                    <div className="font-medium text-gray-900">$25.00</div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Request Payout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'materials' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Materials</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Social Media Posts', icon: '📱', count: 12 },
              { title: 'Email Templates', icon: '📧', count: 8 },
              { title: 'Flyers & Posters', icon: '📄', count: 6 },
              { title: 'Video Content', icon: '🎥', count: 4 }
            ].map((material, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="text-3xl mb-2">{material.icon}</div>
                <div className="font-medium text-gray-900 mb-1">{material.title}</div>
                <div className="text-sm text-gray-600 mb-3">{material.count} items</div>
                <button className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Download All
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateDashboard; 
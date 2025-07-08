import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Edit, 
  Save, 
  X, 
  Info,
  AlertCircle,
  CheckCircle,
  Gift,
  Award,
  Star,
  MessageCircle
} from 'lucide-react';
import { 
  getAllUserFeeStructures, 
  getFeeAnalytics, 
  setSpecialFeeRate, 
  removeSpecialFeeRate,
  formatFeePercentage,
  formatCurrency,
  type UserFeeStructure 
} from '../services/feeService';
import { commissionConfig } from '../config/stripe';
import { getCommissionStats, getCommissionAnalyticsByTier, AFFILIATE_TIERS } from '../services/commissionService';

const AdminFeePage: React.FC = () => {
  const [users, setUsers] = useState<UserFeeStructure[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [specialRate, setSpecialRate] = useState<string>('');
  const [specialReason, setSpecialReason] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userData, analyticsData] = await Promise.all([
        getAllUserFeeStructures(),
        getFeeAnalytics()
      ]);
      setUsers(userData);
      setAnalytics(analyticsData);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSetSpecialRate = async (userId: string) => {
    if (!specialRate || !specialReason) {
      setMessage({ type: 'error', text: 'Please fill in both rate and reason' });
      return;
    }

    const rate = parseFloat(specialRate);
    if (isNaN(rate) || rate < 0 || rate > 1) {
      setMessage({ type: 'error', text: 'Please enter a valid rate between 0 and 1' });
      return;
    }

    try {
      await setSpecialFeeRate(userId, rate, specialReason);
      await loadData(); // Reload data
      setEditingUser(null);
      setSpecialRate('');
      setSpecialReason('');
      setMessage({ type: 'success', text: 'Special rate set successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to set special rate' });
    }
  };

  const handleRemoveSpecialRate = async (userId: string) => {
    try {
      await removeSpecialFeeRate(userId);
      await loadData(); // Reload data
      setMessage({ type: 'success', text: 'Special rate removed successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to remove special rate' });
    }
  };

  const getTierColor = (tier: string) => {
    return tier === 'experiencedUser' ? 'text-green-600' : 'text-blue-600';
  };

  const getTierBadge = (tier: string) => {
    return tier === 'experiencedUser' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Fee Management</h1>
              <p className="text-gray-600">Manage platform fees, view analytics, and set special rates</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/admin/chat-analytics"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat Analytics
              </a>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <span className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </span>
            <button
              onClick={() => setMessage(null)}
              className="ml-auto"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        )}

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Platform Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics?.totalRevenue || 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics?.monthlyRevenue || 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Gift className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Affiliate Payouts</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics?.totalAffiliateCommissions || 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Affiliates</p>
                <p className="text-2xl font-bold text-gray-900">{analytics?.activeAffiliates || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Analytics */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Affiliate Commission Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Commission by Tier</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Starter (2%):</span>
                  <span className="font-medium">{formatCurrency(analytics?.affiliateCommissionsByTier?.starter || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pro (3%):</span>
                  <span className="font-medium">{formatCurrency(analytics?.affiliateCommissionsByTier?.pro || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Elite (4%):</span>
                  <span className="font-medium">{formatCurrency(analytics?.affiliateCommissionsByTier?.elite || 0)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Affiliate Performance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Referrals:</span>
                  <span className="font-medium">{analytics?.totalReferrals || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Commission:</span>
                  <span className="font-medium">{formatCurrency(analytics?.averageAffiliateCommission || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-medium">{analytics?.affiliateConversionRate || 0}%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Commission Structure</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Starter Tier:</span>
                  <span className="font-medium">{AFFILIATE_TIERS.starter.commissionRate * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pro Tier:</span>
                  <span className="font-medium">{AFFILIATE_TIERS.pro.commissionRate * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Elite Tier:</span>
                  <span className="font-medium">{AFFILIATE_TIERS.elite.commissionRate * 100}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Fee Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Platform Fee Rates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Users (0-9 rentals):</span>
                  <span className="font-medium">{formatFeePercentage(commissionConfig.tiers.newUser)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experienced Users (10+ rentals):</span>
                  <span className="font-medium">{formatFeePercentage(commissionConfig.tiers.experiencedUser)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Commission:</span>
                  <span className="font-medium">{formatCurrency(commissionConfig.minCommission)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum Commission:</span>
                  <span className="font-medium">{formatCurrency(commissionConfig.maxCommission)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">User Distribution</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Users:</span>
                  <span className="font-medium">{analytics?.newUsers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experienced Users:</span>
                  <span className="font-medium">{analytics?.experiencedUsers || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Fee Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">User Fee Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rentals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierBadge(user.tier)}`}>
                        {user.tier === 'experiencedUser' ? 'Experienced' : 'New User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={user.specialRate ? 'text-orange-600 font-medium' : getTierColor(user.tier)}>
                        {formatFeePercentage(user.specialRate || user.feePercentage)}
                      </span>
                      {user.specialRate && (
                        <span className="ml-2 text-xs text-orange-600">(Special)</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.rentalCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastUpdated.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingUser === user.userId ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={specialRate}
                            onChange={(e) => setSpecialRate(e.target.value)}
                            placeholder="0.22"
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            value={specialReason}
                            onChange={(e) => setSpecialReason(e.target.value)}
                            placeholder="Reason"
                            className="w-32 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => handleSetSpecialRate(user.userId)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingUser(null);
                              setSpecialRate('');
                              setSpecialReason('');
                            }}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingUser(user.userId)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Set special rate"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          {user.specialRate && (
                            <button
                              onClick={() => handleRemoveSpecialRate(user.userId)}
                              className="text-red-600 hover:text-red-900"
                              title="Remove special rate"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Special Rate Info */}
        {users.some(u => u.specialRate) && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Special Rates Active</span>
            </div>
            <p className="text-sm text-yellow-700">
              Some users have special fee rates set. These override the standard tiered pricing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeePage; 
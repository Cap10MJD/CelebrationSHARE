import React, { useState, useEffect } from 'react';
import { User, Shield, Star, MapPin, Calendar, Camera, Edit, CheckCircle, AlertCircle, Heart, MessageSquare, Settings, Trash2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllItems, deleteItem, type Item } from '../services/itemService';
import { getCommissionStats, getAllCommissions } from '../services/commissionService';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [commissionStats, setCommissionStats] = useState<any>(null);
  const [commissionRecords, setCommissionRecords] = useState<any[]>([]);
  const navigate = useNavigate();

  // Load user's items
  const loadUserItems = async () => {
    try {
      const allItems = await getAllItems();
      // Filter items owned by the current user (in a real app, this would be based on user ID)
      // For now, we'll filter by owner name "You" which is what we set in ListItemPage
      const myItems = allItems.filter(item => item.owner.name === 'You');
      setUserItems(myItems);
    } catch (error) {
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  // Load items when component mounts and when items tab is active
  useEffect(() => {
    loadUserItems();
  }, []);

  // Load commission data when earnings tab is active
  useEffect(() => {
    if (activeTab === 'earnings') {
      loadCommissionData();
    }
  }, [activeTab]);

  const loadCommissionData = async () => {
    try {
      const [stats, records] = await Promise.all([
        getCommissionStats(),
        getAllCommissions()
      ]);
      setCommissionStats(stats);
      setCommissionRecords(records);
    } catch (error) {
      // Show error message
    }
  };

  // Refresh items when tab becomes active (in case user just added a new item)
  useEffect(() => {
    if (activeTab === 'items') {
      loadUserItems();
    }
  }, [activeTab]);

  // Handle editing an item
  const handleEditItem = (itemId: number) => {
    // For now, navigate to a generic edit page
    // In a real app, you'd navigate to an edit form with the item data
    navigate(`/edit-item/${itemId}`);
  };

  // Handle deleting an item
  const handleDeleteItem = async (itemId: number) => {
    try {
      const success = await deleteItem(itemId);
      if (success) {
        // Remove the item from the local state
        setUserItems(prev => prev.filter(item => item.id !== itemId));
        setShowDeleteConfirm(null);
        
        // Show success message (you could add a toast notification here)
      } else {
        // Show error message
      }
    } catch (error) {
      // Show error message
    }
  };

  // Handle viewing item stats
  const handleViewStats = (itemId: number) => {
    // Navigate to item stats page or show stats modal
    navigate(`/item-stats/${itemId}`);
  };
  useEffect(() => {
    if (activeTab === 'items') {
      loadUserItems();
    }
  }, [activeTab]);

  // Demo user data for demonstration purposes
  // In production, this would be fetched from the user's actual profile
  const user = {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@celebration-share.com',
    phone: '(216) 555-0123',
    location: 'Maple Heights, OH',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    joinDate: 'March 2022',
    lastActive: '2 days ago',
    rating: 4.9,
    totalRentals: 89,
    totalEarnings: 2450,
    responseTime: '< 1 hour',
    verificationLevel: 3,
    badges: [
      { name: 'Email Verified', icon: CheckCircle, color: 'accent' },
      { name: 'Phone Verified', icon: CheckCircle, color: 'accent' },
      { name: 'ID Verified', icon: Shield, color: 'primary' },
      { name: 'Background Check', icon: Shield, color: 'primary' },
      { name: 'Social Linked', icon: CheckCircle, color: 'accent' },
      { name: 'Mom-Approved', icon: Heart, color: 'accent' }
    ],
    stats: {
      itemsListed: userItems.length,
      timesRented: 89,
      repeatCustomers: 34,
      averageRating: 4.9,
      responseRate: 100,
      onTimeDelivery: 98
    }
  };

  // Demo activity data for demonstration purposes
  const recentActivity = [
    {
      type: 'rental',
      title: 'Round Table Set rented by Jennifer K.',
      date: '2 days ago',
      amount: '$75'
    },
    {
      type: 'review',
      title: 'New 5-star review from Michael R.',
      date: '1 week ago',
      amount: ''
    },
    {
      type: 'rental',
      title: 'Balloon Arch Kit rented by Lisa T.',
      date: '1 week ago',
      amount: '$105'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'verification', name: 'Verification', icon: Lock },
    { id: 'items', name: 'My Items', icon: Camera },
    { id: 'earnings', name: 'Earnings', icon: Star },
    { id: 'activity', name: 'Activity', icon: Calendar },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full"
              />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-mauve-700 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-primary">{user.name}</h1>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-accent fill-current" />
                  <span className="font-semibold">{user.rating}</span>
                  <span className="text-text">({user.totalRentals} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-text mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Responds in {user.responseTime}</span>
                </div>
              </div>

              {/* Verification Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {user.badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div key={index} className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      badge.color === 'accent' ? 'bg-secondary text-primary' :
                      'bg-rose-100 text-primary'
                    }`}>
                      <Icon className="w-3 h-3" />
                      {badge.name}
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{user.stats.itemsListed}</div>
                  <div className="text-sm text-text">Items Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{user.stats.timesRented}</div>
                  <div className="text-sm text-text">Times Rented</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{user.stats.responseRate}%</div>
                  <div className="text-sm text-text">Response Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">${user.totalEarnings}</div>
                  <div className="text-sm text-text">Total Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="border-b border-secondary">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-accent text-accent'
                        : 'border-transparent text-text hover:text-primary hover:border-secondary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Overview */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Performance Overview</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-text">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="font-semibold">{user.stats.averageRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Response Rate</span>
                      <span className="font-semibold text-accent">{user.stats.responseRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">On-Time Delivery</span>
                      <span className="font-semibold text-accent">{user.stats.onTimeDelivery}%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-text">Total Rentals</span>
                      <span className="font-semibold">{user.stats.timesRented}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Repeat Customers</span>
                      <span className="font-semibold">{user.stats.repeatCustomers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Total Earnings</span>
                      <span className="font-semibold text-accent">${user.totalEarnings}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-background rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'rental' ? 'bg-secondary text-primary' : 'bg-rose-100 text-accent'
                      }`}>
                        {activity.type === 'rental' ? (
                          <Calendar className="w-4 h-4" />
                        ) : (
                          <Star className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-primary font-medium">{activity.title}</p>
                        <p className="text-text text-sm">{activity.date}</p>
                      </div>
                      {activity.amount && (
                        <div className="text-accent font-semibold">
                          {activity.amount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust & Safety */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Trust & Safety</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-primary">Verification Complete</p>
                      <p className="text-sm text-text">Level 3 - Highest trust level</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-primary">Background Check</p>
                      <p className="text-sm text-text">Completed & verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-primary">Payment Verified</p>
                      <p className="text-sm text-text">Stripe Connect enabled</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/list-item')}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-mauve-700 transition-colors"
                  >
                    List New Item
                  </button>
                  <button className="w-full border border-secondary text-primary py-2 px-4 rounded-lg hover:bg-background transition-colors">
                    View Messages
                  </button>
                  <button className="w-full border border-secondary text-primary py-2 px-4 rounded-lg hover:bg-background transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-primary">Safety Verification</h3>
                <p className="text-text">Complete verification to ensure a safe community for families</p>
              </div>
              <button 
                onClick={() => navigate('/verification')}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
              >
                Manage Verification
              </button>
            </div>

            {/* Verification Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary mb-2">{user.verificationLevel}</div>
                <div className="text-sm text-text">Verification Level</div>
                <div className="text-xs text-accent mt-1">Premium</div>
              </div>
              <div className="bg-rose-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary mb-2">{user.badges.length}</div>
                <div className="text-sm text-text">Trust Badges</div>
                <div className="text-xs text-accent mt-1">All Complete</div>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary mb-2">95</div>
                <div className="text-sm text-text">Safety Score</div>
                <div className="text-xs text-accent mt-1">Excellent</div>
              </div>
            </div>

            {/* Verification Steps */}
            <div className="space-y-4 mb-8">
              <h4 className="font-medium text-primary">Verification Steps</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-primary">ID Verification</p>
                      <p className="text-sm text-text">Government-issued photo ID verified</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">Completed</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-primary">Background Check</p>
                      <p className="text-sm text-text">Criminal background check completed</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">Completed</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-primary">Social Verification</p>
                      <p className="text-sm text-text">Social media profiles linked</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">Completed</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mb-8">
              <h4 className="font-medium text-primary mb-4">Trust Indicators</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries({
                  'ID Verified': true,
                  'Background Check': true,
                  'Social Linked': true,
                  'Address Verified': true,
                  'Phone Verified': true,
                  'Email Verified': true,
                  'Mom-Approved': true,
                  'Payment Verified': true
                }).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className={value ? 'text-green-500' : 'text-gray-400'}>
                      {value ? '✅' : '⭕'}
                    </span>
                    <span className="text-sm text-gray-700">{key}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-blue-900 mb-1">Family Safety First</h5>
                  <p className="text-blue-800 text-sm">
                    Your verification ensures the safety of our community. All users must complete 
                    ID verification and background checks to participate in our family-focused marketplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-primary">My Items ({userItems.length})</h3>
              <div className="flex gap-2">
                <button 
                  onClick={loadUserItems}
                  disabled={loading}
                  className="border border-secondary text-primary px-4 py-2 rounded-lg hover:bg-background transition-colors disabled:opacity-50"
                >
                  Refresh
                </button>
                <button 
                  onClick={() => navigate('/list-item')}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
                >
                  Add New Item
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-secondary rounded-xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : userItems.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-text mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">No Items Listed Yet</h3>
                <p className="text-text mb-6">Start sharing your items with your community!</p>
                <button 
                  onClick={() => navigate('/list-item')}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-mauve-700 transition-colors"
                >
                  List Your First Item
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {userItems.map((item) => (
                  <div key={item.id} className="border border-secondary rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-secondary text-primary">
                        Available
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-primary mb-2">{item.title}</h4>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-primary">${item.price}/day</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-accent fill-current" />
                          <span className="text-sm font-medium">{item.rating}</span>
                          <span className="text-sm text-text">({item.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-text mb-3">
                        ${item.deposit} deposit • {item.location}
                      </p>
                      
                                          <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditItem(item.id)}
                        className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-mauve-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleViewStats(item.id)}
                        className="flex-1 border border-secondary text-primary py-2 rounded-lg hover:bg-background transition-colors text-sm"
                      >
                        View Stats
                      </button>
                    </div>
                    
                    {/* Delete button */}
                    <div className="mt-2">
                      {showDeleteConfirm === item.id ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            Confirm Delete
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(null)}
                            className="flex-1 border border-secondary text-primary py-2 rounded-lg hover:bg-background transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="w-full flex items-center justify-center gap-2 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Item
                        </button>
                      )}
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-primary mb-6">Platform Earnings</h3>
            
            {commissionStats ? (
              <div className="space-y-6">
                {/* Earnings Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-sm text-primary mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-primary">
                      ${(commissionStats.totalRevenue / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-rose-100 p-4 rounded-lg">
                    <div className="text-sm text-primary mb-1">This Month</div>
                    <div className="text-2xl font-bold text-primary">
                      ${(commissionStats.monthlyCommissions / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <div className="text-sm text-primary mb-1">Total Transactions</div>
                    <div className="text-2xl font-bold text-primary">
                      {commissionStats.totalCommissions}
                    </div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-sm text-primary mb-1">Avg. Commission</div>
                    <div className="text-2xl font-bold text-primary">
                      ${(commissionStats.averageCommission / 100).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h4 className="font-medium text-primary mb-4">Recent Commission Transactions</h4>
                  <div className="space-y-3">
                    {commissionRecords.slice(0, 5).map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 border border-secondary rounded-lg">
                        <div>
                          <p className="font-medium text-primary">{record.itemTitle}</p>
                          <p className="text-sm text-text">
                            {record.ownerName} • {record.date.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accent">
                            +${(record.commission / 100).toFixed(2)}
                          </p>
                          <p className="text-sm text-text">
                            ${(record.rentalAmount / 100).toFixed(2)} rental
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commission Structure Info */}
                <div className="bg-background p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-3">Updated Fee Structure</h4>
                  <div className="text-sm text-text space-y-2">
                    <p>• <strong>22%</strong> platform fee for new users (0-9 rentals)</p>
                    <p>• <strong>18%</strong> platform fee for experienced users (10+ rentals)</p>
                    <p>• <strong>Minimum $2.00</strong> commission per transaction</p>
                    <p>• <strong>Maximum $50.00</strong> commission per transaction</p>
                    <p>• Fees support safety features, insurance, and 24/7 support</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text">Loading earnings data...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-primary mb-6">Activity History</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-secondary rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'rental' ? 'bg-secondary text-primary' : 'bg-rose-100 text-accent'
                  }`}>
                    {activity.type === 'rental' ? (
                      <Calendar className="w-5 h-5" />
                    ) : (
                      <Star className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-primary font-medium">{activity.title}</p>
                    <p className="text-text text-sm">{activity.date}</p>
                  </div>
                  {activity.amount && (
                    <div className="text-accent font-semibold">
                      {activity.amount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-primary mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-primary mb-3">Contact Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-primary mb-3">Security</h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 border border-secondary rounded-lg hover:bg-background transition-colors">
                    <div className="flex justify-between items-center">
                      <span>Change Password</span>
                      <span className="text-accent">Update</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 border border-secondary rounded-lg hover:bg-background transition-colors">
                    <div className="flex justify-between items-center">
                      <span>Two-Factor Authentication</span>
                      <span className="text-accent">Enabled</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { User, Shield, Star, MapPin, Calendar, Camera, Edit, CheckCircle, AlertCircle, Heart, MessageSquare, Settings, Trash2, Lock, Package, TrendingUp, Clock, DollarSign, Users, Award, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllItems, deleteItem, type Item } from '../services/itemService';
import { getCommissionStats, getAllCommissions, type CommissionStats, type CommissionRecord } from '../services/commissionService';
import { getUserProfile, uploadProfilePicture, updateProfilePictureUrl } from '../services/profileService';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [commissionStats, setCommissionStats] = useState<CommissionStats | null>(null);
  const [commissionRecords, setCommissionRecords] = useState<CommissionRecord[]>([]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [showProfilePictureUpload, setShowProfilePictureUpload] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Load user profile from Firebase
  const loadUserProfile = async () => {
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('celebrationshare_user_id');
      if (!userId) {
        setUser(getDemoUserData());
        return;
      }
      const userProfile = await getUserProfile(userId);
      
      if (userProfile) {
        setUser(userProfile);
      } else {
        // Fallback to demo data if no profile found
        setUser(getDemoUserData());
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Fallback to demo data
      setUser(getDemoUserData());
    }
  };

  // Demo user data fallback
  const getDemoUserData = () => ({
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
  });

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
    loadUserProfile();
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

  // Handle profile picture update
  const handleProfilePictureSelect = async (file: File | null) => {
    if (file) {
      try {
        // Upload to Firebase Storage
        const userId = localStorage.getItem('celebrationshare_user_id');
        if (!userId) return;
        const imageUrl = await uploadProfilePicture(file, userId);
        
        // Update profile in Firebase
        await updateProfilePictureUrl(userId, imageUrl);
        
        // Update local state
        setUser((prev: any) => ({
          ...prev,
          avatar: imageUrl,
          profilePictureUrl: imageUrl
        }));
        
        setProfilePicture(file);
      } catch (error) {
        console.error('Error updating profile picture:', error);
        // Show error message to user
      }
    }
    setShowProfilePictureUpload(false);
  };

  // Enhanced activity data with more details
  const recentActivity = [
    {
      type: 'rental',
      title: 'Round Table Set rented by Jennifer K.',
      date: '2 days ago',
      amount: '$75',
      status: 'completed',
      customer: 'Jennifer K.',
      item: 'Round Table Set'
    },
    {
      type: 'review',
      title: 'New 5-star review from Michael R.',
      date: '1 week ago',
      amount: '',
      status: 'completed',
      customer: 'Michael R.',
      item: 'Balloon Arch Kit'
    },
    {
      type: 'rental',
      title: 'Balloon Arch Kit rented by Lisa T.',
      date: '1 week ago',
      amount: '$105',
      status: 'completed',
      customer: 'Lisa T.',
      item: 'Balloon Arch Kit'
    },
    {
      type: 'new_item',
      title: 'Added new item: Wedding Arch',
      date: '2 weeks ago',
      amount: '',
      status: 'active',
      customer: '',
      item: 'Wedding Arch'
    }
  ];

  // Items rented by the user (as a customer)
  const itemsRented = [
    {
      id: 1,
      title: 'Professional Sound System',
      owner: 'Mike Johnson',
      date: '2024-01-10',
      amount: '$120',
      status: 'completed',
      rating: 5
    },
    {
      id: 2,
      title: 'LED Dance Floor',
      owner: 'Party Pro Rentals',
      date: '2024-01-05',
      amount: '$200',
      status: 'completed',
      rating: 4
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

  // Get current time for personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-primary to-mauve-700 rounded-xl shadow-soft p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{getGreeting()}, {user?.name.split(' ')[0]}! 👋</h1>
              <p className="text-mauve-100 text-lg">Welcome back to your CelebrationShare dashboard</p>
              <div className="flex items-center gap-4 mt-3 text-mauve-200">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Last active {user?.lastActive}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{user?.rating} rating</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${user?.totalEarnings}</div>
              <div className="text-mauve-200">Total earned</div>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setShowProfilePictureUpload(true)}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-mauve-700 transition-colors"
                title="Update profile picture"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-primary mb-2">{user?.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user?.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Member since {user?.joinDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {user?.rating} ({user?.totalRentals} rentals)
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors">
                    Edit Profile
                  </button>
                  <button className="border border-secondary text-primary px-4 py-2 rounded-lg hover:bg-background transition-colors">
                    Share Profile
                  </button>
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
                        <span className="font-semibold">{user?.stats.averageRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Response Rate</span>
                      <span className="font-semibold text-accent">{user?.stats.responseRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">On-Time Delivery</span>
                      <span className="font-semibold text-accent">{user?.stats.onTimeDelivery}%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-text">Total Rentals</span>
                      <span className="font-semibold">{user?.stats.timesRented}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Repeat Customers</span>
                      <span className="font-semibold">{user?.stats.repeatCustomers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Total Earnings</span>
                      <span className="font-semibold text-accent">${user?.totalEarnings}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity - Enhanced */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">Recent Activity</h3>
                  <button className="text-accent hover:text-primary transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'rental' ? 'bg-green-100 text-green-600' : 
                        activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.type === 'rental' ? (
                          <Package className="w-5 h-5" />
                        ) : activity.type === 'review' ? (
                          <Star className="w-5 h-5" />
                        ) : (
                          <TrendingUp className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-primary font-medium">{activity.title}</p>
                        <div className="flex items-center gap-2 text-sm text-text">
                          <span>{activity.date}</span>
                          {activity.customer && (
                            <>
                              <span>•</span>
                              <span>Customer: {activity.customer}</span>
                            </>
                          )}
                        </div>
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

              {/* Items Listed Section */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">Items Listed</h3>
                  <button 
                    onClick={() => navigate('/list-item')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
                  >
                    Add New Item
                  </button>
                </div>
                {userItems.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {userItems.slice(0, 4).map((item) => (
                      <div key={item.id} className="border border-secondary rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-primary">{item.title}</h4>
                            <p className="text-sm text-text">${item.price}/day</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-accent font-medium">Active</div>
                            <div className="text-xs text-text">{item.category}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No items listed yet</p>
                    <button 
                      onClick={() => navigate('/list-item')}
                      className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
                    >
                      List Your First Item
                    </button>
                  </div>
                )}
              </div>

              {/* Items Rented Section */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Items You've Rented</h3>
                {itemsRented.length > 0 ? (
                  <div className="space-y-4">
                    {itemsRented.map((item) => (
                      <div key={item.id} className="border border-secondary rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-primary">{item.title}</h4>
                            <p className="text-sm text-text">Owner: {item.owner}</p>
                            <p className="text-sm text-text">Rented: {item.date}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-accent font-semibold">{item.amount}</div>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No rentals yet</p>
                    <button 
                      onClick={() => navigate('/browse')}
                      className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
                    >
                      Browse Items
                    </button>
                  </div>
                )}
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

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-primary">Top Performer</p>
                      <p className="text-sm text-text">4.9+ rating for 3 months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-primary">Fast Responder</p>
                      <p className="text-sm text-text">Responds within 1 hour</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-primary">Earning Leader</p>
                      <p className="text-sm text-text">Top 10% in earnings</p>
                    </div>
                  </div>
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
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
              >
                Complete Verification
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-primary">Email Verification</h4>
                    <p className="text-sm text-text">Verified on March 15, 2022</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-primary">Phone Verification</h4>
                    <p className="text-sm text-text">Verified on March 16, 2022</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-primary">ID Verification</h4>
                    <p className="text-sm text-text">Verified on March 18, 2022</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-primary">Background Check</h4>
                    <p className="text-sm text-text">Completed on March 20, 2022</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-primary">Payment Method</h4>
                    <p className="text-sm text-text">Stripe Connect verified</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-primary">Social Verification</h4>
                    <p className="text-sm text-text">Linked to Facebook & LinkedIn</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Verification Level 3 - Highest Trust</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    You have completed all verification steps and are considered a highly trusted member of our community. 
                    This gives you access to premium features and higher earning potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-primary">My Items</h3>
                <p className="text-text">Manage your listed items and track their performance</p>
              </div>
              <button 
                onClick={() => navigate('/list-item')}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
              >
                Add New Item
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-text mt-2">Loading your items...</p>
              </div>
            ) : userItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userItems.map((item) => (
                  <div key={item.id} className="border border-secondary rounded-lg overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-primary mb-2">{item.title}</h4>
                      <p className="text-sm text-text mb-3">{item.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-lg font-bold text-accent">${item.price}</p>
                          <p className="text-sm text-text">per day</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text">{item.category}</p>
                          <p className="text-sm text-accent">Active</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditItem(item.id)}
                          className="flex-1 bg-primary text-white py-2 px-3 rounded-lg text-sm hover:bg-mauve-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleViewStats(item.id)}
                          className="flex-1 border border-secondary text-primary py-2 px-3 rounded-lg text-sm hover:bg-background transition-colors"
                        >
                          Stats
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="flex-1 border border-red-200 text-red-600 py-2 px-3 rounded-lg text-sm hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">No Items Listed</h3>
                <p className="text-text mb-6">Start earning by listing your party items for rent</p>
                <button 
                  onClick={() => navigate('/list-item')}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-mauve-700 transition-colors"
                >
                  List Your First Item
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            {/* Earnings Overview */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Earnings Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${user?.totalEarnings}</div>
                  <div className="text-sm text-text">Total Earnings</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{user?.stats.timesRented}</div>
                  <div className="text-sm text-text">Total Rentals</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">${(user?.totalEarnings / user?.stats.timesRented).toFixed(2)}</div>
                  <div className="text-sm text-text">Average per Rental</div>
                </div>
              </div>
            </div>

            {/* Commission Records */}
            {commissionStats && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Commission History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Item</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-right py-3 px-4">Amount</th>
                        <th className="text-right py-3 px-4">Commission</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {commissionRecords.map((record, index) => (
                        <tr key={index}>
                          <td className="py-3 px-4">{record.date.toLocaleDateString()}</td>
                          <td className="py-3 px-4">{record.itemTitle}</td>
                          <td className="py-3 px-4">{record.ownerName}</td>
                          <td className="py-3 px-4 text-right">${(record.rentalAmount / 100).toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-accent">${(record.commission / 100).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Activity History</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'rental' ? 'bg-green-100 text-green-600' : 
                    activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'rental' ? (
                      <Package className="w-5 h-5" />
                    ) : activity.type === 'review' ? (
                      <Star className="w-5 h-5" />
                    ) : (
                      <TrendingUp className="w-5 h-5" />
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
            <h3 className="text-lg font-semibold text-primary mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-secondary rounded-lg">
                <div>
                  <h4 className="font-medium text-primary">Profile Information</h4>
                  <p className="text-sm text-text">Update your personal information</p>
                </div>
                <button className="text-accent hover:text-primary transition-colors">Edit</button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-secondary rounded-lg">
                <div>
                  <h4 className="font-medium text-primary">Notification Preferences</h4>
                  <p className="text-sm text-text">Manage your notification settings</p>
                </div>
                <button className="text-accent hover:text-primary transition-colors">Edit</button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-secondary rounded-lg">
                <div>
                  <h4 className="font-medium text-primary">Payment Methods</h4>
                  <p className="text-sm text-text">Manage your payment information</p>
                </div>
                <button className="text-accent hover:text-primary transition-colors">Edit</button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-secondary rounded-lg">
                <div>
                  <h4 className="font-medium text-primary">Privacy Settings</h4>
                  <p className="text-sm text-text">Control your privacy and data</p>
                </div>
                <button className="text-accent hover:text-primary transition-colors">Edit</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-primary mb-4">Delete Item</h3>
              <p className="text-text mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 border border-secondary text-primary py-2 px-4 rounded-lg hover:bg-background transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteItem(showDeleteConfirm)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Picture Upload Modal */}
        {showProfilePictureUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary">Update Profile Picture</h3>
                <button
                  onClick={() => setShowProfilePictureUpload(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ProfilePictureUpload
                onImageSelect={handleProfilePictureSelect}
                currentImage={user?.avatar}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
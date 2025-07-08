import { commissionConfig, feeTransparencyConfig } from '../config/stripe';

// User fee structure interface
export interface UserFeeStructure {
  userId: string;
  feePercentage: number; // Current fee percentage for this user
  rentalCount: number; // Total completed rentals
  tier: 'newUser' | 'experiencedUser';
  lastUpdated: Date;
  specialRate?: number; // Admin-set special rate (optional)
  specialRateReason?: string;
}

// Fee calculation result
export interface FeeCalculation {
  rentalAmount: number; // Base rental amount in cents
  platformFee: number; // Platform fee in cents
  platformFeePercentage: number; // Fee percentage applied
  ownerPayout: number; // Amount owner receives in cents
  totalWithFees: number; // Total amount customer pays in cents
  savingsVsTraditional: number; // Savings compared to traditional rental
  savingsPercentage: number; // Percentage savings
  feeBreakdown: {
    insurance: string;
    support: string;
    security: string;
    platform: string;
  };
}

// Mock user fee database
const userFeeStructures: Map<string, UserFeeStructure> = new Map();

// Initialize with some sample users
const initializeFeeStructures = () => {
  // New user with 5 rentals
  userFeeStructures.set('user_new', {
    userId: 'user_new',
    feePercentage: 0.22,
    rentalCount: 5,
    tier: 'newUser',
    lastUpdated: new Date()
  });

  // Experienced user with 15 rentals
  userFeeStructures.set('user_experienced', {
    userId: 'user_experienced',
    feePercentage: 0.18,
    rentalCount: 15,
    tier: 'experiencedUser',
    lastUpdated: new Date()
  });

  // User at threshold (10 rentals)
  userFeeStructures.set('user_threshold', {
    userId: 'user_threshold',
    feePercentage: 0.18,
    rentalCount: 10,
    tier: 'experiencedUser',
    lastUpdated: new Date()
  });
};

// Initialize the database
initializeFeeStructures();

/**
 * Get or create user fee structure
 */
export const getUserFeeStructure = async (userId: string): Promise<UserFeeStructure> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let userFee = userFeeStructures.get(userId);
  
  if (!userFee) {
    // Create new user with default fee structure
    userFee = {
      userId,
      feePercentage: commissionConfig.tiers.newUser,
      rentalCount: 0,
      tier: 'newUser',
      lastUpdated: new Date()
    };
    userFeeStructures.set(userId, userFee);
  }
  
  return userFee;
};

/**
 * Update user rental count and recalculate fee tier
 */
export const updateUserRentalCount = async (userId: string, newRentalCount: number): Promise<UserFeeStructure> => {
  const userFee = await getUserFeeStructure(userId);
  
  userFee.rentalCount = newRentalCount;
  userFee.lastUpdated = new Date();
  
  // Check if user qualifies for lower tier
  if (newRentalCount >= commissionConfig.tiers.threshold && userFee.tier === 'newUser') {
    userFee.tier = 'experiencedUser';
    userFee.feePercentage = userFee.specialRate || commissionConfig.tiers.experiencedUser;
  }
  
  userFeeStructures.set(userId, userFee);
  return userFee;
};

/**
 * Calculate fees for a rental transaction
 */
export const calculateFees = async (
  userId: string, 
  rentalAmount: number, // in cents
  securityDeposit: number = 0 // in cents
): Promise<FeeCalculation> => {
  const userFee = await getUserFeeStructure(userId);
  const feePercentage = userFee.specialRate || userFee.feePercentage;
  
  // Calculate platform fee
  const platformFee = Math.round(rentalAmount * feePercentage);
  const adjustedPlatformFee = Math.max(
    commissionConfig.minCommission, 
    Math.min(platformFee, commissionConfig.maxCommission)
  );
  
  // Calculate owner payout
  const ownerPayout = rentalAmount - adjustedPlatformFee;
  
  // Calculate total with fees
  const totalWithFees = rentalAmount + securityDeposit;
  
  // Calculate savings vs traditional rental companies
  const traditionalPrice = Math.round(rentalAmount * (1 + feeTransparencyConfig.traditionalRentalMarkup));
  const savingsVsTraditional = traditionalPrice - totalWithFees;
  const savingsPercentage = Math.round((savingsVsTraditional / traditionalPrice) * 100);
  
  return {
    rentalAmount,
    platformFee: adjustedPlatformFee,
    platformFeePercentage: feePercentage,
    ownerPayout,
    totalWithFees,
    savingsVsTraditional,
    savingsPercentage,
    feeBreakdown: feeTransparencyConfig.feeBreakdown
  };
};

/**
 * Set special fee rate for a user (admin function)
 */
export const setSpecialFeeRate = async (
  userId: string, 
  specialRate: number, 
  reason: string
): Promise<UserFeeStructure> => {
  const userFee = await getUserFeeStructure(userId);
  
  userFee.specialRate = specialRate;
  userFee.specialRateReason = reason;
  userFee.lastUpdated = new Date();
  
  userFeeStructures.set(userId, userFee);
  return userFee;
};

/**
 * Remove special fee rate for a user (admin function)
 */
export const removeSpecialFeeRate = async (userId: string): Promise<UserFeeStructure> => {
  const userFee = await getUserFeeStructure(userId);
  
  delete userFee.specialRate;
  delete userFee.specialRateReason;
  userFee.feePercentage = userFee.tier === 'newUser' 
    ? commissionConfig.tiers.newUser 
    : commissionConfig.tiers.experiencedUser;
  userFee.lastUpdated = new Date();
  
  userFeeStructures.set(userId, userFee);
  return userFee;
};

/**
 * Get all user fee structures (admin function)
 */
export const getAllUserFeeStructures = async (): Promise<UserFeeStructure[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return Array.from(userFeeStructures.values());
};

/**
 * Get fee analytics (admin function)
 */
export const getFeeAnalytics = async () => {
  const allUsers = await getAllUserFeeStructures();
  
  // Get commission analytics for affiliate data
  const commissionStats = await import('./commissionService').then(module => 
    module.getCommissionStats()
  );
  
  const analytics = {
    totalUsers: allUsers.length,
    newUsers: allUsers.filter(u => u.tier === 'newUser').length,
    experiencedUsers: allUsers.filter(u => u.tier === 'experiencedUser').length,
    averageFeePercentage: allUsers.reduce((sum, user) => sum + user.feePercentage, 0) / allUsers.length,
    totalRentals: allUsers.reduce((sum, user) => sum + user.rentalCount, 0),
    usersWithSpecialRates: allUsers.filter(u => u.specialRate !== undefined).length,
    
    // Platform revenue data
    totalRevenue: commissionStats.totalRevenue,
    monthlyRevenue: commissionStats.monthlyCommissions,
    
    // Affiliate data
    totalAffiliateCommissions: commissionStats.totalAffiliateCommissions,
    affiliateCommissionsByTier: commissionStats.affiliateCommissionsByTier,
    activeAffiliates: 3, // Mock data - in real app, count unique affiliates
    totalReferrals: 15, // Mock data - in real app, count total referrals
    averageAffiliateCommission: commissionStats.totalAffiliateCommissions / 15, // Mock calculation
    affiliateConversionRate: 12.5 // Mock data - in real app, calculate conversion rate
  };
  
  return analytics;
};

/**
 * Format fee percentage for display
 */
export const formatFeePercentage = (percentage: number): string => {
  return `${Math.round(percentage * 100)}%`;
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
}; 
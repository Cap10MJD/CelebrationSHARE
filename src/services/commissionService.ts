// Commission tracking service for platform earnings
// In production, this would integrate with your backend database

export interface CommissionRecord {
  id: string;
  paymentId: string;
  itemId: string;
  itemTitle: string;
  rentalAmount: number;
  commission: number;
  ownerPayout: number;
  date: Date;
  status: 'pending' | 'completed' | 'refunded';
  ownerName: string;
  feePercentage: number; // New field for tracking fee percentage
  userTier: 'newUser' | 'experiencedUser'; // New field for tracking user tier
  affiliateId?: string; // New field for affiliate tracking
  affiliateCommission?: number; // New field for affiliate commission amount
  affiliateTier?: 'starter' | 'pro' | 'elite'; // New field for affiliate tier
}

// Affiliate commission interface
export interface AffiliateCommission {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateTier: 'starter' | 'pro' | 'elite';
  commissionRate: number; // 2%, 3%, or 4%
  rentalAmount: number;
  commissionAmount: number;
  date: Date;
  status: 'pending' | 'paid' | 'cancelled';
  referralCode: string;
  itemTitle: string;
}

// Commission statistics
export interface CommissionStats {
  totalRevenue: number;
  monthlyCommissions: number;
  totalCommissions: number;
  averageCommission: number;
  newUserCommissions: number;
  experiencedUserCommissions: number;
  averageFeePercentage: number;
  totalAffiliateCommissions: number;
  affiliateCommissionsByTier: {
    starter: number;
    pro: number;
    elite: number;
  };
}

// Affiliate tier configuration
export const AFFILIATE_TIERS = {
  starter: {
    name: 'Community Starter',
    commissionRate: 0.02, // 2%
    requirements: '5 successful referrals'
  },
  pro: {
    name: 'Neighborhood Pro',
    commissionRate: 0.03, // 3%
    requirements: '25 successful referrals'
  },
  elite: {
    name: 'Community Elite',
    commissionRate: 0.04, // 4%
    requirements: '50+ successful referrals'
  }
};

// Mock affiliate commission database
const affiliateCommissions: AffiliateCommission[] = [
  {
    id: 'aff_1',
    affiliateId: 'aff_001',
    affiliateName: 'Sarah M.',
    affiliateTier: 'elite',
    commissionRate: 0.04,
    rentalAmount: 7500, // $75.00
    commissionAmount: 300, // $3.00 (4% of $75)
    date: new Date('2024-01-15'),
    status: 'paid',
    referralCode: 'SARAH2024',
    itemTitle: 'Elegant Wedding Chairs'
  },
  {
    id: 'aff_2',
    affiliateId: 'aff_002',
    affiliateName: 'Mike R.',
    affiliateTier: 'pro',
    commissionRate: 0.03,
    rentalAmount: 12000, // $120.00
    commissionAmount: 360, // $3.60 (3% of $120)
    date: new Date('2024-01-20'),
    status: 'paid',
    referralCode: 'MIKE2024',
    itemTitle: 'Professional Sound System'
  },
  {
    id: 'aff_3',
    affiliateId: 'aff_003',
    affiliateName: 'Lisa K.',
    affiliateTier: 'starter',
    commissionRate: 0.02,
    rentalAmount: 9000, // $90.00
    commissionAmount: 180, // $1.80 (2% of $90)
    date: new Date('2024-01-25'),
    status: 'pending',
    referralCode: 'LISA2024',
    itemTitle: 'Party Tents & Decorations'
  }
];

// Mock commission database
const commissionRecords: CommissionRecord[] = [
  {
    id: '1',
    paymentId: 'pi_1234567890',
    itemId: 'item_1',
    itemTitle: 'Elegant Wedding Chairs',
    rentalAmount: 7500, // $75.00 in cents
    commission: 1650, // $16.50 (22% of $75)
    ownerPayout: 5850, // $58.50
    date: new Date('2024-01-15'),
    status: 'completed',
    ownerName: 'Sarah M.',
    feePercentage: 0.22,
    userTier: 'newUser',
    affiliateId: 'aff_001',
    affiliateCommission: 300, // $3.00 affiliate commission
    affiliateTier: 'elite'
  },
  {
    id: '2',
    paymentId: 'pi_1234567891',
    itemId: 'item_2',
    itemTitle: 'Professional Sound System',
    rentalAmount: 12000, // $120.00 in cents
    commission: 2160, // $21.60 (18% of $120)
    ownerPayout: 9840, // $98.40
    date: new Date('2024-01-20'),
    status: 'completed',
    ownerName: 'Michael K.',
    feePercentage: 0.18,
    userTier: 'experiencedUser',
    affiliateId: 'aff_002',
    affiliateCommission: 360, // $3.60 affiliate commission
    affiliateTier: 'pro'
  },
  {
    id: '3',
    paymentId: 'pi_1234567892',
    itemId: 'item_3',
    itemTitle: 'Party Tents & Decorations',
    rentalAmount: 9000, // $90.00 in cents
    commission: 1980, // $19.80 (22% of $90)
    ownerPayout: 7020, // $70.20
    date: new Date('2024-01-25'),
    status: 'completed',
    ownerName: 'Jennifer L.',
    feePercentage: 0.22,
    userTier: 'newUser',
    affiliateId: 'aff_003',
    affiliateCommission: 180, // $1.80 affiliate commission
    affiliateTier: 'starter'
  },
  {
    id: '4',
    paymentId: 'pi_1234567893',
    itemId: 'item_4',
    itemTitle: 'Professional Photography Equipment',
    rentalAmount: 15000, // $150.00 in cents
    commission: 2700, // $27.00 (18% of $150)
    ownerPayout: 12300, // $123.00
    date: new Date('2024-01-30'),
    status: 'completed',
    ownerName: 'David R.',
    feePercentage: 0.18,
    userTier: 'experiencedUser'
  },
  {
    id: '5',
    paymentId: 'pi_1234567894',
    itemId: 'item_5',
    itemTitle: 'Catering Equipment Set',
    rentalAmount: 6000, // $60.00 in cents
    commission: 1320, // $13.20 (22% of $60)
    ownerPayout: 4680, // $46.80
    date: new Date('2024-02-01'),
    status: 'completed',
    ownerName: 'Lisa T.',
    feePercentage: 0.22,
    userTier: 'newUser'
  }
];

// Get all commission records
export const getAllCommissions = async (): Promise<CommissionRecord[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return commissionRecords.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Get all affiliate commissions
export const getAllAffiliateCommissions = async (): Promise<AffiliateCommission[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return affiliateCommissions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Get commission statistics
export const getCommissionStats = async (): Promise<CommissionStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const totalRevenue = commissionRecords.reduce((sum, record) => sum + record.rentalAmount, 0);
  const totalCommissions = commissionRecords.reduce((sum, record) => sum + record.commission, 0);
  const averageCommission = totalCommissions / commissionRecords.length;
  
  // Calculate monthly commissions (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const monthlyCommissions = commissionRecords
    .filter(record => record.date >= thirtyDaysAgo)
    .reduce((sum, record) => sum + record.commission, 0);
  
  // Calculate tier-based statistics
  const newUserCommissions = commissionRecords
    .filter(record => record.userTier === 'newUser')
    .reduce((sum, record) => sum + record.commission, 0);
  
  const experiencedUserCommissions = commissionRecords
    .filter(record => record.userTier === 'experiencedUser')
    .reduce((sum, record) => sum + record.commission, 0);
  
  const averageFeePercentage = commissionRecords.reduce((sum, record) => sum + record.feePercentage, 0) / commissionRecords.length;
  
  // Calculate affiliate commission statistics
  const totalAffiliateCommissions = affiliateCommissions.reduce((sum, record) => sum + record.commissionAmount, 0);
  
  const affiliateCommissionsByTier = {
    starter: affiliateCommissions
      .filter(record => record.affiliateTier === 'starter')
      .reduce((sum, record) => sum + record.commissionAmount, 0),
    pro: affiliateCommissions
      .filter(record => record.affiliateTier === 'pro')
      .reduce((sum, record) => sum + record.commissionAmount, 0),
    elite: affiliateCommissions
      .filter(record => record.affiliateTier === 'elite')
      .reduce((sum, record) => sum + record.commissionAmount, 0)
  };
  
  return {
    totalRevenue,
    monthlyCommissions,
    totalCommissions,
    averageCommission,
    newUserCommissions,
    experiencedUserCommissions,
    averageFeePercentage,
    totalAffiliateCommissions,
    affiliateCommissionsByTier
  };
};

// Calculate affiliate commission based on tier and rental amount
export const calculateAffiliateCommission = (
  rentalAmount: number, 
  affiliateTier: 'starter' | 'pro' | 'elite'
): number => {
  const rate = AFFILIATE_TIERS[affiliateTier].commissionRate;
  return Math.round(rentalAmount * rate);
};

// Add new commission record with affiliate tracking
export const addCommissionRecord = async (
  record: Omit<CommissionRecord, 'id' | 'date'>,
  affiliateInfo?: {
    affiliateId: string;
    affiliateName: string;
    affiliateTier: 'starter' | 'pro' | 'elite';
    referralCode: string;
  }
): Promise<CommissionRecord> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newRecord: CommissionRecord = {
    ...record,
    id: `commission_${Date.now()}`,
    date: new Date()
  };
  
  commissionRecords.push(newRecord);
  
  // If affiliate info is provided, create affiliate commission record
  if (affiliateInfo) {
    const affiliateCommission: AffiliateCommission = {
      id: `aff_${Date.now()}`,
      affiliateId: affiliateInfo.affiliateId,
      affiliateName: affiliateInfo.affiliateName,
      affiliateTier: affiliateInfo.affiliateTier,
      commissionRate: AFFILIATE_TIERS[affiliateInfo.affiliateTier].commissionRate,
      rentalAmount: record.rentalAmount,
      commissionAmount: calculateAffiliateCommission(record.rentalAmount, affiliateInfo.affiliateTier),
      date: new Date(),
      status: 'pending',
      referralCode: affiliateInfo.referralCode,
      itemTitle: record.itemTitle
    };
    
    affiliateCommissions.push(affiliateCommission);
    
    // Update the commission record with affiliate info
    newRecord.affiliateId = affiliateInfo.affiliateId;
    newRecord.affiliateCommission = affiliateCommission.commissionAmount;
    newRecord.affiliateTier = affiliateInfo.affiliateTier;
  }
  
  return newRecord;
};

// Get affiliate commissions by affiliate ID
export const getAffiliateCommissions = async (affiliateId: string): Promise<AffiliateCommission[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return affiliateCommissions
    .filter(record => record.affiliateId === affiliateId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Get affiliate statistics
export const getAffiliateStats = async (affiliateId: string) => {
  const commissions = await getAffiliateCommissions(affiliateId);
  
  const totalEarnings = commissions.reduce((sum, record) => sum + record.commissionAmount, 0);
  const pendingEarnings = commissions
    .filter(record => record.status === 'pending')
    .reduce((sum, record) => sum + record.commissionAmount, 0);
  const paidEarnings = commissions
    .filter(record => record.status === 'paid')
    .reduce((sum, record) => sum + record.commissionAmount, 0);
  
  // Calculate monthly earnings
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const monthlyEarnings = commissions
    .filter(record => record.date >= thirtyDaysAgo)
    .reduce((sum, record) => sum + record.commissionAmount, 0);
  
  return {
    totalEarnings,
    pendingEarnings,
    paidEarnings,
    monthlyEarnings,
    totalReferrals: commissions.length,
    averageCommission: commissions.length > 0 ? totalEarnings / commissions.length : 0
  };
};

// Get commission records by user
export const getCommissionsByUser = async (userId: string): Promise<CommissionRecord[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return commissionRecords
    .filter(record => record.ownerName === userId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Get commission records by date range
export const getCommissionsByDateRange = async (startDate: Date, endDate: Date): Promise<CommissionRecord[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return commissionRecords
    .filter(record => record.date >= startDate && record.date <= endDate)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Get commission analytics by tier
export const getCommissionAnalyticsByTier = async () => {
  const stats = await getCommissionStats();
  
  return {
    newUser: {
      totalCommissions: stats.newUserCommissions,
      averageFeePercentage: 0.22,
      recordCount: commissionRecords.filter(r => r.userTier === 'newUser').length
    },
    experiencedUser: {
      totalCommissions: stats.experiencedUserCommissions,
      averageFeePercentage: 0.18,
      recordCount: commissionRecords.filter(r => r.userTier === 'experiencedUser').length
    },
    affiliate: {
      totalCommissions: stats.totalAffiliateCommissions,
      byTier: stats.affiliateCommissionsByTier,
      recordCount: affiliateCommissions.length
    }
  };
};

// Calculate platform commission (this is the platform fee, not affiliate commission)
export const calculateCommission = (rentalAmount: number): number => {
  // This calculates the platform fee, not affiliate commission
  // Platform fee is 22% for new users, 18% for experienced users
  // This function is used for platform revenue calculation
  return Math.round(rentalAmount * 0.20); // Average of 22% and 18%
};

// Calculate owner payout after platform fee
export const calculateOwnerPayout = (rentalAmount: number, commission: number): number => {
  return rentalAmount - commission;
}; 
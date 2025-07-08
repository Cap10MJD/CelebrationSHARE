// Comprehensive verification service for family safety
// This implements a three-step verification process for both owners and renters

export interface VerificationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'required';
  required: boolean;
  estimatedTime: string;
  cost?: number;
}

export interface VerificationDocument {
  id: string;
  type: 'id_verification' | 'background_check' | 'social_verification' | 'address_verification';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submittedAt: Date;
  approvedAt?: Date;
  expiresAt?: Date;
  documentUrl?: string;
  notes?: string;
}

export interface UserVerification {
  userId: string;
  verificationLevel: 1 | 2 | 3; // 1=Basic, 2=Enhanced, 3=Premium
  steps: VerificationStep[];
  documents: VerificationDocument[];
  overallStatus: 'unverified' | 'basic' | 'enhanced' | 'premium' | 'suspended';
  safetyScore: number; // 0-100
  lastUpdated: Date;
  badges: string[];
  trustIndicators: {
    idVerified: boolean;
    backgroundChecked: boolean;
    socialLinked: boolean;
    addressVerified: boolean;
    phoneVerified: boolean;
    emailVerified: boolean;
    momApproved: boolean;
  };
}

// Verification steps for the three-step process
export const VERIFICATION_STEPS: VerificationStep[] = [
  {
    id: 'step1_id_verification',
    name: 'ID Verification',
    description: 'Government-issued photo ID verification (Driver\'s License, Passport, State ID)',
    status: 'required',
    required: true,
    estimatedTime: '5-10 minutes',
    cost: 0
  },
  {
    id: 'step2_background_check',
    name: 'Background Check',
    description: 'Comprehensive criminal background check and identity verification',
    status: 'required',
    required: true,
    estimatedTime: '24-48 hours',
    cost: 15
  },
  {
    id: 'step3_social_verification',
    name: 'Social Verification',
    description: 'Social media profile linking and community verification',
    status: 'required',
    required: true,
    estimatedTime: '10-15 minutes',
    cost: 0
  }
];

// Mock verification database
const userVerifications: Map<string, UserVerification> = new Map();

// Initialize with some verified users
const initializeVerifications = () => {
  // Michael K. - Premium verification
  userVerifications.set('user_michael_k', {
    userId: 'user_michael_k',
    verificationLevel: 3,
    steps: VERIFICATION_STEPS.map(step => ({ ...step, status: 'completed' as const })),
    documents: [
      {
        id: 'doc_1',
        type: 'id_verification',
        status: 'approved',
        submittedAt: new Date('2024-01-15'),
        approvedAt: new Date('2024-01-15'),
        expiresAt: new Date('2025-01-15')
      },
      {
        id: 'doc_2',
        type: 'background_check',
        status: 'approved',
        submittedAt: new Date('2024-01-16'),
        approvedAt: new Date('2024-01-18'),
        expiresAt: new Date('2025-01-18')
      },
      {
        id: 'doc_3',
        type: 'social_verification',
        status: 'approved',
        submittedAt: new Date('2024-01-15'),
        approvedAt: new Date('2024-01-15'),
        expiresAt: new Date('2025-01-15')
      }
    ],
    overallStatus: 'premium',
    safetyScore: 95,
    lastUpdated: new Date('2024-01-18'),
    badges: ['ID Verified', 'Background Check', 'Social Linked', 'Mom-Approved', 'Top Rated'],
    trustIndicators: {
      idVerified: true,
      backgroundChecked: true,
      socialLinked: true,
      addressVerified: true,
      phoneVerified: true,
      emailVerified: true,
      momApproved: true
    }
  });

  // Sarah M. - Enhanced verification
  userVerifications.set('user_sarah_m', {
    userId: 'user_sarah_m',
    verificationLevel: 2,
    steps: VERIFICATION_STEPS.map((step, index) => ({ 
      ...step, 
      status: index < 2 ? 'completed' as const : 'pending' as const 
    })),
    documents: [
      {
        id: 'doc_4',
        type: 'id_verification',
        status: 'approved',
        submittedAt: new Date('2024-02-01'),
        approvedAt: new Date('2024-02-01'),
        expiresAt: new Date('2025-02-01')
      },
      {
        id: 'doc_5',
        type: 'background_check',
        status: 'approved',
        submittedAt: new Date('2024-02-02'),
        approvedAt: new Date('2024-02-04'),
        expiresAt: new Date('2025-02-04')
      }
    ],
    overallStatus: 'enhanced',
    safetyScore: 85,
    lastUpdated: new Date('2024-02-04'),
    badges: ['ID Verified', 'Background Check', 'Mom-Approved'],
    trustIndicators: {
      idVerified: true,
      backgroundChecked: true,
      socialLinked: false,
      addressVerified: true,
      phoneVerified: true,
      emailVerified: true,
      momApproved: true
    }
  });
};

// Initialize the verification data
initializeVerifications();

// Get user verification status
export const getUserVerification = async (userId: string): Promise<UserVerification | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return userVerifications.get(userId) || null;
};

// Start verification process
export const startVerification = async (userId: string): Promise<UserVerification> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newVerification: UserVerification = {
    userId,
    verificationLevel: 1,
    steps: VERIFICATION_STEPS.map(step => ({ ...step, status: 'pending' as const })),
    documents: [],
    overallStatus: 'unverified',
    safetyScore: 0,
    lastUpdated: new Date(),
    badges: [],
    trustIndicators: {
      idVerified: false,
      backgroundChecked: false,
      socialLinked: false,
      addressVerified: false,
      phoneVerified: false,
      emailVerified: false,
      momApproved: false
    }
  };
  
  userVerifications.set(userId, newVerification);
  return newVerification;
};

// Submit verification document
export const submitVerificationDocument = async (
  userId: string, 
  documentType: VerificationDocument['type'], 
  documentUrl: string
): Promise<VerificationDocument> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const verification = userVerifications.get(userId);
  if (!verification) {
    throw new Error('User verification not found');
  }
  
  const newDocument: VerificationDocument = {
    id: `doc_${Date.now()}`,
    type: documentType,
    status: 'pending',
    submittedAt: new Date(),
    documentUrl
  };
  
  verification.documents.push(newDocument);
  verification.lastUpdated = new Date();
  
  // Update step status
  const stepIndex = VERIFICATION_STEPS.findIndex(step => {
    switch (documentType) {
      case 'id_verification': return step.id === 'step1_id_verification';
      case 'background_check': return step.id === 'step2_background_check';
      case 'social_verification': return step.id === 'step3_social_verification';
      default: return false;
    }
  });
  
  if (stepIndex !== -1) {
    verification.steps[stepIndex].status = 'in_progress';
  }
  
  userVerifications.set(userId, verification);
  return newDocument;
};

// Process verification document (simulate background check processing)
export const processVerificationDocument = async (
  userId: string, 
  documentId: string, 
  approved: boolean, 
  notes?: string
): Promise<VerificationDocument> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const verification = userVerifications.get(userId);
  if (!verification) {
    throw new Error('User verification not found');
  }
  
  const document = verification.documents.find(doc => doc.id === documentId);
  if (!document) {
    throw new Error('Document not found');
  }
  
  document.status = approved ? 'approved' : 'rejected';
  document.approvedAt = approved ? new Date() : undefined;
  document.notes = notes;
  
  if (approved) {
    document.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
    
    // Update trust indicators
    switch (document.type) {
      case 'id_verification':
        verification.trustIndicators.idVerified = true;
        break;
      case 'background_check':
        verification.trustIndicators.backgroundChecked = true;
        break;
      case 'social_verification':
        verification.trustIndicators.socialLinked = true;
        break;
    }
    
    // Update step status
    const stepIndex = verification.steps.findIndex(step => {
      switch (document.type) {
        case 'id_verification': return step.id === 'step1_id_verification';
        case 'background_check': return step.id === 'step2_background_check';
        case 'social_verification': return step.id === 'step3_social_verification';
        default: return false;
      }
    });
    
    if (stepIndex !== -1) {
      verification.steps[stepIndex].status = 'completed';
    }
    
    // Update overall status and badges
    updateVerificationStatus(verification);
  }
  
  verification.lastUpdated = new Date();
  userVerifications.set(userId, verification);
  
  return document;
};

// Update verification status based on completed steps
const updateVerificationStatus = (verification: UserVerification) => {
  const completedSteps = verification.steps.filter(step => step.status === 'completed').length;
  
  if (completedSteps === 3) {
    verification.overallStatus = 'premium';
    verification.verificationLevel = 3;
    verification.safetyScore = 95;
    verification.badges = ['ID Verified', 'Background Check', 'Social Linked', 'Mom-Approved', 'Premium Verified'];
  } else if (completedSteps === 2) {
    verification.overallStatus = 'enhanced';
    verification.verificationLevel = 2;
    verification.safetyScore = 85;
    verification.badges = ['ID Verified', 'Background Check', 'Enhanced Verified'];
  } else if (completedSteps === 1) {
    verification.overallStatus = 'basic';
    verification.verificationLevel = 1;
    verification.safetyScore = 60;
    verification.badges = ['ID Verified', 'Basic Verified'];
  }
  
  // Add Mom-Approved badge if all safety checks pass
  if (verification.trustIndicators.idVerified && 
      verification.trustIndicators.backgroundChecked && 
      verification.trustIndicators.phoneVerified) {
    verification.trustIndicators.momApproved = true;
    if (!verification.badges.includes('Mom-Approved')) {
      verification.badges.push('Mom-Approved');
    }
  }
};

// Get verification requirements for display
export const getVerificationRequirements = (): VerificationStep[] => {
  return VERIFICATION_STEPS;
};

// Check if user can rent (minimum verification level)
export const canUserRent = (verification: UserVerification): boolean => {
  return verification.overallStatus !== 'unverified' && verification.safetyScore >= 60;
};

// Check if user can list items (enhanced verification required)
export const canUserListItems = (verification: UserVerification): boolean => {
  return verification.overallStatus === 'enhanced' || verification.overallStatus === 'premium';
};

// Get safety recommendations for users
export const getSafetyRecommendations = (verification: UserVerification): string[] => {
  const recommendations: string[] = [];
  
  if (!verification.trustIndicators.idVerified) {
    recommendations.push('Complete ID verification for basic access');
  }
  
  if (!verification.trustIndicators.backgroundChecked) {
    recommendations.push('Complete background check to list items');
  }
  
  if (!verification.trustIndicators.socialLinked) {
    recommendations.push('Link social media for enhanced trust');
  }
  
  if (!verification.trustIndicators.phoneVerified) {
    recommendations.push('Verify your phone number for better communication');
  }
  
  return recommendations;
}; 
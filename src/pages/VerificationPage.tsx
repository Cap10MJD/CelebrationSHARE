import React, { useState, useEffect } from 'react';
import { 
  getUserVerification, 
  startVerification, 
  submitVerificationDocument,
  getVerificationRequirements,
  canUserRent,
  canUserListItems,
  getSafetyRecommendations,
  type UserVerification,
  type VerificationStep
} from '../services/verificationService';

const VerificationPage: React.FC = () => {
  const [verification, setVerification] = useState<UserVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [requirements] = useState<VerificationStep[]>(getVerificationRequirements());

  // Mock user ID - in real app this would come from auth
  const userId = 'current_user';

  useEffect(() => {
    loadVerification();
  }, []);

  const loadVerification = async () => {
    try {
      let userVerification = await getUserVerification(userId);
      
      if (!userVerification) {
        userVerification = await startVerification(userId);
      }
      
      setVerification(userVerification);
      
      // Set current step to first incomplete step
      const firstIncompleteIndex = userVerification.steps.findIndex(step => step.status !== 'completed');
      setCurrentStep(firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0);
    } catch (error) {
      // Removed console.error('Error loading verification:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, stepId: string) => {
    const file = event.target.files?.[0];
    if (!file || !verification) return;

    setUploading(true);
    try {
      // In a real app, you'd upload to a secure service like AWS S3
      const documentUrl = URL.createObjectURL(file);
      
      let documentType: 'id_verification' | 'background_check' | 'social_verification';
      switch (stepId) {
        case 'step1_id_verification':
          documentType = 'id_verification';
          break;
        case 'step2_background_check':
          documentType = 'background_check';
          break;
        case 'step3_social_verification':
          documentType = 'social_verification';
          break;
        default:
          throw new Error('Invalid step');
      }

      await submitVerificationDocument(userId, documentType, documentUrl);
      await loadVerification(); // Reload to get updated status
    } catch (error) {
      // Removed console.error('Error uploading document:', error);
      alert('Error uploading document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in_progress':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '⭕';
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading verification status...</p>
        </div>
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading verification</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Safety Verification</h1>
              <p className="text-gray-600 mt-1">Complete verification to ensure a safe community for families</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Safety Score</div>
              <div className="text-2xl font-bold text-blue-600">{verification.safetyScore}/100</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Verification Status</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              verification.overallStatus === 'premium' ? 'bg-purple-100 text-purple-800' :
              verification.overallStatus === 'enhanced' ? 'bg-blue-100 text-blue-800' :
              verification.overallStatus === 'basic' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {verification.overallStatus.charAt(0).toUpperCase() + verification.overallStatus.slice(1)} Verified
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{verification.steps.filter(s => s.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Steps Completed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{verification.badges.length}</div>
              <div className="text-sm text-gray-600">Trust Badges</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{verification.verificationLevel}</div>
              <div className="text-sm text-gray-600">Verification Level</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(verification.trustIndicators).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <span className={value ? 'text-green-500' : 'text-gray-400'}>
                  {value ? '✅' : '⭕'}
                </span>
                <span className="text-sm text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Steps */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Three-Step Verification Process</h3>
          
          <div className="space-y-6">
            {verification.steps.map((step, index) => (
              <div key={step.id} className={`border rounded-lg p-6 ${getStepColor(step.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-current flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold">{step.name}</h4>
                        <span className="text-2xl">{getStepIcon(step.status)}</span>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span>⏱️ {step.estimatedTime}</span>
                        {step.cost !== undefined && (
                          <span>💰 ${step.cost}</span>
                        )}
                        {step.required && (
                          <span className="text-red-600 font-medium">Required</span>
                        )}
                      </div>

                      {/* File Upload */}
                      {step.status === 'pending' && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload {step.name === 'ID Verification' ? 'Government ID' : 
                                   step.name === 'Background Check' ? 'Background Check Form' : 
                                   'Social Media Profile'}
                          </label>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, step.id)}
                            disabled={uploading}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          {uploading && (
                            <p className="mt-2 text-sm text-blue-600">Uploading...</p>
                          )}
                        </div>
                      )}

                      {/* Status Messages */}
                      {step.status === 'in_progress' && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            📋 Document submitted and under review. This may take 24-48 hours for background checks.
                          </p>
                        </div>
                      )}

                      {step.status === 'completed' && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-700">
                            ✅ Verification completed successfully!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        {verification.badges.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Trust Badges</h3>
            <div className="flex flex-wrap gap-2">
              {verification.badges.map((badge, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Permissions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Permissions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Rent Items</div>
                <div className="text-sm text-gray-600">Borrow items from other community members</div>
              </div>
              <span className={canUserRent(verification) ? 'text-green-600' : 'text-red-600'}>
                {canUserRent(verification) ? '✅ Allowed' : '❌ Not Allowed'}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">List Items</div>
                <div className="text-sm text-gray-600">Share your items with the community</div>
              </div>
              <span className={canUserListItems(verification) ? 'text-green-600' : 'text-red-600'}>
                {canUserListItems(verification) ? '✅ Allowed' : '❌ Not Allowed'}
              </span>
            </div>
          </div>
        </div>

        {/* Safety Recommendations */}
        {getSafetyRecommendations(verification).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Recommendations</h3>
            <div className="space-y-2">
              {getSafetyRecommendations(verification).map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-0.5">💡</span>
                  <span className="text-gray-700">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="text-blue-600 text-xl">🛡️</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Family Safety First</h4>
              <p className="text-blue-800 mb-3">
                Our three-step verification process ensures that every member of our community has been thoroughly vetted. 
                This includes government ID verification, comprehensive background checks, and social verification to create 
                the safest possible environment for families.
              </p>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• All users must complete ID verification to rent items</li>
                <li>• Background checks are required to list items</li>
                <li>• Social verification adds an extra layer of trust</li>
                <li>• Mom-Approved badge for users who pass all safety checks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage; 
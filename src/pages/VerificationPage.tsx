import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Shield, Mail, Phone, Camera, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface VerificationState {
  message: string;
  userType: 'renter' | 'owner' | 'both';
}

const VerificationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationSteps, setVerificationSteps] = useState([
    { id: 1, title: 'Email Verification', status: 'pending', icon: Mail },
    { id: 2, title: 'Phone Verification', status: 'pending', icon: Phone },
    { id: 3, title: 'ID Verification', status: 'pending', icon: Shield },
    { id: 4, title: 'Background Check', status: 'pending', icon: Shield },
  ]);

  const state = location.state as VerificationState;

  useEffect(() => {
    // Simulate email verification completion
    setTimeout(() => {
      setVerificationSteps(prev => 
        prev.map(step => 
          step.id === 1 ? { ...step, status: 'completed' } : step
        )
      );
      setCurrentStep(2);
    }, 2000);

    // Simulate phone verification completion
    setTimeout(() => {
      setVerificationSteps(prev => 
        prev.map(step => 
          step.id === 2 ? { ...step, status: 'completed' } : step
        )
      );
      setCurrentStep(3);
    }, 4000);
  }, []);

  const getStepIcon = (step: any) => {
    const Icon = step.icon;
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        step.status === 'completed' 
          ? 'bg-green-100 text-green-600' 
          : step.status === 'current'
          ? 'bg-blue-100 text-blue-600'
          : 'bg-gray-100 text-gray-400'
      }`}>
        {step.status === 'completed' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Icon className="w-5 h-5" />
        )}
      </div>
    );
  };

  const getStepStatus = (step: any) => {
    if (step.status === 'completed') {
      return <span className="text-green-600 text-sm">✓ Completed</span>;
    } else if (step.status === 'current') {
      return <span className="text-blue-600 text-sm">⏳ In Progress</span>;
    } else {
      return <span className="text-gray-500 text-sm">⏸ Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Account Created Successfully!</h1>
          <p className="text-text">{state?.message || 'Please complete your verification to start using the platform.'}</p>
        </div>

        {/* Verification Progress */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-6">Verification Steps</h2>
          
          <div className="space-y-4">
            {verificationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                {getStepIcon(step)}
                <div className="flex-1">
                  <h3 className="font-medium text-primary">{step.title}</h3>
                  {getStepStatus(step)}
                </div>
                {step.status === 'current' && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Verification Progress</span>
              <span>{Math.round((currentStep / verificationSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / verificationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">What's Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 text-sm font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">Complete Verification</h3>
                <p className="text-sm text-text">Follow the verification steps above to unlock all features.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 text-sm font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">Explore the Platform</h3>
                <p className="text-sm text-text">Browse items, list your own, or start renting from the community.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 text-sm font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">Build Trust</h3>
                <p className="text-sm text-text">Complete your profile and earn trust badges from the community.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-mauve-700 transition-colors flex items-center justify-center gap-2"
          >
            Go to Home
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => navigate('/profile')}
            className="flex-1 border border-secondary text-primary py-3 px-6 rounded-lg hover:bg-background transition-colors flex items-center justify-center gap-2"
          >
            View Profile
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Info Alert */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Verification in Progress</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your verification is being processed automatically. You can start using the platform while verification completes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage; 
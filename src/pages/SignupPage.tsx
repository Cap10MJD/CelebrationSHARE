import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Shield, Heart, CheckCircle, ArrowRight, Lock, Mail, Phone, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { startVerification } from '../services/verificationService';

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  userType: 'renter' | 'owner' | 'both';
  birthday: string;
  agreeToTerms: boolean;
  agreeToVerification: boolean;
  agreeToPrivacy: boolean;
  parentalConsent: boolean;
  parentEmail: string;
  parentName: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    userType: 'renter',
    birthday: '',
    agreeToTerms: false,
    agreeToVerification: false,
    agreeToPrivacy: false,
    parentalConsent: false,
    parentEmail: '',
    parentName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showParentalConsent, setShowParentalConsent] = useState(false);

  const handleInputChange = (field: keyof SignupForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const calculateAge = (birthday: string): number => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required';
    } else {
      const age = calculateAge(formData.birthday);
      if (age < 16) {
        setShowParentalConsent(true);
        if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required';
        if (!formData.parentEmail.trim()) {
          newErrors.parentEmail = 'Parent/Guardian email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
          newErrors.parentEmail = 'Please enter a valid parent/guardian email';
        }
        if (!formData.parentalConsent) {
          newErrors.parentalConsent = 'Parental consent is required for users under 16';
        }
      } else if (age < 18) {
        if (!formData.parentalConsent) {
          newErrors.parentalConsent = 'Parental consent is required for users under 18';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    if (!formData.agreeToVerification) {
      newErrors.agreeToVerification = 'You must agree to the verification process';
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      // In a real app, you'd create the user account here
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Start verification process
      const userId = `user_${Date.now()}`;
      await startVerification(userId);
      
      // Navigate to verification page
      navigate('/verification', { 
        state: { 
          message: 'Account created successfully! Please complete your verification to start using the platform.',
          userType: formData.userType
        } 
      });
    } catch (error) {
      setErrors({ email: 'An error occurred during signup. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const userTypeOptions = [
    {
      id: 'renter',
      title: 'Renter',
      description: 'I want to borrow items from the community',
      icon: User,
      verificationRequired: 'ID verification only',
      features: ['Browse and rent items', 'Basic verification required', 'Family-friendly community']
    },
    {
      id: 'owner',
      title: 'Owner',
      description: 'I want to list my items for others to rent',
      icon: Shield,
      verificationRequired: 'ID + Background check',
      features: ['List your items', 'Earn money', 'Enhanced verification required']
    },
    {
      id: 'both',
      title: 'Both',
      description: 'I want to rent and list items',
      icon: Heart,
      verificationRequired: 'Full verification (all 3 steps)',
      features: ['Rent and list items', 'Maximum earning potential', 'Premium verification required']
    }
  ];

  const age = formData.birthday ? calculateAge(formData.birthday) : null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Join Our Family Community</h1>
          <p className="text-text">Create your account and start sharing with trusted neighbors</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm text-text">
            Step {step} of 2: {step === 1 ? 'Basic Information' : 'Account Setup'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Tell Us About Yourself</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                      errors.firstName ? 'border-red-300' : 'border-secondary'
                    }`}
                    placeholder="Enter your first name"
                    data-testid="signup-first-name"
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                      errors.lastName ? 'border-red-300' : 'border-secondary'
                    }`}
                    placeholder="Enter your last name"
                    data-testid="signup-last-name"
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-secondary'
                      }`}
                      placeholder="your.email@example.com"
                      data-testid="signup-email"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                        errors.phone ? 'border-red-300' : 'border-secondary'
                      }`}
                      placeholder="(555) 123-4567"
                      data-testid="signup-phone"
                    />
                  </div>
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                        errors.location ? 'border-red-300' : 'border-secondary'
                      }`}
                      placeholder="City, State"
                    />
                  </div>
                  {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Birthday</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => handleInputChange('birthday', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                        errors.birthday ? 'border-red-300' : 'border-secondary'
                      }`}
                      data-testid="signup-birthday"
                    />
                  </div>
                  {errors.birthday && <p className="text-red-600 text-sm mt-1">{errors.birthday}</p>}
                  {age !== null && (
                    <p className={`text-sm mt-1 ${age < 16 ? 'text-orange-600' : age < 18 ? 'text-blue-600' : 'text-green-600'}`}>
                      Age: {age} years old
                      {age < 16 && ' (Parental consent required)'}
                      {age >= 16 && age < 18 && ' (Parental consent recommended)'}
                    </p>
                  )}
                </div>
              </div>

              {/* Parental Consent Section */}
              {showParentalConsent && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-orange-800">Parental Consent Required</h3>
                      <p className="text-sm text-orange-700">
                        Users under 16 require parental consent to use CelebrationShare. Please provide your parent or guardian's information below.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-orange-800 mb-2">Parent/Guardian Name</label>
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => handleInputChange('parentName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.parentName ? 'border-red-300' : 'border-orange-300'
                        }`}
                        placeholder="Parent or guardian's full name"
                      />
                      {errors.parentName && <p className="text-red-600 text-sm mt-1">{errors.parentName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-orange-800 mb-2">Parent/Guardian Email</label>
                      <input
                        type="email"
                        value={formData.parentEmail}
                        onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.parentEmail ? 'border-red-300' : 'border-orange-300'
                        }`}
                        placeholder="parent@example.com"
                      />
                      {errors.parentEmail && <p className="text-red-600 text-sm mt-1">{errors.parentEmail}</p>}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.parentalConsent}
                        onChange={(e) => handleInputChange('parentalConsent', e.target.checked)}
                        className="mt-1 w-4 h-4 text-orange-600 border-orange-300 rounded focus:ring-orange-500"
                      />
                      <div className="text-sm text-orange-700">
                        <p>I confirm that I am the parent or legal guardian of this user and consent to their use of CelebrationShare.</p>
                        <p className="mt-1 text-xs">We will send a confirmation email to the parent/guardian email address provided.</p>
                      </div>
                    </label>
                    {errors.parentalConsent && <p className="text-red-600 text-sm mt-1">{errors.parentalConsent}</p>}
                  </div>
                </div>
              )}

              {/* User Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-4">How will you use CelebrationShare?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {userTypeOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.userType === option.id
                          ? 'border-accent bg-rose-50'
                          : 'border-secondary hover:border-accent'
                      }`}
                      onClick={() => handleInputChange('userType', option.id)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <option.icon className="w-6 h-6 text-accent" />
                        <h4 className="font-semibold text-primary">{option.title}</h4>
                      </div>
                      <p className="text-sm text-text mb-3">{option.description}</p>
                      <div className="text-xs text-accent font-medium mb-2">
                        {option.verificationRequired}
                      </div>
                      <ul className="text-xs text-text space-y-1">
                        {option.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-mauve-700 transition-colors flex items-center gap-2"
                  data-testid="signup-submit"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Create Your Account</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                        errors.password ? 'border-red-300' : 'border-secondary'
                      }`}
                      placeholder="Create a strong password"
                      data-testid="signup-password"
                    />
                  </div>
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                  <p className="text-xs text-text mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-300' : 'border-secondary'
                      }`}
                      placeholder="Confirm your password"
                      data-testid="signup-confirm-password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Terms and Agreements */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="mt-1 w-4 h-4 text-accent border-secondary rounded focus:ring-accent"
                    />
                    <div className="text-sm text-text">
                      I agree to the{' '}
                      <Link to="/terms" className="text-accent hover:text-rose-700 underline">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/pricing" className="text-accent hover:text-rose-700 underline">
                        Pricing & Fees
                      </Link>
                    </div>
                  </label>
                  {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeToPrivacy}
                      onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                      className="mt-1 w-4 h-4 text-accent border-secondary rounded focus:ring-accent"
                    />
                    <div className="text-sm text-text">
                      I agree to the{' '}
                      <Link to="/privacy" className="text-accent hover:text-rose-700 underline">
                        Privacy Policy
                      </Link>
                      {' '}and consent to the collection and use of my information
                    </div>
                  </label>
                  {errors.agreeToPrivacy && <p className="text-red-600 text-sm mt-1">{errors.agreeToPrivacy}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeToVerification}
                      onChange={(e) => handleInputChange('agreeToVerification', e.target.checked)}
                      className="mt-1 w-4 h-4 text-accent border-secondary rounded focus:ring-accent"
                    />
                    <div className="text-sm text-text">
                      I agree to complete the verification process to ensure community safety
                    </div>
                  </label>
                  {errors.agreeToVerification && <p className="text-red-600 text-sm mt-1">{errors.agreeToVerification}</p>}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="border border-secondary text-primary px-6 py-3 rounded-lg hover:bg-background transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-mauve-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  data-testid="signup-submit"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-text">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-rose-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 
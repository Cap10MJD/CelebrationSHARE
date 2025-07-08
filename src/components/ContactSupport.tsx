import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Shield, 
  Clock, 
  X, 
  Send,
  AlertTriangle,
  CheckCircle,
  User,
  FileText
} from 'lucide-react';

interface ContactSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSupport: React.FC<ContactSupportProps> = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get a response within 24 hours',
      icon: <Mail className="w-6 h-6" />,
      color: 'text-mauve-500',
      bgColor: 'bg-mauve-50',
      borderColor: 'border-mauve-200'
    },
    {
      id: 'safety',
      title: 'Safety Team',
      description: 'Urgent safety concerns - 2 hour response',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Mon-Fri 9AM-6PM EST',
      icon: <Phone className="w-6 h-6" />,
      color: 'text-mauve-700',
      bgColor: 'bg-mauve-50',
      borderColor: 'border-mauve-200'
    },
    {
      id: 'live-chat',
      title: 'Live Chat',
      description: 'Available during business hours',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'text-mauve-600',
      bgColor: 'bg-mauve-50',
      borderColor: 'border-mauve-200'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'verification', label: 'Verification Issue' },
    { value: 'listing', label: 'Listing Problem' },
    { value: 'rental', label: 'Rental Issue' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate email submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setSubmitted(false);
      setEmailForm({ subject: '', message: '', category: 'general' });
      setSelectedMethod(null);
    }, 3000);
  };

  const getContactInfo = (method: string) => {
    switch (method) {
      case 'email':
        return {
          title: 'Email Support',
          email: 'support@celebrationShare.com',
          responseTime: 'Within 24 hours',
          description: 'Send us a detailed message and we\'ll get back to you as soon as possible.'
        };
      case 'safety':
        return {
          title: 'Safety Team',
          email: 'safety@celebrationShare.com',
          responseTime: 'Within 2 hours',
          description: 'For urgent safety concerns, harassment, or suspicious activity. We prioritize family safety.'
        };
      case 'phone':
        return {
          title: 'Phone Support',
          phone: 'Contact us via email for fastest response',
          hours: 'Monday - Friday, 9AM - 6PM EST',
          description: 'Speak directly with our support team during business hours.'
        };
      case 'live-chat':
        return {
          title: 'Live Chat',
          availability: 'Business hours only',
          description: 'Chat with our support team in real-time during business hours.'
        };
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Contact Support</h2>
              <p className="text-sm text-text">Get help from our human support team</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text hover:text-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {!selectedMethod ? (
            // Contact Method Selection
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-2">How can we help you?</h3>
                <p className="text-text">Choose the best way to reach our support team</p>
              </div>

              <div className="grid gap-4">
                {contactMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      method.bgColor
                    } ${method.borderColor} hover:border-opacity-80`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${method.color}`}>
                        {method.icon}
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-semibold text-primary">{method.title}</h4>
                        <p className="text-sm text-text">{method.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Before contacting support</h4>
                    <p className="text-blue-800 text-sm">
                      Try our AI helper first! It can answer most questions instantly. You can find it in the bottom-right corner of any page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Specific Contact Method
            <div className="space-y-6">
              <button
                onClick={() => setSelectedMethod(null)}
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors mb-4"
              >
                ← Back to contact methods
              </button>

              {selectedMethod === 'email' || selectedMethod === 'safety' ? (
                // Email Form
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {getContactInfo(selectedMethod)?.title}
                    </h3>
                    <p className="text-text text-sm mb-2">
                      {getContactInfo(selectedMethod)?.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-text">
                      <Mail className="w-4 h-4" />
                      <span>{getContactInfo(selectedMethod)?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text mt-1">
                      <Clock className="w-4 h-4" />
                      <span>Response time: {getContactInfo(selectedMethod)?.responseTime}</span>
                    </div>
                  </div>

                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Category
                        </label>
                        <select
                          value={emailForm.category}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          required
                        >
                          {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={emailForm.subject}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                          className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="Brief description of your issue"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Message
                        </label>
                        <textarea
                          value={emailForm.message}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                          rows={6}
                          placeholder="Please provide details about your issue..."
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-mauve-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">Message Sent!</h3>
                      <p className="text-text">
                        We've received your message and will respond within {getContactInfo(selectedMethod)?.responseTime}.
                      </p>
                    </div>
                  )}
                </div>
              ) : selectedMethod === 'phone' ? (
                // Phone Information
                <div className="text-center py-8">
                  <Phone className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary mb-2">Call Us</h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {getContactInfo(selectedMethod)?.phone}
                  </p>
                  <p className="text-text mb-4">{getContactInfo(selectedMethod)?.hours}</p>
                  <p className="text-text text-sm">
                    {getContactInfo(selectedMethod)?.description}
                  </p>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">What to have ready:</h4>
                    <ul className="text-sm text-text space-y-1 text-left">
                      <li>• Your account email address</li>
                      <li>• Description of your issue</li>
                      <li>• Any relevant order or rental numbers</li>
                      <li>• Screenshots if it's a technical issue</li>
                    </ul>
                  </div>
                </div>
              ) : (
                // Live Chat Information
                <div className="text-center py-8">
                  <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary mb-2">Live Chat</h3>
                  <p className="text-text mb-4">
                    {getContactInfo(selectedMethod)?.description}
                  </p>
                  <p className="text-text text-sm mb-6">
                    {getContactInfo(selectedMethod)?.availability}
                  </p>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Live Chat Tips:</h4>
                    <ul className="text-sm text-purple-800 space-y-1 text-left">
                      <li>• Be specific about your issue</li>
                      <li>• Have your account information ready</li>
                      <li>• Stay online for quick responses</li>
                      <li>• Be patient during busy times</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSupport; 
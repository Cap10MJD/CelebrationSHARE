import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Calendar, MapPin, User, Info, TrendingDown } from 'lucide-react';
import PaymentForm from '../components/PaymentForm';
import { paymentAmounts, feeTransparencyConfig } from '../config/stripe';
import { getItemById, type Item } from '../services/itemService';
import { addCommissionRecord } from '../services/commissionService';
import { calculateFees, formatCurrency, formatFeePercentage, type FeeCalculation } from '../services/feeService';

interface RentalItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  owner: {
    name: string;
    rating: number;
  };
  location: string;
  availableDates: {
    start: string;
    end: string;
  };
}

export default function CheckoutPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState<Item | null>(null);
  const [rentalDates, setRentalDates] = useState({ startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feeCalculation, setFeeCalculation] = useState<FeeCalculation | null>(null);

  // Mock user ID - in real app this would come from auth context
  const currentUserId = 'user_new';

  useEffect(() => {
    const fetchItemData = async () => {
      if (!itemId) {
        setError('Item ID is required');
        setLoading(false);
        return;
      }

      try {
        // Get rental dates from navigation state
        const state = location.state as { rentalDates?: any; itemData?: Item } | null;
        if (state?.rentalDates) {
          setRentalDates(state.rentalDates);
        }

        // Fetch item data
        const itemData = await getItemById(itemId);
        if (itemData) {
          setItem(itemData);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        setError('Failed to load item');
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [itemId, location.state]);

  // Calculate fees whenever rental amount changes
  useEffect(() => {
    const calculateFeesForRental = async () => {
      if (!item || !rentalDates.startDate || !rentalDates.endDate) return;
      
      const rentalAmount = calculateRentalAmount();
      const securityDeposit = calculateSecurityDeposit(rentalAmount);
      
      try {
        const fees = await calculateFees(currentUserId, rentalAmount * 100, securityDeposit);
        setFeeCalculation(fees);
      } catch (error) {
        // Removed console.error('Failed to calculate fees:', error);
      }
    };

    calculateFeesForRental();
  }, [item, rentalDates, currentUserId]);

  const calculateRentalAmount = () => {
    if (!item || !rentalDates.startDate || !rentalDates.endDate) return 0;
    
    const start = new Date(rentalDates.startDate);
    const end = new Date(rentalDates.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return days * item.price;
  };

  const calculateSecurityDeposit = (rentalAmount: number) => {
    // Security deposit is typically 25-50% of rental value, with a minimum of $50
    const depositPercentage = 0.35; // 35% of rental value
    const deposit = Math.round(rentalAmount * depositPercentage * 100);
    const minDeposit = 5000; // $50 minimum in cents
    return Math.max(deposit, minDeposit);
  };

  const calculateTotal = () => {
    if (!feeCalculation) return 0;
    
    const securityDeposit = calculateSecurityDeposit(calculateRentalAmount());
    return feeCalculation.rentalAmount + feeCalculation.platformFee + paymentAmounts.service_fee + paymentAmounts.insurance_fee + securityDeposit;
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    setPaymentSuccess(true);
    
    // Record the commission transaction
    if (item && feeCalculation) {
      try {
        await addCommissionRecord({
          paymentId: paymentIntent.id,
          itemId: item.id.toString(),
          itemTitle: item.title,
          rentalAmount: feeCalculation.rentalAmount,
          commission: feeCalculation.platformFee,
          ownerPayout: feeCalculation.ownerPayout,
          status: 'completed',
          ownerName: item.owner.name
        });
      } catch (error) {
        // Removed console.error('Failed to record commission:', error);
      }
    }
    
    // Redirect to success page after a delay
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          paymentId: paymentIntent.id,
          itemId: item?.id 
        } 
      });
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The item you\'re looking for doesn\'t exist.'}</p>
          <button
            onClick={() => navigate('/browse')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Browse Items
          </button>
        </div>
      </div>
    );
  }

  if (!rentalDates.startDate || !rentalDates.endDate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Rental Dates Required</h2>
          <p className="text-gray-600 mb-4">Please select rental dates before proceeding to checkout.</p>
          <button
            onClick={() => navigate(`/item/${itemId}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rental Details</h2>
            
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <User size={14} className="mr-1" />
                  {item.owner.name} • ⭐ {item.rating}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {item.location}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar size={14} className="mr-2" />
                Rental Period
              </div>
              <p className="text-sm text-gray-900">
                {rentalDates.startDate ? new Date(rentalDates.startDate).toLocaleDateString() : 'Not selected'} - {rentalDates.endDate ? new Date(rentalDates.endDate).toLocaleDateString() : 'Not selected'}
              </p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            {/* Savings Alert */}
            {feeCalculation && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">You're saving money!</span>
                </div>
                <p className="text-sm text-green-700">
                  {feeTransparencyConfig.savingsMessage} - You save {formatCurrency(feeCalculation.savingsVsTraditional)} ({feeCalculation.savingsPercentage}%)
                </p>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
              {feeCalculation ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rental Fee ({rentalDates.startDate && rentalDates.endDate ? 
                      Math.ceil((new Date(rentalDates.endDate).getTime() - new Date(rentalDates.startDate).getTime()) / (1000 * 60 * 60 * 24)) : 0} days)</span>
                    <span className="text-gray-900">{formatCurrency(feeCalculation.rentalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Fee ({formatFeePercentage(feeCalculation.platformFeePercentage)})</span>
                    <span className="text-gray-900">{formatCurrency(feeCalculation.platformFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900">{formatCurrency(paymentAmounts.service_fee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Insurance</span>
                    <span className="text-gray-900">{formatCurrency(paymentAmounts.insurance_fee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="text-gray-900">{formatCurrency(calculateSecurityDeposit(calculateRentalAmount()))}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                  
                  {/* Fee Transparency */}
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Why we charge this fee:</span>
                    </div>
                    <div className="text-xs text-blue-800 space-y-1">
                      <p>• <strong>Insurance:</strong> {feeCalculation.feeBreakdown.insurance}</p>
                      <p>• <strong>Support:</strong> {feeCalculation.feeBreakdown.support}</p>
                      <p>• <strong>Security:</strong> {feeCalculation.feeBreakdown.security}</p>
                      <p>• <strong>Platform:</strong> {feeCalculation.feeBreakdown.platform}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    <p>• Security deposit (35% of rental value, min $50) is refundable after return</p>
                    <p>• Platform fee supports our secure, family-friendly marketplace</p>
                    <p>• All payments are processed securely through Stripe</p>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              )}
            </div>

            {/* Payment Form */}
            {paymentSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">Payment Successful!</h3>
                <p className="text-green-700">Your rental has been confirmed. Redirecting...</p>
              </div>
            ) : (
              <PaymentForm
                amount={calculateTotal()}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                description={`Rental: ${item.title}`}
                commission={feeCalculation?.platformFee || 0}
                ownerPayout={feeCalculation?.ownerPayout || 0}
              />
            )}

            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-sm text-red-700">{paymentError}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
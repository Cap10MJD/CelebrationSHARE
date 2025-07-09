import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Calendar, MapPin, User } from 'lucide-react';

interface PaymentSuccessState {
  paymentId: string;
  itemId: string;
}

export default function PaymentSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  interface RentalDetails {
  paymentId: string;
  itemId: string;
  item: {
    title: string;
    image: string;
    owner: {
      name: string;
      email: string;
      phone: string;
    };
    location: string;
    rentalDates: {
      start: string;
      end: string;
    };
    pickupTime: string;
    returnTime: string;
  };
  total: number;
}

const [rentalDetails, setRentalDetails] = useState<RentalDetails | null>(null);

  useEffect(() => {
    // Get payment details from location state
    const state = location.state as PaymentSuccessState;
    
    if (!state?.paymentId) {
      navigate('/');
      return;
    }

    // Mock rental details - replace with actual API call
    setRentalDetails({
      paymentId: state.paymentId,
      itemId: state.itemId,
      item: {
        title: 'Professional Photography Equipment',
        image: '/images/default-event.jpg',
        owner: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@celebration-share.com',
          phone: '+1 (415) 555-0123',
        },
        location: 'San Francisco, CA',
        rentalDates: {
          start: '2024-01-15',
          end: '2024-01-20',
        },
        pickupTime: '10:00 AM',
        returnTime: '6:00 PM',
      },
      total: 165.00,
    });
  }, [location, navigate]);

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      paymentId: rentalDetails?.paymentId,
      date: new Date().toLocaleDateString(),
      amount: rentalDetails?.total,
      item: rentalDetails?.item.title,
    };
    
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${rentalDetails?.paymentId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleContactOwner = () => {
    // Open email client or messaging system
    const subject = encodeURIComponent(`Rental Inquiry - ${rentalDetails?.item.title}`);
    const body = encodeURIComponent(`Hi ${rentalDetails?.item.owner.name},\n\nI've just completed a rental for your ${rentalDetails?.item.title}. I'm looking forward to picking it up on ${rentalDetails?.item.rentalDates.start}.\n\nBest regards`);
    window.open(`mailto:${rentalDetails?.item.owner.email}?subject=${subject}&body=${body}`);
  };

  if (!rentalDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <div data-testid="confirmation-message">Your rental has been confirmed and is ready to go.</div>
        </div>

        {/* Rental Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Rental Details</h2>
          
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={rentalDetails.item.image}
              alt={rentalDetails.item.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{rentalDetails.item.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <User size={14} className="mr-1" />
                {rentalDetails.item.owner.name}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                {rentalDetails.item.location}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Rental Period</div>
                <div className="text-gray-600">
                  {new Date(rentalDetails.item.rentalDates.start).toLocaleDateString()} - {new Date(rentalDetails.item.rentalDates.end).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Pickup/Return</div>
                <div className="text-gray-600">
                  {rentalDetails.item.pickupTime} / {rentalDetails.item.returnTime}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Contact Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{rentalDetails.item.owner.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{rentalDetails.item.owner.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{rentalDetails.item.owner.phone}</span>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleContactOwner}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail size={16} />
              <span>Contact Owner</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <Download size={16} />
            <span>Download Receipt</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            View My Rentals
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Contact the owner to arrange pickup details</li>
            <li>• Bring a valid ID for verification</li>
            <li>• Inspect the item before taking it</li>
            <li>• Return the item on time and in good condition</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItemById, type Item } from '../services/itemService';
import SafetyFeatures from '../components/SafetyFeatures';
import ChildSafeIndicator from '../components/ChildSafeIndicator';
import FamilySafetyNotice from '../components/FamilySafetyNotice';
import { 
  Shield, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Camera, 
  CheckCircle, 
  AlertCircle,
  User,
  MessageSquare,
  ArrowLeft,
  Heart,
  Share2
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Placeholder: fetch unavailable dates from backend
const fetchUnavailableDates = async (itemId: string): Promise<Date[]> => {
  // TODO: Replace with real API call
  return [
    // Example: new Date('2024-07-10'), new Date('2024-07-11')
  ];
};

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [rentalDates, setRentalDates] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null
  });
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const unavailableDates: Date[] = [
    // Example: new Date('2024-07-10'), new Date('2024-07-11')
    // Replace with real booked dates from backend
  ];

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError('Item ID is required');
        setLoading(false);
        return;
      }

      try {
        const itemData = await getItemById(id);
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

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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

  const calculateTotal = () => {
    if (!rentalDates.startDate || !rentalDates.endDate) return 0;
    
    const start = rentalDates.startDate;
    const end = rentalDates.endDate;
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Use weekly rate if available and rental is 7 days or more
    if (item.weeklyRate && days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      return (weeks * item.weeklyRate) + (remainingDays * item.price);
    }
    
    return days * item.price;
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setRentalDates({ startDate: start, endDate: end });
    setDateError(null);
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailable) =>
        date.getFullYear() === unavailable.getFullYear() &&
        date.getMonth() === unavailable.getMonth() &&
        date.getDate() === unavailable.getDate()
    );
  };

  const handleBook = () => {
    if (!rentalDates.startDate || !rentalDates.endDate) {
      setDateError('Please select both a start and end date.');
      return;
    }
    if (rentalDates.startDate > rentalDates.endDate) {
      setDateError('Start date cannot be after end date.');
      return;
    }
    // Check for overlap with unavailable dates
    let current = new Date(rentalDates.startDate);
    while (current <= rentalDates.endDate) {
      if (isDateUnavailable(current)) {
        setDateError('Selected dates include unavailable days.');
        return;
      }
      current.setDate(current.getDate() + 1);
    }
    setDateError(null);
    // ...proceed with booking
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text mb-6">
          <Link to="/browse" className="hover:text-accent transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
          <span>/</span>
          <span>{item.category}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
              <img
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-accent' : 'border-secondary'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-primary">{item.title}</h1>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-text hover:text-accent transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-text hover:text-accent transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-accent fill-current" />
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-text">({item.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-text">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.features.map((feature, index) => (
                  <span key={index} className="bg-secondary text-primary px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* Child Safety Indicator */}
              <div className="mb-4">
                <ChildSafeIndicator 
                  isChildSafe={item.isChildSafe || false}
                  ageRange={item.ageRange || 'All ages'}
                  safetyNotes={item.safetyNotes || []}
                  showDetails={true}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-primary">${item.price}</span>
                  <span className="text-text ml-2">per day</span>
                  {item.weeklyRate && (
                    <div className="mt-1">
                      <span className="text-lg font-semibold text-accent">${item.weeklyRate}</span>
                      <span className="text-text ml-2">per week</span>
                      <span className="text-xs text-green-600 ml-2">
                        (Save ${(item.price * 7) - item.weeklyRate}/week)
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-text">Security Deposit</div>
                  <div className="text-lg font-semibold text-accent">${item.deposit}</div>
                </div>
              </div>

              {/* Security Deposit Info */}
              <div className="bg-rose-50 border border-secondary rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Security Deposit Protection</h4>
                    <p className="text-sm text-text">
                      We'll pre-authorize ${item.deposit} on your card, but won't charge it unless damage occurs. 
                      Full refund within 48 hours of return.
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                {/* Calendar UI */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Select Rental Dates</label>
                  <DatePicker
                    data-testid="booking-date-picker"
                    selected={rentalDates.startDate}
                    onChange={handleDateChange}
                    startDate={rentalDates.startDate}
                    endDate={rentalDates.endDate}
                    selectsRange
                    minDate={new Date()}
                    excludeDates={unavailableDates}
                    filterDate={(date) => !isDateUnavailable(date)}
                    inline
                    calendarClassName="rounded-xl shadow-lg border border-gray-200"
                    dayClassName={date =>
                      isDateUnavailable(date)
                        ? 'bg-red-200 text-red-700 cursor-not-allowed'
                        : 'bg-green-50 text-green-700'
                    }
                  />
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-1"></span> Available
                    <span className="inline-block w-3 h-3 rounded-full bg-red-400 mr-1"></span> Unavailable
                  </div>
                  {dateError && <p className="text-red-600 mt-2">{dateError}</p>}
                </div>

                {calculateTotal() > 0 && (
                  <div className="bg-background rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Rental Total</span>
                      <span className="font-semibold">${calculateTotal()}</span>
                    </div>
                    {(() => {
                      const start = rentalDates.startDate;
                      const end = rentalDates.endDate;
                      if (!start || !end) return null;
                      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                      if (item.weeklyRate && days >= 7) {
                        const weeks = Math.floor(days / 7);
                        const remainingDays = days % 7;
                        return (
                          <div className="text-xs text-text mb-2">
                            {weeks > 0 && `${weeks} week${weeks > 1 ? 's' : ''} × $${item.weeklyRate}`}
                            {remainingDays > 0 && weeks > 0 && ' + '}
                            {remainingDays > 0 && `${remainingDays} day${remainingDays > 1 ? 's' : ''} × $${item.price}`}
                          </div>
                        );
                      }
                      return null;
                    })()}
                    <div className="flex justify-between items-center mb-2">
                      <span>Security Deposit</span>
                      <span className="font-semibold text-accent">${item.deposit}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Due Today</span>
                        <span className="font-bold text-xl">${calculateTotal()}</span>
                      </div>
                      <p className="text-xs text-text mt-1">
                        Deposit pre-authorized, not charged
                      </p>
                    </div>
                  </div>
                )}

                <button 
                  data-testid="book-now-button"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-mauve-700 transition-colors"
                  disabled={!rentalDates.startDate || !rentalDates.endDate}
                  onClick={handleBook}
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Profile */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={item.owner.avatar}
              alt={item.owner.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold text-primary">{item.owner.name}</h3>
                {item.owner.verified && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm text-accent font-medium">Verified</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-text">
                <span>Joined {item.owner.joinDate}</span>
                <span>•</span>
                <span>{item.owner.totalRentals} rentals</span>
                <span>•</span>
                <span>Responds in {item.owner.responseTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/chat', { 
                  state: { 
                    startChatWith: item.owner.name,
                    itemId: item.id,
                    itemTitle: item.title
                  } 
                })}
                className="px-4 py-2 border border-secondary rounded-lg hover:bg-background transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <Link
                to={`/profile/${item.owner.name}`}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-mauve-700 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Safety Verification Status */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-primary">Safety Verification</h4>
            </div>
            
            {/* Verification Level */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.verificationLevel === 3 ? 'bg-purple-100 text-purple-800' :
                item.verificationLevel === 2 ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                Level {item.verificationLevel} Verification
              </div>
              <span className="text-sm text-text">
                {item.verificationLevel === 3 ? 'Premium' : 
                 item.verificationLevel === 2 ? 'Enhanced' : 'Basic'}
              </span>
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap gap-2">
              {item.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                  <CheckCircle className="w-3 h-3" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <SafetyFeatures
          itemId={item.id}
          ownerVerified={item.owner.verified}
          verificationLevel={item.verificationLevel}
          badges={item.badges}
          responseTime={item.owner.responseTime}
          totalRentals={item.owner.totalRentals}
          rating={item.rating}
          reviews={item.reviews}
          joinDate={item.owner.joinDate}
          safetyScore={item.safetyScore}
        />

        {/* Description & Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Description</h3>
            <div className="prose prose-gray max-w-none">
              {item.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-text leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Availability */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Availability
              </h3>
              <p className="text-text mb-4">{item.availability}</p>
              <div className="text-sm text-text">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  {item.pickupInstructions}
                </div>
              </div>
            </div>

            {/* Damage Protection */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Damage Protection
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Pre-authorization Hold</p>
                    <p className="text-sm text-text">{item.depositPolicy}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Photo Documentation</p>
                    <p className="text-sm text-text">Before and after photos protect both parties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Fair Use Policy</p>
                    <p className="text-sm text-text">{item.damageProtection}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
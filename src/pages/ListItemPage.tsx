import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, DollarSign, Shield, Info, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createItem, type Item } from '../services/itemService';

const ListItemPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    dailyPrice: '',
    weeklyPrice: '',
    deposit: '',
    depositType: 'percentage', // 'percentage' or 'fixed'
    features: [''],
    availability: '',
    pickupInstructions: '',
    damagePolicy: '',
    images: [] as File[]
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => {
        // Only revoke object URLs, not base64 URLs
        if (url && !url.startsWith('data:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageUrls]);

  const categories = [
    // Core Categories
    { id: 'tables-seating', name: 'Tables & Seating', group: 'Core Categories' },
    { id: 'linens-decor', name: 'Linens & Decor', group: 'Core Categories' },
    { id: 'lighting', name: 'Lighting', group: 'Core Categories' },
    { id: 'audio-visual', name: 'Audio/Visual', group: 'Core Categories' },
    { id: 'tents-structures', name: 'Tents & Structures', group: 'Core Categories' },
    // High-Value Items
    { id: 'photo-video', name: 'Photo/Video Equipment', group: 'High-Value Items' },
    { id: 'catering', name: 'Catering Equipment', group: 'High-Value Items' },
    { id: 'bar-setup', name: 'Bar Setup', group: 'High-Value Items' },
    { id: 'dance-entertainment', name: 'Dance & Entertainment', group: 'High-Value Items' },
    // Wedding-Specific
    { id: 'ceremony-items', name: 'Ceremony Items', group: 'Wedding-Specific' },
    { id: 'reception-decor', name: 'Reception Decor', group: 'Wedding-Specific' },
    // Party Essentials
    { id: 'games-activities', name: 'Games & Activities', group: 'Party Essentials' },
    { id: 'serving-cleanup', name: 'Serving & Cleanup', group: 'Party Essentials' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const calculateSuggestedDeposit = () => {
    const price = parseFloat(formData.dailyPrice) || 0;
    const selectedCategory = categories.find(c => c.id === formData.category);
    
    if (!selectedCategory) return 0;
    
    // Base deposit calculation: 3-5x daily price depending on category
    const multiplier = formData.category === 'weddings' ? 5 : 
                     formData.category === 'corporate' ? 4 : 
                     formData.category === 'community' ? 4 : 3;
    
    return Math.round(price * multiplier);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setUploadError(''); // Clear previous errors
    setIsUploading(true);
    
    // Validate total number of images (max 10)
    if (imageUrls.length + fileArray.length > 10) {
      setUploadError('Maximum 10 images allowed. Please remove some images first.');
      setIsUploading(false);
      return;
    }

    // Initialize progress for new files
    const newProgress = Array(fileArray.length).fill(0);
    setUploadProgress(prev => [...prev, ...newProgress]);

    try {
      const newUrls: string[] = [];
      const validFiles: File[] = [];
      
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setUploadError(`${file.name} is not a valid image file.`);
          continue;
        }

        // Validate file size (limit to 10MB for better quality)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          setUploadError(`${file.name} is too large. Please select images under 10MB.`);
          continue;
        }

        try {
          // Simulate upload progress
          for (let progress = 0; progress <= 100; progress += 20) {
            await new Promise(resolve => setTimeout(resolve, 100));
            setUploadProgress(prev => {
              const newProgress = [...prev];
              newProgress[prev.length - fileArray.length + i] = progress;
              return newProgress;
            });
          }

          const base64Url = await convertFileToBase64(file);
          newUrls.push(base64Url);
          validFiles.push(file);
        } catch (error) {
          setUploadError(`Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'File processing error'}`);
          continue;
        }
      }
      
      if (validFiles.length > 0) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...validFiles]
        }));
        
        setImageUrls(prev => [...prev, ...newUrls]);
      }
    } catch (error) {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress([]);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Helper function to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    setImageUrls(prev => {
      const newUrls = prev.filter((_, i) => i !== index);
      // Only revoke object URLs, not base64 URLs
      const urlToRemove = prev[index];
      if (urlToRemove && !urlToRemove.startsWith('data:')) {
        URL.revokeObjectURL(urlToRemove);
      }
      return newUrls;
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Item title is required';
    if (!formData.category) return 'Category is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.dailyPrice || parseFloat(formData.dailyPrice) <= 0) return 'Valid daily price is required';
    if (!formData.deposit || parseFloat(formData.deposit) <= 0) return 'Valid deposit amount is required';
    if (imageUrls.length === 0) return 'At least one photo is required';
    return null;
  };

  const handlePublish = async () => {
    const validationError = validateForm();
    if (validationError) {
      setPublishError(validationError);
      return;
    }

    setIsPublishing(true);
    setPublishError('');

    try {
      // Use the base64 image URLs directly (they're already persistent)
      const finalImageUrls = [...imageUrls];

      // Create the item data
      const itemData = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.dailyPrice),
        deposit: parseFloat(formData.deposit),
        location: '1.5 miles away', // In a real app, this would come from user's location
        locationData: {
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          county: 'Travis',
          latitude: 30.2672,
          longitude: -97.7431
        },
        owner: {
          name: 'You', // In a real app, this would be the current user's name
          avatar: 'https://images.pexels.com/photos/user-avatar.jpeg?auto=compress&cs=tinysrgb&w=100',
          verified: true,
          joinDate: 'January 2024',
          totalRentals: 0,
          responseTime: '< 1 hour'
        },
        images: finalImageUrls,
        features: formData.features.filter(f => f.trim() !== ''),
        description: formData.description,
        availability: formData.availability,
        pickupInstructions: formData.pickupInstructions,
        depositPolicy: `Security deposit of $${formData.deposit} is pre-authorized but not charged unless damage occurs. Full refund within 48 hours of return.`,
        damageProtection: formData.damagePolicy
      };

      // Create the item in the service
      const newItem = await createItem(itemData);
      
      // Navigate to the new item's detail page
      navigate(`/item/${newItem.id}`, { 
        state: { 
          message: 'Item published successfully! Your listing is now live and visible to the community.',
          newItem: true
        } 
      });
    } catch (error) {
      setPublishError('Failed to publish item. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const steps = [
    { number: 1, title: 'Item Details', description: 'Basic information about your item' },
    { number: 2, title: 'Pricing & Deposit', description: 'Set your rates and security deposit' },
    { number: 3, title: 'Photos & Final Details', description: 'Upload photos and policies' }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">List Your Item</h1>
          <p className="text-text">Share your items with families in your neighborhood</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex flex-col items-center ${
                  currentStep >= step.number ? 'text-accent' : 'text-text'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number ? 'bg-accent text-white' : 'bg-secondary'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-center mt-2 hidden sm:block">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-text">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-accent' : 'bg-secondary'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Item Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Round Table Set for 8 People"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  data-testid="list-item-title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Event Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  data-testid="list-item-category"
                >
                  <option value="">Select an event category</option>
                  {['Core Categories', 'High-Value Items', 'Wedding-Specific', 'Party Essentials'].map(group => (
                    <optgroup key={group} label={group}>
                      {categories.filter(cat => cat.group === group).map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your item, its condition, what's included, and any special features..."
                  rows={5}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  data-testid="list-item-description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Key Features
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="e.g., Seats 8 people, Outdoor use"
                        className="flex-1 px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-accent hover:text-rose-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-accent hover:text-rose-700 text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Pricing & Security Deposit</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Daily Rate *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="number"
                      value={formData.dailyPrice}
                      onChange={(e) => handleInputChange('dailyPrice', e.target.value)}
                      placeholder="25"
                      className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      data-testid="list-item-daily-rate"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Weekly Rate (Optional)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                    <input
                      type="number"
                      value={formData.weeklyPrice}
                      onChange={(e) => handleInputChange('weeklyPrice', e.target.value)}
                      placeholder="150"
                      className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Security Deposit Section */}
              <div className="bg-rose-50 border border-secondary rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary">Security Deposit</h3>
                    <p className="text-sm text-text">
                      Protects your item from damage or loss. Amount is pre-authorized, not charged upfront.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Deposit Amount *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text w-4 h-4" />
                      <input
                        type="number"
                        value={formData.deposit}
                        onChange={(e) => handleInputChange('deposit', e.target.value)}
                        placeholder={calculateSuggestedDeposit().toString()}
                        className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    {formData.dailyPrice && (
                      <p className="text-sm text-text mt-2">
                        Suggested: ${calculateSuggestedDeposit()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-secondary border border-rose-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary">How Security Deposits Work</h4>
                    <ul className="text-sm text-text mt-2 space-y-1">
                      <li>• Renters see the deposit amount before booking</li>
                      <li>• We pre-authorize (not charge) the deposit on their card</li>
                      <li>• If no damage occurs, the hold is released within 48 hours</li>
                      <li>• If damage occurs, you can claim up to the deposit amount</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Photos & Final Details</h2>
              
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Photos * (3-5 photos recommended, max 10)
                </label>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  data-testid="list-item-photo-upload"
                />
                
                {/* Upload area */}
                <div className="border-2 border-dashed border-secondary rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-text mx-auto mb-4" />
                  <p className="text-text mb-2">Upload photos of your item</p>
                  <p className="text-sm text-text mb-4">JPG, PNG up to 10MB each • {imageUrls.length}/10 images</p>
                  
                  {isUploading ? (
                    <div className="flex items-center justify-center gap-2 text-accent">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <button 
                      onClick={handleFileSelect}
                      disabled={imageUrls.length >= 10}
                      className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
                        imageUrls.length >= 10
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-mauve-700'
                      }`}
                    >
                      {imageUrls.length >= 10 ? 'Maximum images reached' : 'Choose Files'}
                    </button>
                  )}
                </div>

                {/* Upload Error */}
                {uploadError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{uploadError}</span>
                    </div>
                  </div>
                )}

                {/* Selected images preview */}
                {imageUrls.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-primary mb-2">
                      Selected Images ({imageUrls.length}/10)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {uploadProgress[index] !== undefined && uploadProgress[index] < 100 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                              <div className="text-white text-sm">{uploadProgress[index]}%</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  placeholder="e.g., Available weekends, 2-week advance notice preferred"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Pickup Instructions
                </label>
                <textarea
                  value={formData.pickupInstructions}
                  onChange={(e) => handleInputChange('pickupInstructions', e.target.value)}
                  placeholder="Pickup location, hours, parking instructions, etc."
                  rows={3}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Damage Policy
                </label>
                <textarea
                  value={formData.damagePolicy}
                  onChange={(e) => handleInputChange('damagePolicy', e.target.value)}
                  placeholder="What constitutes normal wear vs. damage? Any specific care instructions?"
                  rows={3}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-secondary text-text cursor-not-allowed'
                  : 'bg-secondary text-primary hover:bg-rose-300'
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-mauve-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {publishError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {publishError}
                  </div>
                )}
                <button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isPublishing 
                      ? 'bg-secondary text-text cursor-not-allowed' 
                      : 'bg-accent text-white hover:bg-rose-700'
                  }`}
                  data-testid="list-item-submit"
                >
                  {isPublishing ? 'Publishing...' : 'Publish Item'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemPage;
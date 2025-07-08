import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemById, type Item } from '../services/itemService';

const EditItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: 0,
    deposit: 0,
    description: '',
    availability: '',
    pickupInstructions: '',
    depositPolicy: '',
    damageProtection: ''
  });

  useEffect(() => {
    const loadItem = async () => {
      if (id) {
        try {
          const itemData = await getItemById(id);
          if (itemData) {
            setItem(itemData);
            setFormData({
              title: itemData.title,
              category: itemData.category,
              price: itemData.price,
              deposit: itemData.deposit,
              description: itemData.description,
              availability: itemData.availability,
              pickupInstructions: itemData.pickupInstructions,
              depositPolicy: itemData.depositPolicy,
              damageProtection: itemData.damageProtection
            });
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadItem();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'deposit' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to profile
      navigate('/profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading item...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Item not found</p>
          <button 
            onClick={() => navigate('/profile')}
            className="mt-4 text-primary hover:underline"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-secondary">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Profile
            </button>
            <h1 className="text-xl font-semibold text-primary">Edit Item</h1>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-secondary p-6">
          <h2 className="text-2xl font-semibold text-primary mb-6">Edit {item.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Item Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter item title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="Decorations">Decorations</option>
                  <option value="Tables & Chairs">Tables & Chairs</option>
                  <option value="Linens & Tableware">Linens & Tableware</option>
                  <option value="Tents & Canopies">Tents & Canopies</option>
                  <option value="Games & Entertainment">Games & Entertainment</option>
                  <option value="Lighting & Sound">Lighting & Sound</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Daily Rate ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Deposit ($)
                  </label>
                  <input
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary">Policies & Instructions</h3>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Availability
                </label>
                <textarea
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe when this item is available for rental"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Pickup Instructions
                </label>
                <textarea
                  name="pickupInstructions"
                  value={formData.pickupInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe pickup process and location"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Describe your item in detail"
            />
          </div>

          {/* Policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Deposit Policy
              </label>
              <textarea
                name="depositPolicy"
                value={formData.depositPolicy}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Explain your deposit policy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Damage Protection
              </label>
              <textarea
                name="damageProtection"
                value={formData.damageProtection}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Explain damage protection terms"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-secondary">
            <button 
              onClick={() => navigate('/profile')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-mauve-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemPage; 
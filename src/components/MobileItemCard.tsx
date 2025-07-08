import React from 'react';
import { Star, MapPin, Heart, Shield } from 'lucide-react';
import { type Item } from '../services/itemService';

interface MobileItemCardProps {
  item: Item;
  onFavorite?: (id: number) => void;
  onTap?: (id: number) => void;
  isFavorited?: boolean;
}

const MobileItemCard: React.FC<MobileItemCardProps> = ({ item, onFavorite, onTap, isFavorited }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-soft overflow-hidden active:scale-95 transition-transform duration-150"
      onClick={() => onTap?.(item.id)}
      data-testid="mobile-item-card"
    >
      <div className="relative">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <button 
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md active:scale-90 transition-transform ${
            isFavorited 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm text-text'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(item.id);
          }}
          data-testid="mobile-item-favorite"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
        {item.owner.verified && (
          <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2" data-testid="mobile-item-title">{item.title}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-accent fill-current" />
          <span className="text-sm font-medium text-primary">{item.rating}</span>
          <span className="text-sm text-text">({item.reviews})</span>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-4 h-4 text-text" />
          <span className="text-sm text-text">{item.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {item.features.slice(0, 2).map((feature, index) => (
            <span key={index} className="text-xs bg-secondary text-primary px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {item.features.length > 2 && (
            <span className="text-xs text-text">+{item.features.length - 2} more</span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-primary">${item.price}/day</p>
            <p className="text-sm text-text">${item.deposit} deposit</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text">by {item.owner.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileItemCard;

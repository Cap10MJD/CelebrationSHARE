import React, { useState, useRef } from 'react';
import { Camera, Upload, X, User } from 'lucide-react';

interface ProfilePictureUploadProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: string;
  className?: string;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onImageSelect,
  currentImage,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or WebP)');
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center">
        {/* Profile Picture Display */}
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Remove button */}
          {previewUrl && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div
          className={`w-full max-w-md p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900">
                {previewUrl ? 'Change Profile Picture' : 'Upload Profile Picture'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {previewUrl 
                  ? 'Click to change your profile picture'
                  : 'Drag and drop an image here, or click to browse'
                }
              </p>
            </div>
            
            {!previewUrl && (
              <div className="text-xs text-gray-400">
                Supports: JPEG, PNG, WebP • Max: 5MB
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Tips */}
        {!previewUrl && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              💡 Tip: Use a clear, well-lit photo of yourself for better community trust
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload; 
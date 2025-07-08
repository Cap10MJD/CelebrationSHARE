import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  title?: string;
  subtitle?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  url, 
  size = 200, 
  title = "Scan to get the CelebrationShare App",
  subtitle = "CelebrationShare Mobile App"
}) => {
  // Use the provided URL as-is for QR code (allow local testing)
  return (
    <div className="text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl inline-block">
        <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
          <div className="text-center">
            <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-4 shadow-lg p-2">
              <QRCodeSVG
                value={url}
                size={size}
                level="M"
                includeMargin={true}
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="text-gray-600 text-sm space-y-1">
          <p>Available for iOS and Android</p>
          <p className="text-xs text-gray-500">Scan with your phone's camera</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator; 
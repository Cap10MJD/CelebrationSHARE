import React from 'react';
import { Baby, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface ChildSafeIndicatorProps {
  isChildSafe: boolean;
  ageRange?: string;
  safetyNotes?: string[];
  showDetails?: boolean;
}

const ChildSafeIndicator: React.FC<ChildSafeIndicatorProps> = ({
  isChildSafe,
  ageRange = 'All ages',
  safetyNotes = [],
  showDetails = false
}) => {
  const defaultSafetyNotes = [
    'No small parts',
    'Non-toxic materials',
    'Sturdy construction',
    'Easy to clean'
  ];

  const notes = safetyNotes.length > 0 ? safetyNotes : defaultSafetyNotes;

  if (!isChildSafe) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
        <AlertTriangle className="w-4 h-4" />
        Not suitable for children
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Main Indicator */}
      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
        <Baby className="w-4 h-4" />
        Child Safe
        <CheckCircle className="w-4 h-4" />
      </div>

      {/* Age Range */}
      <div className="text-xs text-text">
        Suitable for: {ageRange}
      </div>

      {/* Safety Details */}
      {showDetails && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Safety Features</span>
          </div>
          <ul className="space-y-1">
            {notes.map((note, index) => (
              <li key={index} className="flex items-center gap-2 text-xs text-green-700">
                <CheckCircle className="w-3 h-3" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChildSafeIndicator; 
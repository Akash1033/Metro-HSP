import React from 'react';

interface ColorStripeProps {
  className?: string;
  width?: string;
  variant?: 'default' | 'about';
}

export const ColorStripe: React.FC<ColorStripeProps> = ({
  className = '',
  width = 'w-16',
  variant = 'default',
}) => {
  return (
    <div className={`h-[3px] rounded-full flex overflow-hidden ${width} ${className}`}>
      <span className="w-1/4 h-full bg-[#0875E1]" />
      <span className={`w-1/4 h-full ${variant === 'about' ? 'bg-[#10B981]' : 'bg-[#EF3340]'}`} />
      <span className="w-1/4 h-full bg-[#F59E0B]" />
      <span className={`w-1/4 h-full ${variant === 'about' ? 'bg-[#EF4444]' : 'bg-[#10B981]'}`} />
    </div>
  );
};


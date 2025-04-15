'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
}

export function OTPInput({
  value,
  onChange,
  maxLength = 6,
  className,
}: OTPInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, maxLength);
  }, [maxLength]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(newValue)) return;
    
    // Update the value
    const newOtpValue = value.split('');
    newOtpValue[index] = newValue;
    
    // Join and update
    const updatedValue = newOtpValue.join('');
    onChange(updatedValue);
    
    // Auto-focus next input
    if (newValue && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Only allow numbers
    if (!/^\d*$/.test(pastedData)) return;
    
    // Take only the first maxLength digits
    const truncatedPaste = pastedData.slice(0, maxLength);
    
    // Pad with empty strings if needed
    const paddedPaste = truncatedPaste.padEnd(maxLength, '');
    
    onChange(paddedPaste);
    
    // Focus the last input
    if (truncatedPaste.length === maxLength) {
      inputRefs.current[maxLength - 1]?.focus();
    }
  };

  return (
    <div
      className={cn(
        'flex gap-2 items-center justify-center',
        className
      )}
    >
      {Array.from({ length: maxLength }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            'w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold rounded-md border border-gray-300 focus:border-green focus:ring-2 focus:ring-green focus:ring-opacity-20 outline-none transition-all',
            focused && 'border-green ring-2 ring-green ring-opacity-20',
            value[index] && 'border-green bg-green bg-opacity-5'
          )}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
} 
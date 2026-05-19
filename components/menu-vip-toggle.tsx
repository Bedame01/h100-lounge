'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'

interface MenuVipToggleProps {
  onToggle: (isVip: boolean) => void;
  initialIsVip?: boolean;
}

/**
 * Menu VIP Toggle Component
 * 
 * Provides a button/toggle to switch between regular menu and VIP menu prices
 * Maintains state and notifies parent component of selection
 * 
 * @param onToggle - Callback function when toggle changes
 * @param initialIsVip - Initial state (default: false for regular menu)
 */
export function MenuVipToggle({ onToggle, initialIsVip = false }: MenuVipToggleProps) {
  const [isVip, setIsVip] = useState(initialIsVip);

  const selectMenu = (vip: boolean) => {
    setIsVip(vip);
    onToggle(vip);
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-6 mb-2">
      <CustomButton 
        text="Regular Menu" 
        hoverText="View Prices" 
        href="" 
        onClick={() => selectMenu(false)}
        variant={!isVip ? 'primary' : 'ghost'}
        className={`min-w-28! py-0 px-1 text-xs text-center rounded-sm font-bold! ${!isVip ? 'text-[#fff]' : ''}`}
      />

      <CustomButton 
        text="VIP Menu" 
        hoverText="View Prices" 
        href="" 
        onClick={() => selectMenu(true)}
        variant={!isVip ? 'ghost' : 'primary'}
        className={`min-w-28! py-0 px-1 text-xs text-center text-nowrap rounded-sm font-bold! ${isVip ? 'text-[#fff]' : 'text-foreground'}`}
      />
    </div>
  );
}

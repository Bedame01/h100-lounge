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
    <div className="flex items-center justify-center gap-1">
      <CustomButton 
        text="Regular List" 
        // hoverText="View Prices" 
        href="" 
        onClick={() => selectMenu(false)}
        variant={!isVip ? 'default' : 'ghost'}
        className={`min-w-20! py-0 px-0 text-xs text-center rounded-full text-nowrap font-bold! ${!isVip ? 'text-[#fff]' : ''}`}
      />

      <CustomButton 
        text="VIP List" 
        // hoverText="View Prices" 
        href="" 
        onClick={() => selectMenu(true)}
        variant={!isVip ? 'ghost' : 'default'}
        className={`min-w-20! py-0 px-1 text-xs text-center text-nowrap rounded-full font-bold! ${isVip ? 'text-[#fff]' : 'text-foreground'}`}
      />
    </div>
  );
}

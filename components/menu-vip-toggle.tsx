'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'

interface MenuVipToggleProps {
  onToggle: (isVip: boolean) => void;
  initialIsVip?: boolean;
  isSpecialActive?: boolean;
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
export function MenuVipToggle({ onToggle, initialIsVip = false, isSpecialActive = false }: MenuVipToggleProps) {
  const [isVip, setIsVip] = useState(initialIsVip);

  const selectMenu = (vip: boolean) => {
    setIsVip(vip);
    onToggle(vip);
  };

  // when a special view (cocktails/mocktails) is active, show both as unselected
  const regularVariant = isSpecialActive ? 'ghost' : !isVip ? 'default' : 'ghost'
  const vipVariant = isSpecialActive ? 'ghost' : isVip ? 'default' : 'ghost'

  return (
    <div className="flex items-center justify-center gap-1">
      <CustomButton
        text="Regular List"
        // hoverText="View Prices"
        onClick={() => selectMenu(false)}
        variant={regularVariant}
        className={`min-w-30! py-2 px-3 text-sm! text-center text-nowrap font-bold! ${!isVip && !isSpecialActive ? 'text-[#fff]' : ''}`}
      />

      <CustomButton
        text="VIP List"
        // hoverText="View Prices"
        onClick={() => selectMenu(true)}
        variant={vipVariant}
        className={`min-w-30! py-2 px-3 text-sm! text-center text-nowrap font-bold! ${isVip && !isSpecialActive ? 'text-[#fff]' : 'text-foreground'}`}
      />
    </div>
  );
}

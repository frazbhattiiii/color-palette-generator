'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { ColorToken } from 'utils/color';

import { cn } from '@/lib/utils';

interface ColorBoxProps extends ColorToken {
  onClick: () => void;
}

export function ColorBox({ token, hex, rgb, shade, onClick }: ColorBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onClick();
    setCopied(true);
    toast.success(`Copied ${hex} to clipboard`);
    setTimeout(() => setCopied(false), 1000);
  };

  const textColor = parseInt(token) <= 500 ? 'text-gray-900' : 'text-white';

  return (
    <div
      className={cn(
        'group relative flex items-center justify-between p-6 rounded-xl cursor-pointer transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-lg',
        textColor
      )}
      style={{ backgroundColor: hex }}
      onClick={handleClick}
    >
      <div className='flex flex-col gap-1'>
        <span className='text-sm font-medium'>Shade {token}</span>
        <span className='text-xs opacity-80 font-mono'>{hex}</span>
      </div>
      <div className='flex items-center gap-4'>
        <div className='hidden group-hover:block text-xs opacity-80 font-mono animate-in fade-in'>
          <div>{rgb}</div>
          <div>
            Shade: {shade > 0 ? '+' : ''}
            {shade * 100}%
          </div>
        </div>
        <div className='w-6 h-6 flex items-center justify-center transition-transform duration-200 group-hover:scale-110'>
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </div>
      </div>
    </div>
  );
}

'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import type { FigmaToken } from 'utils/figma-colors';

import { cn } from '@/lib/utils';

interface FigmaColorBoxProps extends FigmaToken {
  onClick: () => void;
}

export function FigmaColorBox({
  token,
  hex,
  rgb,
  shade,
  onClick,
}: FigmaColorBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const textColor = shade >= 0 ? 'text-gray-900' : 'text-white';

  return (
    <div
      className={cn(
        'group relative flex items-center justify-between p-4 rounded-lg cursor-pointer transition-transform hover:scale-[1.02]',
        textColor
      )}
      style={{ backgroundColor: hex }}
      onClick={handleClick}
    >
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{token}</span>
        <span className='text-xs opacity-80 font-mono'>{hex}</span>
      </div>
      <div className='flex items-center gap-2'>
        <div className='hidden group-hover:block text-xs opacity-80'>
          <div>{rgb}</div>
          <div>
            Shade: {shade > 0 ? '+' : ''}
            {shade * 100}%
          </div>
        </div>
        <div className='w-5 h-5 flex items-center justify-center'>
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </div>
      </div>
    </div>
  );
}

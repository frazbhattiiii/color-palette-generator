'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { generatePalette } from 'utils/color';

import { ColorBox } from '@/components/color-box';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ColorPalette() {
  const [color, setColor] = useState('#6366F1');
  const [palette, setPalette] = useState(() => generatePalette('#6366F1'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPalette(generatePalette(color));
    } catch (error) {
      toast.error('Please enter a valid hex color code');
    }
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container max-w-3xl mx-auto px-4 py-16'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className='text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
            Color Palette Generator
          </h1>
          <p className='text-gray-400 dark:text-gray-300 text-lg font-semibold max-w-2xl mx-auto'>
            Generate beautiful color palettes for your design system.
          </p>
          <a
            href='https://thyreality.com'
            target='__blank'
            className='text-gray-700 dark:text-gray-300 text-xl font-semibold max-w-2xl mx-auto mt-4'
          >
            Powered by ThyReality.
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className='flex gap-4 mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder='Enter hex color (e.g., #6366F1)'
            pattern='^#?([A-Fa-f0-9]{6})$'
            className='font-mono text-lg h-12'
          />
          <Button
            type='submit'
            size='lg'
            className='bg-indigo-600 hover:bg-indigo-700'
          >
            Generate
          </Button>
        </motion.form>

        <motion.div
          className='grid gap-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {palette.map((color, index) => (
            <motion.div
              key={color.token}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ColorBox {...color} onClick={() => handleCopy(color.hex)} />
            </motion.div>
          ))}
        </motion.div>

        <motion.footer
          className='mt-16 text-center text-sm text-gray-500 dark:text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>© {new Date().getFullYear()} ThyReality. All rights reserved.</p>
          <p className='mt-2'>
            Built with modern design principles and attention to detail.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

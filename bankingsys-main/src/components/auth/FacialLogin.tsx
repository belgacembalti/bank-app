import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Scan, Check, X } from 'lucide-react';
import { Card } from '../design-system/Card';

interface FacialLoginProps {
  onNavigate: (page: string) => void;
}

export function FacialLogin({ onNavigate }: FacialLoginProps) {
  const [status, setStatus] = useState<'scanning' | 'success' | 'failed'>('scanning');

  useEffect(() => {
    // Simulate facial recognition
    const timer = setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onNavigate('dashboard');
      }, 1500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full">
        <div className="text-center">
          <h2 className="text-navy-900 dark:text-white mb-2">Facial Recognition</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {status === 'scanning' && 'Position your face in the frame'}
            {status === 'success' && 'Identity verified!'}
            {status === 'failed' && 'Verification failed'}
          </p>

          <div className="relative bg-navy-900 rounded-xl p-8 aspect-square max-w-sm mx-auto mb-8">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Animated scanning frame */}
              <svg className="absolute w-64 h-80" viewBox="0 0 200 250">
                <ellipse
                  cx="100"
                  cy="125"
                  rx="90"
                  ry="115"
                  fill="none"
                  stroke={status === 'success' ? '#19b987' : status === 'failed' ? '#ff0000' : '#0099ff'}
                  strokeWidth="3"
                  className="transition-all"
                />
              </svg>

              {/* Scanning animation */}
              {status === 'scanning' && (
                <motion.div
                  className="absolute w-64 h-1 bg-electric-400"
                  initial={{ top: '20%' }}
                  animate={{ top: '80%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}

              {/* Status icon */}
              <div className="relative z-10">
                {status === 'scanning' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Scan className="w-16 h-16 text-electric-400" />
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <Check className="w-16 h-16 text-success-600" />
                  </motion.div>
                )}
                {status === 'failed' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <X className="w-16 h-16 text-danger-600" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            {status === 'scanning' && (
              <p className="text-gray-600 dark:text-gray-400">
                Verifying identity securely...
              </p>
            )}
            {status === 'success' && (
              <div className="space-y-2">
                <p className="text-success-600">Identity verified successfully</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

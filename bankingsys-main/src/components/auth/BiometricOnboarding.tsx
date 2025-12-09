import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Check, Eye, RotateCcw, Shield } from 'lucide-react';
import { Button } from '../design-system/Button';
import { Card } from '../design-system/Card';

interface BiometricOnboardingProps {
  onNavigate: (page: string) => void;
}

export function BiometricOnboarding({ onNavigate }: BiometricOnboardingProps) {
  const [step, setStep] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

  const steps = [
    {
      title: 'Introduction to Facial Recognition',
      description: 'We\'ll use facial recognition to secure your account with biometric authentication.',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
            <h4 className="text-navy-900 dark:text-white mb-2">Why Facial Recognition?</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success-600 mt-0.5" />
                <span>Faster and more secure than passwords</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success-600 mt-0.5" />
                <span>Unique biometric signature</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success-600 mt-0.5" />
                <span>Liveness detection prevents spoofing</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Camera Test',
      description: 'We\'ll test your camera to ensure optimal conditions.',
      icon: Camera,
      content: (
        <div className="bg-gray-100 dark:bg-navy-700 rounded-xl p-8 aspect-video flex items-center justify-center">
          <div className="text-center">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Camera preview would appear here</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Face Capture',
      description: 'Position your face in the frame and stay still.',
      icon: Eye,
      content: (
        <div className="relative bg-navy-900 rounded-xl p-8 aspect-square max-w-sm mx-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Face Frame */}
            <svg className="absolute w-64 h-80" viewBox="0 0 200 250">
              <ellipse
                cx="100"
                cy="125"
                rx="90"
                ry="115"
                fill="none"
                stroke={isCapturing ? '#0099ff' : '#ffffff'}
                strokeWidth="3"
                strokeDasharray={isCapturing ? '0' : '10 5'}
                className="transition-all"
              />
            </svg>
            <div className="text-center">
              {isCapturing ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-electric-400"
                >
                  <Check className="w-16 h-16 mx-auto" />
                  <p className="text-white mt-4">Captured!</p>
                </motion.div>
              ) : (
                <Eye className="w-16 h-16 text-white/50" />
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Liveness Check',
      description: 'Follow the instructions to verify you\'re a real person.',
      icon: RotateCcw,
      content: (
        <div className="space-y-6">
          <div className="bg-navy-900 rounded-xl p-8 text-center">
            <RotateCcw className="w-16 h-16 text-electric-400 mx-auto mb-4 animate-spin" />
            <p className="text-white mb-2">Please blink naturally</p>
            <p className="text-gray-400 text-sm">This helps verify you're a real person</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4 text-center">
              <Check className="w-6 h-6 text-success-600 mx-auto mb-1" />
              <p className="text-sm text-success-700 dark:text-success-400">Blink detected</p>
            </div>
            <div className="bg-gray-100 dark:bg-navy-700 rounded-lg p-4 text-center">
              <RotateCcw className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Head turn pending</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Encryption & Confirmation',
      description: 'Your biometric data is encrypted and stored securely.',
      icon: Shield,
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-success-100 dark:bg-success-900/30 rounded-full mb-4">
              <Check className="w-12 h-12 text-success-600" />
            </div>
          </motion.div>
          <div>
            <h3 className="text-navy-900 dark:text-white mb-2">Setup Complete!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your biometric signature is encrypted with AES-256 encryption
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-navy-700 rounded-xl p-6 text-left">
            <h4 className="text-navy-900 dark:text-white mb-3">Security Features Active:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-success-600" />
                <span>256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-success-600" />
                <span>Liveness detection enabled</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-success-600" />
                <span>Anti-spoofing active</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-900 dark:to-navy-800 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <div className="mb-8">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                    ${index <= step 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 dark:bg-navy-700 text-gray-400'
                    }`}
                >
                  {index < step ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded-full transition-colors
                      ${index < step ? 'bg-primary-600' : 'bg-gray-200 dark:bg-navy-700'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
              <Icon className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-navy-900 dark:text-white mb-2">{currentStep.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{currentStep.description}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep.content}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              if (step === 2 && !isCapturing) {
                setIsCapturing(true);
                setTimeout(() => setIsCapturing(false), 1500);
              } else if (step < steps.length - 1) {
                setStep(step + 1);
              } else {
                onNavigate('dashboard');
              }
            }}
          >
            {step === steps.length - 1 ? 'Continue to Dashboard' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

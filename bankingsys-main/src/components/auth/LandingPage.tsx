import React from 'react';
import { Shield, Lock, Fingerprint, Eye } from 'lucide-react';
import { Button } from '../design-system/Button';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-8">
          <div className="flex items-center gap-4">
            <Shield className="w-16 h-16 text-electric-400" />
            <h1 className="text-white">SecureBank Identity</h1>
          </div>
          <p className="text-xl text-gray-300">
            Next-generation banking security with biometric authentication, virtual cards, and real-time fraud detection.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Lock className="w-8 h-8 text-electric-400 mb-2" />
              <h3 className="text-white mb-1">256-bit Encryption</h3>
              <p className="text-sm text-gray-300">Military-grade security</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Fingerprint className="w-8 h-8 text-electric-400 mb-2" />
              <h3 className="text-white mb-1">Biometric Auth</h3>
              <p className="text-sm text-gray-300">Face & fingerprint</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Eye className="w-8 h-8 text-electric-400 mb-2" />
              <h3 className="text-white mb-1">Liveness Detection</h3>
              <p className="text-sm text-gray-300">Anti-spoofing AI</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Shield className="w-8 h-8 text-electric-400 mb-2" />
              <h3 className="text-white mb-1">Real-time Monitoring</h3>
              <p className="text-sm text-gray-300">24/7 fraud detection</p>
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-navy-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Secure your financial identity
            </p>
          </div>
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => onNavigate('login')}
            >
              Login
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => onNavigate('register')}
            >
              Create Secure Account
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-navy-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your privacy is our priority
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <button className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </button>
              <button className="text-primary-600 hover:text-primary-700">
                Biometric Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

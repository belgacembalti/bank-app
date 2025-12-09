import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Scan, Shield, Fingerprint, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../design-system/Button';
import { Input } from '../design-system/Input';
import { Card } from '../design-system/Card';
import { Toggle } from '../design-system/Toggle';
import { login } from '../../services/api';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [use2FA, setUse2FA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Reset error
    setError(null);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      if (response.success) {
        // Navigate based on 2FA setting
        if (use2FA) {
          onNavigate('otp');
        } else {
          onNavigate('dashboard');
        }
      }
    } catch (err: any) {
      // Handle error
      const errorMessage = err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFacialLogin = () => {
    onNavigate('facial-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block text-white space-y-8"
        >
          <div>
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-electric-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-white mb-1">Welcome Back</h1>
                <p className="text-gray-300">Sign in to your secure account</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="w-12 h-12 bg-success-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-success-400" />
              </div>
              <div>
                <h4 className="text-white mb-1">Bank-Grade Security</h4>
                <p className="text-sm text-gray-300">256-bit encryption protects all your data</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Fingerprint className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h4 className="text-white mb-1">Biometric Authentication</h4>
                <p className="text-sm text-gray-300">Fast and secure facial recognition</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="w-12 h-12 bg-electric-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-electric-400" />
              </div>
              <div>
                <h4 className="text-white mb-1">Real-time Protection</h4>
                <p className="text-sm text-gray-300">24/7 fraud monitoring and alerts</p>
              </div>
            </motion.div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Trusted by over <span className="text-white">100,000+</span> users worldwide
            </p>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="backdrop-blur-xl bg-white/95 dark:bg-navy-800/95 border-white/20 shadow-2xl">
            <div className="lg:hidden mb-6">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-navy-900 dark:text-white mb-2">Sign In</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Access your secure banking portal
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-5">
              {error && (
                <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
                  <p className="text-sm text-danger-600 dark:text-danger-400">{error}</p>
                </div>
              )}
              
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  icon={<Lock className="w-5 h-5" />}
                  required
                />
                <div className="text-right mt-2">
                  <button type="button" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                    Forgot password?
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-electric-50 dark:from-primary-900/20 dark:to-electric-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-navy-900 dark:text-white">Two-Factor Auth</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Enhanced security</p>
                  </div>
                </div>
                <Toggle enabled={use2FA} onChange={setUse2FA} />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                Sign In
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-navy-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-navy-800 text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleFacialLogin}
                className="border-2 hover:bg-gradient-to-r hover:from-primary-50 hover:to-electric-50 dark:hover:from-primary-900/20 dark:hover:to-electric-900/20"
              >
                <Scan className="w-5 h-5" />
                Facial Recognition
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-navy-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('register')}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Create account
                </button>
              </p>
            </div>
          </Card>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-success-400" />
              <span className="text-sm text-white">Protected by 256-bit SSL Encryption</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
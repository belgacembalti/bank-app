import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Button } from '../design-system/Button';
import { Card } from '../design-system/Card';
import { apiClient } from '../../utils/api';

interface OTPPageProps {
  onNavigate: (page: string) => void;
}

export function OTPPage({ onNavigate }: OTPPageProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiClient.verifyOTP(code);
      
      if (response.data) {
        onNavigate('dashboard');
      } else {
        setError(response.error || 'Invalid OTP code. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-900 dark:to-navy-800 flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-navy-900 dark:text-white mb-2">Two-Factor Authentication</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
            <p className="text-sm text-danger-600 dark:text-danger-400">{error}</p>
          </div>
        )}

        <div className="flex gap-3 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-14 text-center border-2 border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800
                focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 outline-none transition-all"
            />
          ))}
        </div>

        <div className="text-center mb-6">
          {timer > 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              Code expires in <span className="text-primary-600">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(60)}
              className="text-primary-600 hover:text-primary-700"
            >
              Resend code
            </button>
          )}
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleVerify}
          loading={loading}
          disabled={otp.some((d) => !d)}
        >
          Verify
        </Button>
      </Card>
    </div>
  );
}

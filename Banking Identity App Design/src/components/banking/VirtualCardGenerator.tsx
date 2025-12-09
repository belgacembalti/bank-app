import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Check, Sparkles, Wallet } from 'lucide-react';
import { Button } from '../design-system/Button';
import { apiClient } from '../../utils/api';

interface VirtualCardGeneratorProps {
  onComplete: () => void;
}

export function VirtualCardGenerator({ onComplete }: VirtualCardGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardGenerated, setCardGenerated] = useState(false);
  const [error, setError] = useState('');
  const [cardData, setCardData] = useState<any>(null);

  const generateCard = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await apiClient.createVirtualCard();
      if (response.data) {
        const card = response.data;
        setCardData({
          number: card.card_number,
          expiry: `${String(card.expiry_month).padStart(2, '0')}/${String(card.expiry_year).slice(-2)}`,
          cvv: card.cvv,
          tokenId: card.token_id,
          status: card.status,
          spendingLimit: card.spending_limit,
        });
        setIsGenerating(false);
        setCardGenerated(true);
      } else {
        setError(response.error || 'Failed to generate card');
        setIsGenerating(false);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateCard();
  }, []);

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
          <p className="text-sm text-danger-600 dark:text-danger-400">{error}</p>
        </div>
      )}
      {isGenerating ? (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Sparkles className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-navy-900 dark:text-white mb-2">Generating Virtual Card</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Creating tokenized card with advanced encryption...
          </p>
        </div>
      ) : cardGenerated ? (
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-start justify-between mb-12">
                <div>
                  <p className="text-primary-100 text-sm mb-1">SecureBank Virtual Card</p>
                  <p className="text-xs text-primary-200">Tokenized & Encrypted</p>
                </div>
                <CreditCard className="w-8 h-8 text-white/80" />
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-primary-100 text-xs mb-2">Card Number</p>
                  <p className="text-2xl tracking-wider">{cardData.number}</p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="text-primary-100 text-xs mb-1">Expiry Date</p>
                    <p className="text-lg">{cardData.expiry}</p>
                  </div>
                  <div>
                    <p className="text-primary-100 text-xs mb-1">CVV</p>
                    <p className="text-lg">{cardData.cvv}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="bg-gray-50 dark:bg-navy-700 rounded-xl p-6">
            <h4 className="text-navy-900 dark:text-white mb-4">Card Details</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Token ID</span>
                <span className="text-navy-900 dark:text-white">{cardData.tokenId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="text-success-600 capitalize">{cardData.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Type</span>
                <span className="text-navy-900 dark:text-white capitalize">{cardData.status === 'active' ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Spending Limit</span>
                <span className="text-navy-900 dark:text-white">${parseFloat(cardData.spendingLimit || 1000).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-success-50 dark:bg-success-900/20 rounded-xl p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-success-600 mt-0.5" />
            <div>
              <p className="text-success-700 dark:text-success-400 mb-1">
                Card generated successfully
              </p>
              <p className="text-sm text-success-600 dark:text-success-500">
                Your virtual card is encrypted and ready to use. Add it to your digital wallet or use it for online purchases.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="primary" fullWidth onClick={onComplete}>
              <Wallet className="w-4 h-4" />
              Add to Wallet
            </Button>
            <Button variant="outline" fullWidth onClick={onComplete}>
              Done
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

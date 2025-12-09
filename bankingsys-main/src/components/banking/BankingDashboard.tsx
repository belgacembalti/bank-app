import React, { useCallback, useEffect, useState } from 'react';
import { CreditCard, Plus, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Badge } from '../design-system/Badge';
import { Modal } from '../design-system/Modal';
import { VirtualCardGenerator } from './VirtualCardGenerator';
import { getVirtualCards, VirtualCard } from '../../services/api';

export function BankingDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cards, setCards] = useState<VirtualCard[]>([]);
  const [cardError, setCardError] = useState<string | null>(null);

  const loadCards = useCallback(async () => {
    try {
      const data = await getVirtualCards();
      setCards(data);
      setCardError(null);
    } catch (err: any) {
      setCardError(err?.message || 'Unable to load virtual cards');
    }
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const transactions = [
    {
      id: 1,
      merchant: 'Apple Store',
      amount: -299.99,
      date: '2024-11-25',
      type: 'purchase',
      verificationScore: 98,
      risk: 'low',
    },
    {
      id: 2,
      merchant: 'Salary Deposit',
      amount: 5000.0,
      date: '2024-11-24',
      type: 'deposit',
      verificationScore: 100,
      risk: 'low',
    },
    {
      id: 3,
      merchant: 'Amazon',
      amount: -45.32,
      date: '2024-11-24',
      type: 'purchase',
      verificationScore: 95,
      risk: 'low',
    },
    {
      id: 4,
      merchant: 'Suspicious Transaction',
      amount: -1200.0,
      date: '2024-11-23',
      type: 'blocked',
      verificationScore: 23,
      risk: 'high',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-navy-900 dark:text-white mb-2">Banking Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your accounts and virtual cards
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowCardModal(true)}>
          <Plus className="w-4 h-4" />
          Generate Virtual Card
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-navy-700 to-navy-900 border-navy-800">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-gray-300 mb-2">Total Balance</p>
            <div className="flex items-center gap-3">
              {showBalance ? (
                <h2 className="text-white">$24,532.18</h2>
              ) : (
                <h2 className="text-white">••••••</h2>
              )}
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {showBalance ? (
                  <EyeOff className="w-5 h-5 text-gray-300" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
          <CreditCard className="w-8 h-8 text-electric-400" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Income</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success-400" />
              <span className="text-white">$5,234.00</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Expenses</p>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-danger-400" />
              <span className="text-white">$1,532.45</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Virtual Cards */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Virtual Cards</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-primary-100 text-sm mb-1">Virtual Card</p>
                <p className="text-xs text-primary-200">
                  {cards[0]?.status ? cards[0].status : 'No card yet'}
                </p>
              </div>
              <Badge variant="success" className="bg-success-500 text-white">
                {cards[0]?.status ? cards[0].status : 'None'}
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-primary-100 text-xs mb-1">Card Number</p>
                <p className="text-lg tracking-wider">
                  {cards[0]?.cardNumber || '•••• •••• •••• ••••'}
                </p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-primary-100 text-xs mb-1">Expires</p>
                  <p className="text-sm">
                    {cards[0]
                      ? `${String(cards[0].expiryMonth).padStart(2, '0')}/${cards[0].expiryYear}`
                      : '--/--'}
                  </p>
                </div>
                <div>
                  <p className="text-primary-100 text-xs mb-1">CVV</p>
                  <p className="text-sm">{cards[0]?.cvv ? cards[0].cvv : '•••'}</p>
                </div>
              </div>
            </div>
            {cardError && (
              <p className="mt-4 text-sm text-white/80">
                {cardError}
              </p>
            )}
          </div>
          <div className="border-2 border-dashed border-gray-300 dark:border-navy-600 rounded-xl p-6 flex items-center justify-center">
            <button
              onClick={() => setShowCardModal(true)}
              className="text-center"
            >
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">Generate New Card</p>
            </button>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Recent Transactions</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'deposit'
                      ? 'bg-success-100 dark:bg-success-900/30'
                      : transaction.type === 'blocked'
                      ? 'bg-danger-100 dark:bg-danger-900/30'
                      : 'bg-primary-100 dark:bg-primary-900/30'
                  }`}
                >
                  {transaction.type === 'deposit' ? (
                    <TrendingUp
                      className={`w-5 h-5 ${
                        transaction.type === 'deposit' ? 'text-success-600' : 'text-primary-600'
                      }`}
                    />
                  ) : (
                    <TrendingDown
                      className={`w-5 h-5 ${
                        transaction.type === 'blocked' ? 'text-danger-600' : 'text-primary-600'
                      }`}
                    />
                  )}
                </div>
                <div>
                  <p className="text-navy-900 dark:text-white">{transaction.merchant}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                    <Badge
                      variant={
                        transaction.risk === 'high'
                          ? 'danger'
                          : transaction.risk === 'medium'
                          ? 'warning'
                          : 'success'
                      }
                      size="sm"
                    >
                      {transaction.risk} risk
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`${
                    transaction.amount > 0
                      ? 'text-success-600'
                      : transaction.type === 'blocked'
                      ? 'text-danger-600'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Score: {transaction.verificationScore}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        title="Generate Virtual Card"
        size="lg"
      >
        <VirtualCardGenerator
          onComplete={() => setShowCardModal(false)}
          onCreated={() => {
            loadCards();
            setShowCardModal(false);
          }}
        />
      </Modal>
    </div>
  );
}

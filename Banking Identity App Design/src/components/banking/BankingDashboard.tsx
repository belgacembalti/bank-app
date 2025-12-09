import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Badge } from '../design-system/Badge';
import { Modal } from '../design-system/Modal';
import { VirtualCardGenerator } from './VirtualCardGenerator';
import { apiClient } from '../../utils/api';

export function BankingDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.getDashboard();
      if (response.data) {
        setDashboardData(response.data);
      } else {
        setError(response.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = async () => {
    try {
      const response = await apiClient.createVirtualCard();
      if (response.data) {
        // Refresh dashboard after creating card
        await fetchDashboard();
        setShowCardModal(false);
      } else {
        alert(response.error || 'Failed to create virtual card');
      }
    } catch (err) {
      alert('An unexpected error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
        <p className="text-danger-600 dark:text-danger-400">{error || 'Failed to load dashboard'}</p>
        <Button variant="primary" onClick={fetchDashboard} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

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
                <h2 className="text-white">${parseFloat(dashboardData.balance).toFixed(2)}</h2>
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
              <span className="text-white">${parseFloat(dashboardData.income || 0).toFixed(2)}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Expenses</p>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-danger-400" />
              <span className="text-white">${parseFloat(dashboardData.expenses || 0).toFixed(2)}</span>
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
          {dashboardData.virtual_cards && dashboardData.virtual_cards.length > 0 ? (
            dashboardData.virtual_cards.map((card: any) => (
              <div key={card.id} className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-primary-100 text-sm mb-1">Virtual Card</p>
                    <p className="text-xs text-primary-200 capitalize">{card.status}</p>
                  </div>
                  <Badge variant="success" className="bg-success-500 text-white">
                    {card.status}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-primary-100 text-xs mb-1">Card Number</p>
                    <p className="text-lg tracking-wider">{card.card_number}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-primary-100 text-xs mb-1">Expires</p>
                      <p className="text-sm">{String(card.expiry_month).padStart(2, '0')}/{String(card.expiry_year).slice(-2)}</p>
                    </div>
                    <div>
                      <p className="text-primary-100 text-xs mb-1">CVV</p>
                      <p className="text-sm">•••</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-navy-600 rounded-xl p-6 flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">No virtual cards yet</p>
            </div>
          )}
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
          {dashboardData.recent_transactions && dashboardData.recent_transactions.length > 0 ? (
            dashboardData.recent_transactions.map((transaction: any) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.transaction_type === 'deposit'
                        ? 'bg-success-100 dark:bg-success-900/30'
                        : transaction.transaction_type === 'blocked'
                        ? 'bg-danger-100 dark:bg-danger-900/30'
                        : 'bg-primary-100 dark:bg-primary-900/30'
                    }`}
                  >
                    {transaction.transaction_type === 'deposit' ? (
                      <TrendingUp
                        className={`w-5 h-5 ${
                          transaction.transaction_type === 'deposit' ? 'text-success-600' : 'text-primary-600'
                        }`}
                      />
                    ) : (
                      <TrendingDown
                        className={`w-5 h-5 ${
                          transaction.transaction_type === 'blocked' ? 'text-danger-600' : 'text-primary-600'
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-navy-900 dark:text-white">{transaction.merchant}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(transaction.created_at)}</p>
                      <Badge
                        variant={
                          transaction.risk_level === 'high'
                            ? 'danger'
                            : transaction.risk_level === 'medium'
                            ? 'warning'
                            : 'success'
                        }
                        size="sm"
                      >
                        {transaction.risk_level} risk
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`${
                      parseFloat(transaction.amount) > 0
                        ? 'text-success-600'
                        : transaction.transaction_type === 'blocked'
                        ? 'text-danger-600'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {parseFloat(transaction.amount) > 0 ? '+' : ''}${Math.abs(parseFloat(transaction.amount)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Score: {transaction.verification_score}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No transactions yet
            </div>
          )}
        </div>
      </Card>

      <Modal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        title="Generate Virtual Card"
        size="lg"
      >
        <VirtualCardGenerator onComplete={handleCreateCard} />
      </Modal>
    </div>
  );
}

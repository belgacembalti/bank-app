import React, { useState } from 'react';
import { CreditCard, Lock, Unlock, MapPin, DollarSign, Activity } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { Toggle } from '../design-system/Toggle';
import { Button } from '../design-system/Button';

export function VirtualCardDetails() {
  const [isFrozen, setIsFrozen] = useState(false);
  const [geoRestriction, setGeoRestriction] = useState(true);

  const cardActivity = [
    {
      id: 1,
      action: 'Transaction',
      merchant: 'Apple Store',
      amount: 299.99,
      date: '2024-11-25 14:32',
      status: 'approved',
    },
    {
      id: 2,
      action: 'Transaction',
      merchant: 'Amazon',
      amount: 45.32,
      date: '2024-11-24 10:15',
      status: 'approved',
    },
    {
      id: 3,
      action: 'Transaction Attempt',
      merchant: 'Unknown Merchant',
      amount: 1200.0,
      date: '2024-11-23 03:22',
      status: 'blocked',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">Virtual Card Details</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your virtual card settings and security
        </p>
      </div>

      {/* Card Display */}
      <Card padding="none" className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-white">
          <div className="flex items-start justify-between mb-12">
            <div>
              <p className="text-primary-100 text-sm mb-1">SecureBank Virtual Card</p>
              <Badge variant="success" className="bg-success-500 text-white">
                {isFrozen ? 'Frozen' : 'Active'}
              </Badge>
            </div>
            <CreditCard className="w-8 h-8 text-white/80" />
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-primary-100 text-xs mb-2">Card Number</p>
              <p className="text-2xl tracking-wider">4532 8765 1234 5678</p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-primary-100 text-xs mb-1">Expiry Date</p>
                <p className="text-lg">12/28</p>
              </div>
              <div>
                <p className="text-primary-100 text-xs mb-1">CVV</p>
                <p className="text-lg">•••</p>
              </div>
              <div>
                <p className="text-primary-100 text-xs mb-1">Token ID</p>
                <p className="text-lg">TKN-A7F2G9</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Card Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-danger-100 dark:bg-danger-900/30 rounded-lg">
              {isFrozen ? (
                <Lock className="w-6 h-6 text-danger-600" />
              ) : (
                <Unlock className="w-6 h-6 text-success-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-navy-900 dark:text-white">Freeze Card</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Temporarily disable transactions
                  </p>
                </div>
                <Toggle enabled={isFrozen} onChange={setIsFrozen} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-navy-900 dark:text-white">Geo-Restriction</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Limit to specific regions
                  </p>
                </div>
                <Toggle enabled={geoRestriction} onChange={setGeoRestriction} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Usage Limits */}
      <Card>
        <h3 className="text-navy-900 dark:text-white mb-6">Usage Limits</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Daily Limit</span>
              <span className="text-navy-900 dark:text-white">$345 / $1,000</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500" style={{ width: '34.5%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Monthly Limit</span>
              <span className="text-navy-900 dark:text-white">$2,345 / $5,000</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500" style={{ width: '46.9%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Card Activity */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Card Activity</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="space-y-3">
          {cardActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'blocked'
                      ? 'bg-danger-100 dark:bg-danger-900/30'
                      : 'bg-success-100 dark:bg-success-900/30'
                  }`}
                >
                  <Activity
                    className={`w-5 h-5 ${
                      activity.status === 'blocked' ? 'text-danger-600' : 'text-success-600'
                    }`}
                  />
                </div>
                <div>
                  <p className="text-navy-900 dark:text-white">{activity.merchant}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-navy-900 dark:text-white">${activity.amount.toFixed(2)}</p>
                <Badge
                  variant={activity.status === 'approved' ? 'success' : 'danger'}
                  size="sm"
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800">
        <h4 className="text-danger-700 dark:text-danger-400 mb-2">Danger Zone</h4>
        <p className="text-sm text-danger-600 dark:text-danger-500 mb-4">
          Permanently delete this virtual card. This action cannot be undone.
        </p>
        <Button variant="danger">Delete Virtual Card</Button>
      </Card>
    </div>
  );
}

import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { Input } from '../design-system/Input';
import { Button } from '../design-system/Button';
import { TrustScore } from '../design-system/TrustScore';

export function UserMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      trustScore: 95,
      lastLogin: '2024-11-25 14:32',
      location: 'New York, US',
      status: 'active',
      anomalies: 0,
      devices: 2,
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      trustScore: 88,
      lastLogin: '2024-11-25 13:15',
      location: 'London, UK',
      status: 'active',
      anomalies: 1,
      devices: 3,
    },
    {
      id: 3,
      email: 'suspicious@example.com',
      name: 'Suspicious User',
      trustScore: 34,
      lastLogin: '2024-11-25 03:22',
      location: 'Unknown',
      status: 'flagged',
      anomalies: 5,
      devices: 1,
    },
    {
      id: 4,
      email: 'alice.johnson@example.com',
      name: 'Alice Johnson',
      trustScore: 92,
      lastLogin: '2024-11-24 16:45',
      location: 'San Francisco, US',
      status: 'active',
      anomalies: 0,
      devices: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">User Risk Monitoring</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor user behavior and identify security anomalies
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CheckCircle className="w-8 h-8 text-success-600 mx-auto mb-2" />
          <p className="text-2xl text-success-600 mb-1">
            {users.filter((u) => u.status === 'active').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
        </Card>
        <Card className="text-center">
          <AlertTriangle className="w-8 h-8 text-warning-600 mx-auto mb-2" />
          <p className="text-2xl text-warning-600 mb-1">
            {users.filter((u) => u.anomalies > 0).length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">With Anomalies</p>
        </Card>
        <Card className="text-center">
          <XCircle className="w-8 h-8 text-danger-600 mx-auto mb-2" />
          <p className="text-2xl text-danger-600 mb-1">
            {users.filter((u) => u.status === 'flagged').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Flagged</p>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-primary-600 mb-1">
            {Math.round(users.reduce((acc, u) => acc + u.trustScore, 0) / users.length)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Trust Score</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Users Table */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                user.status === 'flagged'
                  ? 'bg-danger-50 dark:bg-danger-900/20 border-danger-300 dark:border-danger-700'
                  : user.anomalies > 0
                  ? 'bg-warning-50 dark:bg-warning-900/20 border-warning-300 dark:border-warning-700'
                  : 'bg-gray-50 dark:bg-navy-700 border-gray-200 dark:border-navy-600'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <TrustScore score={user.trustScore} size="sm" showLabel={false} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-navy-900 dark:text-white">{user.name}</h4>
                      <Badge
                        variant={
                          user.status === 'flagged'
                            ? 'danger'
                            : user.status === 'active'
                            ? 'success'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Last login: {user.lastLogin}</span>
                      <span>Location: {user.location}</span>
                      <span>Devices: {user.devices}</span>
                      {user.anomalies > 0 && (
                        <span className="text-danger-600">Anomalies: {user.anomalies}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {user.status === 'flagged' && (
                    <Button variant="danger" size="sm">
                      Suspend
                    </Button>
                  )}
                </div>
              </div>

              {user.anomalies > 0 && (
                <div className="pt-4 border-t border-current/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-warning-700 dark:text-warning-400 mb-1">
                        Suspicious Activity Detected
                      </p>
                      <ul className="text-warning-600 dark:text-warning-500 space-y-1">
                        <li>• Login from unusual location</li>
                        {user.anomalies > 1 && <li>• Multiple failed authentication attempts</li>}
                        {user.anomalies > 2 && <li>• Device fingerprint mismatch</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

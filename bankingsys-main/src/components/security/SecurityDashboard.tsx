import React from 'react';
import { Shield, AlertTriangle, Monitor, Clock } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { TrustScore } from '../design-system/TrustScore';

export function SecurityDashboard() {
  const loginAttempts = [
    { id: 1, time: '2 minutes ago', location: 'New York, US', device: 'iPhone 14 Pro', status: 'success' },
    { id: 2, time: '1 hour ago', location: 'New York, US', device: 'MacBook Pro', status: 'success' },
    { id: 3, time: '3 hours ago', location: 'London, UK', device: 'Unknown', status: 'blocked' },
  ];

  const activeSessions = [
    { id: 1, device: 'iPhone 14 Pro', location: 'New York, US', ip: '192.168.1.1', current: true },
    { id: 2, device: 'MacBook Pro', location: 'New York, US', ip: '192.168.1.2', current: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">Security Center</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account security and monitor activity
        </p>
      </div>

      {/* Trust Score */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-navy-900 dark:text-white">Trust Score</h3>
          <Badge variant="success">Excellent</Badge>
        </div>
        <div className="flex items-center gap-8">
          <TrustScore score={92} size="lg" />
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Biometric Verified</span>
                <span className="text-sm text-success-600">100%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                <div className="h-full bg-success-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Device Trust</span>
                <span className="text-sm text-success-600">95%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                <div className="h-full bg-success-500" style={{ width: '95%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Location Pattern</span>
                <span className="text-sm text-warning-600">85%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                <div className="h-full bg-warning-500" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
          <Shield className="w-8 h-8 text-primary-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Biometric Status</h4>
          <p className="text-2xl text-primary-600 mb-1">Active</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last verified 2 min ago</p>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
          <Monitor className="w-8 h-8 text-success-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Active Sessions</h4>
          <p className="text-2xl text-success-600 mb-1">{activeSessions.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">2 trusted devices</p>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
          <AlertTriangle className="w-8 h-8 text-warning-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Alerts</h4>
          <p className="text-2xl text-warning-600 mb-1">1</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Login from new location</p>
        </Card>
      </div>

      {/* Latest Login Attempts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Latest Login Attempts</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="space-y-4">
          {loginAttempts.map((attempt) => (
            <div
              key={attempt.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-navy-900 dark:text-white">{attempt.device}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {attempt.location} • {attempt.time}
                  </p>
                </div>
              </div>
              <Badge variant={attempt.status === 'success' ? 'success' : 'danger'}>
                {attempt.status === 'success' ? 'Success' : 'Blocked'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Sessions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Active Sessions</h3>
        </div>
        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Monitor className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-navy-900 dark:text-white">{session.device}</p>
                    {session.current && <Badge variant="primary" size="sm">Current</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.location} • {session.ip}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button className="text-sm text-danger-600 hover:text-danger-700">
                  End session
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

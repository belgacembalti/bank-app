import React, { useState } from 'react';
import { Search, Filter, Download, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { Input } from '../design-system/Input';
import { Button } from '../design-system/Button';

export function AccessLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    {
      id: 1,
      type: 'login',
      status: 'success',
      timestamp: '2024-11-25 14:32:15',
      location: 'New York, US',
      ip: '192.168.1.1',
      device: 'iPhone 14 Pro',
      biometricScore: 98,
    },
    {
      id: 2,
      type: 'login',
      status: 'success',
      timestamp: '2024-11-25 13:15:42',
      location: 'New York, US',
      ip: '192.168.1.2',
      device: 'MacBook Pro',
      biometricScore: 95,
    },
    {
      id: 3,
      type: 'login',
      status: 'failed',
      timestamp: '2024-11-25 11:22:08',
      location: 'London, UK',
      ip: '85.12.45.78',
      device: 'Unknown',
      biometricScore: 45,
    },
    {
      id: 4,
      type: 'password_change',
      status: 'success',
      timestamp: '2024-11-24 09:45:22',
      location: 'New York, US',
      ip: '192.168.1.1',
      device: 'iPhone 14 Pro',
      biometricScore: 97,
    },
    {
      id: 5,
      type: 'login',
      status: 'blocked',
      timestamp: '2024-11-24 03:12:55',
      location: 'Moscow, RU',
      ip: '188.45.32.11',
      device: 'Unknown',
      biometricScore: 12,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">Access Logs</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all account activity and security events
        </p>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-navy-700">
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Location</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Device</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">IP Address</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Bio Score</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700/50"
                >
                  <td className="py-4 px-4">
                    {log.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-success-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-danger-600" />
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        log.type === 'login'
                          ? 'primary'
                          : log.type === 'password_change'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {log.type.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {log.timestamp}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {log.location}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {log.device}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {log.ip}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Shield
                        className={`w-4 h-4 ${
                          log.biometricScore >= 80
                            ? 'text-success-600'
                            : log.biometricScore >= 50
                            ? 'text-warning-600'
                            : 'text-danger-600'
                        }`}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {log.biometricScore}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

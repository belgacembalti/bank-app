import React from 'react';
import { Smartphone, Laptop, Monitor, AlertTriangle } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { Button } from '../design-system/Button';

export function TrustedDevices() {
  const devices = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      type: 'mobile',
      lastUsed: '2 minutes ago',
      location: 'New York, US',
      riskLevel: 'low',
      trusted: true,
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'laptop',
      lastUsed: '1 hour ago',
      location: 'New York, US',
      riskLevel: 'low',
      trusted: true,
    },
    {
      id: 3,
      name: 'Desktop PC',
      type: 'desktop',
      lastUsed: '2 days ago',
      location: 'London, UK',
      riskLevel: 'medium',
      trusted: false,
    },
  ];

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return Smartphone;
      case 'laptop':
        return Laptop;
      default:
        return Monitor;
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge variant="success">Low Risk</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Risk</Badge>;
      case 'high':
        return <Badge variant="danger">High Risk</Badge>;
      default:
        return <Badge variant="neutral">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">Trusted Devices</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage devices that can access your account
        </p>
      </div>

      <div className="grid gap-6">
        {devices.map((device) => {
          const Icon = getDeviceIcon(device.type);
          return (
            <Card key={device.id} hover>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-navy-900 dark:text-white">{device.name}</h4>
                      {device.trusted && <Badge variant="success" size="sm">Trusted</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Last used {device.lastUsed}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {device.location}
                      </span>
                      {getRiskBadge(device.riskLevel)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!device.trusted && (
                    <Button variant="outline" size="sm">
                      Trust Device
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Require Re-auth
                  </Button>
                  <Button variant="danger" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
              {device.riskLevel === 'medium' && (
                <div className="mt-4 p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning-600 mt-0.5" />
                  <div>
                    <p className="text-warning-700 dark:text-warning-400">
                      Unusual location detected
                    </p>
                    <p className="text-sm text-warning-600 dark:text-warning-500">
                      This device was recently used from a different location
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

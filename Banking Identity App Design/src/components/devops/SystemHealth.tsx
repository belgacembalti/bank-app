import React from 'react';
import { Server, Database, Cpu, HardDrive, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SystemHealth() {
  const apiUptimeData = [
    { time: '00:00', uptime: 99.98 },
    { time: '04:00', uptime: 99.99 },
    { time: '08:00', uptime: 99.95 },
    { time: '12:00', uptime: 99.97 },
    { time: '16:00', uptime: 99.99 },
    { time: '20:00', uptime: 100 },
    { time: '24:00', uptime: 99.98 },
  ];

  const microservices = [
    { name: 'Auth Service', status: 'healthy', uptime: 99.98, responseTime: 45 },
    { name: 'Biometric Service', status: 'healthy', uptime: 99.95, responseTime: 156 },
    { name: 'Card Service', status: 'healthy', uptime: 99.99, responseTime: 78 },
    { name: 'Transaction Service', status: 'degraded', uptime: 98.45, responseTime: 345 },
    { name: 'Notification Service', status: 'healthy', uptime: 99.96, responseTime: 92 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">System Health Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor infrastructure and microservices status
        </p>
      </div>

      {/* System Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
          <Activity className="w-8 h-8 text-success-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">API Uptime</h4>
          <p className="text-3xl text-success-600 mb-1">99.98%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last 24 hours</p>
        </Card>

        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
          <Cpu className="w-8 h-8 text-primary-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">GPU Usage</h4>
          <p className="text-3xl text-primary-600 mb-1">68%</p>
          <div className="w-full h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-primary-500" style={{ width: '68%' }} />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-electric-50 to-electric-100 dark:from-electric-900/20 dark:to-electric-800/20 border-electric-200 dark:border-electric-800">
          <Database className="w-8 h-8 text-electric-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">DB Latency</h4>
          <p className="text-3xl text-electric-600 mb-1">12ms</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg query time</p>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
          <HardDrive className="w-8 h-8 text-warning-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Storage Usage</h4>
          <p className="text-3xl text-warning-600 mb-1">72%</p>
          <div className="w-full h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-warning-500" style={{ width: '72%' }} />
          </div>
        </Card>
      </div>

      {/* API Uptime Chart */}
      <Card>
        <h3 className="text-navy-900 dark:text-white mb-6">API Uptime Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={apiUptimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
            <XAxis dataKey="time" stroke="#6c757d" />
            <YAxis domain={[99, 100]} stroke="#6c757d" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="uptime"
              stroke="#19b987"
              strokeWidth={3}
              dot={{ fill: '#19b987', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Microservices Status */}
      <Card>
        <h3 className="text-navy-900 dark:text-white mb-6">Microservices Status</h3>
        <div className="space-y-4">
          {microservices.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    service.status === 'healthy'
                      ? 'bg-success-100 dark:bg-success-900/30'
                      : service.status === 'degraded'
                      ? 'bg-warning-100 dark:bg-warning-900/30'
                      : 'bg-danger-100 dark:bg-danger-900/30'
                  }`}
                >
                  {service.status === 'healthy' ? (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-navy-900 dark:text-white">{service.name}</h4>
                    <Badge
                      variant={
                        service.status === 'healthy'
                          ? 'success'
                          : service.status === 'degraded'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {service.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Uptime: {service.uptime}% • Response: {service.responseTime}ms
                  </p>
                </div>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-700">
                View logs
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Infrastructure */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-navy-900 dark:text-white mb-4">Servers</h3>
          <div className="space-y-3">
            {['us-east-1', 'us-west-2', 'eu-west-1'].map((region) => (
              <div key={region} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-gray-400" />
                  <span className="text-navy-900 dark:text-white">{region}</span>
                </div>
                <Badge variant="success" size="sm">Online</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-navy-900 dark:text-white mb-4">Databases</h3>
          <div className="space-y-3">
            {['Primary', 'Replica 1', 'Replica 2'].map((db) => (
              <div key={db} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-400" />
                  <span className="text-navy-900 dark:text-white">{db}</span>
                </div>
                <Badge variant="success" size="sm">Synced</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

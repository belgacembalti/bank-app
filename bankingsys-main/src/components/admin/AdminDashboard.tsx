import React from 'react';
import { Users, Shield, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function AdminDashboard() {
  const loginTrendData = [
    { date: '11/19', success: 1245, failed: 23, blocked: 5 },
    { date: '11/20', success: 1432, failed: 18, blocked: 8 },
    { date: '11/21', success: 1389, failed: 31, blocked: 12 },
    { date: '11/22', success: 1556, failed: 25, blocked: 6 },
    { date: '11/23', success: 1678, failed: 19, blocked: 9 },
    { date: '11/24', success: 1823, failed: 22, blocked: 7 },
    { date: '11/25', success: 1945, failed: 15, blocked: 4 },
  ];

  const biometricAccuracyData = [
    { name: 'Excellent', value: 85, color: '#19b987' },
    { name: 'Good', value: 12, color: '#ffb900' },
    { name: 'Poor', value: 3, color: '#ff0000' },
  ];

  const riskDistribution = [
    { hour: '00:00', low: 45, medium: 12, high: 2 },
    { hour: '04:00', low: 23, medium: 5, high: 1 },
    { hour: '08:00', low: 156, medium: 23, high: 4 },
    { hour: '12:00', low: 234, medium: 34, high: 7 },
    { hour: '16:00', low: 189, medium: 28, high: 5 },
    { hour: '20:00', low: 167, medium: 21, high: 3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor system health and security analytics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
          <Users className="w-8 h-8 text-primary-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Total Users</h4>
          <p className="text-3xl text-primary-600 mb-1">24,532</p>
          <div className="flex items-center gap-1 text-sm text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% this month</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
          <Shield className="w-8 h-8 text-success-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Auth Success Rate</h4>
          <p className="text-3xl text-success-600 mb-1">98.7%</p>
          <div className="flex items-center gap-1 text-sm text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span>+0.3% vs last week</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
          <AlertTriangle className="w-8 h-8 text-warning-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Active Threats</h4>
          <p className="text-3xl text-warning-600 mb-1">7</p>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Activity className="w-4 h-4" />
            <span>Monitoring</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-electric-50 to-electric-100 dark:from-electric-900/20 dark:to-electric-800/20 border-electric-200 dark:border-electric-800">
          <Activity className="w-8 h-8 text-electric-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Avg Response Time</h4>
          <p className="text-3xl text-electric-600 mb-1">245ms</p>
          <div className="flex items-center gap-1 text-sm text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span>15% faster</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-navy-900 dark:text-white mb-6">Authentication Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={loginTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis dataKey="date" stroke="#6c757d" />
              <YAxis stroke="#6c757d" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="success"
                stackId="1"
                stroke="#19b987"
                fill="#19b987"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="failed"
                stackId="1"
                stroke="#ffb900"
                fill="#ffb900"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stackId="1"
                stroke="#ff0000"
                fill="#ff0000"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-navy-900 dark:text-white mb-6">Biometric Accuracy</h3>
          <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={biometricAccuracyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {biometricAccuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <h3 className="text-navy-900 dark:text-white mb-6">Risk Distribution by Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
            <XAxis dataKey="hour" stroke="#6c757d" />
            <YAxis stroke="#6c757d" />
            <Tooltip />
            <Bar dataKey="low" stackId="a" fill="#19b987" />
            <Bar dataKey="medium" stackId="a" fill="#ffb900" />
            <Bar dataKey="high" stackId="a" fill="#ff0000" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Recent Security Alerts</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="space-y-3">
          {[
            {
              id: 1,
              type: 'High Risk Login',
              user: 'user@example.com',
              time: '5 minutes ago',
              severity: 'danger',
            },
            {
              id: 2,
              type: 'Multiple Failed Attempts',
              user: 'john@example.com',
              time: '12 minutes ago',
              severity: 'warning',
            },
            {
              id: 3,
              type: 'New Device Authorized',
              user: 'jane@example.com',
              time: '25 minutes ago',
              severity: 'primary',
            },
          ].map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
            >
              <div>
                <p className="text-navy-900 dark:text-white mb-1">{alert.type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alert.user} • {alert.time}
                </p>
              </div>
              <Badge
                variant={alert.severity as 'danger' | 'warning' | 'primary'}
              >
                {alert.severity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

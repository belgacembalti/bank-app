import React, { useState, useEffect } from 'react';
import { Users, Shield, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { apiClient } from '../../utils/api';
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
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.getAdminDashboard();
      if (response.data) {
        setAdminData(response.data);
      } else {
        setError(response.error || 'Failed to load admin data');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !adminData) {
    return (
      <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
        <p className="text-danger-600 dark:text-danger-400">{error || 'Failed to load admin data'}</p>
        <button onClick={fetchAdminData} className="mt-4 text-primary-600 hover:text-primary-700">
          Retry
        </button>
      </div>
    );
  }

  const loginTrendData = adminData.login_trends || [];
  const biometricAccuracyData = [
    { name: 'Excellent', value: adminData.biometric_accuracy?.excellent || 85, color: '#19b987' },
    { name: 'Good', value: adminData.biometric_accuracy?.good || 12, color: '#ffb900' },
    { name: 'Poor', value: adminData.biometric_accuracy?.poor || 3, color: '#ff0000' },
  ];
  const riskDistribution = adminData.risk_distribution || [];

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
          <p className="text-3xl text-primary-600 mb-1">{adminData.total_users || 0}</p>
          <div className="flex items-center gap-1 text-sm text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% this month</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
          <Shield className="w-8 h-8 text-success-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Auth Success Rate</h4>
          <p className="text-3xl text-success-600 mb-1">{adminData.auth_success_rate || 0}%</p>
          <div className="flex items-center gap-1 text-sm text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span>+0.3% vs last week</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
          <AlertTriangle className="w-8 h-8 text-warning-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Active Threats</h4>
          <p className="text-3xl text-warning-600 mb-1">{adminData.active_threats || 0}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Activity className="w-4 h-4" />
            <span>Monitoring</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-electric-50 to-electric-100 dark:from-electric-900/20 dark:to-electric-800/20 border-electric-200 dark:border-electric-800">
          <Activity className="w-8 h-8 text-electric-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Avg Response Time</h4>
          <p className="text-3xl text-electric-600 mb-1">{adminData.avg_response_time || 0}ms</p>
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
          {(adminData.recent_alerts || []).map((alert: any) => (
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
                variant={alert.severity === 'high' || alert.severity === 'critical' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'primary'}
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

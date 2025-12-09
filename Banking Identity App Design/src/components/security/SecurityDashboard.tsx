import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Monitor, Clock } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { TrustScore } from '../design-system/TrustScore';
import { apiClient } from '../../utils/api';

export function SecurityDashboard() {
  const [securityData, setSecurityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.getSecurityDashboard();
      if (response.data) {
        setSecurityData(response.data);
      } else {
        setError(response.error || 'Failed to load security data');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading security data...</p>
        </div>
      </div>
    );
  }

  if (error || !securityData) {
    return (
      <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
        <p className="text-danger-600 dark:text-danger-400">{error || 'Failed to load security data'}</p>
        <button onClick={fetchSecurityData} className="mt-4 text-primary-600 hover:text-primary-700">
          Retry
        </button>
      </div>
    );
  }

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
          <TrustScore score={securityData.trust_score || 92} size="lg" />
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
          <p className="text-2xl text-primary-600 mb-1">{securityData.biometric_status || 'Inactive'}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last verified recently</p>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
          <Monitor className="w-8 h-8 text-success-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Active Sessions</h4>
          <p className="text-2xl text-success-600 mb-1">{securityData.active_sessions || 0}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{securityData.active_sessions || 0} trusted devices</p>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
          <AlertTriangle className="w-8 h-8 text-warning-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Alerts</h4>
          <p className="text-2xl text-warning-600 mb-1">{securityData.alerts_count || 0}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{securityData.alerts_count || 0} active alerts</p>
        </Card>
      </div>

      {/* Latest Login Attempts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Latest Login Attempts</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="space-y-4">
          {securityData.login_attempts && securityData.login_attempts.length > 0 ? (
            securityData.login_attempts.map((attempt: any) => (
              <div
                key={attempt.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-navy-900 dark:text-white">{attempt.device_name || 'Unknown Device'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {attempt.location || 'Unknown'} • {formatTimeAgo(attempt.created_at)}
                    </p>
                  </div>
                </div>
                <Badge variant={attempt.status === 'success' ? 'success' : attempt.status === 'blocked' ? 'danger' : 'warning'}>
                  {attempt.status === 'success' ? 'Success' : attempt.status === 'blocked' ? 'Blocked' : 'Failed'}
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No login attempts yet
            </div>
          )}
        </div>
      </Card>

      {/* Active Sessions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">Active Sessions</h3>
        </div>
        <div className="space-y-4">
          {securityData.active_sessions_list && securityData.active_sessions_list.length > 0 ? (
            securityData.active_sessions_list.map((session: any) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-navy-900 dark:text-white">{session.device || 'Unknown Device'}</p>
                      {session.current && <Badge variant="primary" size="sm">Current</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.location || 'Unknown'} • {session.ip || 'Unknown IP'}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button 
                    className="text-sm text-danger-600 hover:text-danger-700"
                    onClick={async () => {
                      try {
                        await apiClient.deleteTrustedDevice(session.id);
                        fetchSecurityData();
                      } catch (err) {
                        alert('Failed to end session');
                      }
                    }}
                  >
                    End session
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No active sessions
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

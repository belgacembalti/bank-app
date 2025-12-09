import React from 'react';
import { Scan, TrendingUp, Database, Activity } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Badge } from '../design-system/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function BiometricAudit() {
  const matchingScoreHistory = [
    { date: '11/19', avgScore: 94.2, minScore: 78, maxScore: 99 },
    { date: '11/20', avgScore: 95.1, minScore: 82, maxScore: 99 },
    { date: '11/21', avgScore: 93.8, minScore: 75, maxScore: 98 },
    { date: '11/22', avgScore: 96.3, minScore: 85, maxScore: 99 },
    { date: '11/23', avgScore: 95.7, minScore: 80, maxScore: 99 },
    { date: '11/24', avgScore: 97.2, minScore: 88, maxScore: 99 },
    { date: '11/25', avgScore: 96.8, minScore: 86, maxScore: 99 },
  ];

  const modelVersions = [
    {
      id: 1,
      version: 'v3.2.1',
      deployedDate: '2024-11-15',
      accuracy: 98.7,
      status: 'active',
      totalScans: 145234,
    },
    {
      id: 2,
      version: 'v3.1.5',
      deployedDate: '2024-10-22',
      accuracy: 97.8,
      status: 'deprecated',
      totalScans: 234567,
    },
  ];

  const userEmbeddings = [
    {
      id: 1,
      userId: 'user_12345',
      email: 'john.doe@example.com',
      embeddingQuality: 98.5,
      lastUpdate: '2024-11-25 14:32',
      livenessScore: 97,
    },
    {
      id: 2,
      userId: 'user_67890',
      email: 'jane.smith@example.com',
      embeddingQuality: 95.2,
      lastUpdate: '2024-11-25 13:15',
      livenessScore: 94,
    },
    {
      id: 3,
      userId: 'user_11111',
      email: 'suspicious@example.com',
      embeddingQuality: 67.3,
      lastUpdate: '2024-11-25 03:22',
      livenessScore: 45,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">Biometric Audit Panel</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor biometric system performance and model versions
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
          <Scan className="w-8 h-8 text-primary-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Total Scans</h4>
          <p className="text-3xl text-primary-600 mb-1">379,801</p>
          <div className="flex items-center gap-1 text-sm text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span>+8.2% today</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800">
          <Activity className="w-8 h-8 text-success-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Avg Accuracy</h4>
          <p className="text-3xl text-success-600 mb-1">96.8%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</p>
        </Card>

        <Card className="bg-gradient-to-br from-electric-50 to-electric-100 dark:from-electric-900/20 dark:to-electric-800/20 border-electric-200 dark:border-electric-800">
          <Database className="w-8 h-8 text-electric-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Model Version</h4>
          <p className="text-3xl text-electric-600 mb-1">v3.2.1</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Latest</p>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-800">
          <Scan className="w-8 h-8 text-warning-600 mb-3" />
          <h4 className="text-navy-900 dark:text-white mb-1">Failed Scans</h4>
          <p className="text-3xl text-warning-600 mb-1">234</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">0.06% failure rate</p>
        </Card>
      </div>

      {/* Matching Score Trend */}
      <Card>
        <h3 className="text-navy-900 dark:text-white mb-6">Matching Score History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={matchingScoreHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
            <XAxis dataKey="date" stroke="#6c757d" />
            <YAxis domain={[0, 100]} stroke="#6c757d" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="avgScore"
              stroke="#0066ff"
              strokeWidth={3}
              dot={{ fill: '#0066ff', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="minScore"
              stroke="#ffb900"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="maxScore"
              stroke="#19b987"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Model Versions */}
      <Card>
        <h3 className="text-navy-900 dark:text-white mb-6">Liveness Model Versions</h3>
        <div className="space-y-4">
          {modelVersions.map((model) => (
            <div
              key={model.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Database className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-navy-900 dark:text-white">{model.version}</h4>
                    <Badge variant={model.status === 'active' ? 'success' : 'neutral'} size="sm">
                      {model.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deployed: {model.deployedDate} • {model.totalScans.toLocaleString()} total scans
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl text-success-600">{model.accuracy}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* User Embeddings */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-navy-900 dark:text-white">User Embeddings</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-navy-700">
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">User</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  Embedding Quality
                </th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  Liveness Score
                </th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  Last Update
                </th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {userEmbeddings.map((embedding) => (
                <tr
                  key={embedding.id}
                  className="border-b border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700/50"
                >
                  <td className="py-4 px-4">
                    <p className="text-navy-900 dark:text-white">{embedding.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{embedding.userId}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[120px]">
                        <div className="h-2 bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              embedding.embeddingQuality >= 90
                                ? 'bg-success-500'
                                : embedding.embeddingQuality >= 70
                                ? 'bg-warning-500'
                                : 'bg-danger-500'
                            }`}
                            style={{ width: `${embedding.embeddingQuality}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {embedding.embeddingQuality.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        embedding.livenessScore >= 80
                          ? 'success'
                          : embedding.livenessScore >= 50
                          ? 'warning'
                          : 'danger'
                      }
                    >
                      {embedding.livenessScore}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {embedding.lastUpdate}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        embedding.embeddingQuality >= 90 && embedding.livenessScore >= 80
                          ? 'success'
                          : 'warning'
                      }
                    >
                      {embedding.embeddingQuality >= 90 && embedding.livenessScore >= 80
                        ? 'Good'
                        : 'Review'}
                    </Badge>
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

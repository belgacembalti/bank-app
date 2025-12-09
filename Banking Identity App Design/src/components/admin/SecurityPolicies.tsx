import React, { useState } from 'react';
import { Shield, Clock, Lock, MapPin, Smartphone, Save } from 'lucide-react';
import { Card } from '../design-system/Card';
import { Input } from '../design-system/Input';
import { Toggle } from '../design-system/Toggle';
import { Button } from '../design-system/Button';

export function SecurityPolicies() {
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [minPasswordLength, setMinPasswordLength] = useState('12');
  const [minLiveness, setMinLiveness] = useState('80');
  const [requireUppercase, setRequireUppercase] = useState(true);
  const [requireNumbers, setRequireNumbers] = useState(true);
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);
  const [geoFencing, setGeoFencing] = useState(true);
  const [deviceTrust, setDeviceTrust] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-navy-900 dark:text-white mb-2">Security Policies</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure global security rules and requirements
          </p>
        </div>
        <Button variant="primary">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      {/* Session Management */}
      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Clock className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-navy-900 dark:text-white mb-2">Session Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Control session timeout and idle behavior
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            helperText="Maximum session duration"
          />
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
            <div>
              <p className="text-navy-900 dark:text-white mb-1">Auto-logout on idle</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Log out users after inactivity
              </p>
            </div>
            <Toggle enabled={true} onChange={() => {}} />
          </div>
        </div>
      </Card>

      {/* Password Policies */}
      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-lg">
            <Lock className="w-6 h-6 text-success-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-navy-900 dark:text-white mb-2">Password Strength Rules</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Define password complexity requirements
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            label="Minimum Password Length"
            type="number"
            value={minPasswordLength}
            onChange={(e) => setMinPasswordLength(e.target.value)}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <span className="text-navy-900 dark:text-white">Require uppercase letters</span>
              <Toggle enabled={requireUppercase} onChange={setRequireUppercase} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <span className="text-navy-900 dark:text-white">Require numbers</span>
              <Toggle enabled={requireNumbers} onChange={setRequireNumbers} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <span className="text-navy-900 dark:text-white">Require special characters</span>
              <Toggle enabled={requireSpecialChars} onChange={setRequireSpecialChars} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <span className="text-navy-900 dark:text-white">Password expiration (90 days)</span>
              <Toggle enabled={false} onChange={() => {}} />
            </div>
          </div>
        </div>
      </Card>

      {/* Biometric Policies */}
      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-electric-100 dark:bg-electric-900/30 rounded-lg">
            <Shield className="w-6 h-6 text-electric-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-navy-900 dark:text-white mb-2">Biometric Requirements</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Set minimum liveness detection thresholds
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            label="Minimum Liveness Score"
            type="number"
            value={minLiveness}
            onChange={(e) => setMinLiveness(e.target.value)}
            helperText="Score from 0-100, higher is stricter"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <span className="text-navy-900 dark:text-white">Require liveness check</span>
              <Toggle enabled={true} onChange={() => {}} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <span className="text-navy-900 dark:text-white">Allow facial recognition login</span>
              <Toggle enabled={true} onChange={() => {}} />
            </div>
          </div>
        </div>
      </Card>

      {/* Geographic & Device Policies */}
      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-warning-100 dark:bg-warning-900/30 rounded-lg">
            <MapPin className="w-6 h-6 text-warning-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-navy-900 dark:text-white mb-2">Geo-Fencing & Device Rules</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Control access based on location and device trust
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
            <div>
              <p className="text-navy-900 dark:text-white mb-1">Enable geo-fencing</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Block logins from restricted regions</p>
            </div>
            <Toggle enabled={geoFencing} onChange={setGeoFencing} />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
            <div>
              <p className="text-navy-900 dark:text-white mb-1">Device trust required</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Only allow trusted devices</p>
            </div>
            <Toggle enabled={deviceTrust} onChange={setDeviceTrust} />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
            <div>
              <p className="text-navy-900 dark:text-white mb-1">Require 2FA for all users</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mandatory two-factor auth</p>
            </div>
            <Toggle enabled={require2FA} onChange={setRequire2FA} />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
            <div>
              <p className="text-navy-900 dark:text-white mb-1">Alert on new device</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notify on first login</p>
            </div>
            <Toggle enabled={true} onChange={() => {}} />
          </div>
        </div>
      </Card>

      {/* Blocked Countries */}
      <Card className="bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800">
        <h4 className="text-danger-700 dark:text-danger-400 mb-4">Blocked Countries</h4>
        <p className="text-sm text-danger-600 dark:text-danger-500 mb-4">
          Prevent access from high-risk geographic regions
        </p>
        <div className="flex flex-wrap gap-2">
          {['North Korea', 'Iran', 'Syria', 'Russia'].map((country) => (
            <div
              key={country}
              className="px-3 py-1.5 bg-danger-100 dark:bg-danger-900/30 rounded-lg text-sm text-danger-700 dark:text-danger-400"
            >
              {country}
            </div>
          ))}
          <button className="px-3 py-1.5 border-2 border-dashed border-danger-300 dark:border-danger-700 rounded-lg text-sm text-danger-600 hover:bg-danger-100 dark:hover:bg-danger-900/30">
            + Add country
          </button>
        </div>
      </Card>
    </div>
  );
}

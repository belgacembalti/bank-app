import React, { useState } from 'react';
import { Shield, Mail, Lock } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Badge } from './Badge';
import { Toggle } from './Toggle';
import { TrustScore } from './TrustScore';
import { PasswordStrength } from './PasswordStrength';
import { Modal } from './Modal';

export function DesignSystemShowcase() {
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h1 className="text-navy-900 dark:text-white mb-2">SecureBank Design System</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete component library for the banking application
        </p>
      </div>

      {/* Typography */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Typography</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <h1>Heading 1 - Display</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">2.5rem / 700 weight</p>
            </div>
            <div>
              <h2>Heading 2 - Page Title</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">2rem / 600 weight</p>
            </div>
            <div>
              <h3>Heading 3 - Section</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">1.5rem / 600 weight</p>
            </div>
            <div>
              <h4>Heading 4 - Subsection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">1.25rem / 600 weight</p>
            </div>
            <div>
              <p>Body text - Regular paragraph content for descriptions and general text.</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">1rem / 400 weight</p>
            </div>
            <div>
              <small>Small text - Helper text and captions</small>
              <p className="text-sm text-gray-600 dark:text-gray-400">0.875rem / 400 weight</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Color Palette</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-navy-900 dark:text-white mb-4">Primary Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary-600"></div>
                <div>
                  <p className="text-navy-900 dark:text-white">Primary</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#0066ff</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-navy-700"></div>
                <div>
                  <p className="text-navy-900 dark:text-white">Navy</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#0f1b3c</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-electric-500"></div>
                <div>
                  <p className="text-navy-900 dark:text-white">Electric Blue</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#0099ff</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-navy-900 dark:text-white mb-4">Semantic Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-success-600"></div>
                <div>
                  <p className="text-navy-900 dark:text-white">Success</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#19b987</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-warning-600"></div>
                <div>
                  <p className="text-navy-900 dark:text-white">Warning</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#ffb900</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-danger-600"></div>
                <div>
                  <p className="text-navy-900 dark:text-white">Danger</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#ff0000</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Buttons</h2>
        <Card>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">States</p>
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Form Elements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <Input
                label="Email Address"
                placeholder="you@example.com"
                icon={<Mail className="w-5 h-5" />}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
              />
              <Input
                label="With Error"
                error="This field is required"
              />
              <Input
                label="With Helper Text"
                helperText="We'll never share your information"
              />
            </div>
          </Card>

          <Card>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Toggle</p>
                <Toggle enabled={toggle} onChange={setToggle} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Password Strength</p>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border-2 rounded-lg border-gray-300 dark:border-navy-600 bg-white dark:bg-navy-800 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type a password..."
                />
                <PasswordStrength password={password} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Badges</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Variants</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Trust Score */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Trust Score Indicator</h2>
        <Card>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">High Trust</p>
              <TrustScore score={95} size="md" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Medium Trust</p>
              <TrustScore score={65} size="md" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Low Trust</p>
              <TrustScore score={35} size="md" />
            </div>
          </div>
        </Card>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card hover>
            <Shield className="w-8 h-8 text-primary-600 mb-3" />
            <h4 className="text-navy-900 dark:text-white mb-2">Hover Card</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This card has hover effects
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
            <Shield className="w-8 h-8 text-primary-600 mb-3" />
            <h4 className="text-navy-900 dark:text-white mb-2">Gradient Card</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              With background gradient
            </p>
          </Card>
          <Card padding="sm">
            <Shield className="w-8 h-8 text-primary-600 mb-3" />
            <h4 className="text-navy-900 dark:text-white mb-2">Small Padding</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compact card style
            </p>
          </Card>
        </div>
      </section>

      {/* Modal */}
      <section>
        <h2 className="text-navy-900 dark:text-white mb-6">Modal</h2>
        <Card>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Example Modal"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is an example modal dialog with customizable content.
            </p>
            <div className="flex gap-3">
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </Modal>
        </Card>
      </section>
    </div>
  );
}

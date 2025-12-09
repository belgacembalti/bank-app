import React, { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Lock,
  Shield,
  Zap,
  Eye,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../design-system/Button";
import { Input } from "../design-system/Input";
import { Card } from "../design-system/Card";
import { PasswordStrength } from "../design-system/PasswordStrength";
import { Toggle } from "../design-system/Toggle";
import { apiClient } from "../../utils/api";

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enableBiometric, setEnableBiometric] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const username = email.split("@")[0];

      const response = await apiClient.register(
        email,
        password,
        username,
        enableBiometric
      );

      if (response?.data) {
        onNavigate(enableBiometric ? "biometric-onboarding" : "dashboard");
      } else {
        setError(response?.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-40 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center relative z-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block text-white space-y-8"
        >
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-success-400 to-electric-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-white mb-1">Join SecureBank</h1>
              <p className="text-gray-300">Create your secure account in minutes</p>
            </div>
          </div>

          {/* FEATURES */}
          {[
            {
              icon: <Zap className="w-6 h-6 text-success-400" />,
              title: "Instant Setup",
              desc: "Get started in under 2 minutes with our streamlined onboarding"
            },
            {
              icon: <Eye className="w-6 h-6 text-primary-400" />,
              title: "Advanced Biometrics",
              desc: "Facial recognition with liveness detection"
            },
            {
              icon: <Shield className="w-6 h-6 text-electric-400" />,
              title: "Zero-Knowledge Security",
              desc: "End-to-end encrypted. We never see your data."
            },
            {
              icon: <Users className="w-6 h-6 text-warning-400" />,
              title: "Trusted Community",
              desc: "Join 100,000+ users"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h4 className="text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT SIDE – FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="backdrop-blur-xl bg-white/95 dark:bg-navy-800/95 border-white/20 shadow-2xl">

            {/* MOBILE BACK BUTTON */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => onNavigate("landing")}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back to home
              </button>
            </div>

            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-navy-900 dark:text-white mb-2">Create Account</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start your secure banking journey
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-4 p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
                <p className="text-sm text-danger-600 dark:text-danger-400">
                  {error}
                </p>
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="space-y-5"
            >
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                icon={<Mail className="w-5 h-5" />}
                required
              />

              {/* PASSWORD */}
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  icon={<Lock className="w-5 h-5" />}
                  required
                />
                <PasswordStrength password={password} />
              </div>

              {/* CONFIRM PASSWORD */}
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                icon={<Lock className="w-5 h-5" />}
                error={
                  confirmPassword && password !== confirmPassword
                    ? "Passwords do not match"
                    : undefined
                }
                required
              />

              {/* BIOMETRIC TOGGLE */}
              <div className="p-5 bg-gradient-to-br from-primary-50 via-electric-50 to-success-50 dark:from-primary-900/20 dark:via-electric-900/20 dark:to-success-900/20 rounded-xl border-2 border-primary-200 dark:border-primary-800">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-electric-500 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-navy-900 dark:text-white mb-1">
                        Enable Biometric Authentication
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Secure your account with Face ID
                      </p>
                    </div>
                  </div>

                  <Toggle enabled={enableBiometric} onChange={setEnableBiometric} />
                </div>

                {enableBiometric && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-3 border-t border-primary-200 dark:border-primary-800"
                  >
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      ✓ Faster login<br />
                      ✓ Liveness detection<br />
                      ✓ No passwords to remember
                    </p>
                  </motion.div>
                )}
              </div>

              {/* TERMS */}
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                <label className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-0.5" />
                  <span>
                    I agree to the{" "}
                    <button type="button" className="text-primary-600">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="text-primary-600">
                      Privacy Policy
                    </button>
                  </span>
                </label>

                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-0.5" />
                  <span>Send me security updates and news</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={!email || !password || password !== confirmPassword}
              >
                Create Secure Account
              </Button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-navy-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => onNavigate("login")}
                  className="text-primary-600 hover:text-primary-700"
                >
                  Sign in
                </button>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

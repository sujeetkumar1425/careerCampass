import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

interface LoginProps {
  onLogin: (user: { id: string; name: string; email: string }) => void;
  onSignUp: () => void;
}

export function Login({ onLogin, onSignUp }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        // Firebase Sign Up
        const { createUserWithEmailAndPassword, updateProfile } =
          await import("firebase/auth");

        const result = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Save user's name in Firebase
        await updateProfile(result.user, {
          displayName: formData.name,
        });

        onLogin({
          id: result.user.uid,
          name: formData.name,
          email: result.user.email || formData.email,
        });
      } else {
        // Firebase Sign In
        const { signInWithEmailAndPassword } =
          await import("firebase/auth");

        const result = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        onLogin({
          id: result.user.uid,
          name:
            result.user.displayName ||
            result.user.email?.split("@")[0] ||
            "User",
          email: result.user.email || formData.email,
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);

      let message = "Something went wrong. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered.";
          break;

        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;

        case "auth/weak-password":
          message = "Password must be at least 6 characters.";
          break;

        case "auth/invalid-credential":
          message = "Incorrect email or password.";
          break;

        case "auth/user-not-found":
          message = "No account found with this email.";
          break;

        case "auth/wrong-password":
          message = "Incorrect password.";
          break;

        default:
          message = error.message || message;
      }

      setErrors({
        general: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const user = result.user;

      onLogin({
        id: user.uid,
        name:
          user.displayName ||
          user.email?.split("@")[0] ||
          "User",
        email: user.email || "",
      });
    } catch (error: any) {
      console.error("Google login failed:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setErrors({
          general: "Google login was cancelled.",
        });
      } else {
        setErrors({
          general: error.message || "Google login failed.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  // const handleGoogleLogin = async () => {
  //   setIsLoading(true);

  //   // Simulate Google OAuth with more realistic data
  //   setTimeout(() => {
  //     // Simulate different Google users for demo purposes
  //     const demoUsers = [
  //       { name: 'Sujeet Kumar', email: 'sujeet.fz1425@gmail.com' },
  //       { name: 'Sujeet Kumar', email: 'sujeet.fz1425@gmail.com' },
  //       { name: 'Sujeet Kumar', email: 'sujeet.fz1425@gmail.com' }

  //     ];

  //     const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];

  //     const user = {
  //       id: 'google_' + Math.random().toString(36).substr(2, 9),
  //       name: randomUser.name,
  //       email: randomUser.email
  //     };

  //     // Auto-fill the form data with Google user info
  //     setFormData(prev => ({
  //       ...prev,
  //       name: user.name,
  //       email: user.email
  //     }));

  //     onLogin(user);
  //     setIsLoading(false);
  //   }, 1500);
  // };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/30 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-card/95 shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.h1
              className="text-3xl mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              CareerCompass
            </motion.h1>
            <p className="text-muted-foreground">
              {isSignUp ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}
            </p>
          </motion.div>

          {/* Google Login Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="button"
              variant="outline"
              className="w-full mb-6 h-12 bg-white hover:bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full mr-2"
                />
              ) : (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continue with Google
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mb-6"
          >
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-sm text-muted-foreground">
              Or continue with email
            </span>
          </motion.div>
          {errors.general && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive text-center mb-4"
            >
              {errors.general}
            </motion.p>
          )}


          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Label htmlFor="name">Full Name</Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  className="relative"
                >
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </motion.div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: isSignUp ? 0.6 : 0.5 }}
            >
              <Label htmlFor="email">Email</Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                className="relative"
              >
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </motion.div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: isSignUp ? 0.7 : 0.6 }}
            >
              <Label htmlFor="password">Password</Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                className="relative"
              >
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </motion.div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  className="relative"
                >
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </motion.div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isSignUp ? 0.9 : 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isSignUp ? 1.0 : 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <motion.button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </motion.button>
            </p>
          </motion.div>

          {!isSignUp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center mt-4"
            >
              <motion.button
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot your password?
              </motion.button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

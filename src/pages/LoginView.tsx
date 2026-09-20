import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DevilEye } from '../components/common/DevilEye';
import { Mail, Lock, Eye as EyeIcon, EyeOff } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { setCurrentScreen, setIsLoggedIn } = useApp();
  const [email, setEmail] = useState('director@devileye.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleSocialLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  return (
    <div
      id="login-view-screen"
      className="min-h-screen w-full bg-[#030303] text-white flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden select-none"
    >
      {/* Cinematic Dark Fiery Ambient Atmosphere */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_85%)] pointer-events-none" />

      {/* Cybernetic grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ===============================================================
            LEFT HALF: GIANT CINEMATIC DARK RED GLOWING DEVIL'S EYE LOGO
            =============================================================== */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative flex items-center justify-center">
            {/* Ambient intense fiery red blur ring */}
            <div className="absolute w-[360px] h-[240px] bg-red-600/25 rounded-full blur-[65px] pointer-events-none animate-pulse" />
            <DevilEye size="large" width={440} height={270} className="relative z-10" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest font-tech text-white uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              THE <span className="text-[#FF0033] text-glow-red">DEVIL'S EYE</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono-tech tracking-[0.25em] text-[#00E5FF] uppercase font-bold text-glow-cyan">
              AI THAT ACTUALLY SEES, THINKS AND REACTS
            </p>
          </div>
        </div>

        {/* ===============================================================
            RIGHT HALF: GLASSMORPHIC DARK CARD (PANEL 1 REFERENCE)
            =============================================================== */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md bg-black/80 border border-slate-800 rounded-xl p-7 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold font-tech text-white tracking-wide">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Enter your credentials to continue
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email / Username Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono-tech text-gray-300">
                  Email or Username
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400 pointer-events-none">
                    <Mail size={16} />
                  </span>
                  <input
                    id="login-email-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/70 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition font-mono-tech"
                  />
                </div>
              </div>

              {/* Password Input with Eye Toggle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono-tech text-gray-300">
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400 pointer-events-none">
                    <Lock size={16} />
                  </span>
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-black/70 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition font-mono-tech"
                  />
                  <button
                    type="button"
                    id="toggle-password-visibility-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-white cursor-pointer transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer font-mono-tech">
                  <input
                    id="remember-me-checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-black border-slate-700 text-[#FF0033] focus:ring-red-500 accent-[#FF0033]"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  id="forgot-password-link"
                  onClick={() => alert('Password recovery link dispatched to your email.')}
                  className="text-cyan-400 hover:text-cyan-300 font-mono-tech transition hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Full-width Neon Red Action Button */}
              <button
                id="login-submit-btn"
                type="submit"
                className="w-full bg-[#FF0033] hover:bg-red-600 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,51,0.5)] font-tech tracking-wider uppercase transition cursor-pointer text-sm"
              >
                Sign In
              </button>

              {/* Divider: Or continue with */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <span className="relative px-3 bg-black text-[11px] text-gray-400 uppercase font-mono-tech">
                  Or continue with
                </span>
              </div>

              {/* Social Buttons: Google & Microsoft */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="google-sso-btn"
                  type="button"
                  onClick={handleSocialLogin}
                  className="py-2.5 px-3 bg-black/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-medium text-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                    />
                  </svg>
                  <span className="font-mono-tech">Google</span>
                </button>

                <button
                  id="microsoft-sso-btn"
                  type="button"
                  onClick={handleSocialLogin}
                  className="py-2.5 px-3 bg-black/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-medium text-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  <span className="font-mono-tech">Microsoft</span>
                </button>
              </div>

              {/* Bottom text: Don't have an account? Sign Up */}
              <div className="pt-2 text-center">
                <p className="text-xs text-gray-400 font-mono-tech">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    id="signup-link-btn"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setCurrentScreen('dashboard');
                    }}
                    className="text-[#FF0033] hover:underline font-bold transition cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

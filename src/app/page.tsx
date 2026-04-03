'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (loginId === 'Admin' && password === 'Admin@123') {
        router.push('/dashboard');
      } else {
        setError('Invalid Login ID or Password. Please try again.');
        setLoading(false);
      }
    }, 900);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-['Inter',sans-serif]">

      {/* ── LEFT PANEL ── */}
      <div
        className="relative flex-[1.15] flex flex-col justify-between overflow-hidden"
        style={{
          backgroundImage: "url('/finance_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030d22]/80 via-[#0a1e50]/50 to-black/30 z-0" />

        <div className="relative z-10 flex flex-col justify-between h-full p-7">
          {/* Badge */}
          <div className="flex items-center gap-3 w-fit bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-lg">👤</div>
            <div>
              <p className="text-white text-[13px] font-semibold">Admin Login</p>
              <p className="text-white/60 text-[11px]">Finance Operations · Agent Portal</p>
            </div>
          </div>

          {/* Bottom branding */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-2xl">⬡</span>
              <span className="text-white text-xl font-extrabold tracking-tight">Finaxis™</span>
            </div>
            <span className="text-white/40 text-xs">© Finaxis · Commedia 2026</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-col justify-between flex-[0_0_42%] bg-white px-12 py-7 overflow-y-auto">
        {/* Top brand */}
        <div>
          <p className="text-[13px] font-bold text-gray-900">Finaxis™</p>
          <p className="text-[11.5px] text-gray-400 mt-0.5">Finance Operations Platform</p>
        </div>

        {/* Form */}
        <div className="mt-12">
          <h1 className="text-[42px] font-black text-slate-900 leading-[1.12] tracking-tight mb-3">
            Welcome, login to<br />your account.
          </h1>
          <p className="text-[13.5px] text-gray-500 leading-relaxed mb-8 max-w-sm">
            Manage accounts, vendors, finance agents &amp; compliance with ease.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Login ID */}
            <div className="flex flex-col gap-2">
              <label htmlFor="loginId" className="text-[12.5px] font-semibold text-gray-600 tracking-wide">
                Login ID:
              </label>
              <input
                id="loginId"
                type="text"
                placeholder="Enter your Login ID"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-full px-5 py-3.5 text-sm bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#783CB4] focus:bg-white focus:ring-2 focus:ring-[#783CB4]/10"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[12.5px] font-semibold text-gray-600 tracking-wide">
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-full px-5 py-3.5 text-sm bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#783CB4] focus:bg-white focus:ring-2 focus:ring-[#783CB4]/10 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-5 mt-1">
              <button
                id="loginSubmitBtn"
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-[#0f2a5e] hover:bg-[#1e40af] disabled:bg-blue-200 text-white rounded-full px-9 py-3.5 text-[14.5px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 min-w-[156px]"
              >
                {loading ? (
                  <span className="w-[18px] h-[18px] border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                ) : 'Sign In Here →'}
              </button>
              <a href="#" className="text-[13px] text-gray-600 underline underline-offset-2 hover:text-[#783CB4] transition-colors">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-[11.5px] text-gray-400 mt-8">www.finaxis.commedia.in</p>
      </div>
    </div>
  );
}

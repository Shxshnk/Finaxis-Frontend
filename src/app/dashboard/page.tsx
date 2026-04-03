'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useColorMode } from '@/theme/ThemeRegistry';

const ACCENT_BLUE = '#2563eb';
const SIDEBAR_EXPANDED = 260;
const SIDEBAR_COLLAPSED = 70;

// ── Icons ─────────────────────────────────────────────────────────────
const PaymentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const PayrollIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ComplianceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
const BudgetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const InvoiceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const AuditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const RevenueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const PendingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// ── KPI Card ──────────────────────────────────────────────────────────
interface KpiProps { label: string; value: string; sub: string; color: string; Icon: React.FC; trend?: string; trendUp?: boolean }
function KpiCard({ label, value, sub, color, Icon, trend, trendUp }: KpiProps) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  
  const CARD_BG = isDark ? '#111317' : '#ffffff';
  const BORDER  = isDark ? '#1e2229' : '#f1f5f9';
  const TEXT_VAL = isDark ? '#ffffff' : '#111827';
  const TEXT_DIM = isDark ? '#777' : '#94a3b8';

  return (
    <div
      className="flex-1 min-w-0 rounded-2xl p-5 relative overflow-hidden transition-all cursor-default group"
      style={{ 
        backgroundColor: CARD_BG,
        border: `1px solid ${BORDER}`,
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.02)' 
      }}
    >
      <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full pointer-events-none transition-all opacity-40"
        style={{ background: `${color}25`, filter: 'blur(24px)' }} />
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: TEXT_DIM }}>{label}</span>
        <span style={{ color, opacity: 0.9 }}><Icon /></span>
      </div>
      <p className="text-[1.8rem] font-black leading-none mb-2" style={{ color: TEXT_VAL }}>{value}</p>
      <div className="flex items-center gap-2">
        <span className="text-[11px]" style={{ color: TEXT_DIM }}>{sub}</span>
        {trend && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold"
            style={{ 
              background: trendUp ? (isDark ? '#064e3b' : '#dcfce7') : (isDark ? '#450a0a' : '#fee2e2'), 
              color: trendUp ? (isDark ? '#34d399' : '#16a34a') : (isDark ? '#f87171' : '#ef4444') 
            }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Agent Card ────────────────────────────────────────────────────────
interface AgentCardProps {
  name: string;
  color: string;
  Icon: React.FC;
  metric: string;
  metricLabel: string;
  description: string;
  actionLabel: string;
  progress?: number;
  status: 'active' | 'processing' | 'idle';
}

function AgentCard({ name, color, Icon, metric, metricLabel, description, actionLabel, progress, status }: AgentCardProps) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  
  const CARD_BG = isDark ? '#111317' : '#ffffff';
  const BORDER  = isDark ? '#1e2229' : '#f1f5f9';
  const TEXT_MAIN = isDark ? '#f1f5f9' : '#1e293b';
  const TEXT_VAL = isDark ? '#ffffff' : '#0f172a';
  const TEXT_DIM = isDark ? '#777' : '#94a3b8';

  const statusColor = status === 'active' ? '#22c55e' : status === 'processing' ? '#f59e0b' : '#94a3b8';
  const statusLabel = status === 'active' ? 'Active' : status === 'processing' ? 'Processing' : 'Idle';

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden transition-all cursor-pointer group"
      style={{ 
        backgroundColor: CARD_BG,
        border: `1px solid ${BORDER}`,
        boxShadow: isDark ? '0 4px 15px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = `${color}66`;
        el.style.boxShadow = isDark ? `0 8px 32px ${color}22` : `0 8px 24px ${color}12`;
        el.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = BORDER;
        el.style.boxShadow = isDark ? '0 4px 15px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.02)';
        el.style.transform = 'none';
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}99, transparent)` }} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: isDark ? `${color}25` : `${color}12`, border: `1px solid ${color}30`, color }}>
            <Icon />
          </div>
          <span className="text-[13.5px] font-bold" style={{ color: TEXT_MAIN }}>{name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: statusColor }}>{statusLabel}</span>
        </div>
      </div>

      <div>
        <p className="text-[1.6rem] font-black leading-none" style={{ color: TEXT_VAL }}>{metric}</p>
        <p className="text-[10.5px] mt-1.5" style={{ color: TEXT_DIM }}>{metricLabel}</p>
      </div>

      {progress !== undefined && (
        <div>
          <div className="w-full h-1 rounded-full bg-gray-100/10 overflow-hidden" 
            style={{ backgroundColor: isDark ? '#1a1d23' : '#f1f5f9' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: color }} />
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: TEXT_DIM }}>{progress}% capacity used</p>
        </div>
      )}

      <p className="text-[11.5px] leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{description}</p>

      <div className="flex items-center gap-2 mt-auto pt-1 text-[12px] font-bold transition-all group-hover:gap-3"
        style={{ color }}>
        {actionLabel} <ArrowIcon />
      </div>
    </div>
  );
}

// ── Activity Feed ─────────────────────────────────────────────────────
const ACTIVITY = [
  { time: '2m ago',   agent: 'Payment',    msg: 'Vendor ABC Corp payment of ₹3,24,000 processed',    color: ACCENT_BLUE },
  { time: '8m ago',   agent: 'Payroll',    msg: 'April 2026 salary batch submitted for approval',     color: '#3b82f6' },
  { time: '14m ago',  agent: 'Compliance', msg: 'GST filing deadline alert – due in 3 days',          color: '#ef4444' },
  { time: '28m ago',  agent: 'Invoice',    msg: 'Invoice #INV-2109 matched & approved (₹67,200)',      color: '#10b981' },
  { time: '45m ago',  agent: 'Budget',     msg: 'Marketing dept overspend flagged – 18% variance',    color: '#f59e0b' },
  { time: '1h ago',   agent: 'Audit',      msg: 'Q4 2025 internal audit report generated & saved',    color: '#8b5cf6' },
];

function ActivityFeed() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  
  const CARD_BG = isDark ? '#111317' : '#ffffff';
  const BORDER  = isDark ? '#1e2229' : '#f1f5f9';
  const TEXT_DIM = isDark ? '#64748b' : '#94a3b8';

  return (
    <div className="rounded-2xl p-5 flex flex-col"
      style={{ 
        backgroundColor: CARD_BG,
        border: `1px solid ${BORDER}`,
        boxShadow: isDark ? '0 4px 15px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.02)' 
      }}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: isDark ? '#777' : '#94a3b8' }}>Recent Activity</p>
        <button className="text-[10.5px] font-bold transition-all hover:opacity-75" style={{ color: ACCENT_BLUE }}>View all</button>
      </div>
      <div className="flex flex-col">
        {ACTIVITY.map((item, i) => (
          <div key={i}
            className="flex items-start gap-3 py-3.5"
            style={{ borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${isDark ? '#1a1d23' : '#f8fafc'}` : 'none' }}
          >
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
              style={{ background: item.color, boxShadow: `0 0 6px ${item.color}bb` }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.agent}</span>
                <span className="text-[10px]" style={{ color: isDark ? '#444' : '#cbd5e1' }}>{item.time}</span>
              </div>
              <p className="text-[12px] leading-snug" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{item.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Agent Data ────────────────────────────────────────────────────────
const getAgents = (accent: string): AgentCardProps[] => [
  {
    name: 'Payment Agent',
    color: accent,
    Icon: PaymentIcon,
    metric: '₹48.3L',
    metricLabel: 'Processed this month',
    description: '142 vendor payments · 3 pending approvals · avg ₹34,000 per txn.',
    actionLabel: 'View Payments',
    progress: 68,
    status: 'active',
  },
  {
    name: 'Payroll Agent',
    color: '#3b82f6',
    Icon: PayrollIcon,
    metric: '68',
    metricLabel: 'Employees processed',
    description: 'April 2026 batch ready · ₹18,50,000 total · 1 pending hold.',
    actionLabel: 'Review Payroll',
    status: 'processing',
  },
  {
    name: 'Compliance Agent',
    color: '#ef4444',
    Icon: ComplianceIcon,
    metric: '96.3%',
    metricLabel: 'Compliance score',
    description: 'GST filing due in 3 days · TDS Q4 filed · 2 low-risk flags.',
    actionLabel: 'Check Compliance',
    progress: 96,
    status: 'active',
  },
  {
    name: 'Budget Agent',
    color: '#f59e0b',
    Icon: BudgetIcon,
    metric: '₹2.1L',
    metricLabel: 'Variance flagged',
    description: 'Marketing 18% over · IT on track · HR 5% under budget.',
    actionLabel: 'View Budget',
    progress: 82,
    status: 'active',
  },
  {
    name: 'Invoice Agent',
    color: '#10b981',
    Icon: InvoiceIcon,
    metric: '24',
    metricLabel: 'Invoices processed today',
    description: '21 matched & approved · 3 under review · 0 discrepancies.',
    actionLabel: 'Manage Invoices',
    status: 'active',
  },
  {
    name: 'Audit Agent',
    color: '#8b5cf6',
    Icon: AuditIcon,
    metric: '5',
    metricLabel: 'Reports this quarter',
    description: 'Q4 2025 report ready · next audit scheduled Apr 15  · risk: low.',
    actionLabel: 'View Audit Reports',
    status: 'idle',
  },
];

// ── Page ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const sidebarW = sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  useEffect(() => {
    setMounted(true);
  }, []);

  const BG = isDark ? '#0a0b0d' : '#f4f7fa';
  const TEXT_MAIN = isDark ? '#ffffff' : '#0f172a';
  const TEXT_DIM = isDark ? '#777' : '#94a3b8';

  // Initial render (server + first client pass) uses standard mode colors or transparent to avoid hydration mismatch
  const appliedBG = mounted ? BG : '#f4f7fa';

  return (
    <div className="flex w-screen h-screen overflow-hidden transition-colors duration-300" style={{ backgroundColor: appliedBG }}>
      <Sidebar onCollapseChange={setSidebarCollapsed} />

      <div
        className="flex flex-col flex-1 h-screen overflow-hidden"
        style={{ marginLeft: sidebarW, transition: 'margin-left 0.28s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <Navbar sidebarCollapsed={sidebarCollapsed} />

        <main className="flex-1 overflow-y-auto px-8 pb-10" style={{ paddingTop: '88px' }}>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[20px] font-black tracking-tight" style={{ color: mounted ? TEXT_MAIN : '#0f172a' }}>Finance Operations Dashboard</h1>
            <p className="text-[12px] mt-1" style={{ color: mounted ? TEXT_DIM : '#94a3b8' }}>Streamlining accounts, vendors, and compliance with ease · Live overview</p>
          </div>

          {/* KPI Row */}
          <div className="flex gap-5 mb-8 flex-wrap">
            <KpiCard
              label="Total Revenue"
              value="₹48.3L"
              sub="This financial month"
              color={ACCENT_BLUE}
              Icon={RevenueIcon}
              trend="+12.4%"
              trendUp
            />
            <KpiCard
              label="Revenue Growth"
              value="+18.2%"
              sub="YoY comparison"
              color="#3b82f6"
              Icon={TrendIcon}
              trend="+3.1%"
              trendUp
            />
            <KpiCard
              label="Pending Operations"
              value="127"
              sub="Across all departments"
              color="#f59e0b"
              Icon={PendingIcon}
              trend="-8.2%"
              trendUp={false}
            />
            <KpiCard
              label="Compliance Score"
              value="96.3%"
              sub="Regulatory adherence"
              color="#10b981"
              Icon={ShieldIcon}
              trend="+1.2%"
              trendUp
            />
          </div>

          {/* Agent Grid + Activity */}
          <div className="flex gap-6 items-start">
            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {getAgents(ACCENT_BLUE).map(agent => (
                <AgentCard key={agent.name} {...agent} />
              ))}
            </div>

            <div className="w-[320px] shrink-0 sticky top-0">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

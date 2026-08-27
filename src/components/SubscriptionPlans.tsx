import React from 'react'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import { CurrencyCode } from '../types'
import { formatPrice } from '../lib/currency'

interface SubscriptionPlansProps {
  currency: CurrencyCode
  onSelectPlan: (planName: string, price: number) => void
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  currency,
  onSelectPlan,
}) => {
  const plans = [
    {
      name: 'Basic Plan',
      price: 499,
      period: '/month',
      billed: 'Billed monthly',
      popular: false,
      features: [
        'Access to basic content',
        'Standard customer support',
        '1 Device active stream',
        'Auto cloud sync',
      ],
    },
    {
      name: 'Premium Plan',
      price: 999,
      period: '/month',
      billed: 'Billed monthly',
      popular: true,
      badge: 'Most Popular',
      features: [
        'All Basic plan features',
        'Premium content access & 4K UHD',
        '3 Simultaneous devices',
        'Priority 24/7 key delivery',
        '10% Discount on hardware',
      ],
    },
    {
      name: 'Ultimate Plan',
      price: 1499,
      period: '/month',
      billed: 'Billed monthly',
      popular: false,
      features: [
        'All Premium features included',
        'Ultimate catalog VIP pass',
        '5 Simultaneous devices',
        'Dedicated VIP manager',
        'Free replacement warranty',
      ],
    },
  ]

  return (
    <section className="w-full py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono mb-2 uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5" />
          <span>Membership Tiers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Choose the Perfect Plan
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-1 font-sans">
          Unlock unlimited digital access, instant license renewals, and exclusive store discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className="relative group">
            {/* Ambient Gold Glow on Most Popular */}
            {plan.popular && (
              <div className="absolute -inset-0.5 rounded-[24px] bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 blur-sm opacity-80 pointer-events-none"></div>
            )}

            <div
              className={`h-full flex flex-col rounded-[22px] p-6 transition-all relative z-10 ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#142352] to-[#0A122E] border-2 border-yellow-400 shadow-2xl'
                  : 'bg-[#0B1220] border border-slate-400/15 hover:border-yellow-400/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#FFC107] text-slate-950 font-mono font-bold text-[10px] uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-bold text-white text-base sm:text-lg">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-extrabold text-2xl sm:text-3xl font-mono text-white">
                    {formatPrice(plan.price, currency)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">{plan.billed}</div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-2.5 mb-6 flex-1 text-xs text-slate-300 font-sans">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 shrink-0 ${
                        plan.popular ? 'text-yellow-400' : 'text-emerald-400'
                      }`}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.name, plan.price)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-md ${
                  plan.popular
                    ? 'btn-gold-gradient text-slate-950'
                    : 'bg-[#0E1A3D] hover:bg-[#132454] border border-slate-400/25 text-white'
                }`}
              >
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

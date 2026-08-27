import React from 'react'
import { Mail, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#040816] border-t border-slate-400/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3.5">
            <div className="flex items-center gap-3">
              <img
                src="/playbeat-logo.png"
                alt="PlayBeat"
                className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,193,7,0.4)]"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              Your premier digital license marketplace and official partner for Magcubic 4K smart projectors. Instant 24/7 automated delivery worldwide.
            </p>
            <div className="flex items-center gap-2 text-yellow-400 text-[11px] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
              Fulfillment Systems Active (99.99% Uptime)
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-2 space-y-2.5 font-sans">
            <h4 className="font-mono text-slate-300 uppercase tracking-wider text-[10px] font-bold">Catalog</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:text-yellow-300 transition cursor-pointer">Smart 4K Projectors</li>
              <li className="hover:text-yellow-300 transition cursor-pointer">AI Subscriptions</li>
              <li className="hover:text-yellow-300 transition cursor-pointer">Steam & Game Keys</li>
              <li className="hover:text-yellow-300 transition cursor-pointer">Windows & Office</li>
              <li className="hover:text-yellow-300 transition cursor-pointer">Creative Software</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-3 space-y-2.5 font-sans">
            <h4 className="font-mono text-slate-300 uppercase tracking-wider text-[10px] font-bold">Support</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex items-center gap-2 hover:text-white transition">
                <Mail className="w-3.5 h-3.5 text-yellow-400" /> support@playbeat.pro
              </li>
              <li className="flex items-center gap-2 hover:text-white transition">
                <MessageSquare className="w-3.5 h-3.5 text-yellow-400" /> WhatsApp Support (24/7)
              </li>
              <li className="hover:text-white transition cursor-pointer">Track Courier Dispatch</li>
              <li className="hover:text-white transition cursor-pointer">Warranty & Replacement Policy</li>
            </ul>
          </div>

          {/* Payment Badges */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-slate-300 uppercase tracking-wider text-[10px] font-bold">Secure Gateways</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Visa', 'Mastercard', 'EasyPaisa', 'JazzCash', 'Binance Pay', 'Apple Pay'].map(
                (gateway) => (
                  <span
                    key={gateway}
                    className="px-2.5 py-1 rounded-lg bg-[#0A122E] border border-slate-400/15 text-[10px] text-slate-300 font-mono"
                  >
                    {gateway}
                  </span>
                )
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-normal">
              256-Bit SSL military-grade encryption. Instant automated fulfillment to verified email.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-400/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] font-mono">
          <div>
            © {new Date().getFullYear()} PlayBeat Digital Commerce. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

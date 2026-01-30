'use client';

import { useTranslations } from 'next-intl';
import { Phone, MapPin, MessageCircle, FileText } from 'lucide-react'; // MapPin/FileText as alternate icons
import { useQuote } from '@/context/QuoteContext';

export default function MobileStickyBar() {
    const t = useTranslations('MobileSticky');
    const { openQuoteModal } = useQuote();

    // Note: 'Line' icon is effectively MessageCircle or custom SVG.
    // Using MessageCircle for internal representation.

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden pb-safe">
            <div className="flex justify-around items-center h-16 safe-area-pb">
                {/* Call Button */}
                <a
                    href="tel:+66123456789"
                    className="flex flex-col items-center justify-center w-full h-full active:bg-slate-50 transition-colors gap-1"
                >
                    <Phone className="text-slate-700" size={24} />
                    <span className="text-[10px] font-medium text-slate-600">{t('call')}</span>
                </a>

                {/* Get Quote Button (Center, highlighted) */}
                <button
                    onClick={openQuoteModal}
                    className="flex flex-col items-center justify-center w-full h-full active:bg-orange-50 transition-colors gap-1 relative -top-4"
                >
                    <div className="bg-orange-500 rounded-full p-3 shadow-lg shadow-orange-500/30">
                        <span className="text-white font-bold text-xl leading-none">+</span>
                        {/* Or use an icon. The + suggests 'Add' or 'New Quote'. Let's use FileText instead inside? */}
                        {/* Actually, user provided image has 3 buttons side-by-side standard. But 'Sticky Bar' often highlights center. 
                   Let's stick to the 3-column layout provided in image description: Call | Maps (now Quote) | Line */}
                        {/* Reverting to standard layout as per image screenshot provided earlier (Call | Maps | Line) but 'Maps' became 'Quote' */}
                    </div>
                </button>

                {/* CORRECTION: The user provided a sticky bar image: Call | Maps | Line. 
           User said: "Change middle google maps with Get a quote function". 
           So it's Call | Quote | Line. Flat layout, probably dark or high contrast. 
           Wait, looking at the image provided by user... it was dark background?
           Let's standardise to a clean bar. 
        */}
            </div>

            {/* Re-implementing based on typical bottom nav (Call | Quote | Line) */}
            <div className="absolute inset-0 flex bg-slate-900/95 backdrop-blur-md text-white">
                <a href="tel:+66123456789" className="flex-1 flex flex-col items-center justify-center border-r border-white/10 hover:bg-white/5 active:bg-white/10 transition-colors">
                    <Phone size={22} className="mb-1 text-blue-400" />
                    <span className="text-xs font-medium">{t('call')}</span>
                </a>

                <button onClick={openQuoteModal} className="flex-1 flex flex-col items-center justify-center border-r border-white/10 hover:bg-white/5 active:bg-white/10 transition-colors">
                    <FileText size={22} className="mb-1 text-orange-400" />
                    <span className="text-xs font-medium">{t('quote')}</span>
                </button>

                <a href="https://line.me/ti/p/~yourid" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center hover:bg-white/5 active:bg-white/10 transition-colors">
                    <MessageCircle size={22} className="mb-1 text-green-400" />
                    <span className="text-xs font-medium">{t('line')}</span>
                </a>
            </div>
        </div>
    );
}

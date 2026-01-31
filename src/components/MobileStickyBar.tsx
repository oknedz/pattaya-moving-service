'use client';

import { useTranslations } from 'next-intl';
import { Phone, FileText } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';

import Image from 'next/image';

export default function MobileStickyBar() {
    const t = useTranslations('MobileSticky');
    const { openQuoteModal } = useQuote();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
            <div className="flex text-white border-t border-white/10" style={{ backgroundColor: '#260D12' }}>
                <a
                    href="tel:+66123456789"
                    className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                    <Phone size={22} className="mb-1" style={{ color: '#E7294E' }} />
                    <span className="text-xs font-medium">{t('call')}</span>
                </a>

                <button
                    onClick={openQuoteModal}
                    className="flex-1 flex flex-col items-center justify-center py-3 border-x border-white/10 hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                    <FileText size={22} className="mb-1" style={{ color: '#E7294E' }} />
                    <span className="text-xs font-medium">{t('quote')}</span>
                </button>

                <a
                    href="https://line.me/ti/p/~yourid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                    <Image
                        src="/LINE_Brand_icon.png"
                        alt="LINE"
                        width={22}
                        height={22}
                        className="mb-1"
                    />
                    <span className="text-xs font-medium">{t('line')}</span>
                </a>
            </div>
        </div>
    );
}

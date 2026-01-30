'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
    const t = useTranslations('Metadata'); // Reusing metadata for description or similar

    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">Pattaya<span className="text-orange-500">Movers</span></h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                            {t('description')}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Local Moving</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Long Distance</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Office Relocation</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Packing Services</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Pattaya, Chonburi, Thailand</li>
                            <li><a href="tel:+66123456789" className="hover:text-orange-500 transition-colors">+66 123 456 789</a></li>
                            <li><a href="mailto:info@pattayamovers.com" className="hover:text-orange-500 transition-colors">info@pattayamovers.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-800 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Pattaya Movers. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

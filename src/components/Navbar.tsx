'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuote } from '@/context/QuoteContext';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Navbar() {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { openQuoteModal } = useQuote();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Handle scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Check initial scroll position after paint
        setMounted(true);
        requestAnimationFrame(() => {
            handleScroll();
        });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const navLinks = [
        { name: t('home'), href: '#home' },
        { name: t('services'), href: '#services' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className={`text-2xl font-bold tracking-tighter transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                    Pattaya<span className="text-[#E7294E]">Movers</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 max-md:!hidden">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`hover:font-medium transition-colors cursor-pointer ${scrolled ? 'text-slate-600' : 'text-white'}`}
                            style={{ '--hover-color': '#E7294E' } as any}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#E7294E'}
                            onMouseLeave={(e) => e.currentTarget.style.color = ''}
                        >
                            {link.name}
                        </a>
                    ))}

                    <button onClick={openQuoteModal} className="text-white px-5 py-2.5 rounded-sm font-semibold transition-all shadow-lg active:scale-95 bg-gradient-to-b from-[#E7294E] to-[#C91D3E] cursor-pointer" style={{ boxShadow: '0 4px 14px rgba(231, 41, 78, 0.2)' }}>
                        {t('getQuote')}
                    </button>

                    {/* Language Switcher */}
                    {/* Language Switcher */}
                    <div className={`flex items-center gap-2 ml-4 border-l pl-4 transition-colors ${scrolled ? 'border-slate-200' : 'border-white/30'}`}>
                        <Label htmlFor="language-switch" className={`text-sm font-semibold cursor-pointer transition-colors ${locale === 'en' ? (scrolled ? 'text-slate-900' : 'text-white') : (scrolled ? 'text-slate-400' : 'text-white/60')}`}>
                            EN
                        </Label>
                        <Switch
                            id="language-switch"
                            checked={locale === 'th'}
                            onCheckedChange={(checked) => switchLanguage(checked ? 'th' : 'en')}
                            className="data-[state=checked]:bg-[#E7294E]"
                        />
                        <Label htmlFor="language-switch" className={`text-sm font-semibold cursor-pointer transition-colors ${locale === 'th' ? (scrolled ? 'text-slate-900' : 'text-white') : (scrolled ? 'text-slate-400' : 'text-white/60')}`}>
                            TH
                        </Label>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-4 md:hidden">
                    {/* Mobile Language Switcher */}
                    <div className="flex items-center gap-2">
                        <Label htmlFor="mobile-header-language-switch" className={`text-sm font-semibold cursor-pointer transition-colors ${locale === 'en' ? (scrolled ? 'text-slate-900' : 'text-white') : (scrolled ? 'text-slate-400' : 'text-white/60')}`}>
                            EN
                        </Label>
                        <Switch
                            id="mobile-header-language-switch"
                            checked={locale === 'th'}
                            onCheckedChange={(checked) => switchLanguage(checked ? 'th' : 'en')}
                            className="data-[state=checked]:bg-[#E7294E] scale-75 origin-right"
                        />
                        <Label htmlFor="mobile-header-language-switch" className={`text-sm font-semibold cursor-pointer transition-colors ${locale === 'th' ? (scrolled ? 'text-slate-900' : 'text-white') : (scrolled ? 'text-slate-400' : 'text-white/60')}`}>
                            TH
                        </Label>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`p-2 transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full left-0 w-full h-screen md:hidden"
                    >
                        {/* Blur Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="relative bg-white shadow-xl border-t border-slate-100 flex flex-col p-6"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="py-4 text-lg font-medium text-slate-700 border-b border-slate-50 last:border-0 cursor-pointer text-center"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="mt-6 flex flex-col gap-4">
                                <button onClick={openQuoteModal} className="w-1/2 mx-auto text-white py-3 rounded-sm font-bold shadow-lg bg-gradient-to-b from-[#E7294E] to-[#C91D3E] cursor-pointer" style={{ boxShadow: '0 4px 14px rgba(231, 41, 78, 0.2)' }}>
                                    {t('getQuote')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import MobileStickyBar from '@/components/MobileStickyBar';
import { QuoteProvider } from '@/context/QuoteContext';
import "@/app/globals.css";
import { Outfit } from 'next/font/google';

// Font configuration
const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
});

// Metadata generation
export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getMessages({ locale });
    const metadata = (t as any).Metadata;

    return {
        title: metadata?.title || 'Pattaya Moving Service',
        description: metadata?.description || 'Professional moving services in Pattaya, Thailand.',
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={outfit.className}>
                <NextIntlClientProvider messages={messages}>
                    <QuoteProvider>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-grow pb-20 md:pb-0 pt-20">
                                {children}
                            </main>
                            {/* Footer would go here */}
                            <MobileStickyBar />
                        </div>
                    </QuoteProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

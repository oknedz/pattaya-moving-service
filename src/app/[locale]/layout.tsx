import { NextIntlClientProvider } from 'next-intl';
import Script from 'next/script';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import MobileStickyBar from '@/components/MobileStickyBar';
import Footer from '@/components/Footer';
import { QuoteProvider } from '@/context/QuoteContext';
import "@/app/globals.css";
import { Kanit, Sarabun } from 'next/font/google';

// Font configuration
const kanit = Kanit({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin', 'thai'],
    variable: '--font-heading',
    display: 'swap',
});

const sarabun = Sarabun({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin', 'thai'],
    variable: '--font-body',
    display: 'swap',
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
            <head>
                <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAnyP3f1DzVBwKRXvU2T-793veDWsbDidc&libraries=places`}
                    strategy="lazyOnload"
                />
            </head>
            <body className={`${kanit.variable} ${sarabun.variable} font-body antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <QuoteProvider>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-grow pb-20 md:pb-0">
                                {children}
                            </main>
                            <Footer />
                            <MobileStickyBar />
                        </div>
                    </QuoteProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

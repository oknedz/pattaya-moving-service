'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import QuoteModal from '@/components/QuoteModal';

interface QuoteContextType {
    openQuoteModal: () => void;
    closeQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openQuoteModal = () => setIsOpen(true);
    const closeQuoteModal = () => setIsOpen(false);

    return (
        <QuoteContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
            {children}
            <QuoteModal isOpen={isOpen} onClose={closeQuoteModal} />
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    const context = useContext(QuoteContext);
    if (context === undefined) {
        throw new Error('useQuote must be used within a QuoteProvider');
    }
    return context;
}

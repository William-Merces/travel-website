'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type NavigationType = 'home' | 'flights' | 'hotels' | 'packages';

interface NavigationContextType {
    activeSection: NavigationType;
    setActiveSection: (section: NavigationType) => void;
    getPageTitle: () => string;
}

const pageTitles = {
    home: 'Viaje Mais, Gaste Menos',
    flights: 'Decole para sua Próxima Aventura',
    hotels: 'Sua Hospedagem Perfeita',
    packages: 'Experiências Completas em um Só Lugar'
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = useState<NavigationType>('home');
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/') setActiveSection('home');
        else if (pathname === '/flights') setActiveSection('flights');
        else if (pathname === '/hotels') setActiveSection('hotels');
        else if (pathname === '/packages') setActiveSection('packages');
    }, [pathname]);

    const getPageTitle = () => {
        return pageTitles[activeSection];
    };

    return (
        <NavigationContext.Provider value={{ activeSection, setActiveSection, getPageTitle }}>
            {children}
        </NavigationContext.Provider>
    );
}

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
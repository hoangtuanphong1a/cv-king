import React, { createContext, useContext, useEffect, useState } from 'react';

interface BreadcrumbItem {
    name: string;
    link: string;
    parentId?: string;
}

interface BreadcrumbContextType {
    currentPath: BreadcrumbItem[];
    setCurrentPath: (path: BreadcrumbItem[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
    return context;
};

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentPath, setCurrentPath] = useState<BreadcrumbItem[]>([]);

    useEffect(() => {
        // Chỉ chạy trên client sau khi hydrate
        if (typeof window !== 'undefined') {
            const savedPath = localStorage.getItem('breadcrumbPath');
            if (savedPath) {
                setCurrentPath(JSON.parse(savedPath));
            }
        }
    }, []); // Chỉ chạy một lần khi mount

    useEffect(() => {
        // Lưu currentPath vào localStorage khi nó thay đổi
        if (typeof window !== 'undefined') {
            localStorage.setItem('breadcrumbPath', JSON.stringify(currentPath));
        }
    }, [currentPath]);

    return (
        <BreadcrumbContext.Provider value={{ currentPath, setCurrentPath }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};
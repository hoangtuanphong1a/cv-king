// Layout.js
import { ClientLayout } from '@/components/layout/MainLayout';
import React from 'react';
import { AppProvider } from "@/components/AppContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ClientLayout>
<AppProvider>
        {children}
</AppProvider>
    </ClientLayout>;

};

export default Layout;

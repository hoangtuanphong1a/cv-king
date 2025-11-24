"use client";

import { ROUTES } from "@/lib/routes";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import React, { useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import AccountSidebar from "./Sidebar/AccountSidebar";
import { MainContent } from "../ui/admin/MainContent";
import DashboardLayout from "./Dashboard";

NProgress.configure({ showSpinner: false });

const ClientLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  const isShowHeaderFooter = !(
    [ROUTES.LOGIN, ROUTES.REGISTER] as string[]
  ).some((route) => pathname?.startsWith(route));

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {isShowHeaderFooter && <Header />}
      <main className={`flex-1 ${isShowHeaderFooter ? "mt-[60px]" : ""} `}>
        {children}
      </main>
      {isShowHeaderFooter && <Footer />}
    </div>
  );
};

const AccountLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <Box className="container flex min-h-screen flex-col bg-gray-100">
      <Box className="py-6">{/* <Breadcrumb /> */}</Box>
      <Box className="flex flex-1">
        <AccountSidebar />
        <Box className="flex-1 overflow-auto pl-6">
          <main>{children}</main>
        </Box>
      </Box>
    </Box>
  );
};

const PUBLIC_ADMIN_ROUTES = [ROUTES.ADMIN_LOGIN];

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const isPublicRoute = PUBLIC_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return isPublicRoute ? (
    <div className="flex min-h-screen flex-col">
      <main>{children}</main>
    </div>
  ) : (
    <Box className="flex min-h-screen">
      <DashboardLayout>
        <MainContent>{children}</MainContent>
      </DashboardLayout>
    </Box>
  );
};

export { ClientLayout, AccountLayout, AdminLayout };

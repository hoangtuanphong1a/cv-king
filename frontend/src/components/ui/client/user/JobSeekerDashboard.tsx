"use client";
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import {
    User,
    FileText,
    Bookmark,
    Send,
    Settings,
    Menu,
} from 'lucide-react';
import {
    Button
} from '@mui/material';
import MyProfile from './MyProfile';
import MyCv from './MyCv';
import SavedJobs from './SavedJobs';
import MyApplication from './MyApplycation';
import MySettings from './Settings';
import { ArrowLeft } from '@mui/icons-material';
import { useApp } from '@/components/AppContext';
const JobSeekerDashboard = () => {
    // const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { navigateTo } = useApp();

    const navigationItems = [
        { id: 'profile', label: 'Thông tin cá nhân', icon: User },
        { id: 'cv', label: 'Quản lý CV', icon: FileText },
        { id: 'saved', label: 'Việc làm đã lưu', icon: Bookmark },
        { id: 'application', label: 'Việc đã ứng tuyển', icon: Send },
        { id: 'settings', label: 'Cài đặt', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <MyProfile />;
            case 'cv': return <MyCv />;
            case 'saved': return <SavedJobs />;
            case 'application': return <MyApplication />;
            case 'settings': return <MySettings />;
            default: return <div>Trang không tồn tại</div>;
        }
    };

    return (
        // Chiều cao = 100vh - header(64) - footer(80)
        <div
            className="min-h-[calc(100vh)] overflow-hidden bg-gray-50"
            style={{}}
        >
            <div className="relative h-full flex">
                {sidebarOpen && (
                    <div
                        className="absolute inset-0 bg-black/50 z-10 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <aside
                    className={[
                        "relative lg:static z-20 w-64 h-250 bg-white shadow-lg px-[5px]", // đổi w-64 -> w-72
                        "transform transition-transform duration-300 ease-in-out",
                        sidebarOpen ? "translate-x-0" : "-translate-x-full",
                        "lg:translate-x-0 flex-shrink-0",
                    ].join(" ")}
                >
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="text"
                                size="small"
                                onClick={() => navigateTo("home")}
                                className="mr-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                            <h2>Dashboard</h2>
                        </div>
                    </div>

                    <nav className="mt-6">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={[
                                        "w-full flex items-center px-6 py-3 text-left transition-colors border-r-2",
                                        isActive
                                            ? "bg-orange-50 text-primary border-primary"
                                            : "text-gray-700 hover:bg-gray-100 border-transparent",
                                    ].join(" ")}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 h-full overflow-auto">
                    <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-30">
                        <Button variant="text" size="small" onClick={() => setSidebarOpen(true)}>
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h1>Dashboard</h1>
                        <Button variant="text" size="small" onClick={() => navigateTo("home")}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="px-[45px] py-6">{renderContent()}</div>
                </main>
            </div>
        </div>
    );
}

export default JobSeekerDashboard;
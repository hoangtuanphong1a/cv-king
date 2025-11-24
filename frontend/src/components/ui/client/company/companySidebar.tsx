import React from "react";
import Image from "next/image";

interface NewsItem {
    id: string;
    title: string;
    link: string;
}

interface ContactInfo {
    email?: string;
    phone?: string;
    address?: string;
}

interface CompanySidebarProps {
    news: NewsItem[];
    qrImage?: string;
    contact?: ContactInfo;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({ news, qrImage, contact }) => {
    return (
        <aside className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow p-4">
                <h4 className="text-orange-500 font-semibold mb-2 text-base">Tin nổi bật</h4>
                <ul className="list-disc pl-4 text-sm text-gray-700">
                    {news && news.length > 0 ? news.map(item => (
                        <li key={item.id} className="mb-1">
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.title}</a>
                        </li>
                    )) : <li>Chưa có tin nổi bật</li>}
                </ul>
            </div>
            {qrImage && (
                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                    <h4 className="text-orange-500 font-semibold mb-2 text-base">QR công ty</h4>
                    <Image src={qrImage} alt="QR công ty" width={120} height={120} />
                </div>
            )}
            {contact && (
                <div className="bg-white rounded-xl shadow p-4">
                    <h4 className="text-orange-500 font-semibold mb-2 text-base">Liên hệ</h4>
                    <div className="text-sm text-gray-700">
                        {contact.address && <div>Địa chỉ: {contact.address}</div>}
                        {contact.email && <div>Email: <a href={`mailto:${contact.email}`} className="text-blue-500 underline">{contact.email}</a></div>}
                        {contact.phone && <div>Điện thoại: <a href={`tel:${contact.phone}`} className="text-blue-500 underline">{contact.phone}</a></div>}
                    </div>
                </div>
            )}
        </aside>
    );
};

export default CompanySidebar;

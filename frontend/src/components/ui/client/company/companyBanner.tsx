import React from "react";
import Image, { StaticImageData } from "next/image";
import imageCompany from "@/assets/images/bannercompany1.jpg";

interface CompanyBannerProps {
    image?: string | StaticImageData;
    alt?: string;
    title?: string;
    subtitle?: string;
}

const CompanyBanner = ({
    image,
    alt = "Company Banner",
    title,
    subtitle,
}: CompanyBannerProps) => {
    return (
        <div className="w-full h-48 md:h-60 lg:h-72 relative flex items-center overflow-hidden shadow-md bg-transparent">
            <Image
                src={image ?? imageCompany}
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                className="z-0"
            />
            {(title || subtitle) && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-start">
                    {title && <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg mb-2">{title}</h1>}
                    {subtitle && <p className="text-white text-base md:text-lg drop-shadow-lg uppercase tracking-wider">{subtitle}</p>}
                </div>
            )}
        </div>
    );
};

export default CompanyBanner; 
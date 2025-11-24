import React from "react";
import Image, { StaticImageData } from "next/image";
import { Heart, MapPin, Users, Calendar, Globe, Share2, Star } from "lucide-react";

const CompanyInfoCard = ({
    logo,
    name,
    industry = "Technology",
    location = "Ho Chi Minh City",
    employees = "500-1000 employees",
    founded = "Founded",
    website,
    rating = 4.8,
    reviews = 125,
    openPositions = 15,
    followers = 590,
}: {
    logo: string | StaticImageData;
    name: string;
    industry?: string;
    location?: string;
    employees?: string;
    founded?: string;
    website?: string;
    rating?: number;
    reviews?: number;
    openPositions?: number;
    followers?: number;
}) => {
    return (
        <div className="w-full bg-white rounded-2xl p-6 shadow-lg">
            {/* Company Overview */}
            <div className="flex items-start gap-4 mb-6">
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                        src={logo}
                        alt={name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Company Info */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
                    <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {industry}
                    </div>

                    {/* Company Details */}
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{employees}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{founded}</span>
                        </div>
                        {website && (
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    Website
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>Follow</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                    </button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="flex gap-8 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <div>
                        <div className="text-xl font-bold text-gray-900">{rating}</div>
                        <div className="text-sm text-gray-600">{reviews} reviews</div>
                    </div>
                </div>

                <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{openPositions}</div>
                    <div className="text-sm text-gray-600">Open positions</div>
                </div>

                <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{followers}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfoCard;

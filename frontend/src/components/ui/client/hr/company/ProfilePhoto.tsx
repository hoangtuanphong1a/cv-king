"use client";
import { useRef, useState } from "react";
import Image from "next/image";
const ProfilePhoto = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const onPickFile = () => fileRef.current?.click();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        setPreview(url);
    }

return (
    <section className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
            {/* Avatar + camera badge */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xl overflow-hidden">
                    {preview ? (
                        // avatar preview
                        <Image src={preview} alt="avatar" fill className="object-cover" />
                    ) : (
                        "a"
                    )}
                </div>

                <button
                    type="button"
                    onClick={onPickFile}
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center"
                    aria-label="Change avatar"
                    title="Change avatar"
                >
                    {/* camera icon */}
                    <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                </button>
            </div>

            {/* Text + button */}
            <div className="flex-1">
                <h3 className="font-medium leading-6">Profile Photo</h3>
                <p className="text-sm text-gray-500">Upload your company logo</p>

                <div className="mt-2">
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={onPickFile}
                        className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                    >
                        {/* upload icon */}
                        <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Change Photo
                    </button>
                </div>
            </div>
        </div>
    </section>
    );
}
export default ProfilePhoto;

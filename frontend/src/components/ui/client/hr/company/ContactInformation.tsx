"use client";
import { Dispatch, SetStateAction, useState } from "react";

type ContactForm = {
  contactName: string;
//   email: string;
  phone: string;
  website: string;
  address: string;
};

type Props = {
  form: ContactForm;                              
  setForm: Dispatch<SetStateAction<ContactForm>>;   
};

export default function ContactInformation({ form, setForm }: Props) {

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const field =
        "w-full bg-gray-100 text-gray-800 rounded-lg px-3 py-2 border border-transparent focus:outline-none focus:border-gray-300";
    const label = "block text-sm font-semibold mb-1";
    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                <div>
                    <label className={label}>Contact Person Name</label>
                    <input
                        name="contactName"
                        value={form.contactName}
                        onChange={onChange}
                        className={field}
                        placeholder="Your name"
                    />
                </div>
                {/* <div>
                    <label className={label}>Email Address</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        className={field}
                        placeholder="name@company.com"
                    />
                </div> */}
                <div>
                    <label className={label}>Phone Number</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        className={field}
                        placeholder="+84 ..."
                    />
                </div>
                <div>
                    <label className={label}>Website</label>
                    <input
                        name="website"
                        value={form.website}
                        onChange={onChange}
                        className={field}
                        placeholder="https://..."
                    />
                </div>

                <div className="md:col-span-2">
                    <label className={label}>Office Address</label>
                    <input
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        className={field}
                        placeholder="Street, City"
                    />
                </div>
            </div>
        </section>
    );
}
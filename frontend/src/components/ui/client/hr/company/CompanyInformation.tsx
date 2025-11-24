"use client";
import { Dispatch, SetStateAction} from "react";

type CompanyForm = {
  name: string;
  industry: string;
  size: string;
  description: string;
  benefits: string[];
};
type Props = {
  form: CompanyForm;                           
  setForm: Dispatch<SetStateAction<CompanyForm>>; 
};
export default function CompanyInformation({ form, setForm }: Props) {
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const fieldClass =
        "w-full bg-gray-100 text-gray-800 rounded-lg px-3 py-2 border border-transparent focus:outline-none focus:border-gray-300";
    const labelClass = "block text-sm font-semibold mb-1";
    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Company Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                {/* Company Name */}
                <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                        name="name"
                        value={form.name}
                        disabled
                        className={fieldClass}
                        placeholder="Enter company name"
                    />
                </div>

                {/* Industry */}
                <div>
                    <label className={labelClass}>Industry</label>
                    <select
                        name="industry"
                        value={form.industry}
                        onChange={onChange}
                        className={fieldClass}
                    >
                        <option>Information Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Manufacturing</option>
                    </select>
                </div>

                {/* Company Size */}
                <div>
                    <label className={labelClass}>Company Size</label>
                    <select
                        name="size"
                        value={form.size}
                        onChange={onChange}
                        className={fieldClass}
                    >
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-100 employees</option>
                        <option>100-500 employees</option>
                        <option>500+ employees</option>
                    </select>
                </div>

                {/* Founded Year */}
                {/* <div>
                    <label className={labelClass}>Founded Year</label>
                    <input
                        name="founded"
                        value={form.founded}
                        onChange={onChange}
                        className={fieldClass}
                        placeholder="YYYY"
                    />
                </div> */}

                {/* Description (full width) */}
                <div className="md:col-span-2">
                    <label className={labelClass}>Company Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        rows={3}
                        className={fieldClass}
                        placeholder="Write a short description..."
                    />
                </div>
            </div>
        </section>
    );
}
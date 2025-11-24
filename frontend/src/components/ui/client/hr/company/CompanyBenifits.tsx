"use client";
import { useState } from "react";

type Props = {
  benefits: string[];
  setBenefits: (benefits: string[]) => void;
};

const CompanyBenifits = ({ benefits, setBenefits }: Props) => {
  const [input, setInput] = useState("");

    const add = () => {
        const v = input.trim();
        if (!v) return;
        if (benefits.some((b) => b.toLowerCase() === v.toLowerCase())) {
            setInput("");
            return;
        }
        setBenefits([...benefits, v]);
        setInput("");
    };
    const remove = (i: number) =>
        setBenefits(benefits.filter((_, idx) => idx !== i));

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Company Benefits</h3>

            {/* chips */}
            <div className="flex flex-wrap gap-2 mb-4">
                {benefits.map((b, i) => (
                    <span
                        key={b + i}
                        className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm"
                    >
                        {b}
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            className="rounded-md hover:bg-gray-200 w-5 h-5 grid place-items-center"
                            aria-label="Remove"
                            title="Remove"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            {/* input + plus button */}
            <div className="flex items-center gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            add();
                        }
                    }}
                    placeholder="Add a benefit..."
                    className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm border border-transparent focus:outline-none focus:border-gray-300"
                />
                <button
                    type="button"
                    onClick={add}
                    className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50 grid place-items-center"
                    aria-label="Add"
                    title="Add"
                >
                    +
                </button>
            </div>
        </section>
    );
}
export default CompanyBenifits;
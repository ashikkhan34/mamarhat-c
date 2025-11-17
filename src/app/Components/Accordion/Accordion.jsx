"use client"
import { useState } from "react";

export default function Accordion() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  const items = [
    {
      q: "What is MamarHat?",
      a: "MamarHat is a food delivery and business platform connecting riders and customers.",
    },
    {
      q: "How to become a partner?",
      a: "Just click the Become Partner button and complete the registration.",
    },
    {
      q: "How to start earning?",
      a: "Sign up as a rider, verify your profile, and start accepting orders.",
    },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-3xl text-center font-semibold p-12">FAQ Questions</h1>
      {items.map((item, i) => (
        <div key={i} className="border-b border-blue-600 rounded mb-3">
          <button
            onClick={() => toggle(i)}
            className="w-full text-left px-4 py-3 flex justify-between items-center"
          >
            {item.q}
            <span className="text-xl">{open === i ? "-" : "+"}</span>
          </button>

          {open === i && (
            <div className="px-4 py-3 bg-green-600 text-white ">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

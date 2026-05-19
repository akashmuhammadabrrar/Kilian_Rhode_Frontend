"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useSendNewsletterMutation } from "@/app/store/slices/services/newsletterApi";

export default function SendNewsletter() {
  const [subject, setSubject] = useState("");
  const [bodyType, setBodyType] = useState<"text" | "html">("text");
  const [body, setBody] = useState("");

  const [sendNewsletter, { isLoading }] = useSendNewsletterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subject.trim()) {
      toast.error("Please enter a subject.");
      return;
    }

    if (!body.trim()) {
      toast.error("Please enter the newsletter content.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("body_type", bodyType);
    formData.append("body", body);

    try {
      const response = await sendNewsletter(formData).unwrap();
      if (response.success) {
        toast.success(response.message || "Newsletter sent successfully!");
        const emails = response.data?.emails;
        if (emails && emails.length > 0) {
          toast(`Sent to ${emails.length} subscribers.`);
        }
        // clear the form
        setSubject("");
        setBody("");
      } else {
        toast.error(response.message || "Failed to send newsletter.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred while sending the newsletter.");
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-xl border border-stone-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Send Newsletter</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent transition-all text-sm"
            placeholder="e.g. Summer Collection is Here!"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Body Type
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] bg-white transition-all text-sm"
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value as "text" | "html")}
          >
            <option value="text">Plain Text</option>
            <option value="html">HTML</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Newsletter Content
          </label>
          <textarea
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent transition-all text-sm"
            placeholder={bodyType === "html" ? "<p>Hello Subscribers...</p>" : "Type your message here..."}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          {bodyType === "html" && (
            <p className="mt-2 text-xs text-stone-500">
              HTML string will be parsed and rendered by email clients. Make sure it&apos;s well-formed.
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#8B6F47] hover:bg-[#725a39] disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all shadow-sm flex items-center justify-center min-w-[150px]"
          >
            {isLoading ? "Sending..." : "Send Newsletter"}
          </button>
        </div>
      </form>
    </div>
  );
}

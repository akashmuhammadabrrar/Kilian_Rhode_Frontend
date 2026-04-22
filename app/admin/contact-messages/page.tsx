import React from "react";
import ContactMessages from "@/components/admin/ContactMessages";

export const metadata = {
  title: "Contact Messages - Admin Dashboard",
  description: "View and manage user contact messages.",
};

export default function ContactMessagesPage() {
  return <ContactMessages />;
}

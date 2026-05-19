"use client";

import React, { useState } from "react";
import { Search, Trash2, Mail, Loader2, ChevronRight, ChevronLeft, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { 
  useGetContactMessagesQuery, 
  useDeleteContactMessageMutation,
  useGetContactMessageByIdQuery
} from "@/app/store/slices/services/contentContactApi";

export default function ContactMessages() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useGetContactMessagesQuery({
    page: currentPage,
  });

  const { data: selectedMessage, isFetching: isFetchingMessage } = useGetContactMessageByIdQuery(
    selectedMessageId as number,
    { skip: selectedMessageId === null }
  );

  const [deleteMessage, { isLoading: isDeleting }] = useDeleteContactMessageMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }
    
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully.");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message.");
    }
  };

  const messages = data?.results || [];
  const totalCount = data?.count || 0;
  const hasNext = data?.next !== null;
  const hasPrevious = data?.previous !== null;

  // Client-side search filtering if API doesn't support it directly
  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white rounded-xl shadow-sm border border-stone-200">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 flex items-center">
            <Mail className="mr-3 text-[#D4AF37]" />
            Contact Messages
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            View and manage messages submitted via the Contact Us form.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-stone-200 bg-stone-50 text-sm font-semibold text-stone-600">
          <div className="col-span-3">Sender</div>
          <div className="col-span-3">Subject</div>
          <div className="col-span-4">Message (Snippet)</div>
          <div className="col-span-1 text-center">Date</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
            </div>
          ) : isError ? (
            <div className="p-8 text-center text-red-500">
              Failed to load contact messages. Please try again.
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-stone-500 flex flex-col items-center">
              <Mail className="w-16 h-16 text-stone-300 mb-4" />
              <p className="text-lg">No messages found</p>
              <p className="text-sm">You haven&apos;t received any messages yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-stone-50 transition-colors"
                >
                  <div className="col-span-3">
                    <p className="font-semibold text-stone-800 truncate">{msg.name}</p>
                    <p className="text-xs text-stone-500 truncate">{msg.email}</p>
                  </div>
                  
                  <div className="col-span-3">
                    <p className="text-sm text-stone-700 truncate" title={msg.subject}>
                      {msg.subject || "No Subject"}
                    </p>
                  </div>

                  <div className="col-span-4">
                    <p className="text-sm text-stone-600 truncate" title={msg.message}>
                      {msg.message}
                    </p>
                  </div>

                  <div className="col-span-1 text-center">
                    <p className="text-xs text-stone-500">
                      {new Date(msg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>

                  <div className="col-span-1 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedMessageId(msg.id);
                        setIsModalOpen(true);
                      }}
                      className="text-stone-400 hover:text-blue-500 transition-colors p-2"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      disabled={isDeleting}
                      className="text-stone-400 hover:text-red-500 transition-colors p-2"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-sm text-stone-600">
          <div>
            Showing <span className="font-semibold">{filteredMessages.length}</span> out of{" "}
            <span className="font-semibold">{totalCount}</span> messages
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevious || isLoading}
              className="flex items-center px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </button>
            <span className="flex items-center px-3 py-1.5 font-medium text-stone-800">
              Page {currentPage}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNext || isLoading}
              className="flex items-center px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for viewing message details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
              <h2 className="text-lg font-semibold text-stone-800">Message Details</h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedMessageId(null);
                }}
                className="text-stone-500 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {isFetchingMessage ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                </div>
              ) : selectedMessage ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-stone-500">Name</span>
                      <span className="block text-stone-800">{selectedMessage.name}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-stone-500">Email</span>
                      <a href={`mailto:${selectedMessage.email}`} className="block text-blue-600 hover:underline">{selectedMessage.email}</a>
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-stone-500">Date</span>
                    <span className="block text-stone-800">
                      {new Date(selectedMessage.created_at).toLocaleString("en-US", { 
                        month: "long", day: "numeric", year: "numeric", hour: '2-digit', minute:'2-digit' 
                      })}
                    </span>
                  </div>
                  <div className="border-t border-stone-200 pt-4 mt-4">
                    <span className="block text-sm font-medium text-stone-500 mb-1">Subject</span>
                    <span className="block text-stone-800 font-semibold">{selectedMessage.subject || "No Subject"}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-stone-500 mb-1">Message</span>
                    <div className="p-4 bg-stone-50 rounded-lg text-stone-800 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-stone-500 py-8">
                  Could not load message details.
                </div>
              )}
            </div>
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedMessageId(null);
                }}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

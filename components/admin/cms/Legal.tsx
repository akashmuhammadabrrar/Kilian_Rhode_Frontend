import React, { useState } from "react";
import LegalCard from "./LegalCard";
import { Loader2, Eye, Trash2, Edit } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetLegalContentQuery,
  useCreateLegalContentMutation,
  useUpdateLegalContentMutation,
  useDeleteLegalContentMutation,
  ILegalContent
} from "../../../app/store/slices/services/adminService/privecyLegalApi";

const formatTitle = (title: string) => {
  return title.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const Legal = () => {
  const { data: legalRes, isLoading: isFetching } = useGetLegalContentQuery();
  const [createLegal, { isLoading: isCreating }] = useCreateLegalContentMutation();
  const [updateLegal, { isLoading: isUpdating }] = useUpdateLegalContentMutation();
  const [deleteLegal, { isLoading: isDeleting }] = useDeleteLegalContentMutation();

  const [editingPolicy, setEditingPolicy] = useState<ILegalContent | undefined>(undefined);

  const policies = Array.isArray(legalRes?.results) ? legalRes.results : [];
  const existingTitles = policies.map((p: any) => p.title).filter(Boolean);

  const handleSave = async (id: number | null, data: FormData) => {
    try {
      if (id) {
        await updateLegal({ id, data }).unwrap();
        toast.success("Policy updated successfully");
      } else {
        await createLegal(data).unwrap();
        toast.success("Policy created successfully");
      }
      setEditingPolicy(undefined);
    } catch (err: any) {
      console.error(err);
      const errors = err?.data;
      if (errors && typeof errors === "object") {
        if (errors.title) toast.error(errors.title[0]);
        else if (errors.file) toast.error(errors.file[0]);
        else if (errors.non_field_errors) toast.error(errors.non_field_errors[0]);
        else if (errors.message) toast.error(errors.message);
        else toast.error("Validation error: check fields");
      } else {
        toast.error("Failed to save policy");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this policy?")) return;
    try {
      await deleteLegal(id).unwrap();
      toast.success("Policy deleted");
      if (editingPolicy?.id === id) setEditingPolicy(undefined);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete policy");
    }
  };

  return (
    <div className="w-full p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COMPONENT - UPLOADING CARD */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingPolicy ? "Update Policy" : "Upload New Policy"}
          </h2>
          <LegalCard
            // Key forces remount when switching what's being edited, so state resets properly inside LegalCard
            key={editingPolicy ? `edit-${editingPolicy.id}` : "create-new"} 
            legal={editingPolicy}
            existingTitles={existingTitles}
            onSave={handleSave}
            isSaving={isCreating || isUpdating}
          />
          {editingPolicy && (
            <button 
              onClick={() => setEditingPolicy(undefined)}
              className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-800 transition font-medium"
            >
              Cancel Editing
            </button>
          )}
        </div>

        {/* RIGHT COMPONENT - POLICIES TABLE */}
        <div className="flex-1 bg-white border border-[#e8e3dc] rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e8e3dc] bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Uploaded Policies</h2>
          </div>
          
          <div className="overflow-x-auto">
            {isFetching ? (
              <div className="flex justify-center p-10">
                <Loader2 className="w-8 h-8 animate-spin text-amber-800" />
              </div>
            ) : policies.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No legal policies uploaded yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Title</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Last Updated</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Document</th>
                    <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {policies.map((policy: ILegalContent) => (
                    <tr key={policy.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-amber-50 text-amber-800 border border-amber-100 whitespace-nowrap">
                          {formatTitle(policy.title || "")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {policy.updated_at 
                          ? new Date(policy.updated_at).toLocaleString() 
                          : policy.created_at ? new Date(policy.created_at).toLocaleString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {policy.file ? (
                          <a 
                            href={policy.file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium text-sm transition"
                          >
                            <Eye className="w-4 h-4 mr-1.5" />
                            View File
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => setEditingPolicy(policy)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="Edit Policy"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(policy.id)}
                          disabled={isDeleting}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete Policy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Legal;

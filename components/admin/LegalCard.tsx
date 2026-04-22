import React, { useState, useEffect } from "react";
import { DocumentTextIcon, TrashIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Loader2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { ILegalContent } from "../../app/store/slices/services/adminService/privecyLegalApi";

const POLICY_OPTIONS = [
  "privacy_policy",
  "cookie_policy",
  "terms_and_conditions",
  "legal_notice",
  "ai_usage_guidelines",
  "withdrawal_policy"
];

interface LegalCardProps {
  legal?: ILegalContent;
  onSave: (id: number | null, data: FormData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  isSaving?: boolean;
  isDeleting?: boolean;
  defaultTitle?: string;
  existingTitles?: string[];
}

const LegalCard: React.FC<LegalCardProps> = ({
  legal,
  onSave,
  onDelete,
  isSaving = false,
  isDeleting = false,
  defaultTitle = "legal_notice",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  existingTitles = [],
}) => {
  const [title, setTitle] = useState(legal?.title || defaultTitle);
  const [file, setFile] = useState<File | null>(null);

  const availableOptions = POLICY_OPTIONS;
  
  useEffect(() => {
    if (legal) {
      setTitle(legal.title || defaultTitle);
    } else if (availableOptions.length > 0 && !availableOptions.includes(title)) {
      setTitle(availableOptions[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [legal, defaultTitle]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Policy type is required");
      return;
    }
    if (!legal?.id && !file) {
      toast.error("Please upload a document file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (file) {
      formData.append("file", file);
    }

    await onSave(legal?.id || null, formData);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-[#e8e3dc] shadow-sm hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 mr-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
          <select
            className="w-full text-lg font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 focus:outline-none transition-colors cursor-pointer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            {availableOptions.length === 0 && <option value="" disabled>No policies left to add</option>}
            {availableOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </option>
            ))}
          </select>
          {legal?.created_at && (
            <div className="text-xs text-gray-400 mt-2">
              Last updated: {new Date(legal.updated_at || legal.created_at).toLocaleDateString()}
            </div>
          )}
        </div>

        {legal?.id && onDelete && (
          <button
            onClick={() => onDelete(legal.id)}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition"
            title="Delete Policy"
          >
            {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrashIcon className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* File Upload Container */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Policy Document</label>
        
        {legal?.file && !file && (
          <div className="flex items-center justify-between p-3 mb-3 bg-amber-50 border border-amber-100 rounded-lg">
            <div className="flex items-center space-x-2 w-full overflow-hidden text-amber-800">
              <DocumentTextIcon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm truncate font-medium">Currently uploaded document</span>
            </div>
            <a 
              href={legal.file}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
              title="View current file"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
            </a>
          </div>
        )}

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
            <p className="mb-1 text-sm text-gray-500">
              <span className="font-semibold text-amber-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">TXT, PDF, DOC, or DOCX (Max 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".txt,.pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </label>
        {file && (
          <div className="mt-2 text-sm text-green-600 flex items-center font-medium bg-green-50 p-2 rounded-md border border-green-100">
            <DocumentTextIcon className="w-4 h-4 mr-1.5" />
            Selected: <span className="ml-1 font-semibold truncate">{file.name}</span>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full flex items-center justify-center py-3 px-4 
                   bg-[linear-gradient(180deg,#8b6f47,#7a5f3a)] text-white font-semibold rounded-lg 
                   hover:brightness-110 disabled:opacity-50 transition duration-150 ease-in-out shadow-sm"
      >
        {isSaving ? (
          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
        ) : (
          <UploadCloud className="w-5 h-5 mr-3" />
        )}
        {legal?.id ? "Update Policy Document" : "Upload Policy"}
      </button>
    </div>
  );
};

export default LegalCard;

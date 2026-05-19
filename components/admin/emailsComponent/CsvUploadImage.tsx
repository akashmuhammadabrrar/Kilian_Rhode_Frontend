import React, { useState } from "react";
import { CloudUpload, AlertTriangle, FileText, X } from "lucide-react";

const CsvUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ---------------------------
  // Validate File
  // ---------------------------
  const validateFile = (file: File | null) => {
    if (
      file &&
      file.type === "text/csv" &&
      file.size <= 10 * 1024 * 1024 // 10MB
    ) {
      setFile(file);
    } else {
      alert("Invalid file. Please select a CSV file under 10MB.");
      setFile(null);
    }
    setIsDragging(false);
  };

  // ---------------------------
  // Input File Selection
  // ---------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    validateFile(selected);
  };

  // ---------------------------
  // Drag + Drop
  // ---------------------------
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    validateFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  // ---------------------------
  // Upload Simulation
  // ---------------------------
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    alert(`Simulating upload of ${file.name}. Check console for details.`);
    console.log("Uploading CSV:", file);

    setTimeout(() => setFile(null), 1500);
  };

  // ---------------------------
  // Upload Area UI
  // ---------------------------
  const renderUploadArea = () => {
    const dropZoneClasses = `
      bg-white border-2 rounded-lg p-8 h-80 flex items-center justify-center mb-8 shadow-sm transition-all duration-200
      ${
        isDragging
          ? "border-purple-500 bg-purple-50 border-dashed"
          : "border-gray-300 border-solid"
      }
    `;

    return (
      <div
        className={dropZoneClasses}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          {file ? (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between w-64 mx-auto">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                  {file.name}
                </span>
              </div>

              <button
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <CloudUpload className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-4 text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
                >
                  Click to upload
                </label>{" "}
                or drag and drop
              </p>
            </>
          )}

          <p className="mt-1 text-xs text-gray-500">
            CSV files only (max 10MB)
          </p>

          {/* Hidden Input */}
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleInputChange}
            className="sr-only"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Upload CSV File
      </h1>

      {renderUploadArea()}

      {file && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-150 shadow-md"
          >
            Upload {file.name}
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />

          <div className="ml-3">
            <p className="text-sm font-medium text-yellow-800">
              <span className="font-bold">Important:</span>
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yellow-700">
              <li>All imported codes must be globally unique</li>
              <li>Codes are one-time use</li>
              <li>
                If recipient_email is provided, codes are queued for email
                delivery
              </li>
              <li>Large imports may take a few minutes to process</li>
              <li>You will receive a summary report after completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvUploader;

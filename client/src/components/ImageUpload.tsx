import axios from "axios";
import React, { useState } from "react";
import { CloudUpload } from "lucide-react";

interface OcrData {
  [key: string]: string;
}

interface ImageUploadProps {
  onUpload: (data: OcrData) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "front" | "back"
  ) => {
    const file = e.target.files?.[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      if (type === "front") setFrontImage(file);
      else setBackImage(file);
      setError("");
    } else {
      setError("Please upload a valid JPEG or PNG image.");
    }
  };

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      setError("Please upload both front and back images");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("frontImage", frontImage);
    formData.append("backImage", backImage);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ocr/process",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onUpload(response.data.result);
      setError("");
    } catch (err) {
      setError("Error processing images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const UploadBox = ({
    label,
    file,
    onChange,
  }: {
    label: string;
    file: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <label className="flex flex-col justify-center items-center border-2 border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer hover:border-blue-500 transition h-60 relative overflow-hidden">
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt={label}
          className="object-cover w-full h-full absolute top-0 left-0"
        />
      ) : (
        <>
          <CloudUpload size={40} className="text-blue-500 mb-2 z-10" />
          <span className="text-gray-700 font-medium z-10">{label}</span>
          <span className="text-blue-500 text-sm mt-2 z-10">
            Click here to Upload/Capture
          </span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity" />
    </label>
  );

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <p className="text-red-500 text-center mb-2 bg-red-100 p-3 rounded-lg">
          {error}
        </p>
      )}
      <UploadBox
        label="Aadhaar Front"
        file={frontImage}
        onChange={(e) => handleFileChange(e, "front")}
      />
      <UploadBox
        label="Aadhaar Back"
        file={backImage}
        onChange={(e) => handleFileChange(e, "back")}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-4 py-3 rounded-md text-white font-bold ${
          loading
            ? "bg-orange-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {loading ? "Processing..." : "Parse Aadhaar"}
      </button>
    </div>
  );
};

export default ImageUpload;

import axios from "axios"
import React, { useState } from "react"

interface OcrData {
  [key: string]: string;
}

interface ImageUploadProps {
  onUpload: (data: OcrData) => void;
}

const ImageUpload:React.FC<ImageUploadProps> = ({ onUpload }) => {
    const [frontImage,setFrontImage] = useState<File | null> (null)
    const [backImage,setBackIMage] = useState<File | null> (null)
    const [frontPreview,setFrontPreview] = useState<string | null> (null)
    const [backPreview,setBackPreview] = useState<string | null > (null)
    const [error,setError] = useState<string> ("")
    const [loading,setLoading] = useState<boolean>(false)

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>,type:'front' | 'back')=>{
        const file = e.target.files?.[0]
        if(file && ['image/jpeg', 'image/png'].includes(file.type)){
            if(type=='front'){
                setFrontImage(file)
                setFrontPreview(URL.createObjectURL(file))
            }else{
                setBackIMage(file)
                setBackPreview(URL.createObjectURL(file))
            }
            setError('')
        }else{
            setError('Please upload a valid image file (JPEG or PNG)');
        }
    }

    const handleSubmit  = async()=>{
        if(!frontImage || !backImage){
           setError('Please upload both front and back images');
           return;
        }
        setLoading(true)
        const formData =  new FormData()
        formData.append('frontImage',frontImage)
        formData.append('backImage',backImage)
        try {
      const response = await axios.post('http://localhost:3000/api/ocr/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload(response.data.result);
      setError('');
    } catch (err) {
      setError('Error processing images. Please try again.');
    } finally {
      setLoading(false);
    }
    }
    
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Aadhaar Card Images</h2>
      {error && (
        <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg">{error}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col items-center">
          <label className="text-gray-700 font-medium mb-3">Front Side</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileChange(e, 'front')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          {frontPreview && (
            <img
              src={frontPreview}
              alt="Front Preview"
              className="mt-4 w-full max-w-xs h-auto rounded-lg shadow-md object-cover"
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          <label className="text-gray-700 font-medium mb-3">Back Side</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileChange(e, 'back')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          {backPreview && (
            <img
              src={backPreview}
              alt="Back Preview"
              className="mt-4 w-full max-w-xs h-auto rounded-lg shadow-md object-cover"
            />
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition duration-300 ease-in-out transform hover:scale-105 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Process Images'
        )}
      </button>
    </div>
  )
}

export default ImageUpload

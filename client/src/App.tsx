import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ResultDisplay from "./components/ResultDisplay";



function App() {
const [ocrData, setOcrData] = useState<{ [key: string]: string } | null>(null);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Aadhaar OCR System</h1>
      <ImageUpload onUpload={setOcrData} />
      <ResultDisplay data={ocrData} />
    </div>
  );
}

export default App

import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [ocrData, setOcrData] = useState<{ [key: string]: string } | null>(null);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-7xl ">
        {/* Upload Section */}
        <div className="flex-1">
          <ImageUpload onUpload={setOcrData} />
        </div>

        {/* Result Section */}
        <div className="flex-1">
          <ResultDisplay data={ocrData} />
        </div>
      </div>
    </div>
  );
}

export default App;

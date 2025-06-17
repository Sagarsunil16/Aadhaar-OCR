interface OcrData {
  [key: string]: string;
}

interface ResultDisplayProps {
  data: OcrData | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center h-full text-center text-gray-500">
        <h2 className="font-semibold underline text-gray-700 mb-2">Response</h2>
        <p className="mb-4">No Aadhaar data available. Please upload and parse an Aadhaar card.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Extracted Aadhaar Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">{key}:</p>
            <p className="font-semibold text-gray-800">{value || "Not found"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;

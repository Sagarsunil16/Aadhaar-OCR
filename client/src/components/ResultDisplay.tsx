 interface OcrData {
    [key:string]:string
  }

  interface ResultDisplayProps{
    data: OcrData | null
  }


const ResultDisplay:React.FC<ResultDisplayProps> = ({data}) => {
 if(!data) return null

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Extracted Aadhaar Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col"
          >
            <span className="font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-gray-600 mt-1">
              {value || 'Not found'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultDisplay

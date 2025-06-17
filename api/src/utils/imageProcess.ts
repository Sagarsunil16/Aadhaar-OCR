import Tesseract from "tesseract.js"
const processImage = async(imagePath:string)=>{
            const {data:{text}} = await Tesseract.recognize(imagePath,'eng')
            return text
        }
export default processImage


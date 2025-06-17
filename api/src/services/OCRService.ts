import CustomError from "../utils/customError";
import processImage from "../utils/imageProcess";
import { IOCRService } from "./IOCR.service";
import extractData from "../utils/extractData";
import fs from 'fs'


class OCRservice implements IOCRService{
    constructor(){
    }
    async processOcr(files: any): Promise<any> {
        if(!files.frontImage && !files.backImage){
            throw new CustomError('Both front and back images are required',400)
        }

        const frontImagePath = files.frontImage[0].path;
        const backImagePath = files.backImage[0].path;
        const [frontText,backText] = await Promise.all([processImage(frontImagePath),processImage(backImagePath)])

        // Clean up uploaded files
        fs.unlinkSync(frontImagePath)
        fs.unlinkSync(backImagePath)

        const [frontData,backData] = await Promise.all([extractData(frontText),extractData(backText)])
        
        const combinedData = {...frontData,...backData}

        if(Object.keys(combinedData).length === 0){
            throw new CustomError('No relevant information extracted from images',400)
        }
        return combinedData
    }
}

export default OCRservice
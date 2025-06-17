
import { IOCRService } from "../services/IOCR.service"
import CustomError from "../utils/customError"
import { Request,Response,NextFunction,} from "express"


class OCRController {
    private _OCRService:IOCRService
    constructor(OCRService:IOCRService){
        this._OCRService = OCRService
    }

    async ImageProcess(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
              const files = req.files
              const result = await this._OCRService.processOcr(files)
              if(!result){
                throw new CustomError("Unable to process the image",400)
              }
              
            res.status(200).json({message:"Successfully Process the image",result})
        } catch (error) {
            console.log(error)
            next(error)
        }        
    }
}

export default OCRController
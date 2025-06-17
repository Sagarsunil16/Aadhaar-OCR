
import OCRController from "../controller/OCR.controller";
import OCRservice from "../services/OCRService";

//service
let ocrservice = new OCRservice()




//controller
let ocrController = new OCRController(ocrservice)

export {ocrController}
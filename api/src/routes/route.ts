import { Router } from "express";
import { ocrController } from "../container/di";
import upload from "../config/multer";
const router = Router()

router.post('/ocr/process',upload,ocrController.ImageProcess.bind(ocrController))

export default router
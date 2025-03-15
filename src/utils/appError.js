//import fs from 'fs'
//import path from 'path'
import { deleteFile } from './file.js'
export class AppError extends Error {//error built in jsva
constructor(message,statusCode){
    super(message);//inherit
    this.statusCode=statusCode
}}
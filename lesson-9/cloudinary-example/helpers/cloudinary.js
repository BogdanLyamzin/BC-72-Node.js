import {v2 as cloudinary} from "cloudinary";

const {
    CLOUDINARY_CLOUD_NAME: cloud_name, 
    CLOUDINARY_API_KEY: api_key,  
    CLOUDINARY_API_SECRET: api_secret,
} = process.env;

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

export default cloudinary;
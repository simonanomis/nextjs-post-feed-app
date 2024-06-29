import { v2 as cloudinary } from 'cloudinary';

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export async function uploadImage(image) {
    const imageData = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(imageData).toString('base64');
    const fileUri = 'data:ac' + mime + ';' + encoding + ',' + base64Data;
    const result = await cloudinary.uploader.upload(fileUri, {
        folder: 'nextjs-course-mutations',
    });
    return result.secure_url;
}
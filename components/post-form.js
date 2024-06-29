'use client'
import React, { useState } from 'react';
import FormSubmit from "@/components/form-submit";
import {CldImage} from "next-cloudinary";

export default function PostForm({ createPost }) {
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);

        const file = formData.get('image');
        if (file && file.name) {
            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('upload_preset', 'your-upload-preset'); // Set your upload preset here

            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: uploadData,
            });

            const data = await response.json();
            if (data.secure_url) {
                formData.set('imageUrl', data.secure_url);
            }
        }

        const result = await createPost(formData);
        if (result && result.errors) {
            setErrors(result.errors);
        } else {
            setErrors([]);
        }
        setIsSubmitting(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <>
            <h1>Create a new post</h1>
            <form onSubmit={handleSubmit}>
                <p className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title"/>
                </p>
                <p className="form-control">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                    />
                </p>
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview"/>
                    </div>
                )}
                <p className="form-control">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" rows="5"/>
                </p>
                <p className="form-actions">
                    <FormSubmit isSubmitting={isSubmitting}/>
                </p>
                {errors.length > 0 && (
                    <ul className="form-errors">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
            </form>
        </>
    );
}

'use client'
import React, { useState } from 'react';
import FormSubmit from "@/components/form-submit";

export default function PostForm({ createPost }) {
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);
        const result = await createPost(formData);
        if (result && result.errors) {
            setErrors(result.errors);
        } else {
            setErrors([]);
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <h1>Create a new post</h1>
            <form onSubmit={handleSubmit}>
                <p className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" />
                </p>
                <p className="form-control">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                    />
                </p>
                <p className="form-control">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" rows="5" />
                </p>
                <p className="form-actions">
                    <FormSubmit isSubmitting={isSubmitting} />
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

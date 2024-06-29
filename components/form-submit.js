import React from 'react';

export default function FormSubmit({isSubmitting}) {
    return (
        <>
            <button type="reset">Reset</button>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Post...' : 'Create Post'}
            </button>
        </>
    );
}

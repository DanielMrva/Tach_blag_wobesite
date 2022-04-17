const newFormHandler = async (event) => {
    event.preventDefault();


    const post_title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();

    if (post_title && post_content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({post_title, post_content}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to post');
        }
        
    }
};



document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);


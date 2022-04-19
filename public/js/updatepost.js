const updatePostHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.getAttribute('data-post');
    const post_title = document.querySelector("#update-post-title").value.trim();
    const post_content = document.querySelector("#update-post-content").value.trim();

    if (post_id) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({post_title, post_content}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if(response.ok) {
            document.location.replace(`/profile`)
        } else {
            alert('Failed to update post');
        }
    }
};
document.querySelector('.update-post-form').addEventListener('submit', updatePostHandler);
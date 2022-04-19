const newReplyHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.getAttribute('data-post');
    const reply_content = document.querySelector('#reply-content').value.trim();
    if (post_id && reply_content) {

        const response = await fetch('/api/reply', {
            method: 'POST',
            body: JSON.stringify({post_id, reply_content}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {

            alert('Failed to reply');
        }
        
    }
};
document.querySelector('.new-reply-form').addEventListener('submit', newReplyHandler);
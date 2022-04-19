const updateReplyHandler = async (event) => {
    event.preventDefault();

    const reply_id = event.target.getAttribute('data-reply');
    const update_reply_content = document.querySelector("#update-reply-content").value.trim();

    if (reply_id && update_reply_content) {
        const response = await fetch(`/api/reply/${reply_id}`, {
            method: 'PUT',
            body: JSON.stringify({update_reply_content}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if(response.ok) {
            document.location.replace(`/profile`)
        } else {
            alert('Failed to update reply');
        }
    }
};
document.querySelector('.update-reply-form').addEventListener('submit', updateReplyHandler);
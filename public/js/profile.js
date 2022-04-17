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

const delButtonHandler = async (event) => {
//TODO: make sure new posts have data-id's associated with the DB?  Will have to look at the rest of the files/routes to figure out how this is done.

    if (event.target.hasAttribute('data-post') && event.target.hasAttribute('data-user') ) {
        const post = event.target.getAttribute('data-post');
        const user = event.target.getAttribute('data-user');

        if (user === req.session.user_id) {
            const response = await featch(`/api/posts/${post}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Failed to delete post');
            }
        } else {
            alert("You may not delete another user's posts");
            document.location.replace('/profile');
        }
    }
};

//TODO: link these to the appropriate form areas.  Make sure ID's match up to the probably bootstrap form areas

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

document.querySelector('.post-list').addEventListener('click', delButtonHandler);
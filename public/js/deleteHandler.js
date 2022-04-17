const delButtonHandler = async (event) => {
    let type;
    let identifier;

    if (event.target.hasAttribute('data-post')) {
        type = 'post';
        identifier = event.target.getAttribute('data-post');
    } else {
        type = 'reply';
        identifier = event.target.getAttribute('data-reply')
    }

    const response = await fetch(`/api/${type}/${identifier}`, {
        method: 'DELETE',
    });
            
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete post/reply');
    }

    
};
document.querySelector('.deleteBTN').addEventListener('click', delButtonHandler);
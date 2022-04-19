const delButtonHandler = async (event) => {
    let type;
    let identifier;

    if (event.target.hasAttribute('data-post')) {
        type = 'posts';
        identifier = event.target.getAttribute('data-post');
    }
    if (event.target.hasAttribute('data-reply')) {
        type = 'reply'
        identifier = event.target.getAttribute('data-reply');
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

document.addEventListener('click', function (event) {

	if (event.target.matches('.deleteBTN')) {
		delButtonHandler(event);
	}
}, false);
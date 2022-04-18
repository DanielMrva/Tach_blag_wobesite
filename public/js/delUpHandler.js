const delButtonHandler = async (event) => {
    let type;
    let identifier;

    //TODO: take care of this via event delegation https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/

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

document.addEventListener('click', function (event) {

	if (event.target.matches('.deleteBTN')) {
		delButtonHandler(event);
	}

	if (event.target.matches('.updateBTN')) {
		console.log('update button');
	}

}, false);
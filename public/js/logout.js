const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

//TODO: link these to the appropriate form areas.  Make sure ID's match up to the probably bootstrap form areas
document.querySelector('#logout').addEventListener('click', logout);
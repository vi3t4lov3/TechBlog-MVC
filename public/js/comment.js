//get all form data through submission
const commentEl = document.querySelector('#create-comment');
const commentSubmit = document.querySelector('#comment-submit')

//function for submission 
const addComment = async (e) => {
    e.preventDefault();
    if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');
        console.log(id)
    const commentBody = {
        comment: commentEl.value,
        blog_id: id
    };

    console.log(commentBody)

    // sending event details to the server using POST request
    const fetchNewEvent = await fetch('/api/comment', {
        method: 'POST',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(commentBody),
    });
    
    //if the submission is successful then go to the users personal page
    if(fetchNewEvent.ok){
        document.location.replace('/');
    }
    //otherwise if it doesn't work then send text notification of error
    else{
        alert(fetchNewEvent.statusText);
    }
}
}

//on submit button being clicked then add the details.
commentSubmit.addEventListener('submit', addComment);
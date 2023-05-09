{
    // Method to submit the form data for new post using ajax
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/add-new-post',
                data: newPostForm.serialize(),
                success: function(data) {
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // Method to create a post in DOM
    let newPostDom = function(post) {
        return (`
        <li id="post-${post._id}">
            <p>
                <small><a href="/posts/destroy/${post.id}" class="delete-post-button">X</a></small>
            </p>
            <br>
            ${post.content}
            <i>${post.user.name}</i>

            <div class="post-comments">
                <form action="/comments/new-comment" method="post">
                    <div>
                        <textarea name="content" id="" cols="30" rows="1" placeholder="Comment..."></textarea>
                    </div>
                    <input type="hidden" value="${post._id}" name="post" id="">
                    <div>
                        <button type="submit">Comment</button>
                    </div>
                </form>
            </div>
            <div class="post-comment-list">
                <ul id="post-comments-${ post._id }">
                    
                </ul>
            </div>
        </li>`)
    }

    createPost();
}
// Fetch all games
fetch('http://localhost:3000/games') // Change here
  .then((res) => res.json())
  .then((data) => {
    const posts_row = document.getElementById("posts_row");
    for (let post of data) {
      posts_row.innerHTML += `
        <div class="col-md-3 mb-2">
          <div class="bg-light p-1 border">
            <img src=${post.img_url} class="img-fluid" />
            <a href=${post.game_url}>GAME LINK</a>
            <h6 class="fw-bold">${post.title}</h6>
            <div class="row">
              <p class="col">${post.email}</p>
              <p class="col">${post.author}</p>
              <p class="col">${post.date}</p>
             <p class="col">${post.description}</p>
            </div>
            <button onclick="deletePost(${post.id})" class="btn btn-danger btn-sm">Delete</button>
            <button onclick="editPost(${post.id})" class="btn btn-success ms-4 btn-sm">Update</button> <!-- Corrected here -->
            <button onclick="viewPost(${post.id})" class="btn btn-danger btn-sm">View Post</button>
          </div>
        </div>
      `;
    }
  });

  // Add Post
const add_form = document.getElementById("add_post_form");

add_form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("gameName").value; // Update ID
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("imageUrl").value; // Update ID
  const author = document.getElementById("author").value; // Update ID
  const gameUrl = document.getElementById("gameUrl").value; // Update ID
  const date = document.getElementById("date").value; // Update ID
  const email=document.getElementById("email").value;

  fetch('http://localhost:3000/games', { // Change here
    method: 'POST',
    body: JSON.stringify({
      title: title,
      description: description,
      img_url: imageUrl,
      author: author,
      email:email,
      date: date,
      
      game_url: gameUrl, // Include game URL
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((res) => {
    const message = document.getElementById("message");
    message.innerText = "Post created Successfully";
  });
});
// Delete post function
function deletePost(id){
 
  fetch(`http://localhost:3000/games/${id}`, {
    method: 'DELETE',
  })
  .then((res)=> res.json() )
  .then((response) =>{
          const message = document.getElementById("delete_message");
          message.innerText = "Post deleted Successfully"
  })}
  function editPost(id) {
    fetch(`http://localhost:3000/games/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const edit_container = document.getElementById("edit_container");
  
        edit_container.innerHTML = `
          <h5>Edit Post</h5>
          <div id="update_message" class="text-success" role="alert"></div>
          <form id="edit_post_form">
            <div class="mb-3">
              <input type="text" class="form-control" id="edit_gameName" value="${data.title}" required placeholder="NAME OF THE GAME">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="edit_author" value="${data.author}" required placeholder="AUTHOR">
            </div>,,
            <div class="mb-3">
              <input type="email" class="form-control" id="edit_Email" value="${data.email}" required placeholder="EMAIL">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <input type="url" class="form-control" id="edit_gameUrl" value="${data.game_url}" required placeholder="GAME LINK">
            </div>
            <div class="mb-3">
              <input type="date" class="form-control" id="edit_date" value="${data.date}" required placeholder="Date">
            </div>
            <div class="mb-3">
              <input type="url" class="form-control" id="edit_imageUrl" value="${data.img_url}" required placeholder="IMAGE URL">
            </div>
            <div class="mb-3">
              <textarea class="form-control" rows="4" placeholder="Description" id="edit_description">${data.content}</textarea>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="termsCheck">
              <label class="form-check-label" for="termsCheck">Agree with terms and conditions</label>
            </div>
            <button type="submit" class="btn btn-primary">POST</button>
          </form>
        `;
  
        const edit_form = document.getElementById("edit_post_form");
  
        edit_form.addEventListener("submit", (event) => {
          event.preventDefault();
          const title = document.getElementById("edit_gameName").value;
          const description = document.getElementById("edit_description").value;
          const imageUrl = document.getElementById("edit_imageUrl").value;
          const author = document.getElementById("edit_author").value;
          const gameUrl = document.getElementById("edit_gameUrl").value;
          const date = document.getElementById("edit_date").value;
          const email=document.getElementById("edit_email").value;

          fetch(`http://localhost:3000/games/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              title: title,
              description: description,
              img_url: imageUrl,
              author: author,
              date: date,
             email:email,
              game_url: gameUrl,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((res) => {
              const update_message = document.getElementById("update_message");
              update_message.innerText = "Post Updated Successfully";
            });
        });
      });
  }
  

// Display single post

function viewPost(id) {
  fetch(`http://localhost:3000/games/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Game not found');
      }
      return res.json();
    })
    .then((data) => {
      const single_post = document.getElementById("single_post");
      single_post.innerHTML = `
        <div class="mb-2">
          <div class="bg-light p-1 border">
            <img src=${data.img_url} class="img-fluid" />
            <a href=${data.game_url}>GAME LINK</a>
            <h6 class="fw-bold">${data.title}</h6>
            <div class="row">
              
              <p class="col">${ data.author}</p>
              <p class="col">${ data.date}</p>
              <p class="col">${ data.email}</p>
              <p class="col">${ data.description}</p> 

            </div>
            <button onclick="deletePost(${data.id})" class="btn btn-danger btn-sm">Delete</button>
            <button onclick="editPost(${data.id})" class="btn btn-success ms-4 btn-sm">Update</button>
            <p>${data.content}</p>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
      alert("Game not found!");
    });
}



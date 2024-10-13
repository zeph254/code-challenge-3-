// Your code here
// poster, title, runtime, showtime, and available tickets
document.addEventListener("DOMContentLoaded", () => {
    let currentMovieId;
    let currentTicketsSold;
    let currentCapacity;

// Function to fetch movie details
function getMovieDetails() {
    fetch('http://localhost:3000/films/1') 
        .then(response => response.json())
        .then(movie => {
            currentMovieId = movie.id; 
            currentTicketsSold = movie.tickets_sold; 
            currentCapacity = movie.capacity; 
            updateMovieDetails(movie); 
        })
        .catch(error => console.error('Error fetching movie details:', error));
}


function updateMovieDetails(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;

    
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-runtime').textContent = movie.runtime;
    document.getElementById('movie-showtime').textContent = movie.showtime;
    document.getElementById('movie-tickets').textContent = availableTickets;
    document.getElementById('film-info').textContent = movie.description;
    document.getElementById('movie-poster').src = movie.poster;

    
    const buyButton = document.getElementById("buy-ticket");
    buyButton.onclick = () => {
        if (availableTickets > 0) {
            updateTicketsSold(currentMovieId, currentTicketsSold + 1);
        } else {
            alert('No tickets available for this movie.');
        }
    };
}


function getAllMovies() {
    fetch('http://localhost:3000/films')  
        .then(response => response.json())
        .then(movies => {
            const filmsList = document.getElementById('films');
            filmsList.innerHTML = '';

            
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.classList.add('film', 'item');
                li.textContent = movie.title;

                
                li.addEventListener('click', () => displayMovieDetails(movie));

                
                filmsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}


function displayMovieDetails(movie) {
    currentMovieId = movie.id; 
    currentTicketsSold = movie.tickets_sold; 
    currentCapacity = movie.capacity; 
    updateMovieDetails(movie); 
}

function updateTicketsSold(movieId, newTicketsSold) {
    fetch(`http://localhost:3000/films/${movieId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tickets_sold: newTicketsSold,
        }),
    })
    .then(response => response.json())
    .then(updatedMovie => {
        
        currentTicketsSold = updatedMovie.tickets_sold; 
        const availableTickets = updatedMovie.capacity - updatedMovie.tickets_sold;
        document.getElementById('movie-tickets').textContent = availableTickets;

        
        document.getElementById('buy-ticket').disabled = availableTickets <= 0;

        if (availableTickets <= 0) {
            alert('Tickets sold out!');
        } else {
            alert('Ticket purchased successfully!');
        }
    })
    .catch(error => console.error('Error updating tickets sold:', error));
}


getAllMovies();

getMovieDetails();
});


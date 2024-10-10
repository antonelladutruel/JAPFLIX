const input = document.getElementById("inputBuscar");
const btn = document.getElementById("btnBuscar");
const container = document.getElementById("lista");
const url = "https://japceibal.github.io/japflix_api/movies-data.json";
const movies= [];


fetch(url)
.then(res => res.json())
.then(data => data.forEach((product) => {
    movies.push({
        title: product.title,
        tagline: product.tagline,
        calification: product.vote_average,
        overview: product.overview,
        genres: product.genres,
        year: product.release_date.split('-')[0],
            runtime: product.runtime,
            budget: product.budget,
            revenue: product.revenue
    });
}))
.catch(error => console.error("error",error));


function generateStars(score) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            stars += `<span class="fa fa-star checked"></span>`;
        } else {
            stars += `<span class="fa fa-star"></span>`;
        }
    }
    return stars;
}


btn.addEventListener("click", filterMovie);

function filterMovie() {
    const inputValue = input.value.toLowerCase();
    container.innerHTML = "";

    if (inputValue === "") {
        container.innerHTML = `<p class="p-3 text-white bg-primary-subtle border border-primary-subtle rounded-3">Título no encontrado</p>`;
        return;
    }


    let found = false;

    movies.forEach((movie) => {
        if (
            movie.title.toLowerCase().includes(inputValue) || 
            movie.tagline.toLowerCase().includes(inputValue)
        ) {
            const stars = generateStars(Math.round(movie.calification/2));
            container.innerHTML += `
<div class="container mt-6">
  <div class="row justify-content-center">
    <div class="col-md-11">
      <div class="card mb-3 movie-card" data-overview="${movie.overview}" data-genres='${JSON.stringify(movie.genres)}'
      data-year="${movie.year}" 
           data-runtime="${movie.runtime}" 
           data-budget="${movie.budget}" 
           data-revenue="${movie.revenue}">
        <div class="card-body d-flex justify-content-between align-items-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
          <div >
            <h5 class="card-title text-white fw-bold">${movie.title}</h5>  
            <p class="card-text text-muted fst-italic"> ${movie.tagline}</p>
          </div>
                      <div class="stars">${stars}</div>
         </div>
       </div>
     </div>
   </div>
</div>
            `;
        found= true;
    } 
    });

    if (!found || ''){
        container.innerHTML=`<p class="p-3 text-white bg-primary-subtle border border-primary-subtle rounded-3">Título no encontrado</p>`;
    }


     const movieCards = document.querySelectorAll('.movie-card');
     movieCards.forEach(card => {
         card.addEventListener('click', () => {
             const overview = card.getAttribute('data-overview');
             const genresArray = JSON.parse(card.getAttribute('data-genres'));
             const genreNames = genresArray.map(genre => genre.name).join(', ');
             const year = card.getAttribute('data-year');
             const runtime = card.getAttribute('data-runtime');
             const budget = card.getAttribute('data-budget');
             const revenue = card.getAttribute('data-revenue');

             const offcanvasBody = document.querySelector('.offcanvas-body');
             offcanvasBody.innerHTML = `<p>${overview}</p>
               <hr class="text-muted">

             <p class="text-muted">${genreNames}</p>
             `;

             const dropdownItems = document.querySelectorAll('.dropdown-item');
             dropdownItems[0].textContent = `Year: ${year}`;
             dropdownItems[1].textContent = `Runtime: ${runtime} min`;
             dropdownItems[2].textContent = `Budget: $${budget.toLocaleString()}`;
             dropdownItems[3].textContent = `Revenue: $${revenue.toLocaleString()}`;
         });
     });
 }
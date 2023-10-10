
const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
const lista = document.getElementById("lista");
const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("inputBuscar");
const movies = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    movies.push(...data);
  } catch (error) {
    console.error(error);
  }

  function filterMovies(searchTerm) {
    return movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.genres.some((genre) => genre.name.toLowerCase().includes(searchTerm)) ||
        movie.tagline.toLowerCase().includes(searchTerm) ||
        movie.overview.toLowerCase().includes(searchTerm)
      );
    });
  }

  // Función para convertir vote_average a estrellas en checked
  function getStarsHTML(voteAverage) {
    const maxStars = 5;
    const selectedStars = Math.round(voteAverage / 2);
    let starsHTML = '';

    for (let i = 0; i < maxStars; i++) {
      if (i < selectedStars) {
        starsHTML += '<span class="fa fa-star  checked"></span>';
      } else {
        starsHTML += '<span class="fa fa-star"></span>';
      }
    }

    return starsHTML;
  }

  btnBuscar.addEventListener("click", () => {
    const searchTerm = inputBuscar.value.toLowerCase();
    const filteredMovies = filterMovies(searchTerm);
    filteredMovies.forEach((movie) => {
      const liElement = document.createElement("li");
      liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      const starsHTML = getStarsHTML(movie.vote_average); // Convierte vote_average a estrellas


      liElement.innerHTML = `<div class="ms-2 me-auto" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
      <div class="fw-bold text-light bg-dark">${movie.title}</div>
        
        <p>${movie.tagline} </p>
        </div>
        ${starsHTML}
        

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title text-dark w-50" id="offcanvasTopLabel">${movie.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="detailsOffCanvas">
              <p>${movie.overview}</p>
              <p>Géneros: ${movie.genres}</p>
            </div>
          </div>
          <div class="dropdown mt-3 d-flex justify-content-end p-2">
            <button class="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown">
              More
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Year: ${movie.release_date}</a></li>
              <li><a class="dropdown-item" href="#">Runtime: ${movie.runtime}</a></li>
              <li><a class="dropdown-item" href="#">Budget: ${movie.budget}</a></li>
              <li><a class="dropdown-item" href="#">Revenue: ${movie.revenue}</a></li>
            </ul>
          </div>
        </div>
      `;
      lista.appendChild(liElement);
    });
  })
  /*
    function movieDetails(movie) {
      const offCanvas = document.createElement('div');
      offCanvas.classList.add('offcanvas', 'offcanvas-top');
      offCanvas.setAttribute('tabindex', '-1');
      offCanvas.setAttribute('id', 'offcanvasTop');
      offCanvas.setAttribute('aria-labelledby', 'offcanvasTopLabel');
  
      offCanvas.innerHTML = `
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
          ...
          </div>
      `
    }
  */
});



/*
async function fetchData() {
  try {
    const response = await fetch('https://japceibal.github.io/japflix_api/movies-data.json');
    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, statusText: response.statusText };
    }

    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Limpia la lista antes de agregar nuevos elementos

    data.forEach((e) => {
      const $li = document.createElement('li');
      $li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

      const starsHTML = getStarsHTML(e.vote_average); // Convierte vote_average a estrellas

      $li.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${e.title}</div>
          <p>${e.tagline} </p>
        </div>
        ${starsHTML}
      `;

      lista.appendChild($li);
    });
  } catch (error) {
    console.error(error);
    let message = `Ocurrió un error con la respuesta: ${error.statusText}`;
    // Puedes mostrar el mensaje de error en el lugar que desees.
  }
}






fetchData();
*/
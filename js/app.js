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




fetchData();

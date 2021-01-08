const apiKey = "4831f8f1";

document.addEventListener("DOMContentLoaded", (e) => {
  let inputfield = document.getElementById("inputSearch");
  let searchResults = document.getElementById("searchResults");
  let noResult = document.getElementById("error-txt");
  let infobox = document.getElementById("infoBox");

  inputfield.addEventListener("input", (e) => {
    removeInfo();
    noResult.classList.add("hidden");

    while (searchResults.firstChild) {
      searchResults.removeChild(searchResults.lastChild);
    }

    if (inputfield.value.length >= 3) {
      let trimmedValue = inputfield.value.trim();

      fetch(`http://www.omdbapi.com/?s=${trimmedValue}*&apikey=${apiKey}&`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.lastChild);
          }

          if (!data.Search) {
            noResult.classList.remove("hidden");
          }

          if (data.Search && data.Search.length > 10) {
            data.Search = data.Search.slice(0, 10);
          }

          if (data.Search) {
            for (let i = 0; i < data.Search.length; i++) {
              let movieP = document.createElement("p");
              movieP.setAttribute(`id`, `movie${i + 1}`);
              movieP.innerHTML = data.Search[i].Title;
              searchResults.appendChild(movieP);
            }
          }

          let movieArray = Array.from(searchResults.childNodes);

          for (let i = 0; i < movieArray.length; i++) {
            movieArray[i].addEventListener("click", (e) => {
              removeInfo();
              let imdb_id = data.Search[i].imdbID;
              fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${apiKey}&`)
                .then((resp) => {
                  return resp.json();
                })
                .then((data) => {
                  infobox.classList.remove("hidden");

                  let poster = document.createElement("img");
                  poster.src = `${data.Poster}`;
                  infobox.appendChild(poster);

                  let titleP = document.createElement("p");
                  titleP.innerHTML = `<span>${data.Title}</span>`;
                  infobox.appendChild(titleP);

                  let yearP = document.createElement("p");
                  yearP.innerHTML = `<span>År:</span> ${data.Year}`;
                  infobox.appendChild(yearP);

                  let genreP = document.createElement("p");
                  genreP.innerHTML = `<span>Genre:</span> ${data.Genre}`;
                  infobox.appendChild(genreP);

                  let plotP = document.createElement("p");
                  plotP.innerHTML = `<span>Handling: </span>${data.Plot}`;
                  infobox.appendChild(plotP);

                  let imdbP = document.createElement("p");
                  imdbP.innerHTML = `<a href="https://www.imdb.com/title/${data.imdbID}/" target="blank"><img src ="imdb.png" width="150px"></a>`;
                  infobox.appendChild(imdbP);
                })

                .catch((error) => {
                  console.log(`Something went wrong: ${error}`);
                  infobox.classList.remove("hidden");
                  infobox.innerHTML = `<span class="errorInfo">Något gick fel: ${error}</span>`;
                });
            });
          }
        })

        .catch((error) => {
          console.log(`Something went wrong: ${error}`);
          noResult.innerHTML = `Något gick fel: ${error}`;
          noResult.classList.remove("hidden");
        });
    }
  });
  let removeInfo = () => {
    infobox.innerHTML = "";
    infobox.classList.add("hidden");
  };
});

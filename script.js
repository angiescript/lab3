/* Filmsökning (Svenska)
Angelika Johansson, grupp 4, Frontend EHBFEV21, EC Utbildning

Dokumentet är strukturerat enligt följande:
1. Sparande av api-nyckel 
2. Laddar in DOM-trädet
3. Deklarerar variabler för DOM-noder samt API-datan
4. Eventlyssnare på inputfältet
5. Funktioner som körs i eventlyssnaren:
    - removeInfo() "städar" eventuell information från infobox-diven.
    - hideErrorTxt() döljer felmeddelandet.
    - showErrorTxt() visar felmeddelandet. 
    - clearSearch() tar bort tidigare söknings film-lista.
    - fetchSearch() är API-anropet som körs när användaren skriver in minst tre tecken i input-fältet.
                    Därefter kortas resultaten ner till max 10, och skapar <p>-taggar med filmens titel.
                    Funktionen skapar också en array med alla filmtitlar i och kallar också på fetchMovie(). 
    - fetchMovie() skapar eventlyssnare på samtliga <p>-taggar i resultatlistan från fetchSearch. När 
                    användaren klickar på någon av dem körs removeInfo() för att ta bort eventuell tidigare
                    information om annan film, därefter synliggörs infobox-diven med information om filmen.
*/

const apiKey = "4831f8f1";

document.addEventListener("DOMContentLoaded", (e) => {
  let inputfield = document.getElementById("inputSearch");
  let searchResults = document.getElementById("searchResults");
  let errorTxt = document.getElementById("error-txt");
  let infobox = document.getElementById("infoBox");
  let apiData;

  inputfield.addEventListener("input", (e) => {
    removeInfo();
    hideErrorTxt();
    clearSearch();
    fetchSearch();
    
  });

  let removeInfo = () => {
    infobox.innerHTML = "";
    infobox.classList.add("hidden");
  };

  let hideErrorTxt = () => {
    errorTxt.classList.add("hidden");
  };

  let showErrorTxt = () => {
    errorTxt.classList.remove("hidden");
  };

  let clearSearch = () => {
    while (searchResults.firstChild) {
      searchResults.removeChild(searchResults.lastChild)
    }
  };

  let fetchSearch = () => {
    if (inputfield.value.length >= 3) {
      let trimmedValue = inputfield.value.trim();

      fetch(`http://www.omdbapi.com/?s=${trimmedValue}*&apikey=${apiKey}&`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {

          clearSearch();
          apiData = data;
          if (!apiData.Search) {
            showErrorTxt();
          }

          if (apiData.Search && apiData.Search.length > 10) {
            apiData.Search = apiData.Search.slice(0, 10);
          }

          if (apiData.Search) {
            for (let i = 0; i < apiData.Search.length; i++) {
              let movieP = document.createElement("p");
              movieP.setAttribute(`id`, `movie${i + 1}`);
              movieP.innerHTML = apiData.Search[i].Title;
              searchResults.appendChild(movieP);
            }
          }

          let movieArray = Array.from(searchResults.childNodes);
          fetchMovie(movieArray);
          
        })

        .catch((error) => {
          console.log(`Something went wrong: ${error}`);
          errorTxt.innerHTML = `Något gick fel: ${error}`;
          showErrorTxt();
        });
    }

   
  };

  let fetchMovie = (movieArray) => {
    for (let i = 0; i < movieArray.length; i++) {
      movieArray[i].addEventListener("click", (e) => {
        removeInfo();
        let imdb_id = apiData.Search[i].imdbID;
        fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${apiKey}&`)
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            infobox.classList.remove("hidden");

            if (data.Poster ==="N/A"){
              let noPoster = document.createElement("p");
              noPoster.innerHTML="Det finns ingen bild att visa för denna film.";
              infobox.appendChild(noPoster); 
            } else {
            let poster = document.createElement("img");
            poster.src = `${data.Poster}`;
            infobox.appendChild(poster);
            };

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
  };

});

/* TODO:
1. Catch?
2. Ta bort filmer i diven som redan ligger i infobox när man gör en ny sökning ELLER klickar på en ny film.
3. Classer?
4. Styla allt. */

const apikey = "4831f8f1";

document.addEventListener("DOMContentLoaded", (e) => {
  let inputfield = document.getElementById("movie");
  let datadiv = document.getElementById("movies");
  let noResult = document.getElementById("error-txt");
  let infobox = document.getElementById("info");
 

  inputfield.addEventListener("input", (e) => {
    
    noResult.classList.add("hidden");

    while (datadiv.firstChild) {
      datadiv.removeChild(datadiv.lastChild);
    }

    if (inputfield.value.length >= 3) {
      //let space = inputfield.value.replace(/ /g, "*");
      let space = inputfield.value.trim();

      fetch(`http://www.omdbapi.com/?s=${space}*&apikey=${apikey}&`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          while (datadiv.firstChild) {
            datadiv.removeChild(datadiv.lastChild);
          }

          if (!data.Search) {
            noResult.classList.remove("hidden");
          }

          if (data.Search && data.Search.length > 10) {
            data.Search = data.Search.slice(0, 10);
          }

          if (data.Search) {
            for (let i = 0; i < data.Search.length; i++) {
              let moviep = document.createElement("p");
              moviep.setAttribute(`id`, `movie${i+1}`)
              moviep.innerHTML = data.Search[i].Title;
              datadiv.appendChild(moviep);

            }
          }

          let moviearray = Array.from(datadiv.childNodes);
          console.log(moviearray)
          console.log(typeof moviearray)
          
          for (let i=0; i < moviearray.length; i++) {
            moviearray[i].addEventListener("click", (e) => {

              let imdb_id = data.Search[i].imdbID
              fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${apikey}&`)
              .then((resp) => {
                return resp.json();
              })
              .then(data => {
                infobox.classList.remove("hidden");

                let poster = document.createElement("img");
                poster.src = `${data.Poster}`
                infobox.appendChild(poster);

                let titlep = document.createElement("p");
                titlep.innerHTML = data.Title;
                infobox.appendChild(titlep);

                let yearp = document.createElement("p");
                yearp.innerHTML = (`År: ${data.Year}`)
                infobox.appendChild(yearp);

                let genrep = document.createElement("p");
                genrep.innerHTML = (`Genre: ${data.Genre}`);
                infobox.appendChild(genrep);
                
                let plotp = document.createElement("p");
                plotp.innerHTML = (`Handling: ${data.Plot}`);
                infobox.appendChild(plotp);

                let imdblinkp = document.createElement("p");
                imdblinkp.innerHTML = (`<a href="https://www.imdb.com/title/${data.imdbID}/" target="blank">IMDB-länk</a>`);
                infobox.appendChild(imdblinkp);

              })
            })
          }

        })

        .catch((error) => {
          console.log(`${error}`);
        });
   
    }
  });

  
  

});

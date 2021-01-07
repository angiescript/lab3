/* TODO:
1. Catch?
2. Om användaren klickar på ett resultat - visa upp mer info i ny div. Göra musen till "click" på dessa. */

const apikey = "4831f8f1";

document.addEventListener("DOMContentLoaded", (e) => {
  let inputfield = document.getElementById("movie");
  let dataList = document.getElementById("movies");
  let noResult = document.getElementById("error-txt");

  inputfield.addEventListener("input", () => {
    noResult.classList.add("hidden");

    while (dataList.firstChild) {
      dataList.removeChild(dataList.lastChild);
    }

    if (inputfield.value.length >= 3) {
      let space = inputfield.value.replace(/ /g, "*");
      console.log(space);

      fetch(`http://www.omdbapi.com/?s=${space}*&apikey=${apikey}&`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          while (dataList.firstChild) {
            dataList.removeChild(dataList.lastChild);
          }

          if (!data.Search) {
            noResult.classList.remove("hidden");
          }

          if (data.Search && data.Search.length > 10) {
            data.Search = data.Search.slice(0, 10);
          }

          if (data.Search) {
            for (let i = 0; i < data.Search.length; i++) {
              option = document.createElement("option");
              option.value = data.Search[i].Title;
              dataList.appendChild(option);
            }
          }
        })

        .catch((error) => {
          console.log(`${error}`);
        });
    }
  });
});

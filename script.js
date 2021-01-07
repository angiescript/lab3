/* TODO:
1. Visa upp 10 första resultatens titlar i <p>-taggarna
2. Om vi inte får några träffar ska det stå "inga träffar" i sökresultat med catch. Hantera catch.
3. Om användaren klickar på ett resultat - visa upp mer info i ny div. Göra musen till "click" på dessa. */

const apikey = "4831f8f1";

document.addEventListener("DOMContentLoaded", (e) => {
    let inputfield = document.getElementById("search");

    inputfield.addEventListener("input", () => {
        if (inputfield.value.length >= 3) {
            fetch(`http://www.omdbapi.com/?s=${inputfield.value}*&apikey=${apikey}&`)
            .then(resp => {
            return (resp.json())
            })
            .then(data => {
            for (let movie of data.Search) {
              console.log(movie.Title)
            }
            
            })
            .catch(error => {
                console.error(`${error} 💥💥💥`);
                //renderError(`Something went wrong! ${err.message}. Try again!`)
            })
        }
        
        
        //console.log(inputfield.value)

        
    

    });









});


/* let button = document.getElementById("button")
button.addEventListener("click", () => {
    fetch("http://www.omdbapi.com/?s=pulp&apikey=4831f8f1&")
    .then(resp => {
        return (resp.json())
    })
    .then(data => {
        console.log(data)
    });
}); */
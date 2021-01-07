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
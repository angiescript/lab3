/* TODO:
1. Visa upp 10 första resultatens titlar i <p>-taggarna
2. Om vi inte får några träffar ska det stå "inga träffar" i sökresultat med catch. Hantera catch.
3. Om användaren klickar på ett resultat - visa upp mer info i ny div. Göra musen till "click" på dessa. */

const apikey = "4831f8f1";
let m1 = document.getElementById("m1");
let m2 = document.getElementById("m2");
let m3 = document.getElementById("m3");
let m4 = document.getElementById("m4");
let m5 = document.getElementById("m5");
let m6 = document.getElementById("m6");
let m7 = document.getElementById("m7");
let m8 = document.getElementById("m8");
let m9 = document.getElementById("m9");
let m10 = document.getElementById("m10");

document.addEventListener("DOMContentLoaded", (e) => {
  let inputfield = document.getElementById("search");
let dataList = document.getElementById("movies");


  inputfield.addEventListener("input", () => {
    if (inputfield.value.length >= 3) {
      fetch(`http://www.omdbapi.com/?s=${inputfield.value}*&apikey=${apikey}&`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
            let option;
          
           for (let movie of data.Search) {
            console.log(movie.Title);
            m1.innerHTML = `${movie.Title}`;
            }
            for (let i = 0; i < data.Search.length; i++) {
                option = document.createElement('option');
                  option.text = data.Search[i].Title;
                  dataList.add(option);
              }    
        });
      // .catch((error) => {
      //   m1.innerHTML(`No movie found`);
      //   console.error(`${error} No movie found`);
      // });
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

/*

let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose State/Province';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = 'https://api.myjson.com/bins/7xq2x';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].name;
      	  option.value = data[i].abbreviation;
      	  dropdown.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });*/

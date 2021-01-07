/* TODO:
1. Om vi inte får några träffar ska det stå "inga träffar" i sökresultat med catch. Hantera catch.
2. Om användaren klickar på ett resultat - visa upp mer info i ny div. Göra musen till "click" på dessa. */

const apikey = "4831f8f1";

document.addEventListener("DOMContentLoaded", (e) => {
  let inputfield = document.getElementById("movie");
let dataList = document.getElementById("movies");


  inputfield.addEventListener("input", () => {
    if (inputfield.value.length >= 3) {
      fetch(`http://www.omdbapi.com/?s=${inputfield.value}*&apikey=${apikey}&`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
            while (dataList.firstChild) {
                dataList.removeChild(dataList.lastChild);
              }
              console.dir(data)
            //if (data.Response == "False") {
                if(!data.Search){
                console.log("inga filmer hittatdes")
                option = document.createElement('option');
                option.value = "Inga filmer hittades: " + inputfield.value;
                  dataList.appendChild(option);
            }
            console.log("2")
            if (data.Search && data.Search.length >10) {
                data.Search = data.Search.slice(0,10);
            }
            console.log("3")
            if (data.Search) {
                for (let i = 0; i < data.Search.length; i++) {
                    option = document.createElement('option');
                    option.value = data.Search[i].Title;
                    dataList.appendChild(option);
                }   
            }
          
             
        })
        
         .catch((error) => {
         console.log(`${error}`)
        //console.error(`${error} No movie found`);
      });
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

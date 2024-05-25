const searchFormEl = document.querySelector('#searchpage');
const apiKey = "c8b61dd674f9e6e05e9b9f07ff9b9665";

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#Input1').value;
  

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

}

searchApi(searchInputVal);


searchFormEl.addEventListener('submit', handleSearchFormSubmit);



function searchApi(query){
  let locQueryUrl = https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
}

if ()

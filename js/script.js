const input = document.getElementById("inputBuscar");
const btn = document.getElementById("btnBuscar");
const container = document.getElementById("lista");
const url = "https://japceibal.github.io/japflix_api/movies-data.json";
const titles= [];
const overviews = [];
const calification = [];


fetch(url)
.then(res => res.json())
.then(data => data.forEach((product) => {
titles.push(product.title);
overviews.push(product.overview);
calification.push(product.vote_average);

}))
.catch("error", console.error);



btn.addEventListener("click", filterMovie);

function filterMovie(){
 const inputValue = input.value.toLowerCase();
 container.innerHTML = "";
}

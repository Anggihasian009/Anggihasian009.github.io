
//let pencarian dimana fungsi dari queryselector ini untuk mengambil satu elemen 
let search = document.querySelector('.search-input')
let wrap = document.querySelector('.recipe-wrap')
let loader = document.querySelector('.loader')

//mengakses data yang dikirmkan dari website ke pengunjung
fetchRecipe('https://masak-apa-tomorisakura.vercel.app/api/recipes')
document.querySelector('.search-btn').addEventListener('click', function () {
  fetchRecipe('https://masak-apa-tomorisakura.vercel.app/api/search/?q=' + search.value)
})
//metode querySelector() mengembalikan elemen pertama yang cocok dengan pemilih CSS.
document.querySelector('.reset-btn').addEventListener('click', function () {
  search.value = ''
  fetchRecipe('https://masak-apa-tomorisakura.vercel.app/api/recipes')
})

function fetchRecipe(url) {
  loader.style.display = 'inline'
  fetch(url)
    .then(response => response.json())
    .then(function (resep) {
      let data = resep.results
      wrap.innerHTML = ''
      insertToList(data)
      loader.style.display = "none"
    })
    .catch(function(err) {
      alert(err)
      loader.style.display = "none"
    })
    
}

function insertToList(recipes) {
  recipes.forEach(rsp => {
    let key = rsp.key
    let name = key.replace(/-/g, " ")

    wrap.insertAdjacentHTML('beforeend',
      `<div class="col-lg-4 col-6">
            <div class="recipe-item">
              <div class="img">
                <img class="img-fluid w-100" src="${rsp.thumb}" alt="">
              </div>
              <div class="text">
                <p class="title"><a href="detail.html?resep=${rsp.key}">${name}<a/></p>
                <p class="description">${rsp.title}....</p>
              </div>
            </div>
          </div>`
    )
  });
}
const searchForm = document.getElementById('search');
const searchText = document.getElementById('searchText');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('show-more');

const key = "WnEywH-Nkm6bZgr-x_37fHlEcvnfMhYZFPjIcV2Ujf0";
let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchText.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents reloading the page or navigating to a new one
    page = 1;
    searchImages();
});
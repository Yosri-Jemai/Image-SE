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
    if(page === 1){
        searchResult.innerHTML = "";
    }
    const results = data.results;
    results.map(result => {
        const image = document.createElement("img");
        image.src = result.urls.small; //Display small size image
        const imageLink = document.createElement("a");
        imageLink.href = result.urls.full; //Download full size image
        imageLink.download = `${searchText.value}_${result.id}.jpg`;
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);

        // Event listener to trigger download
        imageLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent opening the link
            fetch(imageLink.href)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = imageLink.download;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Error downloading image: ', error));
        });
    })
    showMore.style.display = "block";
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); //Prevents reloading the page
    page = 1;
    searchImages();
});

showMore.addEventListener('click', () => {
    page++;
    searchImages();
})
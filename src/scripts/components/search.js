import { scrollToTop } from "./navbar";

scrollToTop;
export const renderSearchBar = () => {
  const menu = document.getElementById("menu");
  const search = document.createElement("li");
  // search.classList.add('search')
  search.setAttribute("id", "search");
  menu.appendChild(search);
  search.innerHTML = `
 <input id="searchInput" type="text" placeholder='🔍Search...'>
 `;
};

export function handleSearch(games, main) {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (event) => {
    event.preventDefault();
    const searchTerm = event.target.value;
    if (searchTerm.length > 3) {
      getSearchResult(games, searchTerm, main);
    } else if (searchTerm === "") {
      main.innerHTML = "";
      main.style.backgroundColor = "#132f4c";
      main.innerHTML = `<h1 style="color:white;">Please Type Something to Search!</h1>`;
    } else if (searchTerm.length < 3) {
      main.innerHTML = "";
      main.style.backgroundColor = "#132f4c";
      main.innerHTML = `<h1 style="color:white;">Search Keywords Need To Be Longer Than 3 Characters</h1>`;
    } else {
      main.style.backgroundColor = "#132f4c";
      main.innerHTML = "";
      main.innerHTML = `<img src="https://cdn.discordapp.com/attachments/952591530626023464/1085403940591501342/404.png" width="600px">`;
    }
  });
}

function getSearchResult(games, searchTerm, main) {
  games.forEach((game) => {
    const gameTitle = game.title.toLowerCase();
    const searchInput = searchTerm.toLowerCase();
    if (gameTitle[0] === searchInput[0] && gameTitle.includes(searchInput)) {
      let id = game.id;


      fetch(`https://mmo-games.p.rapidapi.com/game?id=${id}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "5baae6da7amsh6d563cbf11ac2a0p1d6d56jsn48853ab50d67",
          "X-RapidAPI-Host": "mmo-games.p.rapidapi.com",
        },
      })
        .then((res) => res.json())
        .then((data) => {

          main.innerHTML = "";
          const detail_section = document.createElement("div");
          detail_section.classList.add("d_main");
            const image =
              data.screenshots.length !== 0
                ? [data.screenshots[0].image]
                : [
                    "https://via.placeholder.com/640x360?text=No+image+available",
                  ];
          detail_section.innerHTML = `

  <div class="d_pictures">
  <h1>${data.title}</h1>
   <div class="d_thumbnail"  style="background-image: url('${data.thumbnail}'); background-size: cover;"></div>
      <div class="d_information">

      <ul class="d_sub">
        <li><h4>Title</h4></li>
        <li>${data.title}</li>
        <li><h4>Release Date</h4></li>
        <li>${data.release_date}</li>
        <li><h4>Developer</h4></li>
        <li>${data.developer}</li>
        <li><h4>Genre</h4></li>
        <li>${data.genre}</li>
        <li><h4>Publisher</h4></li>
        <li>${data.publisher}</li>
        <li><h4>Platform</h4></li>
        <li>${data.platform}</li>
      </ul>
    </div>
  </div>
  <div class="d_details">
      <div class="d_screenshot">

    <img src="${image[0]}" alt="${data.title} screenshot">

    </div>

    <div class="d_bar">
   <h1>Description</h1>
   </div>
    <div class="d_description">${data.description}   <a id="play" href=${data.game_url} target="_blank">Play Now</a> </div>



  </div>

            `;
          main.appendChild(detail_section);
          main.style.backgroundColor = "#132f4c";
          scrollToTop();
        });
    } //else{
    //   main.innerHTML = "";
    //   main.innerHTML = "can't find it ";
    // }
  });
}

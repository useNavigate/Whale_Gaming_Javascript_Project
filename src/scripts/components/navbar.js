import { createChart } from "./chart/lineChart";

export const renderNavbar = () => {

    const navBar = document.getElementById('menu')
    navBar.innerHTML = `
    <li><a href="https://usenavigate.github.io/Whale_Gaming_Javascript_Project/"><h1>🐳🐋</h1></a></li>
    <li id="game_menu">Games</li>
    <li id="profile_menu">Profile</li>
    <li id="stat_menu">Statistics</li>
    `;


};

export function handleNavbarClick(allData, data) {
  const gameMenu = document.querySelector("#game_menu");
  const statMenu = document.querySelector("#stat_menu")
  statMenu.addEventListener("click", (event) => {
    event.preventDefault();
    main.innerHTML = "";
    // handleFilter(data);
    createChart(allData,data);

    // createMultiChart(dispatchGenre(data));
  });

  gameMenu.addEventListener("click",event=>{
    event.preventDefault()
    main.innerHTML=""
 allData.forEach((game) => {
   const card = document.createElement("div");
   main.classList.add('card_page')
   card.innerHTML = `
<div class="card" style="background-image: url('${game.thumbnail}'); background-size: cover;">
      <ul class="card_info">
      <li><h1 id ="game_title">${game.title}</h1></li>
      <li class="genre">${game.genre}</li>
      <li class="description">${game.short_description}</li>
      </ul>
      </div>
      `;
   main.appendChild(card);
 })
  })
}

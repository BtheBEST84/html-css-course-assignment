const loadGames = async () => {
  try {
    const result = await fetch("https://v2.api.noroff.dev/gamehub");
    const games = await result.json();

    document.getElementById("game-row").innerHTML = `
        
    ${games.data
      .map(function (game) {
        return `
        <div id="games-in-list">
        <a href="game_spacewar.html">
                <img
                  src="${game.image.url}"
                  class="gameCover"
                  alt="${game.image.alt}"
                >
              </a>  
              <div class="div-btn-add-to-shopping-cart">
                <a class="btn btn-add-to-shopping-cart" href="#button-press">
                  <span class="material-symbols-outlined size-32">
                  add_shopping_cart
                  </span>
                </a>
              </div>
              <p class="game-title">${game.title}</p>
              <div class="game-details">
                <p class="price">$ ${game.price}</p>
                <a class="btn btn-details" href="game_spacewar.html">DETAILS</a>
              </div>
              </div>
        `;
      })
      .join("")}
    `;
    console.log(games.data[0].title);
  } catch (error) {
    console.log("ERROR!", error);
  }
};

loadGames();

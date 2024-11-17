// Load games
let gamesList = [];
let games = [];
let filterGenre = [];

// Create cart array
let cartList = JSON.parse(localStorage.getItem("cartList"));
let cart;

if (JSON.parse(localStorage.getItem("cartList")) === null) {
  cart = [];
} else {
  cart = cartList;
}

getGames();

async function getGames() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/gamehub");
    const data = await response.json();
    gamesList = data;
    renderFilterButtons();
    renderGames();
  } catch (error) {
    alert("Something went wrong when trying to load the games");
    console.log("ERROR!", error);
  }
}

// Render games based on filter
function renderGames(filteredGames = gamesList.data) {
  const gameRowElement = document.getElementById("game-row");

  if (!filteredGames || filteredGames.length === 0) {
    gameRowElement.innerHTML = "<p>No games found for this genre.</p>";
    return;
  }

  gameRowElement.innerHTML = filteredGames
    .map((game) => {
      return `
        <div id="games-in-list" class="game-card">
          <a href="game_${game.id}.html">
            <img
              src="${game.image?.url || "placeholder.jpg"}"
              class="gameCover"
              alt="${game.image?.alt || "Game cover"}"
            >
          </a>
          <div class="div-btn-add-to-shopping-cart" onclick="addToCart('${
            game.id
          }')">
            <a class="btn btn-add-to-shopping-cart">
              <span class="material-symbols-outlined size-32">
                add_shopping_cart
              </span>
            </a>
          </div>
          <p class="game-title">${game.title}</p>
          <div class="game-details">
            <p class="price">$ ${game.price.toFixed(2)}</p>
            <a class="btn btn-details" href="game_${game.id}.html">DETAILS</a>
          </div>
        </div>
      `;
    })
    .join("");
  document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html"
                  ><span class="material-symbols-outlined size-36"
                    >shopping_cart</span
                  >CART (${cart.length})</a
                >
    `;
}

// Render filter buttons
function renderFilterButtons() {
  const filtersElement = document.getElementById("filters");
  const genres = [...new Set(gamesList.data.map((game) => game.genre))];

  // Add a "Show All" button
  const showAllButton = document.createElement("button");
  showAllButton.innerHTML = "Show All";
  showAllButton.classList.add("filter-button");
  showAllButton.addEventListener("click", () => renderGames());
  filtersElement.appendChild(showAllButton);

  // Add buttons for each unique genre
  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.innerHTML = genre;
    button.classList.add("filter-button");
    button.addEventListener("click", () => {
      const filteredGames = gamesList.data.filter(
        (game) => game.genre === genre
      );
      renderGames(filteredGames);
    });
    filtersElement.appendChild(button);
  });
}

function addToCart(id) {
  //check if the product is already in the cart

  if (cart.some((item) => item.id === id)) {
    document.getElementById("main").innerHTML = `
    
        <div class="modal">
          <h2>YOU CAN ONLY BUY ONE COPY</h2>
          <div class="modal-content">
            <a class="close" href="games.html">&times;</a>
            <span class="material-symbols-outlined" id="checked">X</span>
          </div>
        </div>
    
    `;
  } else {
    const item = gamesList.data.find((game) => game.id === id);
    cart.push(item);
    document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html"
                  ><span class="material-symbols-outlined size-36"
                    >shopping_cart</span
                  >CART (${cart.length})</a
                >
                <div id="checkout" class="overlay">
        
    `;
    document.getElementById("main").innerHTML = `
    
        <div class="modal">
          <h2>GAME ADDED SUCCESSFULLY</h2>
          <div class="modal-content">
            <a class="close" href="games.html">&times;</a>
            <span class="material-symbols-outlined" id="checked"> check </span>
          </div>
        </div>
    
    `;
    localStorage.setItem("cartList", JSON.stringify(cart));
    let cartList = JSON.parse(localStorage.getItem("cartList"));
  }
}

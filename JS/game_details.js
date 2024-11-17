// Load games
let gamesList = JSON.parse(localStorage.getItem("gamesList")) || [];
let cart = JSON.parse(localStorage.getItem("cartList")) || [];

let games = [];
let filterGenre = [];

let cartList = JSON.parse(localStorage.getItem("cartList"));

if (JSON.parse(localStorage.getItem("cartList")) === null) {
  cart = [];
} else {
  cart = cartList;
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the game ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("id");

  // Retrieve the games list from localStorage
  const gamesList = JSON.parse(localStorage.getItem("gamesList"));

  // Find the game by ID
  const game = gamesList.data.find((g) => g.id === gameId);

  if (!game) {
    document.getElementById("game-details-container").innerHTML =
      "<p>Game not found.</p>";
    return;
  }

  // Render the game details
  const gameDetailsHtml = `
    
  <div class="div-game-picture-and-info">
          <div class="div-game-details-picture">
            <div class="main-picture flex-colmn">
              <img
                class="game-details-picture"
                src="${game.image.url}"
                alt="${game.image.alt}"
              />
             
            </div>

            
          </div>

          <div class="div-flex-column game-page-title">
            <h1>${game.title}</h1>
            <p class="game-details-text">Genre: ${game.genre}</p>
            <p class="game-details-text">Released: ${game.released}</p>
            
            <div class="div-flex-row row">
              <p class="game-details-price">$ ${game.price}</p>
              <a class="btn btn-details-add-to-cart" onclick="addToCart('${game.id}')""
                >Add to cart</a
              >
            </div>

            <p>
              ${game.description}
            </p>
            
          </div>
        </div>
      </div>
      
  `;

  document.getElementById("game-details").innerHTML = gameDetailsHtml;
  document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html">
      <span class="material-symbols-outlined size-36">shopping_cart</span>
      CART (${cart.length})
    </a>
  `;

  // Add to cart functionality on this page
});

function addToCart(id) {
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
    const gameToAdd = gamesList.data.find((game) => game.id === id);
    cart.push(gameToAdd);
    localStorage.setItem("cartList", JSON.stringify(cart));
    renderCart();
    document.getElementById("main").innerHTML = `
    
        <div class="modal">
          <h2>GAME ADDED SUCCESSFULLY</h2>
          <div class="modal-content">
            <a class="close" href="games.html">&times;</a>
            <span class="material-symbols-outlined" id="checked"> check </span>
          </div>
        </div>
    
    `;
  }
}

function renderCart() {
  document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html"
                  ><span class="material-symbols-outlined size-36"
                    >shopping_cart</span
                  >CART (${cart.length})</a
                >
    `;
}

// Initialize games and filters
let gamesList = [];
let games = [];
let filterGenre = [];

// Initialize cart array
let cart = [];

// Retrieve cart data from localStorage
const storedCart = localStorage.getItem("cartList");

if (storedCart) {
  try {
    cart = JSON.parse(storedCart); // Parse the stored cart
    if (!Array.isArray(cart)) {
      cart = []; // Reset to empty array if stored data is not an array
    }
  } catch (error) {
    console.error("Failed to parse cart data from localStorage:", error);
    cart = []; // Reset to empty array on parse error
  }
}

// Fetch games and initialize data
getGames();

async function getGames() {
  const loadingSpinner = document.getElementById("loading-spinner");

  // Show the spinner before the fetch begins
  loadingSpinner.style.display = "block";

  try {
    const response = await fetch("https://v2.api.noroff.dev/gamehub");
    const data = await response.json();

    // Save data to localStorage and populate gamesList
    localStorage.setItem("gamesList", JSON.stringify(data));
    gamesList = data;

    // Render filters and games
    renderFilterButtons();
    renderGames();
  } catch (error) {
    alert("Something went wrong when trying to load the games");
    console.error("Error fetching games:", error);
  } finally {
    // Hide the spinner once the fetch and rendering are complete
    loadingSpinner.style.display = "none";
  }
}

// Render games based on filter
function renderGames(filteredGames = gamesList?.data || []) {
  const gameRowElement = document.getElementById("game-row");

  if (!filteredGames || filteredGames.length === 0) {
    gameRowElement.innerHTML = "<p>No games found for this genre.</p>";
    return;
  }

  gameRowElement.innerHTML = filteredGames
    .map((game) => {
      return `
        <div id="games-in-list" class="game-card">
          <a href="game_details.html?id=${game.id}">
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
              <span class="material-symbols-outlined size-32">add_shopping_cart</span>
            </a>
          </div>
          <p class="game-title">${game.title}</p>
          <div class="game-details">
            <p class="price">$ ${game.price.toFixed(2)}</p>
            <a class="btn btn-details" href="game_details.html?id=${
              game.id
            }">DETAILS</a>
          </div>
        </div>
      `;
    })
    .join("");

  // Update the cart display
  document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html">
      <span class="material-symbols-outlined size-36">shopping_cart</span>
      CART (${cart.length})
    </a>
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

// Add a game to the cart
function addToCart(id) {
  // Ensure gamesList is populated before proceeding
  if (!gamesList || !gamesList.data) {
    alert("Games data is not available yet. Please try again.");
    return;
  }

  // Check if the product is already in the cart
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

    // Add item to the cart
    if (item) {
      cart.push(item);

      // Save the updated cart to localStorage
      localStorage.setItem("cartList", JSON.stringify(cart));

      // Update cart display
      document.getElementById("shopping-cart").innerHTML = `
        <a href="shopping-cart.html">
          <span class="material-symbols-outlined size-36">shopping_cart</span>
          CART (${cart.length})
        </a>
      `;

      // Show success modal
      document.getElementById("main").innerHTML = `
        <div class="modal">
          <h2>GAME ADDED SUCCESSFULLY</h2>
          <div class="modal-content">
            <a class="close" href="games.html">&times;</a>
            <span class="material-symbols-outlined" id="checked">check</span>
          </div>
        </div>
      `;
    } else {
      alert("Unable to find the selected game. Please try again.");
    }
  }
}

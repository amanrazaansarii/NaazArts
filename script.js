// ---- Mobile nav toggle (runs on every page) ----
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
});

// ---- Shop page: product data + category filter ----
// To add/remove/edit products, just edit this array.
// "category" must exactly match one of the data-category values
// on the filter pills in shop.html.
const PRODUCTS = [
  { name: "Marble tray — sage",           category: "Premium trays",      price: "$28",     swatch: "var(--tone-1)", badge: "new" },
  { name: "Marble tray — terracotta",     category: "Premium trays",      price: "$28",     swatch: "var(--tone-2)" },
  { name: "Pastel tray — blush",          category: "Premium trays",      price: "$26",     swatch: "var(--tone-3)" },
  { name: "Earthy tray — clay",           category: "Premium trays",      price: "$26",     swatch: "var(--tone-4)" },

  { name: "Raw tray — round, blank",      category: "Raw trays — DIY",    price: "$14",     swatch: "var(--tone-3)" },
  { name: "Raw tray — square, blank",     category: "Raw trays — DIY",    price: "$14",     swatch: "var(--tone-6)" },
  { name: "Raw tray + paint kit",         category: "Raw trays — DIY",    price: "$22",     swatch: "var(--tone-2)", badge: "new" },
  { name: "Raw figurine kit — kids",      category: "Raw trays — DIY",    price: "$18",     swatch: "var(--tone-8)" },

  { name: "Pastel vase",                  category: "Vases",              price: "$34",     swatch: "var(--tone-2)", badge: "new" },
  { name: "Marble-effect vase",           category: "Vases",              price: "$36",     swatch: "var(--tone-9)" },
  { name: "Hand-painted vase",            category: "Vases",              price: "$40",     swatch: "var(--tone-6)" },

  { name: "Earth-tone coaster set",       category: "Coasters",           price: "$16",     swatch: "var(--tone-5)" },
  { name: "Pastel coaster set",           category: "Coasters",           price: "$16",     swatch: "var(--tone-1)" },

  { name: "Concrete candle jar",          category: "Candles — seasonal", price: "$18",     swatch: "var(--tone-4)", badge: "limited" },
  { name: "Festive scented candle",       category: "Candles — seasonal", price: "$20",     swatch: "var(--tone-7)", badge: "limited" },

  { name: "Beginner concrete kit",        category: "Starter kits",       price: "$32",     swatch: "var(--tone-7)" },
  { name: "Advanced marbling kit",        category: "Starter kits",       price: "$45",     swatch: "var(--tone-8)" },

  { name: "Bulk candle jars (set of 12)", category: "Wholesale jars",     price: "Inquire", swatch: "var(--tone-9)" },
];

function renderProducts(filter) {
  const grid = document.getElementById("productGrid");
  const countEl = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");
  if (!grid) return;

  const items = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = items.map(p => `
    <div class="product-card">
      <div class="product-thumb" style="background:${p.swatch}">
        ${p.badge === "new" ? '<span class="badge badge-new">New</span>' : ""}
        ${p.badge === "limited" ? '<span class="badge badge-limited">Limited — festive</span>' : ""}
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-cat">${p.category}</div>
      <div class="product-price">${p.price}</div>
    </div>
  `).join("");

  if (countEl) {
    countEl.innerHTML = filter === "All"
      ? `Showing <strong>${items.length}</strong> products`
      : `Showing <strong>${items.length}</strong> results in <strong>${filter}</strong>`;
  }

  if (noResults) {
    noResults.style.display = items.length === 0 ? "block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pills = document.querySelectorAll(".filter-pill");
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      renderProducts(pill.dataset.category);
    });
  });

  renderProducts("All"); // initial render
});

// ---- Newsletter form (front-end only — wire up to your email
// provider's API, e.g. Mailchimp/Klaviyo, before going live) ----
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.textContent = "Subscribed ✓";
    setTimeout(() => { btn.textContent = "Subscribe"; form.reset(); }, 2500);
  });
});

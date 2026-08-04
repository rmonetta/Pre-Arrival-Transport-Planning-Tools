(() => {
  "use strict";
  const input = document.getElementById("resourceSearch");
  if (!input) return;
  const cards = [...document.querySelectorAll(".resource-card")];
  const categories = [...document.querySelectorAll(".resource-category")];
  const noResults = document.getElementById("noResults");

  function filterResources() {
    const query = input.value.trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach(card => {
      const text = `${card.dataset.search || ""} ${card.textContent}`.toLowerCase();
      const visible = !query || text.includes(query);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    categories.forEach(category => {
      category.hidden = ![...category.querySelectorAll(".resource-card")].some(card => !card.hidden);
    });
    noResults.hidden = visibleCount !== 0;
  }

  input.addEventListener("input", filterResources);
})();

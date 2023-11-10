document.addEventListener("DOMContentLoaded", function() {
  const quotes = [
    "The best way to find yourself is to lose yourself in the service of others. - Mahatma Gandhi",
    "In India, we celebrate life every day. - Abhijit Naskar",
    "Unity in diversity is India's strength. - Narendra Modi",
    "India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend, and the great-grandmother of tradition. - Mark Twain",
  ];

  // Button click event to display a random quote
  let showRandomQuoteButton = document.getElementById("showRandomQuoteButton");
  let quoteDisplay = document.getElementById("quoteDisplay");

  showRandomQuoteButton.addEventListener("click", function() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
  });
});

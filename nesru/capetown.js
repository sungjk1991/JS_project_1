const h1 = document.querySelector(".text");
const text = "Welcome to Cape Town, South Africa";
function textTypingEffect(element, text, i = 0) {
  if(i===0) {
    element.textContent = "";
  }
  element.textContent += text[i];
  //if we reach the end of the string
  if (i === text.length -1) {
    return
  }
  setTimeout(() => textTypingEffect(element, text, i+1), 50);
}
textTypingEffect(h1, text);


// Adding colors to h4 class at mouseover
let color = document.querySelectorAll("h4");
for (let i = 0; i < color.length; i++) {
  color[i].addEventListener("mouseover", function() {
    color[i].style.color = "azure";
  })
};
document.getElementsByName("Cape Town").onmouseover = function() {
  alert("Cape Town")
}

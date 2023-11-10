let caption = document.querySelectorAll('figcaption');

for (let i = 0; i < caption.length; i++) {
  caption[i].addEventListener('mouseover', function() {
    caption[i].style.color = 'red';
  })
};
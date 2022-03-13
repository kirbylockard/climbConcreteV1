const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

let headerheightnum = document.getElementById("header").clientHeight;
console.log(headerheightnum);

//dynamically position nav-menu based on current header height
const toggleTop = function (element) {
  if (!element.classList.contains("open")) {
    let headerheight = ((headerheightnum * (-1)).toString()) + "px";
    element.style.top = `${headerheight}`;
    element.classList.toggle("open");
  } else if (element.classList.contains("open")) {
    let headerheight = (headerheightnum.toString()) + "px";
    element.style.top = `${headerheight}`;
    element.classList.toggle("open");
  }
}

toggleTop(navMenu);

//HAMBURGER OPEN AND CLOSE
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  toggleTop(navMenu);
})

navLinks.forEach (link => link.addEventListener("click", () => {
  hamburger.classList.remove("open");
  toggleTop(navMenu);
}))



//INTERSECTION OBSERVER for HEADER CHANGES

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");

// let headerheightnum = document.getElementById("header").clientHeight;
let headerheightnum = parseInt(window.getComputedStyle(header).height);
console.log(headerheightnum);

//dynamically position nav-menu based on current header height
const toggleTop = function (element) {
  console.log(hamburger.style.display);
  if (window.getComputedStyle(hamburger).display == "none" ) {
    console.log("navMenu style here");
    console.log(element.style);
    return;
  }
  else if (!element.classList.contains("open")) {
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

// FIX OVERSCROLL ON ANCHORS
let about = document.querySelector("#about");
let contact = document.querySelector("#contact");
let anchors = [about, contact];

for ( let i = 0; i < anchors.length; i++) {
  anchors[i].style.paddingTop = `${headerheightnum.toString() + "px"}`;
  anchors[i].style.marginTop = `${(headerheightnum * -1).toString() + "px"}`;
  console.log(anchors[i].style);
}

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


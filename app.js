const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");
const toTop = document.querySelector(".uparr");
const navBar = document.querySelector(".nav-bar");
const navLogo = document.querySelector(".nav-logo");
const landing = document.querySelector(".landing");
let navMenuPadding = parseInt(window.getComputedStyle(navMenu).paddingBottom);

// let headerheightnum = document.getElementById("header").clientHeight;
let headerheightnum = parseInt(window.getComputedStyle(header).height); 
headerheightnum = headerheightnum + navMenuPadding;
console.log(`HEADER ${headerheightnum}`);
console.log(`NAVPADDING ${navMenuPadding}`);

//dynamically position nav-menu based on current header height
const toggleTop = function (element) {
  console.log(hamburger.style.display);
  if (window.getComputedStyle(hamburger).display == "none" ) {
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
//this is making a tiny gab btw landing and main...
let about = document.querySelector("#about");
let contact = document.querySelector("#contact");
let anchors = [about, contact];

for ( let i = 0; i < anchors.length; i++) {
  anchors[i].style.paddingTop = `${headerheightnum.toString() + "px"}`;
  anchors[i].style.marginTop = `${(headerheightnum * -1).toString() + "px"}`;
  console.log(anchors[i].style);
}

//create smooth scroll function
// const smoothScroll = function(link) {
//   let href = link.getAttribute('href');
//   console.log(href);
//   let target = document.querySelector(`${href}`);
//   target.scrollIntoView({behavior: "smooth"});
// }

//HAMBURGER OPEN AND CLOSE
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  toggleTop(navMenu);
})

navLinks.forEach (link => link.addEventListener("click", () => {
  hamburger.classList.remove("open");
  toggleTop(navMenu);
  //smoothScroll(link);
}))



//INTERSECTION OBSERVER for HEAD CHANGES
const headerOptions = {
  rootMargin: `-${headerheightnum}px 0px 0px 0px`
};

const headObserver = new IntersectionObserver(function(
  entries,
  headObserver
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        navBar.classList.add("nav-scrolled");
        navLogo.classList.add("nav-scrolled");
      } else if (entry.isIntersecting) {
        navBar.classList.remove("nav-scrolled");
        navLogo.classList.remove("nav-scrolled");
      } 
    })
  }, 
  headerOptions);

  headObserver.observe(landing);


//INTERSECTION OBSERVER for CARD CHANGES

const callback = (entries) => {
  entries.forEach(
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card-view")
      } else {
        entry.target.classList.remove("card-view")
      }
    }
  )
}

let cardObserver = new IntersectionObserver(callback);

const animationItems = document.querySelectorAll(".pillar-card");

animationItems.forEach(item => {
  cardObserver.observe(item);
})
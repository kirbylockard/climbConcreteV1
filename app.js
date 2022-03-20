const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");
const toTop = document.querySelector(".uparr");
const navBar = document.querySelector(".nav-bar");
const navLogo = document.querySelector(".nav-logo");
const landing = document.querySelector(".landing");
const hamBar = document.querySelectorAll(".bar");
const footer = document.querySelector("footer");

//MEASURE
let navBarNoPad = navBar.clientHeight;
let navBarTotalHeight = parseInt(window.getComputedStyle(navBar).height);
let navMenuTotalHeight = parseInt(window.getComputedStyle(navMenu).height);
let navMenuPadTop = parseInt(window.getComputedStyle(navMenu).paddingTop);
let navMenuTopHide = navMenuTotalHeight + navBarNoPad;
let navMenuPadHide = `${navMenuPadTop + navBarTotalHeight}px`;

if (window.innerWidth <= 768) {
  navMenu.style.paddingTop = `${navMenuPadHide}`;
}

const toggleTop = function (element) {
  if (window.getComputedStyle(hamburger).display != "none") {
    if (!element.classList.contains("open")) {
      element.style.top = `-${navMenuTopHide}px`;
    } else if (element.classList.contains("open")) {
      element.style.top = "0px";
    }
  }
}

toggleTop(navMenu);

// FIX OVERSCROLL ON ANCHORS
//this is making a tiny gap btw landing and main...
let about = document.querySelector("#about");
let contact = document.querySelector("#contact");
let anchors = [about, contact];

for ( let i = 0; i < anchors.length; i++) {
  anchors[i].style.paddingTop = `${navBarNoPad.toString() + "px"}`;
  anchors[i].style.marginTop = `${(navBarNoPad * -1).toString() + "px"}`;
  console.log(anchors[i].style);
}

//HAMBURGER OPEN AND CLOSE
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
  toggleTop(navMenu);
})

navLinks.forEach (link => link.addEventListener("click", () => {
  hamburger.classList.remove("open");
  navMenu.classList.remove("open");
  toggleTop(navMenu);
  //smoothScroll(link);
}))



//INTERSECTION OBSERVER for HEAD CHANGES
const headerOptions = {
  rootMargin: `-${navBarNoPad}px 0px 0px 0px`
};

const headObserver = new IntersectionObserver(function(
  entries,
  headObserver
  ) {
   entries.forEach(entry => {
     if (!entry.isIntersecting) {
        toTop.classList.remove("hidden");
      } else if (entry.isIntersecting) {
        toTop.classList.add("hidden");
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


//toTop OBSERVER
const toTopOptions = {
  // rootMargin: `-${navBarNoPad}px 0px 0px 0px`
};

const toTopObserver = new IntersectionObserver(function(
  entries,
  toTopObserver
  ) { entries.forEach(entry => {
    console.log(entry);
      if (entry.isIntersecting ) {
        toTop.classList.add("toTop-yellow");
       } else if (!entry.isIntersecting) {
        toTop.classList.remove("toTop-yellow");
       }  
})
}, 
    toTopOptions);
  
toTopObserver.observe(footer);

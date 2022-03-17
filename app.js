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
let navMenuDefaultTop = window.getComputedStyle(navMenu).top;
let navBarNoPad = navBar.clientHeight;
let navMenuTotalHeight = parseInt(window.getComputedStyle(navMenu).height);
let navMenuPadTop = parseInt(window.getComputedStyle(navMenu).paddingTop);
let navMenuTopHide;


//dynamically position nav-menu based on current header height
const toggleTop = function (element) {
  if (window.getComputedStyle(hamburger).display != "none") {
    if (!element.classList.contains("open")) {
      console.log(`${navMenuTopHide}`);
      element.style.top = `-${navMenuTopHide}px`;
      element.classList.remove("open");
    } else if (element.classList.contains("open")) {
      element.style.top = "0px";
      element.classList.add("open");
    }
  }
}

toggleTop(navMenu);

// FIX OVERSCROLL ON ANCHORS
//this is making a tiny gab btw landing and main...
let about = document.querySelector("#about");
let contact = document.querySelector("#contact");
let anchors = [about, contact];

for ( let i = 0; i < anchors.length; i++) {
  anchors[i].style.paddingTop = `${navBarNoPad.toString() + "px"}`;
  anchors[i].style.marginTop = `${(navBarNoPad * -1).toString() + "px"}`;
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
        //hide logo & bg
        navBar.classList.add("nav-scrolled");
        navMenu.classList.add("nav-scrolled");
        navLogo.classList.add("nav-scrolled");
        hamburger.classList.add("nav-scrolled");
        hamBar.forEach(bar => {
          bar.classList.add("nav-scrolled");
        })
        header.classList.add("nav-scrolled");
        toTop.classList.remove("hidden");
        //measure navBar and navmenu
        navBarNoPad = navBar.clientHeight;
        navMenuTotalHeight = parseInt(window.getComputedStyle(navMenu).height);
        //define padding top for hidden
        navMenuTopHide = navBarNoPad + navMenuTotalHeight;

        navMenu.style.paddingTop = `${navBarNoPad}px`;
        navMenu.style.top = `-${navMenuTopHide}px`;
        
        
      } else if (entry.isIntersecting) {
        //show logo and bg
        navBar.classList.remove("nav-scrolled");
        navMenu.classList.remove("nav-scrolled");
        navLogo.classList.remove("nav-scrolled");
        hamburger.classList.remove("nav-scrolled");
        hamBar.forEach(bar => {
          bar.classList.remove("nav-scrolled");
        })
        header.classList.remove("nav-scrolled");
        toTop.classList.add("hidden");

        //measure navBar and navmenu
        navBarNoPad = navBar.clientHeight;
        navMenuTotalHeight = parseInt(window.getComputedStyle(navMenu).height);
        //define padding top for hidden
        navMenuTopHide = navBarNoPad + navMenuTotalHeight;

        if (window.innerWidth <= 768) {
          navMenu.style.paddingTop = `${navBarNoPad}px`;
          navMenu.style.top = `-${navMenuTopHide}px`;
        } else if (window.innerWidth > 768) {
          navMenu.style.paddingTop = `${navMenuPadTop}px`;
          navMenu.style.top = `${navMenuDefaultTop}`;
        }
        
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

const body = document.body;

const btnTheme = document.querySelector(".fa-moon");
const btnHamburger = document.querySelector(".fa-bars");

const addThemeClass = (bodyClass, btnClass) => {
    body.classList.add(bodyClass);
    btnTheme.classList.add(btnClass);
};

const getBodyTheme = localStorage.getItem("portfolio-theme");
const getBtnTheme = localStorage.getItem("portfolio-btn-theme");

addThemeClass(getBodyTheme, getBtnTheme);

const isDark = () => body.classList.contains("dark");

const setTheme = (bodyClass, btnClass) => {
    body.classList.remove(localStorage.getItem("portfolio-theme"));
    btnTheme.classList.remove(localStorage.getItem("portfolio-btn-theme"));

    addThemeClass(bodyClass, btnClass);

    localStorage.setItem("portfolio-theme", bodyClass);
    localStorage.setItem("portfolio-btn-theme", btnClass);
};

const toggleTheme = () =>
    isDark() ? setTheme("light", "fa-moon") : setTheme("dark", "fa-sun");

btnTheme.addEventListener("click", toggleTheme);

const displayList = () => {
    const navUl = document.querySelector(".nav__list");

    if (btnHamburger.classList.contains("fa-bars")) {
        btnHamburger.classList.remove("fa-bars");
        btnHamburger.classList.add("fa-times");
        navUl.classList.add("display-nav-list");
    } else {
        btnHamburger.classList.remove("fa-times");
        btnHamburger.classList.add("fa-bars");
        navUl.classList.remove("display-nav-list");
    }
};

// Get Slider Items
var sliderImages = Array.from(
    document.querySelectorAll(".slider-container img")
);

// Get Number Of Slides
var slidesCount = sliderImages.length;

// Set Current Slide
var currentSlide = 1;

// Slide Number Element
var slideNumberElement = document.getElementById("slide-number");

// Previous and Next Buttons
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");

// Handle Click on Previous and Next Buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// Create The Main UL Element
var paginationElement = document.createElement("ul");
paginationElement.setAttribute("id", "pagination-ul");

// Create List Items (li) Based On Slides Count
for (var i = 1; i <= slidesCount; i++) {
    // Create The li
    let paginationItem = document.createElement("li");

    // Set Custom Attribute
    paginationItem.setAttribute("data-index", i);

    // Set Item Content
    paginationItem.appendChild(document.createTextNode(i));

    // Add Item To The Main Ul List
    paginationElement.appendChild(paginationItem);
}

// Add The Main Ul List To The page
document.getElementById("indicators").appendChild(paginationElement);

// Get Li item Array
let paginatiosBullets = document.querySelectorAll("#pagination-ul li");

paginatiosBullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        currentSlide = parseInt(e.target.getAttribute("data-index"));

        theChecker();
    });
});

// Tirgger The Checker Function
theChecker();

// Next Slide Function
function nextSlide() {
    if (nextButton.classList.contains("disabled")) {
        return false;
    } else {
        currentSlide++;

        theChecker();
    }
}

// Previous Slide Function
function prevSlide() {
    if (prevButton.classList.contains("disabled")) {
        return false;
    } else {
        currentSlide--;

        theChecker();
    }
}

// Create The Checker Function
function theChecker() {
    slideNumberElement.textContent = `${currentSlide} of ${slidesCount}`;

    removeAllActive();

    // Set Active Class On Current Slide
    sliderImages[currentSlide - 1].classList.add("active");

    // Set Active Class on Current Pagination Item
    paginationElement.children[currentSlide - 1].classList.add("active");

    // Check If Current Slide Is The First
    if (currentSlide == 1) {
        prevButton.classList.add("disabled");
    } else {
        prevButton.classList.remove("disabled");
    }

    // Check If Current Slide is The Last
    if (currentSlide == slidesCount) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }
}

// Remove All Active Classes from Images and Pagination Bullets
function removeAllActive() {
    // Loop Through images
    sliderImages.forEach((img) => {
        img.classList.remove("active");
    });

    // Loop Through Pagination Bullets
    paginatiosBullets.forEach((li) => {
        li.classList.remove("active");
    });
}

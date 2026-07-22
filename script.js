/*======================================================
                GLOBAL VARIABLES
======================================================*/

const body = document.body;

const preloader = document.getElementById("preloader");

const progressBar = document.getElementById("progressBar");

const header = document.getElementById("header");

const menuBtn = document.getElementById("menuBtn");

const navbar = document.getElementById("navbar");

const themeToggle = document.getElementById("themeToggle");

const scrollTopBtn = document.getElementById("scrollTop");

const toastContainer = document.getElementById("toastContainer");

const year = document.getElementById("year");



/*======================================================
                PRELOADER
======================================================*/

window.addEventListener("load", () => {

    preloader.style.opacity = "0";

    setTimeout(() => {

        preloader.style.display = "none";

    }, 500);

});



/*======================================================
                CURRENT YEAR
======================================================*/

year.textContent = new Date().getFullYear();



/*======================================================
                SCROLL PROGRESS BAR
======================================================*/

window.addEventListener("scroll", () => {

    const totalHeight =

        document.documentElement.scrollHeight -

        document.documentElement.clientHeight;

    const progress =

        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});



/*======================================================
                HEADER SHADOW
======================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.boxShadow =

            "0 10px 30px rgba(0,0,0,.12)";

    }

    else {

        header.style.boxShadow = "none";

    }

});



/*======================================================
                MOBILE MENU
======================================================*/

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    menuBtn.innerHTML =

        navbar.classList.contains("active")

            ? '<i class="fa-solid fa-xmark"></i>'

            : '<i class="fa-solid fa-bars"></i>';

});


document.querySelectorAll(".nav-links a")

.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menuBtn.innerHTML =

        '<i class="fa-solid fa-bars"></i>';

    });

});



/*======================================================
                ACTIVE NAV LINK
======================================================*/

const sections =

document.querySelectorAll("section");

const navLinks =

document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =

            section.offsetTop - 120;

        const sectionHeight =

            section.clientHeight;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (

            link.getAttribute("href") ===

            "#" + current

        ) {

            link.classList.add("active");

        }

    });

});



/*======================================================
                DARK MODE
======================================================*/

function enableDarkMode() {

    body.classList.add("dark");

    localStorage.setItem(

        "theme",

        "dark"

    );

    themeToggle.innerHTML =

    '<i class="fa-solid fa-sun"></i>';

}

function disableDarkMode() {

    body.classList.remove("dark");

    localStorage.setItem(

        "theme",

        "light"

    );

    themeToggle.innerHTML =

    '<i class="fa-solid fa-moon"></i>';

}


if (

    localStorage.getItem("theme")

    === "dark"

) {

    enableDarkMode();

}


themeToggle.addEventListener(

"click",

() => {

    if (

        body.classList.contains("dark")

    ) {

        disableDarkMode();

        showToast(

            "Light Mode Enabled",

            "success"

        );

    }

    else {

        enableDarkMode();

        showToast(

            "Dark Mode Enabled",

            "success"

        );

    }

});



/*======================================================
                SCROLL TO TOP
======================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    }

    else {

        scrollTopBtn.classList.remove("show");

    }

});


scrollTopBtn.addEventListener(

"click",

() => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});



/*======================================================
                TOAST FUNCTION
======================================================*/

function showToast(

message,

type="success"

){

    const toast =

    document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toast.style.background =

        type === "success"

        ? "#22c55e"

        : "#ef4444";

    toast.style.color = "#fff";

    toast.style.padding = "15px 20px";

    toast.style.borderRadius = "12px";

    toast.style.boxShadow =

    "0 10px 25px rgba(0,0,0,.2)";

    toast.style.animation =

    "fadeIn .4s";

    toastContainer.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    },3000);

}

/*======================================================
                COUNTER ANIMATION
======================================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 120;

        const updateCounter = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            }

            else {

                counter.innerText = target + "+";

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: .5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/*======================================================
                SEARCH EVENTS
======================================================*/

const searchInput = document.getElementById("searchInput");

const eventCards = document.querySelectorAll(".event-card");

const noResult = document.getElementById("noResult");

searchInput.addEventListener("keyup", filterEvents);

function filterEvents() {

    const search = searchInput.value.toLowerCase();

    let visible = 0;

    eventCards.forEach(card => {

        const title = card.querySelector("h3").innerText.toLowerCase();

        if (title.includes(search)) {

            card.style.display = "block";

            visible++;

        }

        else {

            card.style.display = "none";

        }

    });

    noResult.style.display = visible ? "none" : "block";

}


/*======================================================
                CATEGORY FILTER
======================================================*/

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", () => {

    const category = categoryFilter.value;

    let visible = 0;

    eventCards.forEach(card => {

        if (

            category === "all" ||

            card.classList.contains(category)

        ) {

            card.style.display = "block";

            visible++;

        }

        else {

            card.style.display = "none";

        }

    });

    noResult.style.display = visible ? "none" : "block";

});


/*======================================================
                SORT EVENTS
======================================================*/

const sortEvents = document.getElementById("sortEvents");

const eventGrid = document.getElementById("eventGrid");

sortEvents.addEventListener("change", () => {

    const cards = [...eventCards];

    if (sortEvents.value === "priceLow") {

        cards.sort((a, b) =>

            a.dataset.price - b.dataset.price

        );

    }

    else if (sortEvents.value === "priceHigh") {

        cards.sort((a, b) =>

            b.dataset.price - a.dataset.price

        );

    }

    else if (sortEvents.value === "date") {

        cards.sort((a, b) =>

            new Date(a.dataset.date) -

            new Date(b.dataset.date)

        );

    }

    cards.forEach(card => eventGrid.appendChild(card));

});


/*======================================================
                WISHLIST
======================================================*/

const wishlistButtons =

document.querySelectorAll(".wishlist-btn");

let wishlist = JSON.parse(

localStorage.getItem("wishlist")

) || [];

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".event-card");

        const title =

        card.querySelector("h3").innerText;

        if (!wishlist.includes(title)) {

            wishlist.push(title);

            button.innerHTML =

            '<i class="fa-solid fa-heart"></i>';

            showToast(

                "Added to Wishlist"

            );

        }

        else {

            wishlist = wishlist.filter(

            item => item !== title

            );

            button.innerHTML =

            '<i class="fa-regular fa-heart"></i>';

            showToast(

                "Removed from Wishlist",

                "error"

            );

        }

        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );

    });

});


/*======================================================
                COUNTDOWN TIMER
======================================================*/

const countdowns =

document.querySelectorAll(".countdown");

function updateCountdown() {

    countdowns.forEach(box => {

        const eventDate =

        new Date(

            box.dataset.countdown

        ).getTime();

        const now = Date.now();

        const gap = eventDate - now;

        if (gap <= 0) {

            box.innerHTML =

            "Event Started";

            return;

        }

        const days =

        Math.floor(

            gap / (1000 * 60 * 60 * 24)

        );

        const hours =

        Math.floor(

            (gap %

            (1000 * 60 * 60 * 24))

            /

            (1000 * 60 * 60)

        );

        box.innerHTML =

        `Starts in ${days}d ${hours}h`;

    });

}

updateCountdown();

setInterval(updateCountdown, 60000);


/*======================================================
                PREVIEW BUTTON
======================================================*/

document

.querySelectorAll(".preview-btn")

.forEach(button => {

    button.addEventListener("click", () => {

        const title =

        button

        .closest(".event-card")

        .querySelector("h3")

        .innerText;

        showToast(

            "Preview : " + title

        );

    });

});

/*======================================================
                BOOKING FORM
======================================================*/

const bookingForm = document.getElementById("bookingForm");

const eventSelect = document.getElementById("event");

const ticketInput = document.getElementById("tickets");

const totalPrice = document.getElementById("totalPrice");

const summaryEvent = document.getElementById("summaryEvent");

const ticketPrice = document.getElementById("ticketPrice");

const ticketQty = document.getElementById("ticketQty");

const discountPrice = document.getElementById("discountPrice");

const historyContainer = document.getElementById("historyContainer");

const modal = document.getElementById("ticketModal");

const closeModal = document.getElementById("closeModal");

const qrCode = document.getElementById("qrCode");

let discount = 0;


/*======================================================
                PRICE CALCULATION
======================================================*/

function updateSummary(){

    const option = eventSelect.selectedOptions[0];

    const price = Number(option.dataset.price || 0);

    const qty = Number(ticketInput.value);

    const total = (price * qty) - discount;

    summaryEvent.textContent =

    option.value || "-";

    ticketPrice.textContent =

    "₹" + price;

    ticketQty.textContent = qty;

    discountPrice.textContent =

    "₹" + discount;

    totalPrice.textContent =

    "₹" + Math.max(total,0);

}

eventSelect.addEventListener(

"change",

updateSummary

);

ticketInput.addEventListener(

"input",

updateSummary

);

updateSummary();


/*======================================================
                PROMO CODE
======================================================*/

const applyPromo =

document.getElementById("applyPromo");

const promoInput =

document.getElementById("promoCode");

applyPromo.addEventListener(

"click",

()=>{

    const code =

    promoInput.value.trim().toUpperCase();

    const option =

    eventSelect.selectedOptions[0];

    const price =

    Number(option.dataset.price || 0);

    const qty =

    Number(ticketInput.value);

    if(code==="EVENT10"){

        discount =

        Math.floor(price*qty*.10);

        showToast(

        "Promo Applied"

        );

    }

    else if(code==="EVENT20"){

        discount =

        Math.floor(price*qty*.20);

        showToast(

        "Promo Applied"

        );

    }

    else{

        discount=0;

        showToast(

        "Invalid Promo",

        "error"

        );

    }

    updateSummary();

});


/*======================================================
                BOOKING ID
======================================================*/

function bookingID(){

    return "EVT"+

    Date.now()

    .toString()

    .slice(-8);

}


/*======================================================
                SAVE BOOKING
======================================================*/

function saveBooking(data){

    let bookings=

    JSON.parse(

    localStorage.getItem(

    "bookings"

    )) || [];

    bookings.push(data);

    localStorage.setItem(

    "bookings",

    JSON.stringify(bookings)

    );

}


/*======================================================
                LOAD HISTORY
======================================================*/

function loadHistory(){

    const bookings=

    JSON.parse(

    localStorage.getItem(

    "bookings"

    )) || [];

    if(bookings.length===0)return;

    historyContainer.innerHTML="";

    bookings.forEach(item=>{

        historyContainer.innerHTML+=`

        <div class="history-card">

        <h3>${item.event}</h3>

        <p>Name : ${item.name}</p>

        <p>Tickets : ${item.qty}</p>

        <p>Total : ₹${item.total}</p>

        <p>ID : ${item.id}</p>

        </div>

        `;

    });

}

loadHistory();


/*======================================================
                FORM SUBMIT
======================================================*/

bookingForm.addEventListener(

"submit",

e=>{

e.preventDefault();

const name=

document.getElementById("name").value;

const email=

document.getElementById("email").value;

const event=

eventSelect.value;

const qty=

ticketInput.value;

if(!event){

showToast(

"Select Event",

"error"

);

return;

}

const id=

bookingID();

const total=

totalPrice.textContent.replace("₹","");

document.getElementById(

"ticketEvent"

).textContent=event;

document.getElementById(

"ticketUser"

).textContent=name;

document.getElementById(

"ticketEmail"

).textContent=email;

document.getElementById(

"ticketBookingId"

).textContent=id;

qrCode.innerHTML="";

new QRCode(

qrCode,

{

text:id,

width:150,

height:150

}

);

saveBooking({

id,

name,

email,

event,

qty,

total

});

loadHistory();

modal.style.display="flex";

showToast(

"Booking Successful"

);

bookingForm.reset();

discount=0;

updateSummary();

});


/*======================================================
                CLOSE MODAL
======================================================*/

closeModal.addEventListener(

"click",

()=>{

modal.style.display="none";

});

window.addEventListener(

"click",

e=>{

if(e.target===modal){

modal.style.display="none";

}

});

/*======================================================
                DOWNLOAD PDF TICKET
======================================================*/

const downloadTicket =
document.getElementById("downloadTicket");

downloadTicket.addEventListener("click", async () => {

    const ticket =
    document.getElementById("ticketCard");

    const canvas =
    await html2canvas(ticket);

    const img =
    canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf =
    new jsPDF();

    pdf.addImage(
        img,
        "PNG",
        10,
        10,
        190,
        100
    );

    pdf.save("EventHub-Ticket.pdf");

    showToast("Ticket Downloaded");

});


/*======================================================
                PRINT TICKET
======================================================*/

const printTicket =
document.getElementById("printTicket");

printTicket.addEventListener("click", () => {

    const ticket =
    document.getElementById("ticketCard").innerHTML;

    const win =
    window.open("", "_blank");

    win.document.write(`
        <html>
        <head>
        <title>Ticket</title>
        </head>
        <body>
        ${ticket}
        </body>
        </html>
    `);

    win.document.close();

    win.print();

});


/*======================================================
                CONTACT FORM
======================================================*/

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener("submit", e => {

    e.preventDefault();

    showToast(
        "Message Sent Successfully"
    );

    contactForm.reset();

});


/*======================================================
                NEWSLETTER
======================================================*/

const newsletterForm =
document.getElementById("newsletterForm");

newsletterForm.addEventListener(

"submit",

e=>{

    e.preventDefault();

    const email =
    document
    .getElementById("newsletterEmail")
    .value;

    if(email===""){

        showToast(
            "Enter Email",
            "error"
        );

        return;

    }

    localStorage.setItem(

        "subscriber",

        email

    );

    showToast(

        "Subscribed Successfully"

    );

    newsletterForm.reset();

});


/*======================================================
                FAQ ACCORDION
======================================================*/

const faqItems =
document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question =
    item.querySelector(".faq-question");

    const answer =
    item.querySelector(".faq-answer");

    question.addEventListener("click",()=>{

        faqItems.forEach(f=>{

            if(f!==item){

                f.querySelector(
                ".faq-answer"
                ).style.display="none";

            }

        });

        answer.style.display=

        answer.style.display==="block"

        ? "none"

        : "block";

    });

});


/*======================================================
                SCROLL REVEAL
======================================================*/

const revealItems =
document.querySelectorAll(

".about-card,.event-card,.stat-box,.history-card,.testimonial-card,.info-card"

);

const revealObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform=

            "translateY(0)";

        }

    });

},{

    threshold:.15

});

revealItems.forEach(item=>{

    item.style.opacity="0";

    item.style.transform=

    "translateY(60px)";

    item.style.transition=

    ".7s ease";

    revealObserver.observe(item);

});


/*======================================================
                SEAT AVAILABILITY
======================================================*/

document.querySelectorAll(

".seat-count"

).forEach(seat=>{

    let total =
    Number(seat.textContent);

    setInterval(()=>{

        if(total>20){

            total--;

            seat.textContent=total;

        }

    },30000);

});


/*======================================================
                IMAGE LAZY LOADING
======================================================*/

const lazyImages =
document.querySelectorAll("img");

const imageObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const img =
            entry.target;

            img.loading="lazy";

            imageObserver.unobserve(img);

        }

    });

});

lazyImages.forEach(img=>{

    imageObserver.observe(img);

});


/*======================================================
                IMAGE ERROR FALLBACK
======================================================*/

lazyImages.forEach(img=>{

    img.addEventListener("error",()=>{

        img.src=
"https://via.placeholder.com/600x400?text=EventHub";

    });

});


/*======================================================
                ONLINE / OFFLINE STATUS
======================================================*/

window.addEventListener("online",()=>{

    showToast(
        "Internet Connected"
    );

});

window.addEventListener("offline",()=>{

    showToast(
        "No Internet Connection",
        "error"
    );

});

/*======================================================
                PAGE INITIALIZATION
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    updateSummary();

    loadHistory();

    updateCountdown();

    showSavedWishlist();

});


/*======================================================
                RESTORE WISHLIST
======================================================*/

function showSavedWishlist() {

    const saved = JSON.parse(

        localStorage.getItem("wishlist")

    ) || [];

    document

    .querySelectorAll(".event-card")

    .forEach(card => {

        const title =

        card.querySelector("h3").textContent;

        const icon =

        card.querySelector(".wishlist-btn i");

        if (saved.includes(title)) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

        }

    });

}


/*======================================================
                BUTTON LOADING EFFECT
======================================================*/

document.querySelectorAll(".btn")

.forEach(button => {

    button.addEventListener("click", () => {

        if (

            button.type === "submit"

        ) {

            const original =

            button.innerHTML;

            button.disabled = true;

            button.innerHTML =

            '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

            setTimeout(() => {

                button.disabled = false;

                button.innerHTML = original;

            }, 1500);

        }

    });

});


/*======================================================
                CLOSE MENU ON RESIZE
======================================================*/

window.addEventListener("resize", () => {

    if (

        window.innerWidth > 768

    ) {

        navbar.classList.remove("active");

        menuBtn.innerHTML =

        '<i class="fa-solid fa-bars"></i>';

    }

});


/*======================================================
                KEYBOARD SHORTCUTS
======================================================*/

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        modal.style.display = "none";

        navbar.classList.remove("active");

    }

    if (

        e.ctrlKey &&

        e.key.toLowerCase() === "k"

    ) {

        e.preventDefault();

        searchInput.focus();

    }

});


/*======================================================
                COPY BOOKING ID
======================================================*/

const bookingId =

document.getElementById("ticketBookingId");

bookingId.addEventListener("click", () => {

    navigator.clipboard.writeText(

        bookingId.textContent

    );

    showToast(

        "Booking ID Copied"

    );

});


/*======================================================
                SMOOTH SECTION LINKS
======================================================*/

document

.querySelectorAll('a[href^="#"]')

.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const target =

        document.querySelector(

            link.getAttribute("href")

        );

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/*======================================================
                DISABLE DOUBLE SUBMIT
======================================================*/

let submitting = false;

bookingForm.addEventListener("submit", e => {

    if (submitting) {

        e.preventDefault();

        return;

    }

    submitting = true;

    setTimeout(() => {

        submitting = false;

    }, 2000);

});


/*======================================================
                PERFORMANCE
======================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*======================================================
                GLOBAL ERROR HANDLER
======================================================*/

window.addEventListener("error", event => {

    console.error(

        "Application Error :",

        event.message

    );

});


/*======================================================
                UNHANDLED PROMISE
======================================================*/

window.addEventListener(

"unhandledrejection",

event => {

    console.error(

        "Promise Error :",

        event.reason

    );

});


/*======================================================
                APP READY
======================================================*/

console.log(

"%cEventHub Loaded Successfully",

"color:#2563eb;font-size:18px;font-weight:bold;"

);

showToast(

"Welcome to EventHub"

);


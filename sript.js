```javascript
/* =========================================================
   BHUMI BANDHU
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   SELECT ELEMENTS
========================================================= */

const body = document.body;

const header = document.getElementById("header");

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");

const themeToggle = document.getElementById("themeToggle");

const backToTop = document.getElementById("backToTop");

const enquiryForm = document.getElementById("enquiryForm");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const closeToast = document.getElementById("closeToast");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );
        }

    });


    /* Close mobile menu after clicking a link */

    const navLinks = navbar.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", function (event) {

    if (!navbar || !menuToggle) {
        return;
    }

    const clickedInsideMenu =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton &&
        navbar.classList.contains("open")
    ) {

        navbar.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );
    }

});


/* =========================================================
   DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem("bhumiBandhuTheme");

if (savedTheme === "dark") {

    body.classList.add("dark-mode");

}


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const icon =
        themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (body.classList.contains("dark-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        body.classList.toggle("dark-mode");

        const currentTheme =
            body.classList.contains("dark-mode")
                ? "dark"
                : "light";

        localStorage.setItem(
            "bhumiBandhuTheme",
            currentTheme
        );

        updateThemeIcon();

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* =========================================================
   BACK TO TOP
========================================================= */

function handleBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    handleBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 160;


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNavigation
);

updateActiveNavigation();


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(function (item) {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    if (!question || !answer) {
        return;
    }


    question.addEventListener("click", function () {

        const isCurrentlyOpen =
            item.classList.contains("active");


        /* Close all FAQ items */

        faqItems.forEach(function (otherItem) {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }

        });


        /* Open clicked item */

        if (!isCurrentlyOpen) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

let toastTimer = null;


function showToast(message) {

    if (!toast) {
        return;
    }

    if (toastMessage) {
        toastMessage.textContent = message;
    }

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 5000);

}


function hideToast() {

    if (!toast) {
        return;
    }

    toast.classList.remove("show");

    clearTimeout(toastTimer);

}


if (closeToast) {

    closeToast.addEventListener(
        "click",
        hideToast
    );

}


/* =========================================================
   ENQUIRY FORM
========================================================= */

if (enquiryForm) {

    enquiryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value.trim();

            const phone =
                document.getElementById("phone")?.value.trim();

            const service =
                document.getElementById("service")?.value.trim();

            const location =
                document.getElementById("location")?.value.trim();

            const message =
                document.getElementById("message")?.value.trim();


            /* Basic validation */

            if (!name) {

                showToast(
                    "Please enter your full name."
                );

                document.getElementById("name")?.focus();

                return;
            }


            if (!phone) {

                showToast(
                    "Please enter your mobile number."
                );

                document.getElementById("phone")?.focus();

                return;
            }


            /*
               Indian mobile number validation.

               Accepts:
               10 digit numbers beginning with 6-9
               Optional +91 or 91 prefix
            */

            const cleanPhone =
                phone.replace(/\s+/g, "")
                     .replace(/-/g, "");


            const phonePattern =
                /^(?:\+91|91)?[6-9]\d{9}$/;


            if (!phonePattern.test(cleanPhone)) {

                showToast(
                    "Please enter a valid Indian mobile number."
                );

                document.getElementById("phone")?.focus();

                return;
            }


            if (!service) {

                showToast(
                    "Please select a service."
                );

                document.getElementById("service")?.focus();

                return;
            }


            if (!message) {

                showToast(
                    "Please describe your requirement."
                );

                document.getElementById("message")?.focus();

                return;
            }


            /*
               At this stage the form is validated.

               No backend/database is connected yet.
               We show a confirmation message.
            */


            showToast(
                "Your enquiry has been received successfully."
            );


            /* Store latest enquiry locally */

            const enquiryData = {

                name: name,

                phone: phone,

                service: service,

                location: location,

                message: message,

                submittedAt:
                    new Date().toISOString()

            };


            try {

                localStorage.setItem(
                    "bhumiBandhuLatestEnquiry",
                    JSON.stringify(enquiryData)
                );

            } catch (error) {

                console.warn(
                    "Local storage is unavailable.",
                    error
                );

            }


            /* Reset form */

            enquiryForm.reset();

        }
    );

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll(".counter");


function animateCounter(counter) {

    const target =
        Number(counter.getAttribute("data-target"));

    if (
        Number.isNaN(target) ||
        target <= 0
    ) {
        return;
    }


    let current = 0;

    const duration = 1300;

    const startTime = performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        /*
           Ease-out animation
        */

        const easedProgress =
            1 - Math.pow(1 - progress, 3);


        current =
            Math.floor(target * easedProgress);


        counter.textContent = current;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent = target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* Observe counters only when visible */

if (
    counters.length > 0 &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });

} else {

    counters.forEach(function (counter) {

        const target =
            counter.getAttribute("data-target");

        counter.textContent =
            target || "0";

    });

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, " +
        ".process-item, " +
        ".contact-card, " +
        ".stat-card, " +
        ".about-feature, " +
        ".why-item, " +
        ".faq-item"
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


/* =========================================================
   SERVICE LINKS
========================================================= */

const serviceLinks =
    document.querySelectorAll(
        ".service-link"
    );


serviceLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const enquirySection =
            document.getElementById("enquiry");


        if (enquirySection) {

            setTimeout(function () {

                const serviceSelect =
                    document.getElementById("service");

                if (serviceSelect) {

                    serviceSelect.focus();

                }

            }, 600);

        }

    });

});


/* =========================================================
   PHONE INPUT
========================================================= */

const phoneInput =
    document.getElementById("phone");


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function () {

            /*
               Keep common phone characters only.
            */

            this.value =
                this.value.replace(
                    /[^0-9+\-\s]/g,
                    ""
                );

        }
    );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        /* Close mobile menu */

        if (
            navbar &&
            navbar.classList.contains("open")
        ) {

            navbar.classList.remove("open");


            if (menuToggle) {

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }


        /* Close toast */

        hideToast();


        /* Close FAQ */

        faqItems.forEach(function (item) {

            item.classList.remove("active");

            const answer =
                item.querySelector(".faq-answer");

            if (answer) {

                answer.style.maxHeight = null;

            }

        });

    }
);


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
           If an FAQ is open, recalculate its
           height after resizing the window.
        */

        const activeFaq =
            document.querySelector(
                ".faq-item.active"
            );


        if (activeFaq) {

            const answer =
                activeFaq.querySelector(
                    ".faq-answer"
                );


            if (answer) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }

    }
);


/* =========================================================
   PAGE LOADED
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateThemeIcon();
        handleHeaderScroll();
        handleBackToTop();
        updateActiveNavigation();

    }
);
```

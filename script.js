
// ------------------------------- Go to Login Page ------------------------------------

document.getElementById("goasUser").addEventListener("click", function () {
    window.location.href = "login.html?role=user";
});

document.getElementById("goasShopkeeper").addEventListener("click", function () {
    window.location.href = "login.html?role=shopkeeper";
});


// ------------------------------ Login list selector ------------------------------

const registerBtn = document.getElementById("Login");
const dropdown = document.getElementById("dropdown");

// Toggle dropdown on click
registerBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click from bubbling up
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Close dropdown when clicking anywhere else
document.addEventListener("click", function () {
    dropdown.style.display = "none";
});

// ----------------------------- Animations and Effects. ---------------------------

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(el => {
    appearOnScroll.observe(el);
});

// ------------------------ Go Home ---------------------------

document.getElementById("goback").addEventListener("click", function () {
    window.history.back();
});

// ---------------- Load Role wise form -----------------------

const userForm = document.getElementById("userForm");
const shopkeeperForm = document.getElementById("shopkeeperForm");

function showUserForm() {
    userForm.style.display = "flex";
    shopkeeperForm.style.display = "none";
}

function showShopkeeperForm() {
    userForm.style.display = "none";
    shopkeeperForm.style.display = "flex";
}

// On page load: read query param and decide which form to show
const params = new URLSearchParams(window.location.search);
const role = params.get("role");

if (role === "shopkeeper") {
    showShopkeeperForm();
} else {
    showUserForm(); // Default to user
}


function redirectWithFallback(primaryUrl, fallbackUrl) {
    fetch(primaryUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = primaryUrl;
            } else {
                window.location.href = fallbackUrl;
            }
        })
        .catch(() => {
            window.location.href = fallbackUrl;
        });
}

function goRegister() {
    redirectWithFallback(window.location.origin + "/register.html", window.location.origin + "/TechnoPharms/register.html")
}

function goLogin() {
    redirectWithFallback(window.location.origin + "/login.html", window.location.origin + "/TechnoPharms/login.html")
}
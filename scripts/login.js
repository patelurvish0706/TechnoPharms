function reg_shoopkeeper_getIn() {
    const email = document.getElementById("reg-shopkeeper-email").value.trim();
    const password = document.getElementById("reg-shopkeeper-password").value;
    const repassword = document.getElementById("reg-shopkeeper-repassword").value;

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || !repassword) {
        alert("All fields are required.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (password !== repassword) {
        alert("Passwords do not match.");
        return;
    }

    // Send to PHP via Fetch
    fetch("register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.text())
        .then(response => {
            alert(response);
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong.");
        });
}

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
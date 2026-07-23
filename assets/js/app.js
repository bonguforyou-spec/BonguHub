// ===================================================
// BonguHub Telegram Mini App
// app.js (Part 1)
// ===================================================

const appContent = document.getElementById("appContent");

const pages = {};

let currentPage = "home";

// ===========================
// Helpers
// ===========================

function showLoading() {

    const loading = document.getElementById("loadingScreen");

    if (loading) {

        loading.classList.remove("hidden");

    }

}

function hideLoading() {

    const loading = document.getElementById("loadingScreen");

    if (loading) {

        loading.classList.add("hidden");

    }

}

function showToast(message = "Done") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerText = message;

    toast.classList.remove("hidden");

    setTimeout(() => {

        toast.classList.add("hidden");

    }, 2500);

}

// ===========================
// Navigation Active State
// ===========================

function updateNavigation(page) {

    document.querySelectorAll(".navItem").forEach(item => {

        item.classList.remove("active");

        if (item.dataset.page === page) {

            item.classList.add("active");

        }

    });

}

// ===========================
// Router
// ===========================

function openPage(page) {

    currentPage = page;

    updateNavigation(page);

    showLoading();

    setTimeout(() => {

        if (pages[page]) {

            pages[page]();

        }

        hideLoading();

    }, 150);

}

// ===========================
// Home Page
// ===========================

pages.home = function () {

    let html = `

    <section class="hero">

        <h1>🎁 BonguHub</h1>

        <p>

            বাংলাদেশের সেরা Telegram Bonus Platform

        </p>

    </section>

    `;

    if (window.TelegramApp && TelegramApp.getUser()) {

        const user = TelegramApp.getUser();

        html += `

        <section class="card">

            <h2>Welcome</h2>

            <p><b>Name:</b> ${user.first_name || ""} ${user.last_name || ""}</p>

            <p><b>Username:</b> @${user.username || "Not Set"}</p>

            <p><b>User ID:</b> ${user.id}</p>

        </section>

        `;

    }

    html += `

    <section class="card">

        <h2>🔥 Today's Bonus</h2>

        <p>

            নতুন Bonus, Offer এবং Guide দেখতে নিচের Menu ব্যবহার করুন।

        </p>

    </section>

    `;

    appContent.innerHTML = html;

};

// ===========================
// Offers Page
// ===========================

pages.offers = function () {

    let html = `

    <section class="pageHeader">

        <h2>🎁 Today's Offers</h2>

    </section>

    `;

    if (typeof offers !== "undefined" && offers.length > 0) {

        offers.forEach(item => {

            html += `

            <div class="card offerCard">

                <h3>${item.title}</h3>

                <p>${item.description}</p>

                <div class="offerFooter">

                    <span class="badge">${item.reward}</span>

                    <button
                        class="openOffer"
                        onclick="window.open('${item.link}','_blank')">

                        Open

                    </button>

                </div>

            </div>

            `;

        });

    } else {

        html += `

        <div class="card">

            <h3>No Offers Available</h3>

            <p>বর্তমানে কোনো অফার নেই।</p>

        </div>

        `;

    }

    appContent.innerHTML = html;

};

// ===========================
// Guide Page
// ===========================

pages.guide = function () {

    appContent.innerHTML = `

    <section class="pageHeader">

        <h2>📖 Guide</h2>

    </section>

    <div class="card">

        <h3>How to Start</h3>

        <p>

            ১. Offer খুলুন।<br>
            ২. Register করুন।<br>
            ৩. Bonus Claim করুন।<br>
            ৪. Guide অনুসরণ করুন।

        </p>

    </div>

    `;

};

// ===========================
// Signals Page
// ===========================

pages.signals = function () {

    appContent.innerHTML = `

    <section class="pageHeader">

        <h2>📈 Signals</h2>

    </section>

    <div class="card">

        <h3>Latest Signal</h3>

        <p>

            নতুন Signal খুব শীঘ্রই যোগ করা হবে।

        </p>

    </div>

    `;

};

// ===========================
// More Page
// ===========================

pages.more = function () {

    appContent.innerHTML = `

    <section class="pageHeader">

        <h2>☰ More</h2>

    </section>

    <div class="card">

        <button class="menuButton">

            👤 Profile

        </button>

        <button class="menuButton">

            📢 Join Telegram

        </button>

        <button class="menuButton">

            ⚙ Settings

        </button>

        <button class="menuButton">

            ℹ About

        </button>

    </div>

    `;

};

// ===========================
// Bottom Navigation
// ===========================

document.querySelectorAll(".navItem").forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        openPage(page);

    });

});

// ===========================
// Search
// ===========================

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        searchBox.classList.toggle("hidden");

        searchInput.focus();

    });

}

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const value = searchInput.value.toLowerCase();

        if (currentPage !== "offers") return;

        if (typeof offers === "undefined") return;

        let html = `

            <section class="pageHeader">

                <h2>🎁 Search Result</h2>

            </section>

        `;

        const result = offers.filter(item => {

            return item.title.toLowerCase().includes(value);

        });

        if (result.length === 0) {

            html += `

                <div class="card">

                    <h3>No Result Found</h3>

                </div>

            `;

        } else {

            result.forEach(item => {

                html += `

                <div class="card offerCard">

                    <h3>${item.title}</h3>

                    <p>${item.description}</p>

                    <button onclick="window.open('${item.link}','_blank')">

                        Open

                    </button>

                </div>

                `;

            });

        }

        appContent.innerHTML = html;

    });

}

// ===========================
// App Start
// ===========================

openPage("home");

console.log("✅ BonguHub Started");
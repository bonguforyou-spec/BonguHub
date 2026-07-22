// ==============================
// BonguHub Telegram Mini App
// ==============================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// Telegram Theme
document.body.style.backgroundColor =
    tg.themeParams.bg_color || "#0f172a";

// Telegram User
const user = tg.initDataUnsafe?.user;

const appContent = document.getElementById("appContent");

function renderHome() {

    appContent.innerHTML = `

        <div class="welcome-card">

            <h2>
                👋 স্বাগতম ${user?.first_name || "বন্ধু"}
            </h2>

            <p>
                BonguHub Telegram Mini App-এ স্বাগতম।
            </p>

        </div>

    `;

}

renderHome();

// Bottom Navigation

document.querySelectorAll(".navItem").forEach(btn => {

    btn.addEventListener("click", () => {

        document
            .querySelectorAll(".navItem")
            .forEach(item => item.classList.remove("active"));

        btn.classList.add("active");

        const page = btn.dataset.page;

        appContent.innerHTML = `
            <div class="welcome-card">
                <h2>${page.toUpperCase()}</h2>
                <p>এই পেজটি আমরা পরের ধাপে তৈরি করব।</p>
            </div>
        `;

    });

});
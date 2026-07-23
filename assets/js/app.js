const appContent = document.getElementById("appContent");

function renderHome() {

    let html = `
    
        <section class="hero">

            <h1>🎁 BonguHub</h1>

            <p>

                বাংলাদেশের সেরা Bonus Platform

            </p>

        </section>

    `;

    if (window.TelegramApp && TelegramApp.getUser()) {

        const user = TelegramApp.getUser();

        html += `

            <section class="card">

                <h2>Telegram User</h2>

                <p><b>Name:</b> ${user.first_name || ""} ${user.last_name || ""}</p>

                <p><b>Username:</b> ${user.username || "N/A"}</p>

                <p><b>ID:</b> ${user.id}</p>

            </section>

        `;

    }

    html += `

        <section class="card">

            <h2>🔥 Welcome</h2>

            <p>

                BonguHub Telegram Mini App সফলভাবে চলছে।

            </p>

        </section>

    `;

    appContent.innerHTML = html;

}

renderHome();
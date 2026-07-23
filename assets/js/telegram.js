// BonguHub Telegram Mini App

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const App = {
    user: null,

    init() {

        if (tg.colorScheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }

        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {

            this.user = tg.initDataUnsafe.user;

            console.log("Telegram User");

            console.log(this.user);

        }

        tg.BackButton.hide();

        tg.MainButton.hide();

    },

    getUser() {

        return this.user;

    }

};

App.init();

window.TelegramApp = App;
(function () {
    const storageKey = "svh-theme";
    const root = document.documentElement;
    const themeToggle = document.querySelector(".theme-btn");
    const header = document.querySelector(".site-header");
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(theme === "contrast"));
        }
    };

    const storedTheme = localStorage.getItem(storageKey);
    applyTheme(storedTheme === "contrast" ? "contrast" : "light");

    themeToggle?.addEventListener("click", () => {
        const nextTheme = root.getAttribute("data-theme") === "contrast" ? "light" : "contrast";
        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
    });

    const syncHeader = () => {
        if (!header) {
            return;
        }
        header.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });

    navToggle?.addEventListener("click", () => {
        if (!nav) {
            return;
        }
        const isOpen = nav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("is-open");
            navToggle?.setAttribute("aria-expanded", "false");
        });
    });
})();

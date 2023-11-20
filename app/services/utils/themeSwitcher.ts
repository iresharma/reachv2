export default function switchTheme(val?: string) {
    let html = document.querySelector("#html")
    if (html === null) {
        return
    }
    if(val !== undefined) {
        if (val !== "dark") {
            html.classList.add("dark")
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark")
            localStorage.setItem("theme", "light");
        }
        return
    }
    const localTHeme = localStorage.getItem("theme")
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
    if(localTHeme === null) {
        if (preferDark.matches) {
            html.classList.add("dark")
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark")
            localStorage.setItem("theme", "light");
        }
    } else {
        if (localTHeme !== "light") {
            html.classList.add("dark")
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark")
            localStorage.setItem("theme", "light");
        }
    }
}

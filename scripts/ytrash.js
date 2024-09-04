// simulate "Remove from playlist" button press if available
function simRemove() {
    console.log('delete');
    const services = document.querySelectorAll("tp-yt-paper-item");

    for (let i = 0; i < services.length; i++) {
        const name = services[i].querySelector("yt-formatted-string");
        if (name && name.innerHTML.toLowerCase() === "remove from playlist") {
            services[i].click();
        }
    }
}

function deleteAll() {
    const playlist = document.querySelectorAll("ytd-playlist-panel-video-renderer");
    if (!playlist || playlist.length === 0) {
        return
    }

    const video = playlist[0];
    const trigger = video.querySelector(".dropdown-trigger");
    const button = trigger.querySelector("button");
    if (button) {
        button.click();
        setTimeout(simRemove, 500);
    }

    setTimeout(deleteAll, 2000);
}

function hasBtn(panel) {
    const b = panel.querySelector(".remove-from-plyst");
    return b ? true : false;
}

function getActionPanel() {
    const menus = document.querySelectorAll("ytd-menu-renderer");
    alert(menus.length);
    for (let i = 0; i < menus.length; i++) {
        const looper = menus[i].querySelector("ytd-playlist-loop-button-renderer");
        if (looper) {
            return menus[i];
        }
    }
}

function setupButtons() {
    const playlist = document.querySelectorAll("ytd-playlist-panel-video-renderer");
    const actions = getActionPanel();

    playlist.forEach((panel) => {
        if (hasBtn(panel)) {
            return;
        }
        const trigger = panel.querySelector(".dropdown-trigger");
        const delBtn = document.createElement("button");
        delBtn.textContent = "remove";
        delBtn.classList.add("remove-from-plyst");
        delBtn.addEventListener("click", () => {
            const button = trigger.querySelector("button");
            if (button) {
                button.click();
                setTimeout(simRemove, 500);
            }
        });
        trigger.insertAdjacentElement("afterend", delBtn);
    });


    const cleanBtn = document.createElement("button");
    cleanBtn.classList.add("del-all-btn");
    cleanBtn.textContent = "clean";
    cleanBtn.addEventListener("click", deleteAll);
    actions.insertAdjacentElement("afterend", cleanBtn);

    //buttons.remove();

}

function run() {
    setupButtons();
}

run();


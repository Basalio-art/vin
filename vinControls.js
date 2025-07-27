class vinControls {
    constructor(video, options = {}) {
        if (typeof video === "string") {
            this.video = document.querySelector(video);
        } else {
            this.video = video;
        }

        this.controls = {
            prev: false,
            next: false,
            volume: true,
            duration: true,
            pip: true,
            fullscreen: true,
            rotateOrientation: true,
            playPause: true,
            ...options,
        };

        this.createControls();
        this.functions();
        this.checkControls();
        this.checkSupport();
    }

    createControls() {
        const container = document.createElement("div");
        container.className = "video-container";
        this.video.parentNode.insertBefore(container, this.video);
        container.appendChild(this.video);

        const controlWrapper = document.createElement("div");
        controlWrapper.className = "control-wrapper";
        controlWrapper.dataset.played = false;
        controlWrapper.dataset.volume = "high";
        controlWrapper.dataset.orientation = screen.orientation.type.includes(
            "landscape"
        )
            ? "landscape"
            : "portrait";
        controlWrapper.dataset.pictureInPicture = false;
        controlWrapper.dataset.fullscreen = false;
        container.appendChild(controlWrapper);

        const buttonsWrapper = document.createElement("div");
        buttonsWrapper.className = "buttons-wrapper";
        controlWrapper.appendChild(buttonsWrapper);

        const prevBtn = document.createElement("div");
        prevBtn.className = "prev btn";
        prevBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="prev-icon"> <polygon fill="currentColor" points="19 20 9 12 19 4 19 20"></polygon> <line x1="5" y1="19" x2="5" y2="5"></line> </svg>';
        buttonsWrapper.appendChild(prevBtn);

        const playPause = document.createElement("div");
        playPause.className = "play-pause btn";
        playPause.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="play-icon"> <polygon points="5 3 19 12 5 21 5 3"></polygon> </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="pause-icon"> <rect x="6" y="4" width="4" height="16"></rect> <rect x="14" y="4" width="4" height="16"></rect> </svg>
        `;
        buttonsWrapper.appendChild(playPause);

        const nextBtn = document.createElement("div");
        nextBtn.className = "next btn";
        nextBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="next-icon"> <polygon fill="currentColor" points="5 4 15 12 5 20 5 4"></polygon> <line x1="19" y1="5" x2="19" y2="19"></line> </svg>';
        buttonsWrapper.appendChild(nextBtn);

        const volumeWrapper = document.createElement("div");
        volumeWrapper.className = "volume-wrapper";
        buttonsWrapper.appendChild(volumeWrapper);

        const volumeBtn = document.createElement("div");
        volumeBtn.className = "volume btn";
        volumeBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="volume-2-icon"> <polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon> <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path> </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="volume-1-icon"> <polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon> <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path> </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="volume-x-icon"> <polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon> <line x1="23" y1="9" x2="17" y2="15"></line> <line x1="17" y1="9" x2="23" y2="15"></line> </svg>
        `;
        volumeWrapper.appendChild(volumeBtn);
        volumeWrapper.style.width = volumeBtn.clientWidth + "px";

        const volumeBar = document.createElement("input");
        volumeBar.type = "range";
        volumeBar.value = 1;
        volumeBar.max = 1;
        volumeBar.min = 0;
        volumeBar.step = "any";
        volumeWrapper.appendChild(volumeBar);

        const durationWrapper = document.createElement("p");
        durationWrapper.className = "duration-wrapper";
        durationWrapper.innerHTML = "<span>0:00</span> / <span>0:00</span>";
        buttonsWrapper.appendChild(durationWrapper);

        const space = document.createElement("div");
        space.className = "space";
        buttonsWrapper.appendChild(space);

        const pipBtn = document.createElement("div");
        pipBtn.className = "pip btn";
        pipBtn.innerHTML = `
        <svg class="pip-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" version="1.1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"> <rect x="11.446" y="11.367" width="9.1532" height="6.3064" ry=".79077" fill="currentColor" stroke="none"/> <rect x="1.9559" y="4.7259" width="20.088" height="14.548" ry="2.4185"/> </svg>
        <svg class="pip1-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" version="1.1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m8.6319 11.054-6.676-6.3278m0 4.5731v-4.5731l4.618-0.03125m3.9469 0 9.1046 0.03125c1.3398 0.0046 2.4185 1.0787 2.4185 2.4185v9.711c0 1.3398-1.0787 2.4185-2.4185 2.4185h-15.251c-1.3398 0-2.4185-1.0787-2.4185-2.4185v-4.0541" fill="none"/></svg>
        
        `;
        buttonsWrapper.appendChild(pipBtn);

        const flipBtn = document.createElement("div");
        flipBtn.className = "flip btn";
        flipBtn.style.display = "none";
        flipBtn.innerHTML = `
        <svg class="flip-landscape-icon" width="24" height="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="10.004" cy="17.127" r=".815" fill="currentColor"/><path d="m3.8347 22.02h-1.428c-0.26325 0-0.47518-0.35554-0.47518-0.79718v-18.446c0-0.44163 0.21193-0.79717 0.47518-0.79717h10.509c0.26325 0 0.47518 0.35554 0.47518 0.79717v6.9185" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m19.323 7.6924-1.9805-2.3151m-0.68709-2.5723c3.5115 0 2.6676 3.2623 2.6676 4.8874l2.0369-2.1539m0.7085 6.7602v9.2767c0 0.23237-0.2914 0.41944-0.65336 0.41944h-15.119c-0.36196 0-0.65336-0.18707-0.65336-0.41944v-9.2767c0-0.23237 0.2914-0.41944 0.65336-0.41944h15.119c0.36196 0 0.65336 0.18707 0.65336 0.41944z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>
        <svg class="flip-portrait-icon" width="24" height="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke-width="1.5"><path transform="translate(1.31e-4)" d="m15.271 11.879h6.1437c0.36196 0 0.65336 0.18707 0.65336 0.41944v9.2767c0 0.23237-0.2914 0.41944-0.65336 0.41944h-6.1437" fill="none" stroke="currentColor" stroke-linejoin="round"/><path d="m16.564 4.9333 1.8407 1.6444m2.6514 1.0034c0-3.5115-2.8669-2.6478-4.492-2.6478l1.7189-1.7996m-15.876-1.0633h10.508c0.26323 0 0.47514 0.35386 0.47514 0.79341v18.359c0 0.43955-0.21191 0.79341-0.47514 0.79341h-10.508c-0.26323 0-0.47514-0.35386-0.47514-0.79341v-18.359c0-0.43955 0.21191-0.79341 0.47514-0.79341z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.6608" cy="18.233" r=".99835" fill="currentColor"/></g></svg>
        `;
        buttonsWrapper.appendChild(flipBtn);

        const fullscreenBtn = document.createElement("div");
        fullscreenBtn.className = "fullscreen btn";
        fullscreenBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="maximize-icon"> <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path> </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="minimize-icon"> <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path> </svg>
        `;
        buttonsWrapper.appendChild(fullscreenBtn);

        const timeline = document.createElement("div");
        timeline.className = "timeline";
        controlWrapper.appendChild(timeline);

        const progress = document.createElement("div");
        progress.className = "progress";
        timeline.appendChild(progress);

        const thumb = document.createElement("div");
        thumb.className = "thumb";
        progress.appendChild(thumb);

        const buffered = document.createElement("div");
        buffered.className = "buffered";
        timeline.appendChild(buffered);
    }

    functions() {
        const video = this.video;
        const container = this.video.parentNode;
        const controlWrapper = container.querySelector(".control-wrapper");
        const playPause = container.querySelector(".play-pause.btn");
        const volumeWrapper = container.querySelector(".volume-wrapper");
        const volumeBtn = volumeWrapper.querySelector(".volume.btn");
        const durationWrapper = container.querySelector(".duration-wrapper");
        const pipBtn = container.querySelector(".pip.btn");
        const flipBtn = container.querySelector(".flip.btn");
        const fullscreenBtn = container.querySelector(".fullscreen.btn");

        playPause.addEventListener("click", () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        video.addEventListener("play", () => {
            controlWrapper.dataset.played = true;
        });

        video.addEventListener("pause", () => {
            controlWrapper.dataset.played = false;
        });

        volumeWrapper.lastElementChild.addEventListener("input", (e) => {
            const input = volumeWrapper.lastElementChild;
            video.volume = input.value;
            video.muted = input.value === 0;

            volumeWrapper.style.setProperty(
                "--volume",
                input.value * 100 + "%"
            );
        });

        video.addEventListener("volumechange", () => {
            const input = volumeWrapper.lastElementChild;

            input.value = video.volume;

            if (video.muted || video.volume === 0) {
                input.value = 0;
                controlWrapper.dataset.volume = "mute";
            } else if (video.volume > 0.5) {
                controlWrapper.dataset.volume = "high";
            } else {
                controlWrapper.dataset.volume = "low";
            }

            volumeWrapper.style.setProperty(
                "--volume",
                input.value * 100 + "%"
            );
        });

        volumeBtn.addEventListener("click", () => {
            if (video.volume === 0) {
                video.volume = 0.1;
            } else {
                video.muted = !video.muted;
            }
        });

        let hideVolumeBar;

        volumeWrapper.addEventListener("mouseenter", () => {
            clearTimeout(hideVolumeBar);
            volumeWrapper.style.width = "";
        });

        volumeWrapper.addEventListener("mouseleave", () => {
            hideVolumeBar = setTimeout(() => {
                volumeWrapper.style.width = volumeBtn.clientWidth + "px";
            }, 1000);
        });

        video.addEventListener("loadedmetadata", () => {
            durationWrapper.children[1].textContent = timeFormat(
                video.duration
            );
            durationWrapper.children[0].textContent = timeFormat(
                video.currentTime
            );
        });

        video.addEventListener("timeupdate", () => {
            durationWrapper.children[0].textContent = timeFormat(
                video.currentTime
            );
        });

        pipBtn.addEventListener("click", async () => {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                video.requestPictureInPicture();
            }
        });

        video.addEventListener("enterpictureinpicture", () => {
            controlWrapper.dataset.pictureInPicture = true;
        });

        video.addEventListener("leavepictureinpicture", () => {
            controlWrapper.dataset.pictureInPicture = false;
        });

        fullscreenBtn.addEventListener("click", async () => {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await container.requestFullscreen();
                try {
                    await screen.orientation.lock(screen.orientation.type);
                } catch (err) {
                    flipBtn.parentNode.removeChild(flipBtn);
                }
            }
        });

        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) {
                controlWrapper.dataset.fullscreen = true;
                video.style.width = "100vw";
                video.style.height = "100vh";
                flipBtn.style.display = "";
            } else {
                controlWrapper.dataset.fullscreen = false;
                video.style.width = "";
                video.style.height = "";
                flipBtn.style.display = "none";
            }
        });

        flipBtn.addEventListener("click", async () => {
            if (screen.orientation && screen.orientation.lock) {
                if (screen.orientation.type.includes("landscape")) {
                    await screen.orientation.lock("portrait");
                } else {
                    await screen.orientation.lock("landscape");
                }
            }
        });

        window.addEventListener("orientationchange", () => {
            if (screen.orientation.type.includes("landscape")) {
                controlWrapper.dataset.orientation = "landscape";
            } else {
                controlWrapper.dataset.orientation = "portrait";
            }
        });

        const timeFormat = (time) => {
            const seconds = Math.floor(time % 60)
                .toString()
                .padStart(2, "0");
            const minutes = Math.floor((time / 60) % 60);
            const hours = Math.floor(time / 3600);

            if (hours === 0) {
                return minutes + ":" + seconds;
            } else {
                return (
                    hours +
                    ":" +
                    minutes.toString().padStart(2, "0") +
                    ":" +
                    seconds
                );
            }
        };
    }

    checkControls() {
        const video = this.video;
        const control = this.controls;
        const container = video.parentNode;
        const prevBtn = container.querySelector(".prev.btn");
        const nextBtn = container.querySelector(".next.btn");
        const volumeWrapper = container.querySelector(".volume-wrapper");
        const durationWrapper = container.querySelector(".duration-wrapper");
        const pipBtn = container.querySelector(".pip.btn");
        const flipBtn = container.querySelector(".flip.btn");
        const fullscreenBtn = container.querySelector(".fullscreen.btn");
        const playPauseBtn = container.querySelector(".play-pause.btn");

        if (!control.playPause) {
            playPauseBtn.parentNode.removeChild(playPauseBtn);
        }

        if (!control.prev) {
            prevBtn.parentNode.removeChild(prevBtn);
        }

        if (!control.next) {
            nextBtn.parentNode.removeChild(nextBtn);
        }

        if (!control.volume) {
            volumeWrapper.parentNode.removeChild(volumeWrapper);
        }

        if (!control.duration) {
            durationWrapper.parentNode.removeChild(durationWrapper);
        }

        if (!control.pip) {
            pipBtn.parentNode.removeChild(pipBtn);
        }

        if (!control.rotateOrientation) {
            flipBtn.parentNode.removeChild(flipBtn);
        }

        if (!control.fullscreen) {
            fullscreenBtn.parentNode.removeChild(fullscreenBtn);
        }
    }

    checkSupport() {
        const video = this.video;
        const container = video.parentNode;
        const pipBtn = container.querySelector(".pip.btn");
        const fullscreenBtn = container.querySelector(".fullscreen.btn");

        if (
            !"pictureInPictureElement" in document ||
            !document.pictureInPictureEnabled
        ) {
            pipBtn.parentNode.removeChild(pipBtn);
            this.controls.pip = "not supported";
        }

        if (!"fullscreenElement" in document || !document.fullscreenEnabled) {
            fullscreenBtn.parentNode.removeChild(fullscreenBtn)
        }
    }

    isTouchMobile() {
        const userAgentMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );
        const hasTouch =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        return userAgentMobile || hasTouch;
    }
}

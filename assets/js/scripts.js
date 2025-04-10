lottie.loadAnimation ({
    container: document.getElementById('v-logo'),
    loop: true,
    autoplay: true,
    path: 'https://raw.githubusercontent.com/Basalio-art/vin/refs/heads/main/assets/json/data.json',
    renderer: 'svg'
});







let next = document.querySelector('.arrow-right');
let prev = document.querySelector('.arrow-left');
let slide = document.querySelector('.topics .lists');
let slidePos = 0;

next.addEventListener('click', function() {
    slidePos -= 273;
    if (slidePos < -546) {
        slidePos = 0;
    }
    slide.style.cssText = `transform: translateX(${slidePos}px)`;
});

prev.addEventListener('click', function() {
    slidePos += 273;
    if (slidePos > 0) {
        slidePos = -546;
    }
    slide.style.cssText = `transform: translateX(${slidePos}px)`;
});




const toggle = document.getElementById('dark-mode');
const label = document.querySelector('.dark-label');
let a;

label.addEventListener('click', () => {
    if (toggle.checked) {
        document.body.classList.remove('dark');
        a = 1;
    } else {
        document.body.classList.add('dark');
        a = 2;
    }
});

if (toggle.checked) {
    document.body.classList.add('dark');
    a = 1;
} else {
    document.body.classList.remove('dark');
    a = 2;
}

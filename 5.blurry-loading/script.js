const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');
const circle = document.querySelector('.progress-ring__circle');
const quote = document.querySelector('.quote-container');

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

let load = 0;
let int = setInterval(blurring, 20); // Faster interval (from 30ms to 20ms)

function blurring() {
    load += 2; // Faster increment (was 1, now 2)

    if (load > 100) {
        load = 100;
        clearInterval(int);
        document.querySelector('.loading-container').classList.add('fade-out');
        quote.classList.add('fade-in');
    }

    loadText.innerText = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    bg.style.transform = `scale(${scale(load, 0, 100, 1.1, 1)})`; // Slight zoom effect

    // Progress Circle Animation
    const offset = circumference - (load / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Show the quote earlier
    if (load > 70) {
        quote.classList.add('fade-in');
    }
}

// Scaling function
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

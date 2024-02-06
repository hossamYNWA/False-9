// carousel section functionality
let carCurrentIndex = 0;
const carItems = document.querySelectorAll('.carousel-item');
const totalCarouselItems = carItems.length;

function nextSlide() {
    if (carCurrentIndex < totalCarouselItems - 1) {
        carCurrentIndex++;
    } else {
        carCurrentIndex = 0;
    }
    updateCarousel();
}

function prevSlide() {
    if (carCurrentIndex > 0) {
        carCurrentIndex--;
    } else {
        carCurrentIndex = totalCarouselItems - 1;
    }
    updateCarousel();
}

function updateCarousel() {
    const newTransformValue = -carCurrentIndex * 100 + '%';
    document.querySelector('.carousel-inner').style.transform = 'translateX(' + newTransformValue + ')';
}

setInterval(nextSlide, 4000);

// setting the offers timer

const timers = document.querySelectorAll('.timer');

function setTimer(timer, diff) {
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)
    timer.innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes
        }:${seconds < 10 ? '0' + seconds : seconds}`
}

timers.forEach(timer => {
    let targetDate = timer.dataset.target
    setInterval(() => {
        setTimer(timer, targetDate)
        targetDate -= 1000
    }, 1000)
})

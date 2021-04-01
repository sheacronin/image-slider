const slider = (() => {
    const imgEl = document.querySelector('#slide');
    const images = [];
    let currentImgIndex = 0;
    const slideTitle = document.querySelector('#slide-title');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    const playBtn = document.querySelector('#play-btn');
    playBtn.addEventListener('click', toggleAutoPlay);
    let isAutoPlaying = false;
    function changeSlide(destination) {
        let newImage;
        if (destination === 'next') {
            animateSlide('right');
            if (currentImgIndex === images.length - 1) {
                currentImgIndex = -1;
            }
            newImage = images[++currentImgIndex];
        } else if (destination === 'prev') {
            animateSlide('left');
            if (currentImgIndex === 0) {
                currentImgIndex = images.length;
            }
            newImage = images[--currentImgIndex];
        } else {
            animateSlide('up');
            newImage = destination;
            // Set current index to the image we've switched to.
            currentImgIndex = images.indexOf(destination);
        }
        imgEl.src = newImage.src;
        changeSlideTitle(newImage.title);
    }
    function changeSlideTitle(title) {
        slideTitle.textContent = title;
    }
    function animateSlide(direction) {
        imgEl.classList.add('swipe-' + direction);
        setTimeout(() => {
            imgEl.classList.remove('swipe-' + direction);
        }, 401);
    }
    function autoPlay() {
        if (isAutoPlaying) {
            changeSlide('next');
            setTimeout(() => {
                autoPlay();
            }, 5000);
        }
    }
    function toggleAutoPlay() {
        isAutoPlaying = !isAutoPlaying;
        playBtn.textContent = isAutoPlaying ? '||' : '▶';
        if (isAutoPlaying) autoPlay();
    }
    return { images, changeSlide, nextBtn, prevBtn, toggleAutoPlay };
})();

slider.nextBtn.addEventListener('click', () => slider.changeSlide('next'));
slider.prevBtn.addEventListener('click', () => slider.changeSlide('prev'));

(() => {
    const Img = (title, src, altText) => {
        const img = { title, src, altText };
        slider.images.push(img);
        return img;
    };

    Img('spring', './i/spring.jpeg', 'Low-angle view of a cherry blossom tree');
    Img(
        'summer',
        './i/summer.jpeg',
        'A colorful beach ball floating in a pool'
    );
    Img(
        'fall',
        './i/fall.jpeg',
        'The sun shines through orange and red trees in a forest'
    );
    Img(
        'winter',
        './i/winter.jpeg',
        'A white fox with yellow eyes stands in a snowy landscape'
    );
})();

const navBar = document.querySelector('#nav-bar');
slider.images.forEach((image) => {
    const dot = document.createElement('button');
    dot.classList.add('nav-dot');
    dot.addEventListener('click', () => slider.changeSlide(image));
    navBar.appendChild(dot);
});

slider.toggleAutoPlay();

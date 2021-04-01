const slider = (() => {
    const imgEl = document.querySelector('#slide');
    const images = [];
    let currentImgIndex = 0;
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    const playBtn = document.querySelector('#play-btn');
    playBtn.addEventListener('click', toggleAutoPlay);
    let isAutoPlaying = false;
    function changeSlide(destination) {
        if (destination === 'next') {
            animateSlide('right');
            if (currentImgIndex === images.length - 1) {
                currentImgIndex = -1;
            }
            imgEl.src = images[++currentImgIndex].src;
        } else if (destination === 'prev') {
            animateSlide('left');
            if (currentImgIndex === 0) {
                currentImgIndex = images.length;
            }
            imgEl.src = images[--currentImgIndex].src;
        } else {
            animateSlide('up');
            imgEl.src = destination.src;
            // Set current index to the image we've switched to.
            currentImgIndex = images.indexOf(destination);
        }
    }
    function animateSlide(direction) {
        imgEl.classList.add('swipe-' + direction);
        setTimeout(() => {
            imgEl.classList.remove('swipe-' + direction);
        }, 401);
    }
    function autoPlay() {
        console.log('Auto playing: ' + isAutoPlaying);
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

const addImages = (() => {
    const Img = (src, altText) => {
        const img = { src, altText };
        slider.images.push(img);
        return img;
    };

    const spring = Img(
        './i/spring.jpeg',
        'Low-angle view of a cherry blossom tree'
    );

    const summer = Img(
        './i/summer.jpeg',
        'A colorful beach ball floating in a pool'
    );

    const fall = Img(
        './i/fall.jpeg',
        'The sun shines through orange and red trees in a forest'
    );

    const winter = Img(
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

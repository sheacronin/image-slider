const slider = (() => {
    const currentSlide = document.querySelector('#slide');
    const images = [];
    let currentImgIndex = 0;

    (() => {
        const addImage = (title, src, altText) => {
            const image = { title, src, altText };
            images.push(image);
            return image;
        };

        addImage(
            'spring',
            './i/spring.jpeg',
            'Low-angle view of a cherry blossom tree'
        );
        addImage(
            'summer',
            './i/summer.jpeg',
            'A colorful beach ball floating in a pool'
        );
        addImage(
            'fall',
            './i/fall.jpeg',
            'The sun shines through orange and red trees in a forest'
        );
        addImage(
            'winter',
            './i/winter.jpeg',
            'A white fox with yellow eyes stands in a snowy landscape'
        );
    })();

    const slideTitle = document.querySelector('#slide-title');

    const prevBtn = document.querySelector('#prev-btn');
    prevBtn.addEventListener('click', () => changeSlide('prev'));
    const nextBtn = document.querySelector('#next-btn');
    nextBtn.addEventListener('click', () => changeSlide('next'));
    const playBtn = document.querySelector('#play-btn');
    playBtn.addEventListener('click', toggleAutoPlay);

    const nav = (() => {
        const navBar = document.querySelector('#nav-bar');
        const dots = [];
        // Add a dot to represent each image.
        images.forEach((image) => {
            const dot = document.createElement('button');
            dot.classList.add('nav-dot');
            dot.addEventListener('click', () => slider.changeSlide(image));
            dots.push(dot);
            navBar.appendChild(dot);
        });

        function setActiveDot(index) {
            // Remove the active class from all other dots.
            dots.forEach((dot) => dot.classList.remove('active-dot'));
            // Set active dot to the current image index.
            dots[index].classList.add('active-dot');
        }

        return { setActiveDot };
    })();

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
        currentSlide.src = newImage.src;
        changeSlideTitle(newImage.title);
        nav.setActiveDot(images.indexOf(newImage));
    }

    function changeSlideTitle(title) {
        slideTitle.textContent = title;
    }

    function animateSlide(direction) {
        currentSlide.classList.add('swipe-' + direction);
        setTimeout(() => {
            currentSlide.classList.remove('swipe-' + direction);
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

    return { images, changeSlide, toggleAutoPlay };
})();

const navBar2 = {
    el: document.querySelector('#nav-bar'),
    dots: [],
};

slider.toggleAutoPlay();

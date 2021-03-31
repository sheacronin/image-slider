// class Img {
//     constructor(src, altText) {
//         (this.src = src), (this.altText = altText);
//     }
// }

const slider = (() => {
    const imgEl = document.querySelector('#slide');
    const images = [];
    let currentImgIndex = 0;
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
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
        }
    }
    function animateSlide(direction) {
        imgEl.classList.add('swipe-' + direction);
        setTimeout(() => {
            imgEl.classList.remove('swipe-' + direction);
        }, 401);
    }
    return { images, changeSlide, nextBtn, prevBtn };
})();

slider.nextBtn.addEventListener('click', () => slider.changeSlide('next'));
slider.prevBtn.addEventListener('click', () => slider.changeSlide('prev'));

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

const navBar = document.querySelector('#nav-bar');
slider.images.forEach((image) => {
    const dot = document.createElement('button');
    dot.classList.add('nav-dot');
    dot.addEventListener('click', () => slider.changeSlide(image));
    navBar.appendChild(dot);
});

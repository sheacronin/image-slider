// class Img {
//     constructor(src, altText) {
//         (this.src = src), (this.altText = altText);
//     }
// }

const slider = {
    imgEl: document.querySelector('#slide'),
    images: [],
    currentImgIndex: 0,
    prevBtn: document.querySelector('#prev-btn'),
    nextBtn: document.querySelector('#next-btn'),
    changeSlide(direction) {
        if (direction === 'next') {
            if (this.currentImgIndex === this.images.length - 1) {
                this.currentImgIndex = -1;
            }
            this.imgEl.src = this.images[++this.currentImgIndex].src;
        } else if (direction === 'prev') {
            if (this.currentImgIndex === 0) {
                this.currentImgIndex = this.images.length;
            }
            this.imgEl.src = this.images[--this.currentImgIndex].src;
        }
    },
};

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

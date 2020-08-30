import {getZero} from '../services/services.js';

function slider({
    sliderSelector,
    wrapperSelector,
    fieldSelector,
    sledesSelector,
    prevSelector,
    nextSelector,
    totalSelector,
    currentSelector
}) {

    // const slider = {
    //     elemCurrentNumber: document.querySelector('.offer__slider-counter #current'),
    //     elemTotalNumber: document.querySelector('.offer__slider-counter #total'),
    //     slides: document.querySelectorAll('.offer__slide'),
    //     indexVisi: 0,
    // };

    // startSlider();
    // let slideTimer = setInterval(showNext, 3000);

    // function startSlider() {
    //     showSlideI(0);
    //     slider.elemTotalNumber.textContent = getZero(slider.slides.length);
    //     listenSwitchesSlider();

    // }
    // function showSlideI(i){
    //     slider.slides.forEach((slide)=> {
    //         slide.classList.remove('show', 'fade');
    //         slide.classList.add('hide');
    //     });
    //     slider.slides[i].classList.add('show', 'fade');
    //     slider.slides[i].classList.remove('hide');
    //     slider.elemCurrentNumber.textContent = getZero(i + 1);
    //     slider.indexVisi = i;

    // }


    // function showPrev(){
    //     if (slider.indexVisi <= 0) {
    //         showSlideI(slider.slides.length - 1);

    //     } else {
    //         showSlideI(slider.indexVisi - 1);
    //     }
    // }

    // function showNext() {
    //     if (slider.slides.length - 1 <= slider.indexVisi) {
    //         showSlideI(0);

    //     } else {
    //         showSlideI(slider.indexVisi + 1);
    //     }
    // }

    // function listenSwitchesSlider() {
    //     let waitingToStart;
    //     const prev = document.querySelector('.offer__slider-prev');
    //     const next = document.querySelector('.offer__slider-next');
    //     prev.addEventListener('click', ()=>{

    //         showPrev();
    //         suspendTimerSlider();

    //     });      
    //     next.addEventListener('click', ()=>{

    //         showNext();  
    //         suspendTimerSlider();
    //     });

    //     function suspendTimerSlider() {
    //         clearInterval(waitingToStart);
    //         clearInterval(slideTimer);
    //         waitingToStart = setTimeout(()=>{
    //             slideTimer = setInterval(showNext, 3000);
    //         }, 10000);   
    //     }
    // }

    const wrapper = document.querySelector(wrapperSelector),
        slides = document.querySelectorAll(sledesSelector),
        slidesField = document.querySelector(fieldSelector),
        prev = document.querySelector(prevSelector),
        next = document.querySelector(nextSelector),
        сurrent = document.querySelector(currentSelector),
        total = document.querySelector(totalSelector),
        slider = document.querySelector(sliderSelector);
    let indexVisi = 1,
        offset = 0,
        width = window.getComputedStyle(wrapper).width;



    slides.forEach(slide => slide.style.width = width);
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all .3s';
    wrapper.style.overflow = 'hidden';


    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    const dots = [];
    slides.forEach((slide, i) => {
        const dot = document.createElement('div');
        dot.setAttribute('data-indexSlide', i + 1);
        dots.push(dot);
        dot.classList.add('dot');
        indicators.append(dot);
    });

    try{
        startSlider();
    } catch(e){
        console.error('ERRRRRRRRR');
    }

    let slideTimer = setInterval(shiftLeft, 3000);

    function deliteNotDigit(str) {
        return +str.replace(/\D/ig, '');
    }

    function shiftToSlide(i) {
        if (i > slides.length) {
            i = slides.length;
        }
        if (i < 1) {
            i = 1;
        }
        offset = deliteNotDigit(width) * (i - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        indexVisi = i;
        сurrent.textContent = getZero(indexVisi);
        setActiveDot(indexVisi);


    }

    function shiftLeft() {
        if (offset >= deliteNotDigit(width) * (slides.length - 1)) {
            offset = 0;

        } else {
            offset += deliteNotDigit(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexVisi >= slides.length) {
            indexVisi = 1;
        } else {
            indexVisi++;
        }
        сurrent.textContent = getZero(indexVisi);
        setActiveDot(indexVisi);

    }

    function shiftRight() {
        if (offset == 0) {
            offset = deliteNotDigit(width) * (slides.length - 1);

        } else {
            offset -= deliteNotDigit(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexVisi <= 1) {
            indexVisi = slides.length;
        } else {
            indexVisi--;
        }
        сurrent.textContent = getZero(indexVisi);
        setActiveDot(indexVisi);

    }

    function listenSwitchesSlider() {
        let suspendTimer;
        prev.addEventListener('click', () => {
            shiftRight();
            SetSuspendTimerSlider();
        });
        next.addEventListener('click', () => {
            shiftLeft();
            SetSuspendTimerSlider();

        });
        indicators.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-indexSlide')) {
                shiftToSlide(+e.target.getAttribute('data-indexSlide'));
                SetSuspendTimerSlider();
            }
        });

        function SetSuspendTimerSlider() {
            clearInterval(suspendTimer);
            clearInterval(slideTimer);
            suspendTimer = setTimeout(() => {
                slideTimer = setInterval(shiftLeft, 3000);
            }, 10000);


        }


    }

    function setActiveDot(i) {
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[i - 1].style.opacity = '1';


    }

    function startSlider() {
        listenSwitchesSlider();
        total.textContent = getZero(slides.length);
        сurrent.textContent = getZero(1);
        setActiveDot(indexVisi);
    }


}

export default slider;
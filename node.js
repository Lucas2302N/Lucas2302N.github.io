document.addEventListener('DOMContentLoaded', () => {
  const controls = document.querySelectorAll('.control');
  const gallery = document.querySelector('.gallery');
  const wrapper = document.querySelector('.gallery-wrapper');

  let items = Array.from(document.querySelectorAll('.item'));
  if (!items.length) return;

  let currentItem = 0;
  const maxItems = items.length;

  // lê gap do CSS de forma segura
  function readGap() {
    const style = getComputedStyle(gallery);
    // 'gap' é suportado; fallback 0
    return parseFloat(style.gap || style.columnGap || 0) || 0;
  }

  function updateMeasurements() {
    // re-ler itens (útil se trocar conteúdo dinamicamente)
    items = Array.from(document.querySelectorAll('.item'));
    const gap = readGap();
    const itemWidth = items[0].getBoundingClientRect().width;
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    return { gap, itemWidth, wrapperWidth };
  }

  function updateCarousel() {
    if (!items.length) return;
    const { gap, itemWidth, wrapperWidth } = updateMeasurements();

    // destaque
    items.forEach(it => it.classList.remove('current-item'));
    items[currentItem].classList.add('current-item');

    // cálculo para centralizar
    const offset = (wrapperWidth - itemWidth) / 2;
    const translateX = -currentItem * (itemWidth + gap) + offset;

    gallery.style.transform = `translateX(${translateX}px)`;
  }

  controls.forEach(control => {
    control.addEventListener('click', () => {
      if (control.classList.contains('arrow-left')) {
        currentItem = (currentItem - 1 + maxItems) % maxItems;
      } else {
        currentItem = (currentItem + 1) % maxItems;
      }
      updateCarousel();
    });
  });

  // garante centralizar depois que tudo (imagens) carregar
  window.addEventListener('load', updateCarousel);
  window.addEventListener('resize', updateCarousel);

  // tentativa inicial rápida
  updateCarousel();
});



const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = slideRight.querySelectorAll('div').length


let activeSlideIndex = 0


slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`


upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))


const changeSlide = (direction) => {
   const sliderHeight = sliderContainer.clientHeight
   if(direction === 'up') {
       activeSlideIndex++
       if(activeSlideIndex > slidesLength - 1) {
           activeSlideIndex = 0
       }
   } else if(direction === 'down') {
       activeSlideIndex--
       if(activeSlideIndex < 0) {
           activeSlideIndex = slidesLength - 1
       }
   }


   slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
   slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
  }

  /*movimento*/
  const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}

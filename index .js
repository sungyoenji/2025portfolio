// header blur
$(document).ready(function() {
    const header = $("#header")[0];  // jQuery로 선택 후, DOM 요소로 변환

    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 50) { // 스크롤이 50px 이상 내리면
            $(header).addClass("blurred");
        } else {
            $(header).removeClass("blurred");
        }
    });
});

// bg


const blurs = document.querySelectorAll('.blur');
const floats = [];

blurs.forEach((el, i) => {
  const size = parseFloat(getComputedStyle(el).getPropertyValue('--size')) || 300;
  const x = parseFloat(getComputedStyle(el).getPropertyValue('--left')) || 0;
  const y = parseFloat(getComputedStyle(el).getPropertyValue('--top')) || 0;

  floats.push({
    el,
    baseX: x,
    baseY: y,
    speed: 0.0001 + Math.random() * 0.001,
    radius: 130 + Math.random() * 100,
  });
});

let lastTimestamp = null;
let totalElapsed = 0;

function animate(currentTime) {
  if (!lastTimestamp) lastTimestamp = currentTime;
  const delta = currentTime - lastTimestamp;
  lastTimestamp = currentTime;
  totalElapsed += delta;

  floats.forEach((float, i) => {
    const x = float.baseX + Math.cos(totalElapsed * float.speed + i) * float.radius;
    const y = float.baseY + Math.sin(totalElapsed * float.speed + i) * float.radius;
    const rotate = Math.sin(totalElapsed * 0.0005 + i) * 15;

    float.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// about
AOS.init({
    duration: 1200,
   })

// scroll trigger_who is that
document.addEventListener("DOMContentLoaded", function () {
    const fadeUpElements = document.querySelectorAll('.fade-left, .fade-up, .fade-right'); // 모든 fade-up 요소 선택

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // 요소가 화면에 보이면 show 클래스 추가
            } else {
                entry.target.classList.remove("show"); // 요소가 화면에서 벗어나면 다시 초기화
            }
        });
    }, { threshold: 0.6 });

    fadeUpElements.forEach(element => {
        observer.observe(element); // 모든 fade-up 요소에 대해 observer 설정
    });
});

// scroll trigger_텍스트 슬라이스
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".slide-up, .slide-down").forEach((el) => {
        gsap.fromTo(el, 
            { opacity: 0.3, y: el.classList.contains("slide-up") ? 50 : -50 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power2.out", 
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%", // 요소가 화면의 85% 위치에 도달하면 시작
                    toggleActions: "play none none reset",
                    once: true, // 한 번만 실행
                    markers: false // 테스트할 때는 true로 설정 가능
                }
            }
        );
    });
});
// on click
function setActive(clickedElement) {
    document.querySelectorAll('.menu li a').forEach(el => {
      el.classList.remove('on');
    });
    clickedElement.classList.add('on');
  }

  
  // isotope 초기화
  $('.list').each(function(){
    $(this).isotope({
      itemSelector: '.list_item',
      layoutMode: 'fitRows'
    });
  });
  
  // 메뉴 클릭 시 필터 적용
  $('.menu li a').click(function () {
    $('.menu li a').removeClass('on');
    $(this).addClass('on');
  
    const selected = $(this).parent().attr('id');
    const filter = selected === 'All' ? '*' : '.' + selected;
  
    // slick이 보여주는 현재 슬라이드만 선택
    $('.design_slideWrap_inner .slick-slide.slick-current .list').each(function () {
      $(this).isotope({ filter });
    });
  });
  
  // 슬라이드 넘길 때 현재 필터 재적용
  $('.design_slideWrap_inner').on('afterChange', function() {
    const selected = $('.menu li a.on').parent().attr('id');
    const filter = selected === 'All' ? '*' : '.' + selected;
  
    $('.slick-slide.slick-current .list').each(function () {
      if (!$(this).data('isotope')) {
        $(this).isotope({
          itemSelector: '.list_item',
          layoutMode: 'fitRows'
        });
      }
      $(this).isotope({ filter });
    });
  });
    // //design슬라이드
    $('.design_slideWrap_inner').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      arrows: true
    });
  // glightbox
  const lightbox = GLightbox({
    selector: '.glightbox'
  });
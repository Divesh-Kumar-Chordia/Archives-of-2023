// Attendance Carousel
let attendanceCarousel = document.querySelector('#attendance-carousel');
let attendanceCarouselSlides = attendanceCarousel.querySelectorAll('.carousel-slide');
let attendanceCarouselDots = attendanceCarousel.querySelectorAll('.carousel-dot');
let attendancePrevBtn = attendanceCarousel.querySelector('.carousel-prev');
let attendanceNextBtn = attendanceCarousel.querySelector('.carousel-next');
let attendanceCurrentSlide = 0;

// Show current slide
function showAttendanceSlide() {
  attendanceCarouselSlides.forEach(slide => slide.classList.remove('active'));
  attendanceCarouselDots.forEach(dot => dot.classList.remove('active'));
  attendanceCarouselSlides[attendanceCurrentSlide].classList.add('active');
  attendanceCarouselDots[attendanceCurrentSlide].classList.add('active');
}

// Move to next slide
function nextAttendanceSlide() {
  attendanceCurrentSlide++;
  if (attendanceCurrentSlide >= attendanceCarouselSlides.length) {
    attendanceCurrentSlide = 0;
  }
  showAttendanceSlide();
}

// Move to previous slide
function prevAttendanceSlide() {
  attendanceCurrentSlide--;
  if (attendanceCurrentSlide < 0) {
    attendanceCurrentSlide = attendanceCarouselSlides.length - 1;
  }
  showAttendanceSlide();
}

// Move to slide when dot is clicked
attendanceCarouselDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    attendanceCurrentSlide = index;
    showAttendanceSlide();
  });
});

// Move to next slide when next button is clicked
attendanceNextBtn.addEventListener('click', () => {
  nextAttendanceSlide();
});

// Move to previous slide when previous button is clicked
attendancePrevBtn.addEventListener('click', () => {
  prevAttendanceSlide();
});

// Auto slide
let attendanceAutoSlideInterval = setInterval(() => {
  nextAttendanceSlide();
}, 5000);

// Stop auto slide on hover
attendanceCarousel.addEventListener('mouseenter', () => {
  clearInterval(attendanceAutoSlideInterval);
});

// Resume auto slide on hover out
attendanceCarousel.addEventListener('mouseleave', () => {
  attendanceAutoSlideInterval = setInterval(() => {
    nextAttendanceSlide();
  }, 5000);
});

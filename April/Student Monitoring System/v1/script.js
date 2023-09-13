// Student Login
const form = document.querySelector('form');
const studentIdInput = document.querySelector('#student-id');
const studentNameSpan = document.querySelector('#student-name');
const studentDetailsSection = document.querySelector('.student-details');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const studentId = studentIdInput.value.trim();
  if (studentId !== '') {
    // Here, you should make an AJAX request to fetch the student details
    // After you receive the response, you can update the UI using the code below
    
    // Dummy data for testing purposes
    const student = {
      name: 'John Doe',
      sec: 'A',
      cgpa: 8.5,
      marks: [
        { subject: 'Maths', grade: 'A', marksObtained: 80, maxMarks: 100 },
        { subject: 'Science', grade: 'B', marksObtained: 70, maxMarks: 100 },
        { subject: 'English', grade: 'A', marksObtained: 85, maxMarks: 100 }
      ],
      attendance: [
        { subject: 'Maths', attended: 50, total: 60 },
        { subject: 'Science', attended: 40, total: 60 },
        { subject: 'English', attended: 55, total: 60 }
      ]
    };
    
    studentNameSpan.textContent = student.name;
    studentDetailsSection.style.display = 'block';
    updateMarksCarousel(student.marks);
    updateAttendanceCarousel(student.attendance);
  }
});

// Update Marks Carousel
function updateMarksCarousel(marks) {
  const carouselContainer = document.querySelector('.marks-carousel .carousel-container');
  carouselContainer.innerHTML = '';
  marks.forEach(mark => {
    const card = document.createElement('div');
    card.classList.add('card');
    const subjectHeading = document.createElement('h4');
    subjectHeading.textContent = mark.subject;
    const gradePara = document.createElement('p');
    gradePara.textContent = `Grade: ${mark.grade}`;
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.style.width = `${(mark.marksObtained / mark.maxMarks) * 100}%`;
    card.append(subjectHeading, gradePara, progress);
    carouselContainer.append(card);
  });
}

// Update Attendance Carousel
function updateAttendanceCarousel(attendance) {
  const carouselContainer = document.querySelector('.attendance-carousel .carousel-container');
  carouselContainer.innerHTML = '';
  attendance.forEach(att => {
    const card = document.createElement('div');
    card.classList.add('card');
    const subjectHeading = document.createElement('h4');
    subjectHeading.textContent = att.subject;
    const attendancePara = document.createElement('p');
    attendancePara.textContent = `${att.attended}/${att.total}`;
    const pieChart = document.createElement('div');
    pieChart.classList.add('pie-chart');
    pieChart.style.backgroundImage = `conic-gradient(#2ecc71 ${(att.attended / att.total) * 100}%, #eee ${(1 - att.attended / att.total) * 100}%)`;
    card.append(subjectHeading, attendancePara, pieChart);
    carouselContainer.append(card);
  });
}

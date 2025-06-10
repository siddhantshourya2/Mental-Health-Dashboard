let currentSection = null;
let breathInterval = null;

function showSection(id) {
  const section = document.getElementById(id);

  // Toggle off if already open
  if (currentSection === id) {
    section.classList.remove('active');
    section.classList.add('hidden');
    currentSection = null;
    return;
  }

  // Hide all sections
  const sections = document.querySelectorAll('.content');
  sections.forEach(sec => {
    sec.classList.remove('active');
    sec.classList.add('hidden');
  });

  // Show selected
  section.classList.remove('hidden');
  section.classList.add('active');
  currentSection = id;

  // Setup breathing animation only if mindfulness section is shown
  if (id === "mindfulness") {
    const breathText = document.getElementById("breathText");
    const steps = ["Breathe In", "Hold", "Breathe Out"];
    let index = 0;

    clearInterval(breathInterval); // Prevent multiple intervals
    breathInterval = setInterval(() => {
      breathText.textContent = steps[index];
      index = (index + 1) % steps.length;
    }, 4000);

    // Music toggle
    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");

    musicToggle.onchange = () => {
      if (musicToggle.checked) {
        bgMusic.play();
      } else {
        bgMusic.pause();
      }
    };
  } else {
    clearInterval(breathInterval); // Stop animation on other sections
  }
}

let timerInterval = null;

function startSession() {
  clearInterval(timerInterval); // Reset any previous timer

  const duration = parseInt(document.getElementById("durationSelect").value);
  let timeLeft = duration;

  const timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "🎉 Session Complete!";

      const bgMusic = document.getElementById("bgMusic");
      if (bgMusic) bgMusic.pause();

      const musicToggle = document.getElementById("musicToggle");
      if (musicToggle) musicToggle.checked = false;
    }
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('show');
}

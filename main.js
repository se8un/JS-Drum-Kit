window.addEventListener('keydown', (e) => {
  // console.log(e);
  const audio = document.querySelector(`audio[data-key="${e.code}"]`);
  const key = document.querySelector(`.key[data-key="${e.code}"]`);
  if (!audio) return;

  // Удаляем класс 'playing' перед его добавлением
  key.classList.remove('playing');
  audio.currentTime = 0;
  audio.play();

  // Добавляем класс 'playing' и удаляем его через 100 мс
  key.classList.add('playing');
  setTimeout(() => {
    key.classList.remove('playing');
  }, 100); // Устанавливаем время, которое соответствует длительности анимации в CSS
});

// Удаляем класс 'playing' после окончания анимации
const keys = document.querySelectorAll('.key');
keys.forEach((key) =>
  key.addEventListener('transitionend', (e) => {
    // console.log(`Transition ended on ${event.propertyName} for key ${key.dataset.key}`);
    if (e.propertyName === 'transform') {
      key.classList.remove('playing');
    }
  })
);

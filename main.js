const sounds = {
  KeyQ: new Audio('./sounds/metalofon/zvuk-notyi-do.wav'),
  KeyW: new Audio('./sounds/metalofon/zvuk-notyi-re.wav'),
  KeyE: new Audio('./sounds/metalofon/zvuk-notyi-mi.wav'),
  KeyA: new Audio('./sounds/metalofon/zvuk-notyi-fa.wav'),
  KeyS: new Audio('./sounds/metalofon/zvuk-notyi-sol.wav'),
  KeyD: new Audio('./sounds/metalofon/zvuk-notyi-lya.wav'),
  KeyZ: new Audio('./sounds/metalofon/zvuk-notyi-si.wav'),
  KeyX: new Audio('./sounds/metalofon/zvuk-notyi-do-vo-vtoroy-oktave.wav'),
  KeyC: new Audio('./sounds//metalofon/zvuk-notyi-do.wav'),
};

const soundsLoop = {
  Digit1: new Audio('./sounds/zvuk-om.wav'),
  Digit2: new Audio('./sounds/melody/city-lights.wav'),
  Digit3: new Audio('./sounds/melody/echoes-of-eternity.wav'),
  Digit4: new Audio('./sounds/melody/echos-of-the-steppe.wav'),
  Digit5: new Audio('./sounds/melody/floating-above.wav'),
  Digit6: new Audio('./sounds/melody/moonlit-waters.wav'),
  Digit7: new Audio('./sounds/melody/whispers-of-the-sakura.wav'),
  Digit8: new Audio('./sounds/melody/whispers-of-time.wav'),
  Digit9: new Audio('./sounds/melody/whistlin-through-the-day.wav'),
  Digit0: new Audio('./sounds/zvuk-om.wav'),
};

const soundsUtility = {
  Minus: new Audio('./sounds/zvuk-om.wav'),
  Equal: new Audio('./sounds/zvuk-om.wav'),
};

// Устанавливаем preload="auto" для всех аудиофайлов
Object.values(sounds).forEach((audio) => (audio.preload = 'auto'));
Object.values(soundsLoop).forEach((audio) => (audio.preload = 'auto'));
Object.values(soundsUtility).forEach((audio) => (audio.preload = 'auto'));

// Переключатель для отслеживания состояния воспроизведения звука
const isPlaying = {};

// Установка цикличного воспроизведения для каждого звука
for (let key in soundsLoop) {
  soundsLoop[key].loop = true;
  isPlaying[key] = false;
}

window.addEventListener('keydown', (e) => {
  const key = e.code;
  let audio = null;
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);

  if (key in sounds) {
    audio = sounds[key];
    stopSound();
    audio.play();
  }

  if (key in soundsLoop) {
    audio = soundsLoop[key];
    if (isPlaying[key]) {
      stopSound();
      isPlaying[key] = false;
    } else {
      audio.play();
      keyElement.classList.add('playing');
      keyElement.classList.add('playingMusic');
      isPlaying[key] = true;
    }
  }

  if (key in soundsUtility) {
    audio = soundsUtility[key];
    stopSound();
    audio.play();
    keyElement.classList.remove('playingMusic');
  }

  if (!audio || !keyElement) return;
  // Убираем класс 'playing' после окончания анимации
  setTimeout(() => keyElement.classList.remove('playing'), 100);

  function stopSound() {
    audio.pause();
    audio.currentTime = 0;
    keyElement.classList.add('playing');
    keyElement.classList.remove('playingMusic');
  }
});

// Обработчик для окончания анимации
const keys = document.querySelectorAll('.key');
keys.forEach((key) =>
  key.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') {
      key.classList.remove('playing');
    }
  })
);

// AudioContext в Web Audio API обеспечивает более точный контроль над звуками, так как он позволяет напрямую управлять временем их начала. Это улучшает отзывчивость.
const audioContext = new window.AudioContext();

// Объект для хранения аудиобуферов
const soundBuffers = {};

// Функция для загрузки аудиофайла и сохранения его в буфере
async function loadSound(key, url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  soundBuffers[key] = await audioContext.decodeAudioData(arrayBuffer);
}

// Загрузка всех звуков
async function loadAllSounds() {
  await loadSound('KeyQ', './sounds/1.wav');
  await loadSound('KeyW', './sounds/2.wav');
  await loadSound('KeyE', './sounds/3.wav');
  // остальные звуки...
}

// Воспроизведение звука из буфера
function playSound(key) {
  if (!soundBuffers[key]) return;
  const sound = audioContext.createBufferSource();
  sound.buffer = soundBuffers[key];
  sound.connect(audioContext.destination);
  sound.start();
}

// Инициализация звуков перед использованием
loadAllSounds();

// Обработчик событий для нажатия клавиш
window.addEventListener('keydown', (e) => {
  playSound(e.code);
});

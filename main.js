window.addEventListener('keydown', (e) => {
  console.log(e);
  //FIXME: e.keyCode устареть посмотреть альтернативу
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
});

//TODO: - прикрутить 3д фон с моего сайта и сделать чтобы он зацикленно кружился

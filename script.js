// Mostra as linhas do log uma a uma: ao carregar a página e quando a pessoa clica em "Reproduzir".
(() => {
  const log = document.querySelector('.log');
  const botao = document.querySelector('.repetir');
  if (!log || !botao) return;

  const linhas = [...log.querySelectorAll('li')];
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timers = [];

  function reproduzir() {
    timers.forEach(clearTimeout);
    timers = [];
    if (semMovimento.matches) {
      log.classList.remove('animando');
      return;
    }
    log.classList.add('animando');
    linhas.forEach(l => l.classList.remove('visivel'));
    // pausa maior antes das linhas que mostram o voto repetido e a nova tentativa
    const atrasos = [250, 700, 650, 1100, 700, 1100, 900];
    let t = 0;
    linhas.forEach((linha, i) => {
      t += atrasos[i] ?? 600;
      timers.push(setTimeout(() => linha.classList.add('visivel'), t));
    });
  }

  botao.addEventListener('click', reproduzir);
  reproduzir();
})();

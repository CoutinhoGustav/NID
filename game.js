// Perguntas do jogo
const bancoPerguntas = [
  {
    category: 'Verbos',
    question: '¿Cuál es un verbo?',
    options: ['Libro', 'Comer', 'Mesa', 'Rojo'],
    answer: 'Comer',
  },
  {
    category: 'Substantivos',
    question: '¿Cuál es un sustantivo?',
    options: ['Correr', 'Feliz', 'Casa', 'Vivir'],
    answer: 'Casa',
  },
  {
    category: 'Adjetivos',
    question: '¿Cuál es un adjetivo?',
    options: ['Escuela', 'Bonito', 'Beber', 'Perro'],
    answer: 'Bonito',
  },
];

// Avatares disponíveis
const avatars = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=16',
  'https://i.pravatar.cc/150?img=17',
  'https://i.pravatar.cc/150?img=18',
];

// Variáveis do jogador
let indice = 0;
let scoreTotal = 0;
let playerProfile = JSON.parse(
  localStorage.getItem('player-profile') || 'null'
);
let rankingGlobal = JSON.parse(localStorage.getItem('ranking-global') || '[]');

// Elementos de tela
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const finalScreen = document.getElementById('final-screen');

// Elementos do jogo
const playerAvatarEl = document.getElementById('player-avatar');
const playerNicknameEl = document.getElementById('player-nickname');
const materiaTitle = document.getElementById('materia-title');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');

// Modal perfil
const modalPerfil = document.getElementById('profile-modal');
const avatarGrid = document.getElementById('avatar-grid');
const nicknameInput = document.getElementById('nickname-input');
const saveProfileBtn = document.getElementById('save-profile-btn');

// Modal feedback
const feedbackModal = document.getElementById('feedback-modal');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMsg = document.getElementById('feedback-msg');
const closeFeedbackBtn = document.getElementById('close-feedback-btn');

// Tela final ranking
const finalScoreEl = document.getElementById('final-score');
const rankingFinalEl = document.getElementById('ranking-final');

// Carregar avatares no modal de perfil
avatars.forEach((url) => {
  const img = document.createElement('img');
  img.src = url;
  img.onclick = () => {
    document
      .querySelectorAll('#avatar-grid img')
      .forEach((i) => i.classList.remove('selected'));
    img.classList.add('selected');
    playerProfileTemp.avatar = url;
  };
  avatarGrid.appendChild(img);
});

// Perfil temporário na seleção
let playerProfileTemp = { nickname: '', avatar: null, score: 0 };

// Abrir modal se não tiver perfil salvo
function checarPerfil() {
  if (!playerProfile) {
    modalPerfil.style.display = 'flex';
  }
}

// Salvar perfil do jogador
saveProfileBtn.onclick = () => {
  const nick = nicknameInput.value.trim();
  const avatar = document.querySelector('#avatar-grid img.selected')?.src;

  if (!nick || !avatar) {
    alert('Preencha nickname e selecione um avatar!');
    return;
  }

  playerProfile = { nickname: nick, avatar: avatar, score: 0 };
  localStorage.setItem('player-profile', JSON.stringify(playerProfile));
  location.reload();
};

// Atualizar UI do perfil no jogo
function atualizarPerfilUI() {
  if (!playerProfile) return;
  playerAvatarEl.src = playerProfile.avatar;
  playerNicknameEl.textContent = playerProfile.nickname;
}

// Alternar telas
function irParaJogo() {
  startScreen.classList.remove('active');
  gameScreen.classList.add('active');
  carregarPergunta();
  atualizarPerfilUI();
}

function irParaFinal() {
  gameScreen.classList.remove('active');
  finalScreen.classList.add('active');
  mostrarResultadoFinal();
}

// Carregar pergunta atual
function carregarPergunta() {
  if (indice >= bancoPerguntas.length) {
    salvarNoRanking();
    irParaFinal();
    return;
  }

  const atual = bancoPerguntas[indice];
  materiaTitle.textContent = atual.category;
  questionEl.textContent = atual.question;
  optionsEl.innerHTML = '';

  atual.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => responder(opt, atual.answer);
    optionsEl.appendChild(btn);
  });
}

// Responder e exibir feedback
function responder(resp, correta) {
  if (resp === correta) {
    scoreTotal += 10;
    feedbackTitle.textContent = '¡Correcto!';
    feedbackMsg.textContent = '+10 puntos 🎉';
  } else {
    feedbackTitle.textContent = '❌ ¡Incorrecto!';
    feedbackMsg.textContent = 'Correcto: ' + correta;
  }

  feedbackModal.style.display = 'flex';
}

// Fechar feedback e avançar
closeFeedbackBtn.onclick = () => {
  feedbackModal.style.display = 'none';
  indice++;
  carregarPergunta();
};

// Salvar pontuação no ranking global
function salvarNoRanking() {
  rankingGlobal.push({
    name: playerProfile.nickname,
    avatar: playerProfile.avatar,
    score: scoreTotal,
  });
  rankingGlobal = rankingGlobal.sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem('ranking-global', JSON.stringify(rankingGlobal));
}

// Mostrar resultado final + ranking
function mostrarResultadoFinal() {
  finalScoreEl.textContent = `🎯 Você fez ${scoreTotal} pontos!`;

  const ranking = JSON.parse(localStorage.getItem('ranking-global') || '[]');
  const rankingFinalEl = document.getElementById('ranking-final');

  rankingFinalEl.innerHTML = ranking
    .map((p) => `<li><img src="${p.avatar}"/> ${p.name} — ${p.score} pts</li>`)
    .join('');
}

// Iniciar jogo
document.getElementById('start-btn').onclick = irParaJogo;

// Init
checarPerfil();
atualizarPerfilUI();
renderRankingInicial();

// (Opcional) Render ranking inicial na start screen
function renderRankingInicial() {
  const el = document.getElementById('ranking-final');
  if (!el) return;
  el.innerHTML = rankingGlobal
    .map((p) => `<li>${p.name} — ${p.score} pts</li>`)
    .join('');
}

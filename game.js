/* ===============================
   BANCO DE QUESTÕES POR DISCIPLINA
================================ */

const bancoPorDisciplina = {
  espanhol: [
    { category: 'Verbos', question: '¿Cuál es un verbo?', options: ['Libro', 'Comer', 'Mesa', 'Rojo'], answer: 'Comer' },
    { category: 'Substantivos', question: '¿Cuál es un sustantivo?', options: ['Correr', 'Feliz', 'Casa', 'Vivir'], answer: 'Casa' },
    { category: 'Adjetivos', question: '¿Cuál es un adjetivo?', options: ['Escuela', 'Bonito', 'Beber', 'Perro'], answer: 'Bonito' },
    { category: 'Gramática', question: '¿Qué artículo es correcto para *manzana*?', options: ['El', 'La', 'Los', 'Un'], answer: 'La' },
    { category: 'Vocabulário', question: '¿Cómo se dice *amizade*?', options: ['Amistad', 'Amor', 'Familia', 'Trabajo'], answer: 'Amistad' }
  ],

  quimica: [
    { category:'Elementos', question:'Símbolo químico do Ouro é:', options:['Au','Ag','Fe','O'], answer:'Au' },
    { category:'pH', question:'pH 7 é considerado:', options:['Ácido','Neutro','Básico','Salino'], answer:'Neutro' },
    { category:'Ligações', question:'NaCl é um exemplo de ligação:', options:['Covalente','Iônica','Metálica','Hidrogênio'], answer:'Iônica' },
    { category:'Química Orgânica', question:'Elemento base dos compostos orgânicos:', options:['Carbono','Oxigênio','Sódio','Cloro'], answer:'Carbono' }
  ],

  biologia: [
    { category:'Bioquímica', question:'As proteínas são formadas por:', options:['Aminoácidos','Lipídios','Vitaminas','Glicose'], answer:'Aminoácidos' },
    { category:'Citologia', question:'A respiração celular ocorre na:', options:['Mitocôndria','Núcleo','Lisossomo','Ribossomo'], answer:'Mitocôndria' },
    { category:'Ecologia', question:'Produtores realizam:', options:['Fotossíntese','Respiração anaeróbica','Fermentação','Digestão'], answer:'Fotossíntese' },
    { category:'Fisiologia', question:'Órgão que filtra o sangue:', options:['Pulmão','Rim','Coração','Fígado'], answer:'Rim' }
  ]
};

/* ===============================
   VARIÁVEIS GLOBAIS
================================ */

let playerProfile = JSON.parse(localStorage.getItem('player-profile') || 'null');
let rankingGlobal = JSON.parse(localStorage.getItem('ranking-global') || '[]');
let disciplinaSelecionada = null;
let indice = 0;
let scoreTotal = 0;

/* ===============================
   ELEMENTOS
================================ */

const modalPerfil = document.getElementById('profile-modal');
const avatarGrid = document.getElementById('avatar-grid');
const nicknameInput = document.getElementById('nickname-input');
const saveProfileBtn = document.getElementById('save-profile-btn');

const startScreen = document.getElementById('start-screen');
const catalogScreen = document.getElementById('catalog-screen');
const gameScreen = document.getElementById('game-screen');
const finalScreen = document.getElementById('final-screen');

const playerAvatarEl = document.getElementById('player-avatar');
const playerNicknameEl = document.getElementById('player-nickname');
const materiaTitle = document.getElementById('materia-title');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');

const feedbackModal = document.getElementById('feedback-modal');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMsg = document.getElementById('feedback-msg');
const closeFeedbackBtn = document.getElementById('close-feedback-btn');

const finalScoreEl = document.getElementById('final-score');
const rankingFinalEl = document.getElementById('ranking-final');

/* ===============================
   AVATARES
================================ */

const listaAvatares = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=16'
];

let playerProfileTemp = { avatar:null };

listaAvatares.forEach(url => {
  const img = document.createElement('img');
  img.src = url;
  img.onclick = () => {
    document.querySelectorAll('#avatar-grid img').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
    playerProfileTemp.avatar = url;
  };
  avatarGrid.appendChild(img);
});

/* ===============================
   PERFIL
================================ */

function checarPerfil() {
  if (!playerProfile) {
    modalPerfil.style.display = 'flex';
  } else {
    atualizarPerfilUI();
  }
}

saveProfileBtn.onclick = () => {
  const nick = nicknameInput.value.trim();
  const avatar = playerProfileTemp.avatar;

  if (!nick || !avatar) {
    alert('Digite nickname e selecione um avatar!');
    return;
  }

  playerProfile = { nickname:nick, avatar:avatar };
  localStorage.setItem('player-profile', JSON.stringify(playerProfile));
  location.reload();
};

function atualizarPerfilUI() {
  playerAvatarEl.src = playerProfile.avatar;
  playerNicknameEl.textContent = playerProfile.nickname;
}

/* ===============================
   NAVEGAÇÃO
================================ */

document.getElementById('start-btn').onclick = () => {
  if (!playerProfile) return;
  startScreen.classList.remove('active');
  catalogScreen.classList.add('active');
};

document.querySelectorAll('.catalog-btn').forEach(btn => {
  btn.onclick = () => {
    disciplinaSelecionada = btn.dataset.subject;
    indice = 0;
    scoreTotal = 0;
    catalogScreen.classList.remove('active');
    gameScreen.classList.add('active');
    carregarPergunta();
  };
});

/* ===============================
   JOGO
================================ */

function carregarPergunta() {
  const perguntas = bancoPorDisciplina[disciplinaSelecionada];

  if (indice >= perguntas.length) {
    salvarNoRanking();
    irParaFinal();
    return;
  }

  const atual = perguntas[indice];
  materiaTitle.textContent = atual.category;
  questionEl.textContent = atual.question;
  optionsEl.innerHTML = '';

  atual.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => responder(opt, atual.answer);
    optionsEl.appendChild(btn);
  });
}

function responder(resp, correta) {
  if (resp === correta) {
    scoreTotal += 10;
    feedbackTitle.textContent = '✅ Correto!';
    feedbackMsg.textContent = '+10 pontos 🎉';
  } else {
    feedbackTitle.textContent = '❌ Incorreto!';
    feedbackMsg.textContent = 'Resposta correta: ' + correta;
  }
  feedbackModal.style.display = 'flex';
}

closeFeedbackBtn.onclick = () => {
  feedbackModal.style.display = 'none';
  indice++;
  carregarPergunta();
};

/* ===============================
   FINAL E RANKING
================================ */

function salvarNoRanking() {
  rankingGlobal.push({
    name: playerProfile.nickname,
    avatar: playerProfile.avatar,
    score: scoreTotal
  });

  rankingGlobal = rankingGlobal.sort((a,b)=>b.score-a.score).slice(0,10);
  localStorage.setItem('ranking-global', JSON.stringify(rankingGlobal));
}

function irParaFinal() {
  gameScreen.classList.remove('active');
  finalScreen.classList.add('active');
  mostrarResultadoFinal();
}

function mostrarResultadoFinal() {
  finalScoreEl.textContent = `🎯 ${playerProfile.nickname}, você fez ${scoreTotal} pontos!`;

  rankingFinalEl.innerHTML = rankingGlobal
    .map(p => `<li><img src="${p.avatar}"/> ${p.name} — ${p.score} pts</li>`)
    .join('');
}

/* ===============================
   INIT
================================ */

checarPerfil();

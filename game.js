// Bancos de perguntas por disciplina
const bancoPorDisciplina = {
  espanhol: [
    { category: 'Verbos', question: '¿Cuál es un verbo?', options: ['Libro', 'Comer', 'Mesa', 'Rojo'], answer: 'Comer' },
    { category: 'Substantivos', question: '¿Cuál es un sustantivo?', options: ['Correr', 'Feliz', 'Casa', 'Vivir'], answer: 'Casa' },
    { category: 'Adjetivos', question: '¿Cuál es un adjetivo?', options: ['Escuela', 'Bonito', 'Beber', 'Perro'], answer: 'Bonito' },
    { category: 'Verbos', question: '¿Cuál de estos es un verbo irregular?', options: ['Hablar', 'Ser', 'Comer', 'Vivir'], answer: 'Ser' },
    { category: 'Gramática', question: '¿Qué artículo es correcto para *manzana*?', options: ['El', 'La', 'Los', 'Un'], answer: 'La' },
    { category: 'Vocabulário', question: '¿Cuál es la traducción correcta de *cachorro*?', options: ['Gato', 'Perro', 'Pájaro', 'Conejo'], answer: 'Perro' },
    { category: 'Antônimos', question: '¿Cuál es el opuesto de *alto*?', options: ['Bajo', 'Grande', 'Bonito', 'Rápido'], answer: 'Bajo' },
    { category: 'Conjugação', question: '¿Cómo se dice *eu vou* en español?', options: ['Yo fui', 'Yo voy', 'Tú vas', 'Yo iré'], answer: 'Yo voy' },
    { category: 'Compreensão', question: '¿Qué significa *despacio*?', options: ['Devagar', 'Rápido', 'Bonito', 'Fácil'], answer: 'Devagar' },
    { category: 'Plural', question: 'O plural de *el chico* é:', options: ['Los chicos', 'Las chicas', 'El chicos', 'Los chico'], answer: 'Los chicos' },
    { category: 'Gerúndio', question: 'O gerúndio de *leer* é:', options: ['Leído', 'Leyendo', 'Leo', 'Leí'], answer: 'Leyendo' },
    { category: 'Vocabulário', question: '¿Cómo se dice *amizade*?', options: ['Amistad', 'Amor', 'Familia', 'Trabajo'], answer: 'Amistad' },
    { category: 'Conjugação', question: 'Conjugación de *ir* para *nosotros*:', options: ['Vamos', 'Van', 'Voy', 'Vais'], answer: 'Vamos' }
  ],

  quimica: [
    { category:'Elementos', question:'Símbolo químico do Ouro é:', options:['Au','Ag','Fe','O'], answer:'Au' },
    { category:'Tabela Periódica', question:'O Oxigênio pertence à família dos:', options:['Metais alcalinos','Calcogênios','Gases nobres','Halogênios'], answer:'Calcogênios' },
    { category:'pH', question:'pH 7 é considerado:', options:['Ácido','Neutro','Básico','Salino'], answer:'Neutro' },
    { category:'Ligações', question:'NaCl é um exemplo de ligação:', options:['Covalente','Iônica','Metálica','Hidrogênio'], answer:'Iônica' },
    { category:'Reações', question:'Combustão é uma reação que envolve:', options:['Absorção de oxigênio','Liberação de oxigênio','Ausência de oxigênio','Troca de sais'], answer:'Absorção de oxigênio' },
    { category:'Estados da Matéria', question:'A água no estado sólido é chamada de:', options:['Vapor','Gelo','Líquido','Plasma'], answer:'Gelo' },
    { category:'Misturas', question:'Ar atmosférico é uma mistura:', options:['Homogênea','Heterogênea','Simples','Composta'], answer:'Homogênea' },
    { category:'Química Orgânica', question:'O principal elemento presente em compostos orgânicos é:', options:['Carbono','Ouro','Sódio','Cloro'], answer:'Carbono' }
  ],

  
};

// Ranking
let playerProfile = JSON.parse(localStorage.getItem('player-profile') || 'null');
let rankingGlobal = JSON.parse(localStorage.getItem('ranking-global') || '[]');
let disciplinaSelecionada = null;
let indice = 0;
let scoreTotal = 0;

// Elementos
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

// Renderizar avatares no modal
const listaAvatares = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=16'
];

let playerProfileTemp = { nickname:'', avatar:null };

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

// Checar perfil → mostrar modal ou catálogo
function checarPerfil() {
  if (!playerProfile) {
    modalPerfil.style.display = 'flex';
  } else {
    atualizarPerfilUI();
  }
}

// Salvar perfil → recarregar
saveProfileBtn.onclick = () => {
  const nick = nicknameInput.value.trim();
  const avatar = playerProfileTemp.avatar;

  if (!nick || !avatar) {
    alert('Digite nickname e selecione avatar!');
    return;
  }

  playerProfile = { nickname:nick, avatar:avatar };
  localStorage.setItem('player-profile', JSON.stringify(playerProfile));
  location.reload();
};

// Atualizar UI do perfil
function atualizarPerfilUI() {
  if (!playerProfile) return;
  playerAvatarEl.src = playerProfile.avatar;
  playerNicknameEl.textContent = playerProfile.nickname;
}

// Ir para catálogo ao clicar iniciar
document.getElementById('start-btn').onclick = () => {
  if (!playerProfile) return;
  startScreen.classList.remove('active');
  catalogScreen.classList.add('active');
};

// Escolher disciplina no catálogo
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

// Carregar perguntas
function carregarPergunta() {
  const perguntas = bancoPorDisciplina[disciplinaSelecionada];

  if (!perguntas) {
    alert('Disciplina sem questões!');
    return;
  }

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

// Responder
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

// Avançar
closeFeedbackBtn.onclick = () => {
  feedbackModal.style.display = 'none';
  indice++;
  carregarPergunta();
};

// Salvar ranking
function salvarNoRanking() {
  rankingGlobal.push({ name:playerProfile.nickname, avatar:playerProfile.avatar, score:scoreTotal });
  rankingGlobal = rankingGlobal.sort((a,b)=>b.score-a.score).slice(0,10);
  localStorage.setItem('ranking-global', JSON.stringify(rankingGlobal));
}

// Ir para final
function irParaFinal() {
  gameScreen.classList.remove('active');
  finalScreen.classList.add('active');
  mostrarResultadoFinal();
}

// Mostrar final
function mostrarResultadoFinal() {
  finalScoreEl.textContent = `🎯 ${playerProfile.nickname}, você fez ${scoreTotal} pontos!`;

  rankingFinalEl.innerHTML = rankingGlobal
    .map(p => `<li><img src="${p.avatar}" width="40"/> ${p.name} — ${p.score} pts</li>`)
    .join('');
}

// Init
checarPerfil();

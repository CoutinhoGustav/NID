/* ===============================
   TEXTOS POR DISCIPLINA (IDIOMA)
================================ */

const textosPorDisciplina = {
  espanhol: {
    correto: '✅ ¡Correcto!',
    incorreto: '❌ ¡Incorrecto!',
    respostaCorreta: 'Respuesta correcta: ',
    pontos: '+10 puntos 🎉',
    resultadoFinal: (nome, pontos) =>
      `🎯 ${nome}, ¡has obtenido ${pontos} puntos!`
  },
  default: {
    correto: '✅ Correto!',
    incorreto: '❌ Incorreto!',
    respostaCorreta: 'Resposta correta: ',
    pontos: '+10 pontos 🎉',
    resultadoFinal: (nome, pontos) =>
      `🎯 ${nome}, você fez ${pontos} pontos!`
  }
};

function getTextos() {
  return textosPorDisciplina[disciplinaSelecionada]
    || textosPorDisciplina.default;
}

/* ===============================
   BANCO DE QUESTÕES
================================ */
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
  biologia: [
    // Bioquímica
    {
      category: 'Bioquímica',
      question: 'As proteínas são macromoléculas formadas pela união de:',
      options: ['Nucleotídeos', 'Ácidos graxos', 'Aminoácidos', 'Monossacarídeos'],
      answer: 'Aminoácidos'
    },
    {
      category: 'Bioquímica',
      question: 'A principal função dos carboidratos nos seres vivos é:',
      options: ['Defesa', 'Reserva energética', 'Controle hormonal', 'Transporte de gases'],
      answer: 'Reserva energética'
    },
  
    // Citologia
    {
      category: 'Citologia',
      question: 'A organela responsável pela respiração celular é:',
      options: ['Lisossomo', 'Mitocôndria', 'Ribossomo', 'Retículo endoplasmático'],
      answer: 'Mitocôndria'
    },
    {
      category: 'Citologia',
      question: 'Células procariontes caracterizam-se pela ausência de:',
      options: ['Membrana plasmática', 'Ribossomos', 'Material genético', 'Carioteca'],
      answer: 'Carioteca'
    },
  
    // Metabolismo Energético
    {
      category: 'Metabolismo Energético',
      question: 'Durante a fotossíntese, a energia luminosa é transformada principalmente em:',
      options: ['Calor', 'Energia química', 'Energia mecânica', 'ATP animal'],
      answer: 'Energia química'
    },
    {
      category: 'Metabolismo Energético',
      question: 'A fermentação ocorre em ambientes com:',
      options: ['Alto teor de oxigênio', 'Ausência de oxigênio', 'Excesso de luz', 'Baixa temperatura'],
      answer: 'Ausência de oxigênio'
    },
  
    // Ecologia (interpretação de situação-problema)
    {
      category: 'Ecologia',
      question: 'Em uma cadeia alimentar, os produtores são organismos que:',
      options: [
        'Se alimentam de outros seres vivos',
        'Produzem seu próprio alimento',
        'Decompõem matéria orgânica',
        'São exclusivamente animais'
      ],
      answer: 'Produzem seu próprio alimento'
    },
    {
      category: 'Ecologia',
      question: 'O aumento excessivo de algas em rios, causado por poluição, é chamado de:',
      options: ['Biomagnificação', 'Eutrofização', 'Sucessão ecológica', 'Mutualismo'],
      answer: 'Eutrofização'
    },
  
    // Origem da Vida
    {
      category: 'Origem da Vida',
      question: 'A hipótese de Oparin-Haldane defende que a vida surgiu a partir de:',
      options: [
        'Criação divina imediata',
        'Seres extraterrestres',
        'Reações químicas na atmosfera primitiva',
        'Organismos multicelulares'
      ],
      answer: 'Reações químicas na atmosfera primitiva'
    },
  
    // Taxonomia
    {
      category: 'Taxonomia',
      question: 'A espécie é definida como:',
      options: [
        'Organismos semelhantes que não se reproduzem',
        'Indivíduos capazes de gerar descendentes férteis',
        'Todos os seres de um mesmo reino',
        'Organismos com o mesmo habitat'
      ],
      answer: 'Indivíduos capazes de gerar descendentes férteis'
    },
  
    // Microbiologia e Vírus
    {
      category: 'Microbiologia',
      question: 'As bactérias pertencem ao grupo dos seres:',
      options: ['Eucariontes', 'Pluricelulares', 'Procariontes', 'Acelulares'],
      answer: 'Procariontes'
    },
    {
      category: 'Vírus',
      question: 'Os vírus são considerados seres acelulares porque:',
      options: [
        'Não possuem metabolismo próprio',
        'Não causam doenças',
        'Vivem apenas na água',
        'São bactérias modificadas'
      ],
      answer: 'Não possuem metabolismo próprio'
    },
  
    // Botânica
    {
      category: 'Botânica',
      question: 'As plantas realizam fotossíntese principalmente nas:',
      options: ['Raízes', 'Flores', 'Folhas', 'Sementes'],
      answer: 'Folhas'
    },
  
    // Zoologia
    {
      category: 'Zoologia',
      question: 'Os vertebrados são animais que possuem:',
      options: ['Exoesqueleto', 'Concha calcária', 'Coluna vertebral', 'Corpo segmentado'],
      answer: 'Coluna vertebral'
    },
  
    // Fisiologia Humana e Animal (interpretação)
    {
      category: 'Fisiologia',
      question: 'O sistema responsável pelo transporte de oxigênio no corpo humano é:',
      options: ['Digestório', 'Respiratório', 'Circulatório', 'Excretor'],
      answer: 'Circulatório'
    },
    {
      category: 'Fisiologia',
      question: 'O órgão responsável pela filtração do sangue é:',
      options: ['Pulmão', 'Coração', 'Fígado', 'Rim'],
      answer: 'Rim'
    }
  ]
  
};

/* ===============================
   VARIÁVEIS
================================ */

let playerProfile = JSON.parse(localStorage.getItem('player-profile') || 'null');
let rankingGlobal = JSON.parse(localStorage.getItem('ranking-global') || '[]');
let disciplinaSelecionada = null;
let indice = 0;
let scoreTotal = 0;

/* ===============================
   ELEMENTOS
================================ */

const startScreen   = document.getElementById('start-screen');
const catalogScreen = document.getElementById('catalog-screen');
const gameScreen    = document.getElementById('game-screen');
const finalScreen   = document.getElementById('final-screen');

const playerAvatarEl   = document.getElementById('player-avatar');
const playerNicknameEl = document.getElementById('player-nickname');

const materiaTitle = document.getElementById('materia-title');
const questionEl   = document.getElementById('question');
const optionsEl    = document.getElementById('options');

const modalPerfil  = document.getElementById('profile-modal');
const avatarGrid   = document.getElementById('avatar-grid');
const nicknameInput = document.getElementById('nickname-input');
const saveProfileBtn = document.getElementById('save-profile-btn');

const feedbackModal = document.getElementById('feedback-modal');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMsg   = document.getElementById('feedback-msg');
const closeFeedbackBtn = document.getElementById('close-feedback-btn');

const finalScoreEl = document.getElementById('final-score');
const rankingFinalEl = document.getElementById('ranking-final');

const backBtn = document.getElementById('back-btn');

/* ===============================
   NAVEGAÇÃO DE TELAS
================================ */

function mostrarTela(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  atualizarBotaoVoltar(id);
}

function atualizarBotaoVoltar(tela) {
  backBtn.style.display = (tela === 'start-screen') ? 'none' : 'flex';
}

backBtn.onclick = () => {
  if (gameScreen.classList.contains('active') ||
      finalScreen.classList.contains('active')) {
    mostrarTela('catalog-screen');
  } else if (catalogScreen.classList.contains('active')) {
    mostrarTela('start-screen');
  }
};

/* ===============================
   PERFIL
================================ */

const avatares = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=16',
  'https://i.pravatar.cc/150?img=17',
  'https://i.pravatar.cc/150?img=18',
  'https://i.pravatar.cc/150?img=47',
  'https://i.pravatar.cc/150?img=48',
  'https://i.pravatar.cc/150?img=49',
  'https://i.pravatar.cc/150?img=50',
  'https://i.pravatar.cc/150?img=51'
];

let avatarTemp = null;

avatares.forEach(url => {
  const img = document.createElement('img');
  img.src = url;
  img.onclick = () => {
    document.querySelectorAll('#avatar-grid img')
      .forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
    avatarTemp = url;
  };
  avatarGrid.appendChild(img);
});

function checarPerfil() {
  if (!playerProfile) {
    modalPerfil.style.display = 'flex';
  } else {
    atualizarPerfil();
  }
}

saveProfileBtn.onclick = () => {
  if (!nicknameInput.value || !avatarTemp) return;
  playerProfile = { nickname: nicknameInput.value, avatar: avatarTemp };
  localStorage.setItem('player-profile', JSON.stringify(playerProfile));
  location.reload();
};

function atualizarPerfil() {
  playerAvatarEl.src = playerProfile.avatar;
  playerNicknameEl.textContent = playerProfile.nickname;
}

/* ===============================
   FLUXO DO JOGO
================================ */

document.getElementById('start-btn').onclick = () => {
  if (!playerProfile) return;
  mostrarTela('catalog-screen');
};

document.querySelectorAll('.catalog-btn').forEach(btn => {
  btn.onclick = () => {
    disciplinaSelecionada = btn.dataset.subject;
    indice = 0;
    scoreTotal = 0;
    mostrarTela('game-screen');
    carregarPergunta();
  };
});

function carregarPergunta() {
  const perguntas = bancoPorDisciplina[disciplinaSelecionada];
  if (indice >= perguntas.length) {
    salvarRanking();
    mostrarTela('final-screen');
    mostrarFinal();
    return;
  }

  const q = perguntas[indice];
  materiaTitle.textContent = q.category;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => responder(opt, q.answer);
    optionsEl.appendChild(btn);
  });
}

function responder(resp, correta) {
  const t = getTextos();
  if (resp === correta) {
    scoreTotal += 10;
    feedbackTitle.textContent = t.correto;
    feedbackMsg.textContent = t.pontos;
  } else {
    feedbackTitle.textContent = t.incorreto;
    feedbackMsg.textContent = t.respostaCorreta + correta;
  }
  feedbackModal.style.display = 'flex';
}

closeFeedbackBtn.onclick = () => {
  feedbackModal.style.display = 'none';
  indice++;
  carregarPergunta();
};

/* ===============================
   FINAL
================================ */

function salvarRanking() {
  rankingGlobal.push({
    name: playerProfile.nickname,
    avatar: playerProfile.avatar,
    score: scoreTotal
  });
  rankingGlobal = rankingGlobal.sort((a,b)=>b.score-a.score).slice(0,10);
  localStorage.setItem('ranking-global', JSON.stringify(rankingGlobal));
}

function mostrarFinal() {
  const t = getTextos();
  finalScoreEl.textContent = t.resultadoFinal(
    playerProfile.nickname,
    scoreTotal
  );
  rankingFinalEl.innerHTML = rankingGlobal
    .map(p => `<li><img src="${p.avatar}"/> ${p.name} — ${p.score} pts</li>`)
    .join('');
}

/* ===============================
   INIT
================================ */

checarPerfil();
atualizarBotaoVoltar('start-screen');

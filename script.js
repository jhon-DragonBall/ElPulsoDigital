// ── MENÚ HAMBURGUESA ──
var menu    = document.querySelector('.hamburger');
var menuppal = document.querySelector('.menuppal');
var menuClose = document.querySelector('.menu-close');

// Crear overlay dinámicamente
var overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

function abrirMenu() {
  menu.classList.add('is-active');
  menuppal.classList.add('is_active');
  overlay.classList.add('is_active');
  document.body.style.overflow = 'hidden';
}

function cerrarMenu() {
  menu.classList.remove('is-active');
  menuppal.classList.remove('is_active');
  overlay.classList.remove('is_active');
  document.body.style.overflow = '';
}

function toggleMenu(event) {
  event.preventDefault();
  if (menuppal.classList.contains('is_active')) {
    cerrarMenu();
  } else {
    abrirMenu();
  }
}

menu.addEventListener('click', toggleMenu, false);
menuClose.addEventListener('click', cerrarMenu, false);
overlay.addEventListener('click', cerrarMenu, false);

// Cerrar menú y navegar suavemente al hacer click en un link
menuppal.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var targetId = this.getAttribute('href').slice(1);
    var target = document.getElementById(targetId);
    cerrarMenu();
    if (target) {
      setTimeout(function() {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  });
});

//Solución con jQUery
/*$(document).ready(function(){
	$('.hamburger').click(function() {
		$('.hamburger').toggleClass('is-active');
		$('.menuresponsive').toggleClass('is-active');
		return false;
	});
});*/


// ── BANCO DE PREGUNTAS ──
const preguntas = [
  {
    texto: "¿Cuál es el lenguaje que se usa para ESTRUCTURAR el contenido de una página web?",
    opciones: ["CSS", "HTML", "JavaScript", "Python"],
    correcta: 1
  },
  {
    texto: "¿Qué propiedad de CSS permite que un sitio se adapte a diferentes dispositivos (responsivo)?",
    opciones: ["flexbox", "media queries", "border-radius", "z-index"],
    correcta: 1
  },
  {
    texto: "¿Cuántas etiquetas tiene este código: <p>Hola</p>?",
    opciones: ["Solo 1", "2 en total (apertura y cierre)", "3", "0"],
    correcta: 1
  },
  {
    texto: "¿Qué sistema de diseño CSS permite organizar elementos en filas y columnas?",
    opciones: ["Flexbox", "Display block", "CSS Grid", "Float"],
    correcta: 2
  }
];

// ── VARIABLES DE ESTADO ──
let actual    = 0;
let puntaje   = 0;
let respondida = false;

// ── REFERENCIAS AL DOM ──
const textoPregunta     = document.getElementById('texto-pregunta');
const opcionesContainer = document.getElementById('opciones-container');
const resultado         = document.getElementById('resultado');
const btnSiguiente      = document.getElementById('btn-siguiente');
const quizContainer     = document.getElementById('quiz-container');
const scoreFinal        = document.getElementById('score-final');
const puntosFin         = document.getElementById('puntos-finales');

// ── CARGAR UNA PREGUNTA ──
function cargarPregunta() {
  respondida = false;
  resultado.textContent = '';
  btnSiguiente.style.display = 'none';

  const p = preguntas[actual];
  textoPregunta.textContent = `Pregunta ${actual + 1} de ${preguntas.length}: ${p.texto}`;

  // Limpiar opciones anteriores
  opcionesContainer.innerHTML = '';

  // Crear un botón por cada opción
  p.opciones.forEach(function(opcionTexto, indice) {
    const btn = document.createElement('button');
    btn.className = 'opcion';
    btn.textContent = opcionTexto;
    btn.addEventListener('click', function() {
      responder(indice, btn);
    });
    opcionesContainer.appendChild(btn);
  });
}

// ── EVALUAR RESPUESTA ──
function responder(indiceElegido, btnElegido) {
  // Evitar que el usuario responda dos veces
  if (respondida) return;
  respondida = true;

  const correcta = preguntas[actual].correcta;
  const todosLosBotones = document.querySelectorAll('.opcion');

  // Marcar la opción correcta siempre en verde
  todosLosBotones.forEach(function(btn, i) {
    if (i === correcta) {
      btn.classList.add('correcta');
    }
  });

  // Evaluar si el usuario acertó
  if (indiceElegido === correcta) {
    puntaje++;
    resultado.textContent = '✅ ¡Correcto! Muy bien.';
  } else {
    btnElegido.classList.add('incorrecta');
    resultado.textContent = '❌ Incorrecto. La respuesta correcta está en verde.';
  }

  // Mostrar botón siguiente o terminar quiz
  if (actual < preguntas.length - 1) {
    btnSiguiente.style.display = 'inline-block';
  } else {
    setTimeout(mostrarResultadoFinal, 1200);
  }
}

// ── SIGUIENTE PREGUNTA ──
btnSiguiente.addEventListener('click', function() {
  actual++;
  cargarPregunta();
});

// ── MOSTRAR RESULTADO FINAL ──
function mostrarResultadoFinal() {
  quizContainer.style.display = 'none';
  scoreFinal.style.display = 'block';
  puntosFin.textContent = puntaje;
}

// ── REINICIAR QUIZ ──
function reiniciarQuiz() {
  actual     = 0;
  puntaje    = 0;
  respondida = false;

  quizContainer.style.display = 'block';
  scoreFinal.style.display    = 'none';

  cargarPregunta();
}

// ── INICIAR AL CARGAR LA PÁGINA ──
cargarPregunta();

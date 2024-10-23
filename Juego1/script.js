// Obtener el elemento canvas y su contexto 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamaño de la cuadrícula y número de tiles en x e y
const gridSize = 20;
const tileCountX = Math.floor(canvas.width / gridSize);
const tileCountY = Math.floor(canvas.height / gridSize);

// Inicializar la serpiente en el centro del canvas
let snake = [
    { x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) },
];

// Inicializar la comida en una posición fija
let food = { x: 15, y: 15 };

// Dirección inicial de la serpiente
let dx = 0;
let dy = 0;

// Puntuación inicial
let score = 0;

// Bandera para indicar si el juego ha terminado
let gameOver = false;

/**
 * Función principal del juego que se llama recursivamente.
 * Limpia el canvas, mueve la serpiente, verifica colisiones,
 * dibuja la serpiente y la comida, y actualiza la puntuación.
 */
function drawGame() {
    clearCanvas();
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();
    drawScore();

    // Si el juego ha terminado, dibuja la pantalla de juego sobre
    if (gameOver) {
        drawGameOver();
    } else {
        // Llamar esta función nuevamente después de 100 ms
        setTimeout(drawGame, 100);
    }
}

/**
 * Limpia el canvas dibujando un rectángulo negro.
 */
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Mueve la serpiente en la dirección actual.
 * Si la serpiente come la comida, aumenta la puntuación y coloca
 * una nueva comida en una posición aleatoria.
 */
function moveSnake() {
    if (dx === 0 && dy === 0) return; // No mover si no hay dirección

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

/**
 * Verifica si la serpiente ha chocado con las paredes o consigo misma.
 */
function checkCollision() {
    const head = snake[0];

    // Colisión con las paredes
    if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
        gameOver = true;
    }

    // Colisión con sí misma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            break;
        }
    }
}

/**
 * Dibuja la serpiente en el canvas.
 */
function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

/**
 * Dibuja la comida en el canvas.
 */
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

/**
 * Dibuja la puntuación en el canvas.
 */
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Puntuación: ' + score, 10, 30);
}

/**
 * Dibuja la pantalla de juego sobre.
 */
function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = '50px Arial';
    ctx.fillText('¡Juego Terminado!', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '30px Arial';
    ctx.fillText('Puntuación: ' + score, canvas.width / 2, canvas.height / 2 + 30);
}

/**
 * Coloca una nueva comida en una posición aleatoria.
 */
function placeFood() {
    food.x = Math.floor(Math.random() * tileCountX);
    food.y = Math.floor(Math.random() * tileCountY);
}

// Agregar evento de teclado para cambiar la dirección de la serpiente
document.addEventListener('keydown', changeDirection);

/**
 * Cambia la dirección de la serpiente según la tecla presionada.
 * 
 * @param {Event} event - Evento de teclado.
 */
function changeDirection(event) {
    // Constantes para las teclas de dirección
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    // Obtener la tecla presionada
    const keyPressed = event.keyCode;

    // Verificar la dirección actual de la serpiente
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    // Cambiar la dirección según la tecla presionada
    if (keyPressed === LEFT_KEY && !goingRight) {
        // Ir hacia la izquierda
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        // Ir hacia arriba
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        // Ir hacia la derecha
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        // Ir hacia abajo
        dx = 0;
        dy = 1;
    }
}

/**
 * Inicia un nuevo juego.
 */
function startGame() {
    // Reiniciar la serpiente en el centro del canvas
    snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];

    // Reiniciar la dirección de la serpiente
    dx = 0;
    dy = 0;

    // Reiniciar la puntuación
    score = 0;

    // Reiniciar el estado del juego
    gameOver = false;

    // Colocar una nueva comida
    placeFood();

    // Iniciar el bucle de juego
    drawGame();
}

// Iniciar el juego
startGame();
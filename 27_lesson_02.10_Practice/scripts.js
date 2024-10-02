$(document).ready(function () {
    const shapes = [
        'circle', 'square', 'star', 'triangle', 'heart',
        'circle', 'square', 'star', 'triangle', 'heart'
    ];
    
    let shuffledShapes = [];
    let firstCard = null;
    let secondCard = null;
    let matchedPairs = 0;
    let gameInProgress = false;

    // Перемешиваем карточки
    function shuffle(array) {
        return array.sort(() => 0.5 - Math.random());
    }

    // Генерация доски игры
    function generateBoard() {
        shuffledShapes = shuffle(shapes);
        $('#game-board').empty();
        shuffledShapes.forEach((shape, index) => {
            $('#game-board').append(`
                <div class="card hidden" data-shape="${shape}" id="card-${index}">
                    <img src="images/${shape}.png" alt="${shape}">
                </div>
            `);
        });
    }

    // Обработка кликов по карточкам
    function cardClickHandler() {
        if (!gameInProgress || $(this).hasClass('matched')) return;

        if (!firstCard) {
            firstCard = $(this);
            firstCard.removeClass('hidden');
        } else if (!secondCard && firstCard[0] !== this) {
            secondCard = $(this);
            secondCard.removeClass('hidden');

            checkMatch();
        }
    }

    // Проверка на совпадение
    function checkMatch() {
        if (firstCard.data('shape') === secondCard.data('shape')) {
            firstCard.addClass('matched');
            secondCard.addClass('matched');
            matchedPairs++;

            if (matchedPairs === shapes.length / 2) {
                $('#message').text('Yeeceees! You win!').removeClass('hidden');
                $('#start-btn').text('START');
                gameInProgress = false;
            }

            resetSelection();
        } else {
            setTimeout(() => {
                firstCard.addClass('hidden');
                secondCard.addClass('hidden');
                resetSelection();
            }, 1000);
        }
    }

    // Сброс текущих выбранных карточек
    function resetSelection() {
        firstCard = null;
        secondCard = null;
    }

    // Старт игры
    function startGame() {
        generateBoard();
        matchedPairs = 0;
        gameInProgress = true;
        $('#message').addClass('hidden');
        $('#start-btn').text('FINISH');
    }

    // Прекращение игры
    function finishGame() {
        $('.card').removeClass('hidden');
        gameInProgress = false;
        $('#start-btn').text('START');
    }

    // Обработка кнопки START/FINISH
    $('#start-btn').click(function () {
        if ($(this).text() === 'START') {
            startGame();
        } else {
            finishGame();
        }
    });

    // Обработка кликов по карточкам
    $(document).on('click', '.card', cardClickHandler);
});

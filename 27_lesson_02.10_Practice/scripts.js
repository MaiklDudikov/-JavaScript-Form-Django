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

    // Перемешивание карточек
    function shuffle(array) {
        return array.sort(() => 0.5 - Math.random());
    }

    // Генерация доски игры
    function generateBoard() {
        shuffledShapes = shuffle(shapes);
        $('#game-board').empty();
        shuffledShapes.forEach((shape, index) => {
            $('#game-board').append(`
                <div class="card" data-shape="${shape}" id="card-${index}">
                    <img src="images/${shape}.png" alt="${shape}">
                    <div class="card-back"></div>
                </div>
            `);
        });
    }

    // Переворот карточки при клике
    function flipCard(card) {
        card.find('.card-back').hide(); // Прячем рубашку
        card.find('img').show(); // Показываем картинку
    }

    // Закрытие карточки (поворот рубашкой)
    function hideCard(card) {
        card.find('.card-back').show(); // Показываем рубашку
        card.find('img').hide(); // Прячем картинку
    }

    // Обработка кликов по карточкам
    function cardClickHandler() {
        if (!gameInProgress || $(this).hasClass('matched') || $(this).find('img').is(':visible')) return;

        if (!firstCard) {
            firstCard = $(this);
            flipCard(firstCard);
        } else if (!secondCard && firstCard[0] !== this) {
            secondCard = $(this);
            flipCard(secondCard);

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
                hideCard(firstCard);
                hideCard(secondCard);
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
        $('.card img').hide(); // Скрываем все картинки
        $('.card-back').show(); // Показываем рубашку на всех карточках
    }

    // Прекращение игры
    function finishGame() {
        $('.card img').show(); // Показываем все картинки
        $('.card-back').hide(); // Прячем все рубашки
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

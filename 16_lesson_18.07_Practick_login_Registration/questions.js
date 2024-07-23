document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const questionText = document.getElementById('question').value;
    const correctAnswer = document.getElementById('correct').value;
    const wrongAnswer = document.getElementById('wrong').value;

    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    questionItem.innerHTML = `<p><strong>Question:</strong> ${questionText}</p>
                              <p><strong>Correct answer:</strong> ${correctAnswer}</p>
                              <p><strong>Wrong answer:</strong> ${wrongAnswer}</p>
                              <hr>`;

    document.getElementById('questionsList').appendChild(questionItem);

    document.getElementById('question').value = '';
    document.getElementById('correct').value = '';
    document.getElementById('wrong').value = '';
});

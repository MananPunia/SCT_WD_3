const questions = [
  {
    type: 'single',
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    answer: 'Paris'
  },
  {
    type: 'multi',
    question: 'Select all prime numbers:',
    options: ['2', '3', '4', '5'],
    answer: ['2', '3', '5']
  },
  {
    type: 'fill',
    question: 'Fill in the blank: The sun rises in the ____.',
    answer: 'east'
  }
];

const quizBox = document.getElementById('quiz-box');
const submitBtn = document.getElementById('submit-btn');
const scoreBox = document.getElementById('score-box');

function loadQuiz() {
  quizBox.innerHTML = '';
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('question');

    let html = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>`;

    if (q.type === 'single') {
      q.options.forEach(opt => {
        html += `
          <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>
        `;
      });
    }

    if (q.type === 'multi') {
      q.options.forEach(opt => {
        html += `
          <label><input type="checkbox" name="q${index}" value="${opt}"> ${opt}</label>
        `;
      });
    }

    if (q.type === 'fill') {
      html += `<input type="text" name="q${index}" placeholder="Your answer here" />`;
    }

    div.innerHTML = html;
    quizBox.appendChild(div);
  });
}

function checkAnswers() {
  let score = 0;

  questions.forEach((q, index) => {
    const name = `q${index}`;
    const elements = document.getElementsByName(name);

    if (q.type === 'single') {
      elements.forEach(el => {
        if (el.checked && el.value === q.answer) {
          score++;
        }
      });
    }

    if (q.type === 'multi') {
      const selected = [];
      elements.forEach(el => {
        if (el.checked) selected.push(el.value);
      });
      if (arraysEqual(selected.sort(), q.answer.sort())) {
        score++;
      }
    }

    if (q.type === 'fill') {
      const userInput = elements[0].value.trim().toLowerCase();
      if (userInput === q.answer.toLowerCase()) {
        score++;
      }
    }
  });

  scoreBox.innerHTML = `🎉 You scored ${score} out of ${questions.length}!`;
}

function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

submitBtn.addEventListener('click', checkAnswers);
loadQuiz();

document.getElementById('questionForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // prevent full-page reload
  const question = document.getElementById('questionInput').value.trim();

  if (!question) return;

  const response = await fetch('/add_question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });

  if (response.ok) {
    document.getElementById('questionInput').value = '';
    loadQuestions(); // refresh the list
  } else {
    console.error('Failed to add question');
  }
});

async function loadQuestions() {
  const response = await fetch('/get_questions');
  const data = await response.json();

  const questionList = document.getElementById('questionList');
  questionList.innerHTML = '';
  data.questions.forEach(q => {
    const li = document.createElement('li');
    li.textContent = q.question + (q.answered ? ' ✅' : ' ❌');
    questionList.appendChild(li);
  });
}

// Initial load
loadQuestions();

// Poll every 3 seconds
setInterval(loadQuestions, 30);

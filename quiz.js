const partsOfSpeech = {
    "死んだ、亡くなった": "gone",
"どこへ〜しようとも": "wherever",
"生涯、一生": "lifetime",
"固守する": "hold to",
"手放す": "let go",
"距離": "distance",
"ささやく": "whisper",
"盲目の": "blind",
"隠す": "hide",
"意味する": "mean",
"空っぽの、無人の": "empty",
"誠実な": "sincere",
"疎遠になる": "drift apart",
"景色、光景": "sight",
"はしご": "ladder",
"尻尾": "tail",
"迷信を信じる、縁起を担ぐ": "superstitions",
"震え、身震い": "shiver",
"むしろ〜したい": "would rather",
"恐れる": "fear",
"続く、持ちこたえる":"last",





};

let mistakes = [];
let currentPartOfSpeech = '';
let currentCategory = '';
let correctAnswers = 0;
let totalQuestions = 0;
let askedQuestions = [];

function getRandomPartOfSpeech() {
    const categories = Object.keys(partsOfSpeech).filter(category => !askedQuestions.includes(category));
    const category = categories[Math.floor(Math.random() * categories.length)];
    const partOfSpeech = partsOfSpeech[category];
    return { category, partOfSpeech };
}

function startQuiz() {
    if (totalQuestions < 21) {
        const { category, partOfSpeech } = getRandomPartOfSpeech();
        currentPartOfSpeech = partOfSpeech;
        currentCategory = category;
        askedQuestions.push(category);
        document.getElementById('part-of-speech-display').innerText = `品詞: '${category}'`;
        totalQuestions++;
    } else {
        showFinalResults();
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('category-input').value.toLowerCase().trim();
    if (userAnswer !== currentPartOfSpeech) {
        alert(`Wrong! The correct answer is '${currentPartOfSpeech}'.`);
        mistakes.push({ category: currentCategory, partOfSpeech: currentPartOfSpeech });
    } else {
        alert('Correct!');
        correctAnswers++;
    }
    document.getElementById('category-input').value = '';
    startQuiz();
}

function retryMistakes() {
    if (mistakes.length === 0) {
        alert("No mistakes to retry.");
        return;
    }
    const { category, partOfSpeech } = mistakes.shift();
    currentPartOfSpeech = partOfSpeech;
    currentCategory = category;
    document.getElementById('part-of-speech-display').innerText = `Retry: 品詞: '${category}'`;
}

function showFinalResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('final-result-container').classList.remove('hidden');
    document.getElementById('show-results-button').classList.add('hidden');

    const resultList = document.getElementById('final-result-list');
    resultList.innerHTML = `<li>Correct Answers: ${correctAnswers}</li><li>Total Questions: ${totalQuestions}</li>`;

    if (mistakes.length > 0) {
        const mistakesList = document.createElement('ul');
        mistakesList.innerHTML = "<li>Mistakes:</li>";
        mistakes.forEach(mistake => {
            const listItem = document.createElement('li');
            listItem.innerText = `${mistake.category} (${mistake.partOfSpeech})`;
            mistakesList.appendChild(listItem);
        });
        resultList.appendChild(mistakesList);
    }
}

window.onload = function() {
    startQuiz();
};

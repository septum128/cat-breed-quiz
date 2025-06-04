// 猫の品種データ
const catBreeds = [
    {
        id: 1,
        name: "アメリカンショートヘア",
        image: "images/american-shorthair.jpg"
    },
    {
        id: 2,
        name: "スコティッシュフォールド",
        image: "images/scottish-fold.jpg"
    },
    {
        id: 3,
        name: "メインクーン",
        image: "images/maine-coon.jpg"
    },
    {
        id: 4,
        name: "ラグドール",
        image: "images/ragdoll.jpg"
    },
    {
        id: 5,
        name: "ロシアンブルー",
        image: "images/russian-blue.jpg"
    },
    {
        id: 6,
        name: "ベンガル",
        image: "images/bengal.jpg"
    },
    {
        id: 7,
        name: "シャム",
        image: "images/siamese.jpg"
    },
    {
        id: 8,
        name: "ペルシャ",
        image: "images/persian.jpg"
    },
    {
        id: 9,
        name: "ノルウェージャンフォレストキャット",
        image: "images/norwegian-forest.jpg"
    },
    {
        id: 10,
        name: "マンチカン",
        image: "images/munchkin.jpg"
    }
];

// DOM要素
const catImage = document.getElementById('cat-image');
const question = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const options = document.querySelectorAll('.option');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score');
const questionNumberElement = document.getElementById('question-number');
const maxQuestionsElement = document.getElementById('max-questions');

// ゲーム変数
let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let acceptingAnswers = false;

// 定数
const MAX_QUESTIONS = 10;
const CORRECT_BONUS = 1;

// ゲーム開始
function startGame() {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...catBreeds];
    scoreElement.textContent = score;
    questionNumberElement.textContent = questionCounter;
    maxQuestionsElement.textContent = MAX_QUESTIONS;
    nextButton.disabled = true;
    nextButton.style.display = 'block';
    restartButton.style.display = 'none';
    
    getNewQuestion();
}

// 新しい問題を取得
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // ゲーム終了
        nextButton.style.display = 'none';
        restartButton.style.display = 'block';
        alert(`クイズ終了！あなたのスコアは ${score}/${MAX_QUESTIONS} です！`);
        return;
    }

    questionCounter++;
    questionNumberElement.textContent = questionCounter;
    
    // ランダムに猫を選択
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    
    // 画像を表示
    catImage.src = currentQuestion.image;
    catImage.alt = `猫の画像 #${questionCounter}`;
    
    // 選択肢を作成（正解と3つのダミー）
    const correctAnswer = currentQuestion.name;
    
    // 選択肢用の猫品種を取得（正解を除く）
    const otherBreeds = catBreeds.filter(breed => breed.id !== currentQuestion.id);
    
    // ランダムに3つの不正解を選ぶ
    const shuffledBreeds = otherBreeds.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // 全ての選択肢（正解 + 不正解3つ）
    const allOptions = [correctAnswer, ...shuffledBreeds.map(breed => breed.name)];
    
    // 選択肢をシャッフル
    const shuffledOptions = allOptions.sort(() => 0.5 - Math.random());
    
    // 選択肢をボタンに設定
    options.forEach((option, index) => {
        option.textContent = shuffledOptions[index];
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
    });
    
    // 現在の問題を利用可能な問題から削除
    availableQuestions.splice(questionIndex, 1);
    
    acceptingAnswers = true;
    nextButton.disabled = true;
}

// 選択肢クリックイベント
options.forEach(option => {
    option.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.textContent;
        
        // 正解かどうかチェック
        const isCorrect = selectedAnswer === currentQuestion.name;
        
        if (isCorrect) {
            selectedOption.classList.add('correct');
            score += CORRECT_BONUS;
            scoreElement.textContent = score;
        } else {
            selectedOption.classList.add('incorrect');
            
            // 正解を表示
            options.forEach(option => {
                if (option.textContent === currentQuestion.name) {
                    option.classList.add('correct');
                }
            });
        }
        
        // 全ての選択肢を無効化
        options.forEach(option => {
            option.disabled = true;
        });
        
        // 次の問題ボタンを有効化
        nextButton.disabled = false;
    });
});

// 次の問題ボタンクリックイベント
nextButton.addEventListener('click', () => {
    getNewQuestion();
});

// 再挑戦ボタンクリックイベント
restartButton.addEventListener('click', () => {
    startGame();
});

// ゲーム開始
startGame();

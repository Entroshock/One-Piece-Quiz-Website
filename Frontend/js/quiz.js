// Initialize counters for each Straw Hat character
let counters = {
    luffy: 0,
    zoro: 0,
    sanji: 0,
    nami: 0,
    usopp: 0,
    chopper: 0,
    robin: 0,
    franky: 0,
    brook: 0,
    jimbei: 0
};

const questions = [
    "What is your favorite hobby?",
    "Pick a vacation destination:",
    "Which element resonates with you the most?",
    "Your friends describe you as:",
    "What's your preferred fighting style?",
    "Choose a superpower:",
    "What's your preferred mode of transportation?",
    "Your ideal pet would be:",
    "Which weather do you prefer?",
    "What's your preferred accessory?",
    "If you had a special skill, what would it be?"
];

const answers = [
    ["Playing video games", "Training or exercising", "Building or fixing things", "Reading or storytelling", "Caring for animals", "Traveling or exploring", "Studying history or culture", "Cooking or enjoying food", "Meditating or practicing martial arts", "Performing or playing music"],
    ["Tropical island with adventures", "Quiet mountains or forests", "Busy city with technology", "Remote countryside", "Wildlife reserve or sanctuary", "Exotic beaches or coastal towns", "Ancient ruins or historical landmarks", "Gourmet food capitals", "Tranquil temple or dojo", "Musical festivals or concerts"],
    ["Fire", "Wind", "Steel", "Earth", "Nature", "Water", "Knowledge", "Love", "Sea", "Sound"],
    ["Energetic and carefree", "Determined and focused", "Bold and outgoing", "Imaginative and creative", "Compassionate and kind", "Clever and resourceful", "Mysterious and insightful", "Charismatic and suave", "Wise and serene", "Cheerful and entertaining"],
    ["Unconventional and unpredictable", "Powerful and disciplined", "Strong and robust", "Tactical and strategic", "Adaptive and versatile", "Agile and quick-witted", "Precise and calculated", "Graceful and stylish", "Balanced and focused", "Elegant and rhythmic"],
    ["Elasticity or rubber abilities", "Master swordsman skills", "Cyborg enhancements", "Incredible marksmanship", "Transforming into animals", "Navigational and weather control skills", "Profound knowledge and intellect", "Superb kicking skills", "Fish-man karate or fish-man abilities", "Soul-based powers"],
    ["Running or sprinting", "Walking or hiking", "Riding a motorcycle or bike", "crawling", "Riding on an animal or creature", "Sailing or navigating with maps", "Flying", "train", "Swimming or diving", "astral projecting"],
    ["Monkey", "Tiger", "Dog", "Bird", "Reindeer", "Cat", "Snake", "Fish", "Shark", "whale"],
    ["Sunny and bright", "Foggy or misty", "Windy and breezy", "Rainy or stormy", "Snowy or icy", "Cloudy with a chance of adventure", "Serene and clear", "Aromatic and flavorful", "Underwater or marine", "Starry or moonlit"],
    ["Straw hat or cap", "Bandana or headband", "Sunglasses or goggles", "Sling or bag", "Hat or earmuffs", "Necklace or jewelry", "Scarf or shawl", "Suit or tie", "Kimono or traditional wear", "Top hat or cane"],
    ["Inspiring others with enthusiasm", "Mastering your craft with dedication", "Building or inventing extraordinary things", "Telling captivating stories or lies", "Understanding and caring for animals", "Navigating through life's uncertainties", "Unraveling historical mysteries or truths", "Cooking the most delectable dishes", "Maintaining inner peace and harmony", "Entertaining and making people smile"]
];

let currentQuestionIndex = 0;

const questionContainer = document.querySelector('.question-container');
const revealButton = document.getElementById('reveal-answer');
const resultElement = document.getElementById('result-character');

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        questionContainer.innerHTML = '';
        revealButton.style.display = 'block';
        return;
    }

    const question = questions[currentQuestionIndex];
    const answersList = answers[currentQuestionIndex];

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = question;
    questionElement.appendChild(questionTitle);

    for (let i = 0; i < answersList.length; i++) {
        const answerButton = document.createElement('button');
        answerButton.textContent = answersList[i];
        answerButton.addEventListener('click', () => handleAnswer(i));
        questionElement.appendChild(answerButton);
    }

    questionContainer.innerHTML = '';
    questionContainer.appendChild(questionElement);
}


function handleAnswer(answerIndex) {
    const selectedAnswer = answers[currentQuestionIndex][answerIndex];
    const strawHat = getStrawHat(selectedAnswer);
    counters[strawHat]++;
    console.log("Counters:", counters); // Log all counter variables
    const buttons = questionContainer.querySelectorAll('button');
    buttons[answerIndex].classList.add('selected');
    currentQuestionIndex++;
    showQuestion();
}

function getStrawHat(answer) {
    // Map answers to Straw Hat characters
    const strawHatsMap = {
        "Playing video games": 'luffy',
        "Training or exercising": 'zoro',
        "Building or fixing things": 'franky',
        "Reading or storytelling": 'usopp',
        "Caring for animals": 'chopper',
        "Traveling or exploring": 'nami',
        "Studying history or culture": 'robin',
        "Cooking or enjoying food": 'sanji',
        "Meditating or practicing martial arts": 'jimbei',
        "Performing or playing music": 'brook',
        "Tropical island with adventures": 'luffy',
        "Quiet mountains or forests": 'zoro',
        "Busy city with technology": 'franky',
        "Remote countryside": 'usopp',
        "Wildlife reserve or sanctuary": 'chopper',
        "Exotic beaches or coastal towns": 'nami',
        "Ancient ruins or historical landmarks": 'robin',
        "Gourmet food capitals": 'sanji',
        "Tranquil temple or dojo": 'jimbei',
        "Musical festivals or concerts": 'brook',
        "Fire": 'luffy',
        "Wind": 'zoro',
        "Steel": 'franky',
        "Earth": 'usopp',
        "Nature": 'chopper',
        "Water": 'nami',
        "Knowledge": 'robin',
        "Love": 'sanji',
        "Sea": 'jimbei',
        "Sound": 'brook',
        "Energetic and carefree": 'luffy',
        "Determined and focused": 'zoro',
        "Bold and outgoing": 'franky',
        "Imaginative and creative": 'usopp',
        "Compassionate and kind": 'chopper',
        "Clever and resourceful": 'nami',
        "Mysterious and insightful": 'robin',
        "Charismatic and suave": 'sanji',
        "Wise and serene": 'jimbei',
        "Cheerful and entertaining": 'brook',
        "Unconventional and unpredictable": 'luffy',
        "Powerful and disciplined": 'zoro',
        "Strong and robust": 'franky',
        "Tactical and strategic": 'usopp',
        "Adaptive and versatile": 'chopper',
        "Agile and quick-witted": 'nami',
        "Precise and calculated": 'robin',
        "Graceful and stylish": 'sanji',
        "Balanced and focused": 'jimbei',
        "Elegant and rhythmic": 'brook',
        "Elasticity or rubber abilities": 'luffy',
        "Master swordsman skills": 'zoro',
        "Cyborg enhancements": 'franky',
        "Incredible marksmanship": 'usopp',
        "Transforming into animals": 'chopper',
        "Navigational and weather control skills": 'nami',
        "Profound knowledge and intellect": 'robin',
        "Superb kicking skills": 'sanji',
        "Fish-man karate or fish-man abilities": 'jimbei',
        "Soul-based powers": 'brook',
        "Running or sprinting": 'luffy',
        "Walking or hiking": 'zoro',
        "Riding a motorcycle or bike": 'franky',
        "crawling": 'usopp',
        "Riding on an animal or creature": 'chopper',
        "Sailing or navigating with maps": 'nami',
        "Flying": 'robin',
        "train": 'sanji',
        "Swimming or diving": 'jimbei',
        "astral projecting": 'brook',
        "Monkey": 'luffy',
        "Tiger": 'zoro',
        "Dog": 'franky',
        "Bird": 'usopp',
        "Reindeer": 'chopper',
        "Cat": 'nami',
        "Snake": 'robin',
        "Fish": 'sanji',
        "Shark": 'jimbei',
        "whale": 'brook',
        "Sunny and bright": 'luffy',
        "Foggy or misty": 'zoro',
        "Windy and breezy": 'franky',
        "Rainy or stormy": 'usopp',
        "Snowy or icy": 'chopper',
        "Cloudy with a chance of adventure": 'nami',
        "Serene and clear": 'robin',
        "Aromatic and flavorful": 'sanji',
        "Underwater or marine": 'jimbei',
        "Starry or moonlit": 'brook',
        "Straw hat or cap": 'luffy',
        "Bandana or headband": 'zoro',
        "Sunglasses or goggles": 'franky',
        "Sling or bag": 'usopp',
        "Hat or earmuffs": 'chopper',
        "Necklace or jewelry": 'nami',
        "Scarf or shawl": 'robin',
        "Suit or tie": 'sanji',
        "Kimono or traditional wear": 'jimbei',
        "Top hat or cane": 'brook',
        "Inspiring others with enthusiasm": 'luffy',
        "Mastering your craft with dedication": 'zoro',
        "Building or inventing extraordinary things": 'franky',
        "Telling captivating stories or lies": 'usopp',
        "Understanding and caring for animals": 'chopper',
        "Navigating through life's uncertainties": 'nami',
        "Unraveling historical mysteries or truths": 'robin',
        "Cooking the most delectable dishes": 'sanji',
        "Maintaining inner peace and harmony": 'jimbei',
        "Entertaining and making people smile": 'brook'
    };
    return strawHatsMap[answer];
}

function revealAnswer() {
    const result = Object.keys(counters).reduce((a, b) => counters[a] > counters[b] ? a : b);
    resultElement.textContent = result.toUpperCase();
    document.getElementById('result').style.display = 'block';
}

revealButton.addEventListener('click', revealAnswer);

showQuestion();

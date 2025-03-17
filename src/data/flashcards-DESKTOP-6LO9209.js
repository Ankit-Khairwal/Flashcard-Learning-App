export const flashcards = {
  GENERAL_KNOWLEDGE: {
    easy: [
      {
        question: "What is the capital of France?",
        answer: "Paris",
        hint: "City of Light",
      },
      {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
        hint: "Named after the Roman god of war",
      },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        hint: "Italian Renaissance polymath",
      },
    ],
    medium: [
      {
        question: "What is the chemical symbol for gold?",
        answer: "Au",
        hint: "Comes from the Latin word 'aurum'",
      },
      {
        question: "In which year did World War II end?",
        answer: "1945",
        hint: "Mid-1940s",
      },
    ],
    hard: [
      {
        question: "Who wrote 'The Canterbury Tales'?",
        answer: "Geoffrey Chaucer",
        hint: "Known as the Father of English literature",
      },
    ],
  },
  MATHEMATICS: {
    easy: [
      {
        question: "What is 8 × 7?",
        answer: "56",
        hint: "Think of 8 groups of 7",
      },
      {
        question: "What is the square root of 100?",
        answer: "10",
        hint: "Which number multiplied by itself gives 100?",
      },
    ],
    medium: [
      {
        question: "What is the formula for the area of a circle?",
        answer: "πr²",
        hint: "Uses pi and radius squared",
      },
      {
        question: "What is 15% of 200?",
        answer: "30",
        hint: "Convert 15% to 0.15 and multiply",
      },
    ],
    hard: [
      {
        question: "What is the Pythagorean theorem?",
        answer: "a² + b² = c²",
        hint: "Relates to right triangles",
      },
    ],
  },
  SCIENCE: {
    easy: [
      {
        question: "What is the chemical formula for water?",
        answer: "H2O",
        hint: "Contains hydrogen and oxygen",
      },
      {
        question: "What force pulls objects toward Earth?",
        answer: "Gravity",
        hint: "Keeps us on the ground",
      },
    ],
    medium: [
      {
        question: "What is the atomic number of carbon?",
        answer: "6",
        hint: "Essential element for life",
      },
      {
        question: "What is the process by which plants make their food?",
        answer: "Photosynthesis",
        hint: "Uses sunlight, water, and CO2",
      },
    ],
    hard: [
      {
        question: "What is Newton's First Law of Motion?",
        answer:
          "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force",
        hint: "Law of inertia",
      },
    ],
  },
  HISTORY: {
    easy: [
      {
        question: "Who was the first President of the United States?",
        answer: "George Washington",
        hint: "His face is on the one-dollar bill",
      },
      {
        question:
          "In which year did Christopher Columbus first reach the Americas?",
        answer: "1492",
        hint: "Famous rhyme: '... sailed the ocean blue'",
      },
    ],
    medium: [
      {
        question: "Which empire built the Pyramids of Giza?",
        answer: "Ancient Egyptian Empire",
        hint: "Located along the Nile River",
      },
      {
        question: "Who was the first Emperor of China?",
        answer: "Qin Shi Huang",
        hint: "Unified China and built the Great Wall",
      },
    ],
    hard: [
      {
        question: "What was the main cause of the French Revolution?",
        answer: "Social inequality and financial crisis",
        hint: "Think about the three estates system",
      },
    ],
  },
  GEOGRAPHY: {
    easy: [
      {
        question: "What is the largest continent?",
        answer: "Asia",
        hint: "Contains China and India",
      },
      {
        question: "What is the longest river in the world?",
        answer: "Nile River",
        hint: "Flows through Egypt",
      },
    ],
    medium: [
      {
        question: "Which country has the largest population?",
        answer: "China",
        hint: "Located in East Asia",
      },
      {
        question: "What is the capital of Brazil?",
        answer: "Brasília",
        hint: "Not Rio de Janeiro",
      },
    ],
    hard: [
      {
        question: "Name three major tectonic plates.",
        answer: "Pacific, Eurasian, North American",
        hint: "Think about the Ring of Fire",
      },
    ],
  },
};

export const localStorageKeys = {
  CORRECT_ANSWERS: "flashcardCorrectAnswers",
  INCORRECT_ANSWERS: "flashcardIncorrectAnswers",
  UNATTEMPTED_CARDS: "unattemptedFlashcards",
  CURRENT_CARD_INDEX: "currentFlashcardIndex",
  TIMER: "studySessionTimer",
};

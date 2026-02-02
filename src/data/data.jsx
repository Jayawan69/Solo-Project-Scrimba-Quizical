/* const question =  [
  {
    category: "Entertainment: Cartoon & Animations",
    type: "boolean",
    difficulty: "medium",
    question: "Donald Duck played the role of Bob Cratchit in Disney's 1983 adaptation of A Christmas Carol.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "According to Overwatch's lore, who was once a member of the Deadlock Gang?",
    correct_answer: "McCree",
    incorrect_answers: ["Roadhog", "Soldier 76", "Junkrat"]
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "What was the main currency in Club Penguin?",
    correct_answer: "Coins",
    incorrect_answers: ["Stamps", "Tickets", "Gems"]
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "Which Sonic the Hedgehog game introudced Knuckles the Echidna?",
    correct_answer: "Sonic the Hedgehog 3",
    incorrect_answers: ["Sonic the Hedgehog 2", "Sonic & Knuckles", "Sonic Adventure"]
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "Which company did Bethesda purchase the Fallout Series from?",
    correct_answer: "Interplay Entertainment ",
    incorrect_answers: ["Capcom", "Blizzard Entertainment", "Nintendo"]
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "easy",
    question: "What is the capital of the US State of New York?",
    correct_answer: "Albany",
    incorrect_answers: ["Buffalo", "New York", "Rochester"]
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: 'In "Katamari Damacy", you control a character known as:',
    correct_answer: "The Prince",
    incorrect_answers: ["Fujio", "Ichigo ", "Foomin"]
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "easy",
    question: "What was Manfred von Richthofen's nickname?",
    correct_answer: "The Red Baron",
    incorrect_answers: ["The High Flying Ace", "The Blue Serpent ", "The Germany Gunner"]
  },
  {
    category: "Science & Nature",
    type: "multiple",
    difficulty: "medium",
    question: "All the following metal elements are liquids at or near room temperature EXCEPT:",
    correct_answer: "Beryllium",
    incorrect_answers: ["Gallium", "Caesium", "Mercury"]
  },
  {
    category: "Entertainment: Cartoon & Animations",
    type: "multiple",
    difficulty: "medium",
    question: 'Which city did Anger berate for ruining pizza in "Inside Out"?',
    correct_answer: "San Francisco",
    incorrect_answers: ["Minnesota", "Washington", "California"]
  }
]

export default question */

import he from 'he';

export async function getQuizData() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    
    if (!response.ok) {
        if (response.status === 429) {
            console.warn("Rate limit hit, wait a few seconds...");
        }
        throw new Error("Network response was not ok");
    }

    const result = await response.json();

    // Transform the data immediately
    const cleanData = result.results.map(item => {
      return {
        ...item,
        // Decode the question text
        question: he.decode(item.question),
        // Decode the correct answer
        correct_answer: he.decode(item.correct_answer),
        // Decode every incorrect answer in the array
        incorrect_answers: item.incorrect_answers.map(ans => he.decode(ans))
      };
    });

    return cleanData;
    
  } catch (error) {
    console.error("Error loading quiz:", error);
    return [];
  }
}
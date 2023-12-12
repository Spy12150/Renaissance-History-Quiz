import React, { useState, useEffect} from 'react';
import Question from './Question';

const quizData = [
    {
      question: "Which artist is famous for pioneering the use of perspective in painting?",
      image: "Quiz1.jpeg",
      options: ["Giotto", "Masaccio", "Leonardo da Vinci", "Raphael"],
      answer: "Giotto"
    },
    {
        question: "Which artist created this painting?",
        image: "Quiz2.jpeg",
        options: [ "Michelangelo", "Titian","Botticelli", "Leonardo da Vinci"],
        answer: "Botticelli"
      },
      {
        question: "Titian was renowned for his work in which medium?",
        image: "Quiz3.jpeg",
        options: ["Sculpture", "Fresco painting", "Oil painting", "Mosaic"],
        answer: "Oil painting"
      },
      {
        question: "What medium was the following artwork created using?",
        image: "Quiz4.jpeg",
        options: ["Tempera", "Oil", "Fresco", "Marble"],
        answer: "Oil"
      },
      {
        question: "Which of the following artists did not create a sculpture of David?",
        image: "Quiz5.jpeg",
        options: ["Donatello", "Raphael", "Bernini", "Michelangelo"],
        answer: "Raphael"
      },
      {
        question: "Leonardo da Vinci's 'The Last Supper' is located in which city?",
        image: "Quiz6.jpeg",
        options: ["Florence", "Milan", "Rome", "Venice"],
        answer: "Milan"
      },
      {
        question: "Which artist is known for the fresco 'The School of Athens'?",
        image: "Quiz7.jpeg",
        options: ["Michelangelo", "Donatello", "Raphael", "Caravaggio"],
        answer: "Raphael"
      },
      {
        question: "Who started the first copyright court case in Renaissance Italy?",
        image: "Quiz8.jpeg",
        options: ["Dürer", "Mantegna", "Leonardo da Vinci", "Michelangelo"],
        answer: "Dürer"
      },
      {
        question: "What is the central figure in this painting representing?",
        image: "Quiz9.jpeg",
        options: ["The Virgin Mary", "A Roman Empress", "An allegory of Spring", "The goddess Venus"],
        answer: "The goddess Venus"
      },
      {
        question: "Who was David by Michelangelo comissioned by?",
        image: "Quiz10.jpeg",
        options: ["The Medici Family", "Opera del Duomo", "Francesco del Giocondo", "Nicolaus Copernicus"],
        answer: "Opera del Duomo"
      },
                      
  ];

function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setQuizQuestions(shuffleArray([...quizData])); // Shuffling the questions
  }, []);

  if (quizQuestions.length === 0) {
    return <div>Loading...</div>;  // or any other loading indication
  }


  const question = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (selectedOption === question.answer) {
      setScore(score + 1);
    }
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= quizData.length) {
    let resultMessage;
    if (score <= 5) {
      resultMessage = "Zolli would be disappointed in you!";
    } else if (score <= 8) {
      resultMessage = "Not bad!";
    } else {
      resultMessage = "Zolli would be proud of you!";
    }
  
    return (
      <div className="result-box"> {/* Apply the result-box class here */}
        <h2>Your Score: {score} out of 10</h2>
        <p>{resultMessage}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
    <Question
        data={question}
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
        isSubmitted={isSubmitted}
        />
        {isSubmitted && (
          <button className="next-button" onClick={handleNextQuestion}>Next Question</button>
        )}
        {!isSubmitted && (
          <button className="confirm-button" onClick={handleSubmit}>Confirm Answer</button>
        )}
    </div>
  );
}

export default Quiz;

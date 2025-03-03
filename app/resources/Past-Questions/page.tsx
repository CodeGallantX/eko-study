import { useState, useEffect } from 'react';

const PastQuestions = ({ courseID }) => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    fetch(`@/data/${courseID}.json`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch((err) => console.error("Failed to load questions", err));
  }, [courseID]);
  
  useEffect(() => {
    if (isTestStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
      setShowResult(true);
    }
  }, [isTestStarted, timeLeft]);
  
  const startTest = () => {
    setShowConfirmation(false);
    setIsTestStarted(true);
  };
  
  const submitTest = () => {
    setIsTestStarted(false);
    setShowResult(true);
    calculateScore();
  };
  
  const calculateScore = () => {
    let newScore = Math.floor(Math.random() * 100); // Placeholder score logic
    setScore(newScore);
  };
  
  return (
    <div>
      <h1>Past Questions</h1>
      {!isTestStarted && (
        <div>
          <input 
            type="text" 
            placeholder="Search questions..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setShowConfirmation(true)}>Start Test</button>
        </div>
      )}
      {isTestStarted && (
        <div>
          <h2>Test in Progress</h2>
          <Timer timeLeft={timeLeft} />
          <button onClick={submitTest}>Submit Test</button>
        </div>
      )}
      {showResult && <ResultModal score={score} onClose={() => setShowResult(false)} />}
      {showConfirmation && <ConfirmationModal onConfirm={startTest} onCancel={() => setShowConfirmation(false)} />}
    </div>
  );
};

export default PastQuestions;

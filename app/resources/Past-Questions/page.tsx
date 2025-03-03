"use client";
import { useState, useEffect } from "react";

const PastQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch past questions from JSON file or API
    fetch("/past_questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setFilteredQuestions(data);
      })
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = questions.filter((q) =>
      q.question.toLowerCase().includes(value)
    );
    setFilteredQuestions(filtered);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Past Questions</h1>
      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, index) => (
            <div key={index} className="border p-4 rounded">
              <p className="font-semibold">{q.question}</p>
              <ul className="mt-2">
                {q.options.map((option, i) => (
                  <li key={i} className="ml-4 list-disc">
                    {option}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-green-600 font-semibold">Answer: {q.answer}</p>
              {q.explanation && (
                <p className="text-gray-600">Explanation: {q.explanation}</p>
              )}
            </div>
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default PastQuestions;

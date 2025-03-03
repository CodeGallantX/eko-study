"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PastQuestions = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(45 * 60);
  const router = useRouter();

  useEffect(() => {
    // Fetch course list
    fetch("/past-questions/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`/past-questions/${selectedCourse}.json`)
        .then((res) => res.json())
        .then((data) => setQuestions(data.questions))
        .catch((err) => console.error("Error loading questions:", err));
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [selectedCourse]);

  const startQuiz = (course) => {
    setSelectedCourse(course);
    setCurrentQuestionIndex(0);
    setTimer(45 * 60);
  };

  const handleAnswerClick = (answer) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("Quiz Completed!");
      setSelectedCourse(null);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-4">
      {!selectedCourse ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Past Questions</h1>
          <div className="grid grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="p-4 cursor-pointer hover:shadow-lg"
                onClick={() => startQuiz(course.id)}
              >
                <CardContent className="text-center font-semibold">
                  {course.name}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">{selectedCourse} Quiz</h2>
          <p className="text-red-500 font-semibold">Time Left: {formatTime(timer)}</p>
          {questions.length > 0 && (
            <div className="mt-4 border p-4 rounded-md shadow">
              <h3 className="text-lg font-bold">Q{currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <Button
                    key={index}
                    className="p-2 text-left border hover:bg-gray-200"
                    onClick={() => handleAnswerClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PastQuestions;

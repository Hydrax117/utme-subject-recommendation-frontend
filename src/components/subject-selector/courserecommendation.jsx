// src/components/CourseRecommendation.js
import React from "react";
import Course from "./course";
import knn from "ml-knn";

const CourseRecommendation = ({ selectedSubjects }) => {
  // Placeholder data for courses
  const allCourses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      subjects: ["Math", "Computer Science"],
      description: "Learn the fundamentals of computer science.",
    },
    // Add more courses with relevant subjects and descriptions
  ];

  // Convert subjects to binary representation for k-nearest neighbors
  const subjectsVector = allCourses.map((course) =>
    selectedSubjects.every((subject) => course.subjects.includes(subject))
      ? 1
      : 0
  );

  // Calculate the nearest neighbors based on subjectsVector
  const knnClassifier = new knn();
  knnClassifier.train(
    allCourses.map((_, index) => index),
    subjectsVector
  );

  // Get the nearest neighbors
  const nearestNeighbors = knnClassifier.predict([0], 3); // Adjust k as needed

  // Retrieve recommended courses based on nearest neighbors
  const recommendedCourses = nearestNeighbors.map((index) => allCourses[index]);

  return (
    <div>
      <h2>Recommended Courses</h2>
      {recommendedCourses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseRecommendation;

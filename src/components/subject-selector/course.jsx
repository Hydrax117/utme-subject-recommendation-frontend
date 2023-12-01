// src/components/Course.js
import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
    </div>
  );
};

export default Course;

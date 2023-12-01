// src/components/SubjectSelector.js
import React, { useState } from "react";

const SubjectSelector = ({ onSelectSubjects }) => {
  const availableSubjects = [
    "Math",
    "Computer Science",
    "Physics",
    "Biology",
    "History",
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(subject)
        ? prevSubjects.filter((s) => s !== subject)
        : [...prevSubjects, subject]
    );
  };

  const handleSubmit = () => {
    onSelectSubjects(selectedSubjects);
  };

  return (
    <div>
      <h2>Select Your Favorite Subjects</h2>
      <div>
        {availableSubjects.map((subject) => (
          <label key={subject}>
            <input
              type="checkbox"
              value={subject}
              checked={selectedSubjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
            />
            {subject}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubjectSelector;

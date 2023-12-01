// src/App.js
import React, { useState } from "react";
import SubjectSelector from "./subjectSelector";
import CourseRecommendation from "./courserecommendation";
function Recomm() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectSelection = (subjects) => {
    setSelectedSubjects(subjects);
  };

  return (
    <div>
      <SubjectSelector onSelectSubjects={handleSubjectSelection} />
      <CourseRecommendation selectedSubjects={selectedSubjects} />
    </div>
  );
}

export default Recomm;

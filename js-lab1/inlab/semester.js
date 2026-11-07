// IN-LAB TASK (AI closed). Do this in the lab, not at home.
//
// A study plan groups planned course ids by semester:
//
//   const plan = {
//     student: "Asha",
//     semesters: { "2026-odd": [4, 10], "2027-even": [18] },
//   };
//
// Write addToSemester(plan, semester, courseId). It returns a NEW plan where
// that semester's list ends with courseId. Rules:
//   - never change the input (the tests freeze it — mutation throws)
//   - the student and every OTHER semester stay the SAME references
//   - a semester that does not exist yet is created
//   - if the id is already in that semester, return the SAME plan
//
// Stretch: moveCourse(plan, from, to, courseId) — out of one semester, into another.

export function addToSemester(plan, semester, courseId) {
  const courses = plan.semesters[semester] ?? [];

  if (courses.includes(courseId)) {
    return plan;
  }

  return {
    ...plan,
    semesters: {
      ...plan.semesters,
      [semester]: [...courses, courseId]
    }
  };
}

export function moveCourse(plan, from, to, courseId) {
  const source = plan.semesters[from] ?? [];
  const destination = plan.semesters[to] ?? [];

  if (from === to || !source.includes(courseId)) {
    return plan;
  }

  return {
    ...plan,
    semesters: {
      ...plan.semesters,
      [from]: source.filter(id => id !== courseId),
      [to]: destination.includes(courseId)
        ? destination
        : [...destination, courseId]
    }
  };
}

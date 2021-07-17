export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'setCourse':
      return {
        ...state,
        course: action.payload.course,
      };
    case 'setSameCourses':
      return {
        ...state,
        sameCourses: action.payload.sameCourses,
      };
    case 'setSections':
      return {
        ...state,
        sections: action.payload.sections,
      };
    case 'setImage':
      return {
        ...state,
        course: { ...state.course, courseImage: action.payload.image },
      };
    default:
      return state;
  }
}

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'HANDLE_COUNTRY_CHANGE':
      return {
        ...state,
        country: state.countries.filter(item => item.value === payload).shift(),
      };

    default:
      return state;
  }
};

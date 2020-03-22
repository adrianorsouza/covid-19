export const initialState = {
  status: null,
  response: null,
};

export default (state = initialState, {type, payload} = {}) => {

  switch (type) {
    case 'FETCHING':
      return {...initialState, status: 'FETCHING'};

    case 'COMPLETE':
      return {...state, status: 'COMPLETE', response: payload};

    case 'ERROR':
      return {...state, status: 'ERROR', response: payload};

    default:
      return state;
  }
};

import { useReducer, useCallback } from 'react';
import request from '../request';
import reducer, { initialState } from '../context/reducer';

const useApiRequest = (endpoint, { method = 'get', params = {} } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = useCallback(
    async url => {
      dispatch({ type: 'FETCHING' });

      try {
        const response = await request[method](
          (url && url) || endpoint,
          params
        );
        const { data } = response;
        dispatch({
          type: 'COMPLETE',
          payload: data,
        });
      } catch (e) {
        const status = (e.response && e.response.status) || 0;
        dispatch({
          type: 'ERROR',
          payload: {
            error: status,
            message: e.message,
          },
        });
      }
    },
    [endpoint, method, params]
  );

  return [state, makeRequest];
};

export default useApiRequest;

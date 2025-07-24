import React from 'react';

export default function useStateWithRef(initialState) {
  const [state, _setState] = React.useState(initialState);
  const ref = React.useRef(state);
  const setState = React.useCallback(
    (newState) => {
      if (typeof newState === 'function') {
        _setState(prevState => {
          const computedState = newState(prevState);
          ref.current = computedState;
          return computedState;
        });
      }
      else {
        ref.current = newState;
        _setState(newState);
      }
    },
    [],
  );
  return [state, setState, ref];
}
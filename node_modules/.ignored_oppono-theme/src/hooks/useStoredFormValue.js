import React from 'react';
import {useConnect} from 'frontity';

export default function useStoredFormValue(pageName) {
  const {state} = useConnect();
  return sectionName => key => state.theme.selectedValues[`${pageName}-${sectionName}`]?.get?.(key);
}
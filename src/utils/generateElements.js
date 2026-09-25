import React from 'react';

export function generateElem(element, length) {
  return Array.from({ length: length ?? 5 }, (_, i) =>
    React.cloneElement(element, {
      key: i,
    })
  );
}

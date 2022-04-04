import FontFaceObserver from 'fontfaceobserver';
import { useLayoutEffect, useState } from 'react';

const Azeret = new FontFaceObserver('Azeret Mono', {});
const Americane = new FontFaceObserver('Americane', {});

const timeout = 5000; // miliseconds

export function useFontObserver() {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    Promise.all([Americane.load(null, timeout), Azeret.load(null, timeout)])
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // even if font fail to load, we still need to allow render
        setLoaded(true);
      });
  }, []);

  return loaded;
}

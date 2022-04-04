import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'styles/nprogress.css';

export default function TopProgressBar() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    return () => {
      NProgress.done();
    };
  });

  return null;
}

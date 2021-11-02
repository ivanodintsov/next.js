export const gtag = (...args: Parameters<Gtag.Gtag>): ReturnType<Gtag.Gtag> => {
  if (window.gtag) {
    window.gtag(...args);
  }
};

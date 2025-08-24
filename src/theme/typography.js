const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '3rem',
    },
    '@media (min-width:900px)': {
      fontSize: '3.5rem',
    },
    '@media (min-width:1200px)': {
      fontSize: '4rem',
    },
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    '@media (min-width:600px)': {
      fontSize: '2.25rem',
    },
    '@media (min-width:900px)': {
      fontSize: '2.5rem',
    },
    '@media (min-width:1200px)': {
      fontSize: '3rem',
    },
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
    '@media (min-width:600px)': {
      fontSize: '1.875rem',
    },
    '@media (min-width:900px)': {
      fontSize: '2rem',
    },
    '@media (min-width:1200px)': {
      fontSize: '2.25rem',
    },
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
    '@media (min-width:600px)': {
      fontSize: '1.625rem',
    },
    '@media (min-width:900px)': {
      fontSize: '1.75rem',
    },
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.4,
    '@media (min-width:600px)': {
      fontSize: '1.375rem',
    },
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: '1rem',
    lineHeight: 1.5,
    '@media (min-width:600px)': {
      fontSize: '1.0625rem',
    },
  },
  body1: {
    fontSize: '0.9375rem',
    lineHeight: 1.6,
    '@media (min-width:600px)': {
      fontSize: '1rem',
    },
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    '@media (min-width:600px)': {
      fontSize: '0.9375rem',
    },
  },
  caption: {
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    '@media (min-width:600px)': {
      fontSize: '0.875rem',
    },
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'none',
    '@media (min-width:600px)': {
      fontSize: '0.9375rem',
    },
  },
};

export default typography;

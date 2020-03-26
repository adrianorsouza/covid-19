import app from './app';

export default {
  api: {
    baseURL: (app.env === 'production' && '/') || '/',
    counters: iso => `/api/countries/${iso}.json`,
    countries: `/api/countries.json`,
    daily: iso => `/api/daily/${iso}.json`,
    dailyWorld: `/api/daily/world.json`,
    globally: `/api/globally.json`,
  },
};

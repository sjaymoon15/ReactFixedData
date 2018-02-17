const ads = require('./database/ads.json');
const ads_metrics = require('./database/ads_metrics.json');

module.exports = app => {
  app.get('/api/ads', (req, res) => {
    res.send(ads);
  });

  app.get('/api/ads_metrics', (req, res) => {
    res.send(ads_metrics);
  });
};

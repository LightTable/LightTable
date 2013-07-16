module.exports = process.env.HARBOR_COV
  ? require('./lib-cov/harbor')
  : require('./lib/harbor');

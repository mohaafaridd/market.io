module.exports = {
  apps: [{
      'name': 'market.io',
      'script': 'app.js',
      'instances': "max",
      'exec_mode': "cluster",
      "listen_timeout": 40000,
      "wait_ready": true,
      env: {
          'PORT': 3000,
          'NODE_ENV': 'development'
      },
      env_staging: {
          'PORT': 3004,
          'NODE_ENV': 'staging'
      },
      env_production: {
          'PORT': 3004,
          'NODE_ENV': 'production'
      }
  },]
}

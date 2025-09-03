module.exports = {
  apps: [
    {
      name: 'Viier',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env_production: {
        "var": "content"
      }
    }
  ]
}

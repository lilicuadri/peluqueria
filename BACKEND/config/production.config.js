var config = {
  env: 'test',
  db: {
    
    mongo: {
      MONGO_HOST:  ''
      ,MONGO_PORT: ''
      ,MONGO_SSL: 1
      ,MONGO_DATABASE: ''
      ,MONGO_USER: ''
      ,MONGO_PASSWORD: ''
      ,MONGO_AUTH_SOURCE: ''
      ,MONGO_REPLICASET:''
    }
    
  }, server: {
    host: '0.0.0.0',
    port: 3019,
    enableDebugMode: true,
  },
  newrelic: {
    app_name: '',
    license_key: ''
  }
};

module.exports = Object.freeze(config);

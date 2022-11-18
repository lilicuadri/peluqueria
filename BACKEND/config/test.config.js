var config = {
  env: 'test',
  db: {
    
    mongo: {
      MONGO_HOST:  'localhost'
      ,MONGO_PORT: '27017'
      ,MONGO_DATABASE: ''
    }

  }, server: {
    host: '0.0.0.0',
    port: 3020,
    enableDebugMode: true,
  }
};

module.exports = Object.freeze(config);


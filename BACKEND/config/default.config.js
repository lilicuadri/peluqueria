
var config = {
  env: 'dev',
  db: {
    
    mongo: {
      MONGO_HOST:  'ac-rlgnzhc-shard-00-00.bey07zx.mongodb.net,ac-rlgnzhc-shard-00-01.bey07zx.mongodb.net,ac-rlgnzhc-shard-00-02.bey07zx.mongodb.net'
      ,MONGO_PORT: '27017'
      ,MONGO_SSL: 1
      ,MONGO_DATABASE: 'Desarrollo'
      ,MONGO_USER: 'lcuadro'
      ,MONGO_PASSWORD: '312697'
      ,MONGO_AUTH_SOURCE: 'admin'
      , MONGO_REPLICASET: 'atlas-g4mggf-shard-0'
    }

  }, server: {
    host: '0.0.0.0',
    port: 8080,
    enableDebugMode: true,
  }, 
};

module.exports = Object.freeze(config);

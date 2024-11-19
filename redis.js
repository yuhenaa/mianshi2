const redis = require('redis');
const sqlite3 = require('sqlite3').verbose();

// 创建Redis客户端
const redisClient = redis.createClient();

// 连接到Redis服务器
redisClient.connect();

// 打开SQLite数据库
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('打开数据库失败', err);
    } else {
        console.log('数据库已成功连接');
    }
});

// 查询SQLite数据库并将结果存储在Redis中
function getDataFromSQLite(query, callback) {
    // 检查Redis缓存
    redisClient.get(query, (err, cachedData) => {
        if (err) {
            console.error('Redis 错误', err);
            return callback(err);
        }

        if (cachedData) {
            console.log('从Redis缓存读取数据');
            return callback(null, JSON.parse(cachedData)); // 解析缓存的JSON数据
        }

        // 如果Redis缓存没有数据，则查询SQLite数据库
        db.all(query, (err, rows) => {
            if (err) {
                console.error('SQLite 查询错误', err);
                return callback(err);
            }

            // 将数据存储到Redis中，设置缓存有效期为60秒
            redisClient.setex(query, 60, JSON.stringify(rows));

            console.log('从SQLite数据库读取数据');
            return callback(null, rows);
        });
    });
}


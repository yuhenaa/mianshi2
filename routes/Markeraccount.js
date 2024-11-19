// routes/account.js
const express = require('express');
const router = express.Router();



function generateUserObjects(obj, num) {
    const result = [];
    for (let i = 1; i <= num; i++) {
        const newObj = { ...obj }; // 创建对象的副本，避免修改原对象
        newObj.username = `${obj.username}${i}`; // 在用户名末尾加上数字
        result.push(newObj); // 将新的对象加入结果数组
    }
    return result;
}
 
const managers = generateUserObjects({ "username": "marker", "password": "10086" },145)




// 获取所有账号
router.get('/', (req, res) => {
    res.json(managers); // 发送账号作为响应
});

module.exports = router;

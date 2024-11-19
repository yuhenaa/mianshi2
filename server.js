// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// 中间件，用于解析 JSON 请求体
app.use(express.json());
app.use(express.static('public')); // 提供 public 文件夹中的静态文件




// 记分员账号信息的路由
const AccountRoutes = require('./routes/Markeraccount');
app.use('/api/account', AccountRoutes); 
// 面试官账号信息
const InterviewaccountRoutes = require('./routes/Intervieweraccount');
app.use('/api/Intervieweraccount', InterviewaccountRoutes); 



// 全部学生列表的信息
const StudentRoutes = require('./routes/StudentList');
app.use('/api/StudentList', StudentRoutes); 
//全部考官信息列表
const InterviewerRoutes = require('./routes/Interviewer');
app.use('/api/Interviewer', InterviewerRoutes); 
// 面试官信息
const MarkerRoutes = require('./routes/Marker');
app.use('/api/Marker', MarkerRoutes);
// 文本信息
const ContentRoutes = require('./routes/Content');
app.use('/api/Content', ContentRoutes);






// 路由：处理 GET 请求
app.get('/', (req, res) => {
    res.send('欢迎来到我的后端服务器！');
});

// 路由：处理 POST 请求
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    res.json({
        message: '数据已接收',
        data: receivedData
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行，访问地址：http://localhost:${PORT}`);
});

# 📚 学生出席管理系统

一个简单易用的学生出席状态管理系统，支持网页界面操作，数据持久化存储到数据库。

## ✨ 功能特性

- ✅ **添加学生** - 输入学生姓名，自动保存到数据库
- ✓ **标记出席** - 点击绿色按钮标记学生已出席
- ✗ **标记缺席** - 点击红色按钮标记学生缺席
- 🗑️ **删除学生** - 删除不需要的学生记录
- 💾 **数据持久化** - 所有数据自动保存到 SQLite 数据库
- 📱 **响应式设计** - 支持桌面、平板和手机设备

## 🛠️ 技术栈

- **后端**: Node.js + Express.js
- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **数据库**: SQLite3
- **依赖管理**: npm

## 📦 安装和运行

### 前置要求

- Node.js 14+ 版本
- npm 或 yarn

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/zhl19951021-prog/19980404.git
cd 19980404
```

2. **安装依赖**
```bash
npm install
```

3. **启动服务器**
```bash
npm start
```

4. **访问应用**
打开浏览器访问: `http://localhost:3000`

## 📖 使用说明

### 添加学生
1. 在顶部输入框输入学生姓名
2. 点击"➕ 添加学生"按钮
3. 学生会自动显示在列表中，初始状态为"未标记"

### 标记出席
- 点击学生行右侧的绿色"✓ 出席"按钮
- 学生状态会变为"✓ 已出席"（绿色背景）

### 标记缺席
- 点击学生行右侧的红色"✗ 缺席"按钮
- 学生状态会变为"✗ 缺席"（红色背景）

### 删除学生
- 点击学生行右侧的灰色"🗑️ 删除"按钮
- 确认删除后，学生记录会被移除

## 📊 数据库结构

学生表 (students):
```sql
- id: 学生唯一标识 (主键)
- name: 学生姓名 (唯一)
- status: 出席状态 (unknown/present/absent)
- created_at: 创建时间
- updated_at: 最后更新时间
```

## 🔌 API 端点

### 获取所有学生
```
GET /api/students
```

### 添加学生
```
POST /api/students
Content-Type: application/json

{
  "name": "学生姓名"
}
```

### 更新学生状态
```
PUT /api/students/:id
Content-Type: application/json

{
  "status": "present" | "absent" | "unknown"
}
```

### 删除学生
```
DELETE /api/students/:id
```

## 🎨 界面预览

- 现代化渐变设计（紫蓝色主题）
- 清晰的学生列表展示
- 彩色状态指示
  - 🟩 绿色：已出席
  - 🟥 红色：缺席
  - ⬜ 灰色：未标记
- 完全响应式���局

## 📝 开发指南

### 项目结构
```
19980404/
├── server.js          # Express 服务器主文件
├── package.json       # 依赖配置
├── attendance.db      # SQLite 数据库（自动生成）
├── public/
│   ├── index.html     # 主页面
│   ├── style.css      # 样式表
│   └── script.js      # 前端逻辑
├── .gitignore         # Git 忽略文件
└── README.md          # 项目说明
```

### 热加载开发
```bash
npm install --save-dev nodemon
npm run dev
```

## 🐛 故障排查

**问题**: 无法连接到数据库
- 解决: 确保 node_modules 已安装，删除 attendance.db 后重启

**问题**: 端口 3000 已被占用
- 解决: 修改 server.js 中的 PORT 变量，或关闭占用端口的程序

**问题**: 学生名称重复提示
- 解决: 数据库中已存在该学生，请修改名称或删除重复记录

## 📄 许可证

MIT License

## 👨‍💻 作者

Created with ❤️ for student management

---

**有问题或建议？** 欢迎提交 Issue 或 Pull Request！
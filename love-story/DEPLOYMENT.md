# 🚀 GitHub Pages 部署完整指南

## 前提条件

- 已安装 Git
- 拥有 GitHub 账号
- 已准备好图片和音频文件

## 📋 步骤 1: 准备项目

1. **检查媒体文件**
   
   确保以下文件已准备好并放在对应目录：
   
   ```
   assets/img/background.jpg     ✓
   assets/img/memory-1.jpg        ✓
   assets/img/memory-2.jpg        ✓
   assets/img/memory-3.jpg        ✓
   assets/img/memory-4.jpg        ✓
   assets/img/memory-5.jpg        ✓
   assets/audio/background.mp3    ✓ (可选)
   assets/audio/memory-1.mp3      ✓ (可选)
   assets/audio/memory-2.mp3      ✓ (可选)
   assets/audio/memory-3.mp3      ✓ (可选)
   assets/audio/memory-4.mp3      ✓ (可选)
   ```

2. **本地测试**
   
   在浏览器中打开 `index.html` 确保一切正常运行。

## 📋 步骤 2: 初始化 Git 仓库

在 `love-story` 文件夹中打开终端/命令提示符：

```bash
# 进入项目目录
cd love-story

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "初始提交：爱情故事纪念网站"
```

## 📋 步骤 3: 创建 GitHub 仓库

### 方式 1: 通过 GitHub 网站

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 `+` → `New repository`
3. 填写仓库信息：
   - **Repository name**: `love-story`（或其他你喜欢的名字）
   - **Description**: "我们的爱情故事纪念网站"
   - **Public** 或 **Private**（建议 Public 以使用 GitHub Pages）
   - ❌ 不要勾选 "Add a README file"
   - ❌ 不要勾选 "Add .gitignore"
4. 点击 `Create repository`

### 方式 2: 通过 GitHub CLI（如已安装）

```bash
gh repo create love-story --public --source=. --remote=origin --push
```

## 📋 步骤 4: 推送到 GitHub

如果使用方式 1 创建仓库，执行：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/love-story.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 📋 步骤 5: 启用 GitHub Pages

### 通过 GitHub 网站

1. 进入你的仓库页面
2. 点击 `Settings`（设置）
3. 在左侧菜单找到 `Pages`
4. 在 **Source** 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
5. 点击 `Save`
6. 等待 1-2 分钟，页面顶部会显示网站地址

你的网站地址将是：
```
https://YOUR_USERNAME.github.io/love-story/
```

## 📋 步骤 6: 验证部署

1. 点击 GitHub Pages 提供的链接
2. 检查所有页面是否正常显示
3. 测试所有功能（音乐、照片、音频等）

## 🔄 后续更新

当你想更新网站内容时：

```bash
# 修改文件后

# 查看修改的文件
git status

# 添加修改的文件
git add .

# 提交更改
git commit -m "更新：添加新的回忆照片"

# 推送到 GitHub
git push
```

几分钟后，GitHub Pages 会自动更新。

## ⚙️ 高级配置

### 使用自定义域名

1. 购买域名（如 `ourstory.com`）
2. 在仓库 Settings → Pages → Custom domain 中填入域名
3. 在域名服务商处添加 DNS 记录：
   ```
   类型: CNAME
   名称: www
   值: YOUR_USERNAME.github.io
   ```
4. 等待 DNS 生效（可能需要几小时）

### 启用 HTTPS

GitHub Pages 自动提供免费 HTTPS，在 Settings → Pages 中勾选 `Enforce HTTPS` 即可。

## 🐛 常见问题

### Q: 推送时要求输入用户名密码？

A: GitHub 已不支持密码认证，需要使用个人访问令牌（PAT）：

1. GitHub 设置 → Developer settings → Personal access tokens
2. Generate new token
3. 勾选 `repo` 权限
4. 复制生成的 token
5. 在 Git 推送时，用户名填 GitHub 用户名，密码填 token

或者配置 SSH：

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加到 ssh-agent
ssh-add ~/.ssh/id_ed25519

# 复制公钥
cat ~/.ssh/id_ed25519.pub

# 在 GitHub Settings → SSH and GPG keys 中添加
```

然后修改远程仓库地址：

```bash
git remote set-url origin git@github.com:YOUR_USERNAME/love-story.git
```

### Q: GitHub Pages 显示 404？

A: 可能原因：
1. 等待几分钟让 GitHub Pages 构建完成
2. 检查仓库是否设置为 Public
3. 确认 Settings → Pages 中已正确配置
4. 检查仓库名和访问 URL 是否匹配

### Q: 图片/音频无法加载？

A: 检查：
1. 文件路径是否正确（区分大小写）
2. 文件是否已推送到 GitHub（`git status` 查看）
3. 浏览器控制台是否有报错（F12 打开）
4. 文件大小是否超过 GitHub 限制（单文件 < 100MB）

### Q: 音频不能自动播放？

A: 现代浏览器限制自动播放，需要用户交互。点击音乐按钮即可播放。

## 📊 项目统计

查看网站访问量，可以添加：

- **Google Analytics** - 免费网站分析
- **GitHub Insights** - 仓库流量统计

## 🎉 完成！

现在你的爱情故事网站已经成功部署到互联网上了！

你可以：
- ✅ 分享链接给 TA
- ✅ 在社交媒体上展示
- ✅ 作为表白的惊喜礼物
- ✅ 持续更新你们的故事

---

**祝你表白成功！** 💕

如有问题，请参考 [GitHub Pages 官方文档](https://docs.github.com/en/pages)。

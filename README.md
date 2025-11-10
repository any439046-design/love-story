# 💖 我们的故事 - 爱情纪念网站

一个温暖、浪漫、充满电影感的爱情故事纪念网站，用于记录和展示美好的回忆。

## ✨ 特性

- 🎨 **浪漫视觉设计** - 粉色与暖色系主题，柔和渐变效果
- 📸 **照片时光旅程** - 时间线布局展示珍贵回忆
- 🎵 **回忆录音** - 支持音频播放与可视化效果
- 🎬 **电影级动画** - 柔和的淡入、滑动、渐变动画
- 📱 **完全响应式** - 完美适配手机、平板和桌面设备
- 🚀 **零依赖** - 纯 HTML/CSS/JavaScript 实现
- 🌐 **开箱即用** - 可直接部署到 GitHub Pages

## 📁 项目结构

```
love-story/
├── index.html              # 首页
├── photos.html             # 照片时光旅程页面
├── audio.html              # 回忆录音页面
├── README.md               # 项目说明文档
└── assets/
    ├── css/
    │   └── style.css       # 主样式文件
    ├── js/
    │   ├── main.js         # 首页脚本
    │   ├── timeline.js     # 时间线页面脚本
    │   └── audio.js        # 音频页面脚本
    ├── img/
    │   ├── background.jpg  # 首页背景图
    │   ├── memory-1.jpg    # 回忆照片 1
    │   ├── memory-2.jpg    # 回忆照片 2
    │   ├── memory-3.jpg    # 回忆照片 3
    │   ├── memory-4.jpg    # 回忆照片 4
    │   └── memory-5.jpg    # 回忆照片 5
    └── audio/
        ├── background.mp3  # 背景音乐
        ├── memory-1.mp3    # 录音 1
        ├── memory-2.mp3    # 录音 2
        ├── memory-3.mp3    # 录音 3
        └── memory-4.mp3    # 录音 4
```

## 🚀 快速开始

### 本地预览

1. 克隆或下载此项目
2. 在浏览器中打开 `index.html` 即可预览

### 部署到 GitHub Pages

1. **创建 GitHub 仓库**
   ```bash
   # 在项目目录下初始化 git
   cd love-story
   git init
   git add .
   git commit -m "初始提交：爱情故事网站"
   ```

2. **推送到 GitHub**
   ```bash
   # 替换为你的 GitHub 用户名和仓库名
   git remote add origin https://github.com/你的用户名/love-story.git
   git branch -M main
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库的 Settings → Pages
   - Source 选择 `main` 分支
   - 点击 Save
   - 几分钟后访问：`https://你的用户名.github.io/love-story/`

## 🎨 自定义指南

### 1. 替换图片

将你的照片放入 `assets/img/` 目录：

- `background.jpg` - 首页背景图（推荐尺寸：1920x1080）
- `memory-1.jpg` 到 `memory-5.jpg` - 时间线照片（推荐尺寸：800x600）

### 2. 添加音频

将音频文件放入 `assets/audio/` 目录：

- `background.mp3` - 首页背景音乐
- `memory-1.mp3` 到 `memory-4.mp3` - 回忆录音

**支持的格式**: MP3, WAV, OGG

### 3. 修改文字内容

编辑对应的 HTML 文件：

- `index.html` - 修改首页标题和描述
- `photos.html` - 修改时间线事件（日期、标题、描述、标签）
- `audio.html` - 修改音频卡片内容

**示例**：修改时间线节点

```html
<div class="timeline-item" data-aos="fade-up">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-date">2024年1月</div> <!-- 修改日期 -->
        <div class="timeline-card">
            <div class="card-image">
                <img src="assets/img/your-photo.jpg" alt="标题"> <!-- 替换图片 -->
            </div>
            <div class="card-content">
                <h3 class="card-title">你的标题</h3> <!-- 修改标题 -->
                <p class="card-description">
                    你的故事描述...
                </p>
                <div class="card-tags">
                    <span class="tag">标签1</span> <!-- 修改标签 -->
                    <span class="tag">标签2</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 4. 调整颜色主题

编辑 `assets/css/style.css` 中的 CSS 变量：

```css
:root {
    --primary-pink: #ff6b9d;      /* 主色调 */
    --secondary-pink: #ffc2d1;    /* 次要色调 */
    --warm-orange: #ffb199;       /* 暖橙色 */
    /* 更多颜色... */
}
```

### 5. 添加更多时间线节点

复制 `photos.html` 中的任一 `.timeline-item` 区块，修改内容后粘贴到时间线中。

### 6. 添加更多音频卡片

复制 `audio.html` 中的任一 `.audio-card` 区块，修改内容后添加到音频容器中。

## 🎯 功能详解

### 首页功能

- ✅ 全屏封面背景（模糊效果 + 渐变叠加）
- ✅ 浪漫粒子漂浮动画
- ✅ 背景音乐控制（可开关）
- ✅ 两个选择按钮（照片旅程 / 回忆录音）
- ✅ 淡入渐显动画

### 照片时光旅程功能

- ✅ 垂直时间线布局
- ✅ 卡片式展示（图片 + 文字 + 标签）
- ✅ 滚动触发淡入动画
- ✅ 图片悬停放大效果
- ✅ 时间线进度指示器
- ✅ 响应式左右交错布局（桌面端）

### 回忆录音功能

- ✅ 音频播放控制
- ✅ 音频可视化效果（柱状图动画）
- ✅ 波形背景动画
- ✅ 自动暂停其他音频
- ✅ 播放状态指示

## 📱 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ 移动端浏览器

## 💡 使用技巧

### 图片优化建议

1. **压缩图片** - 使用 [TinyPNG](https://tinypng.com/) 或 [Squoosh](https://squoosh.app/) 压缩图片
2. **适当尺寸** - 背景图 ≤ 500KB，照片 ≤ 200KB
3. **推荐格式** - JPEG（照片）/ PNG（图标）/ WebP（更小体积）

### 音频优化建议

1. **音频压缩** - 使用 [Audacity](https://www.audacityteam.org/) 导出为 128kbps MP3
2. **文件大小** - 单个文件 ≤ 5MB
3. **时长控制** - 背景音乐建议 2-3 分钟，录音建议 30 秒 - 2 分钟

### 性能优化

- 图片已启用懒加载
- 使用 CSS 动画而非 JavaScript
- 滚动事件使用了防抖优化
- 合理使用 Intersection Observer API

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - Flexbox、Grid、动画、渐变、滤镜
- **JavaScript (ES6+)** - 原生 JS，无框架依赖
  - Intersection Observer API（滚动动画）
  - Web Audio API（音频控制）
  - CSS Variables（主题变量）

## 📝 常见问题

### Q: 音频无法播放？
A: 确保音频文件路径正确，且格式为浏览器支持的格式（MP3/WAV/OGG）。注意某些浏览器需要用户交互才能播放音频。

### Q: 图片显示不出来？
A: 检查图片路径是否正确，确保图片文件已上传到 `assets/img/` 目录。

### Q: 移动端动画卡顿？
A: 减少粒子数量（修改 `main.js` 中的 `particleCount`），或关闭某些动画效果。

### Q: 如何添加更多页面？
A: 复制现有 HTML 文件，修改内容，然后在首页或导航中添加链接即可。

### Q: 可以更改字体吗？
A: 可以！在 HTML 的 `<head>` 中更改 Google Fonts 链接，然后在 CSS 中修改 `--font-sans` 变量。

## 📄 许可证

此项目仅供个人学习和使用。如需商用请联系作者。

## 💌 致谢

感谢所有让这个项目成为可能的开源技术和工具。

---

**用爱制作 ❤️**

如果这个项目帮助到你，请给一个 ⭐️ Star！

---

## 📮 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](../../issues)
- 发起 [Pull Request](../../pulls)

---

**祝你和 TA 幸福美满！** 🌹

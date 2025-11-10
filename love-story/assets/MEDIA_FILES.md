# 📸 图片和音频文件说明

由于这是一个示例项目，`assets/img/` 和 `assets/audio/` 目录下的媒体文件需要你自己添加。

## 🖼️ 需要的图片文件

请准备以下图片并放入 `assets/img/` 目录：

### 首页背景图
- **文件名**: `background.jpg`
- **推荐尺寸**: 1920 x 1080 像素
- **建议内容**: 浪漫的风景、城市夜景、星空、海边等
- **文件大小**: ≤ 500KB（建议压缩）

### 时间线照片
- **文件名**: `memory-1.jpg` ~ `memory-5.jpg`
- **推荐尺寸**: 800 x 600 像素（或 4:3 比例）
- **建议内容**: 你们的合影、重要时刻的照片
- **文件大小**: 每张 ≤ 200KB

## 🎵 需要的音频文件

请准备以下音频并放入 `assets/audio/` 目录：

### 背景音乐
- **文件名**: `background.mp3`
- **建议内容**: 轻柔的钢琴曲、你们喜欢的歌曲（纯音乐版）
- **时长**: 2-3 分钟（循环播放）
- **文件大小**: ≤ 5MB

### 回忆录音
- **文件名**: `memory-1.mp3` ~ `memory-4.mp3`
- **建议内容**: 
  - 表白录音
  - 一起唱的歌
  - 有纪念意义的对话
  - 你想对 TA 说的话
- **时长**: 30秒 - 2分钟
- **文件大小**: 每个 ≤ 3MB

## 🎨 如何获取免费图片

如果暂时没有合适的照片，可以从以下网站获取免费高质量图片：

1. **[Unsplash](https://unsplash.com/)** - 高质量免费图片
   - 搜索关键词: "romance", "sunset", "couple", "love"
   
2. **[Pexels](https://www.pexels.com/)** - 免费图片和视频
   - 搜索关键词: "romantic", "heart", "pink sky"
   
3. **[Pixabay](https://pixabay.com/)** - 免费图片
   - 搜索关键词: "love", "couple silhouette", "cherry blossom"

## 🎼 如何获取免费音乐

1. **[YouTube Audio Library](https://studio.youtube.com/channel/UC/music)** - YouTube 免费音乐库
   - 类型选择: Ambient, Romantic, Calm
   
2. **[Free Music Archive](https://freemusicarchive.org/)** - 免费音乐
   - 搜索: "piano", "romantic", "acoustic"
   
3. **[Bensound](https://www.bensound.com/)** - 免费背景音乐
   - 推荐: "Tenderness", "Romantic", "Sweet"

⚠️ **注意**: 使用他人作品请遵守版权协议，仅供个人使用。

## 🛠️ 图片处理工具

### 在线压缩工具
- **[TinyPNG](https://tinypng.com/)** - 图片压缩（无损/有损）
- **[Squoosh](https://squoosh.app/)** - Google 图片压缩工具
- **[Compressor.io](https://compressor.io/)** - 图片压缩

### 在线裁剪工具
- **[Crop Image](https://www.iloveimg.com/crop-image)** - 在线裁剪
- **[PhotoScissors](https://photoscissors.com/)** - 抠图工具

### 音频处理工具
- **[Audacity](https://www.audacityteam.org/)** - 免费音频编辑软件（桌面端）
- **[Online Audio Converter](https://online-audio-converter.com/)** - 在线音频格式转换

## 📐 推荐尺寸参考

| 图片类型 | 尺寸 | 比例 | 用途 |
|---------|------|------|------|
| 首页背景 | 1920x1080 | 16:9 | 全屏背景 |
| 时间线照片 | 800x600 | 4:3 | 卡片展示 |
| 小图标 | 512x512 | 1:1 | 图标/Logo |

## ✅ 文件检查清单

部署前请确保：

- [ ] `assets/img/background.jpg` - 首页背景图
- [ ] `assets/img/memory-1.jpg` - 时间线照片 1
- [ ] `assets/img/memory-2.jpg` - 时间线照片 2
- [ ] `assets/img/memory-3.jpg` - 时间线照片 3
- [ ] `assets/img/memory-4.jpg` - 时间线照片 4
- [ ] `assets/img/memory-5.jpg` - 时间线照片 5
- [ ] `assets/audio/background.mp3` - 背景音乐（可选）
- [ ] `assets/audio/memory-1.mp3` - 录音 1（可选）
- [ ] `assets/audio/memory-2.mp3` - 录音 2（可选）
- [ ] `assets/audio/memory-3.mp3` - 录音 3（可选）
- [ ] `assets/audio/memory-4.mp3` - 录音 4（可选）

## 💡 快速测试

如果想快速测试网站效果，可以暂时：

1. 使用纯色背景代替图片（修改 CSS）
2. 注释掉音频相关代码
3. 使用占位图片服务（如下）

### 临时占位图片

在正式照片准备好之前，可以使用占位图片服务：

```html
<!-- 替换 img 标签的 src -->
<img src="https://via.placeholder.com/800x600/ff6b9d/ffffff?text=Memory+1" alt="回忆1">
```

这样可以先看到整体效果，之后再替换成真实照片。

---

准备好所有媒体文件后，网站就可以完美运行了！🎉

// ========================================
// 首页 JavaScript - 粒子效果与音乐控制
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === 全局音乐管理器 ===
    // 只在没有创建过的情况下才创建新实例
    if (!window.GlobalMusicManager) {
        window.GlobalMusicManager = new MusicManager();
    } else {
        // 如果已存在，更新按钮状态
        setTimeout(() => {
            window.GlobalMusicManager.updateAllButtons();
        }, 100);
    }
    
    // === 密码验证 ===
    initPasswordProtection();
    
    // === 粒子效果 ===
    createParticles();
    
    // === 星光特效 ===
    createStars();
    
    // === 爱心飘落特效 ===
    createFallingHearts();
    
    // === 背景音乐控制 ===
    initMusicControl();
    
    // === 页面加载动画 ===
    initPageAnimation();
});

/**
 * 全局音乐管理器
 */
class MusicManager {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.3;
        this.musicUrl = 'assets/audio/background.mp3';
        this.initialized = false;
        this.pausedForAudio = false; // 标记是否因为播放其他音频而暂停
        this.init();
    }
    
    init() {
        if (this.initialized) {
            console.log('音乐管理器已初始化，跳过重复初始化');
            return;
        }
        
        console.log('初始化音乐管理器...');
        
        // 创建全局音频对象
        this.audio = new Audio(this.musicUrl);
        this.audio.loop = true;
        this.audio.volume = this.volume;
        
        // 添加音频事件监听
        this.audio.addEventListener('loadeddata', () => {
            console.log('音频文件加载成功');
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('音频加载失败:', e);
        });
        
        // 监听播放状态
        this.audio.addEventListener('play', () => {
            console.log('音乐开始播放');
            this.isPlaying = true;
            this.updateAllButtons();
            localStorage.setItem('bgMusicPlaying', 'true');
        });
        
        this.audio.addEventListener('pause', () => {
            console.log('音乐暂停');
            this.isPlaying = false;
            this.updateAllButtons();
            // 只有不是因为其他音频而暂停时才更新localStorage
            if (!this.pausedForAudio) {
                localStorage.setItem('bgMusicPlaying', 'false');
            }
        });
        
        // 防止页面卸载时暂停音乐
        window.addEventListener('beforeunload', (e) => {
            // 不要在这里暂停音乐，让它继续播放
            console.log('页面即将卸载，保持音乐播放状态');
        });
        
        // 页面可见性改变时保持音乐播放
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.shouldPlay()) {
                console.log('页面重新可见，恢复音乐');
                setTimeout(() => this.play(), 100);
            }
        });
        
        this.initialized = true;
        
        // 恢复播放状态
        if (this.shouldPlay()) {
            console.log('检测到应该播放音乐，开始播放');
            setTimeout(() => this.play(), 500);
        }
    }
    
    shouldPlay() {
        const wasPlaying = localStorage.getItem('bgMusicPlaying');
        const isUnlocked = sessionStorage.getItem('loveStoryUnlocked');
        return wasPlaying === 'true' && isUnlocked === 'true';
    }
    
    tryPlay() {
        // 尝试播放，用于密码验证后自动播放
        console.log('tryPlay被调用');
        this.play();
    }
    
    play() {
        console.log('尝试播放音乐，当前状态:', this.isPlaying);
        
        if (!this.audio) {
            console.error('音频对象不存在');
            return;
        }
        
        if (this.isPlaying) {
            console.log('音乐已在播放中');
            return;
        }
        
        // 重置暂停标志
        this.pausedForAudio = false;
        
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('背景音乐播放成功');
                })
                .catch(error => {
                    console.log('音乐播放失败:', error);
                    // 设置一个标志，表示用户需要手动开始播放
                    if (error.name === 'NotAllowedError') {
                        console.log('自动播放被阻止，用户需要手动点击');
                    }
                });
        }
    }
    
    pause() {
        console.log('暂停音乐');
        if (this.audio && this.isPlaying) {
            this.audio.pause();
        }
    }
    
    // 为音频内容暂停背景音乐
    pauseForAudio() {
        console.log('因播放其他音频而暂停背景音乐');
        if (this.audio && this.isPlaying) {
            this.pausedForAudio = true;
            this.audio.pause();
        }
    }
    
    // 音频内容结束后恢复背景音乐
    resumeAfterAudio() {
        console.log('其他音频结束，尝试恢复背景音乐');
        if (this.pausedForAudio && this.shouldPlay()) {
            this.play();
        }
    }
    
    toggle() {
        console.log('切换音乐状态，当前播放状态:', this.isPlaying);
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    isEnabled() {
        return this.shouldPlay();
    }
    
    updateAllButtons() {
        console.log('更新按钮状态，播放中:', this.isPlaying);
        // 更新所有页面的音乐按钮状态
        const musicButtons = document.querySelectorAll('.music-toggle');
        musicButtons.forEach(button => {
            if (this.isPlaying) {
                button.classList.remove('paused');
            } else {
                button.classList.add('paused');
            }
        });
    }
}

/**
 * 密码验证系统
 */
function initPasswordProtection() {
    const overlay = document.getElementById('passwordOverlay');
    const input = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('passwordSubmit');
    const errorMsg = document.getElementById('passwordError');
    const correctPassword = '1123';
    
    // 检查是否已经验证过
    const isUnlocked = sessionStorage.getItem('loveStoryUnlocked');
    if (isUnlocked === 'true') {
        overlay.classList.add('hidden');
        // 自动播放音乐
        setTimeout(() => window.GlobalMusicManager.play(), 500);
        return;
    }
    
    // 提交密码
    function checkPassword() {
        const password = input.value.trim();
        
        if (password === correctPassword) {
            // 密码正确
            sessionStorage.setItem('loveStoryUnlocked', 'true');
            overlay.classList.add('hidden');
            
            // 自动播放背景音乐
            window.GlobalMusicManager.play();
            
            input.classList.remove('error');
            errorMsg.classList.remove('show');
        } else {
            // 密码错误
            input.classList.add('error');
            errorMsg.classList.add('show');
            input.value = '';
            
            setTimeout(() => {
                input.classList.remove('error');
                errorMsg.classList.remove('show');
            }, 2000);
        }
    }
    
    // 按钮点击
    submitBtn.addEventListener('click', checkPassword);
    
    // 回车键提交
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // 自动聚焦输入框
    setTimeout(() => input.focus(), 500);
}

/**
 * 创建星光特效
 */
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    const starCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // 随机大小
        const size = Math.random() * 3 + 1;
        
        // 随机动画时长
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            --duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        starsContainer.appendChild(star);
    }
    
    // 创建流星
    setInterval(() => {
        if (Math.random() > 0.7) {
            createShootingStar();
        }
    }, 3000);
}

/**
 * 创建流星
 */
function createShootingStar() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    const star = document.createElement('div');
    star.className = 'star shooting';
    
    const startX = Math.random() * 50;
    const startY = Math.random() * 50;
    
    star.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
        width: 100px;
        height: 2px;
    `;
    
    starsContainer.appendChild(star);
    
    // 动画结束后移除
    setTimeout(() => star.remove(), 3000);
}

/**
 * 创建爱心飘落特效
 */
function createFallingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;
    
    const heartCount = window.innerWidth < 768 ? 10 : 20;
    
    for (let i = 0; i < heartCount; i++) {
        createHeart();
    }
    
    // 持续创建新的爱心
    setInterval(() => {
        if (Math.random() > 0.5) {
            createHeart();
        }
    }, 2000);
}

/**
 * 创建单个爱心
 */
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '♥';
    
    // 随机位置
    const left = Math.random() * 100;
    
    // 随机大小
    const size = Math.random() * 20 + 15;
    
    // 随机动画时长
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;
    
    heart.style.cssText = `
        left: ${left}%;
        --size: ${size}px;
        --duration: ${duration}s;
        --delay: ${delay}s;
    `;
    
    heartsContainer.appendChild(heart);
    
    // 动画结束后移除并创建新的
    setTimeout(() => {
        heart.remove();
        if (Math.random() > 0.3) {
            createHeart();
        }
    }, (duration + delay) * 1000);
}

/**
 * 创建漂浮粒子效果
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    const colors = ['#ff6b9d', '#ffc2d1', '#ffb199', '#c9a0dc'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机样式
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 10;
        const animationDelay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${left}%;
            bottom: -10px;
            opacity: ${opacity};
            animation: float-up ${animationDuration}s linear ${animationDelay}s infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // 添加动画样式
    if (!document.getElementById('particle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes float-up {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}



/**
 * 初始化音乐控制
 */
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    
    if (!musicToggle) {
        console.log('未找到音乐控制按钮');
        return;
    }
    
    console.log('找到音乐控制按钮，绑定事件');
    
    // 绑定点击事件到全局音乐管理器
    musicToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('音乐按钮被点击');
        if (window.GlobalMusicManager) {
            window.GlobalMusicManager.toggle();
        } else {
            console.error('全局音乐管理器不存在');
        }
    });
    
    // 初始化按钮状态
    setTimeout(() => {
        if (window.GlobalMusicManager) {
            window.GlobalMusicManager.updateAllButtons();
            console.log('音乐按钮状态已初始化');
        }
    }, 200);
}

/**
 * 页面加载动画
 */
function initPageAnimation() {
    // 页面加载完成后触发动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // 为按钮添加涟漪效果
    const choiceButtons = document.querySelectorAll('.choice-btn');
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // 添加涟漪动画样式
    if (!document.getElementById('ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple-effect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * 平滑滚动
 */
function smoothScroll(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// 导出函数供其他脚本使用
window.LoveStory = {
    smoothScroll
};

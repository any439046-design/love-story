// ========================================
// 首页 JavaScript - 粒子效果与音乐控制
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
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
        autoPlayMusic();
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
            autoPlayMusic();
            
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
 * 自动播放音乐
 */
function autoPlayMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!bgMusic) return;
    
    // 设置音量
    bgMusic.volume = 0.3;
    
    // 移除暂停状态（显示播放中图标）
    if (musicToggle) {
        musicToggle.classList.remove('paused');
    }
    
    // 恢复播放位置
    const savedTime = parseFloat(localStorage.getItem('bgMusicTime') || '0');
    bgMusic.currentTime = savedTime;
    
    console.log('🎵 尝试自动播放音乐，从', savedTime.toFixed(2), '秒开始');
    
    // 尝试播放
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // 播放成功
                localStorage.setItem('bgMusicPlaying', 'true');
                console.log('✅ 背景音乐播放成功');
            })
            .catch(error => {
                console.warn('⚠️ 自动播放失败:', error.message);
                if (musicToggle) {
                    musicToggle.classList.add('paused');
                }
            });
    }
}

/**
 * 初始化音乐控制
 */
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!musicToggle || !bgMusic) return;
    
    // 设置音量
    bgMusic.volume = 0.3;
    
    // 不在这里初始化按钮状态，让 autoPlayMusic() 或用户交互来控制
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            // 当前是暂停状态，点击播放
            bgMusic.play().catch(error => {
                console.log('播放失败:', error);
            });
        } else {
            // 当前在播放，点击暂停
            bgMusic.pause();
        }
    });
    
    // 监听音频播放状态
    bgMusic.addEventListener('play', function() {
        console.log('🎵 Music playing');
        musicToggle.classList.remove('paused');
        localStorage.setItem('bgMusicPlaying', 'true');
    });
    
    bgMusic.addEventListener('pause', function() {
        console.log('⏸️ Music paused');
        musicToggle.classList.add('paused');
        localStorage.setItem('bgMusicPlaying', 'false');
    });
    
    // 定期保存音乐播放位置（每秒保存）
    bgMusic.addEventListener('timeupdate', function() {
        if (!bgMusic.paused) {
            localStorage.setItem('bgMusicTime', bgMusic.currentTime.toString());
        }
    });
    
    // 离开页面前保存状态
    window.addEventListener('beforeunload', () => {
        if (!bgMusic.paused) {
            localStorage.setItem('bgMusicPlaying', 'true');
            localStorage.setItem('bgMusicTime', bgMusic.currentTime.toString());
        } else {
            localStorage.setItem('bgMusicPlaying', 'false');
        }
    });
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

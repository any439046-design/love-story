// ========================================
// 音频页面 JavaScript - 音频播放控制与可视化
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === 背景音乐控制 ===
    initBackgroundMusic();
    
    // === 滚动动画 ===
    initScrollAnimations();
    
    // === 音频播放控制 ===
    initAudioPlayers();
    
    // === 音频可视化动画 ===
    initAudioVisualizer();
    
    // === 波形背景动画 ===
    initWaveAnimation();
    
});

/**
 * 初始化背景音乐控制
 */
function initBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;
    
    // 页面加载时检查音乐状态
    const shouldPlay = localStorage.getItem('bgMusicPlaying') === 'true';
    if (shouldPlay) {
        bgMusic.currentTime = parseFloat(localStorage.getItem('bgMusicTime') || '0');
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Auto-play prevented:', error);
            });
        }
    }
    
    // 离开页面前保存音乐状态
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
 * 初始化滚动动画
 */
function initScrollAnimations() {
    const audioCards = document.querySelectorAll('.audio-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    audioCards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * 初始化音频播放器
 */
function initAudioPlayers() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    const bgMusic = document.getElementById('bgMusic');
    
    audioPlayers.forEach((audio, index) => {
        // 设置音量
        audio.volume = 0.7;
        
        // 播放时暂停其他音频和背景音乐
        audio.addEventListener('play', function() {
            audioPlayers.forEach((otherAudio, otherIndex) => {
                if (otherIndex !== index && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
            
            // 暂停背景音乐
            if (bgMusic && !bgMusic.paused) {
                bgMusic.pause();
                // 标记背景音乐被录音暂停
                bgMusic.dataset.pausedByRecording = 'true';
            }
            
            // 激活对应的可视化器
            const visualizer = this.parentElement.querySelector('.audio-visualizer');
            if (visualizer) {
                visualizer.classList.add('active');
            }
        });
        
        // 暂停时停止可视化
        audio.addEventListener('pause', function() {
            const visualizer = this.parentElement.querySelector('.audio-visualizer');
            if (visualizer) {
                visualizer.classList.remove('active');
            }
        });
        
        // 播放结束时停止可视化并恢复背景音乐
        audio.addEventListener('ended', function() {
            const visualizer = this.parentElement.querySelector('.audio-visualizer');
            if (visualizer) {
                visualizer.classList.remove('active');
            }
            
            // 恢复背景音乐（如果之前是播放状态）
            if (bgMusic && bgMusic.dataset.pausedByRecording === 'true') {
                const shouldResume = localStorage.getItem('bgMusicPlaying') === 'true';
                if (shouldResume) {
                    bgMusic.play().catch(error => {
                        console.log('Resume background music failed:', error);
                    });
                }
                delete bgMusic.dataset.pausedByRecording;
            }
        });
        
        // 添加加载错误处理
        audio.addEventListener('error', function(e) {
            console.log(`音频 ${index + 1} 加载失败，这是正常的（示例项目）`);
            // 在实际项目中，你可以显示错误信息或提供替代音频
        });
    });
}

/**
 * 初始化音频可视化器
 */
function initAudioVisualizer() {
    const visualizers = document.querySelectorAll('.audio-visualizer');
    
    visualizers.forEach(visualizer => {
        const bars = visualizer.querySelectorAll('.bar');
        
        // 为每个柱子设置随机动画
        bars.forEach((bar, index) => {
            const randomHeight = Math.random() * 30 + 10;
            const randomDuration = Math.random() * 0.5 + 0.5;
            
            bar.style.setProperty('--random-height', `${randomHeight}px`);
            bar.style.animationDuration = `${randomDuration}s`;
        });
    });
    
    // 添加自定义动画样式
    if (!document.getElementById('visualizer-animation-style')) {
        const style = document.createElement('style');
        style.id = 'visualizer-animation-style';
        style.textContent = `
            .audio-visualizer:not(.active) .bar {
                animation-play-state: paused;
                height: 20px;
            }
            
            .audio-visualizer.active .bar {
                animation-play-state: running;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * 波形背景动画增强
 */
function initWaveAnimation() {
    const waves = document.querySelectorAll('.wave');
    
    // 为波形添加交互效果
    let mouseY = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseY = e.clientY / window.innerHeight;
    });
    
    function animateWaves() {
        currentY += (mouseY - currentY) * 0.05;
        
        waves.forEach((wave, index) => {
            const offset = currentY * 30 * (index + 1);
            wave.style.transform = `translateY(${offset}px)`;
        });
        
        requestAnimationFrame(animateWaves);
    }
    
    // 可选：启用鼠标交互效果
    // animateWaves();
}

/**
 * 创建自定义音频播放器UI（高级功能）
 */
function createCustomAudioPlayer(audioElement) {
    const wrapper = audioElement.parentElement;
    
    // 创建自定义控制器容器
    const customPlayer = document.createElement('div');
    customPlayer.className = 'custom-audio-player';
    customPlayer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--light-pink);
        border-radius: 16px;
        margin-top: 12px;
    `;
    
    // 播放/暂停按钮
    const playBtn = document.createElement('button');
    playBtn.className = 'play-btn';
    playBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `;
    playBtn.style.cssText = `
        width: 48px;
        height: 48px;
        border: none;
        background: var(--gradient-pink);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
        flex-shrink: 0;
    `;
    
    // 进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        flex-grow: 1;
        height: 6px;
        background: rgba(255, 107, 157, 0.2);
        border-radius: 3px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: var(--gradient-pink);
        border-radius: 3px;
        transition: width 0.1s linear;
    `;
    progressBar.appendChild(progressFill);
    
    // 时间显示
    const timeDisplay = document.createElement('span');
    timeDisplay.className = 'time-display';
    timeDisplay.textContent = '0:00 / 0:00';
    timeDisplay.style.cssText = `
        font-size: 0.85rem;
        color: var(--dark-gray);
        min-width: 80px;
        text-align: right;
    `;
    
    // 组装播放器
    customPlayer.appendChild(playBtn);
    customPlayer.appendChild(progressBar);
    customPlayer.appendChild(timeDisplay);
    
    // 隐藏原生播放器
    audioElement.style.display = 'none';
    wrapper.insertBefore(customPlayer, audioElement);
    
    // 绑定事件
    playBtn.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            playBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            `;
        } else {
            audioElement.pause();
            playBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            `;
        }
    });
    
    // 更新进度
    audioElement.addEventListener('timeupdate', function() {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressFill.style.width = progress + '%';
        
        const currentMin = Math.floor(audioElement.currentTime / 60);
        const currentSec = Math.floor(audioElement.currentTime % 60);
        const durationMin = Math.floor(audioElement.duration / 60) || 0;
        const durationSec = Math.floor(audioElement.duration % 60) || 0;
        
        timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${durationMin}:${durationSec.toString().padStart(2, '0')}`;
    });
    
    // 点击进度条跳转
    progressBar.addEventListener('click', function(e) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        audioElement.currentTime = audioElement.duration * percentage;
    });
    
    // 播放结束重置按钮
    audioElement.addEventListener('ended', function() {
        playBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        `;
    });
}

/**
 * 添加卡片悬停音效提示（可选）
 */
function initCardHoverEffects() {
    const audioCards = document.querySelectorAll('.audio-card:not(.special-card)');
    
    audioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 可选：启用自定义音频播放器
// const audioElements = document.querySelectorAll('.audio-player');
// audioElements.forEach(audio => createCustomAudioPlayer(audio));

// 启用卡片悬停效果
initCardHoverEffects();

/**
 * 添加键盘控制（可选）
 */
function initKeyboardControls() {
    let currentAudioIndex = 0;
    const audioPlayers = Array.from(document.querySelectorAll('.audio-player'));
    
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            const currentAudio = audioPlayers[currentAudioIndex];
            if (currentAudio) {
                if (currentAudio.paused) {
                    currentAudio.play();
                } else {
                    currentAudio.pause();
                }
            }
        }
    });
}

// 可选：启用键盘控制
// initKeyboardControls();

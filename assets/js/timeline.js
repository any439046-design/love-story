// ========================================
// 时间线页面 JavaScript - 滚动动画与图片懒加载
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === 滚动动画观察器 ===
    initScrollAnimations();
    
    // === 图片懒加载 ===
    initLazyLoading();
    
    // === 时间线进度指示器 ===
    initTimelineProgress();
    
});

/**
 * 初始化滚动动画
 * 使用 Intersection Observer API 实现元素进入视口时的动画
 */
function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // 创建观察器选项
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // 创建观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加动画类
                entry.target.classList.add('aos-animate');
                
                // 可选：动画完成后停止观察
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有时间线项目
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * 图片懒加载
 * 优化页面加载性能
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // 如果浏览器支持原生懒加载，直接返回
    if ('loading' in HTMLImageElement.prototype) {
        return;
    }
    
    // 否则使用 Intersection Observer
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * 时间线滚动进度指示器
 */
function initTimelineProgress() {
    const timelineLine = document.querySelector('.timeline-line');
    if (!timelineLine) return;
    
    // 创建进度指示器
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'timeline-progress';
    progressIndicator.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 0%;
        background: linear-gradient(
            to bottom,
            #ff6b9d 0%,
            #ffc2d1 100%
        );
        transition: height 0.3s ease-out;
        pointer-events: none;
    `;
    
    timelineLine.appendChild(progressIndicator);
    
    // 监听滚动事件
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateProgress() {
        const timelineContainer = document.querySelector('.timeline-container');
        if (!timelineContainer) return;
        
        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top + window.pageYOffset;
        const containerHeight = containerRect.height;
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // 计算滚动进度
        const scrollStart = containerTop - windowHeight + 200;
        const scrollEnd = containerTop + containerHeight - 200;
        const scrollProgress = (scrollPosition - scrollStart) / (scrollEnd - scrollStart);
        
        // 限制在 0-1 之间
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // 更新进度条
        progressIndicator.style.height = `${clampedProgress * 100}%`;
    }
    
    // 初始化时更新一次
    updateProgress();
}

/**
 * 为卡片添加视差效果（可选）
 */
function initParallaxEffect() {
    const cards = document.querySelectorAll('.timeline-card');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top + scrollY;
            const cardCenter = cardTop + card.offsetHeight / 2;
            const windowCenter = scrollY + window.innerHeight / 2;
            const distance = windowCenter - cardCenter;
            
            // 轻微的视差移动
            const parallaxOffset = distance * 0.02;
            
            if (Math.abs(distance) < window.innerHeight) {
                card.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    });
}

/**
 * 平滑返回顶部
 */
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    backBtn.addEventListener('click', function(e) {
        // 如果是返回首页，不阻止默认行为
        if (this.getAttribute('href') === 'index.html') {
            return;
        }
        
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 卡片点击放大效果（可选功能）
 */
function initCardImageModal() {
    const cardImages = document.querySelectorAll('.card-image img');
    
    cardImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 创建模态框
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                animation: fadeIn 0.3s ease-out;
            `;
            
            // 创建图片
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                animation: zoomIn 0.3s ease-out;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // 点击关闭
            modal.addEventListener('click', function() {
                modal.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => modal.remove(), 300);
            });
            
            // ESC 键关闭
            const escHandler = function(e) {
                if (e.key === 'Escape') {
                    modal.click();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        });
    });
    
    // 添加动画样式
    if (!document.getElementById('modal-animation-style')) {
        const style = document.createElement('style');
        style.id = 'modal-animation-style';
        style.textContent = `
            @keyframes zoomIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 可选：启用图片模态框功能
// initCardImageModal();

// 可选：启用视差效果（可能影响性能）
// initParallaxEffect();

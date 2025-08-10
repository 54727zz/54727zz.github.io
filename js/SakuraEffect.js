// PetalFlow.js - 唯美花瓣飘落效果
(function() {
    // 创建花瓣容器
    const petalContainer = document.createElement('div');
    petalContainer.id = 'petal-flow-container';
    petalContainer.style.position = 'fixed';
    petalContainer.style.top = '0';
    petalContainer.style.left = '0';
    petalContainer.style.width = '100%';
    petalContainer.style.height = '100%';
    petalContainer.style.pointerEvents = 'none';
    petalContainer.style.zIndex = '-1';
    petalContainer.style.overflow = 'hidden';
    document.body.appendChild(petalContainer);
    
    // 花瓣颜色 - 柔和的粉色系
    const petalColors = [
        'rgba(255, 218, 233, 0.7)',  // 浅粉
        'rgba(255, 192, 203, 0.7)',  // 粉红
        'rgba(255, 182, 193, 0.7)',  // 热粉
        'rgba(255, 209, 220, 0.7)',  // 淡粉
        'rgba(255, 228, 225, 0.7)'   // 粉白
    ];
    
    // 花瓣形状SVG
    const petalSVGs = [
        '<svg viewBox="0 0 100 100"><path d="M50,15 C60,10 80,20 85,35 C90,50 80,65 65,80 C50,95 35,90 20,80 C5,70 10,50 15,35 C20,20 40,20 50,15Z" fill="currentColor"/></svg>',
        '<svg viewBox="0 0 100 100"><path d="M50,10 C65,5 85,15 90,30 C95,45 85,60 70,75 C55,90 40,85 25,75 C10,65 15,45 20,30 C25,15 35,15 50,10Z" fill="currentColor"/></svg>',
        '<svg viewBox="0 0 100 100"><path d="M50,20 C58,15 75,25 80,40 C85,55 75,70 60,80 C45,90 35,85 25,75 C15,65 20,45 25,35 C30,25 42,25 50,20Z" fill="currentColor"/></svg>'
    ];
    
    // 创建花瓣
    function createPetal() {
        const petal = document.createElement('div');
        petal.style.position = 'absolute';
        petal.style.width = `${Math.random() * 30 + 20}px`; // 20-50px
        petal.style.height = 'auto';
        petal.style.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.innerHTML = petalSVGs[Math.floor(Math.random() * petalSVGs.length)];
        petal.style.opacity = '0';
        petalContainer.appendChild(petal);
        
        return petal;
    }
    
    // 动画花瓣
    function animatePetal(petal) {
        // 随机起始位置
        const startX = Math.random() * window.innerWidth;
        const startY = -50;
        
        // 随机结束位置
        const endX = startX + (Math.random() * 200 - 100); // 左右偏移 -100px 到 100px
        const endY = window.innerHeight + 50;
        
        // 随机旋转
        const rotation = Math.random() * 360;
        
        // 随机动画时间 (8-15秒)
        const duration = Math.random() * 7 + 8;
        
        // 随机延迟 (0-3秒)
        const delay = Math.random() * 3;
        
        // 设置初始位置
        petal.style.left = `${startX}px`;
        petal.style.top = `${startY}px`;
        petal.style.transform = `rotate(${rotation}deg)`;
        
        // 创建动画
        const keyframes = [
            { 
                transform: `translate(0, 0) rotate(${rotation}deg)`,
                opacity: 0 
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${rotation + 180}deg)`,
                opacity: 1 
            },
            { 
                transform: `translate(${(endX - startX) * 1.2}px, ${endY - startY + 50}px) rotate(${rotation + 360}deg)`,
                opacity: 0 
            }
        ];
        
        const options = {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        };
        
        // 开始动画
        const animation = petal.animate(keyframes, options);
        
        // 动画结束后移除元素并创建新花瓣
        animation.onfinish = () => {
            petal.remove();
            animatePetal(createPetal());
        };
    }
    
    // 创建多个花瓣
    function createPetals(count) {
        for (let i = 0; i < count; i++) {
            animatePetal(createPetal());
        }
    }
    
    // 初始创建花瓣
    createPetals(15);
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        // 移除所有花瓣
        while (petalContainer.firstChild) {
            petalContainer.firstChild.remove();
        }
        
        // 重新创建花瓣
        createPetals(15);
    });
})();
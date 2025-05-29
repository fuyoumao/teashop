// 🍵 可爱茶铺 UI 交互脚本

document.addEventListener('DOMContentLoaded', function() {
    initTabSystem();
    initInteractions();
    startAnimations();
});

// 🎯 初始化选项卡系统
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加活动状态
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // 添加点击效果
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
}

// 🎮 初始化交互效果
function initInteractions() {
    // 田地卡片点击效果
    const plotCards = document.querySelectorAll('.plot-card');
    plotCards.forEach(card => {
        card.addEventListener('click', () => {
            addRippleEffect(card);
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            addClickEffect(button);
        });
    });

    // 浮动购物车点击
    const floatingCart = document.querySelector('.floating-cart');
    if (floatingCart) {
        floatingCart.addEventListener('click', () => {
            showCartNotification();
        });
    }

    // 信息卡片悬停效果
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ✨ 添加波纹效果
function addRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(76, 175, 80, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${rect.width / 2 - size / 2}px;
        top: ${rect.height / 2 - size / 2}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 🎉 添加点击效果
function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    button.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)';
    
    setTimeout(() => {
        button.style.transform = '';
        button.style.boxShadow = '';
    }, 150);
}

// 🛒 显示购物车通知
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <span class="notification-icon">🎉</span>
        <span class="notification-text">购物车已打开！</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 16px;
        padding: 12px 16px;
        box-shadow: 0 6px 20px rgba(76, 175, 80, 0.2);
        display: flex;
        align-items: center;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 🌟 启动动画效果
function startAnimations() {
    // 随机闪烁效果
    setInterval(() => {
        const elements = document.querySelectorAll('.weather-icon, .customer-avatar, .coin-icon');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        if (randomElement) {
            randomElement.classList.add('sparkle');
            setTimeout(() => {
                randomElement.classList.remove('sparkle');
            }, 1500);
        }
    }, 3000);

    // 耐心值动态变化
    const patienceBar = document.querySelector('.patience-fill');
    if (patienceBar) {
        let patience = 85;
        setInterval(() => {
            patience = Math.max(0, patience - Math.random() * 2);
            patienceBar.style.width = `${patience}%`;
            
            const patienceText = document.querySelector('.patience-text');
            if (patienceText) {
                patienceText.textContent = `耐心：${Math.round(patience)}%`;
            }
            
            // 耐心值低时变红
            if (patience < 30) {
                patienceBar.style.background = 'linear-gradient(90deg, #F44336, #FF5722)';
            } else {
                patienceBar.style.background = 'linear-gradient(90deg, var(--accent-yellow), var(--primary-green))';
            }
        }, 2000);
    }

    // 制茶进度动画
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        let progress = 60;
        setInterval(() => {
            progress = Math.min(100, progress + Math.random() * 5);
            progressFill.style.width = `${progress}%`;
            
            if (progress >= 100) {
                // 制茶完成效果
                const stoveCard = progressFill.closest('.stove-card');
                if (stoveCard) {
                    stoveCard.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
                    stoveCard.querySelector('.recipe-name').textContent = '制作完成！';
                    stoveCard.querySelector('.cooking-timer').textContent = '🎉 可以收取';
                }
            }
        }, 1500);
    }
}

// 添加CSS动画定义
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .cart-notification .notification-icon {
        margin-right: 8px;
        font-size: 16px;
    }
    
    .cart-notification .notification-text {
        color: var(--text-dark);
        font-size: 14px;
        font-weight: 500;
    }
`;

document.head.appendChild(style); 
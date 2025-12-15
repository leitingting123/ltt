script.js
// JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化雪花效果
    createSnowflakes();
    
    // 初始化技能条动画
    initSkillBars();
    
    // 初始化导航栏
    initNavigation();
    
    // 初始化联系表单
    initContactForm();
    
    // 更新当前时间
    updateCurrentTime();
    
    // 加载保存的主题
    loadTheme();
    
    console.log('雷停停的个人博客已加载完成');
});

// 创建雪花效果
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 50; // 雪花数量
    
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowContainer);
    }
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // 随机大小 (3-8px)
    const size = Math.random() * 5 + 3;
    
    // 随机起始位置
    const startX = Math.random() * 100;
    const startY = -10;
    
    // 随机透明度
    const opacity = Math.random() * 0.7 + 0.3;
    
    // 随机下落速度
    const fallSpeed = Math.random() * 5 + 3;
    
    // 随机飘动幅度
    const swayAmplitude = Math.random() * 50 + 20;
    
    // 设置雪花样式
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.opacity = opacity;
    snowflake.style.left = `${startX}%`;
    snowflake.style.top = `${startY}%`;
    
    // 添加到容器
    container.appendChild(snowflake);
    
    // 雪花动画
    animateSnowflake(snowflake, fallSpeed, swayAmplitude);
}

function animateSnowflake(snowflake, fallSpeed, swayAmplitude) {
    let positionY = -10;
    let positionX = parseFloat(snowflake.style.left);
    let swayDirection = Math.random() > 0.5 ? 1 : -1;
    let swayCounter = 0;
    
    function moveSnowflake() {
        // 更新位置
        positionY += fallSpeed * 0.1;
        swayCounter += 0.05;
        
        // 左右飘动
        const swayX = Math.sin(swayCounter) * swayAmplitude * 0.1 * swayDirection;
        const currentX = positionX + swayX;
        
        // 应用新位置
        snowflake.style.top = `${positionY}%`;
        snowflake.style.left = `${currentX}%`;
        
        // 如果雪花落到底部，重新开始
        if (positionY > 100) {
            positionY = -10;
            positionX = Math.random() * 100;
            snowflake.style.left = `${positionX}%`;
        }
        
        // 继续动画
        requestAnimationFrame(moveSnowflake);
    }
    
    // 开始动画
    moveSnowflake();
}

// 切换雪花效果
function toggleSnow() {
    const snowContainer = document.getElementById('snow-container');
    const isVisible = snowContainer.style.display !== 'none';
    
    if (isVisible) {
        snowContainer.style.display = 'none';
        showNotification('雪花效果已关闭');
    } else {
        snowContainer.style.display = 'block';
        showNotification('雪花效果已开启');
    }
}

// 初始化技能条动画
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    // 监听滚动，当技能条进入视口时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                
                // 使用setTimeout确保宽度重置后被动画
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// 初始化导航栏
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有链接的激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的激活状态
            this.classList.add('active');
            
            // 平滑滚动到对应部分
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新导航激活状态
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// 卡片动画效果
function animateCard(card) {
    card.style.transform = 'translateY(-10px) scale(1.03)';
}

function resetCard(card) {
    card.style.transform = 'translateY(0) scale(1)';
}

// 切换主题
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (body.classList.contains('dark-theme')) {
        // 切换到浅色主题
        body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
        showNotification('已切换到浅色主题');
    } else {
        // 切换到深色主题
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
        showNotification('已切换到深色主题');
    }
}

// 加载保存的主题
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }
}

// 初始化联系表单
function initContactForm() {
    const contactForm = document.getElementById('messageForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            
            // 显示成功消息
            showNotification(`谢谢 ${name}，您的消息已发送成功！`);
            
            // 重置表单
            this.reset();
        });
    }
}

// 更新当前时间
function updateCurrentTime() {
    function update() {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = `当前时间: ${timeString}`;
        }
    }
    
    // 立即更新一次
    update();
    
    // 每秒更新一次
    setInterval(update, 1000);
}

// 显示通知消息
function showNotification(message) {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3498db, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 2000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    /* 深色主题样式 */
    body.dark-theme {
        --text-color: #f0f0f0;
        --text-light: #b0b0b0;
        --bg-color: #1a1a2e;
        --card-bg: #16213e;
        --shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    body.dark-theme .header {
        background-color: rgba(22, 33, 62, 0.95);
    }
    
    body.dark-theme .hero-section {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
    
    body.dark-theme .nav-link {
        color: #f0f0f0;
    }
    
    body.dark-theme .about-card,
    body.dark-theme .talent-item,
    body.dark-theme .hobby-card,
    body.dark-theme .contact-item,
    body.dark-theme .contact-form {
        background-color: #0f3460;
    }
    
    body.dark-theme .form-group input,
    body.dark-theme .form-group textarea {
        background-color: #1a1a2e;
        border-color: #2c3e50;
        color: #f0f0f0;
    }
    
    body.dark-theme .footer {
        background-color: #0c0c1a;
    }
`;
document.head.appendChild(style);
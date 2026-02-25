// 简历名片网站 - 交互脚本

document.addEventListener('DOMContentLoaded', () => {
    // 汉堡菜单
    initMobileMenu();

    // 平滑滚动
    initSmoothScroll();

    // 导航高亮
    initNavHighlight();

    // 卡片动画
    initCardAnimations();

    // 打字机效果
    initTypewriter();
});

// 汉堡菜单
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const links = menu.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // 点击链接关闭菜单
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 点击外部关闭
    menu.addEventListener('click', (e) => {
        if (e.target === menu) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 导航高亮
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 卡片动画
function initCardAnimations() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// 打字机效果
function initTypewriter() {
    const element = document.querySelector('.hero-tagline');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--accent)';

    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 2000);
        }
    }

    setTimeout(type, 1000);
}

// 页面加载完成后的额外动画
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

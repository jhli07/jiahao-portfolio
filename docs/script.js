/**
 * 李佳浩个人简历网站 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有功能
    initMobileMenu();
    initSmoothScroll();
    initNavHighlight();
    initAnimations();
    initSkillBars();
});

/**
 * 移动端汉堡菜单
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const links = menu ? menu.querySelectorAll('.nav-menu-link') : [];

    if (!toggle || !menu) return;

    // 切换菜单
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

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 导航高亮
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * 滚动动画
 */
function initAnimations() {
    // 视差效果
    const bgGlows = document.querySelectorAll('.bg-glow');
    if (bgGlows.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            bgGlows.forEach((glow, index) => {
                const speed = index === 0 ? 0.3 : 0.2;
                glow.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // 元素进入视口动画
    const animatedElements = document.querySelectorAll(
        '.about-main, .about-stats, .skill-card, .project-card, .stat-card, .contact-card'
    );

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

/**
 * 技能条动画
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.style.getPropertyValue('--progress');
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = progress;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/**
 * 页面加载完成
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

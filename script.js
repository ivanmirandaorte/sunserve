let lastScrollState = null;
let scrollHoverHandler = null;
let topHoverAdded = null;

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar'); 
    const logo = document.querySelector('.logo');
    const logoImg = document.querySelector('.logo > span > img');
    const navLinks = document.querySelectorAll('.x-anchor-menu-item .x-anchor-text-primary'); 
    const navParticles = document.querySelectorAll('.is-primary'); 
    const navCTA = document.querySelector('.m2r-t')
    const navCTAText = document.querySelector('.x-anchor-button .x-anchor-text-primary');

    const scrolled = window.scrollY; 

    const maxScroll = 200; 
    const minScale = 0.7; 
    const triggerPx = 10; 
    const scale = Math.max(minScale, 1 - (scrolled / maxScroll) * (1 - minScale));

    // fixed dimensions to prevent layout shift
    if (!logo.style.width) {
        const currentWidth = logo.offsetWidth;
        const currentHeight = logo.offsetHeight; 
        logo.style.width = currentWidth + 'px';
        logo.style.height = currentHeight + 'px';
    }

    // smooth transitions 
    nav.style.transition = 'background-color 0.3s ease'; 
    logo.style.transition = 'transform 0.3s ease, width 0.3s ease, height 0.3s ease'; 
    logoImg.style.transition = 'opacity 0.2s ease'; 

    // force image to fill container 
    logoImg.style.width = '100%';
    logoImg.style.height = '100%';
    logoImg.style.objectFit = 'contain';

    // transform orign to left side before scaling 
    logo.style.transformOrigin = 'left center';
    logo.style.transform = `scale(${scale})`;

    // add transition to nav links and particles with !important ** 
    navLinks.forEach(link => {
        link.style.setProperty('transition', 'color 0.3s ease', 'important');
    }); 

    navParticles.forEach(particle => {
        particle.style.setProperty('transition', 'color 0.3s ease', 'important');
    }); 

    if (navCTA) {
        navCTA.style.setProperty('transition', 'border-color 0.3s ease, color.03s ease');
    }

    const isScrolled = scrolled > triggerPx;
    
    // only change logo if the scroll state has changed 
    if (isScrolled && lastScrollState !== 'scrolled') {
        lastScrollState = 'scrolled';

        nav.style.backgroundColor = '#ffffff'; 

        logoImg.style.opacity = '0'; 
        setTimeout(() => {
            logoImg.src = 'https://sunserve.org/wp-content/uploads/2025/10/sunserve-logo.svg'; 
            logoImg.style.opacity = '1';
        }, 200);

        navLinks.forEach(link => {
            link.style.color = '#000000';
        });

        navParticles.forEach(particle => {
            particle.style.color = '#000000';
        });

        if (navCTA && topHoverAdded) {
            navCTA.removeEventListener('mouseenter', topHoverAdded.enter); 
            navCTA.removeEventListener('mouseleave', topHoverAdded.leave);
            topHoverAdded = null;
        }

        if (navCTA && !scrollHoverHandler) {
            const enterHandler = () => {
                navCTA.style.setProperty('border-color', '#000000', 'important');
                navCTAText.style.setProperty('color', '#000000', 'important');
            }

            const leaveHandler = () => {
                navCTA.style.setProperty('border-color', '', 'important');s
                navCTAText.style.setProperty('color', '', 'important');
            }

            navCTA.addEventListener('mouseenter', enterHandler); 
            navCTA.addEventListener('mouseleave', leaveHandler);

            scrollHoverHandler = {
                enter: enterHandler,
                leave: leaveHandler
            };
        }

    } else if (!isScrolled && lastScrollState !== 'top') {
        lastScrollState = 'top';

        nav.style.backgroundColor = 'transparent';
        
        logoImg.style.opacity = '0';
        setTimeout(() => {
            logoImg.src = 'https://sunserve.org/wp-content/uploads/2025/09/sunserve_logo_white.svg'; 
            logoImg.style.opacity = '1';
        }, 200)

        navLinks.forEach(link => {
            link.style.color = '#ffffff';
        })

        navParticles.forEach(particle => {
            particle.style.color = '#ffffff';
        });

        if (navCTA && scrollHoverHandler) {
            navCTA.removeEventListener('mouseenter', scrollHoverHandler.enter); 
            navCTA.removeEventListener('mouseleave', scrollHoverHandler.leave);
            scrollHoverHandler = null;
        }

        if (navCTA && !topHoverAdded) {
            const enterHandler = () => {
                navCTA.style.setProperty('border-color', '#ffffff', 'important');
                navCTAText.style.setProperty('color', '#ffffff', 'important');
            }

            const leaveHandler = () => {
                navCTA.style.setProperty('border-color', '', 'important');
                navCTAText.style.setProperty('color', '', 'important');
            }

            navCTA.addEventListener('mouseenter', enterHandler); 
            navCTA.addEventListener('mouseleave', leaveHandler);

            topHoverAdded = {
                enter: enterHandler,
                leave: leaveHandler
            };
        }
    };
});
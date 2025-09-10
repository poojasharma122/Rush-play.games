// Header JS Start
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
let sidebarOpen = false;

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOpen = true;
    document.body.style.overflow = 'hidden';
    if (menuBtn) menuBtn.innerHTML = '&times;';
    if (menuBtn) menuBtn.setAttribute('aria-label', 'Close menu');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOpen = false;
    document.body.style.overflow = '';
    if (menuBtn) menuBtn.innerHTML = '&#9776;';
    if (menuBtn) menuBtn.setAttribute('aria-label', 'Open menu');
}

function toggleSidebar() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

if (menuBtn) {
    menuBtn.addEventListener('click', toggleSidebar);
}

document.addEventListener('click', function (e) {
    if (window.innerWidth <= 991 && sidebarOpen) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            closeSidebar();
        }
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 991) {
        closeSidebar();
    }
});
// Header JS End

// AOS JS Start
AOS.init({
    duration: 1200,
});
// AOS JS End
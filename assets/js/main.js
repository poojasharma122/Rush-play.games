// Header JS Start
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
  
    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
    });
  
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  });
  
// Header JS End

// AOS JS Start
AOS.init({
    duration: 1200,
});
// AOS JS End


// cursor js start

$(window).mousemove(function (e) {
	$(".ring").css(
		"transform",
		`translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
	);
});

// cursor js end
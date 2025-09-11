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


// fqas start

const accordionItemh = document.querySelectorAll(".ko-accordion-item-header");
accordionItemh.forEach((accordionItemh) => {
  accordionItemh.addEventListener("click", (event) => {
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    //     const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    //     if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
    //        currentlyActiveAccordionItemHeader.classList.toggle("active");
    //        currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    //      }
    accordionItemh.classList.toggle("active");
    const accordionItemBody = accordionItemh.nextElementSibling;
    if (accordionItemh.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});


// faqs end
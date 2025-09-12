// Header JS Start
const menuToggle=document.getElementById("menuToggle");
const customNav=document.getElementById("customNav");
const menuOverlay=document.getElementById("menuOverlay");
const toggleIcon=menuToggle?menuToggle.querySelector("i"):null;

if(menuToggle&&customNav&&toggleIcon){
  menuToggle.addEventListener("click",()=>{
    customNav.classList.toggle("active");
    if(menuOverlay){menuOverlay.classList.toggle("active");}
    toggleIcon.classList.toggle("fa-bars");
    toggleIcon.classList.toggle("fa-times");
  });
}
if(menuOverlay&&customNav&&toggleIcon){
  menuOverlay.addEventListener("click",()=>{
    customNav.classList.remove("active");
    menuOverlay.classList.remove("active");
    toggleIcon.classList.add("fa-bars");
    toggleIcon.classList.remove("fa-times");
  });
}

// Modal functionality
const loginModalEl=document.getElementById('loginModal');
const signupModalEl=document.getElementById('signupModal');
const loginModal = loginModalEl ? new bootstrap.Modal(loginModalEl) : null;
const signupModal = signupModalEl ? new bootstrap.Modal(signupModalEl) : null;

// Login button click handlers
document.querySelectorAll('.custom-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const txt=this.textContent.trim();
    if (txt === 'LOGIN' && loginModal) {
      loginModal.show();
    } else if (txt === 'SIGN UP' && signupModal) {
      signupModal.show();
    }
  });
});

// Form validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('is-invalid');
  error.textContent = message;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove('is-invalid');
  error.textContent = '';
}

// Login form validation
const loginFormEl=document.getElementById('loginForm');
if(loginFormEl){
loginFormEl.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  let isValid = true;

  // Clear previous errors
  clearError('loginEmail', 'loginEmailError');
  clearError('loginPassword', 'loginPasswordError');

  // Validate email
  if (!email) {
    showError('loginEmail', 'loginEmailError', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('loginEmail', 'loginEmailError', 'Please enter a valid email');
    isValid = false;
  }

  // Validate password
  if (!password) {
    showError('loginPassword', 'loginPasswordError', 'Password is required');
    isValid = false;
  } else if (!validatePassword(password)) {
    showError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters');
    isValid = false;
  }

  if (isValid) {
    // Simulate login process
    alert('Login successful! Welcome to Rush Play Game!');
    if(loginModal){loginModal.hide();}
    this.reset();
  }
});
}

// Signup form validation
const signupFormEl=document.getElementById('signupForm');
if(signupFormEl){
signupFormEl.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const agreeTermsEl = document.getElementById('agreeTerms');
  const agreeTerms = agreeTermsEl ? agreeTermsEl.checked : true;
  
  let isValid = true;

  // Clear previous errors
  clearError('signupName', 'signupNameError');
  clearError('signupEmail', 'signupEmailError');
  clearError('signupPassword', 'signupPasswordError');
  clearError('confirmPassword', 'confirmPasswordError');
  if(agreeTermsEl){
    clearError('agreeTerms', 'agreeTermsError');
  }

  // Validate name
  if (!name) {
    showError('signupName', 'signupNameError', 'Full name is required');
    isValid = false;
  } else if (name.length < 2) {
    showError('signupName', 'signupNameError', 'Name must be at least 2 characters');
    isValid = false;
  }

  // Validate email
  if (!email) {
    showError('signupEmail', 'signupEmailError', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('signupEmail', 'signupEmailError', 'Please enter a valid email');
    isValid = false;
  }

  // Validate password
  if (!password) {
    showError('signupPassword', 'signupPasswordError', 'Password is required');
    isValid = false;
  } else if (!validatePassword(password)) {
    showError('signupPassword', 'signupPasswordError', 'Password must be at least 6 characters');
    isValid = false;
  }

  // Validate confirm password
  if (!confirmPassword) {
    showError('confirmPassword', 'confirmPasswordError', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
    isValid = false;
  }

  // Validate terms agreement (only if checkbox exists on page)
  if (agreeTermsEl && !agreeTerms) {
    showError('agreeTerms', 'agreeTermsError', 'You must agree to the terms and conditions');
    isValid = false;
  }

  if (isValid) {
    // Simulate signup process
    alert('Account created successfully! Welcome to Rush Play Game!');
    if(signupModal){signupModal.hide();}
    this.reset();
  }
});
}

// Real-time validation for signup form
const confirmPasswordEl=document.getElementById('confirmPassword');
if(confirmPasswordEl){
  confirmPasswordEl.addEventListener('input', function() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = this.value;
    if (confirmPassword && password !== confirmPassword) {
      showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
    } else {
      clearError('confirmPassword', 'confirmPasswordError');
    }
  });
}
  
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
if(accordionItemh && accordionItemh.length){
  accordionItemh.forEach((header) => {
    header.addEventListener("click", () => {
      header.classList.toggle("active");
      const body = header.nextElementSibling;
      if (header.classList.contains("active")) {
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        body.style.maxHeight = 0;
      }
    });
  });
}


// faqs end

// Slider JS Start
$('.home_games_slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  autoplay: true,
  slidesToShow: 3,      
  slidesToScroll: 1, 
  responsive: [
      {
          breakpoint: 1199,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
          }
      },
      {
          breakpoint: 575,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ],
  prevArrow: `<button class="slick-prev custom-arrow custom-prev" aria-label="Previous slide">
                 <svg  viewBox="0 0 32 72" xmlns="http://www.w3.org/2000/svg"><path stroke="#fcee0a" stroke-width="1.5" d="M31 71L1 35 31 1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>`,
  nextArrow: `<button class="slick-next custom-arrow custom-next" aria-label="Next slide">
                 <svg  viewBox="0 0 32 72" xmlns="http://www.w3.org/2000/svg"><path stroke="#fcee0a" stroke-width="1.5" d="M1 71l30-36L1 1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>`
});
// Slider JS End
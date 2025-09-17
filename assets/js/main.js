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
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
}

function validatePassword(password) {
  // Password must be at least 8 characters, contain at least one uppercase, one lowercase, and one number
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumbers,
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar
  };
}

function validateName(name) {
  // Name must be at least 2 characters, only letters, spaces, hyphens, and apostrophes
  const re = /^[a-zA-Z\s\-']{2,50}$/;
  return re.test(name.trim());
}

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input && error) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.style.borderColor = '#dc3545';
    input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
    error.textContent = message;
    error.style.color = '#dc3545';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
  }
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input && error) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.style.borderColor = '#28a745';
    input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
    error.textContent = '';
    error.style.display = 'none';
  }
}

function showSuccess(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input && error) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    input.style.borderColor = '#28a745';
    input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
    error.textContent = message;
    error.style.color = '#28a745';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
  }
}

function isFormValid(formType) {
  if (formType === 'login') {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    return email && validateEmail(email) && password && password.length >= 6;
  } else if (formType === 'signup') {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordValidation = validatePassword(password);
    
    return name && validateName(name) && 
           email && validateEmail(email) && 
           password && passwordValidation.isValid && 
           confirmPassword && password === confirmPassword;
  }
  return false;
}

function updateSubmitButton(formType) {
  const isValid = isFormValid(formType);
  let submitButton;
  
  if (formType === 'login') {
    submitButton = document.querySelector('#loginForm button[type="submit"]');
  } else if (formType === 'signup') {
    submitButton = document.querySelector('#signupForm button[type="submit"]');
  }
  
  if (submitButton) {
    submitButton.disabled = !isValid;
    if (isValid) {
      submitButton.style.opacity = '1';
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.style.opacity = '0.6';
      submitButton.style.cursor = 'not-allowed';
    }
  }
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
  } else if (password.length < 6) {
    showError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters');
    isValid = false;
  }

  if (isValid) {
    // Simulate login process
    alert('Login successful! Welcome to Rush Play Game!');
    if(loginModal){loginModal.hide();}
    this.reset();
  } else {
    // Prevent form submission and show general error message
    e.preventDefault();
    alert('Please fix the errors above before submitting the form.');
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
  } else if (!validateName(name)) {
    showError('signupName', 'signupNameError', 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes');
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
  } else {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      let errorMessage = 'Password must contain:';
      if (!passwordValidation.hasMinLength) errorMessage += ' at least 8 characters,';
      if (!passwordValidation.hasUpperCase) errorMessage += ' one uppercase letter,';
      if (!passwordValidation.hasLowerCase) errorMessage += ' one lowercase letter,';
      if (!passwordValidation.hasNumbers) errorMessage += ' one number,';
      errorMessage = errorMessage.slice(0, -1); // Remove last comma
      showError('signupPassword', 'signupPasswordError', errorMessage);
      isValid = false;
    }
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
  } else {
    // Prevent form submission and show general error message
    e.preventDefault();
    alert('Please fix the errors above before submitting the form.');
  }
});
}

// Real-time validation for signup form
const signupNameEl = document.getElementById('signupName');
const signupEmailEl = document.getElementById('signupEmail');
const signupPasswordEl = document.getElementById('signupPassword');
const confirmPasswordEl = document.getElementById('confirmPassword');

// Real-time validation for signup name
if(signupNameEl){
  signupNameEl.addEventListener('input', function() {
    const name = this.value.trim();
    if (name.length > 0) {
      if (validateName(name)) {
        showSuccess('signupName', 'signupNameError', '✓ Valid name');
      } else {
        showError('signupName', 'signupNameError', 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes');
      }
    } else {
      clearError('signupName', 'signupNameError');
    }
    updateSubmitButton('signup');
  });
}

// Real-time validation for signup email
if(signupEmailEl){
  signupEmailEl.addEventListener('input', function() {
    const email = this.value.trim();
    if (email.length > 0) {
      if (validateEmail(email)) {
        showSuccess('signupEmail', 'signupEmailError', '✓ Valid email');
      } else {
        showError('signupEmail', 'signupEmailError', 'Please enter a valid email address');
      }
    } else {
      clearError('signupEmail', 'signupEmailError');
    }
    updateSubmitButton('signup');
  });
}

// Real-time validation for signup password
if(signupPasswordEl){
  signupPasswordEl.addEventListener('input', function() {
    const password = this.value;
    if (password.length > 0) {
      const passwordValidation = validatePassword(password);
      if (passwordValidation.isValid) {
        showSuccess('signupPassword', 'signupPasswordError', '✓ Strong password');
      } else {
        let errorMessage = 'Password must contain:';
        if (!passwordValidation.hasMinLength) errorMessage += ' at least 8 characters,';
        if (!passwordValidation.hasUpperCase) errorMessage += ' one uppercase letter,';
        if (!passwordValidation.hasLowerCase) errorMessage += ' one lowercase letter,';
        if (!passwordValidation.hasNumbers) errorMessage += ' one number,';
        errorMessage = errorMessage.slice(0, -1); // Remove last comma
        showError('signupPassword', 'signupPasswordError', errorMessage);
      }
    } else {
      clearError('signupPassword', 'signupPasswordError');
    }
    updateSubmitButton('signup');
  });
}

// Real-time validation for confirm password
if(confirmPasswordEl){
  confirmPasswordEl.addEventListener('input', function() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = this.value;
    if (confirmPassword.length > 0) {
      if (password === confirmPassword && password.length > 0) {
        showSuccess('confirmPassword', 'confirmPasswordError', '✓ Passwords match');
      } else {
        showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
      }
    } else {
      clearError('confirmPassword', 'confirmPasswordError');
    }
    updateSubmitButton('signup');
  });
}

// Real-time validation for login form
const loginEmailEl = document.getElementById('loginEmail');
const loginPasswordEl = document.getElementById('loginPassword');

// Real-time validation for login email
if(loginEmailEl){
  loginEmailEl.addEventListener('input', function() {
    const email = this.value.trim();
    if (email.length > 0) {
      if (validateEmail(email)) {
        showSuccess('loginEmail', 'loginEmailError', '✓ Valid email');
      } else {
        showError('loginEmail', 'loginEmailError', 'Please enter a valid email address');
      }
    } else {
      clearError('loginEmail', 'loginEmailError');
    }
    updateSubmitButton('login');
  });
}

// Real-time validation for login password
if(loginPasswordEl){
  loginPasswordEl.addEventListener('input', function() {
    const password = this.value;
    if (password.length > 0) {
      if (password.length >= 6) {
        showSuccess('loginPassword', 'loginPasswordError', '✓ Valid password');
      } else {
        showError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters');
      }
    } else {
      clearError('loginPassword', 'loginPasswordError');
    }
    updateSubmitButton('login');
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
              dots: false
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
                 <svg  viewBox="0 0 32 72" xmlns="http://www.w3.org/2000/svg"><path stroke="#45f882" stroke-width="1.5" d="M31 71L1 35 31 1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>`,
  nextArrow: `<button class="slick-next custom-arrow custom-next" aria-label="Next slide">
                 <svg  viewBox="0 0 32 72" xmlns="http://www.w3.org/2000/svg"><path stroke="#45f882" stroke-width="1.5" d="M1 71l30-36L1 1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>`
});
// Slider JS End




document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop form submission for validation
  let isValid = true;

  // Email validation
  const email = document.getElementById("loginEmail");
  const emailError = document.getElementById("loginEmailError");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

  if (email.value.trim() === "") {
    email.classList.add("is-invalid");
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    email.classList.add("is-invalid");
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    emailError.textContent = "";
  }

  // Password validation
  const password = document.getElementById("loginPassword");
  const passwordError = document.getElementById("loginPasswordError");

  if (password.value.trim() === "") {
    password.classList.add("is-invalid");
    passwordError.textContent = "Password is required.";
    isValid = false;
  } else if (password.value.length < 6) {
    password.classList.add("is-invalid");
    passwordError.textContent = "Password must be at least 6 characters.";
    isValid = false;
  } else {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
    passwordError.textContent = "";
  }

  // If form is valid, you can submit or trigger AJAX
  if (isValid) {
    alert("Login successful! (You can replace this with real login logic)");
    this.reset();
    email.classList.remove("is-valid");
    password.classList.remove("is-valid");
  }
});
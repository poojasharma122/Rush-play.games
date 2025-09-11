// Header JS Start
const menuToggle=document.getElementById("menuToggle");
const customNav=document.getElementById("customNav");
const menuOverlay=document.getElementById("menuOverlay");
const toggleIcon=menuToggle.querySelector("i");

menuToggle.addEventListener("click",()=>{
  customNav.classList.toggle("active");
  menuOverlay.classList.toggle("active");
  toggleIcon.classList.toggle("fa-bars");
  toggleIcon.classList.toggle("fa-times");
});
menuOverlay.addEventListener("click",()=>{
  customNav.classList.remove("active");
  menuOverlay.classList.remove("active");
  toggleIcon.classList.add("fa-bars");
  toggleIcon.classList.remove("fa-times");
});

// Modal functionality
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));

// Login button click handlers
document.querySelectorAll('.custom-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.textContent.trim() === 'LOGIN') {
      loginModal.show();
    } else if (this.textContent.trim() === 'SIGN UP') {
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
document.getElementById('loginForm').addEventListener('submit', function(e) {
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
    loginModal.hide();
    this.reset();
  }
});

// Signup form validation
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  
  let isValid = true;

  // Clear previous errors
  clearError('signupName', 'signupNameError');
  clearError('signupEmail', 'signupEmailError');
  clearError('signupPassword', 'signupPasswordError');
  clearError('confirmPassword', 'confirmPasswordError');
  clearError('agreeTerms', 'agreeTermsError');

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

  // Validate terms agreement
  if (!agreeTerms) {
    showError('agreeTerms', 'agreeTermsError', 'You must agree to the terms and conditions');
    isValid = false;
  }

  if (isValid) {
    // Simulate signup process
    alert('Account created successfully! Welcome to Rush Play Game!');
    signupModal.hide();
    this.reset();
  }
});

// Real-time validation for signup form
document.getElementById('confirmPassword').addEventListener('input', function() {
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = this.value;
  
  if (confirmPassword && password !== confirmPassword) {
    showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
  } else {
    clearError('confirmPassword', 'confirmPasswordError');
  }
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
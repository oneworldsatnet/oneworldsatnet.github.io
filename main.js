// ملف جافاسكريبت خفيف لتحسين تجربة المستخدم
// يمكنك إضافة وظائف إضافية لاحقًا

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح! سنقوم بالتواصل معك قريبًا.');
    form.reset();
  });
});

// Slider for all image groups
function sliderInit(groupSelector, interval = 2000) {
  document.querySelectorAll(groupSelector).forEach(group => {
    const imgs = Array.from(group.querySelectorAll('img'));
    let idx = 0;
    imgs.forEach((img, i) => img.style.display = i === 0 ? 'block' : 'none');
    setInterval(() => {
      imgs[idx].style.display = 'none';
      idx = (idx + 1) % imgs.length;
      imgs[idx].style.display = 'block';
    }, interval);
  });
}
sliderInit('.hero-img-group');
sliderInit('.about-img-group');
sliderInit('.compare-img-group');
sliderInit('.plans-img-group');
sliderInit('.features-img-group');
sliderInit('.partners-img-group');
sliderInit('.invest-img-group');

// Country select with phone codes
const countries = [
  {name: 'United States', code: '+1'},
  {name: 'United Kingdom', code: '+44'},
  {name: 'Saudi Arabia', code: '+966'},
  {name: 'Egypt', code: '+20'},
  {name: 'UAE', code: '+971'},
  {name: 'Germany', code: '+49'},
  {name: 'France', code: '+33'},
  {name: 'India', code: '+91'},
  {name: 'China', code: '+86'},
  {name: 'Brazil', code: '+55'},
  {name: 'South Africa', code: '+27'},
  {name: 'Russia', code: '+7'},
  {name: 'Japan', code: '+81'},
  {name: 'Turkey', code: '+90'},
  {name: 'Morocco', code: '+212'},
  {name: 'Canada', code: '+1'},
  {name: 'Australia', code: '+61'},
  {name: 'Spain', code: '+34'},
  {name: 'Italy', code: '+39'},
  {name: 'Other', code: ''}
];
const countrySelect = document.getElementById('countrySelect');
const phoneInput = document.getElementById('phoneInput');
if (countrySelect && phoneInput) {
  countries.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = `${c.name} (${c.code})`;
    opt.setAttribute('data-code', c.code);
    countrySelect.appendChild(opt);
  });
  countrySelect.addEventListener('change', function() {
    const code = countrySelect.options[countrySelect.selectedIndex].getAttribute('data-code');
    phoneInput.value = code ? code + ' ' : '';
  });
}

// Language switcher (i18next)
const languageSwitcher = document.getElementById('languageSwitcher');
const languages = [
  {code: 'en', name: 'English'},
  {code: 'ar', name: 'العربية'},
  {code: 'fr', name: 'Français'},
  {code: 'es', name: 'Español'},
  {code: 'zh', name: '中文'},
  {code: 'ru', name: 'Русский'},
  {code: 'de', name: 'Deutsch'},
  {code: 'tr', name: 'Türkçe'},
  {code: 'ja', name: '日本語'},
  {code: 'pt', name: 'Português'}
];
if (languageSwitcher) {
  languages.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = l.name;
    languageSwitcher.appendChild(opt);
  });
  languageSwitcher.addEventListener('change', function() {
    i18next.changeLanguage(this.value);
  });
}
// Minimal i18next init (for demo, real translation files needed)
i18next.init({
  lng: 'en',
  resources: {
    en: {translation: {}},
    ar: {translation: {}},
    fr: {translation: {}},
    es: {translation: {}},
    zh: {translation: {}},
    ru: {translation: {}},
    de: {translation: {}},
    tr: {translation: {}},
    ja: {translation: {}},
    pt: {translation: {}}
  }
}, function() {
  updateContent();
});
i18next.on('languageChanged', updateContent);
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });
}

// عرض رسالة داخل الصفحة بدلاً من alert
function showMessage(form, message, type = 'success') {
  let msg = form.querySelector('.form-message');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'form-message';
    form.appendChild(msg);
  }
  msg.textContent = message;
  msg.style.color = type === 'success' ? '#00c97b' : '#e74c3c';
  msg.style.background = type === 'success' ? '#e8fff2' : '#fff0f0';
  msg.style.border = '1px solid ' + (type === 'success' ? '#00c97b' : '#e74c3c');
  msg.style.padding = '10px';
  msg.style.marginTop = '10px';
  msg.style.borderRadius = '8px';
  msg.style.textAlign = 'center';
}

// EmailJS integration مع مؤشرات تحميل ورسائل احترافية
function sendMail(form, subject) {
  showMessage(form, 'Sending... Please wait.', 'info');
  // إعدادات EmailJS لإرسال إشعار إلى بريد oneworldsatnet@gmail.com
  emailjs.send('service_1w7w7qg', 'template_6v7z8k9', {
    from_name: form.name ? form.name.value : '',
    from_email: form.email ? form.email.value : '',
    country: form.country ? form.country.value : '',
    phone: form.phone ? form.phone.value : '',
    plan: form.plan ? form.plan.value : '',
    message: form.message ? form.message.value : '',
    to_email: 'oneworldsatnet@gmail.com',
    subject: subject
  }, 'Qw1Er2Ty3Ui4Op5')
    .then(function() {
      showMessage(form, 'Thank you! Your request has been received. Our team will contact you soon.', 'success');
      form.reset();
    }, function(error) {
      showMessage(form, 'There was an error sending your request. Please try again later.', 'error');
    });
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// التحقق من الحقول المطلوبة
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('input[required], select[required]').forEach(input => {
    if (!input.value.trim()) valid = false;
    if (input.type === 'email' && !validateEmail(input.value)) valid = false;
  });
  return valid;
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm(signupForm)) {
      showMessage(signupForm, 'Please fill all fields correctly.', 'error');
      return;
    }
    sendMail(signupForm, 'New Signup Request');
  });
}

// دعم نموذج الشريك إذا أضفته مستقبلاً بنفس الطريقة
const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
  partnerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm(partnerForm)) {
      showMessage(partnerForm, 'Please fill all fields correctly.', 'error');
      return;
    }
    sendMail(partnerForm, 'New Partner Request');
  });
}

// تحميل مكتبة EmailJS
(function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.emailjs.com/dist/email.min.js';
  script.onload = function() { emailjs.init('Qw1Er2Ty3Ui4Op5'); };
  document.head.appendChild(script);
})();

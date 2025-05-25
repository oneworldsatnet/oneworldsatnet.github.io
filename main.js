// ملف جافاسكريبت خفيف لتحسين تجربة المستخدم
// يمكنك إضافة وظائف إضافية لاحقًا

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح! سنقوم بالتواصل معك قريبًا.');
    form.reset();
  });
});

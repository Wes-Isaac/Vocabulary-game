const errorMessage = (err) => {
  const error = document.querySelector('.error-message');
  error.classList.remove('none');
  error.innerHTML = err;
  setTimeout(() => {
    error.classList.add('none');
  }, 3000);
};

export default errorMessage;

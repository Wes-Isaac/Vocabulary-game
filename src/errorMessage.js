const errorMessage = (err) => {
  console.log(err,'error')
  const error = document.querySelector('.error');
  error.innerHTML = err;
  setTimeout(()=> {
    error.classList.add('none')
  },3000)
}

export default errorMessage;
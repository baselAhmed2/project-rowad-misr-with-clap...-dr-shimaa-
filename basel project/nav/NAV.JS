const toggleButton = document.querySelector('.navbar-toggle');
const sidebar = document.querySelector('.sidebar');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  
});

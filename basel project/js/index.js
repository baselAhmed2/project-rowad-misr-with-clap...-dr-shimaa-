document.addEventListener("DOMContentLoaded", function() {
    let carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleFade'), {
        interval: 3000, // تغيير الصورة كل 3 ثواني
        ride: 'carousel'
    });
});
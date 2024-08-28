document.addEventListener('DOMContentLoaded', function() {
    // Handle address dropdown
    var addressDropdown = document.getElementById('address-dropdown');
    if (addressDropdown) {
        addressDropdown.addEventListener('click', function() {
            var addressFields = document.querySelector('.address-fields');
            if (addressFields.style.display === 'none' || addressFields.style.display === '') {
                addressFields.style.display = 'block';
            } else {
                addressFields.style.display = 'none';
            }
        });
    }


    // Handle collapsible elements
    var coll = document.getElementsByClassName('collapsible');
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    let currentImageIndex = 0;
    const images = document.querySelectorAll('.intro-images img');
    const imageCount = images.length;

    setInterval(() => {
        images[currentImageIndex]?.classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % imageCount;
        images[currentImageIndex].classList.add('active');
    }, 3000);
});
// Initialize Swiper
var swiper = new Swiper(".reviews-slider", {
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 9300,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});





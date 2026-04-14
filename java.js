document.addEventListener('scroll', function () {
    const headerElement = document.querySelector('header');
    const navbar = document.getElementById('navbar');
    
    if (!headerElement) return;

    // Calcoliamo l'altezza dell'header inclusa la navbar
    const headerLimit = headerElement.offsetHeight;

    if (window.scrollY > headerLimit) {
        // Fase 2: Siamo scesi oltre l'header
        document.body.classList.add('scrolled');   // Nasconde la navbar orizzontale
        document.body.classList.add('show-menu');  // Fa apparire l'hamburger (tendina)
    } else {
        // Fase 1: Siamo ancora nell'header
        document.body.classList.remove('scrolled');
        document.body.classList.remove('show-menu');
    }
});

// 1. Gestione della tendina (Hamburger)
function toggleDropdown(event) {
    // Impedisce al click di propagarsi al resto della pagina
    if (event) event.stopPropagation();
    
    const content = document.getElementById("dropdown-content");
    if (content) {
        content.classList.toggle("show");
    }
}

// 2. Chiusura sicura cliccando fuori
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById("dropdown");
    const content = document.getElementById("dropdown-content");

    // Verifica che gli elementi esistano prima di procedere (evita l'errore 'null')
    if (!dropdown || !content) return;

    // Se il menu è aperto e clicchi fuori, chiudilo
    if (content.classList.contains('show') && !dropdown.contains(event.target)) {
        content.classList.remove("show");
    }
});
//galleria
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.singolo');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    // Inizializza la galleria
    updateGallery();

    function updateGallery() {
        // Nascondi tutte le immagini
        images.forEach(img => {
            img.classList.remove('active', 'prev', 'next');
        });

        // Calcola gli indici
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        const nextIndex = (currentIndex + 1) % images.length;

        // Applica le classi
        images[prevIndex].classList.add('prev');
        images[currentIndex].classList.add('active');
        images[nextIndex].classList.add('next');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Navigazione da tastiera
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Swipe per mobile (opzionale)
    let touchStartX = 0;
    let touchEndX = 0;

    document.getElementById('gallery-container').addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.getElementById('gallery-container').addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextImage();
        if (touchEndX > touchStartX + 50) prevImage();
    }
});


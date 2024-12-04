// Cambiar la imagen principal al hacer clic en una miniatura de la misma caja
function changeImage(event) {
    const mainImage = event.target.closest('.product-images').querySelector('.main-img');
    mainImage.src = event.target.src;
}

// Función para gestionar el carrito
let total = 0;

function addToCart(productId, price) {
    total += price;

    // Crear o actualizar ventana emergente
    let cartPopup = document.getElementById('cart-popup');
    if (!cartPopup) {
        cartPopup = document.createElement('div');
        cartPopup.id = 'cart-popup';
        cartPopup.style.position = 'fixed';
        cartPopup.style.bottom = '20px';
        cartPopup.style.right = '20px';
        cartPopup.style.backgroundColor = 'white';
        cartPopup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        cartPopup.style.padding = '20px';
        cartPopup.style.borderRadius = '8px';
        cartPopup.style.zIndex = '1000';
        cartPopup.style.width = '300px';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.style.backgroundColor = '#FF9494';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.padding = '10px 20px';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginTop = '10px';
        
        closeButton.addEventListener('click', () => {
            document.body.removeChild(cartPopup);
        });
        
        cartPopup.appendChild(closeButton);
        document.body.appendChild(cartPopup);
    }

    // Actualizar el contenido del popup
    cartPopup.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>` + cartPopup.innerHTML;
}

// Función para ampliar la imagen principal al tamaño completo de la pantalla
function enlargeImage(event) {
    const img = event.target;
    const overlay = document.createElement('div');
    
    // Configurar la superposición
    overlay.id = 'image-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // Clonar la imagen para mostrarla en el overlay
    const clonedImg = img.cloneNode();
    clonedImg.style.maxWidth = '90%';
    clonedImg.style.maxHeight = '90%';
    clonedImg.style.cursor = 'zoom-out';
    clonedImg.style.transition = 'transform 0.3s ease';

    // Cerrar el overlay al hacer clic fuera de la imagen
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    overlay.appendChild(clonedImg);
    document.body.appendChild(overlay);
}

// Agregar eventos dinámicos
document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumb-img');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const mainImages = document.querySelectorAll('.main-img');

    thumbnails.forEach(thumb => thumb.addEventListener('click', changeImage));
    mainImages.forEach(mainImg => mainImg.addEventListener('click', enlargeImage));
    addToCartButtons.forEach((button, index) => {
        const price = parseFloat(button.closest('.product-details').querySelector('.price').textContent.replace('$', ''));
        button.addEventListener('click', () => addToCart(index + 1, price));
    });
});

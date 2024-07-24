// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close');
    const cartItemsList = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.getElementById('cart-count');
    const searchInput = document.getElementById('search-input');
    const dealsSection = document.getElementById('deals');
    
    // Open cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCartUI();
    });

    // Close cart modal
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close cart modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const dealItem = event.target.closest('.deal-item');
            const itemId = dealItem.getAttribute('data-id');
            const itemName = dealItem.querySelector('h2').innerText;
            const itemImage = dealItem.querySelector('img').src;
            addToCart(itemId, itemName, itemImage);
        });
    });

    function addToCart(id, name, image) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ id, name, image, quantity: 1 });
        }
        updateCartCount();
        updateCartUI();
    }

    function updateCartCount() {
        cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function updateCartUI() {
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                ${item.name} (x${item.quantity})
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        // Add remove functionality
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.getAttribute('data-id');
                removeFromCart(itemId);
            });
        });
    }

    function removeFromCart(id) {
        const itemIndex = cart.findIndex(i => i.id === id);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            updateCartCount();
            updateCartUI();
        }
    }

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to your cart before checking out.');
        } else {
            alert('Your purchase was successful!');
            cart.length = 0; // Clear the cart
            updateCartCount();
            updateCartUI();
            cartModal.style.display = 'none'; // Close the cart modal
        }
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const dealItems = document.querySelectorAll('.deal-item');
        dealItems.forEach(item => {
            const itemName = item.querySelector('h2').innerText.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

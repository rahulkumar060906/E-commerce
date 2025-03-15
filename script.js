document.addEventListener('DOMContentLoaded', function () { 
    const products = [
        { id: 1, name: "Product 1", img: 'product1.jpg', price: 10.90 },
        { id: 2, name: "Product 2", img: 'product2.jpg', price: 29.90 },
        { id: 3, name: "Product 3", img: 'product3.png', price: 19.99 },
        { id: 4, name: "Product 4", img: 'product4.jpg', price: 50.90 },
        { id: 5, name: "Product 5", img: 'product5.jpg', price: 99.90 },
        { id: 6, name: "Product 6", img: 'product6.jpg', price: 39.90 },
    ];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productContainer = document.getElementById('products') 
    const cartContainer = document.getElementById('cart')
    const cartTotal = document.getElementById('cart-total')
    const cartItems = document.getElementById('cart-items')
    const total = document.getElementById('total')
    const checkoutBtn = document.getElementById("checkout")
    const clearCartBtn = document.getElementById("clear-cart")

    const saveCartToLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage
    };

    const addToCart = (product) => {
        
        if (product) {
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                // Increase quantity if already in the cart
                existingProduct.quantity += 1;
            } else {
                // Add product with quantity if not in the cart
                cart.push({ ...product, quantity: 1 });
            }
            saveCartToLocalStorage();
            updateCart();

        }
        }
    
    products.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product-card')
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button id="${product.id}" class="add-to-cart">Add to Cart</button>
        `
        productContainer.appendChild(productDiv)
    })
    productContainer.addEventListener('click', function (event) {
        if (event.target.tagName === "BUTTON") {
            const productId = event.target.id
            const product = products.find(p => p.id === parseInt(productId, 10));
            addToCart(product)
            console.log(product);
            
        }
    })
    const updateCart = () => {
        cartItems.innerHTML = ''; // Clear the container
        let totalAmount = 0;

    if (cart.length === 0) {
        // Display message when the cart is empty
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No items in cart.';
        cartItems.appendChild(emptyMessage);

        // Hide cart details and buttons when empty
        cartTotal.classList.add('hidden');
        checkoutBtn.classList.add('hidden');
        clearCartBtn.classList.add('hidden');
        return; // Exit the function early as there's nothing else to process
    }
        cart.forEach(product => {
            const cartlist = document.createElement('li');
            const cartItem = document.createElement('div');
            cartItem.textContent = `${product.name} - $ ${product.price} X ${product.quantity}`;
            
            const removeItem = document.createElement("button");
            removeItem.textContent = "Remove";
            removeItem.setAttribute('id', product.id);
            removeItem.setAttribute('class', "remove-item");
    
            // Add an event listener for the remove button
            removeItem.addEventListener("click", function (e) { 
                const productId = parseInt(e.target.id, 10); // Get product ID from the button's ID
                cart = cart.filter(item => item.id !== productId); // Remove the product from the cart array
                saveCartToLocalStorage();
                updateCart(); // Update the cart display after removal
            });
    
            cartlist.appendChild(cartItem);
            cartlist.appendChild(removeItem);
            cartItems.appendChild(cartlist);
    
            totalAmount += product.price * product.quantity;
        });
        
        total.textContent = ` $${totalAmount.toFixed(2)}`;
        cartTotal.classList.toggle('hidden', cart.length === 0); // Hide/show cart total dynamically
        checkoutBtn.classList.toggle('hidden', cart.length === 0);
        clearCartBtn.classList.toggle('hidden', cart.length === 0);
    };
    
    clearCartBtn.addEventListener('click', function () { 
        cart = [];
        saveCartToLocalStorage();
        updateCart();
        cartItems.innerText = 'No items in cart.';
        cartTotal.classList.add('hidden')
        checkoutBtn.classList.add('hidden')
        clearCartBtn.classList.add('hidden')
        console.log(cart);
    })
    
    checkoutBtn.addEventListener("click", function () {
        let totalQuantity = 0; // To track the total number of items
        let totalAmount = 0;   // To track the total price
    
        cart.forEach(product => {
            totalQuantity += product.quantity; // Add the quantity of each product
            totalAmount += product.price * product.quantity; // Calculate the total cost
        });
    
        // Display the checkout summary
        alert(`Checkout of ${totalQuantity} items has been completed for the total amount of $${totalAmount.toFixed(2)}`);
    
        // Clear the cart and update the UI
        cart = [];
        saveCartToLocalStorage();
        updateCart();
        cartItems.innerText = 'No items in cart.';
        cartTotal.classList.add('hidden');
        checkoutBtn.classList.add('hidden');
        clearCartBtn.classList.add('hidden');
        console.log(cart);
    });
    
    updateCart(); 
})
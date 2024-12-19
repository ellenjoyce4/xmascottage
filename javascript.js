
const products = [
    { id: 1, name: "Tree Ornament", price: 10.0, image: "images/treeornament.jpg" },
    { id: 2, name: "Festive Couch blanket", price: 30.0, image: "images/festiveblanket.jpg" },
    { id: 3, name: "Wreath", price: 40.0, image: "images/wreath.jpg" },
    { id: 4, name: "Christmas Lights", price: 25.0, image: "images/christmaslights.jpg" }
];

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalAmountElement = document.getElementById('total-amount');
const checkoutButton = document.getElementById('checkout-button');

let cart = [];

function renderProducts() {
    productList.innerHTML = ''; 

    products.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('product'); 

        const img = document.createElement('img');
        img.src = product.image; 
        img.alt = product.name;  
        img.classList.add('product-image'); 

        li.appendChild(img);

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info'); 
        productInfo.innerHTML = `<h3>${product.name}</h3><p>$${product.price.toFixed(2)}</p>`;
        li.appendChild(productInfo); 

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(product);
        li.appendChild(addButton); 

        productList.appendChild(li);
    });
}


function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

function renderCart() {
    cartList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item);

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    updateTotalAmount();
}

function removeFromCart(product) {
    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex > -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity--;
        } else {
            cart.splice(productIndex, 1);
        }
    }

    renderCart();
}


function updateTotalAmount() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmountElement.textContent = total.toFixed(2);
}

function showCheckoutForm() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formHtml = `
        <form id="checkout-form">
            <h2>Checkout</h2>
            <p>Total: $${total.toFixed(2)}</p>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button">Cancel</button>
        </form>
    `;

    const formContainer = document.createElement('div');
    formContainer.id = 'checkout-container';
    formContainer.innerHTML = formHtml;
    document.body.appendChild(formContainer);

    document.getElementById('checkout-form').onsubmit = handleFormSubmit;
    document.getElementById('cancel-button').onclick = () => {
        document.body.removeChild(formContainer);
    };
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    alert(`Thank you, ${name}!\nYour total of $${total.toFixed(2)} has been processed.\nA confirmation email will be sent to ${email}.`);

    
    cart = [];
    renderCart();

    const formContainer = document.getElementById('checkout-container');
    if (formContainer) {
        document.body.removeChild(formContainer);
    }
}


renderProducts();
checkoutButton.onclick = showCheckoutForm;

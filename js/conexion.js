const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const btnPurchase = document.getElementById('btnPurchase');

btnPurchase.addEventListener('click', () => {
    if (allProducts.length > 0) {
        alert("Compra exitosa");
        allProducts = []; 
        showHTML();
    } else {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
    }
});


btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-products');
let allProducts = [];

const valorTotal = document.querySelector('.total-pay');
const countProducts = document.querySelector('#count');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-product')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('.title-product').textContent,
			price: parseFloat(product.querySelector('.price-product').textContent.replace('$', '').replace('.', ''))
		};

		const exists = allProducts.some(item => item.title === infoProduct.title);

		if (exists) {
			allProducts = allProducts.map(item => {
				if (item.title === infoProduct.title) {
					item.quantity++;
				}
				return item;
			});
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		console.log("Productos en el carrito:", allProducts);
		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('.title-product-cart').textContent;

		allProducts = allProducts.filter(item => item.title !== title);

		console.log("Productos después de eliminar:", allProducts); 
		showHTML();
	}
});

const showHTML = () => {
	console.log("Mostrando HTML. Productos en carrito:", allProducts.length); 

	if (allProducts.length === 0) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	rowProduct.innerHTML = '';
	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="quantity-product-cart">${product.quantity}</span>
                <p class="title-product-cart">${product.title}</p>
                <span class="price-product-cart">$${product.price.toLocaleString('es-CO')}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total += product.quantity * product.price;
		totalOfProducts += product.quantity;
	});

	valorTotal.innerText = `$${total.toLocaleString('es-CO')}`;
	countProducts.innerText = totalOfProducts;
	console.log("Total de productos:", totalOfProducts, "Total a pagar:", total); 
};

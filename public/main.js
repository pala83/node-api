const products = fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        const productList = document.querySelector('#product-table-body');
        data.forEach(product => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${product.nombre}</td>
                <td>$${product.precio}</td>
            `;
            productList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
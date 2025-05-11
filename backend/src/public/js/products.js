const contentDiv = document.getElementById('content')

const user = async () => {
    try {
        const res = await fetch('/api/sessions/current')
        if (!res.ok) throw new Error('Error en la petición')
        const data = await res.json()
        return data.payload
    } catch (error) {
        console.error(error)
    }
}


const getProducts = async () => {
    try {
        const userResponse = await user()
        fetch('/api/product')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const products = data.payload
            contentDiv.innerHTML = ''
            products.forEach(product => {
                const productDiv = document.createElement('div')
                if(userResponse.role === 'admin') {
                    productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <p>${product.stock}</p>
                        <img src='/img/${product.thumbnail}' alt="${product.title}">
                        <form action="/api/product/${product._id}?_method=DELETE" method="post">
                            <button type="submit">Eliminar</button>
                        </form>
                        <form action="/api/product/${product._id}?_method=PUT" method="post" enctype="multipart/form-data">
                            <input type="text" name="title" value="${product.title}">
                            <input type="text" name="description" value="${product.description}">
                            <input type="number" name="price" value="${product.price}">
                            <input type="file" name="thumbnail">
                            <input type="text" name="code" value="${product.code}">
                            <input type="number" name="stock" value="${product.stock}"> 
                            <input type="text" name="category" value="${product.category}">
                            <button type="submit">Modificar</button>
                    `
                } else {
                    productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <p>${product.stock}</p>
                        <img src='/img/${product.thumbnail}' alt="${product.title}">
                        <form action="/api/cart/${userResponse.cart}/product/${product._id}?_method=PUT" method="post">
                            <input type="number" name="quantity" value="1" max=${product.stock} min="1"> 
                            <button type="submit">Agregar</button>
                        </form>
                    `
                }
                contentDiv.appendChild(productDiv)
            })
        })
    } catch (error) {
        console.error(error)
    }
}

getProducts()
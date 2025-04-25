const contentDiv = document.getElementById('content')
const checkAdmin = async () => {
    try {
        const res = await fetch('/api/sessions/current')
        if (!res.ok) throw new Error('Error en la petición')
        const data = await res.json()
        if(data.payload.role === 'admin') return true
        return false
    } catch (error) {
        console.error(error)
    }
}


const getProducts = async () => {
    try {
        const isAdmin = await checkAdmin()
        fetch('/api/product')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const products = data.payload
            contentDiv.innerHTML = ''
            products.forEach(product => {
                const productDiv = document.createElement('div')
                if(isAdmin) {
                    productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <p>${product.stock}</p>
                        <img src='/img/${product.thumbnail}' alt="${product.title}">
                        <form action="/api/product/${product._id}?_method=DELETE" method="post">
                            <button type="submit">Eliminar</button>
                        </form>
                    `
                } else {
                    productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <p>${product.stock}</p>
                        <img src='/img/${product.thumbnail}' alt="${product.title}">
                        <form action="/api/cart/add?_method=PUT" method="post">
                            <input type="hidden" name="product" value="${product._id}">
                            <input type="number" name="quantity" value="1" min="1"> 
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
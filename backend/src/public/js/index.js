const content = document.getElementById('content')
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

const renderIndex = async () => {
    const isAdmin = await checkAdmin();
    try {
        if(isAdmin) {
            content.innerHTML = `
                <a href="/createProducts.html">Crear Producto</a>
            `	 
        }
        content.innerHTML += `
            <a href="/login.html">Iniciar Sesión</a>
            <a href="/products.html">Productos</a>
            <a href="/register.html">Registro</a>
            <a href="/api/sessions/perfil">Perfil</a>
        `
    } catch (error) {
        console.error(error)
    }
}
renderIndex()
const content = document.getElementById('content')

const render = () => {
    fetch('api/sessions/current', {
    }).then(
        res => {
            if(!res.ok) throw new Error ('Error en la petición')
            return res.json()
        }
    ).then( data => {
        console.log(data)
        content.innerHTML = `
        <h1>Perfil</h1>
        <p>Nombre: ${data.payload.first_name}</p>
        <p>Apellido: ${data.payload.last_name}</p>
        <p>Edad: ${data.payload.age}</p>
        <p>Email: ${data.payload.email}</p>
        <p>Role: ${data.payload.role}</p>
        `
    }).catch( error => {
        return console.log(error);
    }
    )
}

render()
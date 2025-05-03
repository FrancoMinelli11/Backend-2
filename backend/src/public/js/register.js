

const nameInput = document.getElementById('first_name')
const lastNameInput = document.getElementById('last_name')
const ageInput = document.getElementById('age')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const submitBtn = document.getElementById('submit')
const messages = document.getElementById('messages')

submitBtn.addEventListener('click', async (e) => {
    try {
    e.preventDefault()
    const first_name = nameInput.value
    const last_name = lastNameInput.value
    const age = ageInput.value
    if(age < 0 || age > 100) {
        ageInput.value = ''
        messages.innerHTML = 'La edad debe ser un número entre 0 y 100'
        setTimeout(() => {
            messages.innerHTML = ''
        }, 3000)
        return
    }
    const email = emailInput.value
    const password = passwordInput.value
    if(!first_name || !last_name || !email || !password || !age) {
        messages.innerHTML = 'Todos los campos son obligatorios'
        setTimeout(() => {
            messages.innerHTML = ''
        }, 3000)
        return
    }
    const response = await fetch('api/sessions/register', {
        method: 'POST',
        body: JSON.stringify({first_name, last_name,age, email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        const text = await response.text();
        messages.innerHTML = text
        setTimeout(() => {
            messages.innerHTML = ''
        }, 3000)
        return
    }
    const data = await response.json()
    window.location.href = `/login.html?message=${data.payload.first_name}`
}catch (error) {
    messages.innerHTML = error
    setTimeout(() => {
        messages.innerHTML = ''
    }, 3000)
}
})
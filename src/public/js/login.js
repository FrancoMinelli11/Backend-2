
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const submitBtn = document.getElementById('submit')
const messages = document.getElementById('messages')


submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = emailInput.value
    const password = passwordInput.value
    if(email.trim().length === 0 || password.trim().length === 0) {
        messages.innerHTML = 'Todos los campos son obligatorios'
        return
    }
    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        const text = await response.text();
        messages.innerHTML = text
        return
    }
    const data = await response.json();
    window.location.href = '/profile.html'
})
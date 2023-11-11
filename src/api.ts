const conta = {
    email: 'moises@gmail.com',
    password: '12345',
    nome: 'moises',
    balance: 2000,
    id: '1'
}

export const api = new Promise((resolve) => {
    setTimeout(() => {
        resolve(conta)
    }, 2000)
})
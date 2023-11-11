import { login } from "./login"

describe('login', () => {

    const mockAlert = jest.fn()
    window.alert = mockAlert

    const email = 'moises@gmail.com'

    it('Deve exibir um alert com boas vindas caso o e-mail seja valido', async() => {
        await login(email)
        expect(mockAlert).toHaveBeenCalledWith(`Bem vindo ${email}!`)
    })
    it('nao deve exibir a mensagem de boas vindas sem o email', async () => {
        await login(email)
        expect(mockAlert).not.toHaveBeenCalledWith('Bem vindo')
    })
    it('deve exibir um erro caso o email seja invalido', async () => {
        await login('email@errado')
        expect(mockAlert).toHaveBeenCalledWith('email invalido')
    })
})
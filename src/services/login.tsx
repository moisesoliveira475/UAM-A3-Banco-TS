import { api } from "../api"

export const login = async (email: string): Promise<void> => {
    const data: any = await api
    if(email !== data.email){
        return (
            alert('email invalido')
        )
    }
    alert(`Bem vindo ${email}!`)
}


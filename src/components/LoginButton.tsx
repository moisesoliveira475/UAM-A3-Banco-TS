import { Button } from "@chakra-ui/react"
import { MouseEventHandler } from "react"

interface Login {
    onClick : MouseEventHandler<HTMLButtonElement>
}

export const LoginButton = ({onClick}: Login) => {
    return (
        <Button onClick={onClick} colorScheme='teal' size='sm' width='100%' marginTop='5px'>
            Entrar
        </Button>
    )
}
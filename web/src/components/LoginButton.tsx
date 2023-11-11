import { Button } from "@chakra-ui/react"
import { MouseEventHandler } from "react"

interface LoginButtonProps {
    onClick : MouseEventHandler<HTMLButtonElement>;
    text: string;
}

export const LoginButton = ({onClick, text}: LoginButtonProps) => {
    return (
        <Button onClick={onClick} colorScheme='teal' size='sm' width='100%' marginTop='5px'>
            {text}
        </Button>
    )
}
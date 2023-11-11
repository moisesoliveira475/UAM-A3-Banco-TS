"use client"

import { api } from "@/api"
import CardInfo from "@/components/CardInfo"
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface UserData {
    email: string
    password: string
    nome: string
    balance: number
    id: string
}

const Conta = () => {
    const [userData, setUserData] = useState<null | UserData>()

    useEffect(() => {
        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data);
            console.log(data);
        }
        getData()
    }, [])

    const actualDate = new Date()

    return (
        <Center>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    userData === undefined || userData === null ? (
                        <Center>
                            <Spinner size='xl' color="white" />
                        </Center>
                    ) : (
                    <>
                    <CardInfo MainContent={`
                    Seja muito bem vindo ${userData?.nome}!
                `} Content={`Data e hora:
                    ${actualDate.getDay()}/${actualDate.getMonth()}/${actualDate.getFullYear()} ${actualDate.getHours()}:${actualDate.getMinutes()}:${actualDate.getSeconds()}
                `} />
                    <CardInfo MainContent={
                        "Saldo da conta:"
                } Content={`
                        R$ ${userData.balance}
                    `} />
                    </>
                        )
                }
            </SimpleGrid>
        </Center>
    )
}
export default Conta 
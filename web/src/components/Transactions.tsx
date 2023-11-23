import {
    List,
    ListItem,
    ListIcon,
    Center,
    Heading,
    Text
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { FiDollarSign } from 'react-icons/fi'

export function Transactions() {
    return (
            <Center>
                <List spacing={3}>
                    <ListItem>
                        <ListIcon as={TriangleDownIcon} color='red.500' />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit{/* {<FiDollarSign color={'green'} />}{"a lib react-icons/fi não tem suporte para o green.500, só os icons do chakra-ui que possuem" } */}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={TriangleUpIcon} color='green.500' />
                        Assumenda, quia temporibus eveniet a libero incidunt suscipit
                    </ListItem>
                    <ListItem>
                        <ListIcon as={TriangleDownIcon} color='red.500' />
                        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                    </ListItem>
                    <ListItem>
                        <ListIcon as={TriangleUpIcon} color='green.500' />
                        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                    </ListItem>
                </List>
            </Center>
    )
}
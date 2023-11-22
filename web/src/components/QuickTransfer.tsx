import { colors } from '@/styles';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const QuickTransfer = () => {
 const [valor, setValor] = useState('');
 const toast = useToast();

 const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!valor) {
            toast({
                title: 'Valor não informado.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Transferência rápida realizada com sucesso.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
 };

 return (
        <Box paddingLeft="10px">
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Número da conta</FormLabel>
                    <Input type="text" backgroundColor={colors.BLACK_PRIMARY}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Debit</FormLabel>
                    <Input type="text" backgroundColor={colors.BLACK_PRIMARY}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Digite o valor</FormLabel>
                    <Input type="number" value={valor} onChange={(e) => setValor(e.target.value)} backgroundColor={colors.BLACK_PRIMARY}/>
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">
                    Enviar valor
                </Button>
            </form>
        </Box>
 );
};

export default QuickTransfer;
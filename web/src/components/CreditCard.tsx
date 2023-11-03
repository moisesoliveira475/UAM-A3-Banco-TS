import { AuthContext } from "@/contexts/useAuth";
import { formatCreditCardNumber } from "@/utils/formatCreditCardNumber";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
import { FiWifi, FiCircle } from 'react-icons/fi';

export function CreditCard() {
  const { userInformations } = useContext(AuthContext);

  return (
    <Box
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        borderRadius: '0.6rem',
        padding: '0.5rem 0.8rem 0 0.8rem',
        margin: '0',
        minHeight: '8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderWidth: '1px',
      }}
    >
      <Box
        style={{
          width: '100%',
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
        }}
      >
        <Image src={require('@/assets/ray.png')} alt="Chip" width={20} height={20} />
        <FiWifi style={{color: 'white', width: '1rem', height: '1rem', marginRight: '0.3rem', margin: '0.4rem 0.5rem 0.4rem 0'}}/>
      </Box>
      <Box
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          width: '100%',
          padding: '0 0 0.5rem 0',
        }}
      >
        <Text style={{color: 'white', fontSize: '0.8rem', margin: '0.5rem 0'}}>{formatCreditCardNumber(String(userInformations?.creditCard.number)) || '0909 0909 0909 0909'}</Text>
        <Box style={{flexDirection: 'row', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{color: 'white', fontSize: '0.7rem', margin: '0.5rem 0'}}>{`${userInformations?.username} ${userInformations?.creditCard.expirationDate}`}</Text>
          <Image src={require('@/assets/mastercard.png')} alt="Mastercard" width={50} height={50} />
        </Box>
      </Box>
    </Box>
  )
}
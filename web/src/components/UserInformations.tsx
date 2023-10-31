import { AuthContext } from '@/contexts/useAuth';
import { convertDate } from '@/utils/convertDate';
import { Box, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { FiUser, FiBriefcase, FiCreditCard, FiDollarSign } from 'react-icons/fi';

const UserInformations = () => {

  const { user,userInformations } = useContext(AuthContext);

  if (userInformations) {
    return (
      <Box style={{margin: 0}}>
        <List spacing={2} style={{fontSize: '0.8rem'}}>
          <ListItem>
            <ListIcon as={FiUser} color={'blue.500'}/>
            Nome: {userInformations?.username}
          </ListItem>
          <ListItem>
            <ListIcon as={FiBriefcase} color={'blue.500'}/>
            Agência: {userInformations?.agency}
          </ListItem>
          <ListItem>
            <ListIcon as={FiCreditCard} color={'blue.500'}/>
            Conta: {userInformations?.account}
          </ListItem>
          <ListItem>
            <ListIcon as={FiUser} color={'blue.500'}/>
            Último acesso: {convertDate({timeStampDate: userInformations?.lastLogin, options: "DATE_AND_HOURS_WITH_SECONDS"})}
          </ListItem>
        </List>
      </Box>
    );
  };
};


export default UserInformations;


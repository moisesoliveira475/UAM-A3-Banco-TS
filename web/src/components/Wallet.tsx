import { AuthContext } from '@/contexts/useAuth';
import { List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { FiUser } from 'react-icons/fi';

const WalletComponent = () => {

  const { userInformations } = useContext(AuthContext);

  if (userInformations) {
    return (
      <VStack>
        <Text>Account Information</Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={FiUser} color={'green.500'}/>
            Username: {userInformations?.username}
          </ListItem>
          <ListItem>
            <ListIcon as={FiUser} color={'green.500'}/>
            Agency: {userInformations?.agency}
          </ListItem>
          <ListItem>
          <ListIcon as={FiUser} color={'green.500'}/>
            Account: {userInformations?.account}
          </ListItem>
          <ListItem>
          <ListIcon as={FiUser} color={'green.500'}/>
            Balance: {userInformations?.balance}
          </ListItem>
        </List>
      </VStack>
    );
  };
};

export default WalletComponent;


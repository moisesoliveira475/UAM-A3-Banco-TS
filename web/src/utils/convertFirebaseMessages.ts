// function to traduct firebase messages errors to pt-br
export function convertFirebaseMessages(firebaseMessage: string) {
  switch (firebaseMessage) {
    case 'auth/email-already-in-use':
      return 'Email já está em uso';
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/operation-not-allowed':
      return 'Operação não permitida';
    case 'auth/weak-password':
      return 'Senha fraca';
    case 'auth/user-not-found':
      return 'Usuário não encontrado';
    case 'auth/wrong-password':
      return 'Senha incorreta';
    case 'auth/invalid-verification-code':
      return 'Código de verificação inválido';
    case 'auth/missing-verification-code':
      return 'Código de verificação ausente';
    case 'auth/code-expired':
      return 'Código expirado';
    case 'auth/invalid-verification-id':
      return 'ID de verificação inválido';
    case 'auth/missing-verification-id':
      return 'ID de verificação ausente';
    case 'auth/invalid-continue-uri':
      return 'URI de continuação inválida';
    case 'auth/missing-android-pkg-name':
      return 'Nome do pacote Android ausente';
    case 'auth/missing-ios-bundle-id':
      return 'ID do pacote iOS ausente';
    case 'auth/invalid-credential':
      return 'Credencial inválida';
    case 'auth/user-disabled':
      return 'Usuário desativado';
    case 'auth/user-token-expired':
      return 'Token de usuário expirado';
    case 'auth/user-token-revoked':
      return 'Token de usuário revogado';
    case 'auth/invalid-user-token':
      return 'Token de usuário inválido';
    case 'auth/invalid-api-key':
      return 'Chave de API inválida';
    case 'auth/invalid-tenant-id':
      return 'ID do locatário inválido';
    case 'auth/tenant-id-mismatch':
      return 'Incompatibilidade de ID de locatário';
    case 'auth/missing-android-hash':
      return 'Hash Android ausente';
    case 'auth/missing-app-credential':
      return 'Credencial de aplicativo ausente';
    case 'auth/missing-iframe-start':
      return 'Início do iframe ausente';
    case 'auth/missing-ios-bundle-id':
      return 'ID do pacote iOS ausente';
    case 'auth/missing-or-invalid-nonce':
      return 'Nonce ausente ou inválido';
    case 'Loan successfully requested':
      return 'Empréstimo solicitado com sucesso';
    case 'Error requesting loan':
      return 'Erro ao solicitar empréstimo';
    case 'Unexpected error, please try again later':
      return 'Erro inesperado, tente novamente mais tarde';
    case 'Deposit successful':
      return 'Depósito realizado com sucesso';
    case 'Deposit failed':
      return 'Falha ao depositar';
    case 'Transfer successful':
      return 'Transferência realizada com sucesso';
    case 'Transfer failed':
      return 'Falha ao transferir';
    case 'Withdraw successful':
      return 'Saque realizado com sucesso';
    case 'Withdraw failed':
      return 'Falha ao sacar';
    default:
      return 'Algo deu errado :('
  }
}
import { Box, ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '@/contexts/useAuth'

import type { Metadata } from 'next'

import { colors } from '@/styles'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Gene rated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <ChakraProvider>
            <Box width="100vw" height="100vh" backgroundColor={colors.BLUE_TERTIARY}>
              {children}
            </Box>
          </ChakraProvider>   
        </AuthProvider>
      </body>
    </html> 
  )
}
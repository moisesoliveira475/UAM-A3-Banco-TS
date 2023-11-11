import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { AuthProvider } from '@/contexts/useAuth'
import { Box, ChakraProvider } from '@chakra-ui/react'
import type { Metadata } from 'next'

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
    <html lang="en">
      <body>
        <AuthProvider>
          <ChakraProvider>
            <Box minHeight='100vh' backgroundColor='#9413dc'>
              <Header />
                {children}
              <Footer />
            </Box>
          </ChakraProvider>   
        </AuthProvider>
      </body>
    </html> 
  )
}
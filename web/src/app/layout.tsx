import { Box, ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '@/contexts/useAuth'

import type { Metadata } from 'next'

import { colors, fonts } from '@/styles'

export const metadata: Metadata = {
  title: 'UAM Bank',
  description: 'Gene rated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* fonte secundária */}
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <ChakraProvider>
            <Box width="100vw" height="100vh" backgroundColor={colors.BLUE_TERTIARY} fontFamily={fonts.Manrope_Regular}>
              {children}
            </Box>
          </ChakraProvider>   
        </AuthProvider>
      </body>
    </html> 
  )
}
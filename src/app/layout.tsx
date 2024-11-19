// src/app/layout.tsx
'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../lib/theme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { NavigationProvider } from './contexts/NavigationContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <NavigationProvider>
                <CssBaseline />
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                    '& *': {
                      // Ajuste global de tamanhos
                      fontSize: {
                        xs: '87.5%', // 14px base
                        sm: '93.75%', // 15px base
                        md: '100%'    // 16px base
                      }
                    }
                  }}
                >
                  <Navbar />
                  <Box 
                    component="main" 
                    sx={{ 
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {children}
                  </Box>
                  <Footer />
                </Box>
              </NavigationProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
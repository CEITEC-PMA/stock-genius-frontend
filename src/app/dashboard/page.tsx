'use client'
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";

import girl from "../../../public/girl.jpeg"
import Image from 'next/image'

export default function DashboardPage() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <Box display='flex' flexDirection="column" justifyContent='space-around' height='100vh' >
        <Box flex={1}>
          <Typography variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'} textAlign="center" marginTop={2} color=" #0f4c81" >
            ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25
          </Typography>
        </Box>

        <Box component={Paper} boxSizing="border-box" overflow="hidden" display='flex' justifyContent='center' marginX={2} >
          <Image
            height={462.28}
            src={girl}
            width={693.85}

            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
            alt="Estudante" />
        </Box>

        <Box marginX={2} paddingY={3} display="flex" alignItems='center' flex={1}>
          <Typography textAlign='center' mt={3} variant="body1" color=" #0f4c81">
            Bem-vindo à nossa plataforma de eleição de diretores escolares, uma ferramenta crucial para moldar o futuro da educação em nossa comunidade. Aqui, reconhecemos a importância fundamental das eleições de diretores para aprimorar e fortalecer nossa comunidade escolar.
          </Typography>
        </Box>
      </Box >

    </>

  )
}

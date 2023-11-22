"use client"
import React, { useEffect, useState } from 'react'
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { resultadoVotoTypes } from '@/utils/types/result.eleicao.types';
import { useRef } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReplyIcon from '@mui/icons-material/Reply'

import Paper from '@mui/material/Paper';

import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf';
import { Box, Button, Container, Typography } from '@mui/material';
import { resultadoVoto } from '@/utils/resultado.eleicao.mock';
import Link from 'next/link';


export default function Quorum() {

    const [resultado, setResultado] = useState<resultadoVotoTypes[]>([])
    const { user } = useUserContext();

    const options: Options = {
        // default is `save`
        method: 'save',

        resolution: Resolution.HIGH,
        page: {

            margin: Margin.MEDIUM,

            format: 'A4',

            orientation: 'portrait',
        },

        overrides: {

            pdf: {
                compress: true
            },

        },
    };


    const getTargetElement = () => document.getElementById('content-id');

    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: "30px" }}  >

                <Box display='flex' alignItems='center' justifyContent='flex-end'>
                    <Button onClick={() => generatePDF(getTargetElement, options)}><PictureAsPdfIcon sx={{ color: "#b30b00", marginRight: '20px', fontSize: 48 }} /></Button>
                    <Link href={'/dashboard/atas'}  ><ReplyIcon sx={{ fontSize: 45, color: 'blue' }} /></Link>
                </Box>

                <div id="content-id">

                    <Box display="flex" flexDirection="column" component={Paper}>

                        <Box bgcolor='gray' textAlign='center' mt={2} >
                            <Image
                                width={320}
                                height={55}
                                src={
                                    "https://portaleducacao.anapolis.go.gov.br/portal/wp-content/uploads/2021/04/LOGO-SECRETARIA-EDUCACAO-1.png"
                                }
                                alt="Logo"
                            />

                        </Box>

                        <Box textAlign='center' mt={3}>
                            <Typography>
                                Prefeitura Municipal de Anápolis
                            </Typography>
                            <Typography>
                                Secretaria Municipal de Educação
                            </Typography>
                            <Typography>
                                {user.nome}
                            </Typography>

                        </Box>

                        <Box display="flex" justifyContent="center" flexDirection='column' alignItems='center' marginTop={4} gap={2}>
                            <Typography variant='h5'>
                                APURAÇÃO DOS VOTOS - ELEIÇÃO PARA DIRETOR
                            </Typography>

                            <Typography>
                                Quórum - Comparecimento de Eleitores
                            </Typography>
                        </Box>

                        <Box mt={1} component={Paper} textAlign='center' >

                            <Grid container direction="column" padding={2}   >
                                <Grid container item direction="row" textAlign='center'   >
                                    <Grid item xs={3}  >
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'   >
                                            <Typography >Alunos Votantes - 50%</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >Pais/Responsaveis - Alunos Não Votantes 20%</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                            <Typography >Pais/Responsaveis - Alunos Votantes 50%</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                            <Typography >Professores e Servidores Administrativos 50%</Typography>
                                        </Box>
                                    </Grid>



                                    <Grid container item direction="row" textAlign='center'>
                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'  >
                                                <Typography >Qtd Alunos Votantes</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Percentual</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                                <Typography >Qtd Pais/Responsáveis ANV</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Percentual</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Qtd Pais/Responsáveis AV</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Percentual</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Qtd PSA</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Percentual</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" textAlign='center'>
                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'  >
                                                <Typography >42 de 56</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >75%</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                                <Typography >106 de 211</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >50.24%</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >32 de 56</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >57.14%</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >23 de 27</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography > 85.19%</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>



                                </Grid>
                            </Grid>

                            {/* ________________________________________________________________________________ */}

                            <Box my={2}>
                                <Typography>Votos de Pais / Responsáveis e alunos</Typography>
                            </Box>

                            <Grid container direction="column" padding={2}  >
                                <Grid container item direction="row" textAlign='center'  >
                                    <Grid item xs={4} >
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                            <Typography >Diretor</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >Voto de Alunos</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid container direction="column" item xs={4}  >
                                        <Grid item>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                                <Typography >Voto Pais e Responsáveis</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid container item direction="row" >
                                            <Grid item xs={6} >
                                                <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                                    <Typography >Resp por Alunos Votantes </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                                    <Typography >Resp por Alunos Não Votantes</Typography>
                                                </Box>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                    <Grid item xs={2} >
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >Total de Votos (Alunos e Responsáveis) </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center' >
                                    <Grid item xs={4}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >JAQUELINE PONTIERI DA COSTA SANTOS </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >41 </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >33 </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >104 </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >178 </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center' >
                                    <Grid item xs={4}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >Nulo </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >1 </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >0 </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >4 </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >5 </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center' >
                                    <Grid item xs={4}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >Branco </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >0 </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >0 </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >0 </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >0 </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center' >
                                    <Box padding={2} border={1} height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
                                        <Typography >TOTAL VOTOS VÁLIDOS SEGMENTO PAIS / RESPONSÁVEIS E ALUNOS: 180 </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* _______________________________________________________________________________________     */}

                            <Box my={2}>
                                <Typography>Votos de Professores e Servidores Aministrativos</Typography>
                            </Box>

                            <Grid container direction="column" padding={2} >

                                <Grid container item direction="row" textAlign='center'>
                                    <Grid item xs={8} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >Diretor</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box padding={2} border={1} height='100%'>
                                            <Typography >Total Votos (Funcionários)</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center'>
                                    <Grid item xs={8} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >JAQUELINE PONTIERI DA COSTA SANTOS</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box padding={2} border={1} height='100%'>
                                            <Typography >21</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center'>
                                    <Grid item xs={8} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >Nulo</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box padding={2} border={1} height='100%'>
                                            <Typography >0</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center'>
                                    <Grid item xs={8} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >Branco</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box padding={2} border={1} height='100%'>
                                            <Typography >2</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid container item direction="row" textAlign='center' >
                                        <Box padding={2} border={1} height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Typography >TOTAL VOTOS VÁLIDOS SEGMENTO PROFESSORES ADMINISTRATIVO: 23 </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* _________________________________________________________________________________________ */}

                            <Box my={2}>
                                <Typography>Resultado Final</Typography>
                            </Box>

                            <Grid container direction="column" padding={2} >

                                <Grid container item direction="row" textAlign='center'>
                                    <Grid item xs={4} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >Diretor</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%'>
                                            <Typography >Imgem</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >Total de Votos (Pais, Alunos e Funcionários)</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >Percentual Total Por Candidado</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container item direction="row" textAlign='center'>
                                    <Grid item xs={4} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >JAQUELINE PONTIERI DA COSTA SANTOS</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box padding={2} border={1} height='100%'>
                                            <Typography ></Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >199</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <Box padding={2} border={1} height='100%' >
                                            <Typography >66.44%</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Box>
                    </Box>
                </div>

            </Container>


        </>

    )
}

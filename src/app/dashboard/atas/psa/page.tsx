"use client"
import React, { useEffect, useState } from 'react'
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";

import { useRef } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReplyIcon from '@mui/icons-material/Reply';

import Paper from '@mui/material/Paper';

import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf';
import { Box, Button, Container, Typography } from '@mui/material';
import { resultadoVoto } from '@/utils/resultado.eleicao.mock';
import Link from 'next/link';
import { resultadoVotoTypes } from '@/utils/types/result.eleicao.types';




export default function Psa() {

    const [resultadoVoto, setResultadoVoto] = useState<resultadoVotoTypes[]>([])
    const [isLoading, setIsloading] = useState(true);
    const { user } = useUserContext();

    const options: Options = {
        // default is `save`
        // method: 'open',
        method: 'save',

        resolution: Resolution.HIGH,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.SMALL,
            // default is 'A4'
            format: 'A4',
            // default is 'portrait'
            orientation: 'portrait',
        },


        overrides: {
            pdf: {
                compress: true
            },

        },
    };

    useEffect(() => {
        //fetch
        const token = localStorage.getItem("token");
        if (user._id) {
            setIsloading(true);
            const getDadosVotos = async () => {
                const response = await fetch(`${apiUrl}/api/v1/votacao`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const responseJson = await response.json();
                console.log(responseJson)

                // setResultadoVoto(responseJson);
                return response;
            };
            setIsloading(false);
            getDadosVotos();
        }
    }, [user._id]);

    console.log()






    // let qtdConstantes = resultadoVoto.quantidadeFuncionarios;
    // let qtdCompareceram = resultadoVoto.funcionariosVotaram;
    // let qtdNaoCompareceram = qtdConstantes - qtdCompareceram





    const getTargetElement = () => document.getElementById('content-id');

    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: "30px" }} >
                {/* <Box display='flex' flexDirection='row-reverse' alignItems='flex-start'> */}

                <Box display='flex' alignItems='center' justifyContent='flex-end'>
                    <Button onClick={() => generatePDF(getTargetElement, options)}><PictureAsPdfIcon sx={{ color: "#b30b00", marginRight: '20px', fontSize: 48 }} /></Button>
                    <Link href={'/dashboard/atas'}  ><ReplyIcon sx={{ fontSize: 45, color: 'blue' }} /></Link>
                </Box>



                <div id="content-id">
                    <Box component={Paper}>
                        <Box display="flex" flexDirection="column" >

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

                            <Box display="flex" justifyContent="center" textAlign='center' flexDirection='column' alignItems='center' marginTop={4} gap={2} >
                                <Typography variant='h5'>
                                    ATA DA MESA COLETORA - PROFESSORES E SERVIDORES ADMINSTRATIVOS (PSA)
                                </Typography>

                                <Typography>
                                    Integram a mesa coletora de votos os seguintes membros
                                </Typography>
                            </Box>

                            <Box mt={1} textAlign='center'>

                                <Grid container direction="column" padding={2} >
                                    <Grid container item direction="row" textAlign='center'>
                                        <Grid item xs={3} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >Cargos</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box padding={2} border={1} height='100%'>
                                                <Typography >Nome</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >Assinatura</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid container item direction="row" textAlign='center'>
                                            <Grid item xs={3} >
                                                <Box padding={2} border={1} height='100%' >
                                                    <Typography >Presidente</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box padding={2} border={1} height='100%'>
                                                    <Typography ></Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3} >
                                                <Box padding={2} border={1} height='100%' >
                                                    <Typography ></Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Grid container item direction="row" textAlign='center'>
                                            <Grid item xs={3} >
                                                <Box padding={2} border={1} height='100%' >
                                                    <Typography >1° Mesário</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box padding={2} border={1} height='100%' >
                                                    <Typography ></Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3} >
                                                <Box padding={2} border={1} height='100%' >
                                                    <Typography ></Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Grid container item direction="row" textAlign='center'>
                                            <Grid item xs={3} >
                                                <Box padding={2} border={1} height='100%' >
                                                    <Typography >2º Mesário</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box padding={2} border={1} height='100%' >
                                                    <Typography ></Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3} >
                                                <Box padding={2} border={1} height='100%'  >
                                                    <Typography ></Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* ________________________________________________________________________________ */}

                                <Box mt={2}>
                                    <Typography>Comparecimento de eleitores conforme lista de votantes</Typography>
                                </Box>

                                <Grid container direction="column" padding={2} >
                                    <Grid container item direction="row" textAlign='center'>
                                        <Grid item xs={4} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >Professores e Servidores Aministrativos</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%'>
                                                <Typography >N°</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >%</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >Nº por extenso</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" textAlign='center'>
                                        <Grid item xs={4} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >Eleitores constantes na lista</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%'>
                                                {/* <Typography >{qtdConstantes}</Typography> */}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >100%</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography ></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" textAlign='center'>
                                        <Grid item xs={4} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >Eleitores que compareceram</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%'>
                                                {/* <Typography >{qtdCompareceram}</Typography> */}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1} >
                                            <Box padding={2} border={1} height='100%' >
                                                {/* <Typography >{Math.round((qtdCompareceram / qtdConstantes) * 100)}%</Typography> */}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography ></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container item direction="row" textAlign='center'>
                                        <Grid item xs={4} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography >Eleitores que não compareceram</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%'>
                                                {/* <Typography >{qtdNaoCompareceram}</Typography> */}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1} >
                                            <Box padding={2} border={1} height='100%' >
                                                {/* <Typography >{Math.round((qtdNaoCompareceram / qtdConstantes) * 100)}%</Typography> */}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Box padding={2} border={1} height='100%' >
                                                <Typography ></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>

                </div>
                {/* </Box> */}


            </Container>


        </>

    )
}

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
import { Candidato } from '@/utils/types/candidato.types';


export default function QuorumTeste() {

    const [resultadoVoto, setResultadoVoto] = useState<resultadoVotoTypes>({
        quantidadeAlunosVotantes: 0,
        quantidadeAlunosNaoVotantes: 0,
        quantidadeFuncionarios: 0,
        alunosVotaram: 0,
        funcionariosVotaram: 0,
        respAlunosVotantesVotaram: 0,
        respAlunosNaoVotantesVotaram: 0,
        votos: {
            votosRespAlunosVotantes: {
                candidato_um: 0,
                candidato_dois: 0,
                branco: 0,
                nulo: 0,
            },
            votosRespAlunosNaoVotantes: {
                candidato_um: 0,
                candidato_dois: 0,
                branco: 0,
                nulo: 0,
            },
            votosAlunos: {
                candidato_um: 0,
                candidato_dois: 0,
                branco: 0,
                nulo: 0,
            },
            votosFuncionarios: {
                candidato_um: 0,
                candidato_dois: 0,
                branco: 0,
                nulo: 0,
            },
        }
    } as resultadoVotoTypes)


    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [isLoading, setIsloading] = useState(true);
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

    // Fetch Alunos, Responsaveis, Funcionários
    useEffect(() => {
        //fetch
        const token = localStorage.getItem("token");
        if (user._id) {
            setIsloading(true);
            const getDadosVotos = async () => {
                try {

                    const response = await fetch(`${apiUrl}/api/v1/votacao`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        alert("Erro ao obter os resultados dos votos, tente novamente");
                        console.error("Erro ao obter resultados de votos");
                        return;
                    }

                    const responseJson = await response.json();
                    //console.log(responseJson)    
                    setResultadoVoto(responseJson);

                } catch (error) {
                    console.log("Erro na solicitação", error)
                }


            };
            setIsloading(false);
            getDadosVotos();
        }
    }, [user._id]);

    console.log(resultadoVoto)

    // Fetch Candidatos
    useEffect(() => {
        //fetch
        const token = localStorage.getItem("token");
        if (user._id) {
            const getDadosCandidatos = async () => {
                const response = await fetch(
                    `${apiUrl}/api/v1/candidato/candidatoZona/${user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const responseJson = await response.json();
                setCandidatos(responseJson.candidatos);
            };
            getDadosCandidatos();
        }
    }, [user._id]);
    console.log(candidatos)

    // Alunos Votantes
    const qtdAlunosConstantes = resultadoVoto.quantidadeAlunosVotantes;
    const qtdAlunosCompareceram = resultadoVoto.alunosVotaram;
    const qtdAlunosNaoCompareceram = qtdAlunosConstantes - qtdAlunosCompareceram

    // Responsáveis por Alunos Votantes
    const qtdRespAlunosVotantesConstantes = resultadoVoto.quantidadeAlunosVotantes;
    const qtdRespAlunosVotantesCompareceram = resultadoVoto.respAlunosVotantesVotaram;
    const qtdRespAlunosVotantesNaoCompareceram = qtdRespAlunosVotantesConstantes - qtdRespAlunosVotantesCompareceram

    console.log(qtdRespAlunosVotantesNaoCompareceram)

    // Responsáveis por Alunos Não Votantes
    const qtdRespAlunosNaoVotantesConstantes = resultadoVoto.quantidadeAlunosNaoVotantes;
    const qtdRespAlunosNaoVotantesCompareceram = resultadoVoto.respAlunosNaoVotantesVotaram;
    const qtdRespAlunosNaoVotantesNaoCompareceram = qtdRespAlunosNaoVotantesConstantes - qtdRespAlunosNaoVotantesCompareceram

    //Professores e Servidores Adminstrativos 
    const qtdFuncionariosConstantes = resultadoVoto.quantidadeFuncionarios;
    const qtdFuncionarosCompareceram = resultadoVoto.funcionariosVotaram;
    const qtdFucionariosNaoCompareceram = qtdFuncionariosConstantes - qtdFuncionarosCompareceram








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

                        <Box textAlign='center' mt={2}>
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
                                            <Typography >Pais/Responsaveis - Alunos Votantes </Typography>
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
                                                <Typography >Qtd Pais/Responsáveis (ANV)</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Percentual</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Qtd Pais/Responsáveis (AV)</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Percentual</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >Qtd (PSA)</Typography>
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
                                                <Typography >{qtdAlunosCompareceram} de {qtdAlunosConstantes}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >{Math.round((qtdAlunosCompareceram / qtdAlunosConstantes) * 100)}%</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center' >
                                                <Typography >{qtdRespAlunosNaoVotantesCompareceram} de {qtdRespAlunosNaoVotantesConstantes}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >{Math.round((qtdRespAlunosNaoVotantesCompareceram / qtdRespAlunosNaoVotantesConstantes) * 100)}%</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >{qtdRespAlunosVotantesCompareceram} de {qtdRespAlunosVotantesConstantes}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >{Math.round((qtdRespAlunosVotantesCompareceram / qtdRespAlunosVotantesConstantes) * 100)}%</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >{qtdFuncionarosCompareceram} de {qtdFuncionariosConstantes}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box padding={2} border={1} height='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Typography >{Math.round((qtdFuncionarosCompareceram / qtdFuncionariosConstantes) * 100)}%</Typography>
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

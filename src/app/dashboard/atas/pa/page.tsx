"use client"
import React, { useEffect, useState } from 'react'
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
//import { resultadoVotoTypes } from '@/utils/types/resultadoVotosEleicaoTypes';
import { resultadoVotosEleicaoTypes } from '@/utils/types/resultadoVotosEleicaoTypes';
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
import TabelaMembros from '@/components/tabelas/tabelaMembros';
import TabelaAlunosVotantes from '@/components/tabelas/tabelaAlunosVotantes';
import TabelaResponsaveisAlunosVotantes from '@/components/tabelas/tabelaResponsaveisAlunosVotantes';
import TabelaResponsaveisAlunosNaoVotantes from '@/components/tabelas/tabelaResponsaveisAlunosNaoVotantes';


export default function PA() {


    const [resultadoVoto, setResultadoVoto] = useState<resultadoVotosEleicaoTypes>({} as resultadoVotosEleicaoTypes)
    const [isLoading, setIsloading] = useState(true);
    const { user } = useUserContext();

    const options: Options = {
        // default is `save`
        method: 'save',
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.HIGH,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.MEDIUM,
            // default is 'A4'
            format: 'A4',
            // default is 'portrait'
            orientation: 'portrait',
        },



        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            pdf: {
                compress: true
            },
            // see https://html2canvas.hertzen.com/configuration for more options
            // canvas: {
            //     useCORS: true
            // }
        },
    };

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



    // Alunos Votantes
    const qtdAlunosConstantes = resultadoVoto.quantidadeAlunosVotantes;
    const qtdAlunosCompareceram = resultadoVoto.alunosVotaram;
    const qtdAlunosNaoCompareceram = qtdAlunosConstantes - qtdAlunosCompareceram

    // Responsáveis por Alunos Votantes
    const qtdRespAlunosVotantesConstantes = resultadoVoto.quantidadeAlunosVotantes;
    const qtdRespAlunosVotantesCompareceram = resultadoVoto.respAlunosVotantesVotaram;
    const qtdRespAlunosVotantesNaoCompareceram = qtdRespAlunosVotantesConstantes - qtdRespAlunosVotantesCompareceram

    console.log(qtdRespAlunosVotantesNaoCompareceram)
    qtdAlunosCompareceram
    // Responsáveis por Alunos Não Votantes
    const qtdRespAlunosNaoVotantesConstantes = resultadoVoto.quantidadeAlunosNaoVotantes;
    const qtdRespAlunosNaoVotantesCompareceram = resultadoVoto.respAlunosNaoVotantesVotaram;
    const qtdRespAlunosNaoVotantesNaoCompareceram = qtdRespAlunosNaoVotantesConstantes - qtdRespAlunosNaoVotantesCompareceram


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

                        <Box textAlign='center' mt={2} >
                            <Image
                                width={320}
                                height={55}
                                src="https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/azuis/educacao.png"
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

                        <Box display="flex" justifyContent="center" flexDirection='column' alignItems='center' marginTop={4} mb={1} gap={2}>
                            <Typography variant='h5'>
                                ATA DA MESA COLETORA - RESPONSAVEIS E ALUNOS (PA)
                            </Typography>

                            <Typography variant='h6'>
                                Integram a mesa coletora de votos os seguintes membros
                            </Typography>
                        </Box>

                        <Box mt={1} component={Paper} textAlign='center' mx={1} mb={1}>
                            <Box>
                                <TabelaMembros />
                            </Box>


                            {/* ________________________________________________________________________________ */}

                            <Box mt={4} mb={2}>
                                <Typography variant='h6'>Comparecimento de eleitores conforme lista de votantes</Typography>
                            </Box>

                            <Box mb={4}>
                                <TabelaAlunosVotantes qtdAlunosConstantes={qtdAlunosConstantes} qtdAlunosCompareceram={qtdAlunosCompareceram} qtdAlunosNaoCompareceram={qtdAlunosNaoCompareceram} />
                            </Box>

                            <Box mb={4}>
                                <TabelaResponsaveisAlunosVotantes qtdRespAlunosVotantesConstantes={qtdRespAlunosVotantesConstantes} qtdRespAlunosVotantesCompareceram={qtdRespAlunosVotantesCompareceram} qtdRespAlunosVotantesNaoCompareceram={qtdRespAlunosVotantesNaoCompareceram} />

                            </Box>

                            <Box>
                                <TabelaResponsaveisAlunosNaoVotantes qtdRespAlunosNaoVotantesConstantes={qtdRespAlunosNaoVotantesConstantes} qtdRespAlunosNaoVotantesCompareceram={qtdRespAlunosNaoVotantesCompareceram} qtdRespAlunosNaoVotantesNaoCompareceram={qtdRespAlunosNaoVotantesNaoCompareceram} />
                            </Box>

                        </Box>
                    </Box>
                </div>

            </Container>
        </>

    )
}

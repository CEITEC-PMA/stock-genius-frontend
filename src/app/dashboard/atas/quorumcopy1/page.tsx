"use client"
import React, { useEffect, useState } from 'react'
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { resultadoVotosEleicaoTypes } from '@/utils/types/resultadoVotosEleicaoTypes';
import { useRef } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReplyIcon from '@mui/icons-material/Reply'

import Paper from '@mui/material/Paper';

import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf';
import { Box, Button, Container, Table, Typography } from '@mui/material';
import { resultadoVoto } from '@/utils/resultado.eleicao.mock';
import Link from 'next/link';
import { Candidato } from '@/utils/types/candidato.types';
import TabelaQuorumComparecimento from '@/components/tabelas/tabelaQuorumComparecimento';
import { passouQuorum, percentualVotos, resultadoFinal } from '@/utils/processarVotos';
import TabelaQuorumVotosPaisRespAlunos from '@/components/tabelas/tabelaQuorumVotosPaisRespAlunos';
import TabelaQuorumVotosPaisRespAlunosCopy from '@/components/tabelas/tabelaQuorumVotosPaisRespAlunoscopy';
import TabelaQuorumServidores from '@/components/tabelas/tabelaQuorumVotosServidores';
import TabelaResultadoFinal from '@/components/tabelas/taelaResultadoFinal';


export default function QuorumCopy1() {

    const [resultadoVoto, setResultadoVoto] = useState({})


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

    //console.log(resultadoVoto)

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


    const verifricaDeferimento = candidatos.map((deferimento) => {
        return (deferimento.aprovado, deferimento.nome)
    })



    const imagemDiretor = candidatos.map((diretor) => {
        return diretor.foto
    })
    console.log(imagemDiretor)



    // const totalVotos = (percentualVotos(resultadoVoto))

    //console.log(totalVotos)


    const getTargetElement = () => document.getElementById('content-id');

    return (
        <>
            <div>teste</div>
            {/* <Container maxWidth="lg" sx={{ marginTop: "30px" }}  >

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

                            <TabelaQuorumComparecimento />

                           

                            <Box my={2}>
                                <Typography>Votos de Pais / Responsáveis e alunos</Typography>
                            </Box>
                            <TabelaQuorumVotosPaisRespAlunos diretores={diretores} totalVotos={totalVotos} />


                           
                            <Box my={2}>
                                <Typography>Votos de Professores e Servidores Aministrativos</Typography>
                            </Box>

                            <TabelaQuorumServidores diretores={diretores} totalVotos={totalVotos} />

                          

                            <Box my={2}>
                                <Typography>Resultado Final</Typography>
                            </Box>

                            <TabelaResultadoFinal imagemDiretor={imagemDiretor} diretores={diretores} totalVotos={totalVotos} />
                        </Box>
                    </Box>
                </div>

            </Container> */}


        </>

    )
}

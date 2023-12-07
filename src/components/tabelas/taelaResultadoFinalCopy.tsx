import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { resultadoVotosEleicaoTypes } from '@/utils/types/resultadoVotosEleicaoTypes'
import { imagemCandidato, votosPorCandidatos } from '@/utils/types/votosPorCandidatos.types';
import { lutimes } from 'fs';
import Image from 'next/image';
import { DadosQuorum } from '@/utils/types/dadosQuorum.types';
import Quorum from '@/app/dashboard/atas/quorum/page';
import { apiUrl } from '@/utils/api';
import { resultadoFinal } from '@/utils/processarVotos';

interface ITAbelaQuorumVotosPaisRespAlunos {

    dadosQuorum: DadosQuorum[]
}

interface IResultadoFinalEleicao {
    nome: string;
    totalVotosAlunosResponsaveisFuncionarios: number;
    foto: string;
    percentualTotal: number;
    cpf: string;
    caminhoCompletoFoto?: string

}

export default function TabelaResultadoFinalCopy({ dadosQuorum }: ITAbelaQuorumVotosPaisRespAlunos) {

    let ResultadoFinalEleicao: IResultadoFinalEleicao[] = []

    ResultadoFinalEleicao = dadosQuorum
        .filter(({ nome }) => nome !== "Branco" && nome !== "Nulo")
        .map(({ nome, totalVotosAlunosResponsaveisFuncionarios, foto, percentualTotal, cpf }) => ({
            nome,
            totalVotosAlunosResponsaveisFuncionarios,
            foto,
            percentualTotal,
            cpf,

        }));

    console.log(ResultadoFinalEleicao)

    let cpfCandidato = ResultadoFinalEleicao.map((cpf) => {
        return (
            cpf.cpf
        )
    })
    //console.log(cpfCandidato)
    let cpfSemPontos = []

    for (let i = 0; i < cpfCandidato.length; i++) {
        cpfSemPontos[i] = cpfCandidato[i].replace(".", "").replace(".", "").replace("-", "")
    }
    //console.log(cpfSemPontos)

    // return `${apiUrl}/fotosCandidato/${cpfSemTraco}/${candidato.foto}`;

    // const obterFoto = (candidato: DadosQuorum[]) => {
    //     return `${apiUrl}/fotosCandidato/12332112312/file-1700133965104.webp`;
    // }

    const fotos = ResultadoFinalEleicao.map((dados) => {
        return (
            dados.foto
        )
    })



    let caminhoCompletoFoto = []

    for (let i = 0; i < cpfSemPontos.length; i++) {
        caminhoCompletoFoto[i] = `${apiUrl}/fotosCandidato/${cpfSemPontos[i]}/${fotos[i]}`

    }

    if (caminhoCompletoFoto) {
        for (let i = 0; i < caminhoCompletoFoto.length; i++) {
            ResultadoFinalEleicao[i].caminhoCompletoFoto = caminhoCompletoFoto[i]
        }
    }

    console.log(ResultadoFinalEleicao)

    return (
        <>

            <Box display='flex'>
                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow sx={{ height: '85px' }} >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Diretor</Typography>  </TableCell>
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Foto</Typography>  </TableCell>
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Total de Votos (Pais, Alunos e Funcionários)</Typography>  </TableCell>
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Percentual Total Por Candidado</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ResultadoFinalEleicao.map((resultado) => (

                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{resultado.nome}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>
                                        <Image
                                            src={resultado.caminhoCompletoFoto ? resultado.caminhoCompletoFoto : "Sem Fotos"}
                                            width={70}
                                            height={50}
                                            alt="Picture of the author" />
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{(resultado.totalVotosAlunosResponsaveisFuncionarios)}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{(resultado.percentualTotal).toFixed(2)}%</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>

    )
}


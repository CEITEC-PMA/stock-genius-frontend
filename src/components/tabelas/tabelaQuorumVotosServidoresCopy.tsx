import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { resultadoVotosEleicaoTypes } from '@/utils/types/resultadoVotosEleicaoTypes'
import { votosPorCandidatos } from '@/utils/types/votosPorCandidatos.types';
import { lutimes } from 'fs';
import { DadosQuorum } from '@/utils/types/dadosQuorum.types';

interface ITabelaQuorumServidores {



    dadosQuorum: DadosQuorum[]
}

export default function TabelaQuorumServidoresCopy({ dadosQuorum }: ITabelaQuorumServidores) {

    const qtdFuncionarios = dadosQuorum.map((quorum) => {
        return (
            quorum.votosFuncionarios
        )
    })

    const somaQtdFuncionarios = qtdFuncionarios.reduce((acumulator, value) => (
        acumulator + value
    ), 0)

    console.log(somaQtdFuncionarios)

    return (
        <>

            <Box display='flex'>
                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Diretor</Typography>  </TableCell>
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Total Votos Funcionarios</Typography>  </TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {dadosQuorum.map((dados) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{dados.nome}</TableCell>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{dados.votosFuncionarios}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2} sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>TOTAL VOTOS VÁLIDOS SEGMENTO PROFESSORES ADMINISTRATIVO: {somaQtdFuncionarios}</Typography></TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>

            </Box >


        </>

    )
}


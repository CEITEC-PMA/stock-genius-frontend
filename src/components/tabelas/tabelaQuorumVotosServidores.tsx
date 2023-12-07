import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { resultadoVotosEleicaoTypes } from '@/utils/types/resultadoVotosEleicaoTypes'
import { votosPorCandidatos } from '@/utils/types/votosPorCandidatos.types';
import { lutimes } from 'fs';

interface ITabelaQuorumServidores {
    diretores: string[]
    somaVotosAlunosPorCandidato: votosPorCandidatos[]
    totalVotos: votosPorCandidatos[]
}

export default function TabelaQuorumServidores({ diretores, totalVotos }: ITabelaQuorumServidores) {

    console.log(totalVotos)
    return (
        <>

            <Box display='flex'>
                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Diretor</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {diretores.map((diretor) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{diretor}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>Branco</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>Branco</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Total votos funcinários</Typography>  </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {totalVotos.map((x) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{x.qtdeVotosFuncionarios}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>



            </Box>


        </>

    )
}


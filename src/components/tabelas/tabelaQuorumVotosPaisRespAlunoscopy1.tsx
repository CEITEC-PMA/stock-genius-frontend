
import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { resultadoVotosEleicaoTypes } from '@/utils/types/resultadoVotosEleicaoTypes'
import { votosPorCandidatos } from '@/utils/types/votosPorCandidatos.types';
import { lutimes } from 'fs';

interface ITAbelaQuorumVotosPaisRespAlunos {
    diretores: string[]
    somaVotosAlunosPorCandidato: votosPorCandidatos[]
    totalVotos: votosPorCandidatos[]
}

export default function TabelaQuorumVotosPaisRespAlunosCopy1({ diretores, totalVotos }: ITAbelaQuorumVotosPaisRespAlunos) {

    console.log(totalVotos)
    console.log(diretores)
    return (
        <>

            <Box display='flex'>
                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>

                        <TableHead  >
                            <TableRow sx={{ height: '85px' }} >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Diretor</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {diretores.map((diretor) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}></TableCell>
                                </TableRow>
                            ))}



                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow sx={{ height: '85px' }}  >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Votos de alunos</Typography>  </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {totalVotos.map((votos) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{votos.qtdeVotosAlunos}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow sx={{ height: '85px' }} >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Votos responsaveis por alunos votantes</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {totalVotos.map((x) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{x.qtdeVotosRespAlunosVotantes}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow sx={{ height: '85px' }}  >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Votos responsaveis por alunos não votantes</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {totalVotos.map((x) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{x.qtdeVotosRespAlunosNaoVotantes}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow sx={{ height: '85px' }}  >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Total de votos</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {totalVotos.map((x) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{x.somaPaisAlunos}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Box>

            </Box>


        </>

    )
}


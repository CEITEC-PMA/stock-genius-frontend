import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { resultadoVotosEleicaoTypes } from '@/utils/types/resultadoVotosEleicaoTypes'
import { imagemCandidato, votosPorCandidatos } from '@/utils/types/votosPorCandidatos.types';
import { lutimes } from 'fs';
import Image from 'next/image';

interface ITAbelaQuorumVotosPaisRespAlunos {
    diretores: string[]
    somaVotosAlunosPorCandidato: votosPorCandidatos[]
    totalVotos: votosPorCandidatos[]
    imagemDiretor: imagemCandidato[]
}



export default function TabelaResultadoFinal({ diretores, totalVotos, imagemDiretor }: ITAbelaQuorumVotosPaisRespAlunos) {

    let nomeDiretor = []
    for (let i = 0; i < diretores.length - 2; i++) {
        nomeDiretor[i] = diretores[i]
    }

    console.log(diretores)
    // console.log(nomeDiretor)
    //console.log(totalVotos)

    // imagemDiretor.map((imagem) => {
    //     return (
    //         console.log(imagem)
    //     )
    // })

    // let teste = imagemDiretor

    // console.log(teste)

    return (
        <>

            {/* {teste.map((x) => (
                <Image
                    src={`/${x.imagem}`}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            ))} */}

            <Box display='flex'>
                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Diretor</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>



                            {diretores.map((nome) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{nome}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Imagem</Typography>  </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {imagemDiretor.map((imagem) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}> <Image src={`/${imagem}`} width={10} height={10} alt="Picture of the author" /> </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Total de votos (Pais, Alunos e Funcionarios)</Typography>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {totalVotos.map((voto) => (
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{voto.somaPaisAlunosFuncionarios}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Box>

                <Box flex={1}>
                    <Table sx={{ border: '1px solid black' }}>
                        <TableHead  >
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}><Typography>Percentual total por candidatos</Typography>  </TableCell>
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



            </Box>


        </>

    )
}


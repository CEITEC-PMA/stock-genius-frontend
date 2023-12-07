import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

interface ITabelaResponsaveisAlunosVotantes {
    qtdRespAlunosVotantesConstantes: number,
    qtdRespAlunosVotantesCompareceram: number,
    qtdRespAlunosVotantesNaoCompareceram: number
}

export default function TabelaResponsaveisAlunosVotantes({ qtdRespAlunosVotantesConstantes, qtdRespAlunosVotantesCompareceram, qtdRespAlunosVotantesNaoCompareceram }: ITabelaResponsaveisAlunosVotantes) {
    return (
        <Table sx={{ border: '1px solid black' }}>
            <TableHead  >
                <TableRow >
                    <TableCell sx={{ border: '1px solid black', width: '30%', textAlign: 'center' }}><Typography>Responsáveis por alunos votantes</Typography>  </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}><Typography>Nº</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}><Typography>%</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '50%', textAlign: 'center' }}><Typography>Nº por Extenso</Typography> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores constantes na lista</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdRespAlunosVotantesConstantes}</Typography></TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>100%</Typography></TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores que compareceram</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{qtdRespAlunosVotantesCompareceram} </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdRespAlunosVotantesConstantes ? (qtdRespAlunosVotantesCompareceram / qtdRespAlunosVotantesConstantes * 100).toFixed(2) : 0}%</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores que não compareceram</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdRespAlunosVotantesNaoCompareceram}</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdRespAlunosVotantesConstantes ? (qtdRespAlunosVotantesNaoCompareceram / qtdRespAlunosVotantesConstantes * 100).toFixed(2) : 0}%</Typography></TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}


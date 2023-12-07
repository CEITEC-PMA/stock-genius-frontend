import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

interface ITabelaResponsaveisAlunosNaoVotantes {
    qtdRespAlunosNaoVotantesConstantes: number,
    qtdRespAlunosNaoVotantesCompareceram: number,
    qtdRespAlunosNaoVotantesNaoCompareceram: number
}

export default function TabelaResponsaveisAlunosNaoVotantes({ qtdRespAlunosNaoVotantesConstantes, qtdRespAlunosNaoVotantesCompareceram, qtdRespAlunosNaoVotantesNaoCompareceram }: ITabelaResponsaveisAlunosNaoVotantes) {
    return (
        <Table sx={{ border: '1px solid black' }}>
            <TableHead  >
                <TableRow >
                    <TableCell sx={{ border: '1px solid black', width: '30%', textAlign: 'center' }}><Typography>Responsáveis por alunos não votantes</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}><Typography>Nº</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}><Typography>%</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '50%', textAlign: 'center' }}><Typography>Nº por Extenso</Typography> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores constantes na lista</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography></Typography>{qtdRespAlunosNaoVotantesConstantes}</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>100%</Typography></TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores que compareceram</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdRespAlunosNaoVotantesCompareceram}</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdRespAlunosNaoVotantesConstantes ? (qtdRespAlunosNaoVotantesCompareceram / qtdRespAlunosNaoVotantesConstantes * 100).toFixed(2) : 0}%</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores que não compareceram</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography></Typography>{qtdRespAlunosNaoVotantesNaoCompareceram} </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography></Typography>{qtdRespAlunosNaoVotantesConstantes ? (qtdRespAlunosNaoVotantesNaoCompareceram / qtdRespAlunosNaoVotantesConstantes * 100).toFixed(2) : 0}%</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}


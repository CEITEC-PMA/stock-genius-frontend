import { resultadoEleitoresTypes } from '@/utils/types/resultadoEleitoresTypes'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

interface ITabelaAlunosVotantes {
    qtdAlunosConstantes: number,
    qtdAlunosCompareceram: number,
    qtdAlunosNaoCompareceram: number
}

export default function TabelaAlunosVotantes({ qtdAlunosConstantes, qtdAlunosCompareceram, qtdAlunosNaoCompareceram }: ITabelaAlunosVotantes) {
    return (
        <Table sx={{ border: '1px solid black' }}>
            <TableHead  >
                <TableRow >
                    <TableCell sx={{ border: '1px solid black', width: '30%', textAlign: 'center' }}><Typography>Alunos Votantes</Typography>  </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}><Typography>Nº</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}><Typography>%</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '50%', textAlign: 'center' }}><Typography>Nº por Extenso</Typography> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores constantes na lista</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdAlunosConstantes}</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography></Typography>100%</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores que compareceram</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography></Typography>{qtdAlunosCompareceram}</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdAlunosConstantes ? (qtdAlunosCompareceram / qtdAlunosConstantes * 100).toFixed(2) : 0}%</Typography></TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Eleitores que não compareceram</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography></Typography>{qtdAlunosNaoCompareceram}</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>{qtdAlunosConstantes ? (qtdAlunosNaoCompareceram / qtdAlunosConstantes * 100).toFixed(2) : 0}%</Typography></TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

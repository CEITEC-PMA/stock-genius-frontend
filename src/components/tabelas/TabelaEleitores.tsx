import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

interface ITabelaEleitores {
    qtdFuncionariosConstantes: number,
    qtdFuncionarosCompareceram: number,
    qtdFucionariosNaoCompareceram: number




}

export default function TabelaEleitores({ qtdFuncionariosConstantes, qtdFuncionarosCompareceram, qtdFucionariosNaoCompareceram }: ITabelaEleitores) {
    return (
        <Table sx={{ border: '1px solid black' }}>
            <TableHead  >
                <TableRow >
                    <TableCell sx={{ border: '1px solid black', width: '30%', textAlign: 'center' }}>Professores e Servidores Administrativos </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}>Nº </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '10%', textAlign: 'center' }}>% </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '50%', textAlign: 'center' }}>Nº por Extenso </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>Eleitores constantes na lista </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> {qtdFuncionariosConstantes}</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>100%</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>Eleitores que compareceram </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> {qtdFuncionarosCompareceram}</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> {(qtdFuncionarosCompareceram / qtdFuncionariosConstantes) * 100} %</TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>Eleitores que não compareceram </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{qtdFucionariosNaoCompareceram} </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{(qtdFucionariosNaoCompareceram / qtdFuncionariosConstantes) * 100} % </TableCell>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}> </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

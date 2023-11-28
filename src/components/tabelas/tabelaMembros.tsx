import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'



export default function TabelaEleitores() {

    return (
        <Table sx={{ border: '1px solid black' }}>
            <TableHead>
                <TableRow  >
                    <TableCell sx={{ border: '1px solid black', width: '20%', textAlign: 'center' }}>Cargos </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '40%', textAlign: 'center' }}>Nome </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '40%', textAlign: 'center' }}>Assinatura </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>Presidente </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>1º Mesário </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>2º Mesário </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

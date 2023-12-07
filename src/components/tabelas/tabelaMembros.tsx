import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'



export default function TabelaMembros() {

    return (
        <Table sx={{ border: '1px solid black' }}>
            <TableHead>
                <TableRow  >
                    <TableCell sx={{ border: '1px solid black', width: '20%', textAlign: 'center' }}> <Typography>Cargos</Typography>  </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '40%', textAlign: 'center' }}><Typography>Nome</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black', width: '40%', textAlign: 'center' }}><Typography>Assinatura</Typography> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>Presidente</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>1º Mesário</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}><Typography>2º Mesário</Typography> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                    <TableCell sx={{ border: '1px solid black' }}> </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

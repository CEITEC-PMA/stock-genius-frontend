export interface votosPorCandidatos {

    candidato: string;
    percentualTotal: number;
    percentualFunc: number;
    percentualRespAlunosNaoVotantes: number;
    percentualAlunos: number;
    qtdeVotosAlunos: number;
    qtdeVotosFuncionarios: number;
    somaPaisAlunos: number;
    qtdeVotosRespAlunosNaoVotantes: number;
    qtdeVotosRespAlunosVotantes: number;
    somaPaisAlunosFuncionarios: number;

}

export interface imagemCandidato {
    imagem: string[]
}




// export interface votosPorCandidatos {

//     votos: votosClass

// }

// export interface votosClass {
//     candidato: string;
//     percentualTotal: number;
//     qtdeVotosAlunos: number;
//     qtdeVotosFuncionarios: number;
//     somaPaisAlunos: number;
// }
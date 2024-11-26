export interface CashinProps {
    valor: number;
    descricao: string;
    nomePortadorCartao: string;
    numeroCartao: string;
    validadeCartao: Date;
    codigoSegurancaCartao: string;
};

export interface CashoutProps {
    dataCriacaoTransacao: Date;
    valorTransacao: number;
    transactionId: number;
};
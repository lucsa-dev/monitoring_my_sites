import { RaffleData, Ticket } from "./titles-sold";


export function createHeader(data: FormData, raffleData: any[], firstOrderPrice: string): string[]{
    const arrayHeader = [];

    // Header
    // 1. Adicionar H no início da primeira linha
    arrayHeader.push('H')

    // 2. Adicionar o tipo do arquivo na primeira linha
    const fileType = "REM PROP__"
    for(let i = 0; i < fileType.length; i++) {
        arrayHeader.push(fileType[i])
    }

    // 3. Adicionar o nome da entidade na primeira linha
    const name = (data.get('name')  as string).padEnd(12, " ")
    for(let i = 0; i < name.length; i++) {
        arrayHeader.push(name[i].toUpperCase())
    }

    // 4. Adicionar o CNPJ da entidade na primeira linha
    const cnpj = (data.get('cnpj')  as string).replace(/[./-]/g, '')
    for(let i = 0; i < cnpj.length; i++) {
        arrayHeader.push(cnpj[i])
    }

    // 5. Adicionar data atual no formato DDMMAAAA
    const date = new Date()
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString()
    const currentDate = `${day}${month}${year}`
    for(let i = 0; i < currentDate.length; i++) {
        arrayHeader.push(currentDate[i])
    }

    // 6. Adicionar versão do arquivo
    const version = (data.get('version')?.toString()  as string).padStart(6, "0")
    for(let i = 0; i < version.length; i++) {
        arrayHeader.push(version[i])
    }

    // 7. Adicionar código da praça
    const praca = (data.get('praca')  as string).padStart(3, "0")
    for(let i = 0; i < praca.length; i++) {
        arrayHeader.push(praca[i])
    }

    // 8. Adicionar títulos vendidos
    const tickets_sold = (raffleData
        .reduce((acc, curr) => acc + parseInt(curr.Qtd_bilhetes), 0))
        .toString()
        .padStart(8, "0")
    for(let i = 0; i < tickets_sold.length; i++) {
        arrayHeader.push(tickets_sold[i])
    }

    // 9. Adicionar data do sorteio no formato DDMMYYYY
    const raffleDate = (data.get('raffleDate')  as string).split("-").reverse().join("")
    for(let i = 0; i < raffleDate.length; i++) {
        arrayHeader.push(raffleDate[i])
    }

    // 10. Adicionar código SUSEP
    const susep = (data.get('susep')  as string).padStart(17, "0")
    for(let i = 0; i < susep.length; i++) {
        arrayHeader.push(susep[i])
    }

    // 11. Adicionar valor do primeiro pagamento
    firstOrderPrice = (firstOrderPrice.replace(/[./-]/g, '')).padStart(9, "0")
    for(let i = 0; i < firstOrderPrice.length; i++) {
        arrayHeader.push(firstOrderPrice[i])
    }

    // 12. Adicionar o número de casas decimais do valor do primeiro pagamento
    arrayHeader.push('2')

    // 13. Adicionar o número do sorteio
    const raffleNumber = (data.get('raffleNumber')  as string).padStart(3, "0")
    for(let i = 0; i < raffleNumber.length; i++) {
        arrayHeader.push(raffleNumber[i])
    }

    // 14. Adicionar CTRL-id
    const ctrlId = "001"
    for(let i = 0; i < ctrlId.length; i++) {
        arrayHeader.push(ctrlId[i])
    }

    // 15. Filter - Adicionar 14 espaços em branco
    for(let i = 0; i < 14; i++) {
        arrayHeader.push(" ")
    }

    return arrayHeader
}


export function createDetail(ticket: Ticket): string[]{
    const arrayDetail = [];

    // Detail
    // 1. Adicionar D no início da primeira linha
    arrayDetail.push('D')

    // 2. Adicionar o número do sorteio PSTC
    const pstc = "00000000";
    for (let i = 0; i < pstc.length; i++) {
        arrayDetail.push(pstc[i])
    }

    // 3. Adicionar o número do bilhete
    const number = ticket.number.padStart(8, "0")
    for (let i = 0; i < number.length; i++) {
        arrayDetail.push(number[i])
    }

    // 4. Adicionar 92 espaços em branco
    for (let i = 0; i < 92; i++) {
        arrayDetail.push(" ")
    }

    // 5. Adicionar o status vendido
    const status = "1"
    arrayDetail.push(status)

     // 6. Adicionar o número do sorteio
    const raffleNumber = ticket.number.padStart(3, "0")
    for(let i = 0; i < raffleNumber.length; i++) {
        arrayDetail.push(raffleNumber[i])
    }

    // 7. Adicionar primeiro numero da combinação da rodada da sorte
    // TODO
    const firstCombinationNumber = "00000000"
    for (let i = 0; i < firstCombinationNumber.length; i++) {
        arrayDetail.push(firstCombinationNumber[i])
    }

    // 8. adicionar 8 espaços em branco
    for (let i = 0; i < 8; i++) {
        arrayDetail.push(" ")
    }

    // 9. adicionar valor do bilhete
    const price = ticket.price.replace(/[./-]/g, '').padStart(9, "0")
    for (let i = 0; i < price.length; i++) {
        arrayDetail.push(price[i])
    }

    // 10. Adicionar o número de casas decimais do valor do primeiro pagamento
    arrayDetail.push('2')

    // 11. Adicionar 170 espaços em branco
    for (let i = 0; i < 170; i++) {
        arrayDetail.push(" ")
    }

    return arrayDetail
}

export function createTrailer(qtd: number){
    qtd = qtd + 1
    const arrayTrailer = [];

    // 1. Adicionar T no início da primeira linha
    arrayTrailer.push('T')

    // 2. Adicionar a quantidade de registros
    const qtdRegistros = qtd.toString().padStart(9, "0")
    for (let i = 0; i < qtdRegistros.length; i++) {
        arrayTrailer.push(qtdRegistros[i])
    }

    return arrayTrailer
}

export function createFileName(data: FormData): string {
    const now = new Date();

    // Obter o ano, mês, dia, hora e minuto
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const praca = (data.get('praca')  as string).padStart(3, "0")
    return `INTEGRAÇÃO.${praca}.VND.${year}${month}${day}_${hours}${minutes}`;
}

export function getTicketsSold(raffleData: RaffleData[]): Ticket[] {
    const tickets_sold: Ticket[] = []
    raffleData.forEach((item) => {
        const tickets = item.Bilhetes?.split(', ') as string[]
        const ticketWithPrice = tickets.map((ticket) => {
        const price = item.Valor?.replace("R$ ", "").replace(",", ".") as string
        return {
            price: String(parseFloat(price) / parseInt(item.Qtd_bilhetes as string)),
            number: ticket,
        }
        })
        tickets_sold.push(...ticketWithPrice)
    })
    return tickets_sold
    }
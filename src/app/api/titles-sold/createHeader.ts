export default function createHeader(data: FormData, raffleData: any[]): string[]{
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
    const firstOrderValue = raffleData[0].Valor.replace("R$ ", "").replace(",", "").padStart(9, "0")
    for(let i = 0; i < firstOrderValue.length; i++) {
        arrayHeader.push(firstOrderValue[i])
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
import csvToJsonConvert from "@/utils/csvToJsonConvert";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('uploadSpreadsheet') as unknown as File
  const name = (data.get('name')  as string).padEnd(12, " ")
  const cnpj = (data.get('cnpj')  as string).replace(/[./-]/g, '')
  const praca = (data.get('praca')  as string).padStart(3, "0")
  const susep = (data.get('susep')  as string).padStart(17, "0")
  const version = (data.get('version')?.toString()  as string).padStart(6, "0")
  
  const RaffleData = await csvToJsonConvert(file)
  
  const arrayTxt = [];

  // Header
  // 1. Adicionar H no início da primeira linha
  arrayTxt.push(['H'])

  // 2. Adicionar o tipo do arquivo na primeira linha
  const fileType = "REM PROP__"
  for(let i = 0; i < fileType.length; i++) {
    arrayTxt[0].push(fileType[i])
  }

  // 3. Adicionar o nome da entidade na primeira linha
  for(let i = 0; i < name.length; i++) {
    arrayTxt[0].push(name[i].toUpperCase())
  }

  // 4. Adicionar o CNPJ da entidade na primeira linha
  for(let i = 0; i < cnpj.length; i++) {
    arrayTxt[0].push(cnpj[i])
  }

  // 5. Adicionar data atual no formato DDMMAAAA
  const date = new Date()
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()
  const currentDate = `${day}${month}${year}`
  for(let i = 0; i < currentDate.length; i++) {
    arrayTxt[0].push(currentDate[i])
  }

  // 6. Adicionar versão do arquivo
  for(let i = 0; i < version.length; i++) {
    arrayTxt[0].push(version[i])
  }

  // 7. Adicionar código da praça
  for(let i = 0; i < praca.length; i++) {
    arrayTxt[0].push(praca[i])
  }

  
  
  return new Response(JSON.stringify({ txt: arrayTxt }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
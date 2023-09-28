import csvToJsonConvert from "@/utils/csvToJsonConvert";
import { NextRequest } from "next/server";
import { RaffleData, Ticket } from "./titles-sold";
import { createDetail, createFileName, createHeader, createTrailer, getTicketsSold } from "./titlesSold.service";
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('uploadSpreadsheet') as unknown as File
  const raffleData = await csvToJsonConvert(file) as RaffleData[]
  const tickets_sold: Ticket[] = getTicketsSold(raffleData)
  const arrayTxt = [];
  
  // Header
  arrayTxt[0] = createHeader(data, raffleData, tickets_sold[0].price)

  // Details
  for(const ticket of tickets_sold) {
    arrayTxt.push(createDetail(ticket))
  }

  //Trailer
  arrayTxt.push(createTrailer(arrayTxt.length))

  // Transformar o arrayTxt em um array de strings
  const arrayTxtLines = []
  for(let i = 0; i < arrayTxt.length; i++) {
    arrayTxtLines.push(arrayTxt[i].join(''))
  }

  // Gerar o arquivo zip
  const fileName = createFileName(data)
  const zip = new JSZip()
  zip.file(`${fileName}.txt`, arrayTxtLines.join('\n'))
  const zipContent = await zip.generateAsync({ type: 'nodebuffer' })

  return new Response(zipContent, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${fileName}.zip`,
    },
  })
}
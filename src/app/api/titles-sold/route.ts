import csvToJsonConvert from "@/utils/csvToJsonConvert";
import { NextRequest } from "next/server";
import { RaffleData, Ticket } from "./titles-sold";
import { createDetail, createHeader, getTicketsSold } from "./titlesSold.service";


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



  return new Response(JSON.stringify({ txt: arrayTxt }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
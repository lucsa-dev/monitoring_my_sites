import csvToJsonConvert from "@/utils/csvToJsonConvert";
import { NextRequest } from "next/server";
import createHeader from "./createHeader";


export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('uploadSpreadsheet') as unknown as File
  const raffleData = await csvToJsonConvert(file)

  const arrayTxt = [];

  // Header
  arrayTxt[0] = createHeader(data, raffleData)

  return new Response(JSON.stringify({ txt: arrayTxt }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {/* <Link href="/shipping">
        Remessa de números da sorte
    </Link> */}
    <Link href="/titles-sold"> 
        Remessa de Títulos Vendidos
    </Link> 
    </main>
  )
}

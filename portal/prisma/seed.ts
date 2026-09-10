/**
 * Seed da lojinha de afiliados (Fase 1) — tabela `produtos`.
 *
 * Popula produtos católicos de exemplo nas categorias previstas
 * (Terços, Bíblias, Livros, Vestuário e Acessórios de retiro).
 *
 * Prisma 7: a connection string não vive no bloco `datasource` do schema; ela é
 * passada em runtime por um driver adapter (`@prisma/adapter-pg`) construído a partir
 * de `DATABASE_URL`. Ver https://pris.ly/d/prisma7-client-config.
 *
 * Execução:
 *   - `npm run db:seed`      (usa o script do package.json)
 *   - `npx prisma db seed`   (usa a chave `prisma.seed` do package.json)
 *
 * A `DATABASE_URL` é lida do `.env` (carregado abaixo com o loader nativo do Node).
 */

import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Carrega o `.env` sem depender de `dotenv` (Node >= 20.6). Silencioso se o
// arquivo não existir: nesse caso `DATABASE_URL` já pode vir do ambiente.
try {
  process.loadEnvFile()
} catch {
  // .env ausente — segue com as variáveis já presentes em process.env.
}

const products: Prisma.ProductCreateInput[] = [
  // Terços
  {
    title: 'Terço de madeira de oliveira',
    description:
      'Terço tradicional em madeira de oliveira, contas leves e crucifixo entalhado. Acompanha saquinho de tecido para guardar.',
    priceRef: 'R$ 49,90',
    category: 'Terços',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/terco-oliveira',
    imageUrl: '/img/loja/terco-oliveira.jpg',
  },
  {
    title: 'Terço de missão em cordão',
    description:
      'Terço de cordão resistente, leve para carregar no bolso ou na mochila. Prático para rezar em qualquer lugar.',
    priceRef: 'R$ 19,90',
    category: 'Terços',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/terco-missao',
    imageUrl: '/img/loja/terco-missao.jpg',
  },
  {
    title: 'Terço de aço inox prateado',
    description:
      'Contas de aço inoxidável que não escurecem com o tempo. Corrente firme e medalha de Nossa Senhora no centro.',
    priceRef: 'R$ 79,90',
    category: 'Terços',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/terco-inox',
    imageUrl: '/img/loja/terco-inox.jpg',
  },

  // Bíblias
  {
    title: 'Bíblia Sagrada Ave-Maria capa dura',
    description:
      'Edição clássica com tradução dos Monges de Maredsous, notas de rodapé e mapas. Capa dura para uso diário.',
    priceRef: 'R$ 59,90',
    category: 'Bíblias',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/biblia-avemaria',
    imageUrl: '/img/loja/biblia-avemaria.jpg',
  },
  {
    title: 'Bíblia de Jerusalém',
    description:
      'Referência de estudo com introduções, notas críticas e ampla remissão entre os textos. Ideal para grupos e formação.',
    priceRef: 'R$ 149,90',
    category: 'Bíblias',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/biblia-jerusalem',
    imageUrl: '/img/loja/biblia-jerusalem.jpg',
  },
  {
    title: 'Bíblia do peregrino capa em couro',
    description:
      'Formato de bolso com capa em couro sintético e zíper. Boa companhia para viagens, retiros e peregrinações.',
    priceRef: 'R$ 89,90',
    category: 'Bíblias',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/biblia-peregrino',
    imageUrl: '/img/loja/biblia-peregrino.jpg',
  },

  // Livros
  {
    title: 'Imitação de Cristo — Tomás de Kempis',
    description:
      'Um dos clássicos mais lidos da espiritualidade cristã. Meditações curtas para a vida interior e a oração cotidiana.',
    priceRef: 'R$ 34,90',
    category: 'Livros',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/imitacao-de-cristo',
    imageUrl: '/img/loja/imitacao-de-cristo.jpg',
  },
  {
    title: 'Introdução à Vida Devota — São Francisco de Sales',
    description:
      'Guia prático de santidade para quem vive no meio do mundo. Conselhos diretos sobre virtudes, tentações e devoção.',
    priceRef: 'R$ 39,90',
    category: 'Livros',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/introducao-vida-devota',
    imageUrl: '/img/loja/introducao-vida-devota.jpg',
  },
  {
    title: 'Catecismo da Igreja Católica',
    description:
      'Exposição completa da fé, dividida em credo, sacramentos, mandamentos e oração. Obra de referência para consulta.',
    priceRef: 'R$ 74,90',
    category: 'Livros',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/catecismo',
    imageUrl: '/img/loja/catecismo.jpg',
  },

  // Vestuário
  {
    title: 'Camiseta cristã algodão',
    description:
      'Camiseta de algodão com estampa discreta de temática cristã. Modelagem confortável para o dia a dia.',
    priceRef: 'R$ 54,90',
    category: 'Vestuário',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/camiseta-crista',
    imageUrl: '/img/loja/camiseta-crista.jpg',
  },
  {
    title: 'Véu de missa em renda',
    description:
      'Véu leve em renda para uso na celebração. Toque suave e caimento delicado, disponível em tons neutros.',
    priceRef: 'R$ 44,90',
    category: 'Vestuário',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/veu-de-missa',
    imageUrl: '/img/loja/veu-de-missa.jpg',
  },
  {
    title: 'Escapulário do Carmo',
    description:
      'Escapulário de tecido com cordão resistente, devoção de Nossa Senhora do Carmo. Para vestir sob a roupa.',
    priceRef: 'R$ 14,90',
    category: 'Vestuário',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/escapulario-carmo',
    imageUrl: '/img/loja/escapulario-carmo.jpg',
  },

  // Acessórios de retiro
  {
    title: 'Caderno de anotações para retiro',
    description:
      'Caderno pautado com capa firme, ideal para registrar meditações e resoluções ao longo do encontro.',
    priceRef: 'R$ 29,90',
    category: 'Acessórios de retiro',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/caderno-retiro',
    imageUrl: '/img/loja/caderno-retiro.jpg',
  },
  {
    title: 'Garrafa térmica para encontros',
    description:
      'Garrafa térmica de aço inox que mantém a temperatura por horas. Prática para os dias longos de retiro.',
    priceRef: 'R$ 69,90',
    category: 'Acessórios de retiro',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/garrafa-termica',
    imageUrl: '/img/loja/garrafa-termica.jpg',
  },
  {
    title: 'Vela devocional aromática',
    description:
      'Vela de longa duração com aroma suave, boa para criar um ambiente de oração e recolhimento.',
    priceRef: 'R$ 24,90',
    category: 'Acessórios de retiro',
    affiliateUrl: 'https://www.exemplo-afiliado.com.br/vela-devocional',
    imageUrl: '/img/loja/vela-devocional.jpg',
  },
]

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL não definida. Copie `.env.example` para `.env` e preencha a string de conexão do Postgres.',
    )
  }

  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

async function main(): Promise<void> {
  const prisma = createPrismaClient()

  try {
    // Reseta a tabela para tornar o seed idempotente (rodar de novo não duplica).
    await prisma.product.deleteMany()

    const result = await prisma.product.createMany({ data: products })

    console.log(`Seed concluído: ${result.count} produtos inseridos.`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error('Falha ao rodar o seed:', error)
  process.exitCode = 1
})

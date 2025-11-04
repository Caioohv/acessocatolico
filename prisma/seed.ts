import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Create States
  console.log('📍 Criando estados...')
  const states = await Promise.all([
    prisma.state.upsert({
      where: { code: 'SP' },
      update: {},
      create: { name: 'São Paulo', code: 'SP' }
    }),
    prisma.state.upsert({
      where: { code: 'RJ' },
      update: {},
      create: { name: 'Rio de Janeiro', code: 'RJ' }
    }),
    prisma.state.upsert({
      where: { code: 'MG' },
      update: {},
      create: { name: 'Minas Gerais', code: 'MG' }
    }),
    prisma.state.upsert({
      where: { code: 'PR' },
      update: {},
      create: { name: 'Paraná', code: 'PR' }
    }),
    prisma.state.upsert({
      where: { code: 'RS' },
      update: {},
      create: { name: 'Rio Grande do Sul', code: 'RS' }
    })
  ])

  // Create Cities
  console.log('🏙️ Criando cidades...')
  const cities = await Promise.all([
    // São Paulo
    prisma.city.upsert({
      where: { id: 'sp-capital' },
      update: {},
      create: { id: 'sp-capital', name: 'São Paulo', stateId: states[0].id }
    }),
    prisma.city.upsert({
      where: { id: 'sp-campinas' },
      update: {},
      create: { id: 'sp-campinas', name: 'Campinas', stateId: states[0].id }
    }),
    // Rio de Janeiro
    prisma.city.upsert({
      where: { id: 'rj-capital' },
      update: {},
      create: { id: 'rj-capital', name: 'Rio de Janeiro', stateId: states[1].id }
    }),
    prisma.city.upsert({
      where: { id: 'rj-niteroi' },
      update: {},
      create: { id: 'rj-niteroi', name: 'Niterói', stateId: states[1].id }
    }),
    // Minas Gerais
    prisma.city.upsert({
      where: { id: 'mg-bh' },
      update: {},
      create: { id: 'mg-bh', name: 'Belo Horizonte', stateId: states[2].id }
    })
  ])

  // Create Dioceses
  console.log('⛪ Criando dioceses...')
  const dioceses = await Promise.all([
    prisma.diocese.upsert({
      where: { id: 'arquidiocese-sp' },
      update: {},
      create: { id: 'arquidiocese-sp', name: 'Arquidiocese de São Paulo' }
    }),
    prisma.diocese.upsert({
      where: { id: 'arquidiocese-rj' },
      update: {},
      create: { id: 'arquidiocese-rj', name: 'Arquidiocese de São Sebastião do Rio de Janeiro' }
    }),
    prisma.diocese.upsert({
      where: { id: 'arquidiocese-bh' },
      update: {},
      create: { id: 'arquidiocese-bh', name: 'Arquidiocese de Belo Horizonte' }
    })
  ])

  // Create Admin User
  console.log('👨‍💼 Criando usuário administrador...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@acessocatolico.com' },
    update: {},
    create: {
      email: 'admin@acessocatolico.com',
      password: hashedPassword,
      role: 'ADMIN',
      profile: {
        create: {
          firstName: 'Administrador',
          lastName: 'Sistema',
          phone: '(11) 99999-9999',
          bio: 'Administrador do sistema AcessoCatólico'
        }
      }
    }
  })

  // Create Test Priest
  console.log('👨‍🎓 Criando padre de teste...')
  const priestPassword = await bcrypt.hash('padre123', 10)
  
  const priestUser = await prisma.user.upsert({
    where: { email: 'padre@exemplo.com' },
    update: {},
    create: {
      email: 'padre@exemplo.com',
      password: priestPassword,
      role: 'PRIEST',
      profile: {
        create: {
          firstName: 'Padre',
          lastName: 'João',
          phone: '(11) 98888-8888',
          bio: 'Pároco da Paróquia São José',
          stateId: states[0].id,
          cityId: cities[0].id
        }
      }
    }
  })

  // Create Sample Parish
  console.log('🏛️ Criando paróquia de exemplo...')
  const parish = await prisma.parish.create({
    data: {
      name: 'Paróquia São José',
      address: 'Rua das Flores, 123 - Centro',
      description: 'Uma paróquia acolhedora no coração da cidade, servindo a comunidade há mais de 50 anos.',
      phone: '(11) 3333-4444',
      email: 'contato@paroquiasaojose.com.br',
      website: 'https://paroquiasaojose.com.br',
      stateId: states[0].id,
      cityId: cities[0].id,
      dioceseId: dioceses[0].id,
      priests: {
        create: {
          userId: priestUser.id,
          isMain: true
        }
      },
      contacts: {
        create: [
          { type: 'facebook', value: 'https://facebook.com/paroquiasaojose' },
          { type: 'instagram', value: '@paroquiasaojose' },
          { type: 'whatsapp', value: '11999887766' }
        ]
      },
      masses: {
        create: [
          { dayOfWeek: 0, time: '08:00', type: 'normal', description: 'Missa Dominical' },
          { dayOfWeek: 0, time: '10:00', type: 'children', description: 'Missa das Crianças' },
          { dayOfWeek: 0, time: '19:00', type: 'normal', description: 'Missa Vespertina' },
          { dayOfWeek: 1, time: '19:00', type: 'normal', description: 'Missa de Segunda' },
          { dayOfWeek: 2, time: '19:00', type: 'normal', description: 'Missa de Terça' },
          { dayOfWeek: 3, time: '19:00', type: 'normal', description: 'Missa de Quarta' },
          { dayOfWeek: 4, time: '19:00', type: 'normal', description: 'Missa de Quinta' },
          { dayOfWeek: 5, time: '19:00', type: 'normal', description: 'Missa de Sexta' },
          { dayOfWeek: 6, time: '18:00', type: 'normal', description: 'Missa de Sábado' }
        ]
      }
    }
  })

  // Create Sample Ministry
  console.log('🎵 Criando ministério de exemplo...')
  const ministry = await prisma.ministry.create({
    data: {
      name: 'Ministério de Música',
      description: 'Responsável pela animação musical das celebrações litúrgicas',
      parishId: parish.id
    }
  })

  // Create Sample Event
  console.log('🎉 Criando evento de exemplo...')
  const event = await prisma.event.create({
    data: {
      title: 'Retiro de Carnaval 2025',
      description: 'Um momento especial de oração e reflexão durante o período carnavalesco.',
      content: '## Programação\n\n- **Sexta-feira**: Acolhida e Primeira Palestra\n- **Sábado**: Adoração e Partilha\n- **Domingo**: Missa de Envio\n\n## Investimento\nR$ 150,00 (inclui hospedagem e alimentação)',
      startDate: new Date('2025-02-28T18:00:00'),
      endDate: new Date('2025-03-02T16:00:00'),
      location: 'Casa de Retiros São Francisco',
      maxParticipants: 50,
      price: 150.00,
      status: 'PUBLISHED',
      organizerId: priestUser.id,
      parishId: parish.id,
      cityId: cities[0].id
    }
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log('\n📝 Dados criados:')
  console.log(`- Estados: ${states.length}`)
  console.log(`- Cidades: ${cities.length}`)
  console.log(`- Dioceses: ${dioceses.length}`)
  console.log(`- Usuários: 2 (admin + padre)`)
  console.log(`- Paróquias: 1`)
  console.log(`- Ministérios: 1`)
  console.log(`- Eventos: 1`)
  console.log('\n🔑 Credenciais de teste:')
  console.log('Admin: admin@acessocatolico.com / admin123')
  console.log('Padre: padre@exemplo.com / padre123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro durante o seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

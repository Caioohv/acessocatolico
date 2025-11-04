// Mock data for parishes with coordinates - for development/demonstration purposes
export const mockParishes = [
  {
    id: '1',
    name: 'Paróquia São José',
    address: 'Rua das Flores, 123 - Centro',
    description: 'Uma comunidade acolhedora no coração da cidade.',
    phone: '(11) 1234-5678',
    email: 'contato@saojose.org.br',
    website: 'https://saojose.org.br',
    latitude: -23.550520,
    longitude: -46.633308, // São Paulo
    state: { id: '1', name: 'São Paulo', code: 'SP' },
    city: { id: '1', name: 'São Paulo', stateId: '1' },
    neighborhood: { id: '1', name: 'Centro', cityId: '1' },
    diocese: { id: '1', name: 'Arquidiocese de São Paulo', createdAt: new Date(), updatedAt: new Date() },
    priests: [{
      id: '1',
      isMain: true,
      user: {
        id: '1',
        email: 'padre@saojose.org.br',
        role: 'PRIEST',
        profile: {
          firstName: 'João',
          lastName: 'Silva',
          phone: '(11) 1234-5678',
          avatar: null,
          bio: 'Pároco há 10 anos'
        }
      }
    }],
    contacts: [
      { id: '1', type: 'facebook', value: 'facebook.com/saojose' },
      { id: '2', type: 'instagram', value: 'instagram.com/saojose' }
    ],
    masses: [
      {
        id: '1',
        dayOfWeek: 0, // Domingo
        time: '08:00',
        type: 'Missa Dominical',
        language: 'Português',
        description: 'Missa das famílias'
      },
      {
        id: '2',
        dayOfWeek: 0,
        time: '19:00',
        type: 'Missa Dominical',
        language: 'Português',
        description: null
      }
    ],
    _count: { events: 5, ministries: 8 },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Paróquia Nossa Senhora das Graças',
    address: 'Av. Paulista, 1000 - Bela Vista',
    description: 'Tradição e fé no centro de São Paulo.',
    phone: '(11) 2345-6789',
    email: 'contato@nsgracas.org.br',
    website: 'https://nsgracas.org.br',
    latitude: -23.561414,
    longitude: -46.656139, // Paulista
    state: { id: '1', name: 'São Paulo', code: 'SP' },
    city: { id: '1', name: 'São Paulo', stateId: '1' },
    neighborhood: { id: '2', name: 'Bela Vista', cityId: '1' },
    diocese: { id: '1', name: 'Arquidiocese de São Paulo', createdAt: new Date(), updatedAt: new Date() },
    priests: [{
      id: '2',
      isMain: true,
      user: {
        id: '2',
        email: 'padre@nsgracas.org.br',
        role: 'PRIEST',
        profile: {
          firstName: 'Maria',
          lastName: 'Santos',
          phone: '(11) 2345-6789',
          avatar: null,
          bio: 'Dedicada ao ministério'
        }
      }
    }],
    contacts: [
      { id: '3', type: 'whatsapp', value: '11987654321' },
      { id: '4', type: 'youtube', value: 'youtube.com/nsgracas' }
    ],
    masses: [
      {
        id: '3',
        dayOfWeek: 0,
        time: '07:30',
        type: 'Missa Dominical',
        language: 'Português',
        description: 'Missa da aurora'
      },
      {
        id: '4',
        dayOfWeek: 0,
        time: '10:00',
        type: 'Missa Dominical',
        language: 'Português',
        description: 'Missa solene'
      }
    ],
    _count: { events: 3, ministries: 6 },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Paróquia Sagrado Coração de Jesus',
    address: 'Rua Augusta, 500 - Consolação',
    description: 'Comunidade jovem e vibrante.',
    phone: '(11) 3456-7890',
    email: 'contato@sagradocoracao.org.br',
    website: null,
    latitude: -23.557109,
    longitude: -46.662748, // Augusta
    state: { id: '1', name: 'São Paulo', code: 'SP' },
    city: { id: '1', name: 'São Paulo', stateId: '1' },
    neighborhood: { id: '3', name: 'Consolação', cityId: '1' },
    diocese: { id: '1', name: 'Arquidiocese de São Paulo', createdAt: new Date(), updatedAt: new Date() },
    priests: [{
      id: '3',
      isMain: true,
      user: {
        id: '3',
        email: 'padre@sagradocoracao.org.br',
        role: 'PRIEST',
        profile: {
          firstName: 'Pedro',
          lastName: 'Oliveira',
          phone: '(11) 3456-7890',
          avatar: null,
          bio: 'Pastor da comunidade jovem'
        }
      }
    }],
    contacts: [
      { id: '5', type: 'instagram', value: 'instagram.com/sagradocoracao' }
    ],
    masses: [
      {
        id: '5',
        dayOfWeek: 0,
        time: '09:00',
        type: 'Missa Dominical',
        language: 'Português',
        description: 'Missa dos jovens'
      },
      {
        id: '6',
        dayOfWeek: 0,
        time: '18:00',
        type: 'Missa Dominical',
        language: 'Português',
        description: null
      }
    ],
    _count: { events: 7, ministries: 4 },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Paróquia Santa Teresinha',
    address: 'Rua Pamplona, 200 - Jardins',
    description: 'Uma paróquia dedicada à oração e caridade.',
    phone: '(11) 4567-8901',
    email: 'contato@santateresinha.org.br',
    website: 'https://santateresinha.org.br',
    latitude: -23.572778,
    longitude: -46.650556, // Jardins
    state: { id: '1', name: 'São Paulo', code: 'SP' },
    city: { id: '1', name: 'São Paulo', stateId: '1' },
    neighborhood: { id: '4', name: 'Jardins', cityId: '1' },
    diocese: { id: '1', name: 'Arquidiocese de São Paulo', createdAt: new Date(), updatedAt: new Date() },
    priests: [{
      id: '4',
      isMain: true,
      user: {
        id: '4',
        email: 'padre@santateresinha.org.br',
        role: 'PRIEST',
        profile: {
          firstName: 'Antônio',
          lastName: 'Costa',
          phone: '(11) 4567-8901',
          avatar: null,
          bio: 'Devotado à caridade'
        }
      }
    }],
    contacts: [
      { id: '6', type: 'facebook', value: 'facebook.com/santateresinha' },
      { id: '7', type: 'email', value: 'contato@santateresinha.org.br' }
    ],
    masses: [
      {
        id: '7',
        dayOfWeek: 0,
        time: '08:30',
        type: 'Missa Dominical',
        language: 'Português',
        description: null
      },
      {
        id: '8',
        dayOfWeek: 0,
        time: '19:30',
        type: 'Missa Dominical',
        language: 'Português',
        description: 'Missa vespertina'
      }
    ],
    _count: { events: 4, ministries: 9 },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Paróquia São Francisco de Assis',
    address: 'Rua Estados Unidos, 800 - Jardim América',
    description: 'Simplicidade e amor franciscano.',
    phone: '(11) 5678-9012',
    email: 'contato@saofrancisco.org.br',
    website: null,
    latitude: -23.568611,
    longitude: -46.675000, // Jardim América
    state: { id: '1', name: 'São Paulo', code: 'SP' },
    city: { id: '1', name: 'São Paulo', stateId: '1' },
    neighborhood: { id: '5', name: 'Jardim América', cityId: '1' },
    diocese: { id: '1', name: 'Arquidiocese de São Paulo', createdAt: new Date(), updatedAt: new Date() },
    priests: [{
      id: '5',
      isMain: true,
      user: {
        id: '5',
        email: 'padre@saofrancisco.org.br',
        role: 'PRIEST',
        profile: {
          firstName: 'Francisco',
          lastName: 'Mendes',
          phone: '(11) 5678-9012',
          avatar: null,
          bio: 'Seguindo os passos de São Francisco'
        }
      }
    }],
    contacts: [
      { id: '8', type: 'whatsapp', value: '11956789012' }
    ],
    masses: [
      {
        id: '9',
        dayOfWeek: 0,
        time: '07:00',
        type: 'Missa Dominical',
        language: 'Português',
        description: 'Missa da manhã'
      },
      {
        id: '10',
        dayOfWeek: 0,
        time: '17:00',
        type: 'Missa Dominical',
        language: 'Português',
        description: null
      }
    ],
    _count: { events: 6, ministries: 7 },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const mockStates = [
  { id: '1', name: 'São Paulo', code: 'SP' }
]

export const mockCities = [
  { id: '1', name: 'São Paulo', stateId: '1' }
]

export const mockNeighborhoods = [
  { id: '1', name: 'Centro', cityId: '1' },
  { id: '2', name: 'Bela Vista', cityId: '1' },
  { id: '3', name: 'Consolação', cityId: '1' },
  { id: '4', name: 'Jardins', cityId: '1' },
  { id: '5', name: 'Jardim América', cityId: '1' }
]

export const mockDioceses = [
  { id: '1', name: 'Arquidiocese de São Paulo', createdAt: new Date(), updatedAt: new Date() }
]

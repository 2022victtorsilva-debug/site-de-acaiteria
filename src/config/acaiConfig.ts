import atlasUrl from '../assets/acai-nativa-atlas.webp'

export const acaiConfig = {
  brand: { name: 'Açaí Nativa', tagline: 'Seu açaí. Seu momento. Seu jeito.' },
  contact: { whatsapp: '', instagram: '' },
  location: { address: '', city: '', state: '', mapsUrl: '' },
  links: { menuUrl: '' },
  openingHours: [
    { label: 'Segunda a sexta', value: 'Horário a definir' },
    { label: 'Sábado', value: 'Horário a definir' },
    { label: 'Domingo', value: 'Horário a definir' },
  ],
  visual: {
    atlas: atlasUrl,
    hero: 'https://images.pexels.com/photos/5232939/pexels-photo-5232939.jpeg?auto=compress&cs=tinysrgb&w=1400&fm=webp',
    powerTile: 8,
    deliveryTile: 19,
    gallery: [
      { tile: 14, alt: 'Chocolate cremoso caindo sobre granola e açaí em close' },
      { tile: 15, alt: 'Mão segurando copo Açaí Nativa com produto bem visível' },
      { tile: 16, alt: 'Dois copos Açaí Nativa lado a lado em composição de produto' },
      { tile: 17, alt: 'Banana, morango, kiwi e complementos vistos de cima' },
      { tile: 18, alt: 'Balcão moderno da Açaí Nativa com identidade roxa' },
    ],
  },
  sizes: [
    { id: '300', label: '300 ml', price: 12.9, featured: false, tile: 4 },
    { id: '400', label: '400 ml', price: 15.9, featured: false, tile: 5 },
    { id: '500', label: '500 ml', price: 18.9, featured: true, tile: 6 },
    { id: '700', label: '700 ml', price: 24.9, featured: false, tile: 7 },
  ],
  bases: [
    { name: 'Açaí tradicional', price: 0 },
    { name: 'Açaí com guaraná', price: 0.5 },
    { name: 'Açaí zero adição', price: 1 },
  ],
  fruits: [
    { name: 'Banana', price: 1 },
    { name: 'Morango', price: 1.5 },
    { name: 'Kiwi', price: 1.5 },
    { name: 'Manga', price: 1.5 },
  ],
  complements: [
    { name: 'Granola', price: 1 },
    { name: 'Leite em pó', price: 1.5 },
    { name: 'Paçoca', price: 1 },
    { name: 'Amendoim', price: 1 },
    { name: 'Cereal', price: 1 },
  ],
  toppings: [
    { name: 'Chocolate', price: 1.5 },
    { name: 'Leite condensado', price: 1.5 },
    { name: 'Mel', price: 1.5 },
    { name: 'Calda de morango', price: 1.5 },
  ],
  featuredProducts: [
    { name: 'Nativa Clássico', description: 'Açaí, banana, granola e leite em pó.', price: 16.9, tile: 0 },
    { name: 'Nativa Tropical', description: 'Açaí, morango, banana e creme branco.', price: 18.9, tile: 1 },
    { name: 'Nativa Crocante', description: 'Açaí, paçoca, granola e chocolate.', price: 19.9, tile: 2 },
    { name: 'Explosão Nativa', description: 'Açaí, frutas, cremes e mix crocante.', price: 22.9, tile: 3 },
  ],
  specials: [
    { name: 'Nativa Power', description: 'Banana, pasta de amendoim, granola e mix proteico.', price: 21.9, tile: 8 },
    { name: 'Nativa Supreme', description: 'Morango, kiwi, creme de avelã, leite em pó e granola.', price: 24.9, tile: 13 },
    { name: 'Nativa Fresh', description: 'Banana, manga, morango, mel e granola.', price: 20.9, tile: 12 },
  ],
  combos: [
    { name: 'Combo Dupla', description: '2 açaís de 400 ml.', price: 29.9, tile: 9 },
    { name: 'Combo Nativa', description: 'Açaí de 500 ml + acompanhamento.', price: 24.9, tile: 10 },
    { name: 'Combo Família', description: '4 açaís de 400 ml.', price: 57.9, tile: 11 },
  ],
} as const

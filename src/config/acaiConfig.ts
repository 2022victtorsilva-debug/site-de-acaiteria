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
  sizes: [
    { id: '300', label: '300 ml', price: 12.9, featured: false },
    { id: '400', label: '400 ml', price: 15.9, featured: false },
    { id: '500', label: '500 ml', price: 18.9, featured: true },
    { id: '700', label: '700 ml', price: 24.9, featured: false },
  ],
  bases: ['Açaí tradicional', 'Açaí com guaraná', 'Açaí zero adição'],
  fruits: ['Banana', 'Morango', 'Kiwi', 'Manga'],
  complements: ['Granola', 'Leite em pó', 'Paçoca', 'Amendoim', 'Cereal'],
  toppings: ['Chocolate', 'Leite condensado', 'Mel', 'Calda de morango'],
  featuredProducts: [
    { name: 'Nativa Clássico', description: 'Açaí, banana, granola e leite em pó.', price: 16.9 },
    { name: 'Nativa Tropical', description: 'Açaí, morango, banana e creme branco.', price: 18.9 },
    { name: 'Nativa Crocante', description: 'Açaí, paçoca, granola e chocolate.', price: 19.9 },
    { name: 'Explosão Nativa', description: 'Açaí, frutas, cremes e mix crocante.', price: 22.9 },
  ],
  specials: [
    { name: 'Nativa Power', description: 'Banana, pasta de amendoim, granola e mix proteico.', price: 21.9 },
    { name: 'Nativa Supreme', description: 'Morango, kiwi, creme de avelã, leite em pó e granola.', price: 24.9 },
    { name: 'Nativa Fresh', description: 'Banana, manga, morango, mel e granola.', price: 20.9 },
  ],
  combos: [
    { name: 'Combo Dupla', description: '2 açaís de 400 ml.', price: 29.9 },
    { name: 'Combo Nativa', description: 'Açaí de 500 ml + acompanhamento.', price: 24.9 },
    { name: 'Combo Família', description: '4 açaís de 400 ml.', price: 57.9 },
  ],
} as const

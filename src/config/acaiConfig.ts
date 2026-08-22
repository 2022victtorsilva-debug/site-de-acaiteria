const photo = (id: number, width = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&fm=webp`

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
    hero: photo(5232939, 1400),
    delivery: photo(26271295, 1100),
    power: photo(33864614, 950),
    gallery: [
      { src: photo(4099233, 900), alt: 'Tigela de açaí com frutas vermelhas, sementes e granola' },
      { src: photo(17597421, 900), alt: 'Açaí visto de cima com morango, banana e chia' },
      { src: photo(7936988, 900), alt: 'Açaí cremoso sendo servido em tigela de madeira' },
      { src: photo(5232939, 900), alt: 'Copo de açaí com frutas frescas sendo segurado na mão' },
      { src: photo(4099234, 900), alt: 'Várias tigelas de açaí juntas em uma bandeja' },
      { src: photo(25856933, 900), alt: 'Frutos de açaí frescos em uma tigela' },
      { src: photo(17913413, 1000), alt: 'Balcão de cafeteria moderna com atmosfera acolhedora' },
    ],
  },
  sizes: [
    { id: '300', label: '300 ml', price: 12.9, featured: false, image: photo(5150303, 650) },
    { id: '400', label: '400 ml', price: 15.9, featured: false, image: photo(1517277, 650) },
    { id: '500', label: '500 ml', price: 18.9, featured: true, image: photo(12118810, 650) },
    { id: '700', label: '700 ml', price: 24.9, featured: false, image: photo(12273052, 650) },
  ],
  bases: ['Açaí tradicional', 'Açaí com guaraná', 'Açaí zero adição'],
  fruits: ['Banana', 'Morango', 'Kiwi', 'Manga'],
  complements: ['Granola', 'Leite em pó', 'Paçoca', 'Amendoim', 'Cereal'],
  toppings: ['Chocolate', 'Leite condensado', 'Mel', 'Calda de morango'],
  featuredProducts: [
    { name: 'Nativa Clássico', description: 'Açaí, banana, granola e leite em pó.', price: 16.9, image: photo(5150303, 780) },
    { name: 'Nativa Tropical', description: 'Açaí, morango, banana e creme branco.', price: 18.9, image: photo(1517277, 780) },
    { name: 'Nativa Crocante', description: 'Açaí, paçoca, granola e chocolate.', price: 19.9, image: photo(12118810, 780) },
    { name: 'Explosão Nativa', description: 'Açaí, frutas, cremes e mix crocante.', price: 22.9, image: photo(12273052, 780) },
  ],
  specials: [
    { name: 'Nativa Power', description: 'Banana, pasta de amendoim, granola e mix proteico.', price: 21.9, image: photo(33864614, 780) },
    { name: 'Nativa Supreme', description: 'Morango, kiwi, creme de avelã, leite em pó e granola.', price: 24.9, image: photo(37489232, 780) },
    { name: 'Nativa Fresh', description: 'Banana, manga, morango, mel e granola.', price: 20.9, image: photo(3622478, 780) },
  ],
  combos: [
    { name: 'Combo Dupla', description: '2 açaís de 400 ml.', price: 29.9, image: photo(4099236, 900) },
    { name: 'Combo Nativa', description: 'Açaí de 500 ml + acompanhamento.', price: 24.9, image: photo(12118810, 900) },
    { name: 'Combo Família', description: '4 açaís de 400 ml.', price: 57.9, image: photo(4099234, 900) },
  ],
} as const

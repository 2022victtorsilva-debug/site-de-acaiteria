import React, { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ArrowRight, Check, ChevronDown, Clock3, Instagram, Leaf, MapPin, Menu, MessageCircle, Sparkles, X, Zap } from 'lucide-react'
import { acaiConfig } from './config/acaiConfig'
import './styles.css'
import './refinement.css'

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const wa = (message: string) => {
  const phone = acaiConfig.contact.whatsapp.replace(/\D/g, '')
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : null
}
const insta = () => {
  const value = acaiConfig.contact.instagram.trim()
  return !value ? null : value.startsWith('http') ? value : `https://instagram.com/${value.replace(/^@/, '')}`
}

type PriceOption = { readonly name: string; readonly price: number }

const sumSelected = (options: readonly PriceOption[], selected: readonly string[]) =>
  options.reduce((sum, option) => sum + (selected.includes(option.name) ? option.price : 0), 0)

const incrementLabel = (price: number) => price > 0 ? `+ ${money(price)}` : 'Incluso'

function SafeLink({ href, children, className = '' }: { href: string | null; children: React.ReactNode; className?: string }) {
  const [hint, setHint] = useState(false)
  if (href) return <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>
  return <button className={className} onClick={() => { setHint(true); setTimeout(() => setHint(false), 2000) }}>{children}{hint && <span className="hint">Contato será configurado para o cliente</span>}</button>
}

const pexelsUrl = (src: string, width: number) => {
  if (!src.includes('images.pexels.com')) return src
  const separator = src.includes('?') ? '&' : '?'
  return `${src}${separator}auto=compress&cs=tinysrgb&fm=webp&w=${width}`
}

function Photo({ src, alt, className = '', eager = false, sizes = '100vw' }: { src: string; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  const responsive = src.includes('images.pexels.com')
  const srcSet = responsive ? [640, 960, 1280, 1600, 1920].map(width => `${pexelsUrl(src, width)} ${width}w`).join(', ') : undefined
  return <img
    className={className}
    src={responsive ? pexelsUrl(src, eager ? 1600 : 1280) : src}
    srcSet={srcSet}
    sizes={responsive ? sizes : undefined}
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    fetchPriority={eager ? 'high' : 'auto'}
    decoding="async"
  />
}

function Intro() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setTimeout(() => setOn(false), reduced ? 400 : 2100)
    return () => clearTimeout(id)
  }, [])
  return on ? <div className="intro"><div className="orb o1"/><div className="orb o2"/><div className="intro-brand"><span>●</span><strong>AÇAÍ NATIVA</strong><small>Seu açaí. Seu momento. Seu jeito.</small></div></div> : null
}

function SelectedList({ selected, options }: { selected: readonly string[]; options: readonly PriceOption[] }) {
  if (!selected.length) return <span>—</span>
  return <span className="summary-list">{selected.map(name => {
    const option = options.find(item => item.name === name)
    return <span key={name}><span>{name}</span><small>{option ? `+ ${money(option.price)}` : ''}</small></span>
  })}</span>
}

function PriceChip({ active, name, price, onClick }: { active: boolean; name: string; price: number; onClick: () => void }) {
  return <button className={active ? 'chip active price-chip' : 'chip price-chip'} onClick={onClick}>
    <span className="check-slot">{active && <Check size={14}/>}</span>
    <span className="option-copy"><span>{name}</span><small>{incrementLabel(price)}</small></span>
  </button>
}

function App() {
  const [menu, setMenu] = useState(false)
  const [size, setSize] = useState('500')
  const [base, setBase] = useState('Açaí tradicional')
  const [fruits, setFruits] = useState<string[]>([])
  const [comps, setComps] = useState<string[]>([])
  const [tops, setTops] = useState<string[]>([])

  const toggle = (list: string[], set: (value: string[]) => void, value: string) => set(list.includes(value) ? list.filter(item => item !== value) : [...list, value])
  const chosen = acaiConfig.sizes.find(item => item.id === size) ?? acaiConfig.sizes[0]
  const selectedBase = acaiConfig.bases.find(item => item.name === base) ?? acaiConfig.bases[0]
  const fruitExtra = sumSelected(acaiConfig.fruits, fruits)
  const compExtra = sumSelected(acaiConfig.complements, comps)
  const topExtra = sumSelected(acaiConfig.toppings, tops)
  const additions = selectedBase.price + fruitExtra + compExtra + topExtra
  const total = Math.max(0, chosen.price + additions)

  const msg = useMemo(() => `Olá! Vim pelo site da ${acaiConfig.brand.name} e gostaria de pedir:\n\nTamanho: ${chosen.label}\nBase: ${base}${selectedBase.price ? ` (+ ${money(selectedBase.price)})` : ' (incluso)'}\nFrutas: ${fruits.join(', ') || 'Nenhuma'}\nComplementos: ${comps.join(', ') || 'Nenhum'}\nCobertura: ${tops.join(', ') || 'Nenhuma'}\n\nTotal calculado no site: ${money(total)}\nValor sujeito à confirmação da loja.`, [chosen.label, base, selectedBase.price, fruits, comps, tops, total])
  const generic = wa(`Olá! Vim pelo site da ${acaiConfig.brand.name} e gostaria de fazer um pedido.`)
  const nav = [['Início', 'inicio'], ['Monte o seu', 'monte'], ['Cardápio', 'cardapio'], ['Combos', 'combos'], ['Localização', 'localizacao'], ['Contato', 'contato']]

  return <>
    <Intro/>
    <header>
      <a className="logo" href="#inicio" aria-label="Açaí Nativa - início"><span className="brand-mark"><i/><i/><i/></span><b>AÇAÍ<br/>NATIVA</b></a>
      <nav className={menu ? 'open' : ''}>{nav.map(item => <a key={item[0]} href={`#${item[1]}`} onClick={() => setMenu(false)}>{item[0]}</a>)}</nav>
      <div className="header-actions">
        <SafeLink href={insta()} className="header-social"><Instagram size={19}/><span className="sr-only">Instagram</span></SafeLink>
        <SafeLink href={generic} className="btn yellow small"><span>Pedir agora</span><MessageCircle size={18}/></SafeLink>
        <button className="menu" aria-label="Abrir menu" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow"><Leaf size={15}/> frutas selecionadas todos os dias</span>
          <h1>Seu açaí,<br/><em>do seu jeito.</em></h1>
          <p>Cremoso, gelado e cheio de combinações pra deixar cada pedido único.</p>
          <div className="actions"><a className="btn yellow" href="#monte">Montar meu açaí <ArrowRight size={18}/></a><SafeLink href={generic} className="btn light"><MessageCircle size={18}/> Fazer pedido</SafeLink></div>
          <div className="notes"><span><Leaf/> Frutas frescas</span><span><Sparkles/> Várias combinações</span><span><Zap/> Pedido rápido</span></div>
        </div>
        <div className="hero-photo-wrap"><Photo src={acaiConfig.visual.hero} alt="Açaí cremoso com frutas frescas em fotografia gastronômica" className="hero-photo" eager sizes="(max-width: 760px) 100vw, 52vw"/><span className="hero-glow"/></div>
      </section>

      <section className="section featured-section" id="cardapio">
        <Title over="favoritos da casa" title="Comece por um Nativa." text="Combinações prontas para quando você quer escolher rápido e acertar."/>
        <div className="products">{acaiConfig.featuredProducts.map((product, index) => <article key={product.name}>
          <div className={`product-media ${index === 2 ? 'crocante' : ''}`}><Photo src={product.image} alt={`${product.name}: ${product.description}`} className={`product-photo product-photo-${index}`} sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, 25vw"/></div>
          <div className="product-copy"><h3>{product.name}</h3><p>{product.description}</p><div className="product-bottom"><strong>{money(product.price)}</strong><SafeLink href={wa(`Olá! Quero pedir um ${product.name}.`)} className="icon"><MessageCircle size={18}/><span className="sr-only">Pedir {product.name}</span></SafeLink></div></div>
        </article>)}</div>
      </section>

      <section className="sizes"><div className="section sizes-inner">
        <div className="sizes-copy"><span className="eyebrow">do pequeno ao caprichado</span><h2>Escolha o tamanho ideal.</h2><p>Quatro copos da mesma linha Nativa, apresentados em proporção crescente para comparar de verdade.</p></div>
        <div className="size-grid">{acaiConfig.sizes.map(item => <article className={`${item.featured ? 'featured-size ' : ''}size-${item.id}`} key={item.id}>
          <div className="size-stage"><Photo src={acaiConfig.visual.sizeImage} alt={`Copo de açaí representando ${item.label}`} className="size-photo" sizes="(max-width: 760px) 46vw, 18vw"/></div>
          {item.featured ? <span className="popular">Mais pedido</span> : <span className="popular placeholder" aria-hidden="true">&nbsp;</span>}
          <b>{item.label}</b><strong>{money(item.price)}</strong>
        </article>)}</div>
      </div></section>

      <section className="section builder" id="monte">
        <Title over="uma experiência simples" title="Monte seu açaí." text="Cada escolha atualiza o valor em tempo real. Você vê o acréscimo antes de adicionar e finaliza pelo WhatsApp."/>
        <div className="builder-grid"><div className="builder-box">
          <Group title="1. Escolha o tamanho">{acaiConfig.sizes.map(item => <button className={size === item.id ? 'chip active size-option' : 'chip size-option'} onClick={() => setSize(item.id)} key={item.id}><b>{item.label}</b><small>{money(item.price)}</small></button>)}</Group>
          <Group title="2. Escolha a base">{acaiConfig.bases.map(item => <PriceChip active={base === item.name} name={item.name} price={item.price} onClick={() => setBase(item.name)} key={item.name}/>)}</Group>
          <Group title="3. Escolha frutas">{acaiConfig.fruits.map(item => <PriceChip active={fruits.includes(item.name)} name={item.name} price={item.price} onClick={() => toggle(fruits, setFruits, item.name)} key={item.name}/>)}</Group>
          <Group title="4. Complementos">{acaiConfig.complements.map(item => <PriceChip active={comps.includes(item.name)} name={item.name} price={item.price} onClick={() => toggle(comps, setComps, item.name)} key={item.name}/>)}</Group>
          <Group title="5. Coberturas">{acaiConfig.toppings.map(item => <PriceChip active={tops.includes(item.name)} name={item.name} price={item.price} onClick={() => toggle(tops, setTops, item.name)} key={item.name}/>)}</Group>
        </div><aside>
          <span className="eyebrow pale">seu pedido</span><h3>{chosen.label} Nativa</h3>
          <div className="summary-row"><div><b>Base</b><span>{base}</span></div><strong>{incrementLabel(selectedBase.price)}</strong></div>
          <div className="summary-row"><div><b>Frutas</b><SelectedList selected={fruits} options={acaiConfig.fruits}/></div><strong>{fruitExtra ? `+ ${money(fruitExtra)}` : '—'}</strong></div>
          <div className="summary-row"><div><b>Complementos</b><SelectedList selected={comps} options={acaiConfig.complements}/></div><strong>{compExtra ? `+ ${money(compExtra)}` : '—'}</strong></div>
          <div className="summary-row"><div><b>Coberturas</b><SelectedList selected={tops} options={acaiConfig.toppings}/></div><strong>{topExtra ? `+ ${money(topExtra)}` : '—'}</strong></div>
          <div className="price-breakdown"><div className="price-line"><span>Valor base</span><b>{money(chosen.price)}</b></div><div className="price-line"><span>Adicionais</span><b>{money(additions)}</b></div><div className="price-total"><span>Total</span><strong>{money(total)}</strong></div></div>
          <SafeLink href={wa(msg)} className="btn yellow builder-cta"><MessageCircle size={19}/> Pedir pelo WhatsApp</SafeLink>
        </aside></div>
      </section>

      <section className="ingredients"><div className="section"><Title over="mais textura, mais sabor" title="Do fresco ao crocante."/><div className="ingredient-grid">{[
        ['Frutas', acaiConfig.fruits.map(item => item.name)],
        ['Cremes', ['Leite em pó', 'Creme de avelã', 'Creme branco', 'Creme de morango']],
        ['Crocantes', ['Granola', 'Paçoca', 'Amendoim', 'Cereal']],
        ['Coberturas', acaiConfig.toppings.map(item => item.name)],
      ].map((group, index) => <article key={group[0] as string}><span>0{index + 1}</span><h3>{group[0] as string}</h3>{(group[1] as readonly string[]).map(item => <p key={item}>{item}</p>)}</article>)}</div></div></section>

      <section className="section specials-section"><Title over="combinações especiais" title="Quando a gente monta por você."/><div className="specials">{acaiConfig.specials.map((product, index) => <article key={product.name}><span>0{index + 1}</span><Photo src={product.image} alt={`${product.name}: ${product.description}`} className="special-photo" sizes="(max-width: 760px) 100vw, 33vw"/><div className="special-copy"><h3>{product.name}</h3><p>{product.description}</p><div><strong>{money(product.price)}</strong><SafeLink href={wa(`Olá! Quero pedir um ${product.name}.`)} className="link">pedir <ArrowRight size={16}/></SafeLink></div></div></article>)}</div></section>

      <section className="power"><div><span className="eyebrow pale">linha power</span><h2>Energia para o seu ritmo.</h2><p>Banana, pasta de amendoim, granola e mix proteico em uma combinação prática e cheia de textura.</p><SafeLink href={wa('Olá! Quero saber mais sobre a opção Nativa Power.')} className="btn yellow">Quero experimentar <ArrowRight size={18}/></SafeLink></div><Photo src={acaiConfig.visual.power} alt="Nativa Power com banana, frutas, granola e complemento proteico" className="power-photo" sizes="(max-width: 760px) 100vw, 48vw"/></section>

      <section className="section" id="combos"><Title over="para dividir — ou não" title="Combos que resolvem."/><div className="combos">{acaiConfig.combos.map(combo => <article key={combo.name}><Photo src={combo.image} alt={`${combo.name}: ${combo.description}`} className="combo-photo" sizes="(max-width: 760px) 100vw, 33vw"/><div className="combo-copy"><h3>{combo.name}</h3><p>{combo.description}</p><div><strong>{money(combo.price)}</strong><SafeLink href={wa(`Olá! Quero pedir o ${combo.name}.`)} className="btn yellow small">Pedir combo</SafeLink></div></div></article>)}</div></section>

      <section className="gallery"><div className="section"><Title over="dá vontade só de olhar" title="Colorido de verdade."/><div className="gallery-grid">{acaiConfig.visual.gallery.map((photo, index) => <figure className={`gallery-item g${index + 1}`} key={photo.image}><Photo src={photo.image} alt={photo.alt} className="gallery-photo" sizes="(max-width: 480px) 100vw, (max-width: 1020px) 50vw, 34vw"/></figure>)}<div className="social"><Instagram/><h3>Açaí que também dá vontade no feed.</h3><SafeLink href={insta()} className="link">Ver no Instagram <ArrowRight size={16}/></SafeLink></div></div></div></section>

      <section className="section"><Title over="o que faz diferença" title="Simples, fresco, rápido."/><div className="features">{[['01', 'Ingredientes selecionados'], ['02', 'Frutas frescas'], ['03', 'Do seu jeito'], ['04', 'Pedido direto']].map(item => <article key={item[0]}><b>{item[0]}</b><h3>{item[1]}</h3><p>Uma experiência pensada para ser bonita, prática e fácil de pedir.</p></article>)}</div></section>

      <section className="delivery"><div><span className="eyebrow pale">delivery</span><h2>Seu açaí chega até você.</h2><p>Escolha seu favorito, monte do seu jeito e finalize o contato pelo canal preferido.</p><div className="actions"><SafeLink href={generic} className="btn yellow"><MessageCircle size={18}/> Pedir pelo WhatsApp</SafeLink><SafeLink href={acaiConfig.links.menuUrl || null} className="btn outline">Abrir cardápio online</SafeLink></div></div><div className="delivery-photo-wrap"><Photo src={acaiConfig.visual.delivery} alt="Pedido sendo entregue em embalagem de delivery" className="delivery-photo" sizes="(max-width: 760px) 100vw, 48vw"/></div></section>

      <section className="section location" id="localizacao"><div className="location-card"><div className="map"><MapPin/><span>Localização pronta para configurar</span></div><div><span className="eyebrow">onde encontrar</span><h2>Açaí Nativa</h2><p>{acaiConfig.location.address || 'Endereço será inserido aqui quando o site for adaptado para o cliente.'}</p><p><b>{[acaiConfig.location.city, acaiConfig.location.state].filter(Boolean).join(' • ') || 'Cidade e estado a definir'}</b></p><SafeLink href={acaiConfig.location.mapsUrl || null} className="btn dark"><MapPin size={18}/> Como chegar</SafeLink></div></div><div className="hours"><Clock3/><h3>Horários</h3>{acaiConfig.openingHours.map(item => <p key={item.label}><span>{item.label}</span><b>{item.value}</b></p>)}</div></section>

      <section className="section faq"><Title over="perguntas rápidas" title="Antes da primeira colherada."/>{[['Como faço um pedido?', 'Use um dos botões de pedido. Com o WhatsApp configurado, a conversa abre com uma mensagem pronta.'], ['Posso montar meu próprio açaí?', 'Sim. A seção Monte seu açaí permite escolher tamanho, base, frutas, complementos e cobertura com o total atualizado em tempo real.'], ['Quais tamanhos existem?', '300 ml, 400 ml, 500 ml e 700 ml, todos editáveis na configuração.'], ['Vocês fazem delivery?', 'O site está preparado para direcionar o pedido ao canal configurado.'], ['Onde fica a loja?', 'A localização real será inserida na configuração do cliente.'], ['Como falar pelo WhatsApp?', 'Ao inserir um número real em acaiConfig, todos os botões passam a funcionar automaticamente.']].map(([q, a]) => <details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</section>

      <section className="cta" id="contato"><span className="eyebrow pale">seu próximo favorito</span><h2>Já escolheu?</h2><p>Monte seu açaí e peça do seu jeito.</p><SafeLink href={generic} className="btn yellow">Fazer pedido <ArrowRight size={18}/></SafeLink></section>
    </main>

    <footer><div className="brand"><a className="logo" href="#inicio"><span className="brand-mark"><i/><i/><i/></span><b>AÇAÍ<br/>NATIVA</b></a><p>{acaiConfig.brand.tagline}</p></div><div><b>Navegação</b><a href="#monte">Monte o seu</a><a href="#cardapio">Cardápio</a><a href="#combos">Combos</a></div><div><b>Contato</b><SafeLink href={generic}>WhatsApp</SafeLink><SafeLink href={insta()}>Instagram</SafeLink><a href="#localizacao">Localização</a></div><div><b>Horários</b>{acaiConfig.openingHours.map(item => <span key={item.label}>{item.label}: {item.value}</span>)}</div><small>Desenvolvido por <strong>Yuukri</strong></small></footer>
    <SafeLink href={generic} className="float-wa"><MessageCircle/><span className="sr-only">WhatsApp</span></SafeLink>
  </>
}

function Title({ over, title, text }: { over: string; title: string; text?: string }) {
  return <div className="title"><span className="eyebrow">{over}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <fieldset><legend>{title}</legend><div className="chips">{children}</div></fieldset>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
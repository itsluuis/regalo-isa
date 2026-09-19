import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { tracks, things, hero } from './fotos'
import MiniPlayer from './MiniPlayer'

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const rad = (d: number) => (d * Math.PI) / 180
  const x = (a: number) => (cx + r * Math.cos(rad(a))).toFixed(2)
  const y = (a: number) => (cy + r * Math.sin(rad(a))).toFixed(2)
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  return `M ${x(a0)} ${y(a0)} A ${r} ${r} 0 ${large} 1 ${x(a1)} ${y(a1)}`
}

function CVinyl({ cover, color, id }: { cover: string; color: string; id: string }) {
  const c = 260
  const grooves = [246, 232, 218, 204, 190, 178, 166, 154, 142, 130]
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 520 520" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <radialGradient id={`${id}-shade`} cx="0.35" cy="0.3" r="1">
            <stop offset="0%" stopColor="#1d1d29" />
            <stop offset="55%" stopColor="#12121a" />
            <stop offset="100%" stopColor="#0a0a10" />
          </radialGradient>
          <clipPath id={`${id}-label`}>
            <circle cx={c} cy={c} r={48} />
          </clipPath>
        </defs>

        <circle cx={c} cy={c} r={248} fill={`url(#${id}-shade)`} />
        <circle cx={c} cy={c} r={247} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        {grooves.map((r) => (
          <circle key={r} cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" />
        ))}

        <path d={arcPath(c, c, 122, 40, 320)} fill="none" stroke={`url(#${id}-c)`} strokeWidth="28" strokeLinecap="round" />
        <path d={arcPath(c, c, 122, 40, 320)} fill="none" stroke="#0a0a0f" strokeWidth="5" opacity="0.4" />
        <path d={arcPath(c, c, 139, 40, 320)} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d={arcPath(c, c, 105, 40, 320)} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

        <circle cx={c} cy={c} r={64} fill="#0d0d16" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        <image href={cover} x={c - 48} y={c - 48} width={96} height={96} clipPath={`url(#${id}-label)`} preserveAspectRatio="xMidYMid slice" />
        <circle cx={c} cy={c} r={17} fill="#0a0a10" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default function App() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [ps5Index, setPs5Index] = useState(0)
  const [ps5Modal, setPs5Modal] = useState(false)
  const [failedVideos, setFailedVideos] = useState<number[]>([])
  const track = tracks[trackIndex]
  const ps5Thing = things[ps5Index]
  const ps5Video = ps5Thing.video
  const ps5VideoFailed = !ps5Video || failedVideos.includes(ps5Index)

  const closePs5Modal = () => setPs5Modal(false)

  useEffect(() => {
    if (!ps5Modal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePs5Modal()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [ps5Modal])

  const rowRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })

  const onRowDown = (e: MouseEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, startX: e.pageX, scrollLeft: rowRef.current?.scrollLeft ?? 0, moved: false }
  }

  const onRowMove = (e: MouseEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d.active || !rowRef.current) return
    const dx = e.pageX - d.startX
    if (Math.abs(dx) > 5) d.moved = true
    rowRef.current.scrollLeft = d.scrollLeft - dx
  }

  const onRowUp = () => {
    dragRef.current.active = false
  }

  const onRowClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const changeTrack = (dir: 1 | -1) => {
    setTransitioning(true)
    setRotation((r) => r + 360)
    setTimeout(() => {
      setTrackIndex((i) => (i + dir + tracks.length) % tracks.length)
      setTransitioning(false)
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e6f0]">

      {/* ── SECCIÓN 1: HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Fondo difuminado */}
        <div className="absolute inset-0">
          <img
            src={hero.bg}
            alt="Fondo de inicio"
            className="w-full h-full object-cover opacity-25"
            style={{ filter: 'blur(3px) saturate(0.7)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/85 to-[#0a0a0f]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/50" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto px-8 py-24 w-full">
          {/* Izquierda: foto enmarcada */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div
                className="absolute -inset-10 rounded-full opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, #e8a0bf 0%, transparent 70%)' }}
              />
              <div
                className="relative w-full max-w-sm md:w-[560px] aspect-[4/3] rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,160,191,0.2)' }}
              >
                <img
                  src={hero.frame}
                  alt="Ella, mirando al horizonte"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85) contrast(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]/70" />
                {/* Texto sobre la foto */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/60 text-xs tracking-widest uppercase">Siempre diciendo pendejadas</p>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#e8a0bf] rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#e8a0bf] rounded-br-lg" />
            </div>
          </div>

          {/* Derecha: texto */}
          <div className="flex flex-col justify-center gap-6">
            <div className="w-12 h-0.5" style={{ background: 'linear-gradient(90deg, #e8a0bf, transparent)' }} />
            <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase font-medium">Para ella · Con el poco cariño de todos uwu</p>
            <h1
              className="text-5xl md:text-6xl font-light leading-[1.1]"
              style={{ fontFamily: 'Fraunces, Georgia, serif', textShadow: '0 0 40px rgba(232,160,191,0.3)' }}
            >
              Para{' '}
              <em className="not-italic" style={{ color: '#e8a0bf' }}>Isa</em>,<br />
              que se fue<br />y nos abandono a todos aqui
            </h1>
            <p className="text-lg text-[#8a88a0] leading-relaxed max-w-md font-light">
              porque aunque nos odies todavia te apreciamos
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-10 h-px bg-[#e8a0bf]" />
              <p className="text-[#4a4a6a] text-sm italic" style={{ fontFamily: 'Fraunces, serif' }}>
                "Las distancias no rompen culos."
              </p>
            </div>
            <div className="flex gap-4 pt-2">
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: DISCO HÍBRIDO C ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden py-24"
        style={{ background: '#0b0b13' }}
      >
        {/* Lienzo limpio con división asimétrica sutil */}
        <div
          className="hidden md:block absolute top-0 bottom-0 w-px"
          style={{
            left: 'calc(var(--disc) + 24px)',
            background: 'linear-gradient(180deg, transparent, rgba(232,160,191,0.22) 30%, rgba(232,160,191,0.22) 70%, transparent)',
          }}
        />
        <div
          className="hidden md:block absolute top-0 bottom-0"
          style={{ left: 0, width: 'var(--disc)', background: 'linear-gradient(90deg, rgba(232,160,191,0.045), transparent)' }}
        />
        <div
          className="hidden md:block absolute top-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-[0.07] pointer-events-none"
          style={{
            left: 'calc(-1 * var(--disc) / 2)',
            width: 'var(--disc)',
            height: 'var(--disc)',
            background: track.color,
          }}
        />

        <div className="relative z-10 w-full px-8 md:px-0 md:pl-[calc(var(--disc)_+_48px)]">
          {/* MOBILE: disco completo centrado */}
          <div className="md:hidden flex justify-center pb-10">
            <div
              className="relative transition-all duration-500"
              style={{ width: 'min(78vw, 320px)', height: 'min(78vw, 320px)' }}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <CVinyl id="cvm" cover={track.cover} color={track.color} />
              </div>
            </div>
          </div>

          {/* DESKTOP: disco entero que gira, mostrando solo la mitad (como antes) */}
          <div
            className="hidden md:block absolute top-1/2 pointer-events-none"
            style={{
              left: 'calc(-1 * var(--disc))',
              width: 'calc(var(--disc) * 2)',
              height: 'calc(var(--disc) * 2)',
              transform: 'translateY(-50%)',
            }}
          >
            <div className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 50%)' }}>
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <CVinyl id="cvd" cover={track.cover} color={track.color} />
              </div>
            </div>
            <div
              className="absolute left-1/2 top-1/2 -translate-y-1/2 w-px"
              style={{ height: '90%', background: 'linear-gradient(180deg, transparent, rgba(232,160,191,0.35), transparent)' }}
            />
          </div>

          <div className="relative max-w-3xl">
            {/* Encabezado */}
            <div className="mb-12">
              <div className="w-12 h-0.5" style={{ background: 'linear-gradient(90deg, #e8a0bf, transparent)' }} />
              <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase font-medium mt-4">Para que nos recuerdes :v</p>
              <p className="text-[#4a4a6a] text-sm mt-1">uwu</p>
            </div>

            {/* Foto con descripción */}
            <div className="flex flex-col items-center md:items-start gap-8">
              <div
                className="w-full max-w-sm transition-all duration-500"
                style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateX(-20px)' : 'translateX(0)' }}
              >
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-3xl"
                  style={{
                    boxShadow: `0 24px 80px ${track.color}33`,
                    border: '1px solid rgba(232,160,191,0.15)',
                  }}
                >
                  <img
                    key={track.title}
                    src={track.cover}
                    alt={`Carátula de ${track.title}`}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.85) saturate(1.05)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/90 text-xl font-light leading-snug" style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic' }}>
                      «{track.msg}»
                    </p>
                  </div>
                </div>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => changeTrack(-1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    background: 'rgba(232,160,191,0.1)',
                    border: '1px solid rgba(232,160,191,0.25)',
                    boxShadow: '0 4px 20px rgba(232,160,191,0.15)',
                  }}
                  aria-label="Canción anterior"
                >
                  ◀
                </button>
                <button
                  onClick={() => changeTrack(1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    background: 'rgba(232,160,191,0.1)',
                    border: '1px solid rgba(232,160,191,0.25)',
                    boxShadow: '0 4px 20px rgba(232,160,191,0.15)',
                  }}
                  aria-label="Siguiente canción"
                >
                  ▶
                </button>
              </div>

              {/* Indicadores */}
              <div className="flex gap-2">
                {tracks.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i !== trackIndex) {
                        setTransitioning(true)
                        setRotation((r) => r + 360)
                        setTimeout(() => { setTrackIndex(i); setTransitioning(false) }, 700)
                      }
                    }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === trackIndex ? '24px' : '8px',
                      height: '8px',
                      background: i === trackIndex ? t.color : 'rgba(255,255,255,0.15)',
                    }}
                    aria-label={`Ir a canción ${i + 1}`}
                  />
                ))}
              </div>

              <p className="text-[#4a4a6a] text-sm">
                Canción {trackIndex + 1} de {tracks.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: COSAS DE ELLA (estilo PS5) ── */}
      <section className="relative min-h-screen py-24 overflow-hidden" style={{ background: '#07070e' }}>
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(232,160,191,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,191,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <div className="w-12 h-0.5" style={{ background: 'linear-gradient(90deg, #e8a0bf, transparent)' }} />
            <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase font-medium mt-4">Videos para recordar</p>
            <h2
              className="text-4xl md:text-5xl font-light mt-3 leading-tight"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Las cosas que te recuerdan a ti
            </h2>
          </div>

          {/* Simulador de pantalla PS5 */}
          <div className="rounded-[28px] overflow-hidden border border-white/10 bg-[#0d0d16] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            {/* Barra superior */}
            <div className="flex items-center justify-between px-5 md:px-8 py-3 bg-[#12121d]/95 border-b border-white/5">
              <span className="text-white/35 text-sm font-light tracking-wide">17:42</span>
              <div className="flex items-center gap-4 text-white/40 text-lg">◯&nbsp;&nbsp;✕&nbsp;&nbsp;▢&nbsp;&nbsp;△</div>
            </div>

            {/* Pantalla de la app seleccionada */}
            <div className="relative aspect-video md:aspect-[21/9] overflow-hidden bg-black">
              <img
                key={`ps5-${ps5Index}`}
                src={ps5Thing.img}
                alt={ps5Thing.label}
                className="absolute inset-0 w-full h-full object-cover kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-transparent to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-10">
                <span className="text-[#e8a0bf] text-xs tracking-[0.25em] uppercase">{ps5Thing.tag}</span>
                <h3 className="text-3xl md:text-5xl font-light mt-1" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                  {ps5Thing.label}
                </h3>
                <p className="text-white/55 text-sm md:text-base mt-1 max-w-md">{ps5Thing.desc}</p>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => setPs5Modal(true)}
                    className="px-6 py-2.5 rounded-full text-sm font-medium text-black bg-gradient-to-b from-white to-white/70 transition-transform duration-200 hover:scale-105 active:scale-95"
                    style={{ boxShadow: '0 8px 30px rgba(255,255,255,0.25)' }}
                  >
                    ▶ Reproducir
                  </button>
                </div>
              </div>
            </div>

            {/* Fila de aplicaciones */}
            <div className="px-5 md:px-8 py-5 bg-[#0d0d16]">
              <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Tus momentos</p>
              <div
                ref={rowRef}
                onMouseDown={onRowDown}
                onMouseMove={onRowMove}
                onMouseUp={onRowUp}
                onMouseLeave={onRowUp}
                onClickCapture={onRowClickCapture}
                className="flex gap-3 overflow-x-auto scroll-row pb-2 cursor-grab active:cursor-grabbing select-none"
              >
                {things.map((t, i) => {
                  const sel = i === ps5Index
                  return (
                    <button
                      key={i}
                      onMouseEnter={() => setPs5Index(i)}
                      onClick={() => setPs5Index(i)}
                      className="relative shrink-0 aspect-[3/4] w-28 md:w-36 rounded-xl overflow-hidden transition-all duration-300 border"
                      style={{
                        borderColor: sel ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)',
                        opacity: sel ? 1 : 0.6,
                        transform: sel ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)',
                        boxShadow: sel ? '0 20px 50px rgba(0,0,0,0.6)' : 'none',
                      }}
                    >
                      <img src={t.img} alt={t.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-left text-[11px] leading-tight text-white/90" style={{ fontFamily: 'Fraunces, serif' }}>
                        {t.label}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="text-white/25 text-[11px] mt-3 tracking-wide">
                {things.length} recuerdos · pásales el cursor o tocalas para reproducir cada video.
              </p>
            </div>
          </div>
        </div>

        {/* Ventana de video */}
        {ps5Modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fadein" onClick={closePs5Modal} />
            <div className="relative z-10 w-full max-w-4xl animate-pop">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d16] shadow-[0_60px_160px_rgba(0,0,0,0.9)]">
                {/* Encabezado */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#12121d]/95 border-b border-white/5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[#e8a0bf] text-[11px] tracking-widest uppercase shrink-0">{ps5Thing.tag}</span>
                    <span className="text-white/80 text-sm font-light truncate" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                      {ps5Thing.label}
                    </span>
                  </div>
                  <button
                    onClick={closePs5Modal}
                    aria-label="Cerrar"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {/* Video */}
                <video
                  key={`modal-${ps5Index}`}
                  src={ps5Video}
                  poster={ps5Thing.img}
                  autoPlay
                  controls
                  playsInline
                  className="w-full max-h-[60vh] bg-black"
                  onError={() => {
                    setFailedVideos((f) => (f.includes(ps5Index) ? f : [...f, ps5Index]))
                    closePs5Modal()
                  }}
                />

                {/* Anterior / Siguiente */}
                <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-white/5">
                  <button
                    onClick={() => setPs5Index((i) => (i - 1 + things.length) % things.length)}
                    aria-label="Video anterior"
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 border border-white/15 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    ◀
                  </button>
                  <div className="text-center">
                    <p className="text-white/70 text-sm" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{ps5Thing.label}</p>
                    <p className="text-white/30 text-xs">{ps5Index + 1} de {things.length}</p>
                  </div>
                  <button
                    onClick={() => setPs5Index((i) => (i + 1) % things.length)}
                    aria-label="Video siguiente"
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 border border-white/15 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    ▶
                  </button>
                </div>

                {/* Fila de todos los videos */}
                <div className="px-4 pb-4">
                  <p className="text-white/25 text-[10px] tracking-widest uppercase mb-2">Todos los videos</p>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {things.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => setPs5Index(i)}
                        className="relative shrink-0 w-16 h-24 rounded-lg overflow-hidden border transition-all"
                        style={{
                          borderColor: i === ps5Index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
                          opacity: i === ps5Index ? 1 : 0.55,
                        }}
                      >
                        <img src={t.img} alt={t.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                        {i === ps5Index && <div className="absolute inset-0 ring-2 ring-white/70 rounded-lg pointer-events-none" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── SECCIÓN 4: DESPEDIDA ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1777256005521-cb1e1e5c8509?w=1600&h=900&fit=crop&auto=format"
            alt="Dos amigas al atardecer"
            className="w-full h-full object-cover opacity-20"
            style={{ filter: 'blur(3px) saturate(0.6)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/75 to-[#0a0a0f]" />
        </div>

        {/* Orbs */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none" style={{ background: '#e8a0bf' }} />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full opacity-8 blur-[80px] pointer-events-none" style={{ background: '#f7c948' }} />

        <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #e8a0bf, transparent)' }} />
          </div>


          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] mb-8"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            Te fuiste,<br />
            y nos olvidaras<br />
            <em className="not-italic" style={{ color: '#e8a0bf' }}>pero nosotros haremos el esfuerzo para que sigamos en tu mente</em>
          </h2>

          <p className="text-[#8a88a0] text-lg leading-relaxed font-light max-w-lg mx-auto mb-6">
            Esta página la hicimos para que sepas que no importa cuántos kilómetros nos separen siempre seremos unos chuds.
          </p>

          <p className="text-[#6a6888] text-base leading-relaxed font-light max-w-lg mx-auto mb-12" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
            "Vuela alto, come rico, y sigue seindo tal y como eres"
          </p>

          {/* Firma */}
          <div className="flex items-center justify-center gap-5 mb-12">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,191,0.35))' }} />
            <p className="text-[#4a4a6a] text-sm" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
              — te queremos isa ♡
            </p>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, rgba(232,160,191,0.35), transparent)' }} />
          </div>

          {/* Botón volver */}
          <button
            className="text-[#4a4a6a] text-xs tracking-widest uppercase hover:text-[#e8a0bf] transition-colors duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Volver al principio
          </button>
        </div>
      </section>

      {/* ── Mini reproductor KH2 (flotante) ── */}
      <MiniPlayer />
    </div>
  )
}

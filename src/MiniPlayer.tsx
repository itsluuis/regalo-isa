import { useEffect, useRef, useState, type MouseEvent } from 'react'

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void
    YT?: any
    kh2Player?: any
  }
}

const KH2_VIDEO_ID = 'sihC5l_gIak'
const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/
const FONT = { fontFamily: 'Fraunces, Georgia, serif' }

export default function MiniPlayer() {
  const [kh2Ready, setKh2Ready] = useState(false)
  const [kh2Playing, setKh2Playing] = useState(false)
  const [kh2Panel, setKh2Panel] = useState(false)
  const [kh2Title, setKh2Title] = useState('Dearly Beloved (KH II Version)')
  const [kh2Thumb, setKh2Thumb] = useState('')
  const [kh2Vol, setKh2Vol] = useState(60)
  const [kpPos, setKpPos] = useState<{ x: number; y: number } | null>(null)
  const [kpDragging, setKpDragging] = useState(false)
  const kpDrag = useRef({ startX: 0, startY: 0, origX: 0, origY: 0 })

  useEffect(() => {
    const w = window
    const createPlayer = () => {
      const el = document.getElementById('kh2-player')
      if (!el || w.kh2Player) return
      w.kh2Player = new w.YT.Player('kh2-player', {
        videoId: KH2_VIDEO_ID,
        width: '320',
        height: '180',
        playerVars: {
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: KH2_VIDEO_ID,
        },
        events: {
          onReady: () => {
            setKh2Ready(true)
            try {
              w.kh2Player?.setVolume(kh2Vol)
            } catch {
              /* noop */
            }
          },
          onStateChange: (e: any) => {
            if (e.data === 0) {
              try {
                w.kh2Player?.playVideo()
              } catch {
                /* noop */
              }
            }
            setKh2Playing(e.data === 1 || e.data === 3)
          },
          onError: () => setKh2Playing(false),
        },
      })
    }
    if (w.YT && w.YT.Player) {
      createPlayer()
    } else {
      w.onYouTubeIframeAPIReady = createPlayer
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    }
  }, [])

  useEffect(() => {
    if (!kh2Ready) return
    const t = setInterval(() => {
      const p = window.kh2Player
      if (!p || typeof p.getVideoData !== 'function') return
      const d = p.getVideoData()
      if (d && d.title && d.video_id && VIDEO_ID_RE.test(d.video_id)) {
        setKh2Title(d.title)
        setKh2Thumb(`https://i.ytimg.com/vi/${d.video_id}/hqdefault.jpg`)
      }
    }, 1500)
    return () => clearInterval(t)
  }, [kh2Ready])

  useEffect(() => {
    if (!kpDragging) return
    const move = (ev: globalThis.MouseEvent) => {
      setKpPos({
        x: kpDrag.current.origX + (ev.clientX - kpDrag.current.startX),
        y: kpDrag.current.origY + (ev.clientY - kpDrag.current.startY),
      })
    }
    const up = () => setKpDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [kpDragging])

  const onKpDown = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    const barW = 300
    kpDrag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: kpPos?.x ?? Math.max(8, window.innerWidth - barW - 16),
      origY: kpPos?.y ?? Math.max(8, window.innerHeight - 160),
    }
    setKpDragging(true)
  }

  return (
    <div
      className="fixed z-40 select-none cursor-grab active:cursor-grabbing"
      style={kpPos ? { left: kpPos.x, top: kpPos.y } : { right: 16, bottom: 16 }}
      onMouseDown={onKpDown}
    >
      {kh2Panel && (
        <div className="absolute bottom-full right-0 mb-2 w-[300px] sm:w-[340px] rounded-2xl border border-white/10 bg-[#12121d]/95 backdrop-blur-xl p-3 shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-[#e8a0bf] text-[10px] tracking-[0.2em] uppercase font-medium">Kingdom Hearts II · Soundtrack</p>
            <button
              onClick={() => setKh2Panel(false)}
              aria-label="Cerrar lista"
              className="text-white/50 hover:text-white text-lg leading-none px-1"
            >
              ×
            </button>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${KH2_VIDEO_ID}`}
            title="Kingdom Hearts II — Soundtrack"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-52 sm:h-64 rounded-xl border-0"
          />
        </div>
      )}

      {/* Barra */}
      <div className="flex items-center gap-3 w-[300px] rounded-2xl border border-white/10 bg-[#12121d]/90 backdrop-blur-md px-3 py-2 shadow-[0_16px_60px_rgba(0,0,0,0.6)]">
        <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0" style={{ boxShadow: 'inset 0 0 0 1px rgba(232,160,191,0.35)' }}>
          {kh2Thumb ? (
            <img src={kh2Thumb} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'radial-gradient(circle at 35% 30%, #1c1730, #0d0d16)' }}>
              <span className="text-[11px] font-semibold" style={{ fontFamily: 'Fraunces, serif', color: '#e8a0bf' }}>KH2</span>
            </div>
          )}
          {kh2Playing && (
            <div className="absolute inset-0 flex items-end justify-center gap-[3px] pb-1.5 bg-black/25">
              <span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] text-white/90" style={FONT}>{kh2Title}</p>
          <p className="truncate text-[9px] text-white/35 tracking-[0.18em] uppercase mt-0.5">KH2 · Original Soundtrack</p>
        </div>

        <button
          onClick={() => {
            const p = window.kh2Player
            if (!p) return
            if (kh2Playing) p.pauseVideo()
            else p.playVideo()
          }}
          aria-label="Reproducir o pausar"
          className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/10 border border-white/15 hover:bg-white/20 hover:scale-105 transition-all text-lg leading-none"
        >
          {kh2Playing ? '⏸' : '▶'}
        </button>
        <button
          onClick={() => {
            const p = window.kh2Player
            if (p && kh2Playing) p.pauseVideo()
            setKh2Panel((v) => !v)
          }}
          aria-label="Ver lista de reproducción"
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${kh2Panel ? 'text-[#e8a0bf] bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
        >
          ♪
        </button>
        <div className="flex flex-col items-center gap-[3px] shrink-0" title={`Volumen ${kh2Vol}%`}>
          <button
            onClick={() => {
              const v = Math.min(100, kh2Vol + 10)
              window.kh2Player?.setVolume(v)
              setKh2Vol(v)
            }}
            aria-label="Subir volumen"
            className="w-6 h-4 flex items-center justify-center text-white/50 hover:text-white text-[10px] leading-none rounded hover:bg-white/10 transition-colors"
          >
            +
          </button>
          <button
            onClick={() => {
              const v = Math.max(0, kh2Vol - 10)
              window.kh2Player?.setVolume(v)
              setKh2Vol(v)
            }}
            aria-label="Bajar volumen"
            className="w-6 h-4 flex items-center justify-center text-white/50 hover:text-white text-[10px] leading-none rounded hover:bg-white/10 transition-colors"
          >
            −
          </button>
        </div>
      </div>

      {/* Reproductor oculto de YouTube (controlado por la barra) */}
      <div id="kh2-player" className="absolute -left-[9999px] top-0 w-[320px] h-[180px] opacity-0 pointer-events-none" />
    </div>
  )
}
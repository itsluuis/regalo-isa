const base = import.meta.env.BASE_URL

export const hero = {
  frame: `${base}fotos/IMG_20260912_134006_296.jpg`,
  bg: `${base}fotos/IMG_20260912_134006_296.jpg`,
}

export const tracks = [
  { title: 'Un dia en el cine', msg: 'Te recuerdas el dia donde todos fuimos al cine.', cover: `${base}fotos/IMG-20260802-WA0076.jpg`, color: '#e8a0bf' },
  { title: 'Atardecer nuestro', msg: 'El cerro que no pudo contra nosotros porque tenemos mucha aura.', cover: `${base}fotos/IMG-20260905-WA0232.jpg`, color: '#ff8a5c' },
  { title: 'Esa risa inmensa', msg: 'La cara de lesbiana que siempre vas a tener y vamos a extrañar', cover: `${base}fotos/IMG-20260912-WA0273.jpg`, color: '#7c6af7' },
  { title: 'Recuerdo preferido', msg: 'Tus fotos randoms que tampoco olvidaremos', cover: `${base}fotos/IMG-20260916-WA0088.jpg`, color: '#4ac9a0' },
  { title: 'Vuelo hacia ti', msg: 'Goofy ahhh.', cover: `${base}fotos/IMG_20260312_132604_770.jpg`, color: '#e8a0bf' },
  { title: 'Charla infinita', msg: 'Pov mate 3.', cover: `${base}fotos/IMG_20260312_132611_469.jpg`, color: '#f7c948' },
  { title: 'Mirada cómplice', msg: 'Otra vez la montaña homosexual', cover: `${base}fotos/IMG_20260905_094846_335.jpg`, color: '#7c6af7' },
  { title: 'Día de sol', msg: 'Esos días el mundo se sentía nuestro.', cover: `${base}fotos/IMG_20260905_121558_605.jpg`, color: '#6bc9f7' },
  { title: 'Caminata sin rumbo', msg: 'Ojala nos hubieramos encontrado algunos cultistas', cover: `${base}fotos/IMG_20260905_121658_013.jpg`, color: '#4ac9a0' },
  { title: 'Secreto nuestro', msg: 'Farmeando auraaaa.', cover: `${base}fotos/IMG_20260905_123609_051.jpg`, color: '#f76b8a' },
  { title: 'Cielo pintado', msg: 'El cielo sabía nuestro color favorito.', cover: `${base}fotos/IMG_20260912_113434_607.jpg`, color: '#ff8a5c' },
  { title: 'Tu rincón', msg: 'si', cover: `${base}fotos/IMG_20260912_113814_878.jpg`, color: '#7c6af7' },
  { title: 'El tiempo se detiene', msg: 'Siempre queriendo looksmaxear', cover: `${base}fotos/IMG_20260912_123259_376.jpg`, color: '#6bc9f7' },
  { title: 'Mil palabras', msg: 'Las fotos con mas aura', cover: `${base}fotos/IMG_20260912_130229_574.jpg`, color: '#4ac9a0' },
  { title: 'Brindis entre amigas', msg: 'La guacamaya que decia WTF', cover: `${base}fotos/IMG_20260912_134030_559.jpg`, color: '#f7c948' },
]

export const things = [
  { label: 'dia del cine', tag: 'cine', img: `${base}videos/VID_20260912_114212.jpg`, video: `${base}videos/VID_20260912_114212.mp4` },
  { label: 'recuerdos en el cerro', tag: 'Lo más importante', img: `${base}videos/VID_20260912_120457.jpg`, video: `${base}videos/VID_20260912_120457.mp4` },
  { label: 'Reírse de todo', tag: 'Terapia gratis', img: `${base}videos/VID_20260912_122230.jpg`, desc: 'Su risa era contagiosa. La habitación entera terminaba riendo sin saber por qué.', video: `${base}videos/VID_20260912_122230.mp4` },
  { label: 'Momentos juntos', tag: 'Los que más duelen extrañar', img: `${base}videos/VID_20260912_122445.jpg`, desc: 'Los que pensábamos que siempre iban a estar, y ahora son recuerdos que atesoro.', video: `${base}videos/VID_20260912_122445.mp4` },
  { label: 'Nuevos horizontes', tag: 'Su nuevo capítulo', img: `${base}videos/VID_20260912_122611.jpg`, desc: 'Volar asusta, pero ella siempre supo que era hacia algo mejor.', video: `${base}videos/VID_20260912_122611.mp4` },
  { label: 'Risas y charlas', tag: 'Nuestro sello', img: `${base}videos/VID_20260912_124013.jpg`, desc: 'Las horas volaban cuando estábamos juntas.', video: `${base}videos/VID_20260912_124013.mp4` },
  { label: 'Un café entre las dos', tag: 'Tarde perfecta', img: `${base}videos/VID_20260912_162646_188.jpg`, video: `${base}videos/VID_20260912_162646_188.mp4` },
  { label: 'Risas de la noche', tag: 'Republica 1', img: `${base}videos/IMG_20260912_185759_656.jpg`, desc: 'Deleted scenes que valen oro.', video: `${base}videos/IMG_20260912_185759_656.mp4` },
  { label: 'Momento 2', tag: 'Para recordar', img: `${base}videos/IMG_20260912_185856_529.jpg`, desc: 'Otra escena que no podía faltar.', video: `${base}videos/IMG_20260912_185856_529.mp4` },
  { label: 'Cámara espía', tag: 'Vimos cositas', img: `${base}videos/IMG_20260912_185951_468.jpg`, desc: 'Lo que pasa en pantalla, queda en pantalla.', video: `${base}videos/IMG_20260912_185951_468.mp4` },
  { label: 'En vivo', tag: 'La crónica', img: `${base}videos/IMG_20260912_190043_843.jpg`, desc: 'El momento exacto.', video: `${base}videos/IMG_20260912_190043_843.mp4` },
  { label: 'Bailes prohibidos', tag: 'Episodio 2', img: `${base}videos/IMG_20260912_190152_749.jpg`, desc: 'Nadie tenía permiso para eso.', video: `${base}videos/IMG_20260912_190152_749.mp4` },
  { label: 'Detrás de cámaras', tag: 'Deleted scenes', img: `${base}videos/IMG_20260912_190256_527.jpg`, desc: 'Lo que no salió en el tráiler.', video: `${base}videos/IMG_20260912_190256_527.mp4` },
  { label: 'Última escena', tag: 'Fin de la película', img: `${base}videos/IMG_20260912_190343_666.jpg`, desc: 'Hasta la próxima.', video: `${base}videos/IMG_20260912_190343_666.mp4` },
]
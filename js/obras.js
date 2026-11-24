/* =========================================================
   Obras de Shelly Sarfati, por colección.
   Los textos de "ficha", "tecnica" y "medidas" están copiados
   tal cual del sitio original (incluidas sus erratas).

   img   → ruta local de la imagen (img/obras/…), recortada solo a la obra
           (sin marco, paspartú ni pared). Miniatura en …/thumbs/.
           Originales completos en img/originales/.
   piezas → obras de varias piezas ("c/u"): cuántas piezas y separación
           en cm (la de la foto original). La imagen es un PNG con las
           piezas y huecos transparentes, para que entre ellas se vea el muro.
   ========================================================= */

const COLECCIONES = [
  {
    id: 'heme-aqui',
    nombre: 'Heme aquí',
    obras: [
      { ficha: 'Precursor, 2021', tecnica: 'Acrílico, óleo, carboncillo sobre lienzo', medidas: '70 x 90 cm', img: 'img/obras/heme-aqui/01-precursor.jpg' },
      { ficha: 'Aridez que florece 2024', tecnica: 'Tintas, grafito y acrílico sobre lienzo', medidas: '120 x 100 cm', img: 'img/obras/heme-aqui/02-aridez-que-florece.jpg' },
      { ficha: 'El peso del origen, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 30.5 cm', img: 'img/obras/heme-aqui/03-el-peso-del-origen.jpg' },
      { ficha: 'El cuerpo de la ausencia, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '140 x 140 cm', img: 'img/obras/heme-aqui/04-el-cuerpo-de-la-ausencia.jpg' },
      { ficha: 'Re-trip I, 2020 - 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100 x 90 cm', img: 'img/obras/heme-aqui/05-re-trip-i.jpg' },
      { ficha: 'Re-trip I, 2020 - 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100 x 90 cm', img: 'img/obras/heme-aqui/06-re-trip-i.jpg' },
      { ficha: 'Re-trip III, 2020 - 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100 x 90 cm', img: 'img/obras/heme-aqui/07-re-trip-iii.jpg' },
      { ficha: 'Simbiosis inter-racial, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '90 x 90 cm', img: 'img/obras/heme-aqui/08-simbiosis-inter-racial.jpg' },
      { ficha: 'Esfuerzo silente, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '130x 110 cm', img: 'img/obras/heme-aqui/09-esfuerzo-silente.jpg' },
      { ficha: 'Espinas intrínsecas, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '140x 140 cm', img: 'img/obras/heme-aqui/10-espinas-intrinsecas.jpg' },
      { ficha: 'Simbiosis primigenia, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100x 100 cm', img: 'img/obras/heme-aqui/11-simbiosis-primigenia.jpg' },
    ],
  },
  {
    id: 'heme-aqui-mini',
    padre: 'heme-aqui',   // subserie: aparece debajo de Heme aquí, no en el menú principal
    nombre: 'Heme aquí mini',
    obras: [
      { ficha: 'Espinas Intrínsecas, 2024', tecnica: 'Tintas, pintura acrílica, grafito sobre papel', medidas: '23 x 23 cm', img: 'img/obras/heme-aqui-mini/01-espinas-intrinsecas.jpg' },
      { ficha: 'El peso del origen, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 30.5 cm', img: 'img/obras/heme-aqui-mini/02-el-peso-del-origen.jpg' },
      { ficha: 'Simbiosis primigenia, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/03-simbiosis-primigenia.jpg' },
      { ficha: 'Flor en el desierto, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/04-flor-en-el-desierto.jpg' },
      { ficha: 'Espinas Intrínsecas II, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/05-espinas-intrinsecas-ii.jpg' },
      { ficha: 'Heme aquí II, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/06-heme-aqui-ii.jpg' },
      { ficha: 'Intercambio nocturno, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 23 cm', img: 'img/obras/heme-aqui-mini/07-intercambio-nocturno.jpg' },
      { ficha: 'Eslabones, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/08-eslabones.jpg' },
      { ficha: 'Heme aquí, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/09-heme-aqui.jpg' },
      { ficha: 'Crecimiento ancestral, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 23 cm', img: 'img/obras/heme-aqui-mini/10-crecimiento-ancestral.jpg' },
      { ficha: 'Espinas Intrínsecas, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/11-espinas-intrinsecas.jpg' },
      { ficha: 'Fragmentos de supervivencia, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/12-fragmentos-de-supervivencia.jpg' },
      { ficha: 'Entre tunas, 2025', tecnica: 'Tintas, pintura acrílica, grafito sobre papel', medidas: '23 x 23 cm', img: 'img/obras/heme-aqui-mini/13-entre-tunas.jpg' },
      { ficha: 'Injerto espontáneo, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/14-injerto-espontaneo.jpg' },
      { ficha: 'El cuerpo de la ausencia, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 23 cm', img: 'img/obras/heme-aqui-mini/15-el-cuerpo-de-la-ausencia.jpg' },
      { ficha: 'Inserción cultural, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: 'img/obras/heme-aqui-mini/16-insercion-cultural.jpg' },
    ],
  },
  {
    id: 'cartografias',
    nombre: 'Cartografías de un ser incompleto',
    obras: [
      { ficha: 'Modelo de un tríptico I,II,III, 2025', tecnica: 'Collage (tintas, grafito, acrílico y lapices sobre cartulina)', medidas: '65 x 50 cm c/u', img: 'img/obras/cartografias/01-modelo-de-un-triptico-i-ii-iii.png', piezas: 3, separacion: 13.9 },
      { ficha: 'Deconstruir para construir, 2025', tecnica: 'Collage con papel tapiz sobre carton', medidas: '100 x 75 cm c/u', img: 'img/obras/cartografias/02-deconstruir-para-construir.png', piezas: 2, separacion: 29.6 },
      { ficha: 'Gran matriz, 2025', tecnica: 'Collage, tintas, grafito, acrílico sobre papel', medidas: '65 x 75 cm', img: 'img/obras/cartografias/03-gran-matriz.jpg' },
      { ficha: 'Cartografias de un ser incompleto, 2025', tecnica: 'Collage (tintas, grafito, acrílico y lapices sobre cartulina)', medidas: '100 x 70 cm c/u', img: 'img/obras/cartografias/04-cartografias-de-un-ser-incompleto.png', piezas: 3, separacion: 18.8 },
      { ficha: 'Hueco habitado, 2025', tecnica: 'Collage (tintas, grafito, acrílico y lapices sobre cartulina)', medidas: '65 x 50 cm c/u', img: 'img/obras/cartografias/05-hueco-habitado.png', piezas: 2, separacion: 27.3 },
    ],
  },
];

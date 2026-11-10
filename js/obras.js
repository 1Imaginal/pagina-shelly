/* =========================================================
   Obras de Shelly Sarfati, por colección.
   Los textos de "ficha", "tecnica" y "medidas" están copiados
   tal cual del sitio original (incluidas sus erratas).

   img   → id de la imagen en Wix (static.wixstatic.com/media/…).
           Cuando descarguen las imágenes al repo, cambien img
           por la ruta local, p. ej. "img/heme-aqui/precursor.jpg".
   piezas → para obras de varias piezas ("c/u"): cuántas piezas
           y separación entre ellas en cm. Así la galería calcula
           el ancho real del conjunto.
   ========================================================= */

const COLECCIONES = [
  {
    id: 'heme-aqui',
    nombre: 'Heme aquí',
    obras: [
      { ficha: 'Precursor, 2021', tecnica: 'Acrílico, óleo, carboncillo sobre lienzo', medidas: '70 x 90 cm', img: '833697_e3adb27ac5a54babb8910b84180803f1~mv2.jpg' },
      { ficha: 'Aridez que florece 2024', tecnica: 'Tintas, grafito y acrílico sobre lienzo', medidas: '120 x 100 cm', img: '833697_fbd975cdf190430da196acdaa7dfa52e~mv2.jpg' },
      { ficha: 'El peso del origen, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 30.5 cm', img: '833697_0d2c9ee36d294b6b954e580a1ad3420f~mv2.jpg' },
      { ficha: 'El cuerpo de la ausencia, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '140 x 140 cm', img: '833697_f139fe1f469a496f87c584936125174b~mv2.jpg' },
      { ficha: 'Re-trip I, 2020 - 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100 x 90 cm', img: '833697_82cdc96b243944508044752414340108~mv2.jpg' },
      { ficha: 'Re-trip I, 2020 - 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100 x 90 cm', img: '833697_d0db54513b404abd9a90d86312055c0e~mv2.jpg' },
      { ficha: 'Re-trip III, 2020 - 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100 x 90 cm', img: '833697_70fcc1a299d54061b527bde6cf6d6a91~mv2.jpg' },
      { ficha: 'Simbiosis inter-racial, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '90 x 90 cm', img: '833697_1abf0e8a91ba4edf8b9e15554f5ef355~mv2.jpg' },
      { ficha: 'Esfuerzo silente, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '130x 110 cm', img: '833697_168da4f1314a4d429b74d069f3367f4a~mv2.jpg' },
      { ficha: 'Espinas intrínsecas, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '140x 140 cm', img: '833697_9584c6d65b294aaaa8d3ded076850b44~mv2.jpg' },
      { ficha: 'Simbiosis primigenia, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '100x 100 cm', img: '833697_153d2de20edc43b493dc4d70c43f8e9b~mv2.jpg' },
    ],
  },
  {
    id: 'heme-aqui-mini',
    nombre: 'Heme aquí mini',
    obras: [
      { ficha: 'Espinas Intrínsecas, 2024', tecnica: 'Tintas, pintura acrílica, grafito sobre papel', medidas: '23 x 23 cm', img: '833697_6316f3ef643f4f42a56561d5eb7d9ecb~mv2.jpg' },
      { ficha: 'El peso del origen, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 30.5 cm', img: '833697_3d4de02ca9be45c9a4a334237756b2f9~mv2.jpg' },
      { ficha: 'Simbiosis primigenia, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_c972dde0c12b45f0bbca01e3ffb54b99~mv2.jpg' },
      { ficha: 'Flor en el desierto, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_5fe6069c64074008a53dbed1977f3d99~mv2.jpg' },
      { ficha: 'Espinas Intrínsecas II, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_332c426b908b4d8d86a1c05581513eb7~mv2.jpg' },
      { ficha: 'Heme aquí II, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_fbc042ac25104111a79e8833c83c8b71~mv2.jpg' },
      { ficha: 'Intercambio nocturno, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 23 cm', img: '833697_be4e4a2f286b4019b6caa559e30612c1~mv2.jpg' },
      { ficha: 'Eslabones, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_5101a4ade0404ccabd35560c6fe651bb~mv2.jpg' },
      { ficha: 'Heme aquí, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_06b9cb35d7b04666987107ff0dba7394~mv2.jpg' },
      { ficha: 'Crecimiento ancestral, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 23 cm', img: '833697_b5a33f2c1f8a411bb9374744d6ad12c9~mv2.jpg' },
      { ficha: 'Espinas Intrínsecas, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_785d223d592c4393858f28495abfdb5a~mv2.jpg' },
      { ficha: 'Fragmentos de supervivencia, 2024', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_e9ac13f8e90446689d3871b00389b7f4~mv2.jpg' },
      { ficha: 'Entre tunas, 2025', tecnica: 'Tintas, pintura acrílica, grafito sobre papel', medidas: '23 x 23 cm', img: '833697_7d4b2aadc013411fa39e2d4637b5f01e~mv2.jpg' },
      { ficha: 'Injerto espontáneo, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_bbea3874c6354097bbe36d501fb3d831~mv2.jpg' },
      { ficha: 'El cuerpo de la ausencia, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '23 x 23 cm', img: '833697_8d6d5de910cc4b9faa041b419c9aa889~mv2.jpg' },
      { ficha: 'Inserción cultural, 2025', tecnica: 'Tintas, pintura acrílica sobre papel', medidas: '30.5 x 23 cm', img: '833697_e30e5c36a1fa4024a53ab7e114e36e0a~mv2.jpg' },
    ],
  },
  {
    id: 'cartografias',
    nombre: 'Cartografías de un ser incompleto',
    obras: [
      { ficha: 'Modelo de un tríptico I,II,III, 2025', tecnica: 'Collage (tintas, grafito, acrílico y lapices sobre cartulina)', medidas: '65 x 50 cm c/u', img: '833697_a3704acdd2904fc3b047ca2d6db3aa8d~mv2.jpeg', piezas: 3, separacion: 8 },
      { ficha: 'Deconstruir para construir, 2025', tecnica: 'Collage con papel tapiz sobre carton', medidas: '100 x 75 cm c/u', img: '833697_80f8f90fe6cf4bea96a8814a002633a7~mv2.jpg' },
      { ficha: 'Gran matriz, 2025', tecnica: 'Collage, tintas, grafito, acrílico sobre papel', medidas: '65 x 75 cm', img: '833697_6ded947a794848c79b4eaf017b598ef4~mv2.jpg' },
      { ficha: 'Cartografias de un ser incompleto, 2025', tecnica: 'Collage (tintas, grafito, acrílico y lapices sobre cartulina)', medidas: '100 x 70 cm c/u', img: '833697_562d6341b1034c298e9e8cad1fd6723e~mv2.jpg', piezas: 3, separacion: 10 },
      { ficha: 'Hueco habitado, 2025', tecnica: 'Collage (tintas, grafito, acrílico y lapices sobre cartulina)', medidas: '65 x 50 cm c/u', img: '833697_33f6993b66e84bc681c77f4d5ebea931~mv2.jpg' },
    ],
  },
];

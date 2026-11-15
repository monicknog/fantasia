const fs = require('fs');

const indexHtml = fs.readFileSync('c:/Projetos/fantasia/index.html', 'utf8');
const splitMarker = '    <!-- ==================== FOLHA 2:';
const endMarker = '  </main>';

const parts = indexHtml.split(splitMarker);
let beforeFolha2 = parts[0];
let afterMain = parts[1].split(endMarker)[1];

// Update header in beforeFolha2
beforeFolha2 = beforeFolha2.replace(
  'Padrinhos Mágicos — FOLHA 1/4 (COROA FLUTUANTE &amp; VARINHA)',
  'PADRINHOS MÁGICOS — FOLHA 1/10 (COROA DO DESENHO &amp; VARINHA)'
);
beforeFolha2 = beforeFolha2.replace(
  '<span>📄 <b>Folha 1 de 4</b> — Coroa Flutuante',
  '<span>📄 <b>Folha 1 de 10</b> — Coroa do Desenho (85×50mm — Sem cilindro!) + Estrelas da Varinha'
);
beforeFolha2 = beforeFolha2.replace(
  '<span>📄 <b>Folha 1</b> — Coroa Estilo Desenho Animado (Frente e Verso 85×50mm — Sem cilindro!) + Estrelas da Varinha (Ø 95mm) + Revestimento do Cabo (180×22mm + 110×22mm)</span>',
  '<span>📄 <b>Folha 1 de 10</b> — Coroa do Desenho (85×50mm — Sem cilindro!) + Estrelas da Varinha (Ø 95mm Frente e Verso) + Tiras do Cabo</span>'
);

function makeRuler(num, title, subtitle) {
  return [
    '          <rect x="0" y="0" width="210" height="297" fill="#FFFFFF" />',
    '          <g class="tech-guide">',
    '            <rect x="5" y="5" width="200" height="287" fill="none" stroke="#CBD5E1" stroke-width="0.25" stroke-dasharray="2,2" />',
    '          </g>',
    '          <g transform="translate(10, 8)">',
    '            <text class="accessory-text" x="0" y="4.5" font-family="Segoe UI, Arial, sans-serif" font-size="3.6" font-weight="800" fill="#0F172A">',
    '              ' + title,
    '            </text>',
    '            <text class="accessory-text" x="0" y="8.5" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" fill="#475569">',
    '              ' + subtitle,
    '            </text>',
    '            <g transform="translate(135, 0)">',
    '              <rect x="-3" y="-1.5" width="56" height="11.5" rx="1.2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="0.3" />',
    '              <text x="25" y="1.8" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" font-weight="700" fill="#0F172A">RÉGUA: EXATOS 50 mm (5 cm)</text>',
    '              <line x1="0" y1="6.5" x2="50" y2="6.5" stroke="#0F172A" stroke-width="0.5" />',
    '              <g stroke="#0F172A" stroke-width="0.3">',
    '                <line x1="0"  y1="3.5" x2="0"  y2="6.5" stroke-width="0.5" />',
    '                <line x1="10" y1="3.5" x2="10" y2="6.5" stroke-width="0.5" />',
    '                <line x1="20" y1="3.5" x2="20" y2="6.5" stroke-width="0.5" />',
    '                <line x1="30" y1="3.5" x2="30" y2="6.5" stroke-width="0.5" />',
    '                <line x1="40" y1="3.5" x2="40" y2="6.5" stroke-width="0.5" />',
    '                <line x1="50" y1="3.5" x2="50" y2="6.5" stroke-width="0.5" />',
    '              </g>',
    '              <text x="0" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">0</text>',
    '              <text x="25" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">2.5</text>',
    '              <text x="50" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="700" fill="#0F172A">5cm</text>',
    '            </g>',
    '          </g>'
  ].join('\n');
}

const wingDefs = [
  '          <defs>',
  '            <linearGradient id="wingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
  '              <stop offset="0%" style="stop-color: var(--wings-inner);" />',
  '              <stop offset="55%" style="stop-color: var(--wings-fill);" />',
  '              <stop offset="100%" style="stop-color: var(--wings-FillGradStop);" />',
  '            </linearGradient>',
  '            <pattern id="glueHatchWing" width="3.5" height="3.5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">',
  '              <line x1="0" y1="0" x2="0" y2="3.5" stroke="#0284C7" stroke-width="0.45" />',
  '            </pattern>',
  '          </defs>'
].join('\n');

let middle = '';

// FOLHA 2: GABARITOS ACETATO + MAPA 8 FOLHAS
middle += [
  '    <!-- ==================== FOLHA 2: GABARITOS DE ACETATO E MAPA DE MONTAGEM ==================== -->',
  '    <div class="sheet-wrapper">',
  '      <div class="sheet-caption no-print">',
  '        <span>📄 <b>Folha 2 de 10</b> — Gabaritos em Acetato (Haste 5A + Abraçadeira 5B + Placa das Asas 5C) + Mapa das Asas Gigantes (8 Folhas A4)</span>',
  '      </div>',
  '      <article class="a4-sheet" id="sheet2">',
  '        <svg id="svgSheet2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">',
  makeRuler(2, 'PADRINHOS MÁGICOS — FOLHA 2/10 (GABARITOS DE ACETATO &amp; MAPA DAS ASAS)', 'Gabaritos para recortar em folha de acetato transparente + Mapa de montagem das Asas Gigantes'),
  '          <!-- GABARITO DE ACETATO -->',
  '          <g id="acetateSection" transform="translate(0, 22)">',
  '            <text x="105" y="4" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="3.2" font-weight="800" fill="#0F172A">',
  '              MOLDES EM ACETATO TRANSPARENTE (COLOCAR O ACETATO POR CIMA E CORTAR)',
  '            </text>',
  '            <!-- 5A. Haste da Coroa (160 x 15mm) -->',
  '            <g transform="translate(25, 10)">',
  '              <rect x="0" y="0" width="160" height="15" fill="var(--acetate-fill)" stroke="var(--acetate-stroke)" stroke-width="0.85" />',
  '              <line x1="12" y1="0" x2="12" y2="15" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />',
  '              <line x1="25" y1="0" x2="25" y2="15" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />',
  '              <line x1="60" y1="0" x2="60" y2="15" stroke="#15803D" stroke-width="0.6" stroke-dasharray="2,1.5" />',
  '              <line x1="145" y1="0" x2="145" y2="15" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />',
  '              <text x="82" y="6.8" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0369A1">',
  '                5A. HASTE DE ACETATO (160 × 15 mm) — RECORTE 2× E COLE DUPLA P/ 1,60 m',
  '              </text>',
  '              <text x="82" y="11" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.9" fill="#334155">',
  '                Dobra verde em 60mm deixa 7,5 cm flutuando livre na cabeça! Topo (15mm) cola na coroa.',
  '              </text>',
  '            </g>',
  '            <!-- 5B. Abraçadeira na Tiara (100 x 35mm) -->',
  '            <g transform="translate(25, 30)">',
  '              <path d="M 35,0 L 65,0 L 65,10 L 100,10 L 100,25 L 65,25 L 65,35 L 35,35 L 35,25 L 0,25 L 0,10 L 35,10 Z"',
  '                fill="var(--acetate-fill)" stroke="var(--acetate-stroke)" stroke-width="0.85" />',
  '              <rect x="42.25" y="12" width="15.5" height="2.2" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.5" />',
  '              <rect x="42.25" y="20.8" width="15.5" height="2.2" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.5" />',
  '              <text x="50" y="18.3" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" font-weight="800" fill="#0F172A">',
  '                5B. ABRAÇADEIRA TIARA (100 × 35 mm) — PASSE A HASTE NAS FENDAS',
  '              </text>',
  '            </g>',
  '            <!-- 5C. Placa Central de Sustentação das Asas Gigantes (160 x 32mm) com 4 furos -->',
  '            <g transform="translate(25, 70)">',
  '              <rect x="0" y="0" width="160" height="32" rx="3" fill="var(--acetate-fill)" stroke="var(--acetate-stroke)" stroke-width="0.85" />',
  '              <circle cx="20" cy="10" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />',
  '              <circle cx="20" cy="22" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />',
  '              <circle cx="140" cy="10" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />',
  '              <circle cx="140" cy="22" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />',
  '              <line x1="80" y1="0" x2="80" y2="32" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />',
  '              <text x="80" y="12" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0369A1">',
  '                5C. PLACA CENTRAL DE SUSTENTAÇÃO DAS ASAS GIGANTES EM ACETATO (160 × 32 mm)',
  '              </text>',
  '              <text x="80" y="17.5" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" fill="#334155">',
  '                Cole esta placa atrás da união das asas nas costas: ela mantém as asas abertas sem dobrar!',
  '              </text>',
  '              <text x="80" y="23" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" font-weight="700" fill="#DC2626">',
  '                Fure os 4 pontos (⊕) coincidindo com os furos das asas para passar as alças de elástico',
  '              </text>',
  '            </g>',
  '          </g>',
  '          <!-- MAPA VISUAL COMPLETO: COMO MONTAR A ASA GIGANTE DE 8 FOLHAS A4 (4 ESQ + 4 DIR) -->',
  '          <g class="tech-guide" transform="translate(10, 134)">',
  '            <rect x="0" y="0" width="190" height="152" rx="3" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="0.4" />',
  '            <text x="95" y="8" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="3.2" font-weight="800" fill="#0F172A">',
  '              MAPA DE MONTAGEM: ASA GIGANTE COSPLAY (4 FOLHAS ESQUERDA + 4 FOLHAS DIREITA = 80 × 54 cm)',
  '            </text>',
  '            <!-- Lado Esquerdo -->',
  '            <g transform="translate(15, 14)">',
  '              <rect x="0" y="0" width="75" height="110" fill="#E0F2FE" stroke="#0284C7" stroke-width="0.8" rx="2" />',
  '              <text x="37.5" y="7" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="800" fill="#0369A1">',
  '                ASA ESQUERDA (40 × 54 cm)',
  '              </text>',
  '              <rect x="3" y="12" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />',
  '              <text x="19.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 4</text>',
  '              <text x="19.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(E2: Sup. Externo)</text>',
  '              <rect x="39" y="12" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />',
  '              <text x="55.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 3</text>',
  '              <text x="55.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(E1: Sup. Interno)</text>',
  '              <circle cx="68" cy="24" r="1.5" fill="#DC2626" />',
  '              <circle cx="68" cy="42" r="1.5" fill="#DC2626" />',
  '              <rect x="3" y="58" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />',
  '              <text x="19.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 6</text>',
  '              <text x="19.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(E4: Inf. Externo)</text>',
  '              <rect x="39" y="58" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />',
  '              <text x="55.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 5</text>',
  '              <text x="55.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(E3: Inf. Interno)</text>',
  '              <circle cx="68" cy="66" r="1.5" fill="#DC2626" />',
  '              <circle cx="68" cy="88" r="1.5" fill="#DC2626" />',
  '              <text x="37.5" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="700" fill="#0369A1">',
  '                4 FOLHAS A4 FORMAM O LADO ESQUERDO',
  '              </text>',
  '            </g>',
  '            <!-- Eixo Central -->',
  '            <g transform="translate(91, 24)">',
  '              <line x1="4" y1="0" x2="4" y2="100" stroke="#DC2626" stroke-width="1.2" stroke-dasharray="3,2" />',
  '              <text x="4" y="50" text-anchor="middle" transform="rotate(-90 4 50)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#DC2626">',
  '                EIXO CENTRAL DAS COSTAS',
  '              </text>',
  '            </g>',
  '            <!-- Lado Direito -->',
  '            <g transform="translate(100, 14)">',
  '              <rect x="0" y="0" width="75" height="110" fill="#E0F2FE" stroke="#0284C7" stroke-width="0.8" rx="2" />',
  '              <text x="37.5" y="7" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="800" fill="#0369A1">',
  '                ASA DIREITA (40 × 54 cm)',
  '              </text>',
  '              <rect x="3" y="12" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />',
  '              <text x="19.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 7</text>',
  '              <text x="19.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(D1: Sup. Interno)</text>',
  '              <circle cx="7" cy="24" r="1.5" fill="#DC2626" />',
  '              <circle cx="7" cy="42" r="1.5" fill="#DC2626" />',
  '              <rect x="39" y="12" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />',
  '              <text x="55.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 8</text>',
  '              <text x="55.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(D2: Sup. Externo)</text>',
  '              <rect x="3" y="58" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />',
  '              <text x="19.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 9</text>',
  '              <text x="19.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(D3: Inf. Interno)</text>',
  '              <circle cx="7" cy="66" r="1.5" fill="#DC2626" />',
  '              <circle cx="7" cy="88" r="1.5" fill="#DC2626" />',
  '              <rect x="39" y="58" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />',
  '              <text x="55.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 10</text>',
  '              <text x="55.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(D4: Inf. Externo)</text>',
  '              <text x="37.5" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="700" fill="#0369A1">',
  '                4 FOLHAS A4 FORMAM O LADO DIREITO',
  '              </text>',
  '            </g>',
  '            <g transform="translate(10, 127)">',
  '              <text x="0" y="4.5" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" font-weight="800" fill="#0F172A">COMO MONTAR:</text>',
  '              <text x="0" y="9" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" fill="#334155">1. Plastifique cada uma das 8 folhas em pouches A4 separados (125–175 micras) e corte deixando 3mm de borda selada.</text>',
  '              <text x="0" y="13.2" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" fill="#334155">2. Una o Lado Esquerdo (Folha 3+4 no topo, Folha 5+6 na base) pelas abas de 15mm com fita dupla-face extra-forte ou cola quente.</text>',
  '              <text x="0" y="17.4" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" fill="#334155">3. Una o Lado Direito (Folhas 7, 8, 9, 10). Junte Esquerdo e Direito no centro com a Placa 5C atrás e fure os 4 pontos (⊕) p/ passar o elástico!</text>',
  '            </g>',
  '          </g>',
  '        </svg>',
  '      </article>',
  '    </div>\n'
].join('\n');

// FOLHAS 3 a 6 (LADO ESQUERDO)
function wingPage(folhaNum, totalFolhas, parteId, grupoId, pathD, shines, abas, furos, titulo, subtitulo, orientacao, encaixes, isLast) {
  let res = [
    '    <!-- ==================== FOLHA ' + folhaNum + ': ' + titulo + ' ==================== -->',
    '    <div class="sheet-wrapper' + (isLast ? ' last-visible-sheet' : '') + '">',
    '      <div class="sheet-caption no-print">',
    '        <span>📄 <b>Folha ' + folhaNum + ' de ' + totalFolhas + '</b> — ' + titulo + ' (' + orientacao + ')</span>',
    '      </div>',
    '      <article class="a4-sheet" id="sheet' + folhaNum + '">',
    '        <svg id="svgSheet' + folhaNum + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">',
    wingDefs,
    makeRuler(folhaNum, 'PADRINHOS MÁGICOS — FOLHA ' + folhaNum + '/' + totalFolhas + ' (' + titulo + ')', subtitulo),
    '          <g class="wing-quadrant-group" id="' + grupoId + '">',
    '            <!-- Contorno Principal da Asa -->',
    '            <path d="' + pathD + '" fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />',
    shines,
    abas,
    '            <g class="tech-guide">',
    furos,
    encaixes,
    '              <text x="105" y="155" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">' + titulo + '</text>',
    '              <text x="105" y="161" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">' + orientacao + '</text>',
    '            </g>',
    '          </g>',
    '        </svg>',
    '      </article>',
    '    </div>\n'
  ].join('\n');
  return res;
}

// Folha 3 (E1): Sup. Interno
middle += wingPage(
  3, 10, 'E1', 'wingE1',
  'M 18,170 C 18,100 45,45 100,28 C 140,15 178,22 195,30 L 195,270 L 18,270 Z',
  '            <path d="M 40,120 C 60,65 110,48 160,50" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />\n            <path d="M 35,170 C 65,130 130,120 185,130" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />',
  [
    '            <rect x="180" y="30" width="15" height="240" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="180" y="30" width="15" height="240" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="180" y1="30" x2="180" y2="270" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '            <rect x="18" y="255" width="177" height="15" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="18" y="255" width="177" height="15" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="18" y1="255" x2="195" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />'
  ].join('\n'),
  [
    '              <line x1="18" y1="20" x2="18" y2="280" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />',
    '              <text x="14" y="100" text-anchor="middle" transform="rotate(-90 14 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">EIXO CENTRAL DAS COSTAS</text>',
    '              <circle cx="26" cy="190" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />',
    '              <circle cx="26" cy="240" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />'
  ].join('\n'),
  'ASA ESQUERDA — PARTE 1/4 (E1)',
  'Quadrante Superior Interno (Eixo da Coluna) — Plastifique em A4',
  'Superior Interno (Coluna)',
  [
    '              <text x="187" y="150" text-anchor="middle" transform="rotate(-90 187 150)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 4 (E2)</text>',
    '              <text x="105" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 5 (E3)</text>'
  ].join('\n'),
  false
);

// Folha 4 (E2): Sup. Externo
middle += wingPage(
  4, 10, 'E2', 'wingE2',
  'M 15,30 C 40,36 90,55 135,90 C 185,130 198,185 185,225 C 175,250 150,265 120,270 L 15,270 Z',
  '            <path d="M 40,55 C 85,75 145,115 160,165" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />\n            <path d="M 60,135 C 105,150 155,180 165,215" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />',
  [
    '            <rect x="15" y="255" width="105" height="15" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="15" y="255" width="105" height="15" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="15" y1="255" x2="120" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />'
  ].join('\n'),
  '',
  'ASA ESQUERDA — PARTE 2/4 (E2)',
  'Quadrante Superior Externo (Ponta Grande da Asa)',
  'Superior Externo (Ponta Grande)',
  [
    '              <line x1="15" y1="25" x2="15" y2="275" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="18" y="50" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">← ENCAIXE NA ABA DA FOLHA 3</text>',
    '              <text x="65" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 6 (E4)</text>'
  ].join('\n'),
  false
);

// Folha 5 (E3): Inf. Interno
middle += wingPage(
  5, 10, 'E3', 'wingE3',
  'M 18,25 L 195,25 L 195,140 C 170,200 120,245 70,250 C 38,253 18,225 18,170 Z',
  '            <path d="M 40,70 C 80,120 130,165 170,180" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />',
  [
    '            <rect x="180" y="25" width="15" height="115" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="180" y="25" width="15" height="115" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="180" y1="25" x2="180" y2="140" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />'
  ].join('\n'),
  [
    '              <line x1="18" y1="20" x2="18" y2="260" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />',
    '              <text x="14" y="100" text-anchor="middle" transform="rotate(-90 14 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">EIXO CENTRAL DAS COSTAS</text>',
    '              <circle cx="26" cy="50" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />',
    '              <circle cx="26" cy="100" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />'
  ].join('\n'),
  'ASA ESQUERDA — PARTE 3/4 (E3)',
  'Quadrante Inferior Interno (Base da Coluna)',
  'Inferior Interno (Coluna)',
  [
    '              <line x1="15" y1="25" x2="198" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="100" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">↑ ENCAIXE NA ABA INFERIOR DA FOLHA 3</text>',
    '              <text x="187" y="80" text-anchor="middle" transform="rotate(-90 187 80)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 6 (E4)</text>'
  ].join('\n'),
  false
);

// Folha 6 (E4): Inf. Externo
middle += wingPage(
  6, 10, 'E4', 'wingE4',
  'M 15,25 L 120,25 C 150,30 178,60 175,100 C 170,145 130,195 80,210 C 40,218 15,180 15,140 Z',
  '            <path d="M 40,65 C 90,85 135,115 145,150" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />',
  '',
  '',
  'ASA ESQUERDA — PARTE 4/4 (E4)',
  'Quadrante Inferior Externo (Ponta Pequena da Asa)',
  'Inferior Externo (Ponta Pequena)',
  [
    '              <line x1="15" y1="20" x2="15" y2="145" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="18" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">← ENCAIXE NA ABA DA FOLHA 5</text>',
    '              <line x1="15" y1="25" x2="125" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="65" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">↑ ENCAIXE NA ABA DA FOLHA 4</text>'
  ].join('\n'),
  false
);

// FOLHAS 7 a 10 (LADO DIREITO - ESPELHADO HORIZONTALMENTE)
// Folha 7 (D1): Sup. Interno
middle += wingPage(
  7, 10, 'D1', 'wingD1',
  'M 192,170 C 192,100 165,45 110,28 C 70,15 32,22 15,30 L 15,270 L 192,270 Z',
  '            <path d="M 170,120 C 150,65 100,48 50,50" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />\n            <path d="M 175,170 C 145,130 80,120 25,130" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />',
  [
    '            <rect x="15" y="30" width="15" height="240" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="15" y="30" width="15" height="240" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="30" y1="30" x2="30" y2="270" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '            <rect x="15" y="255" width="177" height="15" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="15" y="255" width="177" height="15" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="15" y1="255" x2="192" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />'
  ].join('\n'),
  [
    '              <line x1="192" y1="20" x2="192" y2="280" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />',
    '              <text x="196" y="100" text-anchor="middle" transform="rotate(90 196 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">EIXO CENTRAL DAS COSTAS</text>',
    '              <circle cx="184" cy="190" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />',
    '              <circle cx="184" cy="240" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />'
  ].join('\n'),
  'ASA DIREITA — PARTE 1/4 (D1)',
  'Quadrante Superior Interno (Eixo da Coluna) — Espelho para Papel Fotográfico',
  'Superior Interno (Espelhado)',
  [
    '              <text x="23" y="150" text-anchor="middle" transform="rotate(-90 23 150)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 8 (D2)</text>',
    '              <text x="105" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 9 (D3)</text>'
  ].join('\n'),
  false
);

// Folha 8 (D2): Sup. Externo
middle += wingPage(
  8, 10, 'D2', 'wingD2',
  'M 195,30 C 170,36 120,55 75,90 C 25,130 12,185 25,225 C 35,250 60,265 90,270 L 195,270 Z',
  '            <path d="M 170,55 C 125,75 65,115 50,165" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />\n            <path d="M 150,135 C 105,150 55,180 45,215" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />',
  [
    '            <rect x="90" y="255" width="105" height="15" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="90" y="255" width="105" height="15" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="90" y1="255" x2="195" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />'
  ].join('\n'),
  '',
  'ASA DIREITA — PARTE 2/4 (D2)',
  'Quadrante Superior Externo (Ponta Grande da Asa)',
  'Superior Externo (Ponta Grande)',
  [
    '              <line x1="195" y1="25" x2="195" y2="275" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="192" y="50" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">ENCAIXE NA ABA DA FOLHA 7 →</text>',
    '              <text x="145" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 10 (D4)</text>'
  ].join('\n'),
  false
);

// Folha 9 (D3): Inf. Interno
middle += wingPage(
  9, 10, 'D3', 'wingD3',
  'M 192,25 L 15,25 L 15,140 C 40,200 90,245 140,250 C 172,253 192,225 192,170 Z',
  '            <path d="M 170,70 C 130,120 80,165 40,180" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />',
  [
    '            <rect x="15" y="25" width="15" height="115" fill="#FFFFFF" fill-opacity="0.5" />',
    '            <rect x="15" y="25" width="15" height="115" fill="url(#glueHatchWing)" opacity="0.45" />',
    '            <line x1="30" y1="25" x2="30" y2="140" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />'
  ].join('\n'),
  [
    '              <line x1="192" y1="20" x2="192" y2="260" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />',
    '              <text x="196" y="100" text-anchor="middle" transform="rotate(90 196 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">EIXO CENTRAL DAS COSTAS</text>',
    '              <circle cx="184" cy="50" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />',
    '              <circle cx="184" cy="100" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />'
  ].join('\n'),
  'ASA DIREITA — PARTE 3/4 (D3)',
  'Quadrante Inferior Interno (Base da Coluna)',
  'Inferior Interno (Espelhado)',
  [
    '              <line x1="12" y1="25" x2="195" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="110" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">↑ ENCAIXE NA ABA INFERIOR DA FOLHA 7</text>',
    '              <text x="23" y="80" text-anchor="middle" transform="rotate(-90 23 80)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">ABA 15mm: COLE SOB A FOLHA 10 (D4)</text>'
  ].join('\n'),
  false
);

// Folha 10 (D4): Inf. Externo
middle += wingPage(
  10, 10, 'D4', 'wingD4',
  'M 195,25 L 90,25 C 60,30 32,60 35,100 C 40,145 80,195 130,210 C 170,218 195,180 195,140 Z',
  '            <path d="M 170,65 C 120,85 75,115 65,150" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />',
  '',
  '',
  'ASA DIREITA — PARTE 4/4 (D4)',
  'Quadrante Inferior Externo (Ponta Pequena da Asa)',
  'Inferior Externo (Ponta Pequena)',
  [
    '              <line x1="195" y1="20" x2="195" y2="145" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="192" y="80" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">ENCAIXE NA ABA DA FOLHA 9 →</text>',
    '              <line x1="85" y1="25" x2="195" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />',
    '              <text x="145" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">↑ ENCAIXE NA ABA DA FOLHA 8</text>'
  ].join('\n'),
  true // isLast
);

// Atualizar JavaScript no afterMain
afterMain = afterMain.replace(
  '#crownGroup text, #starsSection text, #wandHandleStrip text, #fairyWingsGroup text, #acetateSupportSection text, #largeLeftWingGroup text, #largeRightWingGroup text, .accessory-text',
  '#crownGroup text, #starsSection text, #wandHandleStrip text, #acetateSection text, .wing-quadrant-group text, .accessory-text'
);
afterMain = afterMain.replace(
  "'⏳ Gerando PDF A4...'",
  "'⏳ Gerando PDF A4 (10 páginas)...'"
);
afterMain = afterMain.replace(
  "'moldes-padrinhos-magicos-a4.pdf'",
  "'moldes-padrinhos-magicos-a4-gigante.pdf'"
);

const finalHtml = beforeFolha2 + middle + '  </main>' + afterMain;
fs.writeFileSync('c:/Projetos/fantasia/index.html', finalHtml, 'utf8');
console.log('BUILD FINISHED! Total size:', finalHtml.length);


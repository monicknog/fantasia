const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Padrinhos Mágicos — Moldes Vetoriais A4 (Cosmo & Wanda)</title>

  <!-- Bibliotecas externas para exportação em PDF fiel (jsPDF + svg2pdf.js) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <style>
    /* ================= PALETA DE CORES E VARIÁVEIS CSS ================= */
    :root {
      /* Tema Padrão: Coroa Amarela + Asas Azuis (Cosmo & Wanda clássico) */
      --crown-fill: #FFD924;
      --crown-FillGradStop: #F59E0B;
      --crown-stroke: #0F172A;
      --crown-inner-tab: #FEF08A;

      --star-fill: #FFE600;
      --star-FillGradStop: #F59E0B;
      --star-stroke: #0F172A;
      --star-bleed: #FEF08A;

      --wand-strip-fill: #1E293B;
      --wand-strip-accent: #0F172A;
      --wand-strip-text: #F8FAFC;

      --wings-fill: #BAE6FD;
      --wings-FillGradStop: #7DD3FC;
      --wings-inner: #E0F2FE;
      --wings-stroke: #0369A1;

      --acetate-fill: rgba(224, 242, 254, 0.45);
      --acetate-stroke: #0284C7;
    }

    /* Modo Cosmo (Verde Mágico) */
    body[data-theme="cosmo"] {
      --crown-fill: #4ADE80;
      --crown-FillGradStop: #16A34A;
      --crown-stroke: #064E3B;
      --crown-inner-tab: #BBF7D0;

      --star-fill: #86EFAC;
      --star-FillGradStop: #22C55E;
      --star-stroke: #064E3B;
      --star-bleed: #DCFCE7;

      --wings-fill: #BBF7D0;
      --wings-FillGradStop: #4ADE80;
      --wings-inner: #DCFCE7;
      --wings-stroke: #15803D;
    }

    /* Modo Wanda (Rosa Mágico) */
    body[data-theme="wanda"] {
      --crown-fill: #F472B6;
      --crown-FillGradStop: #DB2777;
      --crown-stroke: #831843;
      --crown-inner-tab: #FBCFE8;

      --star-fill: #F9A8D4;
      --star-FillGradStop: #EC4899;
      --star-stroke: #831843;
      --star-bleed: #FDF2F8;

      --wings-fill: #FBCFE8;
      --wings-FillGradStop: #F472B6;
      --wings-inner: #FDF2F8;
      --wings-stroke: #BE185D;
    }

    /* Modo Contorno P&B (Economia máxima de tinta) */
    body[data-theme="bw"] {
      --crown-fill: #FFFFFF;
      --crown-FillGradStop: #FFFFFF;
      --crown-stroke: #000000;
      --crown-inner-tab: #FFFFFF;

      --star-fill: #FFFFFF;
      --star-FillGradStop: #FFFFFF;
      --star-stroke: #000000;
      --star-bleed: transparent;

      --wand-strip-fill: #FFFFFF;
      --wand-strip-accent: #E2E8F0;
      --wand-strip-text: #000000;

      --wings-fill: #FFFFFF;
      --wings-FillGradStop: #FFFFFF;
      --wings-inner: #FFFFFF;
      --wings-stroke: #000000;

      --acetate-fill: transparent;
      --acetate-stroke: #000000;
    }

    /* Ocultar guias de corte/cotas quando o toggle for desmarcado */
    body.hide-guides .tech-guide {
      display: none !important;
    }

    /* Reset global */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #0F172A;
      color: #F8FAFC;
      line-height: 1.4;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* ================= BARRA DE CONTROLES SUPERIOR ================= */
    .ui-header {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #334155;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
      padding: 10px 16px;
    }

    .ui-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .ui-top-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-icon {
      font-size: 26px;
      line-height: 1;
      filter: drop-shadow(0 2px 6px rgba(250, 204, 21, 0.6));
    }

    .brand-text h1 {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.3px;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .brand-text p {
      font-size: 11.5px;
      color: #94A3B8;
    }

    .badge-scale {
      display: inline-block;
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 7px;
      border-radius: 4px;
      background: rgba(14, 165, 233, 0.2);
      color: #38BDF8;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }

    .controls-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .control-item {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #1E293B;
      padding: 5px 10px;
      border-radius: 6px;
      border: 1px solid #334155;
      font-size: 12px;
    }

    .control-item label {
      font-weight: 600;
      color: #CBD5E1;
      cursor: pointer;
    }

    select {
      background: #0F172A;
      color: #F8FAFC;
      border: 1px solid #475569;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      outline: none;
    }

    select:focus {
      border-color: #38BDF8;
    }

    .toggle-label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      user-select: none;
    }

    .toggle-label input[type="checkbox"] {
      accent-color: #0284C7;
      width: 15px;
      height: 15px;
      cursor: pointer;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
      text-decoration: none;
    }

    .btn:active {
      transform: scale(0.97);
    }

    .btn-tips {
      background: #334155;
      color: #F8FAFC;
    }

    .btn-tips:hover {
      background: #475569;
    }

    .btn-print {
      background: linear-gradient(135deg, #0284C7, #0369A1);
      color: #FFFFFF;
      box-shadow: 0 2px 10px rgba(2, 132, 199, 0.4);
    }

    .btn-print:hover {
      background: linear-gradient(135deg, #0369A1, #075985);
    }

    .btn-pdf {
      background: linear-gradient(135deg, #E11D48, #BE123C);
      color: #FFFFFF;
      box-shadow: 0 2px 10px rgba(225, 29, 72, 0.4);
    }

    .btn-pdf:hover {
      background: linear-gradient(135deg, #BE123C, #9F1239);
    }

    /* ================= PAINÉIS RECOLHÍVEIS ================= */
    .drawer-panel {
      display: none;
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px 16px;
      animation: fadeIn 0.2s ease forwards;
    }

    .drawer-panel.open {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Checklist de Materiais */
    .materials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 10px;
      margin-top: 8px;
    }

    .material-card {
      background: #0F172A;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #334155;
      font-size: 11.5px;
    }

    .material-card h3 {
      font-size: 12px;
      color: #38BDF8;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .material-card label {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      cursor: pointer;
      margin-bottom: 5px;
      color: #CBD5E1;
    }

    .material-card input[type="checkbox"] {
      accent-color: #22C55E;
      margin-top: 2px;
    }

    /* Dicas de Montagem */
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 10px;
      margin-top: 6px;
    }

    .tip-box {
      background: #0F172A;
      padding: 8px 10px;
      border-radius: 6px;
      border-left: 3px solid #38BDF8;
      font-size: 11.5px;
      color: #CBD5E1;
    }

    .tip-box strong {
      color: #F8FAFC;
      display: block;
      margin-bottom: 3px;
    }

    /* ================= ÁREA DE VISUALIZAÇÃO DAS FOLHAS A4 ================= */
    .workspace {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 28px;
      padding: 24px 16px 80px;
      min-height: 100vh;
    }

    .sheet-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .sheet-caption {
      font-size: 12px;
      font-weight: 600;
      color: #94A3B8;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Folha A4 em Escala Real na tela (210mm x 297mm) */
    .a4-sheet {
      width: 210mm;
      height: 297mm;
      background: #FFFFFF;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
      border-radius: 2px;
      position: relative;
      overflow: hidden;
      display: block;
    }

    .a4-sheet svg {
      width: 210mm;
      height: 297mm;
      display: block;
    }

    .sheet-wrapper.hidden-sheet {
      display: none !important;
    }

    /* ================= REGRAS RIGOROSAS DE IMPRESSÃO A4 ================= */
    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      html, body {
        width: 210mm !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #FFFFFF !important;
        overflow: visible !important;
      }

      .ui-header,
      .sheet-caption,
      .no-print,
      .sheet-wrapper.hidden-sheet,
      .accessory-text,
      #crownGroup text,
      #starsSection text,
      #wandHandleStrip text,
      #acetateSection text,
      .wing-quadrant-group text {
        display: none !important;
      }

      .workspace {
        margin: 0 !important;
        padding: 0 !important;
        gap: 0 !important;
        display: block !important;
      }

      .sheet-wrapper {
        margin: 0 !important;
        padding: 0 !important;
        display: block !important;
      }

      .a4-sheet {
        width: 210mm !important;
        height: 297mm !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        page-break-after: always;
        break-after: page;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .sheet-wrapper.last-visible-sheet .a4-sheet {
        page-break-after: auto !important;
        break-after: auto !important;
      }
    }
  </style>
</head>
<body data-theme="default">

  <!-- BARRA DE CONTROLES INTERATIVA -->
  <header class="ui-header no-print">
    <div class="ui-container">
      <div class="ui-top-row">
        <div class="brand">
          <div class="brand-icon" aria-hidden="true">👑</div>
          <div class="brand-text">
            <h1>
              Padrinhos Mágicos — Estúdio de Moldes A4
              <span class="badge-scale">1:1 Escala Real (210×297mm)</span>
              <span class="badge-scale" style="background: rgba(34, 197, 94, 0.2); color: #4ADE80; border-color: rgba(34, 197, 94, 0.45);">📏 Proporção p/ 1,60 m</span>
            </h1>
            <p>Coroa do Desenho (85×50mm s/ cilindro) + Varinha (Ø 95mm) + Asas Gigantes (4 Folhas A4 por lado: 80×54cm montada)</p>
          </div>
        </div>

        <div class="controls-group">
          <div class="control-item">
            <label for="themeSelect">Tema:</label>
            <select id="themeSelect" aria-label="Selecionar tema de cores">
              <option value="default">✨ Padrão (Coroa Amarela + Asas Azuis)</option>
              <option value="cosmo">💚 Modo Cosmo (Verde)</option>
              <option value="wanda">💖 Modo Wanda (Rosa)</option>
              <option value="bw">🖨️ Contorno P&amp;B (Economia de Tinta)</option>
            </select>
          </div>

          <div class="control-item">
            <label class="toggle-label" for="toggleGuides">
              <input type="checkbox" id="toggleGuides" checked />
              <span>Guias e cotas (mm)</span>
            </label>
          </div>

          <button type="button" class="btn btn-tips" id="btnToggleMaterials" aria-expanded="false">
            📋 Lista de Materiais
          </button>

          <button type="button" class="btn btn-tips" id="btnToggleTips" aria-expanded="false">
            💡 Dicas de Montagem
          </button>

          <button type="button" class="btn btn-print" id="btnPrint">
            🖨️ Imprimir A4 (100%)
          </button>

          <button type="button" class="btn btn-pdf" id="btnDownloadPdf">
            📥 Baixar PDF A4
          </button>
        </div>
      </div>

      <!-- Checklist de Materiais -->
      <section class="drawer-panel" id="materialsDrawer" aria-label="Lista de materiais">
        <h2 style="font-size: 13px; font-weight: 800; color: #F8FAFC; margin-bottom: 4px;">📋 Lista de Materiais p/ 1 Kit Completo (1,60 m)</h2>
        <div class="materials-grid">
          <div class="material-card">
            <h3>📄 Papéis e Laminação</h3>
            <label><input type="checkbox" /> <b>10 folhas A4 Papel Fotográfico</b> (180g–230g/m²): 1 p/ Coroa/Varinha + 1 p/ Gabarito/Guia + <b>8 p/ Asas Gigantes</b> (4 esq. + 4 dir.)</label>
            <label><input type="checkbox" /> <b>9 a 10 pouches de Plastificação A4</b> (125 a 175 micras) — cada folha passa individualmente na plastificadora comum!</label>
            <label><input type="checkbox" /> <b>1 folha de Acetato Rígido A4</b> (200–300 micras) para a haste da coroa e placa central das asas</label>
          </div>
          <div class="material-card">
            <h3>🪄 Estrutura e Fixação</h3>
            <label><input type="checkbox" /> <b>1 Tiara / Arco de cabelo simples</b> (haste sobe 75 mm p/ flutuar perfeitamente)</label>
            <label><input type="checkbox" /> <b>3 Palitos de churrasco de 28 cm</b> unidos (ou 1 vareta/hashi de Ø 7–8mm) p/ varinha</label>
            <label><input type="checkbox" /> <b>1,20 m de Elástico roliço fino</b> (2 tiras de 55–60 cm para alças de ombro p/ 1,60 m)</label>
            <label><input type="checkbox" /> <b>Fita Dupla-Face Extra-Forte / Cola Quente</b> para unir as sobreposições das asas</label>
          </div>
          <div class="material-card">
            <h3>✂️ Ferramentas</h3>
            <label><input type="checkbox" /> Tesoura afiada e Estilete de precisão</label>
            <label><input type="checkbox" /> Furador de 1 furo comum (para os 4 pontos de elástico)</label>
            <label><input type="checkbox" /> Régua de 30 cm para conferir os exatos 50 mm da calibração</label>
          </div>
        </div>
      </section>

      <!-- Dicas de Montagem -->
      <section class="drawer-panel" id="tipsDrawer" aria-label="Dicas de montagem">
        <h2 style="font-size: 13px; font-weight: 800; color: #F8FAFC; margin-bottom: 4px;">💡 Passo a Passo Resumido</h2>
        <div class="tips-grid">
          <div class="tip-box">
            <strong>👑 1. COROA (85×50mm — SEM CILINDRO!)</strong>
            Recorte a Frente e o Verso da Folha 1. Coloque a ponta de 15 mm da haste de acetato (Folha 2) entre as duas e cole costas com costas (Sanduíche). Fica amarela dos 2 lados e flutua leve na tiara!
          </div>
          <div class="tip-box">
            <strong>🪄 2. VARINHA (Ø 95mm)</strong>
            Enrole as tiras pretas (3A+3B) ao redor dos 3 palitos de churrasco. Coloque 3,5 cm da ponta do palito entre as 2 estrelas e cole Frente + Verso!
          </div>
          <div class="tip-box">
            <strong>🦋 3. ASAS GIGANTES (4 FOLHAS ESQ. + 4 FOLHAS DIR. = 80×54cm)</strong>
            Plastifique cada uma das 8 folhas em A4. Recorte deixando 3 mm de borda transparente. Sobreponha as abas numeradas de 15 mm (E1+E2 no topo, E3+E4 na base, e una centro), cole e fure os 4 pontos (⊕) no centro!
          </div>
          <div class="tip-box">
            <strong>🖨️ 4. IMPRESSÃO LIMPA E FIEL</strong>
            Os textos explicativos sobre as peças somem automaticamente na impressão e no PDF! Na janela de impressão, escolha <b>Escala: 100% (Tamanho Real)</b> e margens zeradas.
          </div>
        </div>
      </section>
    </div>
  </header>

  <!-- ÁREA DE FOLHAS A4 -->
  <main class="workspace">

    <!-- ==================== FOLHA 1: COROA DO DESENHO E VARINHA ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 1 de 10</b> — Coroa do Desenho (85×50mm — Sem cilindro!) + Estrelas da Varinha (Ø 95mm Frente e Verso) + Tiras do Cabo</span>
      </div>

      <article class="a4-sheet" id="sheet1">
        <svg id="svgSheet1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          <defs>
            <linearGradient id="crownGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: var(--crown-fill);" />
              <stop offset="100%" style="stop-color: var(--crown-FillGradStop);" />
            </linearGradient>
            <linearGradient id="starGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: var(--star-fill);" />
              <stop offset="100%" style="stop-color: var(--star-FillGradStop);" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="210" height="297" fill="#FFFFFF" />

          <!-- Margem de segurança A4 (5mm) -->
          <g class="tech-guide">
            <rect x="5" y="5" width="200" height="287" fill="none" stroke="#CBD5E1" stroke-width="0.25" stroke-dasharray="2,2" />
          </g>

          <!-- Cabeçalho e Régua de Calibração 50mm -->
          <g transform="translate(10, 8)">
            <text class="accessory-text" x="0" y="4.5" font-family="Segoe UI, Arial, sans-serif" font-size="3.8" font-weight="800" fill="#0F172A">
              PADRINHOS MÁGICOS — FOLHA 1/10 (COROA DO DESENHO &amp; VARINHA)
            </text>
            <text class="accessory-text" x="0" y="8.5" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" fill="#475569">
              Legenda: [ ─── Linha Contínua = CORTE ]   [ - - - Linha Tracejada = ENCAIXE / GUIA ]
            </text>

            <!-- Régua 50mm -->
            <g transform="translate(135, 0)">
              <rect x="-3" y="-1.5" width="56" height="11.5" rx="1.2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="0.3" />
              <text x="25" y="1.8" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" font-weight="700" fill="#0F172A">
                RÉGUA DE CALIBRAÇÃO: EXATOS 50 mm (5 cm)
              </text>
              <line x1="0" y1="6.5" x2="50" y2="6.5" stroke="#0F172A" stroke-width="0.5" />
              <g stroke="#0F172A" stroke-width="0.3">
                <line x1="0"  y1="3.5" x2="0"  y2="6.5" stroke-width="0.5" />
                <line x1="10" y1="3.5" x2="10" y2="6.5" stroke-width="0.5" />
                <line x1="20" y1="3.5" x2="20" y2="6.5" stroke-width="0.5" />
                <line x1="30" y1="3.5" x2="30" y2="6.5" stroke-width="0.5" />
                <line x1="40" y1="3.5" x2="40" y2="6.5" stroke-width="0.5" />
                <line x1="50" y1="3.5" x2="50" y2="6.5" stroke-width="0.5" />
                <line x1="5"  y1="4.5" x2="5"  y2="6.5" />
                <line x1="15" y1="4.5" x2="15" y2="6.5" />
                <line x1="25" y1="4.5" x2="25" y2="6.5" />
                <line x1="35" y1="4.5" x2="35" y2="6.5" />
                <line x1="45" y1="4.5" x2="45" y2="6.5" />
              </g>
              <text x="0"  y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">0</text>
              <text x="10" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">1</text>
              <text x="20" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">2</text>
              <text x="30" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">3</text>
              <text x="40" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">4</text>
              <text x="50" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="700" fill="#0F172A">5cm</text>
            </g>
          </g>

          <!-- 1. COROA DO DESENHO (85mm × 50mm — FRENTE E VERSO ESPELHADOS) -->
          <g id="crownGroup">
            <g class="tech-guide">
              <text x="105" y="24" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.7" font-weight="800" fill="#0284C7">
                1. COROA DO DESENHO (85 mm × 50 mm) — SEM CILINDRO! FRENTE E VERSO ESPELHADOS
              </text>
            </g>

            <!-- Coroa Frente (X=15..100, Y=28..78) -->
            <g id="crownFront">
              <path
                d="M 35,78 L 15,36 L 39,56 L 57.5,28 L 76,56 L 100,36 L 80,78 Z"
                fill="url(#crownGrad1)" stroke="var(--crown-stroke)" stroke-width="1.3" stroke-linejoin="round" />
              <path d="M 22,43 L 38,56 L 55,33" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.65" />
              <path d="M 72,58 L 93,43" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity="0.55" />

              <g class="tech-guide">
                <rect x="50" y="63" width="15" height="15" fill="none" stroke="#DC2626" stroke-width="0.6" stroke-dasharray="1.8,1.2" />
                <text x="57.5" y="48" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="800" fill="#0F172A">COROA — FRENTE</text>
                <text x="57.5" y="52" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" fill="#334155">85 mm × 50 mm (Desenho)</text>
                <text x="57.5" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" font-weight="700" fill="#DC2626">COLE O ACETATO</text>
              </g>
            </g>

            <!-- Coroa Verso Espelhado (X=110..195, Y=28..78) -->
            <g id="crownBack">
              <path
                d="M 130,78 L 110,36 L 134,56 L 152.5,28 L 171,56 L 195,36 L 175,78 Z"
                fill="url(#crownGrad1)" stroke="var(--crown-stroke)" stroke-width="1.3" stroke-linejoin="round" />
              <path d="M 188,43 L 172,56 L 155,33" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.65" />
              <path d="M 138,58 L 117,43" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity="0.55" />

              <g class="tech-guide">
                <rect x="145" y="63" width="15" height="15" fill="none" stroke="#DC2626" stroke-width="0.6" stroke-dasharray="1.8,1.2" />
                <text x="152.5" y="48" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="800" fill="#0F172A">COROA — VERSO</text>
                <text x="152.5" y="52" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" fill="#334155">Cole de costas p/ a Frente</text>
                <text x="152.5" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" font-weight="700" fill="#DC2626">COLE O ACETATO</text>
              </g>
            </g>

            <g class="tech-guide">
              <text x="105" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" font-weight="800" fill="#15803D">
                ★ MONTAGEM DA COROA: Recorte Frente e Verso. Cole uma de costas para a outra com a haste de acetato no meio!
              </text>
            </g>
          </g>

          <!-- 2. ESTRELAS DA VARINHA (Ø 95mm FRENTE E VERSO) -->
          <g id="starsSection">
            <g class="tech-guide">
              <text x="105" y="99" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.9" font-weight="800" fill="#0F172A">
                2. ESTRELAS DA VARINHA — FRENTE E VERSO ESPELHADOS (Ø 95 mm — SEM DOBRAS!)
              </text>
            </g>

            <!-- Estrela Frente (Centro X=56, Y=154) -->
            <g transform="translate(56, 154)">
              <polygon
                points="0,-47.5 12.64,-17.39 45.18,-14.68 20.45,6.64 27.92,38.43 0,21.5 -27.92,38.43 -20.45,6.64 -45.18,-14.68 -12.64,-17.39"
                fill="url(#starGrad1)" stroke="var(--star-stroke)" stroke-width="1.3" stroke-linejoin="round" />
              <path d="M -2,-38 L 9,-15 L 34,-12" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" />

              <g class="tech-guide">
                <rect x="-3.5" y="-12" width="7" height="33.5" fill="none" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />
                <text x="0" y="-16" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.8" font-weight="800" fill="#0F172A">ESTRELA — FRENTE</text>
                <text x="0" y="7" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" font-weight="800" fill="#DC2626">↑ PONHA O CABO (3,5 cm)</text>
              </g>
            </g>

            <!-- Estrela Verso (Centro X=154, Y=154) -->
            <g transform="translate(154, 154)">
              <polygon
                points="0,-47.5 12.64,-17.39 45.18,-14.68 20.45,6.64 27.92,38.43 0,21.5 -27.92,38.43 -20.45,6.64 -45.18,-14.68 -12.64,-17.39"
                fill="url(#starGrad1)" stroke="var(--star-stroke)" stroke-width="1.3" stroke-linejoin="round" />
              <path d="M 2,-38 L -9,-15 L -34,-12" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" />

              <g class="tech-guide">
                <rect x="-3.5" y="-12" width="7" height="33.5" fill="none" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />
                <text x="0" y="-16" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.8" font-weight="800" fill="#0F172A">ESTRELA — VERSO</text>
                <text x="0" y="7" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" font-weight="800" fill="#DC2626">FECHE O SANDUÍCHE</text>
              </g>
            </g>
          </g>

          <!-- 3. TIRAS DO CABO (180×22mm + 110×22mm) -->
          <g id="wandHandleStrip" transform="translate(15, 215)">
            <g class="tech-guide">
              <text x="90" y="-3.5" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.8" font-weight="800" fill="#0F172A">
                3. TIRAS PARA ENCAPAR O PALITO DA VARINHA (SEM DOBRAS — ENROLAR NOS PALITOS)
              </text>
            </g>

            <rect x="0" y="0" width="180" height="20" fill="var(--wand-strip-fill)" stroke="#0F172A" stroke-width="0.9" />
            <g class="tech-guide">
              <text x="90" y="11" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="700" fill="var(--wand-strip-text)">
                3A. TIRA PRINCIPAL (180 × 20 mm) — ENROLE DANDO VOLTAS NO PALITO
              </text>
            </g>

            <g transform="translate(0, 24)">
              <rect x="0" y="0" width="110" height="20" fill="var(--wand-strip-fill)" stroke="#0F172A" stroke-width="0.9" />
              <g class="tech-guide">
                <text x="55" y="11" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="700" fill="var(--wand-strip-text)">
                  3B. EXTENSOR P/ 1,60m (110 × 20 mm) — ENROLE NA CONTINUAÇÃO
                </text>
              </g>
            </g>
          </g>

          <!-- Rodapé informativo -->
          <g class="tech-guide accessory-text" transform="translate(10, 274)">
            <rect x="0" y="0" width="190" height="16" rx="2" fill="#F8FAFC" stroke="#0284C7" stroke-width="0.35" />
            <text x="4" y="5" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" font-weight="800" fill="#0F172A">RESUMO FOLHA 1:</text>
            <text x="4" y="9.5" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#334155">• COROA (85×50mm): Recorte Frente e Verso. Cole uma de costas p/ a outra com a haste de acetato no meio!</text>
            <text x="4" y="13.8" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#334155">• VARINHA: Enrole as tiras pretas nos palitos. Cole as 2 estrelas com a ponta do cabo no meio!</text>
          </g>
        </svg>
      </article>
    </div>

    <!-- ==================== FOLHA 2: GABARITOS DE ACETATO E MAPA DE MONTAGEM ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 2 de 10</b> — Gabaritos em Acetato (Haste 5A + Abraçadeira 5B + Placa das Asas 5C) + Mapa de Montagem da Asa Gigante 8 Folhas</span>
      </div>

      <article class="a4-sheet" id="sheet2">
        <svg id="svgSheet2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          <rect x="0" y="0" width="210" height="297" fill="#FFFFFF" />

          <g class="tech-guide">
            <rect x="5" y="5" width="200" height="287" fill="none" stroke="#CBD5E1" stroke-width="0.25" stroke-dasharray="2,2" />
          </g>

          <g transform="translate(10, 8)">
            <text class="accessory-text" x="0" y="4.5" font-family="Segoe UI, Arial, sans-serif" font-size="3.8" font-weight="800" fill="#0F172A">
              PADRINHOS MÁGICOS — FOLHA 2/10 (GABARITO DE ACETATO &amp; MAPA DAS ASAS)
            </text>
            <text class="accessory-text" x="0" y="8.5" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" fill="#475569">
              Gabaritos para recortar na folha de acetato transparente + Guia de montagem da Asa Gigante (8 Folhas A4)
            </text>
          </g>

          <!-- GABARITO DE ACETATO -->
          <g id="acetateSection" transform="translate(0, 22)">
            <text x="105" y="4" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="3.2" font-weight="800" fill="#0F172A">
              MOLDES EM ACETATO TRANSPARENTE (COLOCAR A FOLHA DE ACETATO POR CIMA E CORTAR)
            </text>

            <!-- 5A. Haste da Coroa (160 x 15mm) -->
            <g transform="translate(25, 10)">
              <rect x="0" y="0" width="160" height="15" fill="var(--acetate-fill)" stroke="var(--acetate-stroke)" stroke-width="0.85" />
              <line x1="12" y1="0" x2="12" y2="15" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />
              <line x1="25" y1="0" x2="25" y2="15" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />
              <line x1="60" y1="0" x2="60" y2="15" stroke="#15803D" stroke-width="0.6" stroke-dasharray="2,1.5" />
              <line x1="145" y1="0" x2="145" y2="15" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />

              <text x="82" y="6.8" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0369A1">
                5A. HASTE DE ACETATO (160 × 15 mm) — RECORTE 2× E COLE DUPLA P/ 1,60 m
              </text>
              <text x="82" y="11" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.9" fill="#334155">
                Dobra verde em 60mm deixa 7,5 cm flutuando livre na cabeça! Topo (15mm) cola na coroa.
              </text>
            </g>

            <!-- 5B. Abraçadeira na Tiara (100 x 35mm) -->
            <g transform="translate(25, 30)">
              <path
                d="M 35,0 L 65,0 L 65,10 L 100,10 L 100,25 L 65,25 L 65,35 L 35,35 L 35,25 L 0,25 L 0,10 L 35,10 Z"
                fill="var(--acetate-fill)" stroke="var(--acetate-stroke)" stroke-width="0.85" />
              <rect x="42.25" y="12" width="15.5" height="2.2" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.5" />
              <rect x="42.25" y="20.8" width="15.5" height="2.2" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.5" />
              <text x="50" y="18.3" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" font-weight="800" fill="#0F172A">
                5B. ABRAÇADEIRA TIARA (100 × 35 mm) — PASSE A HASTE NAS FENDAS
              </text>
            </g>

            <!-- 5C. Placa Central de Sustentação das Asas Gigantes (170 x 45mm) com 4 furos -->
            <g transform="translate(25, 70)">
              <rect x="0" y="0" width="160" height="32" rx="3" fill="var(--acetate-fill)" stroke="var(--acetate-stroke)" stroke-width="0.85" />
              <circle cx="20" cy="10" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />
              <circle cx="20" cy="22" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />
              <circle cx="140" cy="10" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />
              <circle cx="140" cy="22" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.6" />
              <line x1="80" y1="0" x2="80" y2="32" stroke="#DC2626" stroke-width="0.5" stroke-dasharray="2,1.5" />

              <text x="80" y="12" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0369A1">
                5C. PLACA CENTRAL DE SUSTENTAÇÃO DAS ASAS GIGANTES EM ACETATO (160 × 32 mm)
              </text>
              <text x="80" y="17.5" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" fill="#334155">
                Cole esta placa atrás da união das asas nas costas: ela mantém as asas abertas sem dobrar!
              </text>
              <text x="80" y="23" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.95" font-weight="700" fill="#DC2626">
                Fure os 4 pontos (⊕) coincidindo com os furos das asas para passar as alças de elástico
              </text>
            </g>
          </g>

          <!-- MAPA VISUAL COMPLETO: COMO MONTAR A ASA GIGANTE DE 8 FOLHAS A4 (4 ESQ + 4 DIR) -->
          <g class="tech-guide" transform="translate(10, 134)">
            <rect x="0" y="0" width="190" height="152" rx="3" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="0.4" />
            <text x="95" y="8" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="3.2" font-weight="800" fill="#0F172A">
              MAPA DE MONTAGEM: ASA GIGANTE COSPLAY (4 FOLHAS ESQUERDA + 4 FOLHAS DIREITA = 80 × 54 cm)
            </text>

            <!-- Diagrama da grade 2x2 Esquerda + 2x2 Direita -->
            <!-- Lado Esquerdo (Folhas 3, 4, 5, 6) -->
            <g transform="translate(15, 14)">
              <rect x="0" y="0" width="75" height="110" fill="#E0F2FE" stroke="#0284C7" stroke-width="0.8" rx="2" />
              <text x="37.5" y="7" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="800" fill="#0369A1">
                ASA ESQUERDA COMPLETA (40 × 54 cm)
              </text>

              <!-- Grade 2x2 -->
              <!-- Folha 4 (E2) Sup Externo -->
              <rect x="3" y="12" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />
              <text x="19.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 4</text>
              <text x="19.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(E2: Sup. Externo)</text>

              <!-- Folha 3 (E1) Sup Interno (Centro) -->
              <rect x="39" y="12" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />
              <text x="55.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 3</text>
              <text x="55.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(E1: Sup. Interno)</text>
              <circle cx="68" cy="24" r="1.5" fill="#DC2626" />
              <circle cx="68" cy="42" r="1.5" fill="#DC2626" />

              <!-- Folha 6 (E4) Inf Externo -->
              <rect x="3" y="58" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />
              <text x="19.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 6</text>
              <text x="19.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(E4: Inf. Externo)</text>

              <!-- Folha 5 (E3) Inf Interno (Centro) -->
              <rect x="39" y="58" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />
              <text x="55.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 5</text>
              <text x="55.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(E3: Inf. Interno)</text>
              <circle cx="68" cy="66" r="1.5" fill="#DC2626" />
              <circle cx="68" cy="88" r="1.5" fill="#DC2626" />

              <text x="37.5" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="700" fill="#0369A1">
                4 FOLHAS A4 FORMAM O LADO ESQUERDO
              </text>
            </g>

            <!-- Coluna Central de União das Costas (Placa 5C) -->
            <g transform="translate(91, 24)">
              <line x1="4" y1="0" x2="4" y2="100" stroke="#DC2626" stroke-width="1.2" stroke-dasharray="3,2" />
              <text x="4" y="50" text-anchor="middle" transform="rotate(-90 4 50)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#DC2626">
                EIXO CENTRAL DAS COSTAS (COLAR E3 SOBRE D3)
              </text>
            </g>

            <!-- Lado Direito (Folhas 7, 8, 9, 10) -->
            <g transform="translate(100, 14)">
              <rect x="0" y="0" width="75" height="110" fill="#E0F2FE" stroke="#0284C7" stroke-width="0.8" rx="2" />
              <text x="37.5" y="7" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="800" fill="#0369A1">
                ASA DIREITA COMPLETA (40 × 54 cm)
              </text>

              <!-- Grade 2x2 Espelhada -->
              <!-- Folha 7 (D1) Sup Interno (Centro) -->
              <rect x="3" y="12" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />
              <text x="19.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 7</text>
              <text x="19.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(D1: Sup. Interno)</text>
              <circle cx="7" cy="24" r="1.5" fill="#DC2626" />
              <circle cx="7" cy="42" r="1.5" fill="#DC2626" />

              <!-- Folha 8 (D2) Sup Externo -->
              <rect x="39" y="12" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />
              <text x="55.5" y="28" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 8</text>
              <text x="55.5" y="32" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(D2: Sup. Externo)</text>

              <!-- Folha 9 (D3) Inf Interno (Centro) -->
              <rect x="3" y="58" width="33" height="42" fill="#BAE6FD" stroke="#0284C7" stroke-width="0.6" />
              <text x="19.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 9</text>
              <text x="19.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#0369A1">(D3: Inf. Interno)</text>
              <circle cx="7" cy="66" r="1.5" fill="#DC2626" />
              <circle cx="7" cy="88" r="1.5" fill="#DC2626" />

              <!-- Folha 10 (D4) Inf Externo -->
              <rect x="39" y="58" width="33" height="42" fill="#FFFFFF" stroke="#0284C7" stroke-width="0.5" />
              <text x="55.5" y="75" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#0F172A">FOLHA 10</text>
              <text x="55.5" y="79" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="1.8" fill="#334155">(D4: Inf. Externo)</text>

              <text x="37.5" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="700" fill="#0369A1">
                4 FOLHAS A4 FORMAM O LADO DIREITO
              </text>
            </g>

            <!-- Passo a passo texto inferior -->
            <g transform="translate(10, 127)">
              <text x="0" y="4.5" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" font-weight="800" fill="#0F172A">
                COMO MONTAR EM CASA:
              </text>
              <text x="0" y="9" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" fill="#334155">
                1. Plastifique cada uma das 8 folhas em pouches A4 separados (125 a 175 micras) e corte deixando 3mm de margem transparente selada.
              </text>
              <text x="0" y="13.2" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" fill="#334155">
                2. Monte o Lado Esquerdo: sobreponha as abas numeradas de 15mm guiando-se pelas marcas (Folha 3+4 e Folha 5+6) e cole com dupla-face.
              </text>
              <text x="0" y="17.4" font-family="Segoe UI, Arial, sans-serif" font-size="2.0" fill="#334155">
                3. Monte o Lado Direito (Folhas 7, 8, 9, 10). Una o Lado Esquerdo ao Direito no centro, cole a Placa de Acetato 5C atrás e fure os 4 pontos (⊕)!
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>
`;

console.log('Writing base HTML part...');
fs.writeFileSync('c:/Projetos/fantasia/index.html', htmlContent, 'utf8');
console.log('Base written!');

function generateWingSheets() {
  let s = '';

  // Definições de gradientes e padrões para as asas
  const wingDefs = \`
          <defs>
            <linearGradient id="wingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: var(--wings-inner);" />
              <stop offset="55%" style="stop-color: var(--wings-fill);" />
              <stop offset="100%" style="stop-color: var(--wings-FillGradStop);" />
            </linearGradient>
            <pattern id="glueHatchWing" width="3.5" height="3.5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="3.5" stroke="#0284C7" stroke-width="0.45" />
            </pattern>
          </defs>\`;

  const headerRuler = (folhaNum, titulo, subtitulo) => \`
          <rect x="0" y="0" width="210" height="297" fill="#FFFFFF" />
          <g class="tech-guide">
            <rect x="5" y="5" width="200" height="287" fill="none" stroke="#CBD5E1" stroke-width="0.25" stroke-dasharray="2,2" />
          </g>
          <g transform="translate(10, 8)">
            <text class="accessory-text" x="0" y="4.5" font-family="Segoe UI, Arial, sans-serif" font-size="3.6" font-weight="800" fill="#0F172A">
              \${titulo}
            </text>
            <text class="accessory-text" x="0" y="8.5" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" fill="#475569">
              \${subtitulo}
            </text>
            <g transform="translate(135, 0)">
              <rect x="-3" y="-1.5" width="56" height="11.5" rx="1.2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="0.3" />
              <text x="25" y="1.8" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.3" font-weight="700" fill="#0F172A">RÉGUA: EXATOS 50 mm (5 cm)</text>
              <line x1="0" y1="6.5" x2="50" y2="6.5" stroke="#0F172A" stroke-width="0.5" />
              <g stroke="#0F172A" stroke-width="0.3">
                <line x1="0"  y1="3.5" x2="0"  y2="6.5" stroke-width="0.5" />
                <line x1="10" y1="3.5" x2="10" y2="6.5" stroke-width="0.5" />
                <line x1="20" y1="3.5" x2="20" y2="6.5" stroke-width="0.5" />
                <line x1="30" y1="3.5" x2="30" y2="6.5" stroke-width="0.5" />
                <line x1="40" y1="3.5" x2="40" y2="6.5" stroke-width="0.5" />
                <line x1="50" y1="3.5" x2="50" y2="6.5" stroke-width="0.5" />
              </g>
              <text x="0" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">0</text>
              <text x="25" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" fill="#0F172A">2.5</text>
              <text x="50" y="9.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="700" fill="#0F172A">5cm</text>
            </g>
          </g>\`;

  // ==================== FOLHA 3 (E1): ASA ESQUERDA - SUPERIOR INTERNO ====================
  s += \`
    <!-- ==================== FOLHA 3: ASA ESQUERDA — QUADRANTE 1/4 (SUPERIOR INTERNO) ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 3 de 10 (Asa Esquerda 1/4)</b> — Superior Interno / Eixo Central (Una com Folhas 4, 5 e 6)</span>
      </div>
      <article class="a4-sheet" id="sheet3">
        <svg id="svgSheet3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(3, "PADRINHOS MÁGICOS — FOLHA 3/10 (ASA ESQUERDA: PARTE 1/4)", "Quadrante Superior Interno (Eixo da Coluna) — Plastifique individualmente em A4")}

          <g class="wing-quadrant-group" id="wingE1">
            <!-- Contorno do quadrante E1 -->
            <path
              d="M 18,170
                 C 18,100 45,45 100,28
                 C 140,15 178,22 195,30
                 L 195,270
                 L 18,270
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <!-- Brilhos cartoon internos -->
            <path d="M 40,120 C 60,65 110,48 160,50" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />
            <path d="M 35,170 C 65,130 130,120 185,130" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />

            <!-- Aba de sobreposição para Folha 4 (E2) na direita (X=180..195, largura 15mm) -->
            <rect x="180" y="30" width="15" height="240" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="180" y="30" width="15" height="240" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="180" y1="30" x2="180" y2="270" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <!-- Aba de sobreposição para Folha 5 (E3) na base (Y=255..270, altura 15mm) -->
            <rect x="18" y="255" width="177" height="15" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="18" y="255" width="177" height="15" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="18" y1="255" x2="195" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <!-- Eixo central e 2 furos superiores de elástico (X=26, Y=190 e Y=240) -->
            <g class="tech-guide">
              <line x1="18" y1="20" x2="18" y2="280" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />
              <text x="14" y="100" text-anchor="middle" transform="rotate(-90 14 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">
                EIXO CENTRAL DAS COSTAS
              </text>

              <circle cx="26" cy="190" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />
              <circle cx="26" cy="240" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />

              <text x="187" y="150" text-anchor="middle" transform="rotate(-90 187 150)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 4 (E2)
              </text>
              <text x="105" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 5 (E3)
              </text>

              <text x="100" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA ESQUERDA — PARTE 1/4 (E1)
              </text>
              <text x="100" y="166" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Superior Interno (Junto à Coluna)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  // ==================== FOLHA 4 (E2): ASA ESQUERDA - SUPERIOR EXTERNO ====================
  s += \`
    <!-- ==================== FOLHA 4: ASA ESQUERDA — QUADRANTE 2/4 (SUPERIOR EXTERNO) ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 4 de 10 (Asa Esquerda 2/4)</b> — Superior Externo / Ponta Grande da Asa (Una com Folha 3)</span>
      </div>
      <article class="a4-sheet" id="sheet4">
        <svg id="svgSheet4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(4, "PADRINHOS MÁGICOS — FOLHA 4/10 (ASA ESQUERDA: PARTE 2/4)", "Quadrante Superior Externo (Ponta Grande da Asa)")}

          <g class="wing-quadrant-group" id="wingE2">
            <!-- Contorno do quadrante E2 -->
            <path
              d="M 15,30
                 C 40,36 90,55 135,90
                 C 185,130 198,185 185,225
                 C 175,250 150,265 120,270
                 L 15,270
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <!-- Brilhos cartoon internos -->
            <path d="M 40,55 C 85,75 145,115 160,165" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />
            <path d="M 60,135 C 105,150 155,180 165,215" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />

            <!-- Aba de sobreposição para Folha 6 (E4) na base (Y=255..270) -->
            <rect x="15" y="255" width="105" height="15" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="15" y="255" width="105" height="15" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="15" y1="255" x2="120" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <g class="tech-guide">
              <text x="65" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 6 (E4)
              </text>
              <line x1="15" y1="25" x2="15" y2="275" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="18" y="50" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ← ENCAIXE AQUI NA ABA DA FOLHA 3
              </text>

              <text x="100" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA ESQUERDA — PARTE 2/4 (E2)
              </text>
              <text x="100" y="166" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Superior Externo (Ponta Grande)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  // ==================== FOLHA 5 (E3): ASA ESQUERDA - INFERIOR INTERNO ====================
  s += \`
    <!-- ==================== FOLHA 5: ASA ESQUERDA — QUADRANTE 3/4 (INFERIOR INTERNO) ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 5 de 10 (Asa Esquerda 3/4)</b> — Inferior Interno / Base da Coluna (Una com Folhas 3, 4 e 6)</span>
      </div>
      <article class="a4-sheet" id="sheet5">
        <svg id="svgSheet5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(5, "PADRINHOS MÁGICOS — FOLHA 5/10 (ASA ESQUERDA: PARTE 3/4)", "Quadrante Inferior Interno (Base da Coluna)")}

          <g class="wing-quadrant-group" id="wingE3">
            <!-- Contorno do quadrante E3 -->
            <path
              d="M 18,25
                 L 195,25
                 L 195,140
                 C 170,200 120,245 70,250
                 C 38,253 18,225 18,170
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <!-- Brilhos cartoon internos -->
            <path d="M 40,70 C 80,120 130,165 170,180" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />

            <!-- Aba de sobreposição para Folha 6 (E4) na direita (X=180..195) -->
            <rect x="180" y="25" width="15" height="115" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="180" y="25" width="15" height="115" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="180" y1="25" x2="180" y2="140" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <g class="tech-guide">
              <line x1="18" y1="20" x2="18" y2="260" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />
              <text x="14" y="100" text-anchor="middle" transform="rotate(-90 14 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">
                EIXO CENTRAL DAS COSTAS
              </text>

              <!-- 2 furos inferiores de elástico (X=26, Y=50 e Y=100) -->
              <circle cx="26" cy="50" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />
              <circle cx="26" cy="100" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />

              <text x="187" y="80" text-anchor="middle" transform="rotate(-90 187 80)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 6 (E4)
              </text>

              <line x1="15" y1="25" x2="198" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="100" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ↑ ENCAIXE AQUI NA ABA INFERIOR DA FOLHA 3
              </text>

              <text x="100" y="100" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA ESQUERDA — PARTE 3/4 (E3)
              </text>
              <text x="100" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Inferior Interno (Base da Coluna)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  // ==================== FOLHA 6 (E4): ASA ESQUERDA - INFERIOR EXTERNO ====================
  s += \`
    <!-- ==================== FOLHA 6: ASA ESQUERDA — QUADRANTE 4/4 (INFERIOR EXTERNO) ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 6 de 10 (Asa Esquerda 4/4)</b> — Inferior Externo / Ponta Pequena da Asa (Finaliza Lado Esquerdo)</span>
      </div>
      <article class="a4-sheet" id="sheet6">
        <svg id="svgSheet6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(6, "PADRINHOS MÁGICOS — FOLHA 6/10 (ASA ESQUERDA: PARTE 4/4)", "Quadrante Inferior Externo (Ponta Pequena Arredondada)")}

          <g class="wing-quadrant-group" id="wingE4">
            <!-- Contorno do quadrante E4 -->
            <path
              d="M 15,25
                 L 120,25
                 C 150,30 178,60 175,100
                 C 170,145 130,195 80,210
                 C 40,218 15,180 15,140
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <!-- Brilhos cartoon internos -->
            <path d="M 40,65 C 90,85 135,115 145,150" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />

            <g class="tech-guide">
              <line x1="15" y1="20" x2="15" y2="145" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="18" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ← ENCAIXE NA ABA DA FOLHA 5
              </text>

              <line x1="15" y1="25" x2="125" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="65" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ↑ ENCAIXE NA ABA DA FOLHA 4
              </text>

              <text x="95" y="100" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA ESQUERDA — PARTE 4/4 (E4)
              </text>
              <text x="95" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Inferior Externo (Ponta Pequena)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  // ==================== LADO DIREITO (FOLHAS 7, 8, 9, 10 - ESPELHADO HORIZONTALMENTE) ====================
  // Helper para espelhar coordenadas em X (X_novo = 210 - X_original)
  // Folha 7 (D1): Espelho da Folha 3 (E1)
  s += \`
    <!-- ==================== FOLHA 7: ASA DIREITA — QUADRANTE 1/4 (SUPERIOR INTERNO) ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 7 de 10 (Asa Direita 1/4)</b> — Superior Interno / Eixo Central Espelhado (Una com Folhas 8, 9 e 10)</span>
      </div>
      <article class="a4-sheet" id="sheet7">
        <svg id="svgSheet7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(7, "PADRINHOS MÁGICOS — FOLHA 7/10 (ASA DIREITA: PARTE 1/4)", "Quadrante Superior Interno (Eixo da Coluna) — Espelho para Papel Fotográfico")}

          <g class="wing-quadrant-group" id="wingD1">
            <path
              d="M 192,170
                 C 192,100 165,45 110,28
                 C 70,15 32,22 15,30
                 L 15,270
                 L 192,270
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <path d="M 170,120 C 150,65 100,48 50,50" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />
            <path d="M 175,170 C 145,130 80,120 25,130" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />

            <!-- Aba para Folha 8 (D2) na esquerda (X=15..30) -->
            <rect x="15" y="30" width="15" height="240" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="15" y="30" width="15" height="240" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="30" y1="30" x2="30" y2="270" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <!-- Aba para Folha 9 (D3) na base (Y=255..270) -->
            <rect x="15" y="255" width="177" height="15" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="15" y="255" width="177" height="15" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="15" y1="255" x2="192" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <g class="tech-guide">
              <line x1="192" y1="20" x2="192" y2="280" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />
              <text x="196" y="100" text-anchor="middle" transform="rotate(90 196 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">
                EIXO CENTRAL DAS COSTAS
              </text>

              <circle cx="184" cy="190" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />
              <circle cx="184" cy="240" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />

              <text x="23" y="150" text-anchor="middle" transform="rotate(-90 23 150)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 8 (D2)
              </text>
              <text x="105" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 9 (D3)
              </text>

              <text x="110" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA DIREITA — PARTE 1/4 (D1)
              </text>
              <text x="110" y="166" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Superior Interno (Espelhado)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  // Folha 8 (D2): Espelho da Folha 4 (E2)
  s += \`
    <!-- ==================== FOLHA 8: ASA DIREITA — QUADRANTE 2/4 (SUPERIOR EXTERNO) ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 8 de 10 (Asa Direita 2/4)</b> — Superior Externo / Ponta Grande da Asa Direita</span>
      </div>
      <article class="a4-sheet" id="sheet8">
        <svg id="svgSheet8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(8, "PADRINHOS MÁGICOS — FOLHA 8/10 (ASA DIREITA: PARTE 2/4)", "Quadrante Superior Externo (Ponta Grande)")}

          <g class="wing-quadrant-group" id="wingD2">
            <path
              d="M 195,30
                 C 170,36 120,55 75,90
                 C 25,130 12,185 25,225
                 C 35,250 60,265 90,270
                 L 195,270
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <path d="M 170,55 C 125,75 65,115 50,165" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75" />
            <path d="M 150,135 C 105,150 55,180 45,215" fill="none" stroke="var(--wings-stroke)" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />

            <!-- Aba inferior (Y=255..270) -->
            <rect x="90" y="255" width="105" height="15" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="90" y="255" width="105" height="15" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="90" y1="255" x2="195" y2="255" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <g class="tech-guide">
              <text x="145" y="264" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 10 (D4)
              </text>
              <line x1="195" y1="25" x2="195" y2="275" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="192" y="50" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ENCAIXE NA ABA DA FOLHA 7 →
              </text>

              <text x="110" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA DIREITA — PARTE 2/4 (D2)
              </text>
              <text x="110" y="166" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Superior Externo (Ponta Grande)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  // Folha 9 (D3): Espelho da Folha 5 (E3)
  s += \`
    <!-- ==================== FOLHA 9: ASA DIREITA — QUADRANTE 3/4 (INFERIOR INTERNO) ==================== -->
    <div class="sheet-wrapper">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 9 de 10 (Asa Direita 3/4)</b> — Inferior Interno / Base da Coluna Direita</span>
      </div>
      <article class="a4-sheet" id="sheet9">
        <svg id="svgSheet9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(9, "PADRINHOS MÁGICOS — FOLHA 9/10 (ASA DIREITA: PARTE 3/4)", "Quadrante Inferior Interno (Base da Coluna)")}

          <g class="wing-quadrant-group" id="wingD3">
            <path
              d="M 192,25
                 L 15,25
                 L 15,140
                 C 40,200 90,245 140,250
                 C 172,253 192,225 192,170
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <path d="M 170,70 C 130,120 80,165 40,180" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />

            <!-- Aba esquerda (X=15..30) -->
            <rect x="15" y="25" width="15" height="115" fill="#FFFFFF" fill-opacity="0.5" />
            <rect x="15" y="25" width="15" height="115" fill="url(#glueHatchWing)" opacity="0.45" />
            <line x1="30" y1="25" x2="30" y2="140" stroke="#0284C7" stroke-width="0.7" stroke-dasharray="2,1.5" />

            <g class="tech-guide">
              <line x1="192" y1="20" x2="192" y2="260" stroke="#DC2626" stroke-width="0.9" stroke-dasharray="3,2" />
              <text x="196" y="100" text-anchor="middle" transform="rotate(90 196 100)" font-family="Segoe UI, Arial, sans-serif" font-size="2.4" font-weight="800" fill="#DC2626">
                EIXO CENTRAL DAS COSTAS
              </text>

              <circle cx="184" cy="50" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />
              <circle cx="184" cy="100" r="2.3" fill="#FFFFFF" stroke="#DC2626" stroke-width="0.65" />

              <text x="23" y="80" text-anchor="middle" transform="rotate(-90 23 80)" font-family="Segoe UI, Arial, sans-serif" font-size="2.2" font-weight="800" fill="#0284C7">
                ABA 15mm: COLE SOB A FOLHA 10 (D4)
              </text>

              <line x1="12" y1="25" x2="195" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="110" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ↑ ENCAIXE AQUI NA ABA INFERIOR DA FOLHA 7
              </text>

              <text x="110" y="100" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA DIREITA — PARTE 3/4 (D3)
              </text>
              <text x="110" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Inferior Interno (Espelhado)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  // Folha 10 (D4): Espelho da Folha 6 (E4)
  s += \`
    <!-- ==================== FOLHA 10: ASA DIREITA — QUADRANTE 4/4 (INFERIOR EXTERNO) ==================== -->
    <div class="sheet-wrapper last-visible-sheet">
      <div class="sheet-caption no-print">
        <span>📄 <b>Folha 10 de 10 (Asa Direita 4/4)</b> — Inferior Externo / Ponta Pequena da Asa Direita (Finaliza Kit Completo)</span>
      </div>
      <article class="a4-sheet" id="sheet10">
        <svg id="svgSheet10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
          \${wingDefs}
          \${headerRuler(10, "PADRINHOS MÁGICOS — FOLHA 10/10 (ASA DIREITA: PARTE 4/4)", "Quadrante Inferior Externo (Ponta Pequena)")}

          <g class="wing-quadrant-group" id="wingD4">
            <path
              d="M 195,25
                 L 90,25
                 C 60,30 32,60 35,100
                 C 40,145 80,195 130,210
                 C 170,218 195,180 195,140
                 Z"
              fill="url(#wingsGrad)" stroke="var(--wings-stroke)" stroke-width="1.4" stroke-linejoin="round" />

            <path d="M 170,65 C 120,85 75,115 65,150" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />

            <g class="tech-guide">
              <line x1="195" y1="20" x2="195" y2="145" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="192" y="80" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ENCAIXE NA ABA DA FOLHA 9 →
              </text>

              <line x1="85" y1="25" x2="195" y2="25" stroke="#DC2626" stroke-width="0.7" stroke-dasharray="2,1.5" />
              <text x="145" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.1" font-weight="800" fill="#DC2626">
                ↑ ENCAIXE NA ABA DA FOLHA 8
              </text>

              <text x="115" y="100" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="4.2" font-weight="800" fill="#0F172A">
                ASA DIREITA — PARTE 4/4 (D4)
              </text>
              <text x="115" y="106" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="2.6" font-weight="700" fill="#0369A1">
                Inferior Externo (Ponta Pequena)
              </text>
            </g>
          </g>
        </svg>
      </article>
    </div>\`;

  return s;
}

const scripts = \`
  </main>

  <script>
    (function () {
      const themeSelect = document.getElementById('themeSelect');
      const toggleGuides = document.getElementById('toggleGuides');
      const btnToggleMaterials = document.getElementById('btnToggleMaterials');
      const materialsDrawer = document.getElementById('materialsDrawer');
      const btnToggleTips = document.getElementById('btnToggleTips');
      const tipsDrawer = document.getElementById('tipsDrawer');
      const btnPrint = document.getElementById('btnPrint');
      const btnDownloadPdf = document.getElementById('btnDownloadPdf');

      // 1. Troca de Tema em Tempo Real
      themeSelect.addEventListener('change', function (e) {
        document.body.setAttribute('data-theme', e.target.value);
      });

      // 2. Exibir / Ocultar Linhas Guia e Cotas
      toggleGuides.addEventListener('change', function (e) {
        if (e.target.checked) {
          document.body.classList.remove('hide-guides');
        } else {
          document.body.classList.add('hide-guides');
        }
      });

      // 3A. Painel Checklist de Materiais
      btnToggleMaterials.addEventListener('click', function () {
        const isOpen = materialsDrawer.classList.toggle('open');
        btnToggleMaterials.setAttribute('aria-expanded', String(isOpen));
      });

      // 3B. Painel Dicas
      btnToggleTips.addEventListener('click', function () {
        const isOpen = tipsDrawer.classList.toggle('open');
        btnToggleTips.setAttribute('aria-expanded', String(isOpen));
      });

      // 4. Imprimir A4
      btnPrint.addEventListener('click', function () {
        window.print();
      });

      // 5. Geração de PDF A4 em 300 DPI reais
      function resolveSvgWithInlineVariables(svgElement) {
        const computedBody = getComputedStyle(document.body);
        const cssVars = [
          '--crown-fill', '--crown-FillGradStop', '--crown-stroke', '--crown-inner-tab',
          '--star-fill', '--star-FillGradStop', '--star-stroke', '--star-bleed',
          '--wand-strip-fill', '--wand-strip-accent', '--wand-strip-text',
          '--wings-fill', '--wings-FillGradStop', '--wings-inner', '--wings-stroke',
          '--acetate-fill', '--acetate-stroke'
        ];

        const clone = svgElement.cloneNode(true);
        const hideGuides = document.body.classList.contains('hide-guides');

        // Remove os textos descritivos sobre as peças no modo impressão/PDF
        clone.querySelectorAll(
          '.accessory-text, #crownGroup text, #starsSection text, #wandHandleStrip text, #acetateSection text, .wing-quadrant-group text'
        ).forEach(function (el) {
          el.remove();
        });

        if (hideGuides) {
          clone.querySelectorAll('.tech-guide').forEach(function (el) {
            el.remove();
          });
        }

        let serialized = new XMLSerializer().serializeToString(clone);
        cssVars.forEach(function (varName) {
          const val = computedBody.getPropertyValue(varName).trim();
          const regex = new RegExp('var\\\\(\\\\s*' + varName.replace(/[-/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&') + '\\\\s*\\\\)', 'g');
          serialized = serialized.replace(regex, val);
        });

        return serialized;
      }

      function renderSvgToDataUrl(svgElement, widthPx, heightPx) {
        return new Promise(function (resolve, reject) {
          const svgMarkup = resolveSvgWithInlineVariables(svgElement);
          const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const img = new Image();

          img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = widthPx;
            canvas.height = heightPx;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, widthPx, heightPx);
            ctx.drawImage(img, 0, 0, widthPx, heightPx);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/png', 1.0));
          };

          img.onerror = function (err) {
            URL.revokeObjectURL(url);
            reject(err);
          };

          img.src = url;
        });
      }

      btnDownloadPdf.addEventListener('click', async function () {
        const originalText = btnDownloadPdf.innerHTML;
        try {
          btnDownloadPdf.disabled = true;
          btnDownloadPdf.innerHTML = '⏳ Gerando PDF (10 páginas)...';

          if (!window.jspdf || !window.jspdf.jsPDF) {
            alert('Aguarde o carregamento do jsPDF ou use "Salvar como PDF" no botão Imprimir.');
            window.print();
            return;
          }

          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
          });

          const widthPx = 2480;
          const heightPx = 3508;
          const svgs = Array.from(document.querySelectorAll('.a4-sheet svg'));

          for (let i = 0; i < svgs.length; i++) {
            if (i > 0) {
              pdf.addPage('a4', 'portrait');
            }
            const pageDataUrl = await renderSvgToDataUrl(svgs[i], widthPx, heightPx);
            pdf.addImage(pageDataUrl, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
          }

          pdf.save('moldes-padrinhos-magicos-a4-gigante.pdf');
        } catch (err) {
          console.error('Erro ao gerar PDF:', err);
          alert('Houve um erro. Utilize a opção "Salvar como PDF" na tela de impressão.');
          window.print();
        } finally {
          btnDownloadPdf.disabled = false;
          btnDownloadPdf.innerHTML = originalText;
        }
      });
    })();
  </script>
</body>
</html>\`;

fs.appendFileSync('c:/Projetos/fantasia/index.html', generateWingSheets() + scripts, 'utf8');
console.log('index.html fully updated with 8 wing sheets + scripts!');

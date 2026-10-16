/**
 * app.js
 * Lógica principal do Mapa das Estrelas
 * Usa o banco definido em database.js
 */

(function () {
  'use strict';

  // ============================================================
  // DADOS DOS SIGNOS OCIDENTAIS
  // ============================================================
  const signos = [
    { nome: "Áries", emoji: "♈", periodo: "21 de março a 19 de abril",
      descricao: "Nascido sob o fogo primordial, você carrega a chama da coragem. Sua alma é um cometa que não teme riscar o céu — apenas segue seu próprio brilho.",
      elemento: "Fogo", planeta: "Marte",
      constelacao: [[30,30],[90,20],[150,40],[210,25],[270,45],[330,30],[370,50]],
      acento: "#e8a87c" },
    { nome: "Touro", emoji: "♉", periodo: "20 de abril a 20 de maio",
      descricao: "Como a terra que sustenta o mundo, você é a constância que acalma. Sua força não grita — ela floresce devagar, como uma flor que sabe esperar a estação certa.",
      elemento: "Terra", planeta: "Vênus",
      constelacao: [[40,60],[100,40],[160,55],[220,35],[280,50],[340,30]],
      acento: "#8fbc8f" },
    { nome: "Gêmeos", emoji: "♊", periodo: "21 de maio a 20 de junho",
      descricao: "Mensageiro dos ventos, sua mente é um caleidoscópio de ideias. Você tece conversas como quem desenha constelações — conectando pontos que ninguém mais viu.",
      elemento: "Ar", planeta: "Mercúrio",
      constelacao: [[30,50],[80,30],[130,60],[180,25],[230,55],[280,35],[330,60],[370,40]],
      acento: "#c9b8e8" },
    { nome: "Câncer", emoji: "♋", periodo: "21 de junho a 22 de julho",
      descricao: "Guardião das marés lunares, sua sensibilidade é um oceano profundo. Sua intuição é uma bússola sagrada — confie nela, pois ela conhece o caminho de casa.",
      elemento: "Água", planeta: "Lua",
      constelacao: [[50,40],[110,25],[170,50],[230,30],[290,55],[340,35]],
      acento: "#a8c8e8" },
    { nome: "Leão", emoji: "♌", periodo: "23 de julho a 22 de agosto",
      descricao: "Rei das estrelas, você nasceu para brilhar. Não tema sua própria luz — o universo precisa do seu calor para aquecer os corações ao redor.",
      elemento: "Fogo", planeta: "Sol",
      constelacao: [[40,30],[90,55],[150,25],[210,50],[270,30],[330,55],[370,35]],
      acento: "#e8c87c" },
    { nome: "Virgem", emoji: "♍", periodo: "23 de agosto a 22 de setembro",
      descricao: "Artista dos detalhes, você enxerga a perfeição escondida no caos. Cuide de si com a mesma dedicação que oferece ao mundo.",
      elemento: "Terra", planeta: "Mercúrio",
      constelacao: [[30,45],[85,25],[140,55],[195,30],[250,50],[305,28],[360,48]],
      acento: "#c8d8b0" },
    { nome: "Libra", emoji: "♎", periodo: "23 de setembro a 22 de outubro",
      descricao: "Bailarina cósmica, você busca a harmonia em todas as coisas. Cerque-se de beleza, pois ela é o espelho da sua essência equilibrada.",
      elemento: "Ar", planeta: "Vênus",
      constelacao: [[45,50],[105,30],[165,55],[225,28],[285,52],[345,32]],
      acento: "#e8c8d8" },
    { nome: "Escorpião", emoji: "♏", periodo: "23 de outubro a 21 de novembro",
      descricao: "Mergulhador das profundezas, você transforma dor em poder. Leal até o fim, você renasce das cinzas como a fênix que conhece o segredo da imortalidade.",
      elemento: "Água", planeta: "Plutão",
      constelacao: [[35,55],[95,35],[155,60],[215,30],[275,55],[335,35],[370,55]],
      acento: "#a87c8c" },
    { nome: "Sagitário", emoji: "♐", periodo: "22 de novembro a 21 de dezembro",
      descricao: "Arqueiro do infinito, sua flecha aponta para o desconhecido. A liberdade é seu alimento — e o horizonte, sua eterna morada.",
      elemento: "Fogo", planeta: "Júpiter",
      constelacao: [[30,35],[90,55],[150,30],[210,55],[270,28],[330,52],[370,32]],
      acento: "#e8b87c" },
    { nome: "Capricórnio", emoji: "♑", periodo: "22 de dezembro a 19 de janeiro",
      descricao: "Alpinista das estrelas, você constrói pontes entre o céu e a terra. Cada passo seu é uma vitória silenciosa — e o topo, apenas o começo.",
      elemento: "Terra", planeta: "Saturno",
      constelacao: [[40,50],[100,28],[160,52],[220,30],[280,55],[340,32],[370,50]],
      acento: "#a8a8c8" },
    { nome: "Aquário", emoji: "♒", periodo: "20 de janeiro a 18 de fevereiro",
      descricao: "Visionário do futuro, você carrega a água da inovação. Você não segue o caminho — você o inventa, iluminando a escuridão com sua genialidade.",
      elemento: "Ar", planeta: "Urano",
      constelacao: [[35,40],[95,60],[155,35],[215,58],[275,32],[335,55],[370,38]],
      acento: "#7cb8e8" },
    { nome: "Peixes", emoji: "♓", periodo: "19 de fevereiro a 20 de março",
      descricao: "Sonhador dos oceanos celestes, você navega entre o real e o imaginário. Deixe sua imaginação fluir — ela é a ponte que conecta você ao divino.",
      elemento: "Água", planeta: "Netuno",
      constelacao: [[30,55],[90,35],[150,58],[210,32],[270,55],[330,35],[370,55]],
      acento: "#8ca8e8" }
  ];

  // ============================================================
  // DADOS DOS ANIMAIS CHINESES
  // ============================================================
  const animaisChineses = [
    { nome: "Rato", emoji: "🐀", desc: "A esperteza que encontra caminhos onde ninguém vê.", elemento: "Água" },
    { nome: "Boi", emoji: "🐂", desc: "A força calma que sustenta o mundo com paciência.", elemento: "Terra" },
    { nome: "Tigre", emoji: "🐅", desc: "A coragem selvagem que protege e avança sem medo.", elemento: "Madeira" },
    { nome: "Coelho", emoji: "🐇", desc: "A gentileza que floresce em cada gesto delicado.", elemento: "Madeira" },
    { nome: "Dragão", emoji: "🐉", desc: "O poder que carrega a sorte e a magia dos céus.", elemento: "Terra" },
    { nome: "Serpente", emoji: "🐍", desc: "A sabedoria silenciosa que enxerga além das aparências.", elemento: "Fogo" },
    { nome: "Cavalo", emoji: "🐎", desc: "A liberdade que galopa em direção aos próprios sonhos.", elemento: "Fogo" },
    { nome: "Cabra", emoji: "🐐", desc: "A criatividade que transforma o simples em arte.", elemento: "Terra" },
    { nome: "Macaco", emoji: "🐒", desc: "A engenhosidade que resolve o impossível com um sorriso.", elemento: "Metal" },
    { nome: "Galo", emoji: "🐓", desc: "A precisão que anuncia um novo amanhecer com confiança.", elemento: "Metal" },
    { nome: "Cão", emoji: "🐕", desc: "A lealdade que aquece e protege quem está por perto.", elemento: "Terra" },
    { nome: "Porco", emoji: "🐖", desc: "A generosidade que compartilha abundância sem esperar nada.", elemento: "Água" }
  ];

  const ANO_BASE_RATO = 1900;

  // ============================================================
  // CANVAS ESTRELADO COM PARALLAX
  // ============================================================
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let estrelas = [];
  let largura, altura;
  let mouseX = 0, mouseY = 0;
  let scrollY = 0;

  function redimensionarCanvas() {
    largura = canvas.width = window.innerWidth;
    altura = canvas.height = window.innerHeight;
    criarEstrelas();
  }

  function criarEstrelas() {
    estrelas = [];
    const quantidade = Math.min(300, Math.floor((largura * altura) / 5500));
    for (let i = 0; i < quantidade; i++) {
      estrelas.push({
        x: Math.random() * largura,
        y: Math.random() * altura,
        raio: Math.random() * 1.5 + 0.3,
        brilho: Math.random() * 0.7 + 0.3,
        velocidadeBrilho: Math.random() * 0.02 + 0.004,
        fase: Math.random() * Math.PI * 2,
        profundidade: Math.random() * 0.9 + 0.1,
        cor: Math.random() > 0.88 ? 'dourada' : (Math.random() > 0.75 ? 'azulada' : 'branca')
      });
    }
  }

  function desenharEstrelas() {
    ctx.clearRect(0, 0, largura, altura);
    const tempo = Date.now() * 0.001;

    estrelas.forEach(e => {
      const deslocX = (mouseX - largura / 2) * 0.006 * e.profundidade;
      const deslocY = (mouseY - altura / 2) * 0.006 * e.profundidade + scrollY * 0.02 * e.profundidade;
      const x = e.x + deslocX;
      const y = e.y + deslocY;

      const brilhoOsc = Math.sin(tempo * e.velocidadeBrilho * 10 + e.fase) * 0.35 + 0.65;
      const alpha = e.brilho * brilhoOsc;

      let cor;
      if (e.cor === 'dourada') {
        cor = `rgba(240, 217, 176, ${alpha})`;
      } else if (e.cor === 'azulada') {
        cor = `rgba(180, 200, 255, ${alpha})`;
      } else {
        cor = `rgba(255, 255, 255, ${alpha})`;
      }

      ctx.beginPath();
      ctx.arc(x, y, e.raio * brilhoOsc, 0, Math.PI * 2);
      ctx.fillStyle = cor;
      ctx.fill();

      if (e.raio > 1.1) {
        ctx.beginPath();
        ctx.arc(x, y, e.raio * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = e.cor === 'dourada'
          ? `rgba(240, 217, 176, ${alpha * 0.07})`
          : `rgba(200, 210, 255, ${alpha * 0.05})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(desenharEstrelas);
  }

  // ============================================================
  // PARTÍCULAS DE POEIRA
  // ============================================================
  function criarPoeira() {
    const qtd = 22;
    for (let i = 0; i < qtd; i++) {
      const p = document.createElement('div');
      p.className = 'poeira';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.width = (Math.random() * 2 + 1) + 'px';
      p.style.height = p.style.width;
      p.style.animationDuration = (Math.random() * 25 + 30) + 's';
      p.style.animationDelay = (Math.random() * -40) + 's';
      p.style.opacity = Math.random() * 0.4 + 0.15;
      document.body.appendChild(p);
    }
  }

  // ============================================================
  // ESTRELA CADENTE
  // ============================================================
  function criarEstrelaCadente() {
    const estrela = document.createElement('div');
    estrela.className = 'estrela-cadente';
    estrela.style.left = Math.random() * 60 + 20 + 'vw';
    estrela.style.top = Math.random() * 35 + 5 + 'vh';
    estrela.style.animation = `cadente ${Math.random() * 2 + 2.5}s ease-out forwards`;
    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 5000);
  }

  function agendarCadente() {
    const delay = Math.random() * 18000 + 15000;
    setTimeout(() => {
      criarEstrelaCadente();
      agendarCadente();
    }, delay);
  }

  // ============================================================
  // CÁLCULO DOS SIGNOS
  // ============================================================
  function obterSignoOcidental(dia, mes) {
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return signos[10];
    if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return signos[11];
    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return signos[0];
    if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return signos[1];
    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return signos[2];
    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return signos[3];
    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return signos[4];
    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return signos[5];
    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return signos[6];
    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return signos[7];
    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return signos[8];
    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return signos[9];
    return null;
  }

  function obterSignoChines(ano, mes, dia) {
    let anoChines = ano;

    if (mes === 1) {
      anoChines = ano - 1;
    } else if (mes === 2 && dia <= 20) {
      const anoNovoLunar = obterAnoNovoLunar(ano);
      if (dia < anoNovoLunar) {
        anoChines = ano - 1;
      }
    }

    const offset = (anoChines - ANO_BASE_RATO) % 12;
    const index = (offset + 12) % 12;
    return { animal: animaisChineses[index], anoChines };
  }

  function obterAnoNovoLunar(ano) {
    const tabela = {
      2020: 25, 2021: 12, 2022: 1, 2023: 22, 2024: 10, 2025: 29,
      2026: 17, 2027: 6, 2028: 26, 2029: 13, 2030: 3, 2031: 23,
      2032: 11, 2033: 31, 2034: 19, 2035: 8, 2036: 28, 2037: 15,
      2038: 4, 2039: 24, 2040: 12, 2041: 1, 2042: 22, 2043: 10,
      2044: 30, 2045: 17, 2046: 6, 2047: 26, 2048: 14, 2049: 2,
      2050: 23, 2051: 11, 2052: 1, 2053: 19, 2054: 8, 2055: 28,
      2056: 15, 2057: 4, 2058: 24, 2059: 12, 2060: 2, 2061: 21,
      2062: 9, 2063: 29, 2064: 17, 2065: 5, 2066: 26, 2067: 14,
      2068: 3, 2069: 23, 2070: 11, 2071: 31, 2072: 19, 2073: 7,
      2074: 27, 2075: 15, 2076: 5, 2077: 24, 2078: 12, 2079: 2,
      2080: 22, 2081: 9, 2082: 29, 2083: 17, 2084: 6, 2085: 26,
      2086: 14, 2087: 3, 2088: 24, 2089: 10, 2090: 30, 2091: 18,
      2092: 7, 2093: 27, 2094: 15, 2095: 5, 2096: 25, 2097: 12,
      2098: 1, 2099: 21, 2100: 9,
      2010: 14, 2011: 3, 2012: 23, 2013: 10, 2014: 31, 2015: 19,
      2016: 8, 2017: 28, 2018: 16, 2019: 5,
      2000: 5, 2001: 24, 2002: 12, 2003: 1, 2004: 22, 2005: 9,
      2006: 29, 2007: 18, 2008: 7, 2009: 26,
      1990: 27, 1991: 15, 1992: 4, 1993: 23, 1994: 10, 1995: 31,
      1996: 19, 1997: 7, 1998: 28, 1999: 16,
      1980: 16, 1981: 5, 1982: 25, 1983: 13, 1984: 2, 1985: 20,
      1986: 9, 1987: 29, 1988: 17, 1989: 6,
      1970: 6, 1971: 27, 1972: 15, 1973: 3, 1974: 23, 1975: 11,
      1976: 31, 1977: 18, 1978: 7, 1979: 28,
      1960: 28, 1961: 15, 1962: 5, 1963: 25, 1964: 13, 1965: 2,
      1966: 21, 1967: 9, 1968: 30, 1969: 17,
      1950: 17, 1951: 6, 1952: 27, 1953: 14, 1954: 3, 1955: 24,
      1956: 12, 1957: 31, 1958: 18, 1959: 8,
      1940: 8, 1941: 27, 1942: 15, 1943: 5, 1944: 25, 1945: 13,
      1946: 2, 1947: 22, 1948: 10, 1949: 29,
      1930: 30, 1931: 17, 1932: 6, 1933: 26, 1934: 14, 1935: 4,
      1936: 24, 1937: 11, 1938: 31, 1939: 19,
      1920: 20, 1921: 8, 1922: 28, 1923: 16, 1924: 5, 1925: 24,
      1926: 13, 1927: 2, 1928: 23, 1929: 10,
      1910: 10, 1911: 30, 1912: 18, 1913: 6, 1914: 26, 1915: 14,
      1916: 3, 1917: 23, 1918: 11, 1919: 1,
      1900: 31, 1901: 19, 1902: 8, 1903: 29, 1904: 16, 1905: 4,
      1906: 25, 1907: 13, 1908: 2, 1909: 22
    };
    return tabela[ano] || 4;
  }

  // ============================================================
  // DOM
  // ============================================================
  const inputData = document.getElementById('dataNasc');
  const btnDescobrir = document.getElementById('btnDescobrir');
  const btnLimpar = document.getElementById('btnLimpar');
  const resultadoDiv = document.getElementById('resultado');
  const signoEmoji = document.getElementById('signoEmoji');
  const signoNome = document.getElementById('signoNome');
  const signoPeriodo = document.getElementById('signoPeriodo');
  const signoDescricao = document.getElementById('signoDescricao');
  const signoElemento = document.getElementById('signoElemento');
  const chinesEmoji = document.getElementById('chinesEmoji');
  const chinesAnimal = document.getElementById('chinesAnimal');
  const chinesCiclo = document.getElementById('chinesCiclo');
  const chinesDescricao = document.getElementById('chinesDescricao');
  const chinesElemento = document.getElementById('chinesElemento');
  const erroMsg = document.getElementById('erroMsg');
  const svgConstelacao = document.querySelector('.constelacao-svg');
  const brilhoPassagem = document.getElementById('brilhoPassagem');
  const cursorEstelar = document.getElementById('cursorEstelar');
  const btnSalvar = document.getElementById('btnSalvar');
  const areaSalvar = document.getElementById('areaSalvar');
  const historicoContainer = document.getElementById('historicoContainer');
  const historicoLista = document.getElementById('historicoLista');

  // ============================================================
  // DESENHAR CONSTELAÇÃO
  // ============================================================
  function desenharConstelacao(pontos, acento) {
    svgConstelacao.innerHTML = '';

    const pontosAjustados = pontos.map(([x, y]) => {
      const novoX = 30 + (x / 400) * 340;
      const novoY = 15 + (y / 100) * 70;
      return [novoX, novoY];
    });

    for (let i = 0; i < pontosAjustados.length - 1; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pontosAjustados[i][0]);
      line.setAttribute('y1', pontosAjustados[i][1]);
      line.setAttribute('x2', pontosAjustados[i + 1][0]);
      line.setAttribute('y2', pontosAjustados[i + 1][1]);
      line.setAttribute('stroke', 'rgba(217, 193, 142, 0.5)');
      line.setAttribute('stroke-width', '1.1');
      line.setAttribute('stroke-dasharray', '3 3');
      line.style.animation = 'tracarLinha 2.5s ease forwards';
      line.style.animationDelay = (i * 0.12) + 's';
      svgConstelacao.appendChild(line);
    }

    pontosAjustados.forEach(([x, y], i) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 2.8);
      circle.setAttribute('fill', '#fff');
      circle.style.filter = `drop-shadow(0 0 4px rgba(255,255,255,0.85)) drop-shadow(0 0 10px ${acento}80)`;
      circle.style.animation = 'brilharEstrela 3s ease-in-out infinite alternate';
      circle.style.animationDelay = (i * 0.18) + 's';
      svgConstelacao.appendChild(circle);
    });
  }

  // ============================================================
  // EXIBIR RESULTADO
  // ============================================================
  function mostrarErro(mensagem) {
    erroMsg.textContent = mensagem;
    erroMsg.classList.add('show');
    resultadoDiv.classList.remove('show');
    areaSalvar.style.display = 'none';
  }

  function limparResultado() {
    resultadoDiv.classList.remove('show');
    erroMsg.classList.remove('show');
    erroMsg.textContent = '';
    areaSalvar.style.display = 'none';
  }

  function calcularSignos() {
    const valorData = inputData.value;
    if (!valorData) {
      mostrarErro('Ainda não nasceu uma estrela aqui. Escolha uma data para iluminar o céu.');
      return;
    }

    const partes = valorData.split('-');
    if (partes.length !== 3) {
      mostrarErro('Data incompleta. Deixe as estrelas se alinharem corretamente.');
      return;
    }

    const ano = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const dia = parseInt(partes[2], 10);

    if (isNaN(ano) || isNaN(mes) || isNaN(dia) || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      mostrarErro('Essa data não parece certa. Tente novamente com carinho.');
      return;
    }

    const dataObj = new Date(ano, mes - 1, dia);
    if (dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes - 1 || dataObj.getDate() !== dia) {
      mostrarErro('Essa data não existe no calendário. Que tal escolher outra?');
      return;
    }

    erroMsg.classList.remove('show');

    const signo = obterSignoOcidental(dia, mes);
    if (!signo) {
      mostrarErro('Não foi possível determinar o signo. Tente outra data.');
      return;
    }

    const chines = obterSignoChines(ano, mes, dia);

    signoEmoji.textContent = signo.emoji;
    signoNome.textContent = signo.nome;
    signoPeriodo.textContent = signo.periodo;
    signoDescricao.textContent = signo.descricao;
    signoElemento.textContent = `Elemento · ${signo.elemento} · Regente: ${signo.planeta}`;

    chinesEmoji.textContent = chines.animal.emoji;
    chinesAnimal.textContent = chines.animal.nome;
    chinesCiclo.textContent = `Ano do ${chines.animal.nome} · Ciclo de 12 anos`;
    chinesDescricao.textContent = chines.animal.desc;
    chinesElemento.textContent = `Elemento · ${chines.animal.elemento}`;

    desenharConstelacao(signo.constelacao, signo.acento);

    brilhoPassagem.classList.remove('ativo');
    void brilhoPassagem.offsetWidth;
    brilhoPassagem.classList.add('ativo');

    resultadoDiv.classList.add('show');
    areaSalvar.style.display = 'flex';

    setTimeout(() => {
      resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  }

  // ============================================================
  // HISTÓRICO (usa o banco de database.js)
  // ============================================================
  function formatarData(iso) {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }

  function carregarHistorico() {
    if (!window.DB || !window.DB.disponivel()) {
      historicoContainer.classList.remove('show');
      return;
    }

    const memorias = window.DB.listar(20);
    historicoLista.innerHTML = '';

    if (!memorias.length) {
      historicoLista.innerHTML = '<div style="text-align:center; color:rgba(200,190,230,0.4); font-size:0.8rem; padding:1rem;">Nenhuma memória guardada ainda.</div>';
      historicoContainer.classList.remove('show');
      return;
    }

    historicoContainer.classList.add('show');

    memorias.forEach(mem => {
      const div = document.createElement('div');
      div.className = 'item-historico';
      div.innerHTML = `
        <div class="item-info" data-data="${mem.dataNascimento}">
          <span class="item-signos">${mem.emojiOcidental} ${mem.signoOcidental} · ${mem.emojiChines} ${mem.animalChines}</span>
          <span class="item-data">${formatarData(mem.dataNascimento)}</span>
        </div>
        <button class="btn-remover" data-id="${mem.id}" title="Remover memória">✕</button>
      `;
      historicoLista.appendChild(div);
    });

    historicoLista.querySelectorAll('.item-info').forEach(el => {
      el.addEventListener('click', () => {
        const d = el.getAttribute('data-data');
        inputData.value = d;
        calcularSignos();
      });
    });

    historicoLista.querySelectorAll('.btn-remover').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        window.DB.remover(id);
        carregarHistorico();
      });
    });
  }

  function salvarMemoriaAtual() {
    if (!window.DB || !window.DB.disponivel()) {
      mostrarErro('O céu está silencioso no momento. Tente recarregar a página.');
      return;
    }

    const valorData = inputData.value;
    if (!valorData) return;

    const partes = valorData.split('-');
    const ano = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const dia = parseInt(partes[2], 10);

    const signo = obterSignoOcidental(dia, mes);
    const chines = obterSignoChines(ano, mes, dia);
    if (!signo || !chines) return;

    const resultado = window.DB.salvar({
      dataNascimento: valorData,
      signoNome: signo.nome,
      signoEmoji: signo.emoji,
      animalNome: chines.animal.nome,
      animalEmoji: chines.animal.emoji
    });

    if (!resultado.ok) {
      mostrarErro(resultado.mensagem);
      return;
    }

    carregarHistorico();

    const original = btnSalvar.textContent;
    btnSalvar.textContent = '✦ Guardado ✦';
    setTimeout(() => { btnSalvar.textContent = original; }, 1600);
  }

  // ============================================================
  // CURSOR ESTELAR
  // ============================================================
  document.addEventListener('mousemove', (e) => {
    if (cursorEstelar) {
      cursorEstelar.style.left = e.clientX + 'px';
      cursorEstelar.style.top = e.clientY + 'px';
    }
  });

  document.querySelectorAll('button, input, .card-ceu').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorEstelar) {
        cursorEstelar.style.width = '18px';
        cursorEstelar.style.height = '18px';
        cursorEstelar.style.background = 'radial-gradient(circle, rgba(255, 240, 200, 1) 0%, rgba(217, 193, 142, 0.5) 40%, transparent 70%)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursorEstelar) {
        cursorEstelar.style.width = '10px';
        cursorEstelar.style.height = '10px';
        cursorEstelar.style.background = 'radial-gradient(circle, rgba(255, 240, 200, 0.9) 0%, rgba(217, 193, 142, 0.4) 40%, transparent 70%)';
      }
    });
  });

  // ============================================================
  // EVENTOS
  // ============================================================
  btnDescobrir.addEventListener('click', calcularSignos);

  if (btnSalvar) {
    btnSalvar.addEventListener('click', salvarMemoriaAtual);
  }

  inputData.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calcularSignos();
    }
  });

  btnLimpar.addEventListener('click', () => {
    inputData.value = '';
    limparResultado();
    inputData.focus();
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  // ============================================================
  // INICIALIZAÇÃO
  // ============================================================
  window.addEventListener('load', async () => {
    redimensionarCanvas();
    desenharEstrelas();
    criarPoeira();
    agendarCadente();

    resultadoDiv.classList.remove('show');

    // Inicializa o banco de dados (database.js)
    if (window.DB) {
      const ok = await window.DB.init();
      if (ok) carregarHistorico();
    }

    if (cursorEstelar) {
      cursorEstelar.style.left = window.innerWidth / 2 + 'px';
      cursorEstelar.style.top = window.innerHeight / 2 + 'px';
    }
  });

  window.addEventListener('resize', redimensionarCanvas);
})();

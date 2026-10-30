/**
 * LEONARDO SALGUEIRO - CONSULTORIA EMPLAVI V2
 * Script moderno com padrão visual Emplavi e alta performance mobile
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5561982063039';

  /* ==========================================================================
     1. DRAWER MOBILE MENU
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function toggleDrawer() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      mobileMenuBtn.classList.add('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', toggleDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     2. BOTTOM DOCK NAVIGATION - ACTIVE HIGHLIGHT
     ========================================================================== */
  const dockItems = document.querySelectorAll('.dock-item[data-dock]');
  const trackedSections = document.querySelectorAll('section[id], header[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockItems.forEach(item => {
          if (item.getAttribute('data-dock') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  trackedSections.forEach(section => sectionObserver.observe(section));

  /* ==========================================================================
     3. FILTROS DE IMÓVEIS (MULTI-CRITÉRIO & HORIZONTAL PILLS)
     ========================================================================== */
  const filterRegion = document.getElementById('filterRegion');
  const filterRooms = document.getElementById('filterRooms');
  const filterStatus = document.getElementById('filterStatus');
  const filterResetBar = document.getElementById('filterResetBar');
  const filterCountText = document.getElementById('filterCountText');
  const btnClearFilters = document.getElementById('btnClearFilters');
  const propertyCards = document.querySelectorAll('.emplavi-card, .property-card');
  const emptyFilterState = document.getElementById('emptyFilterState');
  const btnResetEmpty = document.getElementById('btnResetEmpty');
  const pillBtns = document.querySelectorAll('.pill-btn');

  const propertiesGrid = document.getElementById('propertiesGrid');

  const groupedPropertiesConfig = {
    noroeste: [
      {
        name: 'Parque dos Cedros',
        badgeName: 'Parque dos Cedros',
        region: 'Noroeste',
        image: 'NOROESTE-Parque dos Cedros-Fachada.jfif',
        statusText: 'Pronto',
        statusClass: 'ready',
        filterStatus: 'Pronto',
        filterRooms: ['4'],
        regionTag: 'Setor Noroeste · SQNW 306',
        label: 'Emplavi · Pronto para Morar',
        subtitle: '4 suítes com lazer panorâmico na cobertura',
        area: '165 a 374 m²',
        rooms: '4 Suítes',
        parking: 'Até 4 Vagas',
        description: 'Pele de vidro com controle solar, fachada imponente em granito e planta inteligente com espaços fluidos e sofisticados.',
        modalTarget: 'modal-cedros',
        waHref: 'https://wa.me/5561982063039?text=Ol%C3%A1%20Leonardo,%20gostaria%20de%20receber%20a%20apresenta%C3%A7%C3%A3o%20do%20Parque%20dos%20Cedros%20no%20Noroeste.'
      },
      {
        name: 'Parque das Palmeiras',
        badgeName: 'Parque das Palmeiras',
        region: 'Noroeste',
        image: 'NOROESTE-Parque-das-palmeiras-fachada.jfif',
        statusText: 'Em Obras',
        statusClass: 'building',
        filterStatus: 'Em construção',
        filterRooms: ['2'],
        regionTag: 'Setor Noroeste · SQNW 302',
        label: 'Emplavi · Bairro Ecológico',
        subtitle: '2 suítes em frente à praça central do Noroeste',
        area: '68 a 153 m²',
        rooms: '2 Suítes',
        parking: '2 a 3 Vagas',
        description: 'Sustentabilidade com energia fotovoltaica, tomada para recarga de carro elétrico e localização premium ao lado do Parque Burle Marx.',
        modalTarget: 'modal-palmeiras',
        waHref: 'https://wa.me/5561982063039?text=Ol%C3%A1%20Leonardo,%20gostaria%20de%20receber%20a%20apresenta%C3%A7%C3%A3o%20do%20Parque%20das%20Palmeiras%20no%20Noroeste.'
      }
    ],
    sudoeste: [
      {
        name: 'Residencial Ametista',
        badgeName: 'Residencial Ametista',
        region: 'Quadra 500 · Sudoeste',
        image: 'SUDOESTE-Ametista-Fachadda.jfif',
        statusText: 'Pronto',
        statusClass: 'ready',
        filterStatus: 'Pronto',
        filterRooms: ['2'],
        regionTag: 'Quadra 500 · Sudoeste',
        label: 'Emplavi · Alto Padrão',
        subtitle: 'Até 2 suítes com varanda gourmet integrada',
        area: '76 a 179 m²',
        rooms: 'Até 2 Suítes',
        parking: 'Até 2 Vagas',
        description: 'Ambientes amplos e confortáveis com acabamentos de primeiro nível. Complexo de lazer refinado para sua família viver o melhor de Brasília.',
        modalTarget: 'modal-ametista',
        waHref: 'https://wa.me/5561982063039?text=Ol%C3%A1%20Leonardo,%20gostaria%20de%20receber%20a%20apresenta%C3%A7%C3%A3o%20e%20tabela%20do%20Residencial%20Ametista.'
      },
      {
        name: 'Residencial Topázio',
        badgeName: 'Residencial Topázio',
        region: 'Quadra 500 · Sudoeste',
        image: 'NOROESTE-Topazio-Fachada.jfif',
        statusText: 'Pronto',
        statusClass: 'ready',
        filterStatus: 'Pronto',
        filterRooms: ['3'],
        regionTag: 'Quadra 500 · Sudoeste',
        label: 'Emplavi · Alto Padrão',
        subtitle: '3 suítes e coberturas lineares exclusivas',
        area: '139 a 211 m²',
        rooms: '3 Suítes',
        parking: 'Até 4 Vagas',
        description: 'O ápice do requinte na nova Quadra 500. Fachada em granito nobre insertado, lazer com piscina aquecida e privacidade absoluta.',
        modalTarget: 'modal-topazio',
        waHref: 'https://wa.me/5561982063039?text=Ol%C3%A1%20Leonardo,%20gostaria%20de%20receber%20a%20apresenta%C3%A7%C3%A3o%20e%20tabela%20do%20Residencial%20Top%C3%A1zio%20na%20Quadra%20500.'
      }
    ]
  };

  const allIndividualProperties = [
    ...groupedPropertiesConfig.noroeste,
    ...groupedPropertiesConfig.sudoeste,
    {
      name: 'Ilha Bella Guará',
      badgeName: 'Ilha Bella',
      region: 'Guará',
      image: 'GUARA_Ilha_Bella_Cartao.jfif',
      statusText: 'Pronto',
      statusClass: 'ready',
      filterStatus: 'Pronto',
      filterRooms: ['3'],
      regionTag: 'Guará II · Próximo ao Metrô',
      label: 'Emplavi · Lazer Resort',
      subtitle: '3 quartos com suíte em condomínio fechado',
      area: '97 a 109 m²',
      rooms: '3 Quartos',
      parking: '2 a 3 Vagas',
      description: 'O consagrado padrão de qualidade Emplavi no Guará. Complexo aquático, segurança 24h e altíssimo potencial de valorização.',
      modalTarget: 'modal-guara',
      waHref: 'https://wa.me/5561982063039?text=Ol%C3%A1%20Leonardo,%20gostaria%20de%20receber%20a%20tabela%20do%20Ilha%20Bella%20no%20Guar%C3%A1.'
    }
  ];

  const propCarouselControllers = new Map();

  document.querySelectorAll('.prop-carousel-card').forEach(card => {
    const groupKey = card.getAttribute('data-card-group');
    const items = groupedPropertiesConfig[groupKey];
    const track = card.querySelector('.prop-carousel-track');
    const slides = Array.from(card.querySelectorAll('.prop-carousel-slide'));
    const prevBtn = card.querySelector('.video-carousel-nav.prev');
    const nextBtn = card.querySelector('.video-carousel-nav.next');
    const dots = Array.from(card.querySelectorAll('.carousel-dot'));
    const badge = card.querySelector('.video-carousel-badge');

    const statusTagEl = card.querySelector('.card-tag-status');
    const regionTagEl = card.querySelector('.card-tag-region');
    const labelEl = card.querySelector('.card-emplavi-label');
    const titleEl = card.querySelector('.card-prop-title');
    const subtitleEl = card.querySelector('.card-prop-subtitle');
    const specAreaEl = card.querySelector('.spec-area .spec-text');
    const specRoomsEl = card.querySelector('.spec-rooms .spec-text');
    const specParkingEl = card.querySelector('.spec-parking .spec-text');
    const descEl = card.querySelector('.card-prop-text');
    const detailsBtn = card.querySelector('.btn-card-details');
    const waBtn = card.querySelector('.btn-card-wa');

    if (!items || !track || slides.length === 0) return;

    let currentIndex = 0;

    function updatePropCardUI(newIndex) {
      currentIndex = newIndex;
      const item = items[currentIndex];
      if (!item) return;

      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
      if (badge) badge.textContent = `${currentIndex + 1}/${items.length} · ${item.name}`;

      if (statusTagEl) {
        statusTagEl.textContent = item.statusText;
        statusTagEl.classList.remove('ready', 'building');
        statusTagEl.classList.add(item.statusClass);
      }
      if (regionTagEl) regionTagEl.textContent = item.regionTag;
      if (labelEl) labelEl.textContent = item.label;
      if (titleEl) titleEl.textContent = item.name;
      if (subtitleEl) subtitleEl.textContent = item.subtitle;
      if (specAreaEl) specAreaEl.textContent = item.area;
      if (specRoomsEl) specRoomsEl.textContent = item.rooms;
      if (specParkingEl) specParkingEl.textContent = item.parking;
      if (descEl) descEl.textContent = item.description;
      if (detailsBtn) detailsBtn.setAttribute('data-modal-target', item.modalTarget);
      if (waBtn) waBtn.setAttribute('href', item.waHref);
    }

    function goToSlide(index, smooth = true) {
      const targetIndex = (index + slides.length) % slides.length;
      const slideWidth = track.clientWidth;
      track.scrollTo({
        left: targetIndex * slideWidth,
        behavior: smooth ? 'smooth' : 'auto'
      });
      updatePropCardUI(targetIndex);
    }

    let scrollTimer = null;
    track.addEventListener('scroll', () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const slideWidth = track.clientWidth;
        if (slideWidth > 0) {
          const idx = Math.round(track.scrollLeft / slideWidth);
          if (idx >= 0 && idx < slides.length && idx !== currentIndex) {
            updatePropCardUI(idx);
          }
        }
      }, 60);
    }, { passive: true });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Arrastar pro lado com o mouse no desktop
    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let draggedDistance = 0;

    track.addEventListener('mousedown', (e) => {
      isPointerDown = true;
      startX = e.pageX;
      startScrollLeft = track.scrollLeft;
      draggedDistance = 0;
      track.classList.add('dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown) return;
      const deltaX = e.pageX - startX;
      draggedDistance = Math.abs(deltaX);
      if (draggedDistance > 5) {
        e.preventDefault();
        track.scrollLeft = startScrollLeft - deltaX;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      track.classList.remove('dragging');

      const deltaX = e.pageX - startX;
      const threshold = 40;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0 && currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else if (deltaX > 0 && currentIndex > 0) {
          goToSlide(currentIndex - 1);
        } else {
          goToSlide(currentIndex);
        }
      } else if (draggedDistance > 5) {
        goToSlide(currentIndex);
      }
    });

    propCarouselControllers.set(card, { items, goToSlide, getCurrentIndex: () => currentIndex });
  });

  function createIndividualCardElement(item) {
    const article = document.createElement('article');
    article.className = 'emplavi-card filtered-individual-card';
    article.innerHTML = `
      <div class="emplavi-card-media">
        <img src="${item.image}" alt="${item.name}" draggable="false" loading="lazy">
        <div class="video-carousel-topbar">
          <span class="video-carousel-badge">${item.badgeName || item.name}</span>
        </div>
        <span class="card-tag-region">${item.regionTag}</span>
        <span class="card-tag-status ${item.statusClass}">${item.statusText}</span>
      </div>
      <div class="emplavi-card-body">
        <div class="card-emplavi-label">${item.label}</div>
        <h3 class="card-prop-title">${item.name}</h3>
        <div class="card-mini-divider"></div>
        <p class="card-prop-subtitle">${item.subtitle}</p>

        <div class="card-specs-emplavi">
          <span class="spec-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
            ${item.area}
          </span>
          <span class="spec-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            ${item.rooms}
          </span>
          <span class="spec-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            ${item.parking}
          </span>
        </div>

        <p class="card-prop-text">${item.description}</p>

        <div class="card-footer-actions">
          <button class="btn btn-outline-navy btn-card-details" data-modal-target="${item.modalTarget}">
            Ver Detalhes
          </button>
          <a href="${item.waHref}" 
             class="btn btn-emplavi-primary" 
             target="_blank" 
             rel="noopener">
            Tabela & Fotos
          </a>
        </div>
      </div>
    `;
    return article;
  }

  function applyFilters() {
    const regionVal = filterRegion ? filterRegion.value.trim() : '';
    const roomsVal = filterRooms ? filterRooms.value.trim() : '';
    const statusVal = filterStatus ? filterStatus.value.trim() : '';

    const isFiltered = Boolean(regionVal || roomsVal || statusVal);

    // Remove cartões individuais gerados por filtragens anteriores
    if (propertiesGrid) {
      propertiesGrid.querySelectorAll('.filtered-individual-card').forEach(el => el.remove());
    }

    if (!isFiltered) {
      // Sem filtro: exibe os 3 cartões agrupados por região
      propertyCards.forEach(card => {
        card.style.display = 'flex';
      });
      if (filterResetBar) filterResetBar.style.display = 'none';
      if (emptyFilterState) emptyFilterState.style.display = 'none';
      return;
    }

    // Com filtro ativo: oculta os cartões agrupados e exibe cada empreendimento em cartão separado
    propertyCards.forEach(card => {
      card.style.display = 'none';
    });

    const matchedItems = allIndividualProperties.filter(item => {
      const matchRegion = !regionVal || item.region === regionVal;
      const matchStatus = !statusVal || item.filterStatus === statusVal;
      const matchRooms = !roomsVal || item.filterRooms.includes(roomsVal);
      return matchRegion && matchStatus && matchRooms;
    });

    if (propertiesGrid) {
      matchedItems.forEach(item => {
        propertiesGrid.appendChild(createIndividualCardElement(item));
      });
    }

    const visibleCount = matchedItems.length;

    if (filterResetBar) {
      filterResetBar.style.display = 'flex';
      if (filterCountText) {
        filterCountText.textContent = `${visibleCount} ${visibleCount === 1 ? 'empreendimento encontrado' : 'empreendimentos encontrados'}`;
      }
    }

    if (emptyFilterState) {
      emptyFilterState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  function resetAllFilters() {
    if (filterRegion) filterRegion.value = '';
    if (filterRooms) filterRooms.value = '';
    if (filterStatus) filterStatus.value = '';
    pillBtns.forEach(p => p.classList.remove('active'));
    const defaultPill = document.querySelector('.pill-btn[data-filter-tag="all"]');
    if (defaultPill) defaultPill.classList.add('active');
    applyFilters();
  }

  if (filterRegion) filterRegion.addEventListener('change', applyFilters);
  if (filterRooms) filterRooms.addEventListener('change', applyFilters);
  if (filterStatus) filterStatus.addEventListener('change', applyFilters);
  if (btnClearFilters) btnClearFilters.addEventListener('click', resetAllFilters);
  if (btnResetEmpty) btnResetEmpty.addEventListener('click', resetAllFilters);

  // Quick Horizontal Pills
  pillBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      pillBtns.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const tag = pill.getAttribute('data-filter-tag');

      if (tag === 'all') {
        if (filterRegion) filterRegion.value = '';
        if (filterStatus) filterStatus.value = '';
      } else if (tag === 'Pronto' || tag === 'Em construção') {
        if (filterStatus) filterStatus.value = tag;
        if (filterRegion) filterRegion.value = '';
      } else {
        if (filterRegion) filterRegion.value = tag;
        if (filterStatus) filterStatus.value = '';
      }

      applyFilters();

      const portfolioSec = document.getElementById('imoveis');
      if (portfolioSec) {
        portfolioSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     4. WORKSHOP & PLAYERS DE VÍDEO (PAUSA AUTOMÁTICA & CARROSSEL INTERATIVO)
     ========================================================================== */
  const workshopVideos = document.querySelectorAll('.workshop-video-player');

  if (workshopVideos.length > 0) {
    workshopVideos.forEach(video => {
      video.addEventListener('play', () => {
        // Pausa automaticamente os outros vídeos para evitar sobreposição de áudio
        workshopVideos.forEach(otherVideo => {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
          }
        });
      });
    });
  }

  // Carrossel interativo de vídeos (arrastar pro lado, setas e indicadores)
  const videoCarousels = document.querySelectorAll('.video-carousel-wrapper');

  videoCarousels.forEach(carousel => {
    const track = carousel.querySelector('.video-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.video-carousel-slide'));
    const prevBtn = carousel.querySelector('.video-carousel-nav.prev');
    const nextBtn = carousel.querySelector('.video-carousel-nav.next');
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const badge = carousel.querySelector('.video-carousel-badge');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    function updateCarouselUI(newIndex) {
      if (newIndex !== currentIndex) {
        // Pausa vídeo do slide anterior ao trocar de slide
        const prevVideo = slides[currentIndex]?.querySelector('video');
        if (prevVideo && !prevVideo.paused) {
          prevVideo.pause();
        }
        currentIndex = newIndex;
      }

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });

      if (badge) {
        const videoName = slides[currentIndex]?.getAttribute('data-video-name') || '';
        badge.textContent = `${currentIndex + 1}/${slides.length} · ${videoName}`;
      }
    }

    function goToSlide(index) {
      const targetIndex = (index + slides.length) % slides.length;
      const slideWidth = track.clientWidth;
      track.scrollTo({
        left: targetIndex * slideWidth,
        behavior: 'smooth'
      });
      updateCarouselUI(targetIndex);
    }

    // Atualiza indicadores ao arrastar/deslizar (scroll nativo ou touch)
    let scrollTimer = null;
    track.addEventListener('scroll', () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const slideWidth = track.clientWidth;
        if (slideWidth > 0) {
          const idx = Math.round(track.scrollLeft / slideWidth);
          if (idx >= 0 && idx < slides.length) {
            updateCarouselUI(idx);
          }
        }
      }, 60);
    }, { passive: true });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Suporte a arrastar com o mouse no desktop (swipe horizontal)
    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let draggedDistance = 0;

    track.addEventListener('mousedown', (e) => {
      // Ignora clique na barra inferior de controles nativos do vídeo (~48px finais)
      const rect = track.getBoundingClientRect();
      if (e.clientY - rect.top > rect.height - 48) return;

      isPointerDown = true;
      startX = e.pageX;
      startScrollLeft = track.scrollLeft;
      draggedDistance = 0;
      track.classList.add('dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown) return;
      const deltaX = e.pageX - startX;
      draggedDistance = Math.abs(deltaX);
      if (draggedDistance > 5) {
        e.preventDefault();
        track.scrollLeft = startScrollLeft - deltaX;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      track.classList.remove('dragging');

      const deltaX = e.pageX - startX;
      const threshold = 45;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0 && currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else if (deltaX > 0 && currentIndex > 0) {
          goToSlide(currentIndex - 1);
        } else {
          goToSlide(currentIndex);
        }
      } else if (draggedDistance > 5) {
        goToSlide(currentIndex);
      }
    });

    // Evita dar play/pause acidental ao soltar um arraste com o mouse
    track.addEventListener('click', (e) => {
      if (draggedDistance > 10) {
        e.preventDefault();
        e.stopPropagation();
        draggedDistance = 0;
      }
    }, true);
  });

  /* ==========================================================================
     5. MODAL / BOTTOM SHEET (EMPREENDIMENTOS & ARTIGOS)
     ========================================================================== */
  const propertyModal = document.getElementById('propertyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDynamicBody = document.getElementById('modalDynamicBody');

  const propertyDetailsData = {
    'modal-topazio': {
      title: 'Residencial Topázio · Quadra 500 Sudoeste',
      subtitle: 'O ápice da exclusividade residencial em Brasília',
      image: 'NOROESTE-Topazio-Fachada.jfif',
      specs: [
        { label: 'Área Privativa', value: '139 a 211 m²' },
        { label: 'Tipologia', value: '3 Suítes' },
        { label: 'Garagem', value: 'Até 4 Vagas' }
      ],
      features: [
        'Fachada imponente em granito insertado e esquadrias de piso ao teto com atenuação acústica de alto desempenho.',
        'Living panorâmico integrado à varanda gourmet com vista definitiva para área verde.',
        'Lazer sofisticado: Piscina aquecida com raia, espaço gourmet privativo, academia com equipamentos profissionais e salão de festas nobre.',
        'Infraestrutura completa para automação residencial e ponto de recarga individual para veículos elétricos.'
      ],
      whatsappMsg: 'Olá Leonardo, quero receber o book oficial com plantas e tabela de preços do Residencial Topázio na Quadra 500.'
    },
    'modal-ametista': {
      title: 'Residencial Ametista · Quadra 500 Sudoeste',
      subtitle: 'Requinte e bem-estar no coração da Quadra 500',
      image: 'SUDOESTE-Ametista-Fachadda.jfif',
      specs: [
        { label: 'Área Privativa', value: '76 a 179 m²' },
        { label: 'Tipologia', value: 'Até 2 Suítes' },
        { label: 'Garagem', value: 'Até 2 Vagas' }
      ],
      features: [
        'Planta inteligente com aproveitamento absoluto de iluminação natural e ventilação cruzada.',
        'Acabamentos premium com porcelanato de grande formato e bancadas nobres.',
        'Complexo de lazer exclusivo no pilotis e na cobertura com piscina de borda infinita.',
        'Segurança patrimonial com guarita blindada e controle biométrico de acesso.'
      ],
      whatsappMsg: 'Olá Leonardo, gostaria de detalhes do Residencial Ametista e agendar uma visita guiada.'
    },
    'modal-palmeiras': {
      title: 'Parque das Palmeiras · Noroeste SQNW 302',
      subtitle: 'Arquitetura sustentável e alto padrão no primeiro bairro ecológico do país',
      image: 'NOROESTE-Parque-das-palmeiras-fachada.jfif',
      specs: [
        { label: 'Área Privativa', value: '68 a 153 m²' },
        { label: 'Tipologia', value: '2 Suítes' },
        { label: 'Garagem', value: '2 a 3 Vagas' }
      ],
      features: [
        'Localização nobre em frente à praça arborizada e a poucos passos do Parque Burle Marx.',
        'Aquecimento solar central para água, reuso de águas pluviais e painéis fotovoltaicos para áreas comuns.',
        'Suíte máster ampla com cuba dupla e espaço para closet walk-in.',
        'Condições de pagamento com fluxo direto na planta com a Emplavi sem juros bancários.'
      ],
      whatsappMsg: 'Olá Leonardo, quero conhecer a tabela de fluxo de pagamento na planta do Parque das Palmeiras no Noroeste.'
    },
    'modal-cedros': {
      title: 'Parque dos Cedros · Noroeste SQNW 306',
      subtitle: 'Padrão executivo com fachada em granito e pele de vidro',
      image: 'NOROESTE-Parque dos Cedros-Fachada.jfif',
      specs: [
        { label: 'Área Privativa', value: '165 a 374 m²' },
        { label: 'Tipologia', value: '4 Suítes' },
        { label: 'Garagem', value: 'Até 4 Vagas' }
      ],
      features: [
        'Pronto para morar com unidades entregues em padrão impecável de acabamento.',
        'Espaço gourmet integrado e churrasqueira a gás embutida na varanda.',
        'Cobertura coletiva panorâmica com sauna, spa de relaxamento e academia.',
        'Localização com acesso fácil às vias principais da Asa Norte e Eixo Monumental.'
      ],
      whatsappMsg: 'Olá Leonardo, quero agendar visita a uma unidade pronta no Parque dos Cedros.'
    },
    'modal-guara': {
      title: 'Ilha Bella · Guará II',
      subtitle: 'Qualidade construtiva Emplavi com conceito de resort privativo',
      image: 'GUARA_Ilha_Bella_Cartao.jfif',
      specs: [
        { label: 'Área Privativa', value: '97 a 109 m²' },
        { label: 'Tipologia', value: '3 Quartos (c/ Suíte)' },
        { label: 'Garagem', value: '2 a 3 Vagas' }
      ],
      features: [
        'Condomínio fechado pronto para morar com infraestrutura de lazer comparável a um resort 5 estrelas.',
        'Excelente custo-benefício e alto potencial de valorização e rentabilidade de aluguel.',
        'Próximo a estações do Metrô DF, polo comercial e escolas tradicionais.',
        'Facilidades de financiamento direto e bancário com condições especiais.'
      ],
      whatsappMsg: 'Olá Leonardo, quero receber o memorial descritivo e tabela de valores do Ilha Bella no Guará.'
    }
  };

  const articleDetailsData = {
    'art-1': {
      title: 'Energia solar em edifícios: como funciona e vantagens',
      category: 'Sustentabilidade',
      date: '19 de Outubro de 2026 · Publicado no Blog Emplavi',
      image: 'https://emplavi.com.br/wp-content/uploads/2026/10/energia-solar-em-edificios-como-funciona-e-vantagens.jpg',
      link: 'https://emplavi.com.br/blog/energia-solar-em-edificios-como-funciona-e-vantagens/',
      body: `
        <p>A evolução da eficiência energética na arquitetura residencial de Brasília aproxima responsabilidade ambiental, inovação e conforto de quem busca um imóvel preparado para o futuro. Nesse cenário, a energia solar em edifícios se destaca como uma solução capaz de contribuir para a eficiência do empreendimento e para o uso mais consciente dos recursos naturais.</p>
        <br>
        <p>A adoção da energia solar em edifícios residenciais baseia-se na captação da radiação solar por meio de módulos fotovoltaicos e na sua conversão em eletricidade para atender parte da demanda de energia usada nas áreas comuns e áreas de lazer do empreendimento.</p>
        <br>
        <p>Além da redução de custos condominiais no longo prazo, empreendimentos que incorporam soluções sustentáveis consolidam maior valorização patrimonial no mercado de alto padrão de Brasília.</p>
      `
    },
    'art-2': {
      title: 'Apartamentos à Venda em Brasília: Por Que a Emplavi é a Melhor Escolha',
      category: 'Comprar um imóvel',
      date: '08 de Setembro de 2026 · Publicado no Blog Emplavi',
      image: 'https://emplavi.com.br/wp-content/uploads/2026/08/apartamentos-a-venda-em-brasilia-por-que-a-emplavi-e-a-melhor-escolha-scaled.jpg',
      link: 'https://emplavi.com.br/blog/apartamentos-a-venda-em-brasilia-por-que-a-emplavi-e-a-melhor-escolha/',
      body: `
        <p>Adquirir um apartamento à venda em Brasília representa a consolidação de um estilo de vida de sucesso na cidade, que reúne urbanismo, segurança e qualidade de vida. Na Capital Federal, a escolha do imóvel exige uma análise criteriosa que deve considerar aspectos que vão além de apenas estética arquitetônica e localização.</p>
        <br>
        <p>Diante das dinâmicas específicas do mercado imobiliário do Distrito Federal, avaliar a solidez da construtora e a qualidade técnica da engenharia é fundamental para resguardar o patrimônio e o bem-estar familiar.</p>
        <br>
        <p>Investir no mercado imobiliário de luxo da capital do país com a solidez de mais de 40 anos da Emplavi é uma das decisões mais eficientes para a blindagem de capital e a estabilidade financeira de longo prazo.</p>
      `
    },
    'art-3': {
      title: 'Tendências de decoração de luxo: dicas para seu apartamento',
      category: 'Decoração e Paisagismo',
      date: '31 de Agosto de 2026 · Publicado no Blog Emplavi',
      image: 'https://emplavi.com.br/wp-content/uploads/2026/08/tendencias-de-decoracao-de-luxo-dicas-para-seu-apartamento.jpg',
      link: 'https://emplavi.com.br/blog/tendencias-de-decoracao-de-luxo-dicas-para-seu-apartamento/',
      body: `
        <p>A decoração de luxo transforma apartamentos modernos em ambientes que expressam sofisticação, conforto e autenticidade. Na Capital Federal, onde a arquitetura e o design integrado fazem parte da identidade urbana, planejar cada detalhe dos interiores é uma das formas mais eficientes de valorizar o patrimônio e criar um refúgio acolhedor para a rotina familiar.</p>
        <br>
        <p>O mercado de alto padrão contemporâneo prioriza layouts funcionais, autenticidade e a valorização de materiais nobres, substituindo excessos ostensivos pela sofisticação atemporal.</p>
        <br>
        <p>O conceito de luxo silencioso (quiet luxury) consolidou-se como a principal tendência de design de interiores ao valorizar a elegância sutil, a funcionalidade dos ambientes amplos e a iluminação em camadas.</p>
      `
    },
    'art-4': {
      title: 'Hora certa para investir em um Imóvel na Planta: Entenda Mais sobre essa modalidade de compra',
      category: 'Empreendimentos · Mercado Imobiliário',
      date: '25 de Agosto de 2026 · Publicado no Blog Emplavi',
      image: 'https://emplavi.com.br/wp-content/uploads/2021/12/Emplavi-Noroeste-60-3.jpg',
      link: 'https://emplavi.com.br/blog/hora-certa-para-investir-em-um-imovel-na-planta-entenda-mais-sobre-essa-modalidade-compra/',
      body: `
        <p>Um dos temas mais recorrentes quando o assunto é comprar um novo imóvel, seja para morar ou investir, é a aquisição de um “imóvel na planta”, especialmente em momentos em que investidores buscam alternativas seguras e previsíveis para proteger seu patrimônio e diversificar seus investimentos.</p>
        <br>
        <p>Comprar um imóvel na planta junto a uma incorporadora sólida como a Emplavi oferece vantagens decisivas: personalização de planta, tabela de lançamento com condições flexíveis durante o período de obras e expressiva valorização patrimonial até a entrega das chaves.</p>
        <br>
        <p>Todos os empreendimentos contam com Patrimônio de Afetação e a tradição de 100% de entrega no prazo da Emplavi.</p>
      `
    }
  };

  function openPropertyModal(targetId) {
    const data = propertyDetailsData[targetId];
    if (!data || !modalDynamicBody) return;

    modalDynamicBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-hero-img">
      <span class="modal-header-tag">Empreendimento Emplavi</span>
      <h3 class="modal-prop-title">${data.title}</h3>
      <div class="card-mini-divider"></div>
      <p class="modal-prop-sub">${data.subtitle}</p>

      <div class="modal-specs-grid">
        ${data.specs.map(s => `
          <div class="modal-spec-item">
            <span>${s.label}</span>
            <strong>${s.value}</strong>
          </div>
        `).join('')}
      </div>

      <div class="modal-feature-list">
        ${data.features.map(f => `
          <div class="modal-feat-point">
            <span>✓</span>
            <p>${f}</p>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 24px;">
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(data.whatsappMsg)}" 
           class="btn btn-emplavi-primary btn-block" 
           target="_blank" 
           rel="noopener">
          Solicitar Book Oficial & Tabela de Preços no WhatsApp
        </a>
      </div>
    `;

    propertyModal.classList.add('open');
    propertyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openArticleModal(artId) {
    const data = articleDetailsData[artId];
    if (!data || !modalDynamicBody) return;

    const imageHtml = data.image
      ? `<img src="${data.image}" alt="${data.title}" class="modal-hero-img">`
      : '';
    const externalLinkHtml = data.link
      ? `<a href="${data.link}" target="_blank" rel="noopener" class="btn btn-emplavi-secondary btn-block" style="margin-bottom: 10px;">Ler matéria completa no Blog Emplavi »</a>`
      : '';

    modalDynamicBody.innerHTML = `
      ${imageHtml}
      <span class="modal-header-tag">${data.category || 'Blog Emplavi · Análise de Mercado'}</span>
      <h3 class="modal-prop-title" style="margin-top: 8px;">${data.title}</h3>
      <div class="card-mini-divider"></div>
      <p class="modal-prop-sub" style="margin-bottom: 20px;">${data.date}</p>
      <div style="font-size: 15px; line-height: 1.7; color: var(--text-body); margin-bottom: 26px;">
        ${data.body}
      </div>
      <div>
        ${externalLinkHtml}
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá Leonardo, li o artigo "' + data.title + '" no seu site e gostaria de conversar.')}" 
           class="btn btn-emplavi-primary btn-block" 
           target="_blank" 
           rel="noopener">
          Falar com Leonardo Salgueiro no WhatsApp
        </a>
      </div>
    `;

    propertyModal.classList.add('open');
    propertyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function bindReadMoreButtons() {
    document.querySelectorAll('.btn-read-more').forEach(btn => {
      btn.onclick = () => {
        const artId = btn.getAttribute('data-article-target');
        openArticleModal(artId);
      };
    });
  }

  /* ==========================================================================
     6. SINCRONIZAÇÃO AUTOMÁTICA MENSAL COM O BLOG DA EMPLAVI (4 MAIS RECENTES)
     ========================================================================== */
  const MONTHS_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  function renderBlogPostsToDom(posts) {
    if (!Array.isArray(posts) || posts.length < 4) return;

    posts.slice(0, 4).forEach((p, idx) => {
      const id = `art-${idx + 1}`;
      articleDetailsData[id] = {
        title: p.title,
        category: p.category || 'Blog Emplavi',
        date: `${p.date} · Publicado no Blog Emplavi`,
        image: p.image,
        link: p.link,
        body: Array.isArray(p.paragraphs)
          ? p.paragraphs.map(para => `<p>${para}</p>`).join('<br>')
          : `<p>${p.excerpt}</p>`
      };
    });

    const featured = posts[0];
    const gridPosts = posts.slice(1, 4);

    const featuredCard = document.getElementById('blogFeaturedCard');
    if (featuredCard && featured) {
      featuredCard.innerHTML = `
        <div class="featured-img-wrap">
          <img src="${featured.image}" alt="${featured.title.replace(/"/g, '&quot;')}" loading="lazy">
        </div>
        <div class="featured-body">
          <div class="blog-post-meta">
            <span class="blog-cat">${featured.category}</span>
            <span class="blog-date">${featured.date}</span>
          </div>
          <h3 class="featured-title">${featured.title}</h3>
          <div class="card-mini-divider"></div>
          <p class="featured-excerpt">${featured.excerpt}</p>
          <button class="btn btn-outline-navy btn-read-more" data-article-target="art-1">
            Leia mais »
          </button>
        </div>
      `;
    }

    const gridContainer = document.getElementById('blogGridContainer');
    if (gridContainer && gridPosts.length > 0) {
      gridContainer.innerHTML = gridPosts.map((post, i) => `
        <article class="blog-card-item">
          <div class="blog-card-thumb">
            <img src="${post.image}" alt="${post.title.replace(/"/g, '&quot;')}" loading="lazy">
          </div>
          <div class="blog-card-details">
            <div class="blog-post-meta">
              <span class="blog-cat">${post.category}</span>
              <span class="blog-date">${post.date}</span>
            </div>
            <h4 class="blog-item-title">${post.title}</h4>
            <div class="card-mini-divider"></div>
            <p class="blog-item-text">${post.excerpt}</p>
            <button class="btn-blog-link btn-read-more" data-article-target="art-${i + 2}">
              Leia mais »
            </button>
          </div>
        </article>
      `).join('');
    }

    bindReadMoreButtons();
  }

  async function checkMonthlyEmplaviBlogUpdate() {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const storageKey = 'emplavi_blog_sync_v1';

    try {
      // 1. Carrega cache local de blog-posts.json
      const localRes = await fetch('blog-posts.json', { cache: 'no-cache' });
      if (localRes.ok) {
        const localData = await localRes.json();
        if (localData && Array.isArray(localData.posts) && localData.posts.length >= 4) {
          renderBlogPostsToDom(localData.posts);
          if (localData.lastCheckedMonth === currentMonth) {
            return; // Já atualizado neste mês
          }
        }
      }
    } catch (_) {}

    // 2. Se virou o mês, consulta o endpoint do servidor ou diretamente a API da Emplavi
    try {
      const apiRes = await fetch('/api/blog-posts', { cache: 'no-cache' });
      if (apiRes.ok) {
        const apiData = await apiRes.json();
        if (apiData && Array.isArray(apiData.posts) && apiData.posts.length >= 4) {
          renderBlogPostsToDom(apiData.posts);
          localStorage.setItem(storageKey, JSON.stringify({ month: currentMonth, posts: apiData.posts }));
          return;
        }
      }
    } catch (_) {}

    try {
      const cached = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (cached && cached.month === currentMonth && Array.isArray(cached.posts)) {
        renderBlogPostsToDom(cached.posts);
        return;
      }

      const wpRes = await fetch('https://emplavi.com.br/wp-json/wp/v2/posts?per_page=4&_embed');
      if (wpRes.ok) {
        const rawPosts = await wpRes.json();
        const tmpDiv = document.createElement('div');
        const cleanText = (html) => {
          tmpDiv.innerHTML = html || '';
          return (tmpDiv.textContent || tmpDiv.innerText || '').replace(/\s+/g, ' ').trim();
        };

        const formatted = rawPosts.slice(0, 4).map((p, idx) => {
          const d = new Date(p.date);
          const dateStr = `${String(d.getDate()).padStart(2, '0')} de ${MONTHS_PT[d.getMonth()]} de ${d.getFullYear()}`;
          const img = p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
          const terms = p._embedded?.['wp:term']?.[0]?.map(t => cleanText(t.name)).join(' · ') || 'Blog Emplavi';
          let excerpt = cleanText(p.excerpt?.rendered).replace(/\[\.\.\.\]$/, '...');
          if (excerpt.length > 200) excerpt = excerpt.slice(0, 197).replace(/\s+\S*$/, '') + '...';
          const paras = (p.content?.rendered?.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [])
            .map(para => cleanText(para))
            .filter(t => t.length > 40)
            .slice(0, 4);

          return {
            id: `art-${idx + 1}`,
            title: cleanText(p.title?.rendered),
            category: terms,
            date: dateStr,
            image: img,
            excerpt,
            paragraphs: paras.length ? paras : [excerpt],
            link: p.link
          };
        });

        renderBlogPostsToDom(formatted);
        localStorage.setItem(storageKey, JSON.stringify({ month: currentMonth, posts: formatted }));
      }
    } catch (_) {}
  }

  function closeModal() {
    if (!propertyModal) return;
    propertyModal.classList.remove('open');
    propertyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-card-details');
    if (btn) {
      const target = btn.getAttribute('data-modal-target');
      openPropertyModal(target);
    }
  });

  bindReadMoreButtons();
  checkMonthlyEmplaviBlogUpdate();

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (propertyModal) {
    propertyModal.addEventListener('click', (e) => {
      if (e.target === propertyModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && propertyModal && propertyModal.classList.contains('open')) {
      closeModal();
    }
  });

  /* Smooth scroll interno */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});

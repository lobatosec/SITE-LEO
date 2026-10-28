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

  function applyFilters() {
    const regionVal = filterRegion ? filterRegion.value.trim() : '';
    const roomsVal = filterRooms ? filterRooms.value.trim() : '';
    const statusVal = filterStatus ? filterStatus.value.trim() : '';

    let visibleCount = 0;

    propertyCards.forEach(card => {
      const cardRegion = (card.getAttribute('data-region') || '').trim();
      const cardRooms = (card.getAttribute('data-rooms') || '').split(',').map(s => s.trim());
      const cardStatus = (card.getAttribute('data-status') || '').trim();

      const matchRegion = !regionVal || cardRegion === regionVal;
      const matchStatus = !statusVal || cardStatus === statusVal;
      const matchRooms = !roomsVal || cardRooms.includes(roomsVal);

      if (matchRegion && matchStatus && matchRooms) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const isFiltered = Boolean(regionVal || roomsVal || statusVal);

    if (filterResetBar) {
      filterResetBar.style.display = isFiltered ? 'flex' : 'none';
      if (filterCountText) {
        filterCountText.textContent = `${visibleCount} empreendimento${visibleCount === 1 ? '' : 's'} encontrado${visibleCount === 1 ? '' : 's'}`;
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
     4. WORKSHOP & PLAYERS DE VÍDEO (PAUSA AUTOMÁTICA)
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
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Área Privativa', value: '238 m² a 480 m²' },
        { label: 'Tipologia', value: '4 Suítes + DCE' },
        { label: 'Garagem', value: '4 Vagas + Depósito' }
      ],
      features: [
        'Fachada imponente em granito insertado e esquadrias de piso ao teto com atenuação acústica de alto desempenho.',
        'Living panorâmico integrado à varanda gourmet com vista definitiva para área verde.',
        'Lazer sofisticado: Piscina aquecida com raia, espaço gourmet privativo, academia com equipamentos profissionais e salão de festas nobre.',
        'Infraestrutura completa para automação residencial e ponto de recarga individual para veículos elétricos.'
      ],
      whatsappMsg: 'Olá Leonardo, quero receber o book oficial com plantas e tabela de preços do Residencial Topázio na Quadra 500.'
    },
    'modal-safira': {
      title: 'Residencial Safira · Quadra 500 Sudoeste',
      subtitle: 'Requinte e bem-estar no coração da Quadra 500',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Área Privativa', value: '198 m²' },
        { label: 'Tipologia', value: '4 Suítes' },
        { label: 'Garagem', value: '3 a 4 Vagas' }
      ],
      features: [
        'Planta inteligente com aproveitamento absoluto de iluminação natural e ventilação cruzada.',
        'Acabamentos premium com porcelanato de grande formato e bancadas nobres.',
        'Complexo de lazer exclusivo no pilotis e na cobertura com piscina de borda infinita.',
        'Segurança patrimonial com guarita blindada e controle biométrico de acesso.'
      ],
      whatsappMsg: 'Olá Leonardo, gostaria de detalhes do Residencial Safira e agendar uma visita guiada.'
    },
    'modal-oliveiras': {
      title: 'Parque das Oliveiras · Noroeste SQNW 302',
      subtitle: 'Arquitetura sustentável e alto padrão no primeiro bairro ecológico do país',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Área Privativa', value: '167 m² a 330 m²' },
        { label: 'Tipologia', value: '4 Suítes' },
        { label: 'Garagem', value: '3 a 4 Vagas' }
      ],
      features: [
        'Localização nobre em frente à praça arborizada e a poucos passos do Parque Burle Marx.',
        'Aquecimento solar central para água, reuso de águas pluviais e painéis fotovoltaicos para áreas comuns.',
        'Suíte máster ampla com cuba dupla e espaço para closet walk-in.',
        'Condições de pagamento com fluxo direto na planta com a Emplavi sem juros bancários.'
      ],
      whatsappMsg: 'Olá Leonardo, quero conhecer a tabela de fluxo de pagamento na planta do Parque das Oliveiras no Noroeste.'
    },
    'modal-turmalina': {
      title: 'Residencial Turmalina · Noroeste SQNW 102',
      subtitle: 'Padrão executivo com fachada em granito e pele de vidro',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Área Privativa', value: '145 m² a 180 m²' },
        { label: 'Tipologia', value: '3 e 4 Suítes' },
        { label: 'Garagem', value: '3 Vagas Soltas' }
      ],
      features: [
        'Pronto para morar com unidades entregues em padrão impecável de acabamento.',
        'Espaço gourmet integrado e churrasqueira a gás embutida na varanda.',
        'Cobertura coletiva panorâmica com sauna, spa de relaxamento e academia.',
        'Localização com acesso fácil às vias principais da Asa Norte e Eixo Monumental.'
      ],
      whatsappMsg: 'Olá Leonardo, quero agendar visita a uma unidade pronta no Residencial Turmalina.'
    },
    'modal-guara': {
      title: 'Ilha Bella · Guará II',
      subtitle: 'Qualidade construtiva Emplavi com conceito de resort privativo',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Área Privativa', value: '75 m² a 95 m²' },
        { label: 'Tipologia', value: '2 e 3 Quartos (c/ Suíte)' },
        { label: 'Garagem', value: '1 a 2 Vagas' }
      ],
      features: [
        'Condomínio fechado com infraestrutura de lazer comparável a um resort 5 estrelas.',
        'Excelente custo-benefício e alto potencial de valorização e rentabilidade de aluguel.',
        'Próximo a estações do Metrô DF, polo comercial e escolas tradicionais.',
        'Facilidades de financiamento e entrada parcelada durante o período de obras.'
      ],
      whatsappMsg: 'Olá Leonardo, quero receber o memorial descritivo e tabela de valores do Ilha Bella no Guará.'
    }
  };

  const articleDetailsData = {
    'art-1': {
      title: 'Por que a Quadra 500 é o endereço mais raro e valorizado do Sudoeste',
      date: 'Publicado no Blog Emplavi · Guia de Mercado',
      body: `
        <p>A Quadra 500 representa o último capítulo do plano de expansão residencial do Sudoeste. Com terrenos amplos e projeto urbanístico que privilegia grandes afastamentos entre os blocos, a região nasceu com atributos que não existem mais em nenhuma outra área consolidada do Plano Piloto.</p>
        <br>
        <p>Para quem busca segurança patrimonial, os imóveis da Quadra 500 oferecem uma taxa de valorização superior à média do DF, impulsionada pela escassez física de terrenos e pela presença exclusiva de incorporadoras de altíssimo padrão, lideradas pela Emplavi.</p>
        <br>
        <p>Projetos com plantas generosas de 4 suítes, coberturas lineares e 4 vagas de garagem consolidaram a quadra como o refúgio das famílias mais tradicionais de Brasília.</p>
      `
    },
    'art-2': {
      title: 'Financiamento na planta: fluxo direto com a construtora sem segredos',
      date: 'Publicado no Blog Emplavi · Planejamento Financeiro',
      body: `
        <p>Comprar um imóvel na planta da Emplavi permite flexibilidade no fluxo financeiro. Durante o período de obras (geralmente entre 24 e 36 meses), o saldo devedor é atualizado pelo INCC, sem incidência de juros bancários.</p>
        <br>
        <p>Você pode estruturar o pagamento com entradas confortáveis, parcelas mensais e semestrais e quitar ou financiar o saldo restante na entrega das chaves.</p>
        <br>
        <p>Além disso, a Emplavi oferece planos de financiamento direto pós-chaves, uma alternativa ágil para compradores que preferem não lidar com burocracias bancárias convencionais.</p>
      `
    },
    'art-3': {
      title: 'Patrimônio de Afetação: a blindagem jurídica essencial para seu patrimônio',
      date: 'Publicado no Blog Emplavi · Segurança Jurídica',
      body: `
        <p>O Patrimônio de Afetação é um mecanismo legal criado pela Lei 10.931/2004. Ele estabelece que os recursos arrecadados para a construção de um empreendimento específico são totalmente separados do patrimônio geral da construtora.</p>
        <br>
        <p>Na prática, isso significa que cada obra possui contabilidade própria e os recursos investidos pelos compradores são blindados contra qualquer outro evento financeiro da empresa.</p>
        <br>
        <p>A Emplavi adota o regime de afetação em 100% de seus lançamentos, garantindo transparência, solidez e entrega no prazo com rigor absoluto há mais de 4 décadas.</p>
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

    modalDynamicBody.innerHTML = `
      <span class="modal-header-tag">Blog Emplavi · Análise de Mercado</span>
      <h3 class="modal-prop-title" style="margin-top: 8px;">${data.title}</h3>
      <div class="card-mini-divider"></div>
      <p class="modal-prop-sub" style="margin-bottom: 20px;">${data.date}</p>
      <div style="font-size: 15px; line-height: 1.7; color: var(--text-body); margin-bottom: 26px;">
        ${data.body}
      </div>
      <div>
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá Leonardo, li o artigo no seu site e gostaria de tirar uma dúvida sobre este tema.')}" 
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

  function closeModal() {
    if (!propertyModal) return;
    propertyModal.classList.remove('open');
    propertyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-card-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal-target');
      openPropertyModal(target);
    });
  });

  document.querySelectorAll('.btn-read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const artId = btn.getAttribute('data-article-target');
      openArticleModal(artId);
    });
  });

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

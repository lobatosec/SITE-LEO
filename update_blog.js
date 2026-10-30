/**
 * Script de sincronização das 4 últimas notícias do Blog da Emplavi
 * Fonte: https://emplavi.com.br/blog/ (via WP REST API oficial)
 * Executa verificação mensal ou sob demanda.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const WP_API_URL = 'https://emplavi.com.br/wp-json/wp/v2/posts?per_page=4&_embed';
const BLOG_JSON_PATH = path.join(__dirname, 'blog-posts.json');
const INDEX_HTML_PATH = path.join(__dirname, 'index.html');

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function decodeHtml(str = '') {
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/&#8230;/g, '...')
    .replace(/&nbsp;/g, ' ');
}

function stripTags(str = '') {
  return decodeHtml(str.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function formatWpPosts(rawPosts) {
  return rawPosts.slice(0, 4).map((p, idx) => {
    const d = new Date(p.date);
    const dateFormatted = `${String(d.getDate()).padStart(2, '0')} de ${MONTHS_PT[d.getMonth()]} de ${d.getFullYear()}`;
    const img =
      p._embedded &&
      p._embedded['wp:featuredmedia'] &&
      p._embedded['wp:featuredmedia'][0] &&
      p._embedded['wp:featuredmedia'][0].source_url
        ? p._embedded['wp:featuredmedia'][0].source_url
        : 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

    const terms =
      p._embedded &&
      p._embedded['wp:term'] &&
      p._embedded['wp:term'][0] &&
      p._embedded['wp:term'][0].length > 0
        ? p._embedded['wp:term'][0].map(t => decodeHtml(t.name)).join(' · ')
        : 'Blog Emplavi';

    let excerpt = stripTags(p.excerpt && p.excerpt.rendered ? p.excerpt.rendered : '')
      .replace(/\[\.\.\.\]$/, '...')
      .trim();
    if (excerpt.length > 200) {
      excerpt = excerpt.slice(0, 197).replace(/\s+\S*$/, '') + '...';
    }

    const contentHtml = p.content && p.content.rendered ? p.content.rendered : '';
    const paras = (contentHtml.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [])
      .map(para => stripTags(para))
      .filter(t => t.length > 40)
      .slice(0, 4);

    return {
      id: `art-${idx + 1}`,
      wpId: p.id,
      title: stripTags(p.title && p.title.rendered ? p.title.rendered : ''),
      category: terms,
      date: dateFormatted,
      isoDate: p.date,
      image: img,
      excerpt,
      paragraphs: paras.length > 0 ? paras : [excerpt],
      link: p.link || 'https://emplavi.com.br/blog/'
    };
  });
}

function buildBlogSectionInnerHtml(posts) {
  if (!posts || posts.length === 0) return null;
  const featured = posts[0];
  const gridPosts = posts.slice(1, 4);

  const gridCardsHtml = gridPosts.map((post) => `
          <article class="blog-card-item">
            <div class="blog-card-thumb">
              <img src="${post.image}" 
                   alt="${post.title.replace(/"/g, '&quot;')}" 
                   loading="lazy">
            </div>
            <div class="blog-card-details">
              <div class="blog-post-meta">
                <span class="blog-cat">${post.category}</span>
                <span class="blog-date">${post.date}</span>
              </div>
              <h4 class="blog-item-title">${post.title}</h4>
              <div class="card-mini-divider"></div>
              <p class="blog-item-text">
                ${post.excerpt}
              </p>
              <button class="btn-blog-link btn-read-more" data-article-target="${post.id}">
                Leia mais »
              </button>
            </div>
          </article>`).join('\n');

  return `        <!-- Featured Article (Como no topo do Blog da Emplavi) -->
        <div class="blog-featured-card" id="blogFeaturedCard">
          <div class="featured-img-wrap">
            <img src="${featured.image}" 
                 alt="${featured.title.replace(/"/g, '&quot;')}" 
                 loading="lazy">
          </div>
          <div class="featured-body">
            <div class="blog-post-meta">
              <span class="blog-cat">${featured.category}</span>
              <span class="blog-date">${featured.date}</span>
            </div>
            <h3 class="featured-title">${featured.title}</h3>
            <div class="card-mini-divider"></div>
            <p class="featured-excerpt">
              ${featured.excerpt}
            </p>
            <button class="btn btn-outline-navy btn-read-more" data-article-target="${featured.id}">
              Leia mais »
            </button>
          </div>
        </div>

        <!-- Blog Grid (Loop Grid Padrão Emplavi - 3 artigos + 1 destaque = 4 mais recentes) -->
        <div class="blog-grid-emplavi" id="blogGridContainer">
${gridCardsHtml}
        </div>`;
}

function updateIndexHtmlWithPosts(posts) {
  if (!fs.existsSync(INDEX_HTML_PATH)) return;
  const html = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  const startMarker = '<!-- Featured Article (Como no topo do Blog da Emplavi) -->';
  const endMarker = '</div>\n\n      </div>\n    </section>\n\n    <!-- SOBRE LEONARDO SALGUEIRO -->';

  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);

  if (startIdx !== -1 && endIdx !== -1) {
    const newBlogBlock = buildBlogSectionInnerHtml(posts);
    const updatedHtml = html.slice(0, startIdx) + newBlogBlock + '\n\n      </div>\n    </section>\n\n    <!-- SOBRE LEONARDO SALGUEIRO -->' + html.slice(endIdx + endMarker.length);
    fs.writeFileSync(INDEX_HTML_PATH, updatedHtml, 'utf8');
  }
}

function fetchJsonFromUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Consultoria-Emplavi-Sync)' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status HTTP: ${res.statusCode}`));
      }
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function syncEmplaviBlog({ force = false, fromFile = null } = {}) {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  if (!force && !fromFile && fs.existsSync(BLOG_JSON_PATH)) {
    try {
      const existing = JSON.parse(fs.readFileSync(BLOG_JSON_PATH, 'utf8'));
      if (existing.lastCheckedMonth === currentMonth && Array.isArray(existing.posts) && existing.posts.length === 4) {
        return existing;
      }
    } catch (_) {}
  }

  let rawPosts;
  if (fromFile && fs.existsSync(fromFile)) {
    rawPosts = JSON.parse(fs.readFileSync(fromFile, 'utf8'));
  } else {
    rawPosts = await fetchJsonFromUrl(WP_API_URL);
  }

  const posts = formatWpPosts(rawPosts);
  const payload = {
    source: 'https://emplavi.com.br/blog/',
    lastCheckedMonth: currentMonth,
    updatedAt: new Date().toISOString(),
    posts
  };

  fs.writeFileSync(BLOG_JSON_PATH, JSON.stringify(payload, null, 2), 'utf8');
  updateIndexHtmlWithPosts(posts);
  return payload;
}

if (require.main === module) {
  const fromFileArg = process.argv.find(a => a.startsWith('--from-file='));
  const fromFile = fromFileArg ? fromFileArg.split('=')[1] : null;
  const force = process.argv.includes('--force') || Boolean(fromFile);

  syncEmplaviBlog({ force, fromFile })
    .then(data => {
      console.log(`[Blog Sync OK] ${data.posts.length} notícias sincronizadas (${data.lastCheckedMonth}).`);
      data.posts.forEach((p, i) => console.log(`  ${i + 1}. [${p.date}] ${p.title}`));
    })
    .catch(err => {
      console.error('[Blog Sync Erro]', err.message);
      process.exit(1);
    });
}

module.exports = { syncEmplaviBlog };


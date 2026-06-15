(function(){
  var T = {
    common: {
      es: {
        'nav-home':'Home','nav-portfolio':'Portfolio','nav-magazine':'Magazine',
        'nav-ecommerce':'IA · Ecommerce','nav-estudio':'Estudio','nav-contacto':'Contacto',
        'cta-label':'¿Listo para empezar?',
        'cta-title':'¿Quieres reservar <em>tu sesión?</em>',
        'cta-desc':'Cuéntame tu proyecto. Analizo cada propuesta de forma personalizada para ofrecer la mejor solución.',
        'cta-btn1':'WhatsApp directo','cta-btn2':'Enviar email',
        'footer-copy':'© 2026 Eloi Garcia · photoeloi.com'
      },
      en: {
        'nav-home':'Home','nav-portfolio':'Portfolio','nav-magazine':'Magazine',
        'nav-ecommerce':'AI · Ecommerce','nav-estudio':'Studio','nav-contacto':'Contact',
        'cta-label':'Ready to start?',
        'cta-title':'Want to book <em>your session?</em>',
        'cta-desc':'Tell me about your project. I analyse each proposal personally to offer the best solution.',
        'cta-btn1':'Direct WhatsApp','cta-btn2':'Send email',
        'footer-copy':'© 2026 Eloi Garcia · photoeloi.com'
      }
    },
    index: {
      es: {
        'hero-tag':'Barcelona · Fotografía de autor',
        'hero-title':'Capturando<br><em>historias</em><br>únicas',
        'hero-subtitle':'Fotografía editorial, moda y retrato en Barcelona. Cada imagen cuenta una historia que permanece.',
        'hero-cta':'Ver portfolio','hero-counter-label':'Años de experiencia',
        'portfolio-label':'Trabajos','portfolio-title':'Portfolio',
        'portfolio-desc':'Una selección de trabajos que definen mi mirada — retratos, moda y momentos auténticos capturados en Barcelona y más allá.',
        'magazine-label':'Publicaciones','magazine-title':'Magazine &<br><em>Editorial</em>',
        'ec-label':'Innovación','ec-title':'IA ·<br><em>Ecommerce</em>',
        'ec-desc':'Fotografía de producto potenciada con inteligencia artificial. Resultados profesionales, entregas rápidas y un nuevo estándar para tu tienda online.',
        'ec-f1-title':'Fondos Generativos','ec-f1-desc':'Cambia el escenario de tus productos en segundos con IA de última generación.',
        'ec-f2-title':'Retoque Avanzado','ec-f2-desc':'Imágenes perfectas sin horas de postproducción manual.',
        'ec-f3-title':'Pack Ecommerce','ec-f3-desc':'Todo lo que necesitas para tu catálogo digital en un solo servicio.',
        'ec-btn':'Solicitar presupuesto',
        'footer-tagline':'Fotógrafo editorial y comercial en Barcelona. Retrato, moda, ecommerce e IA.',
        'footer-nav':'Navegación','footer-services':'Servicios','footer-contact':'Contacto',
        'fs-1':'Retrato Editorial','fs-2':'Fotografía de Moda','fs-3':'Comercial & Producto','fs-4':'IA Ecommerce'
      },
      en: {
        'hero-tag':'Barcelona · Author Photography',
        'hero-title':'Capturing<br><em>unique</em><br>stories',
        'hero-subtitle':'Editorial, fashion and portrait photography in Barcelona. Every image tells a story that endures.',
        'hero-cta':'View portfolio','hero-counter-label':'Years of experience',
        'portfolio-label':'Works','portfolio-title':'Portfolio',
        'portfolio-desc':'A curated selection of work that defines my vision — portraits, fashion and authentic moments captured in Barcelona and beyond.',
        'magazine-label':'Publications','magazine-title':'Magazine &<br><em>Editorial</em>',
        'ec-label':'Innovation','ec-title':'AI ·<br><em>Ecommerce</em>',
        'ec-desc':'Product photography powered by artificial intelligence. Professional results, fast delivery and a new standard for your online store.',
        'ec-f1-title':'Generative Backgrounds','ec-f1-desc':'Change your product settings in seconds with cutting-edge AI.',
        'ec-f2-title':'Advanced Retouching','ec-f2-desc':'Perfect images without hours of manual post-production.',
        'ec-f3-title':'Ecommerce Pack','ec-f3-desc':'Everything you need for your digital catalogue in one service.',
        'ec-btn':'Request a quote',
        'footer-tagline':'Editorial and commercial photographer in Barcelona. Portrait, fashion, ecommerce & AI.',
        'footer-nav':'Navigation','footer-services':'Services','footer-contact':'Contact',
        'fs-1':'Editorial Portrait','fs-2':'Fashion Photography','fs-3':'Commercial & Product','fs-4':'AI Ecommerce'
      }
    },
    portfolio: {
      es: { 'pf-label':'Trabajos','pf-title':'Port<em>folio</em>','pf-cta':'Reservar sesión','pf-back':'Volver al portfolio' },
      en: { 'pf-label':'Works','pf-title':'Port<em>folio</em>','pf-cta':'Book a session','pf-back':'Back to portfolio' }
    },
    magazine: {
      es: { 'mag-title':'Maga<em>zine</em>' },
      en: { 'mag-title':'Maga<em>zine</em>' }
    },
    ecommerce: {
      es: {
        'ec-page-tag':'Fotografía de Producto · Inteligencia Artificial',
        'ec-page-title':'Fotografía de Producto<br>para Ecommerce con<br><em>Inteligencia Artificial</em>',
        'ec-page-desc':'Soy Eloi Gracia, fotógrafo profesional en Barcelona especializado en fotografía de producto para ecommerce que combina técnicas fotográficas tradicionales con inteligencia artificial (IA). Trabajo con marcas y tiendas online para crear imágenes de catálogo que venden, con modelos virtuales, múltiples ángulos y contenido visual optimizado para plataformas digitales.',
        'ec-page-tag2':'Innovación en fotografía de producto para ecommerce',
        'ec-page-h2':'Fotografía de producto con<br><em>IA y modelos virtuales</em>'
      },
      en: {
        'ec-page-tag':'Product Photography · Artificial Intelligence',
        'ec-page-title':'Product Photography<br>for Ecommerce with<br><em>Artificial Intelligence</em>',
        'ec-page-desc':'Specialist in Barcelona in product photography for ecommerce combining traditional techniques with artificial intelligence, virtual models and catalogue image optimisation.',
        'ec-page-tag2':'Innovation in ecommerce product photography',
        'ec-page-h2':'Product photography with<br><em>AI and virtual models</em>'
      }
    },
    estudio: {
      es: {
        'est-space-label':'El espacio',
        'est-title':'Espacioso y luminoso<br><em>estudio en Poble-Nou</em>',
        'est-desc1':'Espacioso y luminoso estudio ubicado en el dinámico barrio de Poble-Nou, dentro del distrito de Sant Martí.',
        'est-desc2':'Gracias al Proyecto 22@ Barcelona, el barrio ha recuperado su histórica vitalidad económica y social, impulsada por una sólida base cultural y artística. Este proceso de renovación ha permitido restaurar un antiguo local industrial, transformándolo en un espacio único y versátil.',
        'est-desc3':'Este estudio, diseñado al más puro estilo loft neoyorquino, ofrece un entorno adaptable a las necesidades de cada cliente. La esencia de su pasado industrial se fusiona con la modernidad de un espacio cuidadosamente restaurado.',
        'est-desc4':'Es el lugar ideal para producciones fotográficas, presentaciones comerciales, showrooms y eventos que busquen un ambiente auténtico, creativo y lleno de inspiración.',
        'est-feat-label':'Características',
        'est-stat1':'Superficie','est-stat2':'Años de experiencia','est-stat3':'Sesiones realizadas'
      },
      en: {
        'est-space-label':'The Space',
        'est-title':'Spacious and bright<br><em>studio in Poble-Nou</em>',
        'est-desc1':'Spacious and bright studio located in the dynamic Poble-Nou neighbourhood, in the Sant Martí district.',
        'est-desc2':'Thanks to the 22@ Barcelona Project, the neighbourhood has recovered its historic economic and social vitality, driven by a solid cultural and artistic base. This renewal process allowed the restoration of a former industrial space, transforming it into a unique and versatile venue.',
        'est-desc3':'This studio, designed in the purest New York loft style, offers an adaptable environment to each client\'s needs. The essence of its industrial past merges with the modernity of a carefully restored space.',
        'est-desc4':'The ideal venue for photo productions, commercial presentations, showrooms and events seeking an authentic, creative and inspiring atmosphere.',
        'est-feat-label':'Features',
        'est-stat1':'Floor area','est-stat2':'Years of experience','est-stat3':'Sessions completed'
      }
    },
    contacto: {
      es: {
        'res-label':'Para reservas y consultas comerciales',
        'res-title':'Eloi Garcia<br><em>Fotógrafo Barcelona</em>',
        'lt-tel':'Teléfono','lt-email':'Email',
        'div-text':'Para cualquier otra consulta utiliza el formulario.',
        'form-label':'Formulario de contacto',
        'wa-btn':'WhatsApp directo'
      },
      en: {
        'res-label':'For bookings and commercial enquiries',
        'res-title':'Eloi Garcia<br><em>Photographer Barcelona</em>',
        'lt-tel':'Phone','lt-email':'Email',
        'div-text':'For any other enquiry please use the form.',
        'form-label':'Contact form',
        'wa-btn':'Direct WhatsApp'
      }
    }
  };

  var lang = localStorage.getItem('photoeloi-lang') || 'es';

  function apply(page){
    var common = T.common[lang] || {};
    var specific = (T[page] && T[page][lang]) ? T[page][lang] : {};
    var t = Object.assign({}, common, specific);
    [].forEach.call(document.querySelectorAll('[data-i18n]'), function(el){
      var k = el.getAttribute('data-i18n');
      if(t[k] !== undefined) el.textContent = t[k];
    });
    [].forEach.call(document.querySelectorAll('[data-i18n-html]'), function(el){
      var k = el.getAttribute('data-i18n-html');
      if(t[k] !== undefined) el.innerHTML = t[k];
    });
    [].forEach.call(document.querySelectorAll('.lang-current'), function(el){
      el.textContent = lang === 'es' ? 'EN' : 'ES';
    });
    document.documentElement.lang = lang;
  }

  function toggle(page){
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('photoeloi-lang', lang);
    apply(page);
  }

  document.addEventListener('DOMContentLoaded', function(){
    var page = document.body.getAttribute('data-page') || 'index';
    apply(page);
    [].forEach.call(document.querySelectorAll('.lang-btn'), function(btn){
      btn.addEventListener('click', function(){ toggle(page); });
    });
  });
})();

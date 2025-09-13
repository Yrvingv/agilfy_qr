import React from "react";

const WHATSAPP_LINK =
  "https://wa.me/5493813594194?text=Hola%20Agilfy,%20quiero%20ver%20la%20demo%20de%20pedidos%20con%20QR.";
const AGILFY_SITE = "https://yrvingv.github.io/agilfy_ai/";

/* --------- Palabra rotativa (Opción 2) --------- */
function Rotator({ items, interval = 1600 }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items, interval]);
  return (
    <span
      className="rotator"
      style={{
        color: "var(--cyan)",
        fontWeight: 700,
        display: "inline-block",
        animation: "pop .45s ease",
      }}
    >
      {items[i]}
    </span>
  );
}

/* --------- Pasos animados (aparecen 1-2-3-4 y reinicia) --------- */
const STEPS = [
  {
    n: 1,
    title: "QR en cada mesa",
    desc: "El cliente escanea y ve la carta en su teléfono.",
  },
  {
    n: 2,
    title: "Pedido & Confir-mación",
    desc: "El mozo revisa y confirma en segundos.",
  },
  {
    n: 3,
    title: "Cocina al instante",
    desc: "La orden llega a cocina sin mozos corriendo con papelitos.",
  },
  {
    n: 4,
    title: "Panel de control",
    desc: "Ventas, platos, tiempos, todo medido y exportable.",
  },
];

function AnimatedSteps() {
  const total = STEPS.length;
  const [visible, setVisible] = React.useState(1); // cuántas cajas están visibles

  React.useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => (v >= total ? 1 : v + 1));
    }, 1000); // 1 segundo entre pasos
    return () => clearInterval(id);
  }, [total]);

  return (
    <div className="steps" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
      {STEPS.map((s, idx) => {
        const isShown = idx < visible;
        const justAppeared = idx === visible - 1; // para resaltar el que aparece
        return (
          <div
            key={s.n}
            className="step"
            style={{
              background: "var(--card)",
              border: `1px solid ${justAppeared ? "var(--blue)" : "#222533"}`,
              boxShadow: justAppeared ? "0 0 24px rgba(0,100,255,.25)" : "none",
              borderRadius: 14,
              padding: 16,
              opacity: isShown ? 1 : 0.15,
              transform: isShown ? "none" : "scale(0.98)",
              transition: "opacity 300ms ease, transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
              minHeight: 160,
            }}
          >
            <div
              className="step-num"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--blue)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {s.n}
            </div>
            <h4 style={{ margin: "0 0 8px" }}>{s.title}</h4>
            <p style={{ margin: 0, color: "var(--muted)" }}>{s.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// --- helper mínimo para responsive sin CSS ---
function useIsMobile(bp = 920) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" &&
      window.matchMedia(`(max-width:${bp}px)`).matches
  );
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange)
                        : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange)
                             : mq.removeListener(onChange);
    };
  }, [bp]);
  return isMobile;
}


export default function App() {

    const isMobile = useIsMobile(920);

    // 🔧 Parámetros que podés tocar:
    const VIDEO_MAX_W_DESKTOP = 420; // px
    const VIDEO_MAX_W_MOBILE  = 340; // px (ajustá el tamaño del video en celulares)
    const BULLETS_MIN = 220;         // px (ancho mínimo de la columna de bullets)
    const BULLETS_MAX = 420;         // px (ancho máximo de la columna de bullets)

  return (
    <div className="page">
      {/* NAV SIMPLE */}
      <header className="nav">
        <div className="brand">
          <span className="bolt bolt-dot" ></span>Agilfy_ia
        </div>
        <div className="nav-cta">
          <a className="btn btn-primary" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            Programar demo
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        {/* Línea de atención arriba del h1 */}
        <p
          className="lead-ask"
          style={{
            margin: "0 0 30px",
            color: "yellow",
            fontWeight: 600,
            textAlign: "center",
            fontSize: "40px" 
          }}
        >
          ¿Todavía anotan pedidos en{" "}
          <Rotator items={["papelitos?", "WhatsApp?", "Excel?", "comandas?"]} />
        </p>

        {/* Título y subtítulo centrados */}
        <div style={{ textAlign: "center" }}>
          <h1 className="title">
            Pedidos con <span className="accent">QR</span> para tu restaurante:
            menos errores, más velocidad, más ventas.
          </h1>
          <p className="subtitle">
            Los clientes ordenan desde la mesa. El mozo confirma. La cocina lo
            ve al instante. Todo queda registrado en tu panel.
          </p>
        </div>

        <div className="hero-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a className="btn btn-primary btn-xl" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            Quiero la demo
          </a>
          <a className="btn btn-ghost" href="#video">
            Ver cómo funciona
          </a>
        </div>

        <div className="metrics">
          <div className="kpi">
            <span className="kpi-num">-35%</span>
            <span className="kpi-label">errores de toma de pedido</span>
          </div>
          <div className="kpi">
            <span className="kpi-num">+28%</span>
            <span className="kpi-label">pedidos atendidos en hora pico</span>
          </div>
          <div className="kpi">
            <span className="kpi-num">100%</span>
            <span className="kpi-label">trazabilidad de cada ticket</span>
          </div>
        </div>
      </section>

      {/* VIDEO (vertical 9:16) + BULLETS más angostos */}
      <section
        id="video"
        style={{
          display: "grid",
          gap: 10,
          alignItems: "start",
          margin: "28px 0",
          // Desktop: 2 columnas → video (auto) + bullets (ancho acotado)
          // Móvil: 1 columna (apilado)
          gridTemplateColumns: isMobile
            ? "1fr"
            : `auto minmax(${BULLETS_MIN}px, ${BULLETS_MAX}px)`,
        }}
      >
        {/* Caja del player (vertical 9:16) */}
        <div
          style={{
            width: isMobile
              ? `min(100%, ${VIDEO_MAX_W_MOBILE}px)`
              : `clamp(240px, 28vw, ${VIDEO_MAX_W_DESKTOP}px)`,
            aspectRatio: "9 / 16",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #222533",
            background: "#1e1e1e",
            margin: "0 auto",
          }}
        >
          <video
            muted
            loop
            playsInline
            controls
            poster={`${import.meta.env.BASE_URL}poster.png`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              background: "#000"
            }}
          >
            <source
              src={`${import.meta.env.BASE_URL}demo-qr.mp4`}
              type="video/mp4"
            />
            <source
              src={`${import.meta.env.BASE_URL}demo-qr.webm`}
              type="video/webm"
            />
            Tu navegador no soporta video HTML5.
          </video>
        </div>

        {/* Bullets más angostos */}
        <div
          className="video-bullets"
          style={{
            maxWidth: isMobile ? "100%" : `${BULLETS_MAX}px`,
            padding: 16,
            background: "#121219",
            border: "1px solid #222533",
            borderRadius: 14,
          }}
        >
          <h3 style={{ marginTop: 0 }}>¿Qué resuelve?</h3>
          <ul style={{ margin: "10px 0 0 20px", color: "#C7C9CC" }}>
            <li>Pedidos claros: sin letra ilegible ni confusiones.</li>
            <li>Confirmación del mozo con un toque.</li>
            <li>Orden directo a cocina (tablet/monitor/impresora).</li>
            <li>Precios y carta actualizables en 1 minuto.</li>
            <li>Panel con ventas, platos top y tiempos.</li>
          </ul>
        </div>
      </section>


      {/* PROCESO SIMPLE (animado y cíclico) */}
      <section className="process">
        <h2>Así funciona</h2>
        <AnimatedSteps />
        <div className="center" style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <a className="btn btn-primary btn-xl" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            Reservar demo sin costo
          </a>
        </div>
      </section>

      {/* PRUEBA SOCIAL SIMPLE */}
      <section className="social">
        <h3>Minimalista y efectivo</h3>
        <p className="social-sub">
          Sin contratos largos. Sin equipos caros. Listo para picos de demanda.
        </p>
        <div className="logos">
          <span className="logo">🍽️</span>
          <span className="logo">☕</span>
          <span className="logo">🥐</span>
          <span className="logo">🍕</span>
        </div>
      </section>

      {/* FAQ CORTO */}
      <section className="faq">
        <details>
          <summary>¿Necesito cambiar mi POS?</summary>
          <p>No. Podés seguir cobrando como siempre; nosotros automatizamos pedidos y cocina.</p>
        </details>
        <details>
          <summary>¿Se puede imprimir el ticket en cocina?</summary>
          <p>Sí. Tablet, monitor o impresora de cocina: como te resulte más cómodo.</p>
        </details>
        <details>
          <summary>¿Puedo editar la carta y precios?</summary>
          <p>Sí. Entras al panel, cambiás precios o platos y se actualiza al instante.</p>
        </details>
      </section>

      {/* CTA FINAL */}
      <section className="final-cta">
        <h2>
          Menos errores.     Más velocidad.    Más ventas. <span className="accent" >Clientes felices.</span>
        </h2>
        <div className="center" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a className="btn btn-primary btn-xl" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            Hablar por WhatsApp
          </a>
          <a className="btn btn-outline" href={AGILFY_SITE} target="_blank" rel="noreferrer">
            Conocer Agilfy →
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Agilfy</span>
        <a
          href={AGILFY_SITE}
          target="_blank"
          rel="noreferrer"
          className="footer-link"
          aria-label="Abrir sitio de Agilfy"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo-agilfy.svg`}
            alt="Agilfy — Automatizaciones/IA"
            className="footer-logo"
          />
        </a>
      </footer>

      {/* Animación clave usada por el rotator (fallback si no está en tu CSS) */}
      <style>
        {`
          @keyframes pop{
            from{ opacity:0; transform: translateY(6px) scale(.98) }
            to  { opacity:1; transform: translateY(0)   scale(1) }
          }
        `}
      </style>
    </div>
  );
}

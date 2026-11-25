import { useEffect, useMemo, useState } from 'react';
import { BUSINESS } from '../config.js';
import { CATEGORIES } from '../data/products.js';
import { GALLERY_PRODUCTS } from '../data/galleryProducts.js';
import { whatsappLink } from '../lib/format.js';
import ProductCard from './ProductCard.jsx';

export default function Gallery({ onSelect, onList }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = GALLERY_PRODUCTS.filter(
      (p) => (cat === 'all' || p.category === cat) && (!needle || p.name.toLowerCase().includes(needle))
    );
    return out;
  }, [cat, q]);

  useEffect(() => {
    onList(list);
  }, [list, onList]);

  const count = (id) => GALLERY_PRODUCTS.filter((p) => p.category === id).length;

  return (
    <main className="gallery">
      <div className="g-wrap">
        <div className="g-head">
          <h1>The catalogue</h1>
          <p>
            {list.length} of {GALLERY_PRODUCTS.length} products
          </p>
        </div>
        <div className="g-head">
          <p className="g-note">
            Concept demo, not the official VSC Interiors site. Prices are in US dollars, taken from the public Google listing, and not confirmed.
          </p>
        </div>

        <div className="g-tools">
          <div className="chips" role="group" aria-label="Filter by collection">
            <button type="button" className="chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
              All <span>{GALLERY_PRODUCTS.length}</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
              >
                {c.label} <span>{count(c.id)}</span>
              </button>
            ))}
          </div>
          <div className="g-find">
            <label className="sr" htmlFor="q">
              Search pieces
            </label>
            <input id="q" type="search" placeholder="Search pieces" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="empty">Nothing matches "{q}". Clear the search or pick another collection.</p>
        ) : (
          <div className="grid">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onSelect} />
            ))}
          </div>
        )}

        <footer className="g-foot">
          <div className="g-contact">
            <b>{BUSINESS.name}</b>
            <span>{BUSINESS.landmark}</span>
            {BUSINESS.otherLocation && <span>{BUSINESS.otherLocation}</span>}
            <a href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS.mapsQuery}`} target="_blank" rel="noopener noreferrer">{BUSINESS.location} · Get directions</a>
            {BUSINESS.phone && <a href={`tel:${BUSINESS.phone.replace(/[^+0-9]/g, '')}`}>Call {BUSINESS.phone}</a>}
            {BUSINESS.email && <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>}
            {(BUSINESS.facebookUrl || BUSINESS.instagramUrl || BUSINESS.tiktokUrl) && (
              <span className="socials">
                {BUSINESS.facebookUrl && (
                  <a href={BUSINESS.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={`Facebook: ${BUSINESS.facebook}`}>
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8c-.3 0-1.3-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.2v2.7H7.6v3.3h2.8V22h3.1z" /></svg>
                  </a>
                )}
                {BUSINESS.tiktokUrl && (
                  <a href={BUSINESS.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label={`TikTok: ${BUSINESS.tiktok}`}>
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M16.6 3c.3 2.3 1.6 3.7 3.9 3.9v3c-1.4.1-2.7-.3-3.9-1.1v5.5c0 3.5-2.4 5.7-5.4 5.7-3 0-5.4-2.4-5.4-5.4 0-3.3 2.8-5.8 6.2-5.3v3.1c-1.7-.5-3.2.6-3.2 2.2 0 1.3 1 2.3 2.3 2.3 1.4 0 2.3-1 2.3-2.5V3h3.2z" /></svg>
                  </a>
                )}
                {BUSINESS.instagramUrl && (
                  <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${BUSINESS.instagram}`}>
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" /></svg>
                  </a>
                )}
              </span>
            )}
            {BUSINESS.salesText && <span>{BUSINESS.salesText}</span>}
            {BUSINESS.hours && <span>{BUSINESS.hours}</span>}
          </div>
          <a className="wa" href={whatsappLink(null)} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
        </footer>
      </div>
    </main>
  );
}

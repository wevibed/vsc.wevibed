import { GALLERY_PRODUCTS } from '../data/galleryProducts.js';

export default function Landing({ go }) {
  return (
    <section className="intro" aria-label="Welcome">
      <div className="intro-in">
        <h1>VSC Interiors</h1>
        <p>Recliner and lounge suites, corner couches and office furniture in Harare.</p>
        <div className="choices">
          <button className="cta" type="button" onClick={() => go('showroom')}>
            Enter the showroom
          </button>
          <button className="cta ghost" type="button" onClick={() => go('gallery')}>
            Browse the gallery <span className="count">{GALLERY_PRODUCTS.length} products</span>
          </button>
        </div>
        <small>A concept demo of a VSC Interiors catalogue, not the official site. Open a piece to see a 3D preview and its listed price.</small>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { BUSINESS, DEMO_NOTICE, SHOW_PRICES } from '../config.js';
import { formatPrice, whatsappLink } from '../lib/format.js';
import useThumb from './useThumb.js';
import ModelPreview from './ModelPreview.jsx';

function Picture({ product }) {
  const img = useThumb(product);
  return <div className="p-img">{img && <img src={img} alt={product.name} loading="eager" decoding="async" fetchPriority="high" />}</div>;
}

export default function ProductPanel({ product, inGallery, onClose, onPrev, onNext, onViewInShowroom }) {
  const title = useRef(null);
  const [modelSelection, setModelSelection] = useState({ id: null, enabled: false });
  const showModel = !!product && modelSelection.id === product.id && modelSelection.enabled;
  const open = !!product;
  const selectPhoto = () => setModelSelection({ id: product?.id ?? null, enabled: false });
  const selectModel = () => setModelSelection({ id: product?.id ?? null, enabled: true });

  useEffect(() => {
    setModelSelection({ id: product?.id ?? null, enabled: false });
  }, [product?.id]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const id = product ? product.id : null;
  useEffect(() => {
    if (id && inGallery && title.current) title.current.focus();
  }, [id, inGallery]);

  return (
    <>
      {inGallery && <div className={'scrim' + (open ? ' open' : '')} onClick={onClose} aria-hidden="true" />}
      <aside className={'panel' + (open ? ' open' : '')} aria-label="Product details" aria-hidden={!open}>
        {product && (
          <>
            <div className="p-head">
              <span className="p-cat">{product.categoryLabel}</span>
              <button className="x" type="button" onClick={onClose} aria-label="Close product details">
                &times;
              </button>
            </div>
            {inGallery && (
              <>
                {!showModel && <Picture product={product} />}
                {showModel && <ModelPreview product={product} />}
                {product.model && product.photo && (
                  <div className="p-view-toggle" role="group" aria-label="Choose product view">
                    <button type="button" aria-pressed={!showModel} onClick={selectPhoto}>Photo</button>
                    <button type="button" aria-pressed={showModel} onClick={selectModel}>3D concept</button>
                  </div>
                )}
              </>
            )}
            <h2 ref={title} tabIndex={-1}>
              {product.name}
            </h2>
            {SHOW_PRICES && product.price != null && (
              <p className="p-price">
                {formatPrice(product.price)} {product.was != null && <s>{formatPrice(product.was)}</s>} <span>USD, listed price, unconfirmed</span>
              </p>
            )}
            {SHOW_PRICES && product.price == null && (
              <p className="p-price"><span>Message us on WhatsApp for the price</span></p>
            )}
            <p className="d">{product.description}</p>
                        {product.details.length > 0 && (
              <dl className="specs">
                {product.details.map(([k, v]) => (
                  <div key={k} className="row">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {DEMO_NOTICE && (inGallery ? showModel || !product.photo : true) && (
              <div className="demo">
                <i />
                <span>{DEMO_NOTICE}</span>
              </div>
            )}
            {BUSINESS.deliveryText && <p className="d small">{BUSINESS.deliveryText}</p>}
            <div className="acts">
              <button className="nv" type="button" onClick={onPrev} aria-label="Previous piece">
                &lsaquo;
              </button>
              <a className="wa" href={whatsappLink(product)} target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
              <button className="nv" type="button" onClick={onNext} aria-label="Next piece">
                &rsaquo;
              </button>
            </div>
            {onViewInShowroom && (
              <button className="link" type="button" onClick={onViewInShowroom}>
                See it in the showroom
              </button>
            )}
          </>
        )}
      </aside>
    </>
  );
}

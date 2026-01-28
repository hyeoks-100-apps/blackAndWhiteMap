import { useEffect, useState } from 'react';
import { Restaurant } from '../types';

interface DetailDrawerProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  labels: {
    top7: string;
    season: (season: number) => string;
    team: (team: Restaurant['chef']['team']) => string;
    close: string;
    address: string;
    category: string;
    tags: string;
    instagram: string;
    updated: string;
    copy: string;
    copied: string;
    naverBooking: string;
    naverPlace: string;
    shareLink: string;
    directions: string;
    call: string;
  };
}

const buildGoogleMapsLink = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

const buildShareUrl = (id: string) => {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.hash = `#/${encodeURIComponent(id)}`;
  return url.toString();
};

export function DetailDrawer({ restaurant, onClose, labels }: DetailDrawerProps) {
  const [copied, setCopied] = useState<'address' | 'link' | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 1200);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!restaurant) return null;

  const { chef, restaurant: info, tags, updatedAt } = restaurant;
  const shareUrl = buildShareUrl(restaurant.id);

  const handleCopy = async (text: string, type: 'address' | 'link') => {
    if (!navigator?.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="detail detail-highlight">
      <div className="detail-header">
        <div>
          <h2>{info.name}</h2>
          <p className="muted">{chef.name}</p>
          <div className="badges">
            {chef.isTop7 && <span className="badge primary">{labels.top7}</span>}
            {chef.season && <span className="badge">{labels.season(chef.season)}</span>}
            <span className={`badge team ${chef.team}`}>{labels.team(chef.team)}</span>
          </div>
        </div>
        <button className="link-btn" onClick={onClose} aria-label={labels.close}>
          ✕
        </button>
      </div>

      <div className="detail-body">
        <div className="info-row">
          <span className="label">{labels.address}</span>
          <div className="info-value">
            <span>{info.address}</span>
            {navigator?.clipboard && (
              <button className="pill" onClick={() => handleCopy(info.address, 'address')} aria-live="polite">
                {copied === 'address' ? labels.copied : labels.copy}
              </button>
            )}
          </div>
        </div>

        {info.category && info.category.length > 0 && (
          <div className="info-row">
            <span className="label">{labels.category}</span>
            <div className="badges">
              {info.category.map((cat) => (
                <span key={cat} className="badge muted">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="info-row">
            <span className="label">{labels.tags}</span>
            <div className="badges">
              {tags.map((tag) => (
                <span key={tag} className="badge muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {info.instagram && (
          <div className="info-row">
            <span className="label">{labels.instagram}</span>
            <a className="link" href={info.instagram} target="_blank" rel="noreferrer noopener">
              {info.instagram}
            </a>
          </div>
        )}

        {updatedAt && (
          <div className="info-row">
            <span className="label">{labels.updated}</span>
            <span className="muted">{updatedAt}</span>
          </div>
        )}
      </div>

      <div className="actions">
        {info.naverBookingUrl && (
          <a className="button primary" href={info.naverBookingUrl} target="_blank" rel="noreferrer noopener">
            {labels.naverBooking}
          </a>
        )}
        {info.naverPlaceUrl && (
          <a className="button" href={info.naverPlaceUrl} target="_blank" rel="noreferrer noopener">
            {labels.naverPlace}
          </a>
        )}
        {navigator?.clipboard && (
          <button className="button" type="button" onClick={() => handleCopy(shareUrl, 'link')}>
            {labels.shareLink}
          </button>
        )}
        <a className="button" href={buildGoogleMapsLink(info.lat, info.lng)} target="_blank" rel="noreferrer noopener">
          {labels.directions}
        </a>
        {info.phone && (
          <a className="button" href={`tel:${info.phone}`}>
            {labels.call}
          </a>
        )}
      </div>
    </aside>
  );
}

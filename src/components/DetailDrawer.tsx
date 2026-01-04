import { useEffect, useState } from 'react';
import { Restaurant } from '../types';

interface DetailDrawerProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

const buildGoogleMapsLink = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

const buildShareUrl = (id: string) => {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.hash = `#/${encodeURIComponent(id)}`;
  return url.toString();
};

export function DetailDrawer({ restaurant, onClose }: DetailDrawerProps) {
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
    <aside className="detail">
      <div className="detail-header">
        <div>
          <h2>{info.name}</h2>
          <p className="muted">{chef.name}</p>
          <div className="badges">
            {chef.isTop7 && <span className="badge primary">TOP7</span>}
            {chef.season && <span className="badge">시즌 {chef.season}</span>}
            <span className={`badge team ${chef.team}`}>팀 {chef.team}</span>
          </div>
        </div>
        <button className="link-btn" onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>

      <div className="detail-body">
        <div className="info-row">
          <span className="label">주소</span>
          <div className="info-value">
            <span>{info.address}</span>
            {navigator?.clipboard && (
              <button className="pill" onClick={() => handleCopy(info.address, 'address')} aria-live="polite">
                {copied === 'address' ? '복사됨' : '복사'}
              </button>
            )}
          </div>
        </div>

        {info.category && info.category.length > 0 && (
          <div className="info-row">
            <span className="label">카테고리</span>
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
            <span className="label">태그</span>
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
            <span className="label">인스타그램</span>
            <a className="link" href={info.instagram} target="_blank" rel="noreferrer noopener">
              {info.instagram}
            </a>
          </div>
        )}

        {updatedAt && (
          <div className="info-row">
            <span className="label">업데이트</span>
            <span className="muted">{updatedAt}</span>
          </div>
        )}
      </div>

      <div className="actions">
        {info.naverBookingUrl && (
          <a className="button primary" href={info.naverBookingUrl} target="_blank" rel="noreferrer noopener">
            네이버 예약
          </a>
        )}
        {info.naverPlaceUrl && (
          <a className="button" href={info.naverPlaceUrl} target="_blank" rel="noreferrer noopener">
            네이버 플레이스
          </a>
        )}
        {navigator?.clipboard && (
          <button className="button" type="button" onClick={() => handleCopy(shareUrl, 'link')}>
            링크 복사
          </button>
        )}
        <a className="button" href={buildGoogleMapsLink(info.lat, info.lng)} target="_blank" rel="noreferrer noopener">
          길찾기 (Google)
        </a>
        {info.phone && (
          <a className="button" href={`tel:${info.phone}`}>
            전화하기
          </a>
        )}
      </div>
    </aside>
  );
}

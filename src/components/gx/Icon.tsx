/**
 * @license
 * DeSiaVe Icon Component with Resilient Asset & SVG Fallbacks
 */

import React, { useState } from 'react';
import {
  Coins,
  Flame,
  Gift,
  Trophy,
  Zap,
  Gamepad2,
  FileText,
  Wallet,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  User,
  CheckCircle2,
  Lock,
  Compass,
} from 'lucide-react';
import { getAssetUrl } from '../../lib/assets';

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
  alt?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6', size, alt = 'icon' }) => {
  const [imageError, setImageError] = useState(false);
  const assetSrc = getAssetUrl(name);

  // If image loaded cleanly and not flagged with error
  if (assetSrc && !imageError) {
    return (
      <img
        src={assetSrc}
        alt={alt}
        className={`object-contain ${className}`}
        style={size ? { width: size, height: size } : undefined}
        onError={() => setImageError(true)}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  // Fallback vector icon based on name
  const iconProps = {
    className: `${className} shrink-0`,
    style: size ? { width: size, height: size } : undefined,
  };

  switch (name.toLowerCase()) {
    case 'coin':
    case 'hcoin':
    case 'coins':
      return <Coins {...iconProps} className={`${iconProps.className} text-amber-400`} />;
    case 'hfire':
    case 'fire':
    case 'flame':
      return <Flame {...iconProps} className={`${iconProps.className} text-rose-500`} />;
    case 'chest':
    case 'gift':
    case 'gift2':
    case 'hgift':
      return <Gift {...iconProps} className={`${iconProps.className} text-amber-400`} />;
    case 'hlvl':
    case 'trophy':
    case 'rank':
      return <Trophy {...iconProps} className={`${iconProps.className} text-yellow-400`} />;
    case 'life':
    case 'energy':
    case 'zap':
      return <Zap {...iconProps} className={`${iconProps.className} text-cyan-400`} />;
    case 'gaming':
    case 'pv_cpx':
    case 'pv_pub':
      return <Gamepad2 {...iconProps} className={`${iconProps.className} text-purple-400`} />;
    case 'survey':
    case 'pv_ot':
      return <FileText {...iconProps} className={`${iconProps.className} text-blue-400`} />;
    case 'hwal':
    case 'wallet':
    case 'money':
      return <Wallet {...iconProps} className={`${iconProps.className} text-emerald-400`} />;
    case 'user':
    case 'avatar':
    case 'avatar2':
      return <User {...iconProps} className={`${iconProps.className} text-slate-300`} />;
    case 'completed':
    case 'check':
      return <CheckCircle2 {...iconProps} className={`${iconProps.className} text-emerald-400`} />;
    case 'lock':
      return <Lock {...iconProps} className={`${iconProps.className} text-slate-500`} />;
    case 'sparkles':
    case 'bonus':
      return <Sparkles {...iconProps} className={`${iconProps.className} text-amber-300`} />;
    case 'trending':
      return <TrendingUp {...iconProps} className={`${iconProps.className} text-emerald-400`} />;
    default:
      return <Compass {...iconProps} className={`${iconProps.className} text-slate-400`} />;
  }
};

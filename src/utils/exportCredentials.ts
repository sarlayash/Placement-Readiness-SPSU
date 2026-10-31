import { jsPDF } from 'jspdf';
import { DailyBadge, GoogleUser, UserProgress } from '../types';
import { generateOfficialCertificateId } from './storage';

/**
 * Safe multi-line text wrapper for HTML5 2D Canvas
 */
function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

/**
 * Generates an uncropped 1000x1000 Canvas of a Daily Honor Badge
 * Strictly Navy Blue & White Theme — Powered by SPSU Udaipur Mentorship By Kapil
 * Signatory: ONLY Kapil (no fake people as signatories)
 */
export function renderBadgeCanvas(
  badge: DailyBadge,
  user: GoogleUser | null,
  unlockedTimestamp?: string
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const width = canvas.width;
  const height = canvas.height;
  const isUnlocked = Boolean(unlockedTimestamp);

  // 1. Crisp White Background with Navy Blue Frame
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Outer Deep Navy Blue Border
  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 24;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  // Inner Royal Navy Double Line
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Top Navy Header Banner
  ctx.fillStyle = '#0A192F';
  ctx.fillRect(48, 48, width - 96, 115);

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = '800 22px "Inter", sans-serif';
  ctx.fillText('SPSU UDAIPUR • MENTORSHIP BY KAPIL', width / 2, 95);

  ctx.fillStyle = '#BFDBFE';
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText('10-DAY PLACEMENT & TECHNICAL ASSESSMENT ARCHITECTURE (30% THEORY | 70% PRACTICAL)', width / 2, 130);

  // Central Navy Blue Medallion Shield
  const centerX = width / 2;
  const centerY = 365;
  const outerRadius = 145;

  // Outer Medallion Ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
  ctx.fillStyle = isUnlocked ? '#0A192F' : '#475569';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = isUnlocked ? '#1E3A8A' : '#94A3B8';
  ctx.stroke();

  // Inner Dashed White Ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius - 18, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Day Number Emblem inside Shield
  ctx.fillStyle = '#BFDBFE';
  ctx.font = '800 22px "JetBrains Mono", monospace';
  ctx.fillText(`DAY ${badge.day} OF 10`, centerX, centerY - 45);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 68px "Inter", sans-serif';
  ctx.fillText(`D${badge.day}`, centerX, centerY + 22);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.fillText(isUnlocked ? 'VERIFIED HONOR' : 'LOCKED BADGE', centerX, centerY + 65);

  // Module Pill Tag
  const pillW = 460;
  const pillH = 42;
  ctx.fillStyle = '#EFF6FF';
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect((width - pillW) / 2, 540, pillW, pillH, 21);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0A192F';
  ctx.font = '800 17px "Inter", sans-serif';
  ctx.fillText(badge.moduleRef.toUpperCase(), centerX, 567);

  // Badge Title
  ctx.fillStyle = '#0A192F';
  ctx.font = '900 40px "Inter", sans-serif';
  ctx.fillText(badge.title, centerX, 635);

  // Badge Subtitle
  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 22px "Inter", sans-serif';
  ctx.fillText(badge.subtitle, centerX, 675);

  // Criteria Description
  ctx.fillStyle = '#334155';
  ctx.font = '500 18px "Inter", sans-serif';
  wrapCanvasText(ctx, badge.criteria, centerX, 720, 780, 26);

  // Divider Line
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 795);
  ctx.lineTo(width - 100, 795);
  ctx.stroke();

  // Left Footer: Learner Info
  ctx.textAlign = 'left';
  ctx.fillStyle = '#475569';
  ctx.font = '700 14px "Inter", sans-serif';
  ctx.fillText('AWARDED TO LEARNER (GOOGLE VERIFIED):', 100, 835);

  ctx.fillStyle = '#0A192F';
  ctx.font = '800 24px "Inter", sans-serif';
  ctx.fillText(user ? user.name : 'Unauthenticated Learner', 100, 868);

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText(user ? user.email : 'Sign in with Google to verify', 100, 895);

  const dateStr = unlockedTimestamp
    ? new Date(unlockedTimestamp).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Pending Completion';
  ctx.fillStyle = '#64748B';
  ctx.font = '600 14px "Inter", sans-serif';
  ctx.fillText(`Status: ${isUnlocked ? `Earned on ${dateStr}` : 'In Progress'}`, 100, 922);

  // Right Footer: Sole Signatory — Kapil (No fake signatories)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#0A192F';
  ctx.font = 'italic bold 36px Georgia, serif';
  ctx.fillText('Kapil', width - 100, 855);

  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width - 320, 868);
  ctx.lineTo(width - 100, 868);
  ctx.stroke();

  ctx.fillStyle = '#0A192F';
  ctx.font = '800 18px "Inter", sans-serif';
  ctx.fillText('Kapil', width - 100, 894);

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '600 14px "Inter", sans-serif';
  ctx.fillText('SPSU Udaipur Mentorship By Kapil', width - 100, 916);

  return canvas;
}

/**
 * Download Daily Badge as high-res PNG (1000x1000)
 */
export function downloadBadgePNG(
  badge: DailyBadge,
  user: GoogleUser | null,
  unlockedTimestamp?: string
): void {
  const canvas = renderBadgeCanvas(badge, user, unlockedTimestamp);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const safeTitle = badge.title.replace(/[^a-zA-Z0-9]/g, '_');
  link.download = `SPSU_Kapil_Day${badge.day}_Badge_${safeTitle}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download Daily Badge as vector PDF (1000x1000 pt)
 */
export function downloadBadgePDF(
  badge: DailyBadge,
  user: GoogleUser | null,
  unlockedTimestamp?: string
): void {
  const canvas = renderBadgeCanvas(badge, user, unlockedTimestamp);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: [1000, 1000],
  });
  pdf.addImage(dataUrl, 'PNG', 0, 0, 1000, 1000, undefined, 'FAST');
  const safeTitle = badge.title.replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(`SPSU_Kapil_Day${badge.day}_Badge_${safeTitle}.pdf`);
}

/**
 * Generates an uncropped 1920x1080 Navy Blue & White Certificate Canvas
 * Strictly powered by SPSU Udaipur Mentorship By Kapil
 * Sole Signatory: Kapil (Zero fake people as signatories)
 */
export function renderCertificateCanvas(
  user: GoogleUser,
  progress: UserProgress,
  totalBadgesUnlocked: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const width = canvas.width;
  const height = canvas.height;

  // 1. Crisp White Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // 2. Deep Navy Blue Outer Architectural Border
  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 18;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Inner Royal Navy Precision Border
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 4;
  ctx.strokeRect(62, 62, width - 124, height - 124);

  // Corner Navy Squares
  const corners = [
    [62, 62],
    [width - 86, 62],
    [62, height - 86],
    [width - 86, height - 86],
  ];
  ctx.fillStyle = '#0A192F';
  corners.forEach(([cx, cy]) => {
    ctx.fillRect(cx, cy, 24, 24);
  });

  // 3. Subtle Clean Watermark (Ultra-light to prevent text bleed)
  ctx.save();
  ctx.translate(width / 2, height / 2 - 20);
  ctx.font = '900 130px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(10, 25, 47, 0.012)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SPSU • KAPIL', 0, 0);
  ctx.restore();

  // 4. Top Navy Header Banner Pill
  const pillW = 860;
  const pillH = 52;
  const pillX = (width - pillW) / 2;
  const pillY = 105;
  ctx.fillStyle = '#0A192F';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 26);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = '800 20px "Inter", sans-serif';
  ctx.fillText(
    'SPSU UDAIPUR • MENTORSHIP BY KAPIL • 10-DAY INTENSIVE CURRICULUM',
    width / 2,
    pillY + 33
  );

  // 5. Certificate Main Heading
  ctx.fillStyle = '#0A192F';
  ctx.font = '800 58px "Cinzel", Georgia, serif';
  ctx.fillText('CERTIFICATE OF TECHNICAL MASTERY', width / 2, 235);

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 22px "Inter", sans-serif';
  ctx.fillText(
    'Powered by Kapil • 30% Conceptual Theory & 70% Practical IDE Execution across C, C++, Java & Python',
    width / 2,
    280
  );

  // Navy Divider Line
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 380, 310);
  ctx.lineTo(width / 2 + 380, 310);
  ctx.stroke();

  // 6. Recipient Presentation
  ctx.fillStyle = '#475569';
  ctx.font = '700 20px "Inter", sans-serif';
  ctx.fillText('THIS OFFICIAL CREDENTIAL IS PROUDLY PRESENTED TO', width / 2, 365);

  // Learner Name
  ctx.fillStyle = '#0A192F';
  ctx.font = '900 56px "Inter", sans-serif';
  ctx.fillText(user.name, width / 2, 440);

  // Underline
  const nameWidth = Math.max(400, ctx.measureText(user.name).width + 80);
  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo((width - nameWidth) / 2, 460);
  ctx.lineTo((width + nameWidth) / 2, 460);
  ctx.stroke();

  // Authenticated Google Email
  ctx.fillStyle = '#1E3A8A';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText(`Verified Google Account: ${user.email}`, width / 2, 498);

  // 7. Curriculum Citation Body
  ctx.fillStyle = '#1E293B';
  ctx.font = '500 22px "Inter", sans-serif';
  const citation =
    'for successfully completing the 10-Day Placement & Software Engineering Assessment Curriculum covering all 11 Core Modules: (1) Programming Fundamentals, (2) Data Structures & Algorithms, (3) Company-oriented Coding Lab, (4) SQL & Database Systems, (5) Object-Oriented Programming, (6) Operating Systems, (7) Computer Networks, (8) Software Engineering & Developer Tools, (9) Development & Project Readiness, (10) AI-assisted Software Development, and (11) Technical Interview Preparation, with daily Pre-Assessments, Post-Assessments, and Hands-on IDE verification.';
  wrapCanvasText(ctx, citation, width / 2, 555, 1480, 36);

  // 8. Bottom Verification & Sole Signatory Section
  const dividerY = 760;
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(130, dividerY);
  ctx.lineTo(width - 130, dividerY);
  ctx.stroke();

  const certId = progress.certificateId || generateOfficialCertificateId(user.email);
  const issueDate = progress.certificateIssuedAt
    ? new Date(progress.certificateIssuedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  // Left Column: Real User Audit Metrics (No fake stats)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#475569';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.fillText('DATE OF ISSUANCE:', 140, 810);
  ctx.fillStyle = '#0A192F';
  ctx.font = '800 22px "Inter", sans-serif';
  ctx.fillText(issueDate, 140, 840);

  ctx.fillStyle = '#475569';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.fillText('CREDENTIAL ID:', 140, 885);
  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText(certId, 140, 915);

  ctx.fillStyle = '#0A192F';
  ctx.font = '700 16px "Inter", sans-serif';
  ctx.fillText(
    `VERIFIED PROGRESS: ${totalBadgesUnlocked} / 10 Daily Badges Unlocked • ${progress.completedChallengeIds?.length || 0} Practical Labs Solved`,
    140,
    955
  );

  // Center Column: Official Navy Blue Seal
  const sealX = width / 2;
  const sealY = 880;
  const sealR = 78;

  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.fillStyle = '#0A192F';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#1E3A8A';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 12, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#BFDBFE';
  ctx.font = '800 14px "Inter", sans-serif';
  ctx.fillText('SPSU UDAIPUR', sealX, sealY - 22);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 22px "Inter", sans-serif';
  ctx.fillText('KAPIL', sealX, sealY + 6);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillText('VERIFIED SEAL', sealX, sealY + 32);

  // Right Column: Sole Signatory — Placement Mentor Kapil (Independent Technical Mentor)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1E3A8A';
  ctx.font = 'italic bold 44px Georgia, serif';
  ctx.fillText('Mentor Kapil', width - 140, 842);

  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width - 440, 865);
  ctx.lineTo(width - 140, 865);
  ctx.stroke();

  ctx.fillStyle = '#0A192F';
  ctx.font = '900 20px "Inter", sans-serif';
  ctx.fillText('PLACEMENT MENTOR – KAPIL', width - 140, 896);

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.fillText('Placement Mentor (Independent Technical Mentor)', width - 140, 922);

  ctx.fillStyle = '#475569';
  ctx.font = '600 14px "Inter", sans-serif';
  ctx.fillText('SPSU Udaipur Placement Readiness Boot Camp', width - 140, 946);

  return canvas;
}

/**
 * Download Certificate as uncropped 1920x1080 PNG
 */
export function downloadCertificatePNG(
  user: GoogleUser,
  progress: UserProgress,
  totalBadgesUnlocked: number
): void {
  const canvas = renderCertificateCanvas(user, progress, totalBadgesUnlocked);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const safeName = user.name.replace(/[^a-zA-Z0-9]/g, '_');
  link.download = `SPSU_Kapil_Certificate_${safeName}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download Certificate as uncropped 1920x1080 Landscape PDF
 */
export function downloadCertificatePDF(
  user: GoogleUser,
  progress: UserProgress,
  totalBadgesUnlocked: number
): void {
  const canvas = renderCertificateCanvas(user, progress, totalBadgesUnlocked);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [1920, 1080],
  });
  pdf.addImage(dataUrl, 'PNG', 0, 0, 1920, 1080, undefined, 'FAST');
  const safeName = user.name.replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(`SPSU_Kapil_Certificate_${safeName}.pdf`);
}

/**
 * Generates an uncropped 1000x1000 Canvas of the Special Edition System Design Architect Badge
 * Deep Navy Blue & Gold Theme — Powered by SPSU Udaipur Mentorship By Kapil
 * Sole Signatory: Placement Mentor Kapil
 */
export function renderSystemDesignBadgeCanvas(
  user: GoogleUser | null,
  score: number = 100,
  unlockedTimestamp?: string
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const width = canvas.width;
  const height = canvas.height;
  const isUnlocked = Boolean(unlockedTimestamp);

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Outer Border: Deep Navy
  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 24;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  // Inner Border: Regal Gold
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 6;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Header Banner
  ctx.fillStyle = '#0A192F';
  ctx.fillRect(48, 48, width - 96, 120);

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = '800 24px "Inter", sans-serif';
  ctx.fillText('SPSU UDAIPUR • MENTORSHIP BY KAPIL', width / 2, 95);

  ctx.fillStyle = '#FBBF24';
  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.fillText('SPECIAL EDITION: DISTRIBUTED SYSTEM DESIGN ARCHITECT', width / 2, 132);

  // Medallion
  const centerX = width / 2;
  const centerY = 370;
  const outerRadius = 150;

  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
  ctx.fillStyle = isUnlocked ? '#0A192F' : '#334155';
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = isUnlocked ? '#D97706' : '#94A3B8';
  ctx.stroke();

  // Inner Star / Gear Ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius - 18, 0, Math.PI * 2);
  ctx.strokeStyle = '#FBBF24';
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Medallion Text
  ctx.fillStyle = '#FBBF24';
  ctx.font = '800 18px "Inter", sans-serif';
  ctx.fillText('SPECIAL EDITION', centerX, centerY - 60);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 48px "Inter", sans-serif';
  ctx.fillText('HLD / LLD', centerX, centerY - 5);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillText('GMAIL ARCHITECT', centerX, centerY + 35);

  ctx.fillStyle = '#34D399';
  ctx.font = '800 18px "Inter", sans-serif';
  ctx.fillText(isUnlocked ? `SCORE: ${score}% (>=80% PASS)` : 'LOCKED', centerX, centerY + 70);

  // Badge Title & Description
  ctx.fillStyle = '#0A192F';
  ctx.font = '900 32px "Inter", sans-serif';
  ctx.fillText('SYSTEM DESIGN ARCHITECT', width / 2, 570);

  ctx.fillStyle = '#D97706';
  ctx.font = '700 18px "Inter", sans-serif';
  ctx.fillText('Gmail Case Study • Postman Lab • 120-Assessment Mastery', width / 2, 605);

  ctx.fillStyle = '#334155';
  ctx.font = '500 16px "Inter", sans-serif';
  const desc =
    'Conferred for mastering High-Level & Low-Level Design, Microservices, DNS, Anycast, Layer 4/7 Load Balancing, Redis Caching, Sharding, Undo Send queues, and cracking the 60-Minute 120-Question Placement Assessment with >= 80% score.';
  wrapCanvasText(ctx, desc, width / 2, 645, 820, 26);

  // Recipient Box
  const boxY = 740;
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(80, boxY, width - 160, 95);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, boxY, width - 160, 95);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#64748B';
  ctx.font = '700 13px "Inter", sans-serif';
  ctx.fillText('VERIFIED LEARNER:', 105, boxY + 30);

  ctx.fillStyle = '#0A192F';
  ctx.font = '800 22px "Inter", sans-serif';
  ctx.fillText(user?.name || 'Authorized SPSU Learner', 105, boxY + 60);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#64748B';
  ctx.font = '700 13px "Inter", sans-serif';
  ctx.fillText('ISSUANCE & STATUS:', width - 105, boxY + 30);

  ctx.fillStyle = '#059669';
  ctx.font = '800 18px "JetBrains Mono", monospace';
  const unlockDateStr = unlockedTimestamp
    ? new Date(unlockedTimestamp).toLocaleDateString('en-IN')
    : new Date().toLocaleDateString('en-IN');
  ctx.fillText(`VERIFIED PASS • ${unlockDateStr}`, width - 105, boxY + 60);

  // Signatory: Placement Mentor Kapil
  const sigY = 885;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1E3A8A';
  ctx.font = 'italic bold 36px Georgia, serif';
  ctx.fillText('Mentor Kapil', width / 2, sigY);

  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 160, sigY + 12);
  ctx.lineTo(width / 2 + 160, sigY + 12);
  ctx.stroke();

  ctx.fillStyle = '#0A192F';
  ctx.font = '900 16px "Inter", sans-serif';
  ctx.fillText('PLACEMENT MENTOR – KAPIL', width / 2, sigY + 34);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 13px "Inter", sans-serif';
  ctx.fillText('Sole Official Signatory • SPSU Udaipur Placement Readiness Boot Camp', width / 2, sigY + 54);

  return canvas;
}

export function downloadSystemDesignBadgePNG(
  user: GoogleUser | null,
  score: number = 100,
  unlockedTimestamp?: string
): void {
  const canvas = renderSystemDesignBadgeCanvas(user, score, unlockedTimestamp);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const safeName = (user?.name || 'Learner').replace(/[^a-zA-Z0-9]/g, '_');
  link.download = `SPSU_System_Design_Architect_Badge_${safeName}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadSystemDesignBadgePDF(
  user: GoogleUser | null,
  score: number = 100,
  unlockedTimestamp?: string
): void {
  const canvas = renderSystemDesignBadgeCanvas(user, score, unlockedTimestamp);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: [1000, 1000],
  });
  pdf.addImage(dataUrl, 'PNG', 0, 0, 1000, 1000, undefined, 'FAST');
  const safeName = (user?.name || 'Learner').replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(`SPSU_System_Design_Architect_Badge_${safeName}.pdf`);
}

/**
 * Generates an uncropped 1920x1080 Landscape Canvas of the Special Edition System Design Certificate
 */
export function renderSystemDesignCertificateCanvas(
  user: GoogleUser,
  score: number = 100,
  correctCount: number = 96,
  issuedTimestamp?: string
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const width = canvas.width;
  const height = canvas.height;

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Outer Border: Deep Navy Blue
  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 32;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // Inner Gold Filigree Line
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 6;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  // Header Pill
  const pillW = 960;
  const pillH = 54;
  const pillX = (width - pillW) / 2;
  const pillY = 95;
  ctx.fillStyle = '#0A192F';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 27);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = '800 20px "Inter", sans-serif';
  ctx.fillText(
    'SPSU UDAIPUR • MENTORSHIP BY KAPIL • SPECIAL EDITION CREDENTIAL',
    width / 2,
    pillY + 34
  );

  // Certificate Heading
  ctx.fillStyle = '#0A192F';
  ctx.font = '800 52px "Cinzel", Georgia, serif';
  ctx.fillText('CERTIFIED SYSTEM DESIGN ARCHITECT', width / 2, 225);

  ctx.fillStyle = '#D97706';
  ctx.font = '700 22px "Inter", sans-serif';
  ctx.fillText(
    'High-Level & Low-Level Architecture • Gmail End-to-End Case Study • Postman Lab • 120-MCQ Mastery',
    width / 2,
    270
  );

  // Divider
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 400, 298);
  ctx.lineTo(width / 2 + 400, 298);
  ctx.stroke();

  // Recipient Presentation
  ctx.fillStyle = '#475569';
  ctx.font = '700 20px "Inter", sans-serif';
  ctx.fillText('THIS PRESTIGIOUS CREDENTIAL IS PROUDLY CONFERRED UPON', width / 2, 350);

  ctx.fillStyle = '#0A192F';
  ctx.font = '900 56px "Inter", sans-serif';
  ctx.fillText(user.name, width / 2, 425);

  const nameWidth = Math.max(400, ctx.measureText(user.name).width + 80);
  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo((width - nameWidth) / 2, 445);
  ctx.lineTo((width + nameWidth) / 2, 445);
  ctx.stroke();

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText(`Verified Google Identity: ${user.email}`, width / 2, 482);

  // Body Citation
  ctx.fillStyle = '#1E293B';
  ctx.font = '500 21px "Inter", sans-serif';
  const citation = `for outstanding technical excellence in the SPSU Placement Readiness System Design Special Edition Masterclass. The learner has demonstrated exceptional mastery over production outages (Instagram DNS, Meta BGP, WhatsApp queues, Twitter rate-limiting), Gmail end-to-end architecture (Anycast, GFE, Spanner, GCS blob storage, 30s Undo Send delay queue), Postman REST API testing, HTTP status codes (2xx, 3xx, 4xx, 5xx), Layer 4/7 load balancing, database sharding, Redis caching patterns, CI/CD zero-downtime deployments, and achieved a verified score of ${score}% (${correctCount}/120 correct) on the 60-Minute Comprehensive Assessment.`;
  wrapCanvasText(ctx, citation, width / 2, 535, 1460, 34);

  // Bottom Section
  const dividerY = 760;
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(130, dividerY);
  ctx.lineTo(width - 130, dividerY);
  ctx.stroke();

  const certId = `SPSU-SD-ARCH-${Math.abs(user.email.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).toUpperCase()}-2026`;
  const issueDate = issuedTimestamp
    ? new Date(issuedTimestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  // Left Details
  ctx.textAlign = 'left';
  ctx.fillStyle = '#475569';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.fillText('DATE OF CONFERRAL:', 140, 810);
  ctx.fillStyle = '#0A192F';
  ctx.font = '800 22px "Inter", sans-serif';
  ctx.fillText(issueDate, 140, 840);

  ctx.fillStyle = '#475569';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.fillText('CREDENTIAL ID:', 140, 885);
  ctx.fillStyle = '#D97706';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText(certId, 140, 915);

  ctx.fillStyle = '#0A192F';
  ctx.font = '700 16px "Inter", sans-serif';
  ctx.fillText(`ASSESSMENT SCORE: ${score}% • ${correctCount} / 120 MCQs Correct (Benchmark >= 80%)`, 140, 955);

  // Center Gold Seal
  const sealX = width / 2;
  const sealY = 880;
  const sealR = 80;

  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.fillStyle = '#0A192F';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#D97706';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 12, 0, Math.PI * 2);
  ctx.strokeStyle = '#FBBF24';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FBBF24';
  ctx.font = '800 14px "Inter", sans-serif';
  ctx.fillText('SYSTEM DESIGN', sealX, sealY - 22);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 24px "Inter", sans-serif';
  ctx.fillText('ARCHITECT', sealX, sealY + 6);

  ctx.fillStyle = '#34D399';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillText('VERIFIED 80%', sealX, sealY + 32);

  // Right Signatory: Placement Mentor Kapil
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1E3A8A';
  ctx.font = 'italic bold 44px Georgia, serif';
  ctx.fillText('Mentor Kapil', width - 140, 842);

  ctx.strokeStyle = '#0A192F';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width - 440, 865);
  ctx.lineTo(width - 140, 865);
  ctx.stroke();

  ctx.fillStyle = '#0A192F';
  ctx.font = '900 20px "Inter", sans-serif';
  ctx.fillText('PLACEMENT MENTOR – KAPIL', width - 140, 896);

  ctx.fillStyle = '#D97706';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.fillText('Placement Mentor (Independent Technical Mentor)', width - 140, 922);

  ctx.fillStyle = '#475569';
  ctx.font = '600 14px "Inter", sans-serif';
  ctx.fillText('SPSU Udaipur Placement Readiness Boot Camp', width - 140, 946);

  return canvas;
}

export function downloadSystemDesignCertificatePNG(
  user: GoogleUser,
  score: number = 100,
  correctCount: number = 96,
  issuedTimestamp?: string
): void {
  const canvas = renderSystemDesignCertificateCanvas(user, score, correctCount, issuedTimestamp);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const safeName = user.name.replace(/[^a-zA-Z0-9]/g, '_');
  link.download = `SPSU_System_Design_Certificate_${safeName}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadSystemDesignCertificatePDF(
  user: GoogleUser,
  score: number = 100,
  correctCount: number = 96,
  issuedTimestamp?: string
): void {
  const canvas = renderSystemDesignCertificateCanvas(user, score, correctCount, issuedTimestamp);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [1920, 1080],
  });
  pdf.addImage(dataUrl, 'PNG', 0, 0, 1920, 1080, undefined, 'FAST');
  const safeName = user.name.replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(`SPSU_System_Design_Certificate_${safeName}.pdf`);
}

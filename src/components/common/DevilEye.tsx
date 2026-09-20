import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { EyeColorPreset } from '../../types';

interface DevilEyeProps {
  size?: 'compact' | 'medium' | 'large' | 'custom';
  width?: number;
  height?: number;
  interactive?: boolean;
  overrideColor?: EyeColorPreset;
  className?: string;
}

export const DevilEye: React.FC<DevilEyeProps> = ({
  size = 'medium',
  width: customWidth,
  height: customHeight,
  interactive = true,
  overrideColor,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { eyeConfig } = useApp();
  const animationFrameRef = useRef<number | null>(null);

  // Determine pixel dimensions
  let w = 260;
  let h = 180;

  if (size === 'compact') {
    w = 64;
    h = 42;
  } else if (size === 'large') {
    w = 440;
    h = 280;
  } else if (size === 'custom' && customWidth && customHeight) {
    w = customWidth;
    h = customHeight;
  }

  // Animation & tracking state
  const stateRef = useRef({
    currentLookX: 0,
    currentLookY: 0,
    targetLookX: 0,
    targetLookY: 0,
    blinkProgress: 0, // 0 is open, 1 is closed
    blinkSpeed: 0,
    nextBlinkTime: Date.now() + 3500,
    pupilDilation: 1.0,
    pulseTime: 0,
    scanAngle: 0,
  });

  const activeColor = overrideColor || eyeConfig.colorMode;
  const hueShift = eyeConfig.hueShift;
  const animSpeed = eyeConfig.speed;
  const responseMode = eyeConfig.responseMode;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || responseMode === 'idle') return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp normalized look coordinates
      stateRef.current.targetLookX = Math.max(-1, Math.min(1, dx));
      stateRef.current.targetLookY = Math.max(-0.8, Math.min(0.8, dy));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, responseMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const getColorValues = (mode: EyeColorPreset) => {
      switch (mode) {
        case 'blue':
          return {
            primary: '#00E5FF',
            secondary: '#0066FF',
            glow: 'rgba(0, 229, 255, 0.9)',
            deep: '#001224',
            irisRing: '#70FFFF',
          };
        case 'green':
          return {
            primary: '#00FF66',
            secondary: '#009933',
            glow: 'rgba(0, 255, 102, 0.9)',
            deep: '#001a08',
            irisRing: '#88FFB0',
          };
        case 'purple':
          return {
            primary: '#B026FF',
            secondary: '#6600CC',
            glow: 'rgba(176, 38, 255, 0.9)',
            deep: '#190028',
            irisRing: '#E099FF',
          };
        case 'white':
          return {
            primary: '#F0F6FC',
            secondary: '#64748B',
            glow: 'rgba(240, 246, 252, 0.9)',
            deep: '#1E293B',
            irisRing: '#FFFFFF',
          };
        case 'red':
        default:
          return {
            // STRICT NEON RED AS REQUIRED
            primary: '#FF0033',
            secondary: '#E50914',
            glow: 'rgba(255, 0, 51, 0.95)',
            deep: '#1a0003',
            irisRing: '#FF3300',
          };
      }
    };

    const render = () => {
      const state = stateRef.current;
      const now = Date.now();

      // Look mode adjustments
      if (responseMode === 'scan') {
        state.scanAngle += 0.025 * animSpeed;
        state.targetLookX = Math.sin(state.scanAngle) * 0.7;
        state.targetLookY = Math.cos(state.scanAngle * 0.5) * 0.35;
      } else if (responseMode === 'pulse') {
        state.targetLookX = Math.sin(now * 0.001) * 0.15;
        state.targetLookY = 0;
      }

      state.currentLookX += (state.targetLookX - state.currentLookX) * 0.08 * animSpeed;
      state.currentLookY += (state.targetLookY - state.currentLookY) * 0.08 * animSpeed;
      state.pulseTime += 0.035 * animSpeed;

      // Handle Blinking
      if (now > state.nextBlinkTime && state.blinkProgress === 0) {
        state.blinkSpeed = 0.15;
      }
      if (state.blinkSpeed !== 0) {
        state.blinkProgress += state.blinkSpeed;
        if (state.blinkProgress >= 1) {
          state.blinkProgress = 1;
          state.blinkSpeed = -0.15;
        } else if (state.blinkProgress <= 0) {
          state.blinkProgress = 0;
          state.blinkSpeed = 0;
          state.nextBlinkTime = now + 4000 + Math.random() * 4000;
        }
      }

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      if (hueShift !== 0) {
        ctx.filter = `hue-rotate(${hueShift}deg)`;
      }

      const colors = getColorValues(activeColor);
      const centerX = w / 2;
      const centerY = h / 2;
      const eyeRadiusX = w * 0.46;
      const eyeRadiusY = h * 0.38;

      // 1. Draw outer socket almond shape
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX - eyeRadiusX, centerY);
      ctx.bezierCurveTo(
        centerX - eyeRadiusX * 0.5,
        centerY - eyeRadiusY * 1.25,
        centerX + eyeRadiusX * 0.5,
        centerY - eyeRadiusY * 1.25,
        centerX + eyeRadiusX,
        centerY
      );
      ctx.bezierCurveTo(
        centerX + eyeRadiusX * 0.5,
        centerY + eyeRadiusY * 1.25,
        centerX - eyeRadiusX * 0.5,
        centerY + eyeRadiusY * 1.25,
        centerX - eyeRadiusX,
        centerY
      );
      ctx.closePath();
      ctx.clip();

      // Sclera gradient (obsidian-black with intense crimson core)
      const scleraGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        eyeRadiusY * 0.15,
        centerX,
        centerY,
        eyeRadiusX
      );
      scleraGrad.addColorStop(0, colors.deep);
      scleraGrad.addColorStop(0.6, '#080002');
      scleraGrad.addColorStop(1, '#000000');

      ctx.fillStyle = scleraGrad;
      ctx.fill();

      // Organic vein fibrils in sclera
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.35;
      for (let i = 0; i < 14; i++) {
        const ang = (i / 14) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(ang) * (eyeRadiusX * 0.7),
          centerY + Math.sin(ang) * (eyeRadiusY * 0.7)
        );
        ctx.lineTo(
          centerX + Math.cos(ang) * (eyeRadiusX * 0.35) + Math.sin(i) * 5,
          centerY + Math.sin(ang) * (eyeRadiusY * 0.35) + Math.cos(i) * 5
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // 2. Iris rendering with gaze offset
      const maxOffset = eyeRadiusY * 0.35;
      const irisX = centerX + state.currentLookX * maxOffset;
      const irisY = centerY + state.currentLookY * (maxOffset * 0.7);
      const irisRadius = eyeRadiusY * 0.88;

      // Outer Iris Glow (Vivid Neon Red)
      const irisGlow = ctx.createRadialGradient(
        irisX,
        irisY,
        irisRadius * 0.15,
        irisX,
        irisY,
        irisRadius * 1.3
      );
      irisGlow.addColorStop(0, colors.primary);
      irisGlow.addColorStop(0.55, colors.secondary);
      irisGlow.addColorStop(0.85, colors.deep);
      irisGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = irisGlow;
      ctx.beginPath();
      ctx.arc(irisX, irisY, irisRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Iris Fiber rays
      const rayCount = 48;
      for (let r = 0; r < rayCount; r++) {
        const rayAngle = (r / rayCount) * Math.PI * 2 + state.pulseTime * 0.08;
        const rayLen = irisRadius * (0.65 + Math.sin(r * 3 + state.pulseTime) * 0.32);
        ctx.strokeStyle = r % 2 === 0 ? colors.irisRing : colors.primary;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.moveTo(irisX, irisY);
        ctx.lineTo(irisX + Math.cos(rayAngle) * rayLen, irisY + Math.sin(rayAngle) * rayLen);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Iris Outer Rings
      ctx.strokeStyle = colors.irisRing;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(irisX, irisY, irisRadius * 0.92, 0, Math.PI * 2);
      ctx.stroke();

      // Iris Inner Concentric Ring
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(
        irisX,
        irisY,
        irisRadius * (0.45 + Math.sin(state.pulseTime) * 0.04),
        0,
        Math.PI * 2
      );
      ctx.stroke();

      // 3. Demonic Sharp Black Vertical Slit Pupil
      const pulseFactor = 1.0 + Math.sin(state.pulseTime * 1.5) * 0.08;
      const pupilWidth = irisRadius * 0.2 * pulseFactor;
      const pupilHeight = irisRadius * 0.88;

      ctx.save();
      ctx.translate(irisX, irisY);
      ctx.beginPath();
      ctx.ellipse(0, 0, pupilWidth, pupilHeight, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Intense fiery red neon edge on pupil slit
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // Specular highlight / cornea reflection
      const highlightGrad = ctx.createRadialGradient(
        irisX - irisRadius * 0.28,
        irisY - irisRadius * 0.28,
        2,
        irisX - irisRadius * 0.28,
        irisY - irisRadius * 0.28,
        irisRadius * 0.32
      );
      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      highlightGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.35)');
      highlightGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = highlightGrad;
      ctx.beginPath();
      ctx.arc(irisX - irisRadius * 0.28, irisY - irisRadius * 0.28, irisRadius * 0.32, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // end clip

      // 4. Eyelids for Blinking
      if (state.blinkProgress > 0) {
        ctx.save();
        ctx.fillStyle = '#030303';
        const blinkH = eyeRadiusY * 1.4 * state.blinkProgress;

        // Top lid
        ctx.beginPath();
        ctx.rect(0, 0, w, centerY - eyeRadiusY + blinkH);
        ctx.fill();

        // Bottom lid
        ctx.beginPath();
        ctx.rect(0, centerY + eyeRadiusY - blinkH, w, h);
        ctx.fill();

        ctx.restore();
      }

      // 5. Outer Glowing Eyelid Trim
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX - eyeRadiusX, centerY);
      ctx.bezierCurveTo(
        centerX - eyeRadiusX * 0.5,
        centerY - eyeRadiusY * 1.25,
        centerX + eyeRadiusX * 0.5,
        centerY - eyeRadiusY * 1.25,
        centerX + eyeRadiusX,
        centerY
      );
      ctx.bezierCurveTo(
        centerX + eyeRadiusX * 0.5,
        centerY + eyeRadiusY * 1.25,
        centerX - eyeRadiusX * 0.5,
        centerY + eyeRadiusY * 1.25,
        centerX - eyeRadiusX,
        centerY
      );
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = size === 'compact' ? 1.5 : 2.5;
      ctx.shadowColor = colors.glow;
      ctx.shadowBlur = size === 'compact' ? 8 : 18;
      ctx.stroke();

      // Technical HUD brackets
      if (size !== 'compact') {
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 6;
        ctx.globalAlpha = 0.55;

        // Left bracket
        ctx.beginPath();
        ctx.moveTo(centerX - eyeRadiusX - 8, centerY - 14);
        ctx.lineTo(centerX - eyeRadiusX - 14, centerY);
        ctx.lineTo(centerX - eyeRadiusX - 8, centerY + 14);
        ctx.stroke();

        // Right bracket
        ctx.beginPath();
        ctx.moveTo(centerX + eyeRadiusX + 8, centerY - 14);
        ctx.lineTo(centerX + eyeRadiusX + 14, centerY);
        ctx.lineTo(centerX + eyeRadiusX + 8, centerY + 14);
        ctx.stroke();
      }

      ctx.restore();
      ctx.restore(); // end hueShift

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [w, h, activeColor, hueShift, animSpeed, responseMode, size, interactive]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: `${w}px`, height: `${h}px` }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: `${w}px`, height: `${h}px` }}
        className="block drop-shadow-[0_0_25px_rgba(255,0,51,0.8)]"
      />
    </div>
  );
};

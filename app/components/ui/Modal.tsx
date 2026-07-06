'use client';

import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'alert' | 'confirm';
}

export function Modal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'confirm',
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') onConfirm();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, onConfirm]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      <div className="relative border border-zinc-700 bg-black p-6 w-full max-w-sm mx-4">
        <h2 className="text-base font-mono uppercase tracking-[0.2em] text-white mb-2">
          {title}
        </h2>

        <p className="text-sm font-mono text-zinc-400 mb-6">
          {description}
        </p>

        <div className="flex gap-3">
          {variant === 'confirm' && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-xs font-mono uppercase tracking-[0.15em] border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors"
            >
              {cancelLabel}
            </button>
          )}

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-colors ${
              variant === 'confirm'
                ? 'flex-1 bg-white text-black hover:bg-zinc-200'
                : 'w-full bg-white text-black hover:bg-zinc-200'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

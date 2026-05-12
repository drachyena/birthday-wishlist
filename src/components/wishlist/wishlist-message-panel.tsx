"use client";

import { useState } from "react";
import { MessageForm } from "./message-form";

export function WishlistMessagePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  function handleSubmitted() {
    setShowEffect(true);
    window.setTimeout(() => setShowEffect(false), 1600);
  }

  return (
    <section
      className="relative overflow-hidden border-t-4 border-[#381a55] pt-5"
      aria-label="비공개 메시지 남기기"
    >
      {showEffect ? (
        <div className="pixel-burst" aria-hidden="true">
          <span>♥</span>
          <span>●</span>
          <span>♥</span>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-3">
          <p className="sticker-label w-fit">PRIVATE NOTE</p>
          <h2 className="pixel-display text-2xl text-[#381a55]">
            마음만 남기기
          </h2>
          <p className="text-sm font-bold leading-6 text-[#5a3a6f]">
            축하 마음은 비공개로 조용히 받아둘게요.
          </p>
        </div>

        <button
          className="pixel-button w-full lg:w-48"
          type="button"
          aria-controls="wishlist-message-form"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          마음만 보태기
        </button>
      </div>

      {isOpen ? (
        <div id="wishlist-message-form" className="mt-5">
          <MessageForm onSubmitted={handleSubmitted} />
        </div>
      ) : null}
    </section>
  );
}

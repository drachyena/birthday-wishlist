"use client";

import Image from "next/image";
import { useState } from "react";
import {
  calculateWishProgress,
  formatKrw,
  type Wish,
} from "@/src/lib/wishes";
import { MessageForm } from "./message-form";
import { ProgressMeter } from "./progress-meter";

type WishCardProps = {
  wish: Wish;
};

function WishImageFallback() {
  return (
    <div className="grid aspect-[4/3] place-items-center border-b-4 border-[#381a55] bg-[#fff3a7] text-center">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#ff4fa3]">
          PIXEL WISH
        </p>
        <p className="text-4xl" aria-hidden="true">
          ♡
        </p>
        <p className="text-xs font-bold text-[#381a55]">사진 준비 중</p>
      </div>
    </div>
  );
}

export function WishCard({ wish }: WishCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const progress = calculateWishProgress(wish);
  const shouldShowImage = Boolean(wish.image) && !imageFailed;

  function handleSubmitted() {
    setShowEffect(true);
    window.setTimeout(() => setShowEffect(false), 1600);
  }

  return (
    <article className="pixel-card relative overflow-hidden bg-white">
      {showEffect ? (
        <div className="pixel-burst" aria-hidden="true">
          <span>♥</span>
          <span>●</span>
          <span>♥</span>
        </div>
      ) : null}

      {shouldShowImage ? (
        <Image
          src={wish.image}
          alt={`${wish.name} product photo`}
          width={640}
          height={480}
          className="aspect-[4/3] w-full border-b-4 border-[#381a55] object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <WishImageFallback />
      )}

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="sticker-label mb-3">
              {wish.priority === "top" ? "TOP WISH" : "CUTE PICK"}
            </p>
            <h2 className="text-2xl font-black text-[#381a55]">{wish.name}</h2>
          </div>
          <span className="rounded border-2 border-[#381a55] bg-[#a8fff0] px-2 py-1 text-xs font-black text-[#381a55] shadow-[3px_3px_0_#381a55]">
            OPEN
          </span>
        </div>

        <p className="text-sm leading-6 text-[#5a3a6f]">{wish.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded border-2 border-[#381a55] bg-[#fff9d8] p-3">
            <p className="font-bold text-[#7d5c92]">Price</p>
            <p className="text-lg font-black text-[#381a55]">
              {formatKrw(wish.price)}
            </p>
          </div>
          <div className="rounded border-2 border-[#381a55] bg-[#ffe3ec] p-3">
            <p className="font-bold text-[#7d5c92]">Funded</p>
            <p className="text-lg font-black text-[#381a55]">
              {formatKrw(wish.fundedAmount)}
            </p>
          </div>
        </div>

        <ProgressMeter label="Item progress" percent={progress} />

        <button
          className="pixel-button w-full"
          type="button"
          onClick={() => setIsFormOpen((current) => !current)}
        >
          마음만 보태기
        </button>

        {isFormOpen ? (
          <MessageForm wishId={wish.id} onSubmitted={handleSubmitted} />
        ) : null}
      </div>
    </article>
  );
}

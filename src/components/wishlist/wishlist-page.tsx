import type { Wish, WishlistSummary } from "@/src/lib/wishes";
import { ProgressMeter } from "./progress-meter";
import { WishCard } from "./wish-card";

type WishlistPageProps = {
  wishes: Wish[];
  summary: WishlistSummary;
};

export function WishlistPage({ wishes, summary }: WishlistPageProps) {
  return (
    <main className="dot-bg min-h-screen px-4 py-8 text-[#381a55] sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="pixel-card bg-[#fffdf4] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="sticker-label w-fit">Y2K BIRTHDAY BOARD</p>
              <h1 className="text-4xl font-black leading-tight sm:text-6xl">
                Birthday Wishlist
              </h1>
              <p className="text-base font-bold leading-7 text-[#5a3a6f] sm:text-lg">
                생일에 살짝 마음을 얹어주고 싶은 고가 위시템들을 모아뒀어요.
                결제는 없고, 메시지는 저만 조용히 확인할게요.
              </p>
            </div>

            <div className="w-full rounded border-4 border-[#381a55] bg-[#a8fff0] p-4 shadow-[6px_6px_0_#381a55] lg:max-w-sm">
              <ProgressMeter
                label="Wish funding progress"
                percent={summary.progressPercent}
                size="large"
              />
              <p className="mt-3 text-sm font-black">
                {summary.formattedTotalFundedAmount} /{" "}
                {summary.formattedTotalPrice}
              </p>
            </div>
          </div>
        </header>

        <section
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          aria-label="Birthday wish items"
        >
          {wishes.map((wish) => (
            <WishCard key={wish.id} wish={wish} />
          ))}
        </section>
      </section>
    </main>
  );
}

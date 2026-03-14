const guideImageMap: Record<string, string> = {
  "product-buying-guide": "/image/Beauty & Skincare Buying Guide.png",
  "how-to-build-a-sensitive-skin-routine": "/image/How To Build A Sensitive-Skin Routine That Feels Calmer Every Day.png",
  "how-to-build-a-simple-skincare-routine": "/image/How To Build A Simple Skincare Routine That Is Easy To Follow.png",
  "how-to-build-an-acne-prone-skincare-routine": "/image/How To Build An Acne-Prone Skincare Routine Without Overdoing It.png",
  "how-to-choose-a-cleanser-for-acne-prone-skin": "/image/How To Choose A Cleanser For Acne-Prone Skin.png",
  "how-to-choose-a-cleanser-for-oily-skin": "/image/How To Choose A Cleanser For Oily Skin.png",
  "how-to-choose-a-cleanser-for-sensitive-skin": "/image/How To Choose A Cleanser For Sensitive Skin.png",
  "how-to-choose-a-cleanser": "/image/How To Choose A Face Cleanser.png",
  "how-to-choose-a-moisturizer-for-acne-prone-skin": "/image/How To Choose A Moisturizer For Acne-Prone Skin.png",
  "how-to-choose-a-moisturizer-for-dry-skin": "/image/How To Choose A Moisturizer For Dry Skin.png",
  "how-to-choose-a-moisturizer": "/image/How To Choose A Moisturizer For Dry, Oily, Combination, And Sensitive Skin.png",
  "how-to-choose-a-moisturizer-for-sensitive-skin": "/image/How To Choose A Moisturizer For Sensitive Skin.png",
  "how-to-choose-a-retinol-serum-or-cream": "/image/How To Choose A Retinol Serum Or Cream.png",
  "how-to-choose-a-sunscreen-for-acne-prone-skin": "/image/How To Choose A Sunscreen For Daily Use.png",
  "how-to-choose-a-sunscreen": "/image/How To Choose A Sunscreen For Daily Use.png",
  "how-to-choose-a-sunscreen-for-sensitive-skin": "/image/How To Choose A Sunscreen For Sensitive Skin.png",
  "how-to-choose-a-vitamin-c-serum": "/image/How To Choose A Vitamin C Serum.png",
  "how-to-choose-a-vitamin-c-serum-for-brightening": "/image/How To Choose A Vitamin C Serum For Brightening.png",
  "how-to-choose-acne-treatment": "/image/How To Choose Acne Treatment Products.png",
  "how-to-choose-an-acne-patch": "/image/How To Choose An Acne Patch.png",
  "how-to-choose-an-acne-spot-treatment": "/image/How To Choose An Acne Spot Treatment.png",
  "how-to-choose-fragrance-free-skincare": "/image/How To Choose Fragrance-Free Skincare Without Making The Routine Boring Or Complicated.png",
  "how-to-choose-retinol-for-beginners": "/image/How To Choose Retinol For Beginners.png",
  "how-to-layer-vitamin-c-retinol-and-sunscreen": "/image/How To Layer Vitamin C, Retinol, And Sunscreen Without Overcomplicating The Routine.png"
};

const guideImageFallbacks: Record<string, string> = {
  cleanser: "/image/How To Choose A Face Cleanser.png",
  moisturizer: "/image/How To Choose A Moisturizer For Dry, Oily, Combination, And Sensitive Skin.png",
  sunscreen: "/image/How To Choose A Sunscreen For Daily Use.png",
  vitaminC: "/image/How To Choose A Vitamin C Serum.png",
  retinol: "/image/How To Choose A Retinol Serum Or Cream.png",
  acne: "/image/How To Choose Acne Treatment Products.png",
  routine: "/image/How To Build A Simple Skincare Routine That Is Easy To Follow.png",
  default: "/image/Beauty & Skincare Buying Guide.png"
};

export function getGuideImageUrl(slug: string) {
  if (guideImageMap[slug]) {
    return guideImageMap[slug];
  }

  if (slug.includes("cleanser")) return guideImageFallbacks.cleanser;
  if (slug.includes("moisturizer")) return guideImageFallbacks.moisturizer;
  if (slug.includes("sunscreen")) return guideImageFallbacks.sunscreen;
  if (slug.includes("vitamin-c")) return guideImageFallbacks.vitaminC;
  if (slug.includes("retinol")) return guideImageFallbacks.retinol;
  if (slug.includes("acne")) return guideImageFallbacks.acne;
  if (slug.includes("routine") || slug.includes("layer")) return guideImageFallbacks.routine;

  return guideImageFallbacks.default;
}

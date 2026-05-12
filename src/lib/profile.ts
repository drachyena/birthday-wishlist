import profileData from "@/src/data/profile.json";

type SiteProfile = {
  ownerName: string;
};

const profile = profileData as SiteProfile;

export const wishlistTitle = `${profile.ownerName}의 생일 위시리스트`;

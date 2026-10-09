// Official client branding and genuine photography registry for D’Dezignz Interiors
import logoUrl from "@/assets/ddezignz-logo.png";
import logoWithPhoneUrl from "@/assets/ddezignz-logo-with-phone.png";
import deviBalaPortrait from "@/assets/devi-bala.png";

// Authentic project photography executed by Devi Bala / D'Dezignz Interiors
import livingStoneWall from "@/assets/projects/living-stone-wall.jpg";
import masterBedroomPlatform from "@/assets/projects/master-bedroom-platform.jpg";
import modularKitchen from "@/assets/projects/modular-kitchen.jpg";
import poojaPartition from "@/assets/projects/pooja-partition.jpg";
import foyerDining from "@/assets/projects/foyer-dining.jpg";
import livingLounge from "@/assets/projects/living-lounge.jpg";
import bedroomSuite from "@/assets/projects/bedroom-suite.jpg";
import bedroomWardrobe from "@/assets/projects/bedroom-wardrobe.jpg";
import compactBedroom from "@/assets/projects/compact-bedroom.jpg";
import residenceLiving from "@/assets/projects/residence-living.jpg";
import openPlanHall from "@/assets/projects/open-plan-hall.jpg";
import craftJoinery from "@/assets/projects/craft-joinery.jpg";
import cabinetryDetail from "@/assets/projects/cabinetry-detail.jpg";
import architecturalStorage from "@/assets/projects/architectural-storage.jpg";
import deviBalaAward from "@/assets/projects/devi-bala-award.jpg";
import deviBalaKeynote from "@/assets/projects/devi-bala-keynote.jpg";

export const images = {
  // Primary core mapping
  hero: livingStoneWall,
  living: livingStoneWall,
  bedroom: masterBedroomPlatform,
  kitchen: modularKitchen,
  foyer: foyerDining,
  study: craftJoinery,
  partition: poojaPartition,
  lounge: livingLounge,
  bedroomSuite: bedroomSuite,
  bedroomWardrobe: bedroomWardrobe,
  compactBedroom: compactBedroom,
  residenceLiving: residenceLiving,
  openPlanHall: openPlanHall,
  craftJoinery: craftJoinery,
  cabinetryDetail: cabinetryDetail,
  storage: architecturalStorage,
} as const;

export type ImageKey = keyof typeof images;

export {
  logoUrl,
  logoWithPhoneUrl,
  deviBalaPortrait,
  deviBalaAward,
  deviBalaKeynote,
};

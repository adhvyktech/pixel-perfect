// Central image registry. All images here are TEMPORARY placeholders —
// not photographs of the named client projects. Replace with real project
// photography (e.g. /images/projects/<slug>-01.jpg) when supplied.
import hero from "@/assets/hero-interior.jpg";
import living from "@/assets/living.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import foyer from "@/assets/foyer.jpg";
import study from "@/assets/study.jpg";
import logo from "@/assets/ddezignz-logo.png.asset.json";

export const images = { hero, living, bedroom, kitchen, foyer, study } as const;
export type ImageKey = keyof typeof images;
export const logoUrl = logo.url;

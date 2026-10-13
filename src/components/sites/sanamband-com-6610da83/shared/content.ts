export const heroBanners = [
  {
    label: "Tour",
    href: "/tour",
    external: false,
    alt: "See the latest tour dates",
    desktopImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/tour-banner-desktop.png",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/tour-banner-mobile.png",
  },
  {
    label: "Watch Latest Release",
    href: "https://youtu.be/Gf7Lf4kiZ-A?si=CN1TTNSXzlb0lOPI",
    external: true,
    alt: "See the latest Release",
    desktopImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/latest-music-desktop.jpg",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/latest-music-mobile.png",
  },
  {
    label: "Shop merch",
    href: "/merchandise",
    external: false,
    alt: "Shop SANAM merchandise",
    desktopImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/merch-banner-desktop.png",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/merch-banner-mobile.png",
  },
  {
    label: "Follow us",
    href: "https://www.instagram.com/sanamband?igsh=YnNleXFmaTk5aXFl",
    external: true,
    alt: "Follow SANAM on Instagram",
    desktopImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/group-banner-desktop.png",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/group-banner-mobile.png",
  },
  {
    label: "Listen to us",
    href: "/music#latest",
    external: false,
    alt: "Explore the latest music from SANAM",
    desktopImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/music-banner-desktop.png",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/hero/music-banner-mobile.png",
  },
] as const;

export const bandMembers = [
  {
    name: "Sanam Puri",
    role: "Vocals & Lead Composer",
    bio: "The face of the band and its defining voice. Sanam is the band leader with vision and emotion. A singer, songwriter, and dreamer whose voice carries words straight into the hearts of listeners across the world. His melodies bridge nostalgia and newness, making every song unforgettable.",
    instagram: "https://www.instagram.com/sanampuri/",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/sanam00.png",
    featuredImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/sanam00.png",
    thumbnailImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/sanam0.jpg",
  },
  {
    name: "Venkat Subramaniyam",
    role: "Bass & Arranger",
    bio: "The sonic architect of the band. Venky's deep understanding of sound, harmony, and groove turns every track into an experience. His basslines and arrangements give SANAM its pulse. Thoughtful, musical, and alive with soul.",
    instagram: "https://www.instagram.com/venkysbass/",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/venky00.jpg",
    featuredImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/venky0.jpg",
    thumbnailImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/venky0.jpg",
  },
  {
    name: "Keshav Dhanraj",
    role: "Drums & Programmer",
    bio: "The driving force behind SANAM, on and off the stage. Keshav is the backbone who turns new vision into reality with direction and creativity. A drummer, programmer and visionary. An unshakable anchor for SANAM.",
    instagram: "https://www.instagram.com/keshavdhanraj/",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/keshav00.jpg",
    featuredImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/keshav0.jpg",
    thumbnailImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/keshav0.jpg",
  },
  {
    name: "Samar Puri",
    role: "Guitars, Lyrics & Editor",
    bio: "The storyteller of SANAM. Samar’s video edits and lyrics bring emotion and depth, while his creative direction keeps the visual and lyrical world honest and connected. His simple yet powerful artistry gives SANAM the soul and sincerity the band is known for.",
    instagram: "https://www.instagram.com/samarpuri/",
    mobileImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/samar00.jpg",
    featuredImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/samar0.jpeg",
    thumbnailImage: "/sites/sanamband-com-6610da83/root-8a5edab2/images/faces/samar0.jpeg",
  },
] as const;

export const instagramBenefits: {
  icon: "calendar" | "music" | "ticket" | "users";
  title: string;
  description: string;
}[] = [
  {
    icon: "calendar",
    title: "Tour Announcements",
    description: "Be the first to know about upcoming concerts and tour dates.",
  },
  {
    icon: "music",
    title: "New Releases",
    description: "Get notified when we drop new songs and music videos.",
  },
  {
    icon: "ticket",
    title: "Exclusive Merchandise",
    description: "Early access to limited edition merchandise and special offers.",
  },
  {
    icon: "users",
    title: "Behind the Scenes",
    description: "Exclusive content, studio updates, and personal stories.",
  },
];

export const quickLinks = [
  { label: "Music", href: "/music", external: false },
  { label: "Tour Dates", href: "/tour", external: false },
  { label: "Merchandise", href: "/merchandise", external: false },
  { label: "Contact", href: "/contact", external: false },
  { label: "Privacy Policy", href: "/privacy", external: false },
  { label: "Terms of Service", href: "/terms", external: false },
] as const;

export const socialLinks = [
  {
    label: "X (formerly Twitter)",
    href: "https://x.com/sanam_official",
    icon: "x",
  },
  { label: "Instagram", href: "https://www.instagram.com/sanamband/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/c/SANAM", icon: "youtube" },
] as const;
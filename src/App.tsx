import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Compass,
  ExternalLink,
  Flame,
  Globe2,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Moon,
  Navigation,
  Phone,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Sun,
  Trash2,
  Users,
  Utensils,
  WalletCards,
  X,
  ZoomIn,
} from 'lucide-react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();
const PHONE = '+91 99232 34619';
const PHONE_LINK = 'tel:+919923234619';
const WHATSAPP = '919923234619';
const ADDRESS = 'Talegaon–Chakan Highway, Malwadi, Talegaon Dabhade, Maharashtra 410507, India';
const MAPS_URL = 'https://www.google.com/maps/place/Hotel+Aapulaki+Garden/@18.7379166,73.7156525,2699m/data=!3m1!1e3!4m6!3m5!1s0x3bc2b170718f0e49:0x3db7b72a7834d6de!8m2!3d18.7353914!4d73.7106252!16s%2Fg%2F11cksr_z_b?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D';
const LISTING_PHOTO_URL = 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlDJ2m69zpXov-WtKWjiX6lDOGBX_SB4bSX1FjjZ40k8nzzcV4LST8fW316IFjeRIm5DSGdaA4PxyKwjTFpn1zT0BcJxxeDNdWy6HW2e4MpGDFi7MlME8h67SXN4J5COo4vE4f9nm8JY4fl=w1600-h1000-k-no';
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/offers', label: 'Offers' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
];

type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  veg?: boolean;
  tag?: string;
};

const menuItems: MenuItem[] = [
  { id: 'kolhapuri-misal', name: 'Kolhapuri Misal', category: 'Maharashtrian', description: 'Usal, farsan, onion, lemon and a proper hit of tarri.', price: 185, tag: 'House favourite' },
  { id: 'bharli-vangi', name: 'Bharli Vangi', category: 'Maharashtrian', description: 'Baby brinjal tucked into a roasted peanut and coconut masala.', price: 245, veg: true },
  { id: 'mutton-thali', name: 'Mutton Thali', category: 'Maharashtrian', description: 'Mutton rassa, sukka, bhakri, rice and the accompaniments.', price: 395 },
  { id: 'prawn-koliwada', name: 'Prawn Koliwada', category: 'Seafood', description: 'Crisp, spiced prawns with coastal chutney and lime.', price: 425, tag: 'From the coast' },
  { id: 'surmai-thali', name: 'Surmai Thali', category: 'Seafood', description: 'Seasonal catch, sol kadhi, bhakri and a homestyle curry.', price: 475 },
  { id: 'paneer-tikka', name: 'Tandoori Paneer Tikka', category: 'North Indian', description: 'Charred paneer, peppers and onion with smoky mint chutney.', price: 315, veg: true },
  { id: 'butter-chicken', name: 'Butter Chicken', category: 'North Indian', description: 'Tandoor-smoked chicken in a silky tomato and kasuri methi gravy.', price: 365 },
  { id: 'dal-tadka', name: 'Dal Tadka', category: 'Indian', description: 'Yellow lentils finished with ghee, garlic and cumin.', price: 195, veg: true },
  { id: 'bhakri', name: 'Jowar Bhakri', category: 'Indian', description: 'Hand-patted sorghum flatbread, warm from the tawa.', price: 55, veg: true },
  { id: 'sol-kadhi', name: 'Sol Kadhi', category: 'Indian', description: 'Cool kokum and coconut drink with a gentle garlic finish.', price: 95, veg: true },
  { id: 'gulab-jamun', name: 'Gulab Jamun', category: 'Indian', description: 'Warm cardamom syrup, served two ways.', price: 125, veg: true },
  { id: 'mango-panna', name: 'Kairi Panna', category: 'Indian', description: 'Raw mango, jaggery, mint and roasted cumin.', price: 90, veg: true },
];

const galleryItems = [
  { id: 'restaurant-interior', category: 'The restaurant', title: 'Inside the Aapulaki dining space', note: 'Photo from the Google Maps listing', objectPosition: 'center' },
  { id: 'veranda-seating', category: 'The restaurant', title: 'A relaxed veranda table', note: 'Photo from the Google Maps listing', objectPosition: 'left center' },
  { id: 'rustic-details', category: 'The restaurant', title: 'Rustic details around the table', note: 'Photo from the Google Maps listing', objectPosition: 'right center' },
];

const faqItems = [
  { q: 'Where is Hotel Aapulaki Garden?', a: 'We are on the Talegaon–Chakan Highway in Malwadi, Talegaon Dabhade, Maharashtra 410507. Use the directions link for the exact map pin.' },
  { q: 'Can I reserve a table?', a: 'Yes. Share your preferred date, time and party size through our reservation form. We will confirm the details on WhatsApp.' },
  { q: 'Do you host family events?', a: 'We welcome family gathering enquiries. Tell us what you are planning, and the team can share what is possible for your group.' },
  { q: 'Can I order takeaway?', a: 'Yes. Build a sample takeaway order on this site and send it to the team on WhatsApp. Please confirm current availability and pricing before payment.' },
  { q: 'What are your opening hours?', a: 'Hours to be confirmed. Please call or WhatsApp before setting out, especially for a late meal or a larger gathering.' },
];

function NotFoundPage() {
  return <PageFrame><section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center lg:py-36"><p className="eyebrow">A wrong turn on the highway</p><p className="mt-5 font-display text-[8rem] leading-none text-primary dark:text-foreground sm:text-[12rem]">404</p><h1 className="mt-2 font-display text-4xl text-primary dark:text-foreground sm:text-5xl">This table is not on the map.</h1><p className="mt-5 max-w-md leading-7 text-muted-foreground">The page you were looking for has wandered off. Let’s get you back to the garden.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground" data-testid="link-not-found-home">Back home <ArrowRight size={17} /></Link><Link href="/menu" className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 font-bold hover:border-accent hover:text-accent" data-testid="link-not-found-menu"><Utensils size={17} /> See the menu</Link></div></section></PageFrame>;
}

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message: string) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

function BrandMark() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-accent text-primary-foreground shadow-sm">
      <span className="font-display text-2xl leading-none">A</span>
    </span>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const savedTheme = localStorage.getItem('aapulaki-theme');
    const nextDark = savedTheme === 'dark';
    setDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('aapulaki-theme', nextDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="hidden border-b border-primary/10 bg-primary px-4 py-2 text-[11px] text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="tracking-wide text-primary-foreground/80">A garden table on the Talegaon–Chakan Highway</span>
          <div className="flex items-center gap-5">
            <a className="focus-ring flex items-center gap-2 hover:text-accent" href={PHONE_LINK} data-testid="link-top-phone"><Phone size={13} /> {PHONE}</a>
            <a className="focus-ring flex items-center gap-2 hover:text-accent" href={whatsappUrl('Hello Hotel Aapulaki Garden, I have a question.')} target="_blank" rel="noreferrer" data-testid="link-top-whatsapp"><MessageCircle size={13} /> WhatsApp us</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="focus-ring group flex items-center gap-3" onClick={() => setOpen(false)} data-testid="link-brand">
          <BrandMark />
          <span className="leading-tight">
            <span className="block font-display text-xl font-semibold tracking-tight text-primary dark:text-foreground">Hotel Aapulaki</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Garden · Malwadi</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`focus-ring text-sm font-semibold transition-colors hover:text-accent ${location === item.href ? 'text-accent' : 'text-foreground/70'}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/reservation" className="focus-ring hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5 sm:flex" data-testid="link-header-reserve"><CalendarDays size={15} /> Reserve</Link>
          <Link href="/takeaway" className="focus-ring hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2.5 text-sm font-bold text-foreground hover:border-accent hover:text-accent sm:flex" data-testid="link-header-takeaway"><ShoppingBag size={16} /> Takeaway</Link>
          <button className="focus-ring rounded-full p-2 text-foreground/70 hover:bg-muted hover:text-foreground" onClick={toggleTheme} aria-label={dark ? 'Use light theme' : 'Use dark theme'} data-testid="button-theme-toggle">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Choose language" className="focus-ring hidden rounded-full border border-border bg-card px-2 py-2 text-xs font-bold text-foreground sm:block" data-testid="select-language">
            <option>EN</option><option>मराठी</option><option>हिन्दी</option>
          </select>
          <button className="focus-ring rounded-full p-2 text-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X size={22} /> : <MenuIcon size={22} />}</button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="focus-ring rounded-xl px-3 py-3 font-semibold hover:bg-muted" data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</Link>)}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <Link href="/reservation" onClick={() => setOpen(false)} className="focus-ring flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-bold text-accent-foreground" data-testid="link-mobile-reserve"><CalendarDays size={16} /> Reserve</Link>
              <Link href="/takeaway" onClick={() => setOpen(false)} className="focus-ring flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-bold" data-testid="link-mobile-takeaway"><ShoppingBag size={16} /> Takeaway</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3"><BrandMark /><div><p className="font-display text-2xl">Hotel Aapulaki</p><p className="eyebrow !text-accent">Garden · Malwadi</p></div></div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/70">A welcoming garden dining destination for Maharashtrian, Indian, North Indian and seafood plates on the Talegaon–Chakan Highway.</p>
        </div>
        <div>
          <p className="eyebrow !text-secondary">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-primary-foreground/75">{navItems.slice(1, 5).map((item) => <Link key={item.href} href={item.href} className="focus-ring hover:text-accent" data-testid={`link-footer-${item.label.toLowerCase()}`}>{item.label}</Link>)}<Link href="/faq" className="focus-ring hover:text-accent" data-testid="link-footer-faq">Frequently asked</Link></div>
        </div>
        <div>
          <p className="eyebrow !text-secondary">Come by</p>
          <address className="mt-4 not-italic text-sm leading-7 text-primary-foreground/75">{ADDRESS}</address>
          <div className="mt-4 flex flex-wrap gap-3"><a href={PHONE_LINK} className="focus-ring inline-flex items-center gap-2 text-sm font-bold hover:text-accent" data-testid="link-footer-phone"><Phone size={15} /> Call {PHONE}</a><a href={MAPS_URL} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 text-sm font-bold hover:text-accent" data-testid="link-footer-directions"><Navigation size={15} /> Directions</a></div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/55">Hours to be confirmed · Current menu, availability and event details are best confirmed directly with the team.</div>
    </footer>
  );
}

function PageFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [location] = useLocation();
  const meta = pageMeta[location] ?? pageMeta['/'];

  useEffect(() => {
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}${location || '/'}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', meta.description);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', meta.title);
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', meta.description);
  }, [location, meta]);

  return <div className={`min-h-[70vh] ${className}`}>{children}</div>;
}

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Hotel Aapulaki Garden | Maharashtrian Restaurant in Talegaon',
    description: 'A warm garden dining destination on the Talegaon–Chakan Highway serving Maharashtrian, Indian, North Indian and seafood cuisine.',
  },
  '/menu': {
    title: 'Sample Menu | Hotel Aapulaki Garden, Talegaon',
    description: 'Explore the presentation menu for Hotel Aapulaki Garden, with Maharashtrian, Indian, North Indian and seafood favourites.',
  },
  '/gallery': {
    title: 'Gallery | Hotel Aapulaki Garden, Talegaon',
    description: 'Explore the visual direction for the garden, dining tables and food stories at Hotel Aapulaki Garden.',
  },
  '/offers': {
    title: 'Visit Ideas | Hotel Aapulaki Garden, Talegaon',
    description: 'Plan a family table, seasonal meal or takeaway order at Hotel Aapulaki Garden in Talegaon Dabhade.',
  },
  '/events': {
    title: 'Family Events | Hotel Aapulaki Garden, Talegaon',
    description: 'Send an enquiry for birthdays, reunions, family gatherings and other group dining plans at Aapulaki Garden.',
  },
  '/reservation': {
    title: 'Reserve a Table | Hotel Aapulaki Garden, Talegaon',
    description: 'Send a table reservation enquiry to Hotel Aapulaki Garden and continue the conversation on WhatsApp.',
  },
  '/takeaway': {
    title: 'Takeaway | Hotel Aapulaki Garden, Talegaon',
    description: 'Build a sample takeaway order for Hotel Aapulaki Garden and send the enquiry to the team on WhatsApp.',
  },
  '/reviews': {
    title: 'Guest Reviews | Hotel Aapulaki Garden, Talegaon',
    description: 'Open the official Google listing to read the latest verified guest feedback for Hotel Aapulaki Garden.',
  },
  '/contact': {
    title: 'Contact | Hotel Aapulaki Garden, Talegaon',
    description: 'Call, WhatsApp or get directions to Hotel Aapulaki Garden on the Talegaon–Chakan Highway in Malwadi.',
  },
  '/location': {
    title: 'Location & Directions | Hotel Aapulaki Garden',
    description: 'Find Hotel Aapulaki Garden at Malwadi on the Talegaon–Chakan Highway using the official Google Maps pin.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | Hotel Aapulaki Garden',
    description: 'Find practical answers about cuisine, reservations, takeaway, events and directions for Hotel Aapulaki Garden.',
  },
};

function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <section className="mx-auto max-w-7xl px-4 pb-12 pt-16 lg:px-8 lg:pb-16 lg:pt-24"><p className="eyebrow reveal">{eyebrow}</p><h1 className="reveal reveal-delay-1 mt-3 max-w-4xl font-display text-5xl leading-[.98] tracking-tight text-primary dark:text-foreground sm:text-6xl lg:text-8xl">{title}</h1>{children && <div className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-7 text-muted-foreground">{children}</div>}</section>;
}

function PlaceholderArt({ label, className = '', tall = false }: { label: string; className?: string; tall?: boolean }) {
  return <div className={`editorial-placeholder flex ${tall ? 'min-h-[360px]' : 'min-h-[230px]'} items-end rounded-[2rem] p-5 ${className}`} role="img" aria-label={`Editorial placeholder: ${label}`}><span className="relative z-10 max-w-[15rem] text-xs font-bold uppercase tracking-[.16em] text-card">{label}</span></div>;
}

function ListingPhoto({ alt, className = '', objectPosition = 'center' }: { alt: string; className?: string; objectPosition?: string }) {
  return <figure className={`listing-photo relative min-h-[230px] overflow-hidden rounded-[2rem] ${className}`}><img src={LISTING_PHOTO_URL} alt={alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition }} loading="lazy" /><figcaption className="absolute bottom-4 left-4 rounded-full bg-primary/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-primary-foreground backdrop-blur-sm"><a href={MAPS_URL} target="_blank" rel="noreferrer" className="focus-ring">Photo from Google Maps listing</a></figcaption></figure>;
}

function ActionRail() {
  return <div className="flex flex-wrap gap-3"><a href={PHONE_LINK} className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold transition-colors hover:border-accent hover:text-accent" data-testid="link-action-call"><Phone size={16} /> Call us</a><a href={whatsappUrl('Hello Hotel Aapulaki Garden, I would like to know more.')} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5" data-testid="link-action-whatsapp"><MessageCircle size={16} /> WhatsApp</a><a href={MAPS_URL} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold transition-colors hover:border-accent hover:text-accent" data-testid="link-action-directions"><Navigation size={16} /> Directions</a></div>;
}

function Home() {
  return (
    <PageFrame>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full border-[42px] border-accent/60 opacity-70" />
        <div className="absolute bottom-[-9rem] left-[46%] h-72 w-72 rounded-full border-[30px] border-secondary/30" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="eyebrow reveal !text-secondary">Talegaon Dabhade · Maharashtra</p>
            <h1 className="reveal reveal-delay-1 mt-5 max-w-3xl font-display text-6xl leading-[.91] tracking-tight sm:text-8xl lg:text-[7.7rem]">Come hungry.<br /><span className="text-accent">Stay awhile.</span></h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-lg text-lg leading-8 text-primary-foreground/75">A garden table for bold Maharashtrian plates, coastal seafood and the kind of family meals that turn into stories.</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3"><Link href="/menu" className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5" data-testid="link-hero-menu">See the menu <ArrowRight size={17} /></Link><Link href="/reservation" className="focus-ring inline-flex items-center gap-2 rounded-full border border-primary-foreground/35 px-6 py-3.5 font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10" data-testid="link-hero-reserve"><CalendarDays size={17} /> Reserve a table</Link></div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[.18em] text-primary-foreground/45">Maharashtrian · Indian · North Indian · Seafood</p>
          </div>
          <div className="relative z-10 lg:pt-6">
            <div className="float-slow relative ml-auto max-w-[34rem] rotate-2 rounded-[2.5rem] border border-primary-foreground/20 bg-secondary/10 p-3 shadow-2xl">
               <ListingPhoto alt="Interior dining space at Hotel Aapulaki Garden, from the Google Maps listing" className="min-h-[440px] rounded-[2rem] sm:min-h-[520px]" />
              <div className="absolute -bottom-6 -left-5 max-w-[13rem] rounded-2xl bg-secondary px-4 py-4 text-sm font-bold text-primary shadow-xl"><span className="block font-display text-2xl">Aapulaki</span><span className="mt-1 block text-xs uppercase tracking-[.15em]">Your place, your table</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-secondary/35"><div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-sm font-semibold text-primary sm:grid-cols-3 lg:px-8"><div className="flex items-center gap-3"><MapPin size={18} className="text-accent" /> On the Talegaon–Chakan Highway</div><div className="flex items-center gap-3"><ChefHat size={18} className="text-accent" /> Built around generous plates</div><div className="flex items-center gap-3"><Users size={18} className="text-accent" /> Made for families and gatherings</div></div></section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-28">
        <div><p className="eyebrow">A little about the place</p><h2 className="mt-4 max-w-md font-display text-5xl leading-none text-primary dark:text-foreground sm:text-6xl">The meal starts before the first bite.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">There is the turn off the highway, the green around the table, the sound of a tawa working somewhere close by. Aapulaki is made for unhurried meals and one more helping.</p><Link href="/contact" className="focus-ring mt-7 inline-flex items-center gap-2 font-bold text-accent hover:gap-3" data-testid="link-home-about">Get in touch <ArrowRight size={17} /></Link></div>
         <div className="grid gap-4 sm:grid-cols-[1.15fr_.85fr]"><ListingPhoto alt="Open dining veranda at Hotel Aapulaki Garden" objectPosition="left center" className="min-h-[360px]" /><div className="grid gap-4"><div className="rounded-[2rem] bg-accent p-7 text-accent-foreground"><Flame size={24} /><p className="mt-8 font-display text-3xl leading-tight">Big flavours. No rush.</p><p className="mt-3 text-sm leading-6 text-accent-foreground/80">A table for the roadside stop that becomes the evening plan.</p></div><ListingPhoto alt="Rustic dining details at Hotel Aapulaki Garden" objectPosition="right center" /></div></div>
      </section>
      <section className="paper-grid border-y border-border bg-secondary/20"><div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">On the table</p><h2 className="mt-3 font-display text-5xl text-primary dark:text-foreground sm:text-6xl">Start with what<br />the kitchen loves.</h2></div><Link href="/menu" className="focus-ring inline-flex items-center gap-2 font-bold text-accent hover:gap-3" data-testid="link-home-full-menu">Browse the full sample menu <ArrowRight size={17} /></Link></div><div className="mt-10 grid gap-4 md:grid-cols-3">{menuItems.slice(0, 3).map((item, index) => <MenuCard key={item.id} item={item} featured={index === 0} />)}</div><p className="mt-5 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">Sample menu for presentation · Confirm current menu and pricing on WhatsApp</p></div></section>
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28"><div className="rounded-[2.5rem] bg-primary px-6 py-12 text-primary-foreground sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16"><div><p className="eyebrow !text-secondary">Make an evening of it</p><h2 className="mt-3 max-w-2xl font-display text-5xl leading-none sm:text-6xl">Your next family table is closer than you think.</h2></div><div className="mt-8 lg:mt-0"><ActionRail /></div></div></section>
    </PageFrame>
  );
}

function MenuCard({ item, featured = false, onSelect }: { item: MenuItem; featured?: boolean; onSelect?: (item: MenuItem) => void }) {
  return <article className={`group relative rounded-[1.7rem] border border-border bg-card p-5 transition-transform hover:-translate-y-1 ${featured ? 'md:translate-y-4' : ''}`} data-testid={`card-menu-${item.id}`}><div className="flex items-start justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] ${item.veg ? 'bg-secondary text-primary' : 'bg-primary text-primary-foreground'}`}>{item.veg ? 'Vegetarian' : 'Kitchen pick'}</span>{item.tag && <span className="text-[10px] font-bold uppercase tracking-[.12em] text-accent">{item.tag}</span>}</div><h3 className="mt-8 font-display text-3xl leading-tight text-primary dark:text-foreground">{item.name}</h3><p className="mt-3 min-h-[3rem] text-sm leading-6 text-muted-foreground">{item.description}</p><div className="mt-6 flex items-end justify-between border-t border-border pt-4"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Sample price</p><p className="mt-1 font-display text-2xl text-primary dark:text-foreground">₹ {item.price}</p></div>{onSelect && <button onClick={() => onSelect(item)} className="focus-ring inline-flex items-center gap-1 text-sm font-bold text-accent hover:gap-2" data-testid={`button-view-${item.id}`}>Details <ArrowRight size={15} /></button>}</div></article>;
}

function MenuPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const categories = ['All', ...Array.from(new Set(menuItems.map((item) => item.category)))];
  const filtered = useMemo(() => menuItems.filter((item) => (category === 'All' || item.category === category) && `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <PageFrame><PageIntro eyebrow="Aapulaki sample menu" title="Come for one dish. Leave with a table full." >This is a presentation menu to give you a taste of the kitchen. Dishes, availability and prices can change — confirm the current menu directly with the team.</PageIntro><section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8"><div className="flex flex-col gap-4 rounded-[1.8rem] border border-border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between"><label className="relative block flex-1"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search dishes, ingredients or cravings" aria-label="Search menu" className="focus-ring w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-accent" data-testid="input-menu-search" /></label><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`focus-ring whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold ${category === item ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground/70 hover:bg-secondary'}`} data-testid={`button-menu-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div></div><div className="mt-10 flex items-center justify-between"><p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">{filtered.length}</span> dishes shown</p><span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-primary">Demo menu</span></div>{filtered.length ? <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filtered.map((item) => <MenuCard key={item.id} item={item} onSelect={setSelected} />)}</div> : <div className="mt-8 rounded-[2rem] border border-dashed border-border bg-card p-12 text-center"><CircleAlert className="mx-auto text-accent" /><h2 className="mt-4 font-display text-3xl">Nothing on this page yet.</h2><p className="mt-2 text-muted-foreground">Try another search or choose every category.</p><button onClick={() => { setQuery(''); setCategory('All'); }} className="focus-ring mt-5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground" data-testid="button-reset-menu">Reset menu</button></div>}<p className="mt-8 text-sm leading-6 text-muted-foreground">For allergies, large orders or today’s availability, please call <a href={PHONE_LINK} className="font-bold text-accent underline-offset-4 hover:underline" data-testid="link-menu-phone">{PHONE}</a>.</p></section>{selected && <Dialog title={selected.name} onClose={() => setSelected(null)}><div className="rounded-2xl bg-secondary/50 p-5"><p className="eyebrow">Menu detail</p><p className="mt-3 text-lg leading-8">{selected.description}</p><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-sm text-muted-foreground">Sample price</span><span className="font-display text-3xl text-primary dark:text-foreground">₹ {selected.price}</span></div></div><a href={whatsappUrl(`Hello, I would like to ask about ${selected.name} at Hotel Aapulaki Garden.`)} target="_blank" rel="noreferrer" className="focus-ring mt-5 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground" data-testid="link-menu-item-whatsapp"><MessageCircle size={17} /> Ask about this dish</a></Dialog>}</PageFrame>;
}

function Dialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [onClose]);
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-primary/65 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className="w-full max-w-lg rounded-t-[2rem] border border-border bg-card p-6 shadow-2xl sm:rounded-[2rem]"><div className="flex items-start justify-between gap-5"><div><p className="eyebrow">Aapulaki</p><h2 className="mt-2 font-display text-4xl leading-none text-primary dark:text-foreground">{title}</h2></div><button onClick={onClose} className="focus-ring rounded-full p-2 hover:bg-muted" aria-label="Close dialog" data-testid="button-close-dialog"><X size={20} /></button></div><div className="mt-6">{children}</div></div></div>;
}

function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [index, setIndex] = useState<number | null>(null);
  const filters = ['All', ...Array.from(new Set(galleryItems.map((item) => item.category)))];
  const shown = galleryItems.filter((item) => filter === 'All' || item.category === filter);
  return <PageFrame><PageIntro eyebrow="Aapulaki in frames" title="A place with a little room around the meal.">These photos are from the Hotel Aapulaki Garden Google Maps listing. Open the original listing for the full photo collection and the latest visitor uploads.</PageIntro><section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8"><div className="flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`focus-ring rounded-full px-4 py-2.5 text-sm font-bold ${filter === item ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary hover:bg-accent hover:text-accent-foreground'}`} data-testid={`button-gallery-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div><div className="mt-9 columns-1 gap-5 sm:columns-2 lg:columns-3">{shown.map((item, itemIndex) => <button key={item.id} onClick={() => setIndex(itemIndex)} className="focus-ring group mb-5 block w-full break-inside-avoid text-left" data-testid={`button-gallery-${item.id}`}><div className={`relative flex ${itemIndex % 2 ? 'min-h-[280px]' : 'min-h-[390px]'} items-end overflow-hidden rounded-[2rem] p-5 transition-transform group-hover:-translate-y-1`}><img src={LISTING_PHOTO_URL} alt={item.title} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.objectPosition }} loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" /><div className="absolute right-4 top-4 rounded-full bg-card/85 p-2 text-primary opacity-0 transition-opacity group-hover:opacity-100"><ZoomIn size={17} /></div><div className="relative z-10"><p className="eyebrow !text-secondary">{item.category}</p><h2 className="mt-2 font-display text-3xl leading-none text-card">{item.title}</h2><p className="mt-2 text-[10px] font-bold uppercase tracking-[.13em] text-card/70">{item.note}</p></div></div></button>)}</div><a href={MAPS_URL} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold hover:border-accent hover:text-accent" data-testid="link-gallery-google-maps"><ExternalLink size={16} /> View the full photo collection on Google Maps</a></section>{index !== null && <Dialog title={shown[index].title} onClose={() => setIndex(null)}><div className="relative min-h-[330px] overflow-hidden rounded-[1.5rem]"><img src={LISTING_PHOTO_URL} alt={shown[index].title} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: shown[index].objectPosition }} /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-5 pt-20"><p className="eyebrow !text-secondary">{shown[index].category}</p><p className="mt-2 text-xs font-bold uppercase tracking-[.14em] text-card">{shown[index].note}</p></div></div></Dialog>}</PageFrame>;
}

function OffersPage() {
  return <PageFrame><PageIntro eyebrow="Good reasons to linger" title="The offer is simple: make room for another plate.">We are keeping this page honest. There are no invented discounts or unconfirmed deals here — just thoughtful ways to plan your visit.</PageIntro><section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 md:grid-cols-[1.2fr_.8fr] lg:px-8"><article className="rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-10"><p className="eyebrow !text-secondary">01 · Family tables</p><h2 className="mt-8 max-w-lg font-display text-5xl leading-none sm:text-6xl">Bring the appetite, we will make room.</h2><p className="mt-6 max-w-md leading-7 text-primary-foreground/70">Planning a family meal or a small celebration? Tell us about your group before you arrive and ask what the kitchen can prepare.</p><Link href="/events" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground" data-testid="link-offer-events">Plan an event <ArrowRight size={17} /></Link></article><div className="grid gap-5"><article className="rounded-[2rem] border border-border bg-secondary/50 p-7"><Sparkles className="text-accent" /><h2 className="mt-10 font-display text-3xl text-primary dark:text-foreground">Seasonal plates</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Ask what is fresh today, what came in from the coast and what is just off the tawa.</p></article><article className="rounded-[2rem] border border-border bg-card p-7"><WalletCards className="text-accent" /><h2 className="mt-10 font-display text-3xl text-primary dark:text-foreground">Takeaway, your way</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Build an order before you set out and confirm the details on WhatsApp.</p><Link href="/takeaway" className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent" data-testid="link-offer-takeaway">Start an order <ArrowRight size={15} /></Link></article></div></section><section className="border-y border-border bg-secondary/20"><div className="mx-auto max-w-7xl px-4 py-12 lg:px-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">No fine print surprises</p><h2 className="mt-2 font-display text-4xl text-primary dark:text-foreground">Current offers: to be confirmed</h2></div><ActionRail /></div></div></section></PageFrame>;
}

function FormField({ label, name, type = 'text', placeholder, required = true, children }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; children?: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-foreground">{label}{required && <span className="ml-1 text-accent">*</span>}</span>{children ?? <input required={required} name={name} type={type} placeholder={placeholder} className="focus-ring w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent" data-testid={`input-${name}`} />}</label>;
}

function ReservationPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const date = String(data.get('date') || '').trim();
    const time = String(data.get('time') || '').trim();
    const guests = String(data.get('guests') || '').trim();
    if (!name || !phone || !date || !time || !guests) { setError('Please fill in all required details so the team can respond.'); return; }
    setError('');
    openWhatsApp(`Reservation enquiry for Hotel Aapulaki Garden\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nPreferred time: ${time}\nGuests: ${guests}\nNote: ${String(data.get('note') || 'None')}`);
    setSent(true);
  };
  return <PageFrame><PageIntro eyebrow="Your table, your time" title="Tell us when you are coming.">Send a reservation enquiry and the team will confirm your table on WhatsApp. This is an enquiry, not an instant booking.</PageIntro><section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8"><div className="rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-10"><CalendarDays className="text-accent" /><h2 className="mt-9 font-display text-4xl leading-none">A little notice helps the kitchen look after you.</h2><div className="mt-9 space-y-5 text-sm leading-6 text-primary-foreground/70"><p className="flex gap-3"><Check className="mt-1 shrink-0 text-accent" size={16} />Share your party size and preferred time.</p><p className="flex gap-3"><Check className="mt-1 shrink-0 text-accent" size={16} />Mention birthdays, children or accessibility needs.</p><p className="flex gap-3"><Check className="mt-1 shrink-0 text-accent" size={16} />Wait for the team to confirm availability.</p></div></div><div className="rounded-[2rem] border border-border bg-card p-6 sm:p-10">{sent ? <SuccessState title="Your enquiry is ready to send" body="WhatsApp should have opened with your reservation details. Send the message there to reach the Aapulaki team." reset={() => setSent(false)} /> : <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate><div className="sm:col-span-2"><p className="eyebrow">Reservation enquiry</p><h2 className="mt-2 font-display text-4xl text-primary dark:text-foreground">Save a seat in the garden.</h2></div><FormField label="Your name" name="name" placeholder="Full name" /><FormField label="Mobile number" name="phone" type="tel" placeholder="+91" /><FormField label="Preferred date" name="date" type="date" /><FormField label="Preferred time" name="time" type="time" /><FormField label="Number of guests" name="guests" type="number" placeholder="e.g. 4" /><FormField label="Special note" name="note" required={false} placeholder="Celebration, dietary note, seating request" /><div className="sm:col-span-2">{error && <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-destructive" role="alert"><CircleAlert size={16} />{error}</p>}<button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground hover:-translate-y-0.5" data-testid="button-submit-reservation"><MessageCircle size={17} /> Continue on WhatsApp</button><p className="mt-3 text-center text-xs text-muted-foreground">Hours to be confirmed · We will reply with availability.</p></div></form>}</div></section></PageFrame>;
}

function EventPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    openWhatsApp(`Family event enquiry for Hotel Aapulaki Garden\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nOccasion: ${data.get('occasion')}\nDate: ${data.get('date')}\nGuests: ${data.get('guests')}\nWhat we need to know: ${data.get('details')}`);
    setSent(true);
  };
  return <PageFrame><PageIntro eyebrow="Gather here" title="For birthdays, reunions and the long-table kind of day.">Tell us what you are planning. We will take it from there, one practical detail at a time.</PageIntro><section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8"><div className="grid gap-5 md:grid-cols-3"><div className="md:col-span-2"><PlaceholderArt label="Editorial placeholder · family gathering in the garden" tall /></div><div className="rounded-[2rem] bg-accent p-7 text-accent-foreground"><Users size={24} /><h2 className="mt-12 font-display text-4xl leading-none">Room for your people.</h2><p className="mt-5 text-sm leading-6 text-accent-foreground/80">Share the basics and ask the team about what may be possible for your group.</p></div></div><div className="mt-10 rounded-[2rem] border border-border bg-card p-6 sm:p-10">{sent ? <SuccessState title="The event enquiry is ready" body="WhatsApp should have opened. Send the message there so the team can start planning with you." reset={() => setSent(false)} /> : <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><p className="eyebrow">Event enquiry</p><h2 className="mt-2 font-display text-4xl text-primary dark:text-foreground">Let’s plan the shape of it.</h2></div><FormField label="Your name" name="name" placeholder="Full name" /><FormField label="Mobile number" name="phone" type="tel" placeholder="+91" /><FormField label="What are you celebrating?" name="occasion" placeholder="Birthday, family lunch, anniversary..." /><FormField label="Preferred date" name="date" type="date" /><FormField label="Approx. guests" name="guests" type="number" placeholder="e.g. 25" /><FormField label="A few details" name="details" placeholder="Timing, food preferences, anything else" /><div className="sm:col-span-2"><button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground hover:bg-primary/90" data-testid="button-submit-event"><MessageCircle size={17} /> Enquire on WhatsApp</button><p className="mt-3 text-center text-xs text-muted-foreground">No fixed packages are shown here because details are confirmed case by case.</p></div></form>}</div></section></PageFrame>;
}

function SuccessState({ title, body, reset }: { title: string; body: string; reset: () => void }) {
  return <div className="py-8 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary"><Check /></div><h2 className="mt-5 font-display text-4xl text-primary dark:text-foreground">{title}</h2><p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">{body}</p><button onClick={reset} className="focus-ring mt-7 rounded-full border border-border px-5 py-3 text-sm font-bold hover:border-accent hover:text-accent" data-testid="button-new-enquiry">Start another enquiry</button></div>;
}

function TakeawayPage() {
  const [cart, setCart] = useState<Record<string, number>>(() => { try { return JSON.parse(localStorage.getItem('aapulaki-cart') || '{}'); } catch { return {}; } });
  useEffect(() => { localStorage.setItem('aapulaki-cart', JSON.stringify(cart)); }, [cart]);
  const count = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const total = menuItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const add = (id: string) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const remove = (id: string) => setCart((current) => { const next = { ...current, [id]: Math.max((current[id] || 0) - 1, 0) }; if (!next[id]) delete next[id]; return next; });
  const sendOrder = () => {
    const lines = menuItems.filter((item) => cart[item.id]).map((item) => `${item.name} x ${cart[item.id]}`).join('\n');
    openWhatsApp(`Takeaway enquiry for Hotel Aapulaki Garden\n${lines}\nSample total: ₹ ${total}\nPlease confirm availability, current pricing and pickup timing.`);
  };
  return <PageFrame><PageIntro eyebrow="Takeaway, without the guesswork" title="Pack the good part for the road home.">Build a sample order below. It stays in this browser, then moves to WhatsApp when you are ready. Please confirm current availability and pricing before payment.</PageIntro><section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 lg:grid-cols-[1fr_360px] lg:px-8"><div><div className="grid gap-4 sm:grid-cols-2">{menuItems.map((item) => <article key={item.id} className="rounded-[1.5rem] border border-border bg-card p-5" data-testid={`card-takeaway-${item.id}`}><div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-2xl text-primary dark:text-foreground">{item.name}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p></div><span className="shrink-0 font-display text-xl text-primary dark:text-foreground">₹{item.price}</span></div><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">{item.veg ? 'Vegetarian' : 'Non-vegetarian'}</span><div className="flex items-center gap-3"><button onClick={() => remove(item.id)} disabled={!cart[item.id]} className="focus-ring rounded-full border border-border p-2 disabled:cursor-not-allowed disabled:opacity-35 hover:border-accent" aria-label={`Remove one ${item.name}`} data-testid={`button-remove-${item.id}`}><Minus size={15} /></button><span className="w-4 text-center font-bold" data-testid={`text-quantity-${item.id}`}>{cart[item.id] || 0}</span><button onClick={() => add(item.id)} className="focus-ring rounded-full bg-accent p-2 text-accent-foreground hover:-translate-y-0.5" aria-label={`Add one ${item.name}`} data-testid={`button-add-${item.id}`}><Plus size={15} /></button></div></div></article>)}</div></div><aside className="h-fit rounded-[2rem] bg-primary p-6 text-primary-foreground lg:sticky lg:top-28"><div className="flex items-center justify-between"><div><p className="eyebrow !text-secondary">Your basket</p><h2 className="mt-2 font-display text-4xl">Ready when you are.</h2></div><ShoppingBag className="text-accent" /></div>{count ? <div className="mt-8 space-y-3 border-y border-primary-foreground/15 py-5">{menuItems.filter((item) => cart[item.id]).map((item) => <div key={item.id} className="flex items-center justify-between gap-3 text-sm"><span>{item.name} <span className="text-primary-foreground/55">× {cart[item.id]}</span></span><button onClick={() => setCart((current) => { const next = { ...current }; delete next[item.id]; return next; })} className="focus-ring text-primary-foreground/55 hover:text-accent" aria-label={`Remove ${item.name} from basket`} data-testid={`button-delete-${item.id}`}><Trash2 size={15} /></button></div>)}</div> : <div className="mt-8 border-y border-primary-foreground/15 py-8 text-sm text-primary-foreground/65">Your basket is empty. Add a dish to start the enquiry.</div>}<div className="mt-5 flex items-end justify-between"><span className="text-sm text-primary-foreground/65">Sample total</span><span className="font-display text-3xl">₹ {total}</span></div><button disabled={!count} onClick={sendOrder} className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-bold text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40" data-testid="button-send-order"><MessageCircle size={17} /> Send order on WhatsApp</button><button disabled={!count} onClick={() => setCart({})} className="focus-ring mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/20 px-5 py-3 text-sm font-bold text-primary-foreground/70 disabled:cursor-not-allowed disabled:opacity-30" data-testid="button-clear-cart">Clear basket</button><p className="mt-5 text-xs leading-5 text-primary-foreground/45">Sample prices only. The team will confirm your final order, availability and pickup time.</p></aside></section></PageFrame>;
}

function ReviewsPage() {
  return <PageFrame><PageIntro eyebrow="A note on reviews" title="We would rather show you the real thing.">Verified guest reviews are not connected to this site yet. We will not invent ratings, quotes or awards.</PageIntro><section className="mx-auto max-w-5xl px-4 pb-20 lg:px-8"><div className="rounded-[2.5rem] bg-secondary/50 p-8 text-center sm:p-14"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-accent"><Check /></div><h2 className="mt-7 font-display text-5xl text-primary dark:text-foreground">Looking for what guests are saying?</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">Please visit the official Google listing for the latest guest feedback, directions and business information.</p><a href={MAPS_URL} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground" data-testid="link-google-reviews"><ExternalLink size={17} /> Open Google listing</a></div><div className="mt-7 grid gap-5 sm:grid-cols-3"><div className="rounded-[1.5rem] border border-border bg-card p-6"><p className="eyebrow">No invented claims</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Ratings and awards belong to verified sources, not a placeholder page.</p></div><div className="rounded-[1.5rem] border border-border bg-card p-6"><p className="eyebrow">Your words matter</p><p className="mt-3 text-sm leading-6 text-muted-foreground">The Google listing is the right place to read or leave a review.</p></div><div className="rounded-[1.5rem] border border-border bg-card p-6"><p className="eyebrow">Come taste first</p><p className="mt-3 text-sm leading-6 text-muted-foreground">The most useful review is the one you make after your own table.</p></div></div></section></PageFrame>;
}

function ContactPage() {
  return <PageFrame><PageIntro eyebrow="Call, message, find us" title="Easy to reach. Easier to stay for dinner.">For current hours, menu availability, group plans or anything that is better answered by a person, use the channel that suits you.</PageIntro><section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"><ContactCard icon={<Phone />} title="Call the team" body={PHONE} href={PHONE_LINK} label="Call now" testId="link-contact-call" /><ContactCard icon={<MessageCircle />} title="WhatsApp" body="Ask about today’s table, menu or takeaway." href={whatsappUrl('Hello Hotel Aapulaki Garden, I have a question.')} label="Start chat" testId="link-contact-whatsapp" /><ContactCard icon={<Navigation />} title="Get directions" body={ADDRESS} href={MAPS_URL} label="Open map" testId="link-contact-directions" /><ContactCard icon={<Clock3 />} title="Hours" body="Hours to be confirmed. Please call before setting out." href={PHONE_LINK} label="Confirm by phone" testId="link-contact-hours" /></section><section className="border-y border-border bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_1fr] lg:px-8"><div><p className="eyebrow !text-secondary">Aapulaki, in one line</p><h2 className="mt-4 font-display text-5xl leading-none">Garden dining on the Talegaon–Chakan road.</h2></div><div className="flex items-end"><ActionRail /></div></div></section></PageFrame>;
}

function ContactCard({ icon, title, body, href, label, testId }: { icon: ReactNode; title: string; body: string; href: string; label: string; testId: string }) {
  return <article className="flex min-h-[260px] flex-col rounded-[2rem] border border-border bg-card p-6"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">{icon}</div><h2 className="mt-9 font-display text-3xl text-primary dark:text-foreground">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="focus-ring mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-accent hover:gap-3" data-testid={testId}>{label} <ArrowRight size={15} /></a></article>;
}

function LocationPage() {
  return <PageFrame><PageIntro eyebrow="Find your way here" title="Take the highway. Follow the appetite.">The easiest way to arrive is with the official Google Maps pin open before you set out.</PageIntro><section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8"><div className="relative min-h-[440px] overflow-hidden rounded-[2.5rem] bg-primary p-7 text-primary-foreground sm:p-10"><div className="absolute right-[-5rem] top-[-4rem] h-72 w-72 rounded-full border-[34px] border-accent/60" /><div className="absolute bottom-[-6rem] left-[-3rem] h-52 w-52 rounded-full border-[22px] border-secondary/30" /><div className="relative z-10 flex h-full flex-col justify-between"><div><MapPin size={28} className="text-accent" /><p className="eyebrow mt-12 !text-secondary">Official address</p><h2 className="mt-3 max-w-lg font-display text-5xl leading-none">{ADDRESS}</h2></div><a href={MAPS_URL} target="_blank" rel="noreferrer" className="focus-ring mt-12 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground" data-testid="link-location-map"><ExternalLink size={17} /> Open in Google Maps</a></div></div><div className="flex flex-col justify-between rounded-[2.5rem] border border-border bg-card p-7 sm:p-10"><div><p className="eyebrow">Coordinates</p><p className="mt-3 font-mono text-lg text-primary dark:text-foreground">18.7353914, 73.7106252</p><div className="my-8 h-px bg-border" /><p className="eyebrow">Before you leave</p><ul className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground"><li className="flex gap-3"><Check className="mt-1 shrink-0 text-accent" size={16} />Call to confirm hours.</li><li className="flex gap-3"><Check className="mt-1 shrink-0 text-accent" size={16} />Ask about the current menu and table availability.</li><li className="flex gap-3"><Check className="mt-1 shrink-0 text-accent" size={16} />For groups, send an enquiry ahead of time.</li></ul></div><ActionRail /></div></section></PageFrame>;
}

function FaqPage() {
  const [active, setActive] = useState<number | null>(0);
  return <PageFrame><PageIntro eyebrow="Good to know" title="Questions before the first visit?">A few practical answers, kept current and honest.</PageIntro><section className="mx-auto grid max-w-5xl gap-3 px-4 pb-20 lg:px-8">{faqItems.map((item, index) => <div key={item.q} className="rounded-[1.5rem] border border-border bg-card"><button onClick={() => setActive(active === index ? null : index)} className="focus-ring flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7" aria-expanded={active === index} aria-controls={`faq-answer-${index}`} data-testid={`button-faq-${index}`}><span className="font-display text-2xl text-primary dark:text-foreground">{item.q}</span><ChevronDown size={20} className={`shrink-0 text-accent transition-transform ${active === index ? 'rotate-180' : ''}`} /></button>{active === index && <div id={`faq-answer-${index}`} className="px-5 pb-6 text-sm leading-7 text-muted-foreground sm:px-7">{item.a}</div>}</div>)}</section><section className="mx-auto max-w-5xl px-4 pb-20 lg:px-8"><div className="rounded-[2rem] bg-secondary/50 p-7 sm:flex sm:items-center sm:justify-between sm:gap-8"><div><p className="eyebrow">Still unsure?</p><h2 className="mt-2 font-display text-3xl text-primary dark:text-foreground">Ask the people who know today.</h2></div><a href={whatsappUrl('Hello Hotel Aapulaki Garden, I have a question before visiting.')} target="_blank" rel="noreferrer" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground sm:mt-0" data-testid="link-faq-whatsapp"><MessageCircle size={17} /> Ask on WhatsApp</a></div></section></PageFrame>;
}

function AppShell() {
  return <div className="texture flex min-h-[100dvh] flex-col"><Header /><main className="flex-1"><Router /></main><Footer /></div>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Home} /><Route path="/menu" component={MenuPage} /><Route path="/gallery" component={GalleryPage} /><Route path="/offers" component={OffersPage} /><Route path="/events" component={EventPage} /><Route path="/reservation" component={ReservationPage} /><Route path="/takeaway" component={TakeawayPage} /><Route path="/reviews" component={ReviewsPage} /><Route path="/contact" component={ContactPage} /><Route path="/location" component={LocationPage} /><Route path="/faq" component={FaqPage} /><Route component={NotFoundPage} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><AppShell /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
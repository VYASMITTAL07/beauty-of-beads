// Country + subdivision data for worldwide shipping addresses.
//
// The dataset is ~340KB of JSON (249 countries, ~4,400 regions), which must
// never sit in the main bundle — it would undo the work done to get the
// storefront's JavaScript down. It is therefore loaded with a dynamic import,
// so the bundler emits it as its own chunk that is only fetched the first time
// someone actually opens an address form (profile, checkout, or confirming a
// custom order). The promise is cached, so the three forms share one fetch.

export type GeoRegion = { name: string; code: string };
export type GeoCountry = { name: string; code: string; regions: GeoRegion[] };

type RawCountry = {
  countryName: string;
  countryShortCode: string;
  regions?: { name: string; shortCode?: string }[];
};

export const DEFAULT_COUNTRY = "India";

let countriesPromise: Promise<GeoCountry[]> | null = null;

export function loadCountries(): Promise<GeoCountry[]> {
  if (countriesPromise) return countriesPromise;
  countriesPromise = import("country-region-data/data.json").then((mod) => {
    const raw = (mod.default ?? mod) as unknown as RawCountry[];
    return raw.map((c) => ({
      name: c.countryName,
      code: c.countryShortCode,
      regions: (c.regions ?? []).map((r) => ({ name: r.name, code: r.shortCode || r.name })),
    }));
  });
  return countriesPromise;
}

export function findCountry(countries: GeoCountry[], name: string): GeoCountry | null {
  if (!name) return null;
  const wanted = name.trim().toLowerCase();
  return countries.find((c) => c.name.toLowerCase() === wanted) || null;
}

// Postal-code rules vary far too much to validate properly for 249 countries,
// so only India — where essentially all orders are, and where a wrong PIN
// means a failed delivery — gets a strict rule. Everywhere else just has to
// look plausible, matching the loose check the API applies.
const INDIA_PIN = /^[1-9][0-9]{5}$/;
const GENERIC_POSTAL = /^[A-Za-z0-9][A-Za-z0-9\s-]{2,11}$/;

export function isValidPostalCode(value: string, country: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (country.trim().toLowerCase() === "india") return INDIA_PIN.test(v);
  return GENERIC_POSTAL.test(v);
}

export function postalLabel(country: string): string {
  return country.trim().toLowerCase() === "india" ? "PIN code" : "Postal / ZIP code";
}

export function postalPlaceholder(country: string): string {
  return country.trim().toLowerCase() === "india" ? "251001" : "e.g. SW1A 1AA";
}

// Most countries call these "states"; enough call them something else that a
// generic label reads better than calling a French département a state.
export function regionLabel(country: string): string {
  const c = country.trim().toLowerCase();
  if (c === "india" || c === "united states" || c === "australia" || c === "brazil") return "State";
  if (c === "canada") return "Province";
  if (c === "united kingdom") return "County / region";
  return "State / province / region";
}

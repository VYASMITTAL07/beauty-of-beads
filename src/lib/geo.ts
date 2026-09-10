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

// International dialling codes, by ISO-3166 alpha-2.
//
// Checkout asked for a phone number "with country code" and left the customer
// to know their own — plenty typed a bare local number, which the form then
// rejected without explaining why. Picking a country now fills the code in.
//
// Kept here rather than in the 340KB region dataset (which carries no dialling
// codes) because this is a couple of KB and is needed the moment the form
// opens. Covers every country that dataset lists.
const DIAL_CODES: Record<string, string> = {
  AF: "93", AX: "358", AL: "355", DZ: "213", AS: "1684", AD: "376", AO: "244", AI: "1264",
  AQ: "672", AG: "1268", AR: "54", AM: "374", AW: "297", AU: "61", AT: "43", AZ: "994",
  BS: "1242", BH: "973", BD: "880", BB: "1246", BY: "375", BE: "32", BZ: "501", BJ: "229",
  BM: "1441", BT: "975", BO: "591", BQ: "599", BA: "387", BW: "267", BV: "47", BR: "55",
  IO: "246", BN: "673", BG: "359", BF: "226", BI: "257", KH: "855", CM: "237", CA: "1",
  CV: "238", KY: "1345", CF: "236", TD: "235", CL: "56", CN: "86", CX: "61", CC: "61",
  CO: "57", KM: "269", CG: "242", CD: "243", CK: "682", CR: "506", CI: "225", HR: "385",
  CU: "53", CW: "599", CY: "357", CZ: "420", DK: "45", DJ: "253", DM: "1767", DO: "1809",
  EC: "593", EG: "20", SV: "503", GQ: "240", ER: "291", EE: "372", ET: "251", FK: "500",
  FO: "298", FJ: "679", FI: "358", FR: "33", GF: "594", PF: "689", TF: "262", GA: "241",
  GM: "220", GE: "995", DE: "49", GH: "233", GI: "350", GR: "30", GL: "299", GD: "1473",
  GP: "590", GU: "1671", GT: "502", GG: "44", GN: "224", GW: "245", GY: "592", HT: "509",
  HM: "672", VA: "39", HN: "504", HK: "852", HU: "36", IS: "354", IN: "91", ID: "62",
  IR: "98", IQ: "964", IE: "353", IM: "44", IL: "972", IT: "39", JM: "1876", JP: "81",
  JE: "44", JO: "962", KZ: "7", KE: "254", KI: "686", KP: "850", KR: "82", XK: "383",
  KW: "965", KG: "996", LA: "856", LV: "371", LB: "961", LS: "266", LR: "231", LY: "218",
  LI: "423", LT: "370", LU: "352", MO: "853", MK: "389", MG: "261", MW: "265", MY: "60",
  MV: "960", ML: "223", MT: "356", MH: "692", MQ: "596", MR: "222", MU: "230", YT: "262",
  MX: "52", FM: "691", MD: "373", MC: "377", MN: "976", ME: "382", MS: "1664", MA: "212",
  MZ: "258", MM: "95", NA: "264", NR: "674", NP: "977", NL: "31", NC: "687", NZ: "64",
  NI: "505", NE: "227", NG: "234", NU: "683", NF: "672", MP: "1670", NO: "47", OM: "968",
  PK: "92", PW: "680", PS: "970", PA: "507", PG: "675", PY: "595", PE: "51", PH: "63",
  PN: "64", PL: "48", PT: "351", PR: "1787", QA: "974", RE: "262", RO: "40", RU: "7",
  RW: "250", BL: "590", SH: "290", KN: "1869", LC: "1758", MF: "590", PM: "508", VC: "1784",
  WS: "685", SM: "378", ST: "239", SA: "966", SN: "221", RS: "381", SC: "248", SL: "232",
  SG: "65", SX: "1721", SK: "421", SI: "386", SB: "677", SO: "252", ZA: "27", GS: "500",
  SS: "211", ES: "34", LK: "94", SD: "249", SR: "597", SZ: "268", SE: "46", CH: "41",
  SY: "963", TW: "886", TJ: "992", TZ: "255", TH: "66", TL: "670", TG: "228", TK: "690",
  TO: "676", TT: "1868", TN: "216", TR: "90", TM: "993", TC: "1649", TV: "688", UG: "256",
  UA: "380", AE: "971", GB: "44", US: "1", UM: "1", UY: "598", UZ: "998", VU: "678",
  VE: "58", VN: "84", VG: "1284", VI: "1340", WF: "681", EH: "212", YE: "967", ZM: "260",
  ZW: "263",
};

/** The dialling code for a country, by the name shown in the picker. Resolves
 *  to null for a name that isn't in the dataset. loadCountries() is cached, so
 *  after the address form's first render this answers immediately. */
export async function dialCodeForCountry(name: string): Promise<string | null> {
  if (!name) return null;
  const countries = await loadCountries();
  const match = findCountry(countries, name);
  return match ? DIAL_CODES[match.code] ?? null : null;
}

export function dialCodeForIso(code: string): string | null {
  return DIAL_CODES[code?.toUpperCase()] ?? null;
}

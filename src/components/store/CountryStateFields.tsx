import { useEffect, useState } from "react";
import { loadCountries, findCountry, regionLabel, type GeoCountry } from "@/lib/geo";

// Country + subdivision pickers, shared by all three address forms (profile,
// checkout, and confirming an admin-built custom order) so worldwide shipping
// behaves identically everywhere.
//
// Each form supplies its own field/label classes rather than this owning any
// styling, because the three sit in visually different surfaces.
export function CountryStateFields({
  country,
  onCountryChange,
  state,
  onStateChange,
  fieldClass,
  labelClass,
  idPrefix,
  stateRequired = false,
}: {
  country: string;
  onCountryChange: (v: string) => void;
  state: string;
  onStateChange: (v: string) => void;
  fieldClass: string;
  labelClass: string;
  idPrefix: string;
  stateRequired?: boolean;
}) {
  const [countries, setCountries] = useState<GeoCountry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadCountries()
      .then((list) => !cancelled && setCountries(list))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = countries ? findCountry(countries, country) : null;
  const regions = selected?.regions ?? [];

  // If the saved state isn't one of the selected country's regions (e.g. the
  // customer just switched country), don't silently keep a mismatched value —
  // show it as unselected so they have to pick again.
  const stateMatches = regions.some((r) => r.name === state);

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idPrefix}-country`} className={labelClass}>
          Country
        </label>
        {countries && !failed ? (
          <select
            id={`${idPrefix}-country`}
            required
            value={selected ? selected.name : ""}
            onChange={(e) => {
              onCountryChange(e.target.value);
              onStateChange(""); // regions differ per country
            }}
            className={fieldClass}
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        ) : (
          // Still loading, or the chunk failed to load — a plain text box keeps
          // the form usable rather than blocking checkout on a data fetch.
          <input
            id={`${idPrefix}-country`}
            required
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            placeholder={failed ? "Country" : "Loading countries…"}
            className={fieldClass}
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idPrefix}-state`} className={labelClass}>
          {regionLabel(country)}
          {!stateRequired && <span className="normal-case tracking-normal text-foreground/35"> (optional)</span>}
        </label>
        {regions.length > 0 ? (
          <select
            id={`${idPrefix}-state`}
            required={stateRequired}
            value={stateMatches ? state : ""}
            onChange={(e) => onStateChange(e.target.value)}
            className={fieldClass}
          >
            <option value="">Select</option>
            {regions.map((r) => (
              <option key={r.code} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={`${idPrefix}-state`}
            required={stateRequired}
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            placeholder={country ? "" : "Pick a country first"}
            className={fieldClass}
          />
        )}
      </div>
    </>
  );
}

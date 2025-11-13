import React from "react";
import { LANGUAGES, LICENSES } from "../utils/index.js";

const Filters = ({
  language,
  license,
  starsMin,
  starsMax,
  onLanguageChange,
  onLicenseChange,
  onStarsMinChange,
  onStarsMaxChange,
  onReset,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-primary hover:text-primary-800 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="input-field"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang === "any" ? "Any Language" : lang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="license"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            License
          </label>
          <select
            id="license"
            value={license}
            onChange={(e) => onLicenseChange(e.target.value)}
            className="input-field"
          >
            {LICENSES.map((lic) => (
              <option key={lic} value={lic}>
                {lic === "any" ? "Any License" : lic.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stars Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={starsMin}
              onChange={(e) => onStarsMinChange(e.target.value)}
              className="input-field"
              min="0"
            />
            <input
              type="number"
              placeholder="Max"
              value={starsMax}
              onChange={(e) => onStarsMaxChange(e.target.value)}
              className="input-field"
              min="0"
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Leave empty for no limit
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Popular Ranges
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                onStarsMinChange("1000");
                onStarsMaxChange("");
              }}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              1K+ stars
            </button>
            <button
              onClick={() => {
                onStarsMinChange("5000");
                onStarsMaxChange("");
              }}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              5K+ stars
            </button>
            <button
              onClick={() => {
                onStarsMinChange("10000");
                onStarsMaxChange("");
              }}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              10K+ stars
            </button>
            <button
              onClick={() => {
                onStarsMinChange("");
                onStarsMaxChange("100");
              }}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Under 100
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Filters);

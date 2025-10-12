"use client";

import React, { useState } from "react";
import { useI18n } from "../../i18n";

export default function OrderForm({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    telefon: "",
    email: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    stadt: "",
    versicherungsart: "gesetzlich" as "gesetzlich" | "privat",
    versicherungsnummer: "",
    versicherungsbestaetigung: false,
    rezept: false,
    ueberweisung: false,
    krankenschein: false,
    rezeptErlaeuterung: "",
    ueberweisungErlaeuterung: "",
    krankenscheinErlaeuterung: "",
  });

  const validateField = (name: string, value: string | boolean) => {
    let error = "";
    
    switch (name) {
      case "vorname":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.firstName");
        }
        break;
      case "nachname":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.lastName");
        }
        break;
      case "telefon":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.phone");
        }
        break;
      case "email":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.email");
        } else if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t("validation.invalid.email");
        }
        break;
      case "strasse":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.street");
        }
        break;
      case "hausnummer":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.houseNumber");
        }
        break;
      case "plz":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.zipCode");
        }
        break;
      case "stadt":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.city");
        }
        break;
      case "versicherungsnummer":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = t("validation.required.insuranceNumber");
        } else if (typeof value === "string" && formData.versicherungsart === "gesetzlich") {
          const insuranceRegex = /^[A-Z]\d{9}$/;
          if (!insuranceRegex.test(value)) {
            error = t("validation.insurance.format");
          }
        }
        break;
    }
    
    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear field error when user starts typing
      if (fieldErrors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one order type is selected
    if (!formData.rezept && !formData.ueberweisung && !formData.krankenschein) {
      setError(t("bestellung.selectAtLeastOne"));
      return;
    }

    // Validate insurance number for gesetzlich (public insurance)
    if (formData.versicherungsart === "gesetzlich") {
      const insuranceRegex = /^[A-Z]\d{9}$/;
      if (!insuranceRegex.test(formData.versicherungsnummer)) {
        setError(t("validation.insurance.format"));
        return;
      }
    }

    if (!formData.versicherungsbestaetigung) {
      setError("Bitte bestätigen Sie die Versicherungsbestimmungen");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const orderData = {
        patient: {
          vorname: formData.vorname,
          nachname: formData.nachname,
          telefon: formData.telefon,
          email: formData.email,
          strasse: formData.strasse,
          hausnummer: formData.hausnummer,
          plz: formData.plz,
          stadt: formData.stadt,
          versicherungsart: formData.versicherungsart,
          versicherungsnummer: formData.versicherungsnummer,
        },
        orders: [] as any[],
      };

      // Add selected order types with their explanations
      if (formData.rezept) {
        orderData.orders.push({
          type: "rezept",
          erlaeuterung: formData.rezeptErlaeuterung,
        });
      }
      if (formData.ueberweisung) {
        orderData.orders.push({
          type: "ueberweisung",
          erlaeuterung: formData.ueberweisungErlaeuterung,
        });
      }
      if (formData.krankenschein) {
        orderData.orders.push({
          type: "krankenschein",
          erlaeuterung: formData.krankenscheinErlaeuterung,
        });
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fehler beim Senden der Bestellung");
      }

      setSuccess(true);
      setFormData({
        vorname: "",
        nachname: "",
        telefon: "",
        email: "",
        strasse: "",
        hausnummer: "",
        plz: "",
        stadt: "",
        versicherungsart: "gesetzlich",
        versicherungsnummer: "",
        versicherungsbestaetigung: false,
        rezept: false,
        ueberweisung: false,
        krankenschein: false,
        rezeptErlaeuterung: "",
        ueberweisungErlaeuterung: "",
        krankenscheinErlaeuterung: "",
      });

      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || t("bestellung.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-bold text-[#EEC16B] mb-4">
          {t("bestellung.personalInfo")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.name")} *
            </label>
            <input
              type="text"
              name="vorname"
              onBlur={handleBlur}
              value={formData.vorname}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.vorname ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="Max"
            />
            {fieldErrors.vorname && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.vorname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.nachname")} *
            </label>
            <input
              type="text"
              name="nachname"
              onBlur={handleBlur}
              value={formData.nachname}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.nachname ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="Mustermann"
            />
            {fieldErrors.nachname && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.nachname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.telefon")} *
            </label>
            <input
              type="tel"
              name="telefon"
              onBlur={handleBlur}
              value={formData.telefon}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.telefon ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="+49 123 456789"
            />
            {fieldErrors.telefon && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.telefon}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.email")} *
            </label>
            <input
              type="email"
              name="email"
              onBlur={handleBlur}
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="max@beispiel.de"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.strasse")} *
            </label>
            <input
              type="text"
              name="strasse"
              onBlur={handleBlur}
              value={formData.strasse}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.strasse ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="Musterstraße"
            />
            {fieldErrors.strasse && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.strasse}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.hausnummer")} *
            </label>
            <input
              type="text"
              name="hausnummer"
              onBlur={handleBlur}
              value={formData.hausnummer}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.hausnummer ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="123"
            />
            {fieldErrors.hausnummer && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.hausnummer}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.plz")} *
            </label>
            <input
              type="text"
              name="plz"
              onBlur={handleBlur}
              value={formData.plz}
              onChange={handleInputChange}
              required
              pattern="[0-9]{5}"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.plz ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="12345"
            />
            {fieldErrors.plz && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.plz}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.stadt")} *
            </label>
            <input
              type="text"
              name="stadt"
              onBlur={handleBlur}
              value={formData.stadt}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.stadt ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="Musterstadt"
            />
            {fieldErrors.stadt && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.stadt}</p>
            )}
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div>
        <h3 className="text-lg font-bold text-[#EEC16B] mb-4">
          {t("bestellung.insurance")}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Versicherungsart *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="versicherungsart"
                  value="gesetzlich"
                  checked={formData.versicherungsart === "gesetzlich"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {t("bestellung.gesetzlich")}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="versicherungsart"
                  value="privat"
                  checked={formData.versicherungsart === "privat"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {t("bestellung.privat")}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("bestellung.versicherungsnummer")} *
            </label>
            <input
              onBlur={handleBlur}
              type="text"
              name="versicherungsnummer"
              value={formData.versicherungsnummer}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors.versicherungsnummer ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
              }`}
              placeholder="A123456789"
            />
            {fieldErrors.versicherungsnummer && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.versicherungsnummer}</p>
            )}
          </div>
        </div>
      </div>

      {/* Order Type Selection */}
      <div>
        <h3 className="text-lg font-bold text-[#EEC16B] mb-4">
          {t("bestellung.orderType")}
        </h3>
        <div className="space-y-4">
          {/* Rezept */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="rezept"
                checked={formData.rezept}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="font-semibold text-gray-800">
                {t("bestellung.rezept")}
              </span>
            </label>
            {formData.rezept && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bestellung.erlaeuterung")} *
                </label>
                <textarea
                  name="rezeptErlaeuterung"
                  value={formData.rezeptErlaeuterung}
                  onChange={handleInputChange}
                  required={formData.rezept}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#EEC16B]"
                  placeholder={t("bestellung.erlaeuterungPlaceholder")}
                />
              </div>
            )}
          </div>

          {/* Überweisung */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="ueberweisung"
                checked={formData.ueberweisung}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="font-semibold text-gray-800">
                {t("bestellung.ueberweisung")}
              </span>
            </label>
            {formData.ueberweisung && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bestellung.erlaeuterung")} *
                </label>
                <textarea
                  name="ueberweisungErlaeuterung"
                  value={formData.ueberweisungErlaeuterung}
                  onChange={handleInputChange}
                  required={formData.ueberweisung}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#EEC16B]"
                  placeholder={t("bestellung.erlaeuterungPlaceholder")}
                />
              </div>
            )}
          </div>

          {/* Krankenschein */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="krankenschein"
                checked={formData.krankenschein}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="font-semibold text-gray-800">
                {t("bestellung.krankenschein")}
              </span>
            </label>
            {formData.krankenschein && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bestellung.erlaeuterung")} *
                </label>
                <textarea
                  name="krankenscheinErlaeuterung"
                  value={formData.krankenscheinErlaeuterung}
                  onChange={handleInputChange}
                  required={formData.krankenschein}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#EEC16B]"
                  placeholder={t("bestellung.erlaeuterungPlaceholder")}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insurance Confirmation - At the end */}
      <div className="border-t border-gray-200 pt-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="versicherungsbestaetigung"
            checked={formData.versicherungsbestaetigung}
            onChange={handleInputChange}
            required
            className="mt-1 mr-3"
          />
          <span className="text-sm text-gray-700">
            {t("bestellung.insuranceConfirmation")} *
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#EEC16B] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#d4a856] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? t("bestellung.submitting") : t("bestellung.submit")}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {t("bestellung.success")}
        </div>
      )}
    </form>
  );
}

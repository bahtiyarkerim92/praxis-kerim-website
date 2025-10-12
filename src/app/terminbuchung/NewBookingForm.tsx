"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "../../i18n";
import type { Slot } from "./types";

interface Doctor {
  _id: string;
  name: string;
  priority?: number;
  fachrichtung?: string;
}

interface NewBookingFormProps {
  onSuccess: () => void;
}

export default function NewBookingForm({ onSuccess }: NewBookingFormProps) {
  const { t } = useI18n();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showFridayMessage, setShowFridayMessage] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    geburtsdatum: "",
    telefon: "",
    adresse: "",
    versicherungsnummer: "",
    versicherungsart: "gesetzlich" as "privat" | "gesetzlich",
    versicherungsbestaetigung: false,
  });

  // Fetch doctors and holidays on mount
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        // Sort doctors by priority (ascending), then by name (A-Z)
        const sortedDoctors = data.sort((a: Doctor, b: Doctor) => {
          // First, sort by priority (lower number = higher priority)
          const priorityA = a.priority || 999;
          const priorityB = b.priority || 999;
          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }
          // If same priority, sort alphabetically by name
          return a.name.localeCompare(b.name, 'de');
        });
        setDoctors(sortedDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Fehler beim Laden der Ärzte");
      } finally {
        setLoadingDoctors(false);
      }
    }
    
    async function fetchHolidays() {
      try {
        const res = await fetch("/api/holidays");
        if (res.ok) {
          const data = await res.json();
          // Extract date strings from holidays
          setHolidays(data.map((h: any) => h.date));
        }
      } catch (err) {
        console.error("Error fetching holidays:", err);
        // Non-critical, continue without holidays
      }
    }
    
    fetchDoctors();
    fetchHolidays();
  }, []);

  // Fetch available slots when doctor and date are selected
  useEffect(() => {
    if (!selectedDoctorId || !selectedDate) {
      setAvailableSlots([]);
      return;
    }

    async function fetchSlots() {
      if (!selectedDate) return; // Extra null check
      
      setLoadingSlots(true);
      setError("");
      try {
        // Format date as YYYY-MM-DD in local timezone (not UTC)
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        console.log('📅 Selected date:', selectedDate, 'formatted as:', dateStr);
        
        const url = `/api/appointments?status=frei&date=${dateStr}&doctorId=${selectedDoctorId}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch slots");
        const data = await res.json();
        
        console.log('📦 Received slots:', data);
        
        // Transform data to include doctorName and filter by the selected date
        const selectedDoctor = doctors.find(d => d._id === selectedDoctorId);
        const slotsWithNames = data
          .map((slot: any) => ({
            ...slot,
            doctorName: selectedDoctor?.name || slot.doctorName || "Praxis Dr. Kerim",
          }))
          .filter((slot: any) => {
            // Double-check that the slot matches the selected date
            return slot.date === dateStr;
          });
        
        console.log('✅ Filtered slots for', dateStr, ':', slotsWithNames.length);
        
        setAvailableSlots(slotsWithNames);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setError("Fehler beim Laden der verfügbaren Termine");
      } finally {
        setLoadingSlots(false);
      }
    }
    
    fetchSlots();
  }, [selectedDoctorId, selectedDate, doctors]);

  const validateField = (name: string, value: string | boolean) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = "Name ist erforderlich";
        }
        break;
      case "email":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = "E-Mail ist erforderlich";
        } else if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Ungültige E-Mail-Adresse";
        }
        break;
      case "geburtsdatum":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = "Geburtsdatum ist erforderlich";
        }
        break;
      case "telefon":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = "Telefonnummer ist erforderlich";
        }
        break;
      case "adresse":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = "Adresse ist erforderlich";
        }
        break;
      case "versicherungsnummer":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          error = "Versicherungsnummer ist erforderlich";
        } else if (typeof value === "string" && formData.versicherungsart === "gesetzlich") {
          const insuranceRegex = /^[A-Z]\d{9}$/;
          if (!insuranceRegex.test(value)) {
            error = "Format: 1 Buchstabe + 9 Ziffern (z.B. A123456789)";
          }
        }
        break;
    }
    
    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      setError("Bitte wählen Sie einen Termin aus");
      return;
    }

    // Validate insurance number for gesetzlich (public insurance)
    if (formData.versicherungsart === "gesetzlich") {
      const insuranceRegex = /^[A-Z]\d{9}$/;
      if (!insuranceRegex.test(formData.versicherungsnummer)) {
        setError("Versicherungsnummer für gesetzliche Versicherung muss aus 1 Buchstaben und 9 Ziffern bestehen (z.B. A123456789)");
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
      const res = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: selectedSlot,
          patient: formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fehler bei der Buchung");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        geburtsdatum: "",
        telefon: "",
        adresse: "",
        versicherungsnummer: "",
        versicherungsart: "gesetzlich",
        versicherungsbestaetigung: false,
      });
      setSelectedSlot(null);
      setSelectedDoctorId("");
      
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unbekannter Fehler");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get days for current month view
  const getMonthDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);
    
    // Add all days of the month
    for (let date = 1; date <= lastDay.getDate(); date++) {
      const day = new Date(year, month, date);
      day.setHours(0, 0, 0, 0);
      days.push(day);
    }
    
    return days;
  };

  const availableDays = getMonthDays();
  
  // Navigation functions
  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    
    // Don't allow going before current month
    const today = new Date();
    if (newMonth.getFullYear() < today.getFullYear() || 
        (newMonth.getFullYear() === today.getFullYear() && newMonth.getMonth() < today.getMonth())) {
      return;
    }
    
    setCurrentMonth(newMonth);
    setSelectedDate(null);
    setSelectedSlot(null);
  };
  
  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
    setSelectedSlot(null);
  };
  
  // Check if we can go to previous month
  const canGoPrevious = () => {
    const today = new Date();
    return currentMonth.getFullYear() > today.getFullYear() || 
           (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() > today.getMonth());
  };

  if (loadingDoctors) {
    return <div className="text-center py-8">Lädt Ärzte...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Doctor Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-[#EEC16B] mb-4">
            1. {t("terminbuchung.selectDoctor")}
          </h3>
          <select
            value={selectedDoctorId}
            onChange={(e) => {
              setSelectedDoctorId(e.target.value);
              setSelectedSlot(null);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EEC16B]"
            required
          >
            <option value="">{t("terminbuchung.selectDoctor")}</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} {doctor.fachrichtung ? `(${doctor.fachrichtung})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Calendar and Slots - Side by Side */}
        {selectedDoctorId && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-[#EEC16B] mb-4">
              2. {t("terminbuchung.selectDate")}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Calendar */}
              <div>
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    disabled={!canGoPrevious()}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Vorheriger Monat"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <h4 className="font-semibold text-gray-700">
                    {currentMonth.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
                  </h4>
                  
                  <button
                    type="button"
                    onClick={goToNextMonth}
                    className="p-2 rounded hover:bg-gray-100 transition-colors"
                    title="Nächster Monat"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {/* Weekday headers */}
                  {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 text-xs py-1">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {availableDays.map((date, index) => {
                    const dayOfWeek = date.getDay();
                    const isFirstWeek = index < 7;
                    const needsPadding = isFirstWeek && index === 0;
                    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isToday = date.toDateString() === today.toDateString();
                    const isPast = date < today;
                    
                    // Check if weekend (0 = Sunday, 6 = Saturday)
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                    const isFriday = dayOfWeek === 5;
                    
                    // Check if holiday
                    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    const isHoliday = holidays.includes(dateStr);
                    
                    const isDisabled = isWeekend || isHoliday || isPast;
                    
                    return (
                      <React.Fragment key={date.toISOString()}>
                        {needsPadding && [...Array(dayOfWeek)].map((_, i) => (
                          <div key={`padding-${i}`} className="aspect-square" />
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            if (isDisabled) return;
                            setSelectedDate(date);
                            setSelectedSlot(null);
                            setShowFridayMessage(isFriday);
                          }}
                          disabled={isDisabled}
                          className={`aspect-square text-xs font-semibold rounded border transition-all flex flex-col items-center justify-center ${
                            isDisabled
                              ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'bg-[#EEC16B] text-black border-[#EEC16B] ring-2 ring-[#EEC16B] ring-offset-2'
                              : isFriday
                              ? 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
                              : isToday
                              ? 'bg-yellow-50 border-yellow-400 text-yellow-900 hover:bg-yellow-100'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400'
                          }`}
                          title={
                            isWeekend 
                              ? t("terminbuchung.weekendClosed")
                              : isHoliday
                              ? t("terminbuchung.holidayClosed")
                              : isFriday
                              ? t("terminbuchung.fridayVideoOnly")
                              : ''
                          }
                        >
                          <div className={isSelected ? 'text-base' : 'text-xs'}>
                            {date.getDate()}
                          </div>
                          {isHoliday && (
                            <div className="text-[8px] mt-0.5">🎄</div>
                          )}
                          {isFriday && !isHoliday && (
                            <div className="text-[8px] mt-0.5">📹</div>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
                
                {/* Legend */}
                <div className="mt-4 space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-50 border border-blue-300 rounded"></div>
                    <span>📹 Freitag (Nur Videosprechstunde)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
                    <span>Wochenende / Feiertag</span>
                  </div>
                </div>
              </div>

              {/* Right: Available Slots */}
              <div className="border-l border-gray-200 pl-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  {selectedDate ? (
                    <>
                      Verfügbare Zeiten
                      <div className="text-sm font-normal text-gray-600 mt-1">
                        {selectedDate.toLocaleDateString("de-DE", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </div>
                    </>
                  ) : (
                    "Bitte wählen Sie ein Datum"
                  )}
                </h4>

                {/* Friday video-only message */}
                {showFridayMessage && selectedDate && (
                  <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">📹</span>
                      <div>
                        <div className="font-semibold text-blue-700 text-sm">
                          {t("terminbuchung.fridayVideoOnly")}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {t("terminbuchung.fridayVideoMessage")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!selectedDate ? (
                  <div className="text-gray-400 text-center py-8 text-sm">
                    ← Wählen Sie ein Datum im Kalender
                  </div>
                ) : selectedSlot ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="font-semibold text-yellow-700 mb-2">
                      {t("terminbuchung.selectedSlot")}:
                    </div>
                    <div className="text-xl font-bold">
                      {(() => {
                        // Parse the UTC datetime and display the time correctly
                        const slotDate = new Date(selectedSlot.when);
                        const hours = slotDate.getUTCHours();
                        const minutes = slotDate.getUTCMinutes();
                        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                      })()} Uhr
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Arzt: {selectedSlot.doctorName}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot(null)}
                      className="mt-3 text-sm underline text-yellow-700 hover:text-yellow-800"
                    >
                      Andere Uhrzeit wählen
                    </button>
                  </div>
                ) : loadingSlots ? (
                  <div className="text-center py-8">
                    <div className="animate-spin inline-block w-8 h-8 border-4 border-[#EEC16B] border-t-transparent rounded-full"></div>
                    <div className="mt-2 text-sm text-gray-600">Lädt verfügbare Termine...</div>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-gray-500 text-center py-8 text-sm">
                    {t("terminbuchung.noAvailableSlots")}
                    <div className="mt-2 text-xs">Bitte wählen Sie ein anderes Datum</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot._id}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-semibold py-3 px-3 rounded shadow border border-yellow-300 transition-all hover:scale-105"
                      >
                        <div className="text-lg">
                          {(() => {
                            // Parse the UTC datetime and display the time correctly
                            const slotDate = new Date(slot.when);
                            const hours = slotDate.getUTCHours();
                            const minutes = slotDate.getUTCMinutes();
                            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                          })()}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Personal Information */}
        {selectedSlot && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-[#EEC16B] mb-4">
              3. {t("terminbuchung.personalInfo")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("terminbuchung.name")} *
                </label>
                <input
                  type="text"
                  name="name"
                  onBlur={handleBlur}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                    fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
                  }`}
                  placeholder="Max Mustermann"
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("terminbuchung.birthdate")} *
                </label>
                <input
                  type="date"
                  name="geburtsdatum"
                  onBlur={handleBlur}
                  value={formData.geburtsdatum}
                  onChange={handleInputChange}
                  required
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                    fieldErrors.geburtsdatum ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
                  }`}
                />
                {fieldErrors.geburtsdatum && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.geburtsdatum}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("terminbuchung.phone")} *
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  onBlur={handleBlur}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                    fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
                  }`}
                  placeholder="max@beispiel.de"
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("terminbuchung.address")} *
                </label>
                <textarea
                  name="adresse"
                  onBlur={handleBlur}
                  value={formData.adresse}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                    fieldErrors.adresse ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#EEC16B]'
                  }`}
                  placeholder="Musterstraße 123, 12345 Musterstadt"
                />
                {fieldErrors.adresse && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.adresse}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("terminbuchung.insuranceNumber")} *
                </label>
                <input
                  type="text"
                  name="versicherungsnummer"
                  onBlur={handleBlur}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("terminbuchung.insuranceType")} *
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="versicherungsart"
                      value="gesetzlich"
                      checked={formData.versicherungsart === "gesetzlich"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {t("terminbuchung.publicInsurance")}
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
                    {t("terminbuchung.privateInsurance")}
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
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
                    {t("terminbuchung.insuranceConfirmation")} *
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedSlot && (
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#EEC16B] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#d4a856] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? t("terminbuchung.booking") : t("terminbuchung.submit")}
            </button>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {t("terminbuchung.success")}
          </div>
        )}
      </form>
    </div>
  );
}


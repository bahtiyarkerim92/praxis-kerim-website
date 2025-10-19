"use client";

export default function CalendarWidget() {

  return (
    <div className="w-full">
      <iframe 
        src="https://calendar.google.com/calendar/embed?src=praxiskerim%40gmail.com&ctz=Europe%2FBerlin&showTitle=0&showNav=1&showDate=1&showTabs=0&showCalendars=0&showTz=0&mode=MONTH&bgcolor=%23000000&color=%23EEC16B&color=%2300FF00&color=%23808080&color=%230000FF&color=%23FF0000&color=%2300FFFF" 
        style={{ border: 0 }} 
        width="100%" 
        height="1000" 
        frameBorder="0" 
        scrolling="no"
        className="w-full"
        title="Praxis Dr. Kerim - Arztplanung"
      ></iframe>
    </div>
  );
}
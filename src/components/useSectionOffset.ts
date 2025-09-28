import { useEffect, useState } from "react";

export function useSectionOffset(sectionSelector: string) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function updateOffset() {
      const section = document.querySelector(sectionSelector) as HTMLElement | null;
      if (section) {
        const rect = section.getBoundingClientRect();
        setOffset(rect.top + window.scrollY + rect.height / 2);
      }
    }
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [sectionSelector]);

  return offset;
}

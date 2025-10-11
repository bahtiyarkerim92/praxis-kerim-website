# SEO Quick Reference Guide

## 🚀 Adding SEO to a New Page

### Step 1: Add Metadata to Page Layout

Create a `layout.tsx` file in your page directory:

```typescript
// src/app/your-page/layout.tsx
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { generatePageMetadata } from '../../config/seo';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'de') as 'de' | 'bg' | 'tr' | 'en' | 'pl';

  return generatePageMetadata('your-page', lang);
}

export default function YourPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

### Step 2: Add Page Info to SEO Config

Edit `src/config/seo.ts` and add your page:

```typescript
// In the titles object:
'your-page': {
  de: 'Your Page Title - Praxis Dr. Kerim',
  en: 'Your Page Title - Praxis Dr. Kerim',
  bg: 'Your Page Title - Praxis Dr. Kerim',
  tr: 'Your Page Title - Praxis Dr. Kerim',
  pl: 'Your Page Title - Praxis Dr. Kerim',
},

// In the descriptions object:
'your-page': {
  de: 'Your page description in German',
  en: 'Your page description in English',
  bg: 'Your page description in Bulgarian',
  tr: 'Your page description in Turkish',
  pl: 'Your page description in Polish',
},
```

### Step 3: Add to Sitemap

Your page will automatically be included if you add it to the `routes` array in `src/app/sitemap.ts`:

```typescript
const routes = [
  "",
  "/terminbuchung",
  "/bestellung",
  "/your-page", // Add here
];
```

## 📝 SEO Checklist for Each Page

- [ ] Page title includes target keyword
- [ ] Meta description is compelling (150-160 chars)
- [ ] H1 tag present and descriptive
- [ ] Keywords naturally integrated
- [ ] Internal links to other pages
- [ ] Images have alt text
- [ ] Mobile-responsive
- [ ] Fast loading time
- [ ] Unique content (no duplication)
- [ ] Clear CTA (Call-to-Action)

## 🎯 Keyword Guidelines

### Title Tags:

- Include primary keyword
- Keep under 60 characters
- Include brand name
- Format: `Keyword | Praxis Dr. Kerim`

### Meta Descriptions:

- Include primary + secondary keywords
- 150-160 characters
- Include CTA
- Compelling and actionable

### Headers (H1-H6):

- H1: Main page topic (one per page)
- H2: Main sections
- H3: Subsections
- Use keywords naturally

## 🖼️ Image Optimization

```tsx
import Image from "next/image";

<Image
  src="/your-image.jpg"
  alt="Descriptive alt text with keywords"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>;
```

## 🔗 Internal Linking

```tsx
import Link from "next/link";

<Link href="/terminbuchung">Termin buchen</Link>;
```

## 📊 Structured Data Example

Add to your page if needed:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Your Article Title",
      description: "Article description",
      datePublished: "2025-10-11",
    }),
  }}
/>
```

## 🌐 Language-Specific Content

Always provide translations for all languages:

```typescript
const content = {
  de: "German content",
  en: "English content",
  bg: "Bulgarian content",
  tr: "Turkish content",
  pl: "Polish content",
};

const { lang } = useI18n();
const text = content[lang];
```

## ✅ Testing Your SEO

### Tools:

1. **Google Search Console**: Check indexing
2. **PageSpeed Insights**: Test performance
3. **Lighthouse**: SEO score
4. **Schema Validator**: Test structured data

### Commands:

```bash
# Check build
npm run build

# Test locally
npm run start

# Check sitemap
curl http://localhost:3000/sitemap.xml

# Check robots.txt
curl http://localhost:3000/robots.txt
```

## 🎨 Best Practices

### Content:

- Write for humans first, search engines second
- Use simple, clear language
- Break content into scannable sections
- Include relevant keywords naturally
- Add value to the reader

### Technical:

- Keep pages fast (< 3s load time)
- Use semantic HTML
- Implement proper heading hierarchy
- Add breadcrumbs for navigation
- Ensure mobile responsiveness

### Local SEO:

- Include location keywords
- Mention nearby landmarks
- Add city/region in content
- Update Google Business Profile
- Get local citations

## 🚨 Common Mistakes to Avoid

- ❌ Duplicate meta descriptions
- ❌ Missing alt text on images
- ❌ Keyword stuffing
- ❌ Thin content (< 300 words)
- ❌ Broken internal links
- ❌ Slow page load times
- ❌ Missing mobile optimization
- ❌ No structured data
- ❌ Ignoring user intent
- ❌ Poor internal linking

## 📈 Monitoring & Improvement

### Weekly:

- Check Search Console for errors
- Monitor key rankings
- Review page performance

### Monthly:

- Analyze traffic patterns
- Update outdated content
- Add new keywords
- Check competitor rankings

### Quarterly:

- Full SEO audit
- Content refresh
- Technical optimization
- Strategy adjustment

---

**Need Help?** Refer to the full `SEO_IMPLEMENTATION.md` for detailed documentation.

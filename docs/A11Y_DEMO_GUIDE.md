# Accessibility (A11y) Demo Pages

This project includes two demonstration pages that showcase the difference between poor and proper accessibility practices.

## Pages Overview

### 1. A11y Before (`/a11y-before`)
Demonstrates **poor accessibility practices**:
- ❌ **Broken heading hierarchy**: h1 → h4 → h1 → h3 → h5 (skips levels, inconsistent)
- ❌ **No semantic HTML**: Uses generic `<div>` elements instead of `<section>`, `<nav>`, `<aside>`
- ❌ **No ARIA labels**: Missing `aria-label`, `aria-required`, and other ARIA attributes
- ❌ **Poor form structure**: No `<label>` elements, inputs without proper associations
- ❌ **Non-semantic buttons**: Uses `<div>` styled as buttons instead of `<button>` elements
- ❌ **No list semantics**: Uses divs for list-like content
- ❌ **Poor color contrast**: Light gray text (#bbb) on white background (~2.5:1 ratio, fails WCAG AA)

### 2. A11y After (`/a11y-after`)
Demonstrates **proper accessibility practices**:
- ✅ **Correct heading hierarchy**: h1 → h2 → h2 → h2 (consistent, logical structure)
- ✅ **Semantic HTML**: Uses `<section>`, `<nav>`, `<aside>`, `<ul>`, `<li>` appropriately
- ✅ **ARIA labels**: Includes `aria-label`, `aria-required`, `aria-hidden` where needed
- ✅ **Proper form structure**: Uses `<label>` elements with `htmlFor` associations
- ✅ **Semantic buttons**: Uses actual `<button>` elements with proper attributes
- ✅ **List semantics**: Uses `<ul>` and `<li>` for list content
- ✅ **Good color contrast**: Dark gray text (#333) on white background (~12:1 ratio, exceeds WCAG AAA)

## Font Demonstration

Both pages use the following font-family declaration:
```css
fontFamily: 'Inter-Black, Arial, sans-serif'
```

**Important**: The `Inter-Black` font is **not loaded** in this project. This is intentional to demonstrate font fallback behavior. When you inspect the computed styles in DevTools, you'll see that the browser falls back to `Arial` because `Inter-Black` is unavailable.

### How to Verify Font Fallback:
1. Open either A11y page in your browser
2. Open DevTools (F12 or Cmd+Option+I)
3. Inspect any text element
4. Look at the **Computed** tab
5. Find the `font-family` property
6. You'll see it shows `Arial` as the actual rendered font, not `Inter-Black`

## Testing Accessibility

### Using Screen Readers:
- **macOS**: Enable VoiceOver (Cmd+F5)
- **Windows**: Use NVDA or JAWS
- **Chrome**: Use ChromeVox extension

### What to Notice:
1. **Before page**: Screen reader will struggle with navigation, heading structure is confusing
2. **After page**: Screen reader can easily navigate by headings, landmarks, and lists

### Using Browser DevTools:
1. Open DevTools → **Lighthouse** tab
2. Run an **Accessibility** audit
3. Compare scores between the two pages
4. The "After" page should score significantly higher

### Using axe DevTools:
1. Install the [axe DevTools extension](https://www.deque.com/axe/devtools/)
2. Run accessibility scan on both pages
3. Compare the number of issues found

## Key Accessibility Lessons

### Heading Hierarchy
- Always start with `<h1>` (only one per page)
- Follow sequential order: h1 → h2 → h3 (don't skip levels)
- Use headings to create a logical document outline

### Semantic HTML
- Use `<section>` for thematic groupings
- Use `<nav>` for navigation menus
- Use `<aside>` for complementary content
- Use `<ul>`/`<li>` for lists
- Use `<button>` for interactive buttons

### ARIA Labels
- Use `aria-label` to provide accessible names for sections
- Use `aria-hidden="true"` for decorative icons
- Use `aria-required` for required form fields
- Don't overuse ARIA - semantic HTML is often better

### Forms
- Always use `<label>` elements
- Associate labels with inputs using `htmlFor` and `id`
- Use proper input types (`type="text"`, `type="email"`, etc.)
- Mark required fields with `aria-required` or `required` attribute

### Color Contrast
- **WCAG AA Standard**: Requires a contrast ratio of at least 4.5:1 for normal text
- **WCAG AAA Standard**: Requires a contrast ratio of at least 7:1 for normal text
- **Large Text**: Has lower requirements (3:1 for AA, 4.5:1 for AAA)
- Use tools like WebAIM Contrast Checker or browser DevTools to verify contrast ratios

#### Examples in this demo:
- **Before page**: Light gray (#bbb) on white = ~2.5:1 (FAILS WCAG AA)
- **After page**: Dark gray (#333) on white = ~12:1 (EXCEEDS WCAG AAA)

#### How to test contrast:
1. Use browser DevTools to inspect the element
2. Look for the contrast ratio indicator in the color picker
3. Use online tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
4. Run a Lighthouse audit which includes contrast checks

### Hover and Focus States
Both pages include interactive states on the "Quick Actions" buttons to demonstrate DevTools features:

#### Testing with DevTools :hov Feature:
1. **Open DevTools** (F12 or Cmd+Option+I)
2. **Inspect a Quick Actions button** (Edit Profile, View Settings, or Logout)
3. **Find the :hov checkbox** in the Styles panel (usually near the top)
4. **Toggle different states:**
   - `:hover` - See the darker blue background, scale transform, and shadow
   - `:focus` - See the outline (orange on Before page, green on After page)
   - `:active` - See the pressed-down effect

#### State Differences:
- **Before page**: Orange focus outline (`#e67e22`)
- **After page**: Green focus outline (`#27ae60`)
- **Both pages**: Hover shows darker blue with lift effect, active shows pressed state

This is perfect for demonstrating how to debug CSS pseudo-classes without actually hovering or clicking!

## Resources
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [The A11Y Project](https://www.a11yproject.com/)

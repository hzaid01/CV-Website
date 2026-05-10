# How to Add Project Images

## Quick Guide

When you're ready to add images for your new projects, follow these steps:

## Step 1: Prepare Your Images

### Recommended Specifications:
- **Format**: WebP (best performance) or PNG/JPG
- **Dimensions**: 800x600px or 1200x900px (4:3 aspect ratio)
- **File Size**: Under 200KB per image (optimized)
- **Naming**: Use descriptive names (e.g., `coldnerd.webp`, `opbc.webp`)

### Image Optimization Tools:
- **Online**: 
  - https://squoosh.app/ (Google's image optimizer)
  - https://tinypng.com/ (PNG/JPG compression)
  
- **Command Line** (if you have it):
  ```bash
  # Convert to WebP
  cwebp input.png -q 80 -o output.webp
  ```

## Step 2: Add Images to Project

1. **Place images in the public folder:**
   ```
   public/images/
   ├── coldnerd.webp          # Your new image
   ├── opbc.webp              # Your new image
   ├── instagram-auto.webp    # Your new image
   ├── solar-crown.webp       # Your new image
   └── ... (existing images)
   ```

2. **Update Work.tsx:**

   Open `src/components/Work.tsx` and update the image paths:

   ```typescript
   const projects: Project[] = [
     {
       title: "ColdNerd",
       category: "Full Stack Web Application",
       tools: "React, Node.js, Full Stack Architecture",
       image: "/images/coldnerd.webp",  // ← Change this
       link: "https://coldnerd.com",
       year: "2024",
     },
     {
       title: "OPBC Investor Community",
       category: "Cross-Platform Mobile App",
       tools: "React Native, Supabase, Android/iOS/Web",
       image: "/images/opbc.webp",  // ← Change this
       link: "https://opbc.vercel.app",
       year: "2025",
     },
     {
       title: "Instagram Lead Gen & DM Automation",
       category: "AI-Powered Automation Tool",
       tools: "Python, Playwright, OpenCV2, BeautifulSoup, PyAutoGUI",
       image: "/images/instagram-auto.webp",  // ← Change this
       year: "2025",
     },
     {
       title: "Solar Energy Crown",
       category: "Full Stack Business Platform",
       tools: "React, Firebase, Netlify",
       image: "/images/solar-crown.webp",  // ← Change this
       link: "https://solarenergycrown.netlify.app",
       year: "2024",
     },
     // ... rest of projects
   ];
   ```

## Step 3: Test

1. **Run development server:**
   ```bash
   npm run dev
   ```

2. **Check the Work section:**
   - Navigate to the Work section
   - Verify images load correctly
   - Check that images look good on different screen sizes

3. **Build for production:**
   ```bash
   npm run build
   ```

## Taking Screenshots

### For Web Applications:

**Option 1: Browser Screenshot**
1. Open your project in browser
2. Press F12 (DevTools)
3. Click device toolbar icon (mobile view)
4. Set viewport to 1200x900
5. Right-click → "Capture screenshot"

**Option 2: Full Page Screenshot (Chrome)**
1. Open DevTools (F12)
2. Press Ctrl+Shift+P (Command Palette)
3. Type "screenshot"
4. Select "Capture full size screenshot"

**Option 3: Online Tools**
- https://www.screely.com/ (adds browser frame)
- https://screenshot.rocks/ (mockup generator)

### For Mobile Apps:

**Option 1: Device Screenshot**
1. Open app on device
2. Take screenshot (Power + Volume Down on Android, Power + Home on iOS)
3. Transfer to computer

**Option 2: Emulator Screenshot**
1. Run app in emulator
2. Use emulator's screenshot tool
3. Save to computer

**Option 3: Mockup Tools**
- https://mockuphone.com/ (device mockups)
- https://www.figma.com/ (design mockups)

## Image Editing Tips

### Create Attractive Screenshots:

1. **Add Browser Frame:**
   - Use https://www.screely.com/
   - Makes screenshots look more professional

2. **Add Device Frame (for mobile apps):**
   - Use https://mockuphone.com/
   - Shows app in realistic device context

3. **Add Gradient Background:**
   - Use Figma or Photoshop
   - Makes image stand out

4. **Highlight Key Features:**
   - Add subtle arrows or highlights
   - Draw attention to important elements

### Example Workflow:

```
1. Take screenshot of your project
   ↓
2. Open in Figma/Photoshop
   ↓
3. Add browser/device frame
   ↓
4. Add gradient background
   ↓
5. Export as WebP (80% quality)
   ↓
6. Place in public/images/
   ↓
7. Update Work.tsx
```

## Quick Reference: Current Projects Needing Images

| Project | Current Image | Suggested Filename |
|---------|--------------|-------------------|
| ColdNerd | placeholder.webp | coldnerd.webp |
| OPBC | placeholder.webp | opbc.webp |
| Instagram Automation | placeholder.webp | instagram-auto.webp |
| Solar Energy Crown | placeholder.webp | solar-crown.webp |

## Example: Complete Update

Here's what the complete projects array will look like after adding images:

```typescript
const projects: Project[] = [
  {
    title: "ColdNerd",
    category: "Full Stack Web Application",
    tools: "React, Node.js, Full Stack Architecture",
    image: "/images/coldnerd.webp",
    link: "https://coldnerd.com",
    year: "2024",
  },
  {
    title: "OPBC Investor Community",
    category: "Cross-Platform Mobile App",
    tools: "React Native, Supabase, Android/iOS/Web",
    image: "/images/opbc.webp",
    link: "https://opbc.vercel.app",
    year: "2025",
  },
  {
    title: "Instagram Lead Gen & DM Automation",
    category: "AI-Powered Automation Tool",
    tools: "Python, Playwright, OpenCV2, BeautifulSoup, PyAutoGUI",
    image: "/images/instagram-auto.webp",
    year: "2025",
  },
  {
    title: "Solar Energy Crown",
    category: "Full Stack Business Platform",
    tools: "React, Firebase, Netlify",
    image: "/images/solar-crown.webp",
    link: "https://solarenergycrown.netlify.app",
    year: "2024",
  },
  // Existing projects already have images
  {
    title: "Solid Starters",
    category: "Low-Code Platform",
    tools: "Angular, Next.js, NestJS, MongoDB",
    image: "/images/Solidx.png",
    year: "2023",
  },
  // ... rest
];
```

## Troubleshooting

### Image Not Showing?

1. **Check file path:**
   - Must be in `public/images/`
   - Path in code: `/images/filename.webp` (starts with `/`)

2. **Check file name:**
   - Case-sensitive on some systems
   - No spaces in filename
   - Use lowercase

3. **Clear cache:**
   - Hard refresh: Ctrl+Shift+R
   - Or clear browser cache

4. **Check file format:**
   - Supported: .webp, .png, .jpg, .jpeg
   - Not supported: .svg (for this use case)

### Image Too Large?

1. **Compress it:**
   - Use https://squoosh.app/
   - Target: Under 200KB

2. **Resize it:**
   - Max dimensions: 1200x900px
   - Maintain aspect ratio

### Image Looks Blurry?

1. **Use higher resolution:**
   - At least 800x600px
   - Better: 1200x900px

2. **Check compression:**
   - Don't compress below 70% quality
   - WebP at 80% is usually perfect

## Need Help?

If you run into issues:
1. Check browser console for errors (F12)
2. Verify file exists in `public/images/`
3. Check spelling in Work.tsx
4. Try a different image format

---

**Remember:** Images are optional for now. The portfolio works perfectly with placeholders until you're ready to add real screenshots!

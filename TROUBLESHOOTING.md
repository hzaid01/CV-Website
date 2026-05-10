# Troubleshooting Guide

## Common Issues and Solutions

### 1. Intro Not Playing

**Symptoms:**
- Black screen with loading spinner stuck
- Frames not loading

**Solutions:**

✅ **Check frame files exist:**
```bash
# Check desktop frames
dir public\intro_frames

# Check mobile frames
dir public\mobile_intro_frames

# Should see 800 .jpg files in each folder
```

✅ **Check browser console for errors:**
- Open DevTools (F12)
- Look for 404 errors on frame images
- Check network tab for failed requests

✅ **Clear browser cache:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear cache in browser settings

### 2. Slow Loading / Performance Issues

**Symptoms:**
- Loading takes too long
- Choppy playback
- Browser freezing

**Solutions:**

✅ **Reduce preload threshold:**
```typescript
// In VideoIntro.tsx, line ~40
// Change from 50% to 25%
if (loadedCount === Math.ceil(totalFrames * 0.25)) {
  setIsLoading(false);
  // ...
}
```

✅ **Reduce frame rate:**
```typescript
// In VideoIntro.tsx, line ~18
const fps = 30; // Instead of 50
```

✅ **Check internet connection:**
- Frames are ~130KB each
- 800 frames = ~104MB to download
- Slow connection will delay loading

### 3. Skip Button Not Appearing

**Symptoms:**
- Can't skip the intro
- Button never shows up

**Solutions:**

✅ **Check skip delay:**
```typescript
// In VideoIntro.tsx, line ~52
setTimeout(() => setCanSkip(true), 1000); // 1 second delay
```

✅ **Check CSS:**
```css
/* In VideoIntro.css */
.skip-intro-btn {
  z-index: 10001; /* Should be high */
  display: block; /* Should not be hidden */
}
```

### 4. Wrong Frames Loading (Mobile/Desktop)

**Symptoms:**
- Desktop shows mobile frames (vertical)
- Mobile shows desktop frames (horizontal)

**Solutions:**

✅ **Check breakpoint:**
```typescript
// In VideoIntro.tsx, line ~16
const isMobile = window.innerWidth <= 768; // Adjust if needed
```

✅ **Test responsive behavior:**
- Resize browser window
- Check which frames load
- Adjust breakpoint as needed

### 5. Frames Not Smooth / Stuttering

**Symptoms:**
- Playback is choppy
- Not smooth 50 FPS

**Solutions:**

✅ **Check frame delay calculation:**
```typescript
// In VideoIntro.tsx, line ~19
const frameDelay = 1000 / fps; // Should be 20ms for 50 FPS
```

✅ **Use requestAnimationFrame:**
```typescript
// Already implemented in playFrames()
animationFrameRef.current = requestAnimationFrame(animate);
```

✅ **Check browser performance:**
- Close other tabs
- Check CPU usage
- Try different browser

### 6. Career Section Not Updated

**Symptoms:**
- Still showing old career info
- Not showing resume information

**Solutions:**

✅ **Check Career.tsx:**
```bash
# Read the file
type src\components\Career.tsx

# Should show:
# - Buzzware Tech
# - Hazza Institute of Technology
# - Freelance / Independent Projects
```

✅ **Clear build cache:**
```bash
# Delete dist folder
rmdir /s /q dist

# Rebuild
npm run build
```

### 7. Build Errors

**Symptoms:**
- `npm run build` fails
- TypeScript errors

**Solutions:**

✅ **Check for TypeScript errors:**
```bash
npm run build
# Look for error messages
```

✅ **Verify imports:**
```typescript
// In App.tsx
import VideoIntro from "./components/VideoIntro";

// In VideoIntro.tsx
import "./styles/VideoIntro.css";
```

✅ **Reinstall dependencies:**
```bash
rmdir /s /q node_modules
npm install
```

### 8. Intro Plays But Loading Screen Doesn't Show

**Symptoms:**
- Intro completes but nothing happens
- Stuck on black screen

**Solutions:**

✅ **Check onComplete callback:**
```typescript
// In App.tsx
const handleIntroComplete = () => {
  setShowIntro(false); // This should hide intro and show main app
};
```

✅ **Check state management:**
```typescript
// In App.tsx
const [showIntro, setShowIntro] = useState(true);

// Should render:
{showIntro ? (
  <VideoIntro onComplete={handleIntroComplete} />
) : (
  <LoadingProvider>...</LoadingProvider>
)}
```

### 9. Memory Issues / Browser Crash

**Symptoms:**
- Browser uses too much memory
- Tab crashes
- "Out of memory" error

**Solutions:**

✅ **Reduce total frames:**
```bash
# Keep only every other frame (400 frames instead of 800)
# This will reduce memory usage by 50%
```

✅ **Implement frame cleanup:**
```typescript
// Add to VideoIntro.tsx cleanup
useEffect(() => {
  return () => {
    // Clear image references
    imagesRef.current = [];
  };
}, []);
```

### 10. Frames Not Covering Full Screen

**Symptoms:**
- Black bars on sides
- Frames don't fill screen

**Solutions:**

✅ **Check drawImageCover function:**
```typescript
// In VideoIntro.tsx
// This function should handle aspect ratio correctly
const drawImageCover = (ctx, img, width, height) => {
  // ... implementation handles cover fit
};
```

✅ **Check canvas size:**
```typescript
// Canvas should match window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

## Debug Mode

Add this to VideoIntro.tsx for debugging:

```typescript
// Add after line 20
const DEBUG = true;

// Add logging
useEffect(() => {
  if (DEBUG) {
    console.log('Total frames:', totalFrames);
    console.log('FPS:', fps);
    console.log('Is mobile:', isMobile);
    console.log('Frame folder:', isMobile ? '/mobile_intro_frames' : '/intro_frames');
  }
}, []);

// In img.onload
img.onload = () => {
  loadedCount++;
  if (DEBUG) {
    console.log(`Loaded ${loadedCount}/${totalFrames} frames (${Math.round((loadedCount/totalFrames)*100)}%)`);
  }
  // ... rest of code
};
```

## Performance Monitoring

Add this to check FPS:

```typescript
// Add to VideoIntro.tsx
let frameCount = 0;
let lastTime = performance.now();

const animate = (currentTime: number) => {
  frameCount++;
  
  // Log FPS every second
  if (currentTime - lastTime >= 1000) {
    console.log('Actual FPS:', frameCount);
    frameCount = 0;
    lastTime = currentTime;
  }
  
  // ... rest of animate function
};
```

## Browser Console Commands

Open DevTools console and try:

```javascript
// Check if frames are loaded
console.log('Frames loaded:', document.querySelectorAll('img[src*="frame-"]').length);

// Check canvas
console.log('Canvas:', document.querySelector('.video-intro-canvas'));

// Check current state
console.log('Intro visible:', document.querySelector('.video-intro-container') !== null);
```

## Getting Help

If issues persist:

1. **Check browser console** for errors
2. **Check network tab** for failed requests
3. **Try different browser** (Chrome, Firefox, Safari)
4. **Check file permissions** on frame folders
5. **Verify frame files** are not corrupted
6. **Test on different device** (mobile vs desktop)

## Contact Information

For additional support:
- Email: hassanahmed3286@gmail.com
- GitHub: github.com/hassanahmed3286
- Portfolio: muhammadahmedhassan.vercel.app

---

**Most issues can be resolved by:**
1. Clearing cache
2. Rebuilding the project
3. Checking browser console for errors

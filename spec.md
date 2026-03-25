# FORG

## Current State
The PFP generator has a 'Share to X' button that opens a pre-filled tweet with the caption 'I just joined the $forg army 🐸' and a link to the FORG community. It does not attach the generated PFP image.

## Requested Changes (Diff)

### Add
- Web Share API logic: when the user clicks 'Share to X', attempt `navigator.share({ files: [imageFile], text: caption, url: communityLink })` for mobile browsers that support file sharing
- Desktop fallback: if Web Share API is not supported or fails, auto-download the PFP image AND open the tweet intent URL, plus show a brief inline message like 'Image downloaded — attach it to your tweet!'

### Modify
- The existing 'Share to X' button handler in the PFP generator component to use the new logic above

### Remove
- Nothing

## Implementation Plan
1. In the PFP generator component, update the Share to X click handler
2. Convert canvas to Blob (using `canvas.toBlob`)
3. Try `navigator.canShare({ files: [...] })` and `navigator.share(...)` with the image File, caption text, and community URL
4. On failure or unsupported (desktop), trigger PNG download and open tweet intent URL, then show a brief 'Image downloaded — attach it to your tweet!' message near the button for a few seconds
5. Validate and build

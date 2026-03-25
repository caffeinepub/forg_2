# FORG PFP Generator - Army Uniform Addition

## Current State
PFP generator has a Clothes section with one item: Suit. Accessories section has chain, sunglasses, top hat. All overlays render at natural pixel size, centered on 1024x1024 canvas, toggleable.

## Requested Changes (Diff)

### Add
- Army uniform as a second toggleable item in the Clothes section
- Asset: /assets/uploads/army_uniform-019d2662-b619-721b-93e2-b852bbbb22fe-1.png

### Modify
- PFP generator Clothes section to show both Suit and Army Uniform toggle buttons

### Remove
- Nothing

## Implementation Plan
1. Add army uniform image to the clothes layers array in PFPGenerator component
2. Add toggle button for army uniform in the Clothes section UI
3. Render at natural pixel size, centered, same as suit

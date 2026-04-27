# runawaycalc
/* Disclaimer - This is partally done with AI I don't have any JS experience. The HTML+CSS was exported from Figma and then improvised by AI*/
The idea was designed in Figma - the layout, texts and input fields. Also different stroke effects for each case(success/failure)
After finalizing the design described the core features - Stroke effect, Quotes, Responsiveness and the 4-tier system.
<img width="1919" height="1136" alt="image" src="https://github.com/user-attachments/assets/5438e3a9-c5c4-4209-aba7-61a100addde6" />
<img width="1818" height="778" alt="Screenshot 2026-04-27 194553" src="https://github.com/user-attachments/assets/943a659b-e99f-40ff-8276-500b0db314d2" />
The objective for this project was to provide clear, actionable financial feedback through an animated, aesthetically premium UI while maintaining total functional clarity.

The 4-Tier State System
Instead of a binary "Good/Bad," financial health is nuanced. I designed a 4-tier visual feedback system:
1. Safe (12+ months) : Green glowing borders with a celebratory confetti burst to reward strong financial management.
2. Caution (6-11 months) : An amber highlighting state. You're okay, but attention is needed. 
3. Danger (3-5 months) : Intense orange glow to instill a sense of urgency.
4. Critical (< 3 months) : Bright red themes with an intimidating UI shake animation. Emergency action required.

Some Micro-interactions
- Fluid Layout
- Glassmorphism Aesthetic
- Stroke Animations
- Progressive Disclosure
- Contextual Quotes

## Stack Requirements
- **Core:** Vanilla HTML5 / CSS3 / Vanilla ES6 (`app.js`).
- **Dependencies:** `canvas-confetti` integration (loaded dynamically via CDN).
- **Fonts:** Leverages `Inter`, `Jaro`, and `Jersey 10` for distinct, stylish typography. 

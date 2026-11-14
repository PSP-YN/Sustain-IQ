# Asset register and attribution

The following actual Minecraft gameplay screenshots are used as biome backdrops. Original source files and locally generated UHD derivatives are served from public/minecraft/ so runtime display does not depend on Wikimedia.

| Local file | Source image | Creator / source | License shown on source page |
|---|---|---|---|
| 4k/jungle-uhd.webp (UHD derivative of jungle.webp) | https://commons.wikimedia.org/wiki/File:Minecraft_-_Jungle.jpg | Xbox México; extracted from the Xbox México Minecraft Masterclass video | CC BY 3.0 — https://creativecommons.org/licenses/by/3.0/ |
| 4k/mountains-uhd.webp (UHD derivative of mountains.webp) | https://commons.wikimedia.org/wiki/File:Minecraft_-_1.18_mountains.jpg | Xbox México; extracted from the Xbox México Minecraft Masterclass video | CC BY 3.0 — https://creativecommons.org/licenses/by/3.0/ |
| 4k/taiga-uhd.webp (UHD derivative of taiga.webp) | https://commons.wikimedia.org/wiki/File:Minecraft_-_Taiga.jpg | Xbox México; extracted from the Xbox México Minecraft Masterclass video | CC BY 3.0 — https://creativecommons.org/licenses/by/3.0/ |

Attribution: Gameplay screenshots by Xbox México, sourced through Wikimedia Commons. Licensed under Creative Commons Attribution 3.0 Unported. Cropped/scaled and color-adjusted for responsive website backgrounds. No endorsement by Xbox, Microsoft, Mojang or Minecraft is implied.

Reuse caveat: At the time these files were checked, their Commons pages displayed a License review needed notice and stated that the licensing claim had not yet been independently reviewed by a Commons administrator. The pages identify the source video as released under CC BY 3.0, but the Commons notice is not a legal guarantee. Before commercial use or a high-stakes public campaign, have the organiser/legal reviewer verify the source video license and Microsoft's/Mojang's applicable trademark and game-content rules. If this verification is not accepted, replace these images with organiser-owned gameplay screenshots or separately cleared assets and update this file.

## UHD derivatives and honest resolution disclosure

The deployed backdrop files in `public/minecraft/4k/` are each **3,840×2,160 pixels (UHD/4K canvas)** and optimized WebP. They are derived from the original source screenshots: jungle 1,920×790 (HUD cropped), taiga 1,920×960, and mountains 1,266×788. The source screenshot is center-cropped to a 16:9 composition and fills the entire canvas edge-to-edge. Color, contrast and edge sharpness were adjusted during resampling.

**Important:** these are 4K-dimension upscales, not native 4K captures and not AI-super-resolution reconstructions. Upscaling cannot restore detail absent from the originals; fine textures may still look soft on large 4K displays. Files are optimized WebP for browser delivery. The original source screenshots remain in `public/minecraft/` for traceability.


## Animated world actors

The scroll world includes custom procedural voxel-inspired meshes for the player, a technical companion, cow, sheep, fox, wolf, parrot and a Herobrine-inspired cameo. These are original Three.js primitive assemblies with scripted gait, head movement, hovering, firefly particles and reveal animations. They are not imported game assets, official Minecraft models or captured game animations. The player and camera respond to scroll position; biome screenshot layers blend continuously based on the same scroll progress. This is a website presentation scene, not a playable Minecraft simulation.

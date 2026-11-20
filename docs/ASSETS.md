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


## Recorded gameplay background

The page background now uses a user-supplied recorded Minecraft exploration video. The original source was provided locally as `Minecraft_player_exploring_world_3723f312_1080p.mp4`; the web-optimized derivative is `public/minecraft/videos/world-journey.mp4`.

The source is 1,920×1,080, 24 fps and approximately 14.93 seconds. The processed MP4 is H.264, 1,920×1,080 at 24 fps, approximately 14.93 seconds (358 frames), approximately 25 MB, with the audio track removed and MP4 fast-start metadata enabled. It is not native 4K. The browser keeps the video paused and seeks its timeline from document scroll progress, so reverse scrolling reverses the footage.

The previous procedural Three.js player, animals, companion and Herobrine scene is no longer mounted. Any characters or movement in the current background are part of the supplied footage, not independently composited website models. The older UHD WebP screenshots remain in the repository as the video poster/fallback and for asset traceability; they are no longer crossfaded as the primary world journey.


### Watermark-removal derivative

The visible Gemini sparkle overlay in the supplied gameplay clip was localized to a fixed bottom-right region and removed frame-by-frame with the LaMa inpainting model. The reconstruction is limited to the watermark mask and a small surrounding context patch. The output retains the source 1,920×1,080 frame size, 24 fps cadence, 358 frames and approximately 14.93-second duration. No image crop, geometric zoom, frame interpolation or soundtrack was added. The original supplied MP4 remains preserved outside the repository; the processed MP4 is the website delivery asset. Because inpainting synthesizes pixels under the overlay, inspect the preview on both desktop and mobile before promoting it to the production branch.

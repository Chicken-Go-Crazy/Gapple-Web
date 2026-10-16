# Orthogonal HTML5 port

Orthogonal is selectable alongside Applecore in Play/Freeplay using Left/Right. Enter loads the actual Haxe/Kade PlayState and the original chart/audio. Loading and pause screens use Orthogonal's original art and credits. Its dedicated asset library loads on demand.

## Original material and implemented behavior

- All 834 note heads, times, directions, sustain lengths and section ownership are preserved from `assets/songs/orthogonal/chart.json`. The original event list is retained. The song uses 170 BPM and scroll speed 3. Two later time-change entries are beyond the playable audio and have no effect within this song.
- Dave uses the byte-identical original 8192x4500 atlas/XML, idle and four sing tracks (14/24/28/22/24 frames), 24 FPS, original offsets and 0.625 scale. BF and GF reuse their converted original Animate assets, with the native Orthogonal scales 0.93/0.9 and GF position (766,236). BF is placed at (1210,675), correcting the native literal Y=508 for the converted atlas origin so his feet sit near Dave’s ground level. Camera focus follows the corrected actor position. Dave is at (245,333). Original Dave icon, countdown sounds and health-bar color are included.
- Stage order: sky, mountains, hills, gates, grass, portal. Native positions/parallax are restored: sky (-300,-100), (.02,.02); mountains (-200,-120), (.125,.5); hills (-50,0), (.6,.9); gates/grass (0,0), (1,1).
- All 41 chart events dispatch: camera moves to characters/points with offsets, zoom set/add, easing/duration, lock/unlock and portal trigger. Durations are in beats as authored. Initial camera is (938,400), zoom 1.5. The script's opening black fade starts at step 1 over 32 beats; HUD fades white at step 2320 over 30 beats. The opening overlay renders behind HUD notes/icons, matching a world-camera-only fade.
- Portal uses the original Animate symbol graph, affine transforms, alpha tracks and both original texture sheets. No placeholder image is used. Activation starts 7.875 seconds before the chart event, plays native indices 0–188 at 24 FPS, then loops indices 190–389. Flattened per-frame commands are cached; no full-frame raster atlas is generated.
- Applecore's input, smooth holds, RGB splashes, HUD smoothing and menus remain available. Orthogonal uses default note artwork as specified by Dave's style, without Applecore's special note modifiers.

## Evidence and validation

Annotated static EXE decompilations, the shipped script and editor event descriptions are in `decompiled/native/orthogonal/` (workspace-relative). The executable was not run.

`verify-orthogonal.mjs` executes the compiled portal timeline traversal and camera/event controller with rendering stubs, compares every chart head/sustain and original image hash, traverses all 389 portal frames including translucent commands, verifies the terminal camera/fade state, and checks the lazy-loading gate. `verify-dave-character.mjs` executes the compiled character constructor against the original atlas/config. All 27 regression scripts pass. Original Ogg audio is transcoded to the engine's HTML5 MP3 format.

Visual browser comparison and a full live playthrough of Orthogonal are still pending. Camera focus points use the recovered native offsets mapped to the converted BF geometry. MovieClip children are sampled relative to the containing symbol's timeline; equivalence to every independent native MovieClip playback state is not established. The current `lerp` zoom mode follows the authored default-zoom target with exponential easing. These limits prevent a 100% native-fidelity claim.

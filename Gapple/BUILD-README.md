# Applecore HTML5 build

This build compiles the real Kade Engine 1.2 Haxe/HaxeFlixel engine to JavaScript with Lime/OpenFL. It uses the original Golden Apple Applecore chart, audio, character atlases, BF/GF Animate exports, note skins, and subtitles. It is a source port on the archived Kade 1.2 engine, not a complete recovery of the custom executable's original Haxe project.

## Play

Open http://127.0.0.1:4173/ while `engines/serve-kade.mjs` is running. Click to start, press Enter through the title, select Freeplay, and select Applecore. Arrow keys play; Enter pauses. Applecore is the sole song and has the authored Normal chart.

The downloadable package is `engines/Applecore-HTML5.zip`. Extract it and serve its contents through a local/static HTTP server; opening index.html directly as a file will not load browser assets correctly.

## Changes

- Removed base-game song charts, audio, week assets, character atlases, icon grid, and catalog entries from the release package. Recoverable copies remain in `engines/kade-base-song-backup` and `engines/kade-base-character-backup`.
- Imported all 1,725 Applecore main notes in 291 sections, the 21 alternate animation flags, and the 156-to-180 BPM change. Imported the 366 secondary Bambi animation events, including smash and No Animation.
- Imported Bandu-first, Bandu, Bandu-sad, Bambi, Expunged, Golden Apple BF/GF, and the original BF death sprites. BF/GF Animate conversion preserves the original raster artwork and 24 fps timelines.
- Corrected the converted BF/GF animation prefixes and BF's facing direction. Added a visible-art anchor for Bandu's poses, which avoids transparent atlas margins moving him off screen.
- Applied the supplied screenshot's character layout and green phone background, fries cameo, timer, health colors, and subtitles. The fries art is original; simple black leg sprites complete the reference cameo.
- Added the original 3D opponent and standard player note skins, including taps, sustains, receptors, presses, and confirms, using their authored offset metadata.
- Added native-evidence character transitions at beats 168, 323, 364, 651, and 659. Added the final Expunged animation callback sequence and the secondary Bambi queue.
- Preserved all 981 Bandu atlas frame entries across 25 animation tracks. Bandu's 199-frame phones galore and 130-frame wow animations now finish at 24 fps without being cut off by subtitle changes, note hits, or beat dances; his extra alternate idle animations follow the speaking sequences.
- Restored the shipped WavyShader fragment body on all three phone background layers, using the native speed 0.6, frequency 0.8, and amplitude 0.2. Shader time advances in seconds and pauses with the gameplay state.
- Fixed missing/corrupt saved offsets and initialized preferences after loading the save slot, so chart timestamps remain finite. Sustains use the BPM at their position; every due note spawns in the same update.
- Replaced the old cross-lane input matching with queued keyboard events timestamped from the live audio channel. Fast taps between render frames survive, chords are independent, nearby same-lane taps require separate presses, OS repeats and alternate-binding releases are handled, and focus loss clears held keys. Preserved WASD/DFJK/arrows, controller controls, and replay recording/playback. The old input toggle now explicitly controls ghost tapping.
- Holds require a hit head, released keys do not hit tails, and one broken hold incurs one miss rather than a series of repeated penalties. Receptor confirms return to pressed/static appropriately. Tap judgment uses a symmetric existing safe-zone window, and scoring uses the captured input time.
- Kept a click-to-start audio gate for browser audio unlocking.

## Verification and limits

The release HTML5 compiler and JavaScript syntax check pass. The compiled chart generation and Note/Conductor methods preserve all 1,725 original main notes, sides, lanes, hold lengths, and alternate flags under missing, invalid, and valid offsets. Compiled input tests cover fast taps, chords, rapid same-lane notes, held/released tails, duplicate notes, audio timestamps, repeat/alias protection, focus loss, pause, controller bindings, and queued replay events. These tests stub rendering and audio hardware; see `applecore-chart-verification.json` and `golden-input-verification.json`.

The compiled Character and Flixel scheduler tests preserve all 199 phones galore and 130 wow frames at 120, 60, and 5 updates/sec; note and beat interruptions cannot truncate them. Cue dispatch tests pass. The browser loaded the rebuilt title without console errors, but tabs disappeared during verification and the final navigation timed out. A complete live gameplay/input pass is still unverified. The local server responds HTTP 200. `applecore-layout-preview.png` is an explicitly labeled offline preview.

The background uses the exact first frame of the original foreground phone atlas. This saves about 116 MiB of decoded texture memory; the full original atlas is preserved in `engines/original-stage-atlas-backup`. The full foreground atlas animation, camera choreography, every cutscene/video, native animation easing, pause behavior during later scene transitions, and the complete custom-engine behavior have not been reproduced or end-to-end verified. The later character sequences still need a full-song browser test. The reference's speaking pose is aligned visually to its shown time; that alignment is not claimed as an exact native timing recovery.

## Build

From `engines/kade-engine-1.2`, run:

```
haxelib run lime build html5
```

Output: `export/release/html5/bin`. Build log: `engines/kade-engine-1.2-build-final.log`. The local `.haxelib` selects installed versions without changing the global library selection; versions are recorded in `engines/kade-engine-1.2-library-versions.json`.

Run the concurrent local asset server from the workspace root:

```
node engines/serve-kade.mjs
```

Upstream: https://github.com/KadeArchive/Kade-Engine, tag `1.2-KE`, commit `ee0fd5b9004c7fa05b9a4bfe3f86eef145c77d89`. Original engine license is included. Original Golden Apple assets and executable remain intact in the workspace.

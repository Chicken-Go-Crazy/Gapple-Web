# Frustration HTML5 progress

Select Frustration with Left/Right in Play, then Enter. It runs the compiled Haxe/Kade PlayState with the original song chart and audio. Orthogonal's BF has also been lowered from Y=508 to Y=675 to account for the converted atlas origin, and its mountains now use the recovered (-200,-120) position.

## Implemented and checked

- All 1,503 Frustration heads preserve authored times, directions, sustain lengths and section ownership. The 32 `imposter` type tags remain in the adapted chart. Original 182 BPM and speed 2.8 are retained. The original Ogg files are transcoded to HTML5 MP3.
- Dave uses both original, unmodified sprite sheets. Tracks include three 12-frame idles, a 12-frame angry idle, eight 18-frame normal/angry sing tracks, 25-frame grr, 57-frame NEW_huh, 28-frame NEW_fall and 90-frame NEW_chair. Original offsets, scale 1.66666666667 and pixel filtering are retained. BF's thinking/run/collision and GF's huh/fall/12-frame portal loop come from the shipped cutscene sheets. Base BF singing tracks remain separate.
- Original Frustables artwork repeats using FlxBackdrop, with the EXE's actual GlitchShader fragment (VA 0x1422cbac8, speed 2, frequency 5, amplitude .1). The HUD-space WavySprite uses the shipped WavyShader and native 2/2/.1 parameters, 1.75 scale and wrapping.
- All 38 chart camera/animation events dispatch. Camera event durations honor BEATS, SECTIONS and SECONDS; a snap followed by another camera event in one pack starts at the snapped point.
- The original Lua scheduling script was executed to export all 1,452 set/ease events, including player targeting, easing names and the modulo-angle callback marker. A compiled scheduler handles values and the classics callback independently of monitor refresh rate. Completed tracks are removed.
- Current planar modifier rendering includes field rotationZ, angle/per-lane angle, dizzy head rotation, zigzag, confusion offsets, flip/invert, y/per-lane y, zoom/x/y, tiny/x/y/per-lane tiny, mini size, xmod, dark receptors, drunk, tipsy, wave and brake. Field rotation uses a shared midpoint and half-height pivot, applied before field zoom. Tiny, tinyX/Y and mini scale factors multiply rather than cancel each other. Drunk/tipsy use recovered beat-clock parameters and the native polynomial sine; the distance formulas are mapped to this port's Kade scrolling units.
- Note heads and hold widths respond to size changes. Heads, bodies and natural-length end caps share one continuous modchart lane path. Ribbons sample the curve with consistent normals and fractional clipping. End-cap arc lengths refresh when the moving path changes and cache repeated work within a frame.
- Press/glow artwork rotates about the same static receptor center at changing scales. The origin correction accounts for Flixel's unscaled origin translation.
- Hold-cap arc solving now uses a safeguarded Newton/bisection bracket (5.5 length integrations per checked case versus the previous 24 bisections). Fully collapsed fields have a bounded fallback. Moving notes stay active regardless of the old straight-line screen-edge cull.
- Original native idle-phase switches (steps 640/1152), angry/grr switch (1600), BF thinking/run beats and ending closeup/glitch/fades are connected. This ending is still under comparison, rather than a completed fidelity claim.
- Frustration has original selection artwork, metadata credits, Dave countdown, icon and health color. Its large asset library loads only when selected.

## Quick diagnostic route

`http://127.0.0.1:4173/?scene-preview=frustration&beat=164` starts the actual chart/PlayState near the first size/bend sequence, with health protected. `beat=415` checks the slower path/zoom passage. Normal gameplay remains available through the menus. Esc returns to the title. This is a manual review route, not evidence of an automated browser playthrough.

## Remaining fidelity work

The full native 3D modifier renderer is not yet ported: rotationX/Y of fields, perspective/depth modifiers (including TornadoZ, Bumpy, DrunkZ, DigitalZ and ParabolaZ), Twirl/Roll, centered paths, skew, per-note appearance transitions and native spiral-hold torsion still need completion. Scheduled values are retained even when a corresponding visual effect is pending. Imposter clone rendering is also pending; the type flags are preserved but currently use the normal singing path. Exact ending actor positions, camera motion and frame transitions still need visual comparison. The initial BF/GF placements and camera centers are adapted to converted atlases and remain subject to review.

Compilation and numerical tests do not establish GPU output or full-song visual accuracy. Browser automation was unavailable under the current access policy, so no live visual parity claim is made.

## Reproduction and evidence

- `prepare-frustration.py`: copies original assets, preserves chart data and transcodes audio.
- `export-frustration-modchart.py`: executes the original Lua scheduling code using Lupa; temporary runtime was installed under `/private/tmp/golden-lua`.
- `recover-frustration-native.py`: read-only EXE/source annotation, original shader extraction and native modifier index recovery.
- `decompiled/native/frustration/`: annotated native scene/cutscene/clone functions, modifier functions/index table and byte-extracted shader fragment. The Windows executable was not run.
- `verify-frustration.mjs`: actual compiled character/camera checks, every chart head, original image hashes and base/cutscene animation separation.
- `verify-frustration-modchart.mjs`: 1,452 event dispatches, finite states, track cleanup, pause stability and 60/144 Hz agreement.
- `verify-frustration-paths.mjs`: 7,020 lane/curve/cap/native-sine checks across speed, wave, scroll-direction, rotation, size and original unequal receptor canvas combinations. Also checks native zigzag peaks, dizzy head rotation and bounded cap-solving cost.
- `verify-receptor-alignment.mjs`: original frames at five rotation angles and three scales, in addition to normal press/glow anchoring.

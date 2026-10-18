# SecretWay: frustration category song integration

The original `Category.new` group contains eleven songs. The first playable batch
uses their shipped charts, original artwork and character configurations in the
existing Kade Engine 1.2 HTML5 project. It does not route these songs to Applecore.

| Song | Original note heads | Current web integration |
| --- | ---: | --- |
| Sugar Rush | 683 | Playable: candy Bandu, normal/microphone singing tracks, alternating dances, GF-only sprite, candy stage, subtitles, native zoom/bar/dimming cues |
| Gift Card | 945 | Preview only; pixel character changes and scene integration pending |
| Ready Loud | 952 | Playable: Bandu facecam camera, Flumpty behind/in front of room, five jump-scare/attempt cues, ending owl |
| Tantalum | 975 | Preview only; OC scene and scripted character transitions pending |
| Strawberry | 336 | Preview only; OC scene and scripted character transitions pending |
| Nutty | 618 | Preview only; OC scene and scripted character transitions pending |
| Keyboard | 859 | Preview only; OC scene and scripted character transitions pending |
| Enforcers | 322 | Playable: original two-layer stage, Sammy/Bambop, separate vocal tracks, authored chart camera events and HUD reveal |
| NFT | 814 | Preview only; NFT composition, cameras and character swap pending |
| Cooking Lesson | 1,261 | Playable: Zambi/3D BF, four original stage layers, recovered glitch shader, subtitles |
| Slices | 1,272 | Playable: original Bandu atlas, 1.35-scale stage, awesome note atlas and splash offsets |

Total for the five playable charts: **4,490 original note heads**. Preparation
retains the source timestamps, lanes, durations, BPM/speed and section alternate
animation flags. Optional section fields are filled only when absent. Frame names
are matched to complete numbered tracks, so a normal prefix does not consume its
alternate or miss animation.

## Native evidence

- SugarRush constructor `0x141303130`, background `0x141305270`, positioning
  `0x141304e90`, beat timeline `0x1413036c0`, step timeline `0x141305980`.
- The SugarRush virtual table has `beatHit` at PE VA `0x142388178`, offset `0x250`.
  Thus virtual offsets `0x2f0`/`0x2f8` resolve to BaseSong.makeCinematicBars and
  BaseSong.moveCinematicBars, rather than camera focus functions.
- Ease closure wrappers `0x1411b5020` and `0x1411b5450` point to FlxEase.quadOut
  (`0x1411b0aa0`) and FlxEase.sineInOut (`0x1411b1350`), respectively. The bars'
  default easing wrapper `0x1411b54b0` points to sineOut (`0x1411b14b0`).
- PlayState field `0x3b8` is camZoomIntensity, confirmed by the BaseSong setter;
  `0x3a0` is camBeatSnap. It does not control camera follow speed.
- Sugar Rush's backdrop scale is the original double at PE VA `0x1423882e8`:
  `2.08725926`, positioned at `(-1130, 0)`.
- CookingLesson constructor `0x141ed59d0`, background `0x141ed6220`, positioning
  `0x141ed5f30`; Slices background `0x1409f71b0`, positioning `0x1409f7010`.
- Ready Loud and Enforcers use the original `assets/songs/<id>/script.hxc` source,
  with Enforcers' chart events retained in its song library.

Annotated routines and original script snapshots are alongside this file. These
are recovered native bodies, not recovered original Haxe source. Character/stage
geometry and event constants come from the above evidence; camera follow and HUD
plumbing use this port's existing renderer. Exact visual parity remains unverified.

## Loading and navigation

Each song has a separate deferred asset library, loaded on selection and released
when returning to the extras menu. Enforcers retains separate player/opponent
vocals, including pause/resume resynchronization. Pause, restart, completion and
game-over exit handle extras without requiring missing main-song header art.

Open `http://127.0.0.1:4173/?extras=frust&touch=1` to enter this category directly.
Up/down selects a song; Enter/OK starts a playable song. Space previews it. Entries
still awaiting song integration continue to say so and play only a preview.

Rebuild assets with `python3 engines/prepare-frust-extras.py`; compile from
`engines/kade-engine-1.2` using `haxelib run lime build html5`.

No song, browser automation or regression tests were run, as requested. A
successful HTML5 compile confirms compilation only, not 100% fidelity or stability.

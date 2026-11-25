// The Tired Dark Lord — a 100-word villain monologue.
//
// Concept (winner of a 3-variant concept test): the Dark Lord is so tired
// he does not fight the hero — he headhunts him. He offers the hero the
// crown, the tower and the cursed sword, and retires to grow turnips.
// Tiredness lives in the rhythm, the pauses and the deflection (delegating
// the villainy), never in a plain statement of weariness. Specifics: the
// ninth hero this decade, 214 sieges, a tower built at twenty-three, four
// centuries of roof leaks, unionised ravens, a knee that predicts rain,
// the Northern Reaches, a cursed sword that never shuts up. The sting
// lands in the last line: "The hours are terrible."
//
// The program is deterministic and offline: it writes the fixed monologue
// (exactly 100 words, 568 characters, inside the gate's 1-600 characters)
// to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const MONOLOGUE =
  "You again. Ninth hero this decade. I counted. Two hundred and fourteen sieges, and not one of you ever knocks. Sit down. No, not the throne. The other chair. Listen. I built this tower at twenty-three, bright-eyed, full of prophecies. Four centuries later the roof leaks, the ravens unionised, and my left knee predicts rain. So here is my scheme, hero. Take the crown. Take the tower, the dungeons, the cursed sword. It talks. It never shuts up. Rule the Northern Reaches. I will be in the garden, growing turnips in peace. The crown fits you. The hours are terrible.";

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function main(outPath = "/output/entry.txt"): void {
  const words = wordCount(MONOLOGUE);
  if (words !== 100) {
    throw new Error(`monologue must be exactly 100 words, got ${words}`);
  }
  if (MONOLOGUE.length < 1 || MONOLOGUE.length > 600) {
    throw new Error(
      `monologue must be 1-600 characters, got ${MONOLOGUE.length}`,
    );
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, MONOLOGUE, "utf8");
  // Verify the round-trip: what the judge will read must be byte-identical
  // to the monologue above, so a partial or mangled write can never ship.
  const written = readFileSync(outPath, "utf8");
  if (written !== MONOLOGUE) {
    throw new Error("entry.txt round-trip mismatch: written text differs");
  }
}

main(process.argv[2]);

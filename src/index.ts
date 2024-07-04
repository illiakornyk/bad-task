import * as fs from "fs";
import * as readline from "readline";
import { getFilePathFromArgs } from "./cli";

interface State {
  nums: number[];
  maxNum: number;
  minNum: number;
  sum: number;
  totalNumbers: number;
  longestIncSeq: number[];
  currentIncSeq: number[];
  longestDecSeq: number[];
  currentDecSeq: number[];
}

function processLine(num: number, state: State): void {
  state.nums.push(num);
  state.sum += num;
  state.totalNumbers++;

  // Update min and max
  state.maxNum = Math.max(state.maxNum, num);
  state.minNum = Math.min(state.minNum, num);

  updateLongestSequence(num, state.currentIncSeq, state.longestIncSeq, true);
  updateLongestSequence(num, state.currentDecSeq, state.longestDecSeq, false);
}

function updateLongestSequence(
  num: number,
  currentSeq: number[],
  longestSeq: number[],
  isIncreasing: boolean
): void {
  if (
    currentSeq.length === 0 ||
    (isIncreasing
      ? num >= currentSeq[currentSeq.length - 1]
      : num <= currentSeq[currentSeq.length - 1])
  ) {
    currentSeq.push(num);
  } else {
    if (currentSeq.length > longestSeq.length) {
      longestSeq.splice(0, longestSeq.length, ...currentSeq);
    }
    currentSeq.length = 0;
    currentSeq.push(num);
  }
}

function calculateMedian(nums: number[]): number {
  const sorted = nums.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function processFile(filePath: string) {
  console.time("Total Processing Time");

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const state: State = {
    nums: [],
    maxNum: Number.MIN_SAFE_INTEGER,
    minNum: Number.MAX_SAFE_INTEGER,
    sum: 0,
    totalNumbers: 0,
    longestIncSeq: [],
    currentIncSeq: [],
    longestDecSeq: [],
    currentDecSeq: [],
  };

  for await (const line of rl) {
    const num = parseInt(line);
    if (isNaN(num)) {
      console.error(`Non-numeric data encountered: ${line}`);
      continue;
    }
    processLine(num, state);
  }

  // Final sequence check
  checkFinalSequence(state.currentIncSeq, state.longestIncSeq);
  checkFinalSequence(state.currentDecSeq, state.longestDecSeq);

  const mean = state.sum / state.totalNumbers;
  const median = calculateMedian(state.nums);

  console.log(`Maximum number: ${state.maxNum}`);
  console.log(`Minimum number: ${state.minNum}`);
  console.log(`Median: ${median}`);
  console.log(`Arithmetic mean: ${mean}`);
  console.log(
    `Longest increasing sequence: ${
      state.longestIncSeq.length
    } elements, ${state.longestIncSeq.join(", ")}`
  );
  console.log(
    `Longest decreasing sequence: ${
      state.longestDecSeq.length
    } elements, ${state.longestDecSeq.join(", ")}`
  );

  console.timeEnd("Total Processing Time");
}

function checkFinalSequence(currentSeq: number[], longestSeq: number[]): void {
  if (currentSeq.length > longestSeq.length) {
    longestSeq.splice(0, longestSeq.length, ...currentSeq);
  }
}

const filePath = getFilePathFromArgs();
if (!filePath) {
  console.error("Usage: node script.js -- --file <path_to_file>");
  process.exit(1);
}

processFile(filePath).catch((error) => {
  console.error("Error processing file:", error);
  process.exit(1);
});

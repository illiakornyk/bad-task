import * as fs from "fs";
import * as readline from "readline";

interface SequenceResult {
  sequence: number[];
  length: number;
}

// Process each line and update the state
function processLine(num: number, state: any): void {
  state.nums.push(num);
  state.sum += num;
  state.totalNumbers++;

  // Update min and max
  state.maxNum = Math.max(state.maxNum, num);
  state.minNum = Math.min(state.minNum, num);
}

// Calculate median of the numbers
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

  const state = {
    nums: [],
    maxNum: Number.MIN_SAFE_INTEGER,
    minNum: Number.MAX_SAFE_INTEGER,
    sum: 0,
    totalNumbers: 0,
  };

  for await (const line of rl) {
    const num = parseInt(line);
    if (!isNaN(num)) {
      processLine(num, state);
    }
  }

  const mean = state.sum / state.totalNumbers;
  const median = calculateMedian(state.nums);

  console.log(`Maximum number: ${state.maxNum}`);
  console.log(`Minimum number: ${state.minNum}`);
  console.log(`Median: ${median}`);
  console.log(`Arithmetic mean: ${mean}`);

  console.timeEnd("Total Processing Time");
}

processFile("./10m.txt").catch(console.error);

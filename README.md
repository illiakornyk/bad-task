# Number Analyzer

This project is a Node.js-based application written in TypeScript that processes a large set of integers from a file and calculates various statistics. It is designed to handle potentially very large files efficiently and provides statistical insights such as maximum, minimum, median, and arithmetic mean values, as well as identifying the longest increasing and decreasing sequences of numbers.

## Features

- **Maximum Value**: Finds the highest number in the dataset.
- **Minimum Value**: Finds the lowest number in the dataset.
- **Median**: Calculates the median value of the dataset.
- **Arithmetic Mean**: Computes the average of all numbers.
- **Longest Increasing Sequence**: Identifies the longest sequence of consecutively increasing numbers (optional).
- **Longest Decreasing Sequence**: Identifies the longest sequence of consecutively decreasing numbers (optional).

## Requirements

- Node.js (https://nodejs.org/)
- TypeScript (https://www.typescriptlang.org/)

## Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/illiakornyk/bad-task.git
cd number-analyzer
```

Install the necessary Node.js dependencies:

```bash
npm install
```

Compile the TypeScript files:

```bash
npm run build
```

## Usage

To run the program, you need to specify the path to the input file containing the integers as follows:

```bash
npm run start -- --file <path_to_your_input_file>
```

For development and testing purposes, you can use the following command which also compiles the TypeScript files:

```bash
npm run dev -- --file <path_to_your_input_file>
```

## Example

```bash
npm run start -- --file ./data/numbers.txt
```

This will process the file numbers.txt located in the data directory and output the calculated statistics.

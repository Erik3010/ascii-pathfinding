const testCases = [
  {
    test: [
      "O     ",
      "XXX XX",
      "      ",
      "XXXX  ",
      "      ",
      "XXX XX",
      "      ",
      "      ",
      "------",
    ],
    expected: [
      "Oooo  ",
      "XXXoXX",
      "   oo ",
      "XXXXo ",
      "   oo ",
      "XXXoXX",
      "   o  ",
      "   o  ",
      "------",
    ],
  },
  {
    test: [
      "     O ",
      "XXX XXX",
      "       ",
      " XXXXXX",
      "       ",
      " XXXX  ",
      "       ",
      "XXXX XX",
      "       ",
      "XX XXXX",
      "       ",
      "-------",
    ],
    expected: [
      "   ooO ",
      "XXXoXXX",
      "oooo   ",
      "oXXXXXX",
      "o      ",
      "oXXXX  ",
      "ooooo  ",
      "XXXXoXX",
      "  ooo  ",
      "XXoXXXX",
      "  o    ",
      "-------",
    ],
  },
  {
    test: [
      "O      ",
      "XX XX XX",
      "        ",
      "     XXX",
      "        ",
      "XXXXXXX ",
      "        ",
      "X XX XXX",
      "        ",
      "X XXXXX ",
      "        ",
      "--------",
    ],
    expected: [
      "Ooo    ",
      "XXoXX XX",
      "  o     ",
      "  o  XXX",
      "  oooooo",
      "XXXXXXXo",
      "    oooo",
      "X XXoXXX",
      " oooo   ",
      "XoXXXXX ",
      " o      ",
      "--------",
    ],
  },
];

function generateSlimeRoute(array) {
  const house = "O";
  const block = "X";
  const body = "o";
  const ground = "-";
  const route = " ";

  const result = [];

  const getRoutes = (row, currentPosition) => {
    const store = {};

    row.forEach((r, idx) => {
      if (r === route) {
        store[idx] = Math.abs(idx - currentPosition);
      }
    });

    return store;
  };

  for (let row = 0; row < array.length - 1; row++) {
    const cols = array[row].split("");

    let cursor = cols.indexOf(row === 0 ? house : body);

    const routeList = getRoutes(array[row + 1].split(""), cursor);
    const goal = Object.keys(routeList).reduce(
      (key, v, i) => (!i || +routeList[v] < +routeList[key] ? +v : +key),
      undefined
    );

    // if (goal === undefined) continue;

    let distance = Math.abs(goal - cursor);
    const inc = goal < cursor ? -1 : 1;

    while (distance) {
      cols[cursor + inc] = body;
      cursor += inc;
      distance--;
    }

    if (row < array.length - 2) {
      const temp = array[row + 1].split("");
      temp[cursor] = body;
      array[row + 1] = temp.join("");
    }

    result.push(cols);
  }
  result.push(array[array.length - 1].split(""));

  const output = result.map((res) => res.join(""));

  return output.join("\n");
}

// console.log(testCases[0].expected.join("\n"));
// console.log(testCases[0].test.join("\n"));
// console.log(generateSlimeRoute(testCases[0].test));

// console.log(testCases[1].expected.join("\n"));
// console.log(testCases[1].test.join("\n"));
// console.log(generateSlimeRoute(testCases[1].test));

console.log(testCases[2].expected.join("\n"));
console.log(testCases[2].test.join("\n"));
console.log(generateSlimeRoute(testCases[2].test));

// TODO: For test function
// function test(input, expect) {
//   return input.every((item, index) => {
//     return item === expect[index];
//   });
// }
// console.log(
//   "Test case0",
//   test(generateSlimeRoute(testCases[0].test), testCases[0].expected)
// );
// console.log(
//   "Test case 1:",
//   test(generateSlimeRoute(testCases[1].test), testCases[1].expected)
// );
// console.log(
//   "Test case 2:",
//   test(generateSlimeRoute(testCases[2].test), testCases[2].expected)
// );

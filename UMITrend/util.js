const R = require('ramda')

const sortByTerm = arr => {
  const order = {
    'S1': 0,
    'SA': 1,
    'S2': 2,
    'S': 3,
    'W1': 4,
    'WA': 5,
    'W2': 6,
    'WC': 7,
    'W': 8
  }
  return R.sort((a, b) => {
    if (a.year === b.year) {
      return (order[a.term] < order[b.term]) ? -1
        : (order[a.term] > order[b.term]) ? 1 : 0
    } else {
      return (a.year < b.year ? -1 : 1)
    }
  }, arr)
}

export {
  sortByTerm
}

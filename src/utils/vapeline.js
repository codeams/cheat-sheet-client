// let forceArray = x => x instanceof Array ? x : [x]
// let isPartOf = (x, y) => y.indexOf(x) >= 0
// let compare = (x, y, permissive) => permissive ? isPartOf(x, y) : x === y
// /**
//  * The vape:
//  * Take a list, an attribute name and an array of values,
//  * return a list with the elements in which the attribute matches
//  * (according to the options) one or more of the given values.
//  */
// let vape = (list, attr, values, permissive, sensitive) => {
//   return list.filter(element => {
//     let satisfy = false
//     for (let index in values) {
//       let value = values[index]
//       let compareTo = element[attr]
//       if (!sensitive) { // Of course, false by default
//         value = value.toLowerCase()
//         compareTo = compareTo.toLowerCase()
//       }
//       if (compare(value, compareTo, permissive)) {
//         satisfy = true
//         break
//       }
//     }
//     return satisfy
//   })
// }
// /**
//  * The pipe:
//  * Takes an array of filters and vape them
//  */
// let pipe = (list, filters) => {
//   filters = forceArray(filters)
//   return filters.reduce((list, filter) => {
//     if (!filter) return list
//     let { attribute: attr } = filter
//     let { values } = filter
//     let { partialMatches: permissive } = filter
//     let { caseSensitive: sensitive } = filter
//     values = forceArray(values)
//     return vape(list, attr, values, permissive, sensitive)
//   }, list)
// }
// export default { vape, pipe }

/* Bridgers */
let isDefined = x => x !== false && x !== undefined && x !== null
let isPartOf = (x, y) => y.indexOf(x) >= 0
let areEqual = (x, y, permissive, sensitive) => {
  // Remove null values
  x = typeof x === 'string' ? x : '' + x
  y = typeof y === 'string' ? y : '' + y
  //

  if (!sensitive) {
    x = x.toLowerCase()
    y = y.toLowerCase()
  }

  if (permissive) return isPartOf(x, y)
  else return x === y
}

/* Transformers */
let forceArray = x => x instanceof Array ? x : [x]
let removeFalses = x => x.filter(y => isDefined(y))
let transformOptions = (options, type) => {
  let { partialMatches: permissive, caseSensitive: sensitive } = options

  if (type === 'filter') {
    let { attribute: attr, values } = options
    return { attr, values, permissive, sensitive }
  } else {
    // console.log('Running options-transform for search')
    let { attributes: attrs, value } = options
    return { attrs, value, permissive, sensitive }
  }
}

/* Sanitizers */
let sanitizeFilters = filters => {
  filters = forceArray(filters)
  filters = removeFalses(filters)

  return filters

  // TODO: Sanitize each filter accordig to its type
  // TODO: Ignore invalid filters
}

/* Filters */
let vape = (list, { attr, values, permissive, sensitive }) => {
  let output = list.filter(elem => {
    for (let index in values) {
      let satisfy = areEqual(values[index], elem[attr], permissive, sensitive)
      if (satisfy) return true
    }
    return false
  })
  return output
}

let search = (list, { attrs, value, permissive, sensitive }) => {
  // console.log('Search method called')
  // console.log('list', list)
  // console.log('attrs', attrs)
  // console.log('value', value)
  let output = list.filter(elem => {
    for (let index in attrs) {
      let satisfy = areEqual(value, elem[attrs[index]], permissive, sensitive)
      if (satisfy) return true
    }
    return false
  })
  // console.log('output', output)
  return output
}

let applyFilter = (list, filter) => {
  let { type } = filter

  if (type === 'filter') {
    let options = transformOptions(filter, 'filter')
    return vape(list, options)
  } else {
    // console.log('options before transform', filter)
    let options = transformOptions(filter, 'search')
    // console.log('options after transform', options)
    return search(list, options)
  }
}

/* Vapeline interface */
let vapeline = (list, filters) => {
  list = list instanceof Array ? list : false
  filters = sanitizeFilters(filters)

  if (list === false) return false

  // We asume that everything that comes out of the
  // main sanitizer is sane, if it isn't then just let
  // it crash. LOL
  let output = filters.reduce((list, filter) => {
    return applyFilter(list, filter)
  }, list)
  return output
}

export default vapeline

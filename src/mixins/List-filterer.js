
import Vapeline from '@/utils/vapeline'

let ListFilterer = {
  data () {
    return {
      query: '',
      tabValues: ''
    }
  },

  computed: {
    queryFilter () {
      if (this.query === '') return false

      return {
        type: 'search',
        attributes: this.searchableAttributes,
        value: this.query,
        partialMatches: true,
        caseSensitive: false
      }
    },
    tabFilter () {
      if (this.tabValues === '') return false

      return {
        type: 'filter',
        attribute: this.tabFilterColumn,
        values: this.tabValues instanceof Array ? this.tabValues : [this.tabValues],
        partialMatches: true,
        caseSensitive: true
      }
    },
    filteredList () {
      return Vapeline(this.list, [this.queryFilter, this.tabFilter])
    }
  }
}

export default ListFilterer

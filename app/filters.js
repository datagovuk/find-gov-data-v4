module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  filters.get_link_size = function(datafile) {
    if (datafile.format == 'HTML') return ''

    if (datafile.size == 0) {
      return ''
    }

    kb = Number((datafile.size / 1000).toFixed(1))
    if ( kb > 1024 ) {
      kb = Number((kb / 1000).toFixed(1))
      return ' (' + kb + 'Mb)'
    }
    return ' (' + kb + 'Kb)'
  }

  filters.generate_summary = function(dataset) {
    const edit_date = Date.parse(dataset.last_edit_date)
    const new_date = Date.parse("2017-04-01")
    if (edit_date > new_date) {
      return dataset.summary
    }

    const stop_punctuation = ['.', '!', '?', ',', '\n']
    const start_idx = 160
    const seek_idx = 30

    if (dataset.notes.length <= start_idx ||
        dataset.notes[start_idx] in stop_punctuation ) {
      return dataset.notes
    }

    // Is there punctuation up to 30 chars before the pivot point?
    for( var i = start_idx; i >= start_idx-seek_idx; i--) {
      if ( stop_punctuation.indexOf(dataset.notes[i]) != -1) {
        return dataset.notes.substring(0, i)
      }
    }

    // Is there punctuation up to 30 chars after the pivot point
    for( var i = start_idx; i <= start_idx+seek_idx; i++) {
      if (stop_punctuation.indexOf(dataset.notes[i]) != -1) {
        return dataset.notes.substring(0, i)
      }
    }

    // Panic stations, is this description actually just a
    // single sentence?
    for( var i = start_idx; i >= 0; i--) {
      if ( stop_punctuation.indexOf(dataset.notes[i]) != -1) {
        return dataset.notes.substring(0, i)
      }
    }

    return dataset.notes.substring(0, start_idx)
  }

  filters.datalink_updated = function(datalink) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    if (datalink.start_date) {
      const  start = Date.parse(datalink.start_date)
      const  end = Date.parse(datalink.end_date)

      var diff =  end - start
      var date = new Date(start + (diff * Math.random()))

      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    return 'Not available'
  }

  filters.calculate_date = function(resource, updated) {
    const start = resource.start_date
    if (start) {
      const year = start.substring(0, 4)
      const month = start.substring(5, 7)
      const day = start.substring(8, 11)
      switch(updated) {
        case 'annually':
        case 'financial-year':
          return `<td>${year}</td>`
        case 'weekly':
          return `<td>${day}/${month}/${year}</td>`
        case 'monthly':
        case 'quarterly':
          return `<td>${month}/${year}</td>`
        case 'daily':
          return '<td>Continuous</td>'
        default:
          return '<td class="no-date-added">Not applicable</td>'
      }
    }
  }

  filters.display_line_count = function( lineCount ) {
    if ( lineCount == -1 ) {
      return  ""
    } else {
      return  `You're previewing 5 rows out of approximately ${lineCount} in this file`
    }
  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}

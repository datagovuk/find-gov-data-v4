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

  filters.generate_summary = function(dataset) {
    const edit_date = Date.parse(dataset.last_edit_date)
    const new_date = Date.parse("2017-04-01")
    if (edit_date > new_date) {
      return dataset.summary
    } else {
      return dataset.notes
    }
/*
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
*/
  }

  filters.sortedByDisplay = function(option) {
    switch (option) {
      case 'recent':
        return 'Most recent'
      case 'viewed':
        return 'Most viewed'
      case 'best':
        return 'Best match'
    }
  }

  filters.orgTypDisplay = function(orgTypes) {
    var types = orgTypes.map(function(abreviation){
      if (abreviation == 'central-gov') {
        return 'Central Government'
      } else if (abreviation =='local-auth') {
        return 'Local Authorities'
      } else {
        return 'Other government bodies'
      }
    })
      if (types.length == 1) {
        return types[0]
      } else if (types.length == 2) {
        return `${types[0]}' <span class="normal">or</span> '${types[1]}`
      } else {
        return `${types[0]}', '${types[1]}' <span class="normal">or</span> '${types[2]}`
      }
    }


  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}

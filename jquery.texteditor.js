/*
 * textEditor, jQuery plugin
 * Copyright (c) 2010 Colin Drake
 * Licensed under the MIT license.
*/
(function ($)
{
  $.fn.extend(
  {
    textEditor: function (options)
    {
      // Get default options, and merge with provided
      var defaults =
      {
        controls: {},                     // formatting controls to show
        substitution_string: '%s',        // replaced w/prompt_text or selection
        prompt_string: 'type text here',  // replaces sub string when no text is selected
        ul_class: 'format-ul',            // list class
        li_class: 'format-li'             // list element class
      };
      var options = $.extend(defaults, options);

      // For each matched <textarea>
      return this.each(function ()
      {
        // Grab object and generate list
        var obj = $(this);
        var list = $(document.createElement('ul'))
                    .addClass(options.ul_class)
                    .insertBefore(obj);

        // Add all formatting buttons from options
        for (option in options.controls)
        {
          // Generate formatting button
          var format = options.controls[option];
          $(document.createElement('li'))
            .html(option)
            .addClass(options.li_class)
            .click(function() {
              // Get selection and replacement
              var selection = $(obj).getSelection();
              var replacement = options.controls[$(this).html()];

              // Either insert or replace text
              if (selection.text == '') {
                var r = new String(replacement.replace(options.substitution_string, options.prompt_string));
                var index = r.indexOf(options.prompt_string);
                $(obj).insertAtCaretPos(r);
                $(obj).setSelection(selection.start + index, selection.start + index + options.prompt_string.length);
              } else {
                $(obj).replaceSelection(replacement.replace(options.substitution_string, selection.text), true);
              }

              return false;
            })
            .appendTo(list);
        }
      });
    }
  });
})(jQuery);

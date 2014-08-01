/*
bitflower StyleSwap jQuery Plugin
Copyright bitflower e.K. 2014
License Information at <http://www.bitflower.net>

@author Matthias Max @ bitflower e.K.

*/

(function ($) {

    // Globale Me Variable
    var me;

    $.styleSwap = function (options, callback) {

        if (typeof options == "function") {
            callback = options;
        }

        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            selectorStyles: [],
            backupSelectorStyles: []
        }, options);

        me = this;

        // Array containing the original style settings
        //var $returnArray = [];

        // Loop through selectors
        for (var i = 0; i < settings.selectorStyles.length; i++) {

            var $returnSelector = {};

            var $selector = settings.selectorStyles[i].selector;
            var $styles = settings.selectorStyles[i].styles;

            // Backup selector
            $returnSelector.selector = $selector;
            $returnSelector.styles = [];

            // Loop through styles of selector
            for (var s = 0; s < $styles.length; s++) {

                // Backup style
                var $returnStyle = {};
                $returnStyle.name = $styles[s].name;
                $returnStyle.value = $($selector).css($styles[s].name);

                $returnSelector.styles.push($returnStyle);

                // Set stylen
                if ($styles[s].value == '') {

                    $($selector).css($styles[s].name, "");

                } else {

                    $($selector).css($styles[s].name, $styles[s].value);

                }


            }

            settings.backupSelectorStyles.push($returnSelector);

        }

        // Call callback containing the backed up styles array
        if (typeof callback == "function") callback(settings.backupSelectorStyles);

        return settings.backupSelectorStyles;

    };
})(jQuery);
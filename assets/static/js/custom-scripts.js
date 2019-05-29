/*
Star Fleet Tours Website
Copyright (c) 2019- Star Fleet Tours

Code released under the terms of the MIT (Expat) License:
https://opensource.org/licenses/MIT
*/


;(function () {

    'use strict';


    // Style all "star" symbols
    var styleStarGlyph = function() {
        $('body:contains("\u2726")').contents().each(function () {
            if (this.nodeType == 1) {
                $(this).html(function (_, oldValue) {
                    return oldValue.replace(/\u2726/g, "<span class='themed-text'>$&</span>")
                })
            }
        })
    };


    // Document on load
    $(function(){
        styleStarGlyph();
    });

}());

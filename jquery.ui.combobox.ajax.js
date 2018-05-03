/* 

file: jquery.ui.combobox.js
author: ravenmyst
description: generates a jquery ui widget autocomplete combobox that works tailored to the desired application called by the initializer.

example params: {
    source_path_string: "/dir/cfcs/item.cfc",
    source_method_string: "getItems",
    submit_element_id_string = "item_id",
    placeholder_string = "Please type item name or select from the list..."
}

*/
function initializeComboBox(source_path_string, source_method_string, submit_element_id_string, placeholder_string) {
    $.widget( "ui.combobox", {
        _create: function() {
            var self = this,
                select = this.element.hide(),
                selected = select.children( ":selected" ),
                value = selected.val() ? selected.text() : "";
                var input = this.input = $( '<input placeholder="' + placeholder_string + '">' )
                .insertAfter( select )
                .val( value )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: function ( request, response ) {
                        $.ajax({
                            url: source_path_string,
                            data: {
                                method: source_method_string,
                                term: request.term,
                                limit: 300
                            },
                            success: function ( data ) {
                                response(data);
                            }
                        });
                    },
                    select:function(event,ui) {
                        $("#" + submit_element_id_string).val(ui.item.VALUE);
                        $("#searchForm").submit();
                    },
                    //this prevents click spam to delay query propagation for large lists.
                    close: function (event, ui) { 
                        tempEnable();
                    },
                    change: function( event, ui ) {
                        if ( !ui.item ) {
                            var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                                valid = false;
                            select.children( "option" ).each(function() {
                                if ( $( this ).text().match( matcher )) {
                                    this.selected = valid = true;
                                    return false;
                                }
                            });
                            if ( !valid ) {
                                // remove invalid value, as it didn't match anything
                                $( this ).val( "" );
                                select.val( "" );
                                input.data( "uiAutocomplete" ).term = "";
                                return false;
                            }
                        }
                    }
                })
                .addClass( "ui-widget ui-widget-content ui-corner-left" );

            input.data( "uiAutocomplete" )._renderItem = function( ul, item ) {
                return $( "<li></li>" )
                    .data( "item.autocomplete", item )
                    .append( "<a>" + item.LABEL + "</a>" )
                    .appendTo( ul );
            };

            this.button = $( "<button type='button' onclick='tempDisable();' id='showAllBtn'>&nbsp;</button>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .insertAfter( input )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "ui-corner-right ui-button-icon" )
                .click(function() {
                    // close if already visible
                    if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                        input.autocomplete( "close" );
                        return;
                    }

                    // work around a bug (likely same cause as #5265)
                    $( this ).blur();

                    // pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                    
                    input.focus();

                    //dev setTimeout(autoSelect(input), 1000);
                });
        },

        //allows programmatic selection of combo using the option value
        setValue: function (value) {
            var $input = this.input;
            $("option", this.element).each(function () {
                if ($(this).val() == value) {
                    this.selected = true;
                    $input.val(this.text);
                    return false;
                }
            });
        },

        destroy: function() {
            this.input.remove();
            this.button.remove();
            this.element.show();
            $.Widget.prototype.destroy.call( this );
        }
    });
}

function tempDisable () { 
	$('#showAllBtn').attr("disabled", "disabled");
}
function tempEnable () {
	$('#showAllBtn').removeAttr("disabled");
}
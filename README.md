# jquery.ui.combobox.ajax

This is an easy to implement tiny jQuery UI Widget that spawns a combobox that allows a user to search, select, from a select list, and throttles ajax calls against a datasource! Example coming soon..

```javascript
$( document ).ready(function() {
    initializeComboBox('/path/cfcs/item.cfc', 'getItems', 'item_id', 'Please type item name or select from the list...');
	$( "#items" ).combobox();
});
```

To integrate a select element with this widget, insert this html markup:
```html
<form action="#cgi.script_name#" id="searchForm" method="post">
	<input type="hidden" name="item_id" id="item_id">
	Item ID: 
	<select id="items" size="25">
	<option selected="selected">#displayName#</option>
	</select>
</form>
```

The data from the datasource must be an array of objects, structured with these attributes as a JSON:
```
// in theory
object[array_position]
	obj[array_position].value = 1;
	obj[array_position].label = "Item 1";

// real example
object[0]
	obj[0].value = 5;
	obj[1].label = "Item 5";
```
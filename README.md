# jquery.ui.combobox.ajax.js

This is an easy to implement tiny jQuery UI Widget that spawns a combobox that allows a user to search, select, from a select list, and throttles ajax calls against a datasource! <a href="https://ravenmyst.net/work/combobox/">Demo/Example here</a>

```javascript
$( document ).ready(function() {
	initializeComboBox('/path/cfcs/item.cfc', 'getItems', 'item_id', 'Select or type an item..');
	$( "#items" ).combobox();
});

```

**initializeComboBox()**

| Parameter  | Description |
| ------------- | ------------- |
| path | relative path to datasource file |
| method | the invoked function in the file |
| html element | html element that stores the current selection |
| placeholder text | the default text that appears in the select input |

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

The data that results from the Ajax call must be an array of objects, structured with these attributes as a JSON:
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

The the following can be passed to the query as an argument to narrow the results:
```
%term%
```
The name of the query is inside the "method" variable.
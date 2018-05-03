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
```php
// php example of a valid structure to json_encode
<?php
	function getItemExamples() {
		result = [];
		obj = [];
		obj.value = 1;
		obj.label = "Item 1";
		array_push($result, $obj);
		obj = [];
		obj.value = 2;
		obj.label = "Item 2";
		array_push($result, $obj);
		header("Content-type:application/json");
		echo json_encode($result_array);
	}
?>
// for other languages: use their native array of object methods to package objects.
```

The the following can be passed to the query as an argument to narrow the results:
```
%term%
```

A simple way the term can be used to filter the result in php is as follows:
```php
$data = getTestItemsData();

$result_array = [];

foreach ($data as $element) {
	$temp_element = strtolower(trim($element["LABEL"]));
	if(strlen(trim($term)) !== 0) {
		$pos = strpos($temp_element, strtolower(trim($term)));
		if ($pos !== false) {
			array_push($result_array, $element);
		}
	} else {
		array_push($result_array, $element);
	}
	
}
```

The name of the query is inside the "method" variable.
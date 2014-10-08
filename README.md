# houdini.js

jQuery plugin to show/hide elements according to the state of checkbox/radio/select inputs

Works with IE 9, Chrome, Firefox, Safari

## Installation

Just include /src/houdini.js in your application

Or with bower `houdini`

Requires jQuery 1.7.1

## Usage

Lets say we have a form with some elements we want to show/hide

Initialize the plugin like this: 

```javascript
$("form").houdini();
```


### Checkbox

We want to be able to add a shipping address to our form

```html
<input type="checkbox" name="shipping_address">

<div data-show="shipping_address">
	... inputs for shipping address
</div>
```

The inputs for shipping address will only appear if the checkbox is `checked`

Notice the naming `shipping_address`

### Select/Radio

We want to show a message depending on what payment type the user choose

```html
<select name="payment">
	<option value="credit_card">Credit card</option>
	<option value="gift_card">Gift card</option>
	<option value="transfer">Bank transfer</option>
</select>

<h1 data-show="payment=credit_card">Credit card</h1>
<h1 data-show="payment=gift_card">Gift card</h1>
<h1 data-show="payment=credit_card">Bank transfer</h1>
<p data-show="payment=credit_card,gift_card">Your order will ship immediately</p>
<p data-show="payment=transfer">Your order will ship when we receive your payment</p>
```

We coud also use radio buttons

```html
<div><input type="radio" name="payment" value="credit_card"> Credit card</div>
<div><input type="radio" name="payment" value="gift_card"> Gift card</div>
<div><input type="radio" name="payment" value="transfer"> Bank transfer</div>
```

When using select or radio, we need to specify both the *name* and the *value* of the input: `payment=credit_card`

Notice we can also use multiple values: `payment=credit_card,gift_card`

Also check out the sample folder

## Contributing

1. Fork it ( https://github.com/askehansen/houdini.js/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
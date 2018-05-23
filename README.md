


> CC editor is a simple small extensible mobile-friendly WYSIWYG text editor for web, with no dependencies

[Live demo](https://zhangcheng-zh.github.io/CC-Editor/demo.html)

![](https://raw.githubusercontent.com/ZhangCheng-zh/CC-Editor/master/demo.gif)

## Features

* Pure JavaScript, no dependencies, written in ES6

Included actions:
- Bold
- Italic
- Underline
- Strike-through
- Heading 1
- Heading 2
- Paragraph
- Quote
- Ordered List
- Unordered List
- Code
- Horizontal Rule
- Link
- Image

Other available actions (listed at https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand):
- Justify Center
- Justify Full
- Justify Left
- Justify Right
- Subscript
- Superscript
- Font Name
- Font Size
- Indent
- Outdent
- Clear Formatting
- Undo
- Redo

Or create any custom action!

## Browser Support

* IE 9+
* Chrome 5+
* Firefox 4+
* Safari 5+
* Opera 11.6+

## Installation

#### npm:

```bash
npm install --save cceditor
```

## Usage

#### API

```js
// Initialize CCEditor on an HTMLElement
new CCEditor({
  // <HTMLElement>, required
  element: document.getElementById('some-id'),

  // <Function>, optional 默认为
  // (html) => console.log(html)
  onChange: html => console.log(html),


  // <Array[string | Object]>, string if overwriting, object if customizing/creating
  // action.name<string> (only required if overwriting)
  // action.icon<string> (optional if overwriting, required if custom action)
  // action.title<string> (optional)
  // action.result<Function> (required)
  // Specify the actions you specifically want (in order)
  actions: {
    bold: {},
    custom: {
      name: 'custom',
      icon: 'C',
      title: 'Custom Action',
      handler: () => console.log('Do something!')
    },
    underline:{}
  },

  // classes<Array[string]> (optional)
  // Choose your custom class names
  classesConfig: {
      editorClass: 'CCEditor',
      toolsbarClass: 'cc-toolsbar',
      contentClass: 'cc-content'
  },
})
```

#### List of overwriteable action names
- bold
- italic
- underline
- strikethrough
- heading1
- heading2
- paragraph
- quote
- orderlist
- unorderlist
- code
- line
- link
- image

#### Example 

```html
<script src='./dist/cceditor.min.js'></script>
<h2>CC Editor Demo</h2>
<div id="cc-editor"></div>
<div>
    Output:
    <div id="output"></div>
</div>
```

```js
(function (window) {
    var $el = document.querySelector('#cc-editor');
    var newCCEditor = new CCEditor({
        el: $el,
        onChange: (html) => {
            document.querySelector('#output').innerHTML = html;
        },
        actions: {
          custom: {
            name: 'custom',
            icon: '<b><u><i>C</i></u></b>',
            title: 'Custom Action',
            result: () => console.log('custom action')
          },
        },
    });
})(window)
```

## Custom Styles

#### CSS

```css
.CCEditor {
  width: 400px; 
  height: 400px; 
  border-width: 1px;
}

.CCEditor .cc-content {
  height: 400px;
}
```

## License

MIT

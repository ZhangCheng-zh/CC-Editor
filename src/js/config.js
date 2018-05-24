export const defaultConfig = {
    // 样式配置
    classesConfig: {
        editorClass: 'CCEditor',
        toolsbarClass: 'cc-toolsbar',
        contentClass: 'cc-content'
    },
    // 动作条配置项
    toolsbarConfig: {
        bold: {
            icon: '<b>B</b>',
            title: 'bold',
            state: () => document.queryCommandState('bold'),
            handler: () => this.exec('bold')
        },
        italic: {
            icon: '<i>I</i>',
            title: 'italic',
            state: () => document.queryCommandState('italic'),
            handler: () => this.exec('italic')
        },
        underline: {
            icon: '<u>U</u>',
            title: 'underline',
            state: () => document.queryCommandState('underline'),
            handler: () => this.exec('underline')
        },
        strikeThrough: {
            icon: '<s>S</s>',
            title: 'strikeThrough',
            state: () => document.queryCommandState('strikeThrough'),
            handler: () => this.exec('strikeThrough')
        },
        heading1: {
            icon: '<b>H<sub>1</sub></b>',
            title: 'heading 1',
            handler: () => this.exec('formatblock', '<h1>')
        },
        heading2: {
            icon: '<b>H<sub>2</sub></b>',
            title: 'heading 2',
            handler: () => this.exec('formatblock', '<h2>')
        },
        paragraph: {
            icon: '&#182;',
            title: 'paragraph',
            handler: () => this.exec('formatblock', '<p>')
        },
        blockquote: {
            icon: '&#8220; &#8221;',
            title: 'quote',
            handler: () => this.exec('formatblock', '<blockquote>')
        },
        insertOrderedList: {
            icon: '&#35;',
            title: 'Ordered list',
            handler: () => this.exec('insertOrderedList')
        },
        insertUnorderedList: {
            icon: '&#8226;',
            title: 'Unordered list',
            handler: () => this.exec('insertUnorderedList')
        },
        code: {
            icon: '&lt;/&gt;',
            title: 'Code',
            handler: () => this.exec('formatblock', '<pre>')
        },
        line: {
            icon: '&#8213;',
            title: 'Horizontal Line',
            handler: () => this.exec('insertHorizontalRule')
        },
        link: {
            icon: '&#128279;',
            title: 'url link',
            handler: () => {
                let url = window.prompt('请输入链接URL：');
                this.exec('createLink', url);
            }
        },
        image: {
            icon: '&#128247;',
            title: 'image link',
            handler: () => {
                let image = window.prompt('请输入图片链接：');
                this.exec('insertImage', image);
            }
        }
    },
    // 默认的输出方式，由content的oninput事件触发
    onChange: (html) => console.log(html)
}
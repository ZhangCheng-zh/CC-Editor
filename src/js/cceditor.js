import style from '../style.css'
class CCEditor {
    constructor(configs = {}) {
        var defaultConfig = {
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

        this.configs = Object.assign(defaultConfig, configs);

        this.classesConfig = this.configs.classesConfig;

        this.init(this.configs);
    }

    // 按照配置初始化编辑器
    init(configs) {
        if (!configs.el || configs.el.nodeType != 1) {
            return;
        }

        this.renderEditor(configs);
    }

    renderEditor(configs) {
        this.el = configs.el;
        this.el.classList.add(configs.classesConfig.editorClass);

        //添加工具栏
        var $toolsBar = document.createElement('ul');
        $toolsBar.className += ` ${this.classesConfig.toolsbarClass}`;

        // 添加编辑区
        var $editorContent = document.createElement('div');
        $editorContent.className = `${this.classesConfig.contentClass}`;

        $editorContent.contentEditable = true;

        this.el.appendChild($toolsBar);
        this.$toolsBar = $toolsBar;
        this.el.appendChild($editorContent);
        this.$editorContent = $editorContent;

        // render the tools bar
        this.renderToolsBar(configs.toolsbarConfig);
    }

    // 按照配置给的工具栏初始化编辑器工具栏
    renderToolsBar(toolsbarConfig = {}) {
        var vm = this;
        var $toolsBar = this.$toolsBar;

        for (let key in toolsbarConfig) {

            let item = toolsbarConfig[key];
            let $button = document.createElement('button');
            $button.setAttribute('title', item.title || '');
            $button.setAttribute('type', 'button');
            $button.innerHTML = item.icon || '';

            $button.onclick = () => {
                item.handler()
                    && vm.$editorContent.focus();
            }

            var updateStyleHandler = () => {
                if (item.state) {
                    var state = item.state();
                    state ?
                        this.addClass($button, 'active') :
                        this.removeClass($button, 'active');
                }
            }

            // 按照当前编辑器设置项状态更新对应设置项的样式
            this.addEventListener($button, 'click', updateStyleHandler)
            this.addEventListener(vm.$editorContent, 'mouseup', updateStyleHandler)

            $toolsBar.appendChild($button);
        }

        this.checkParagraph();
    }

    // 第一行添加p标签
    checkParagraph() {
        let vm = this;
        let handler = function (e) {
            let content = vm.$editorContent.innerHTML;
            let contentString = content.toString();
            let regexp = /<|>/g;

            if (contentString.indexOf('<') == -1) {
                vm.exec('formatblock', '<p>');
            } else if (contentString == '<p><br></p>') {
                vm.$editorContent.innerHTML = '';
            }

            if (e.key == 'Enter') {
                vm.$editorContent.innerHTML = content.replace('<div><br></div>', '<p><br></p>')
            }

            vm.configs.onChange(vm.$editorContent.innerHTML);
        }

        this.addEventListener(this.$editorContent, 'input', handler);

        this.addEventListener(this.$editorContent, 'keydown', (e) => {
            let content = vm.$editorContent.innerHTML.toString();
            if (e.key == 'Tab') {
                e.preventDefault();
            }
        })
    }


    // execCommand函数的封装
    exec(command, value = null) {
        document.execCommand(command, false, value);
    }

    // 添加类名
    addClass(targetDom, className) {
        if (
            (typeof targetDom != 'object') ||
            (targetDom.nodeType != 1) ||
            (typeof className != 'string') ||
            (targetDom.className.indexOf(className) != -1)
        ) {
            return;
        }

        targetDom.className ?
            (targetDom.className += ` ${className}`) :
            (targetDom.className = className);
    }

    // 删除类名
    removeClass(targetDom, className) {
        if (
            (typeof targetDom != 'object') ||
            (targetDom.nodeType != 1) ||
            (typeof className != 'string')
        ) {
            return;
        }

        targetDom.className = targetDom.className.replace(className, '');
    }

    // addEventListener封装
    addEventListener(targetDom, ...args) {
        if (typeof targetDom == 'object' && targetDom.nodeType == 1) {
            targetDom.addEventListener(...args);
        }
    }
}

window.CCEditor = CCEditor;
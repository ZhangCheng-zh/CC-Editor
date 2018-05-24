import style from '../style.css'
import { defaultConfig } from './config';

((window) => {

    class CCEditor {
        constructor(configs = {}) {

            //合并默认配置和自选配置
            this.configs = Object.assign(defaultConfig, configs);

            this.classesConfig = this.configs.classesConfig;

            this.init(this.configs);
        }

        // 按照配置初始化编辑器
        init() {
            if (!this.configs.el || this.configs.el.nodeType != 1) {
                return;
            }

            this.renderEditor();
        }

        renderEditor() {
            var $el = this.config.el;
            $el.classList.add(this.configs.classesConfig.editorClass);

            //添加工具栏
            var $toolsBar = document.createElement('ul');
            $toolsBar.className += ` ${this.classesConfig.toolsbarClass}`;

            // 添加编辑区
            var $editorContent = document.createElement('div');
            $editorContent.className = `${this.classesConfig.contentClass}`;

            $editorContent.contentEditable = true;

            $el.appendChild($toolsBar);
            this.$toolsBar = $toolsBar;
            $el.appendChild($editorContent);
            this.$editorContent = $editorContent;

            // render the tools bar
            this.renderToolsBar(this.configs.toolsbarConfig);
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
                            $button.classList.add('active') :
                            $button.classList.remove('active');
                    }
                }

                // 按照当前编辑器设置项状态更新对应设置项的样式
                $button.addEventListener('click', updateStyleHandler)
                vm.$editorContent.addEventListener('mouseup', updateStyleHandler)

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

            this.$editorContent.addEventListener('input', handler);

            this.$editorContent.addEventListener('keydown', (e) => {
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
    }

    window.CCEditor = CCEditor;
})(window)
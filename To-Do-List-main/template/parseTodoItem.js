/**
 * content(string), id(number), highlight(boolean), checked(boolean)
 * @param { content: content(string), id(number), highlight(boolean), checked(boolean)} data 
 * @returns 
 */

export function ParseTodoItem(data) {
    const { content, id, highlight, checked } = data;

    const $container = document.createElement('li');
    $container.classList.add('list_item');

    const $checkBox = document.createElement('div');
    $checkBox.classList.add('check_box');

    const $checkedMark = document.createElement('div');
    $checkedMark.classList.add('checked');
    if(!checked) {
        $checkedMark.classList.add('unchecked');
    }
    $checkedMark.dataset.id = id;

    const $contentContainer = document.createElement('div');
    $contentContainer.classList.add('list_content_container');

    const $content = document.createElement('span');
    $content.classList.add('list_content');
    $content.textContent = content;

    const $highlight = document.createElement('div');
    $highlight.classList.add('neon_strong');
    if(!highlight) {
        $highlight.classList.add('neon_blind');
    }
    const $highlightBtn = document.createElement('div');
    $highlightBtn.classList.add('highlight_event_listener');
    $highlightBtn.classList.add('blind');
    $highlightBtn.dataset.id = id;

    const $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('todo_delete');
    $deleteBtn.textContent = '삭제';
    $deleteBtn.dataset.id = id;

    $checkBox.appendChild($checkedMark);
    $contentContainer.appendChild($content);
    $contentContainer.appendChild($highlight);
    $container.appendChild($checkBox);
    $container.appendChild($contentContainer);
    $container.appendChild($deleteBtn);
    $container.appendChild($highlightBtn);

    return {
        template: $container,
        data: data,
    }
}

{/* <li class="list_item">
    <button class="check_box">
        <div class="checked unchecked"></div>
    </button>
    <div class="list_content_container">
        <span class="list_content">
            일정등록하세요.
        </span>
        <div class="neon_strong"></div>
    </div>
    <button class="todo_delete">삭제</button>
    <div class="highlight_event_listener blind"></div>
</li> */}

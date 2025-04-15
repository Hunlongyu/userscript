const BUTTON_ID = 'zotero-button';
const PARENT_CLASS = '.dJnomT';

export function buttonExists() {
    if (document.getElementById(BUTTON_ID)) return true;
    return false;
}

function createZoteroButton(cb) {
    if (buttonExists()) {
        return null;
    }

    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.className = 'prc-Button-ButtonBase-c50BI';
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    button.tabIndex = 0;
    button.dataset.loading = 'false';
    button.dataset.size = 'small';
    button.dataset.variant = 'default';
    button.setAttribute('aria-describedby', `${BUTTON_ID}-loading-announcement`);
    button.style.marginLeft = '10px';

    const labelSpan = document.createElement('span');
    labelSpan.dataset.component = 'text';
    labelSpan.textContent = 'Zotero';
    button.appendChild(labelSpan);

    button.addEventListener('click', function () {
        console.log('Zotero按钮被点击');
        if (cb) {
            cb();
        }
    });

    return button;
}

export function insertZoteroButton(cb) {
    const targetContainer = document.querySelector(PARENT_CLASS);
    if (!targetContainer) {
        return;
    }

    const button = createZoteroButton(cb);
    if (button) {
        targetContainer.appendChild(button);
    }
}
export function getReadmeContent() {
    const content = document.querySelector('.markdown-body');
    if (content) {
        return content.innerHTML;
    }
}
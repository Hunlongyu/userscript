
export const ping = () => {
    return new Promise((resolve) => {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://127.0.0.1:23119/connector/ping',
            headers: {
                'Content-Type': 'application/json',
                'X-Zotero-Connector-API-Version': '2',
                'X-zotero-version': '7.0.15'
            },
            data: '{}',
            timeout: 3000,
            onload: function (response) {
                if (response.status === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            onerror: function (error) {
                resolve(false);
            },
            ontimeout: function () {
                resolve(false);
            }
        });
    });
};

export const getSelectedCollection = () => {
    return new Promise((resolve) => {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://127.0.0.1:23119/connector/getSelectedCollection',
            headers: {
                'Content-Type': 'application/json',
                'X-Zotero-Connector-API-Version': '2',
                'X-zotero-version': '7.0.15'
            },
            data: '{}',
            timeout: 3000,
            onload: function (response) {
                if (response.status === 200) {
                    if (!response.responseText) {
                        return resolve(null);
                    }
                    const result = JSON.parse(response.responseText);
                    resolve(result);

                } else {
                    resolve(null);
                }
            },
            onerror: function (error) {
                resolve(null);
            },
            ontimeout: function () {
                resolve(null);
            }
        });
    });
};

export const randomString = (len, chars) => {
    if (!chars) {
        chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    if (!len) {
        len = 8;
    }
    var randomstring = '';
    for (var i = 0; i < len; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
};

export const saveItems = ({
    uri,
    items = []
}) => {
    return new Promise((resolve) => {
        const requestData = {
            uri,
            proxy: null,
            sessionID: randomString(),
            items: items.map(item => ({
                ...item,
                itemType: item.itemType || 'webpage',
                creators: [],
                notes: item.notes || [],
                tags: item.tags || [],
                seeAlso: item.seeAlso || [],
                attachments: item.attachments || [],
                url: item.url || uri,
                title: item.title || 'Untitled',
                libraryCatalog: item.libraryCatalog || 'Github',
                extra: item.extra || '',
                date: item.date || new Date().toISOString(),
                accessDate: item.accessDate || new Date().toISOString(),
                id: item.id || randomString(),
            }))
        }

        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://127.0.0.1:23119/connector/saveItems',
            headers: {
                'Content-Type': 'application/json',
                'X-Zotero-Connector-API-Version': '2',
                'X-zotero-version': '7.0.15'
            },
            data: JSON.stringify(requestData),
            timeout: 10000,
            onload: function (response) {
                if (response.status === 201) {
                    if (!response.responseText) {
                        console.warn('收到空响应');
                        return resolve({ success: false, data: null });
                    }
                    const result = JSON.parse(response.responseText);
                    resolve({ success: true, data: result });

                } else {
                    console.warn('Zotero Connector返回异常状态:', response.status);
                    resolve({ success: false, data: null });
                }
            },
            onerror: function (error) {
                console.error('Zotero Connector连接错误:', error);
                resolve({ success: false, data: null });
            },
            ontimeout: function () {
                console.warn('Zotero Connector连接超时');
                resolve({ success: false, data: null });
            }
        });
    });
};


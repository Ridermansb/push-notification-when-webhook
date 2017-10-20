const fetchHeaders = {
    'Content-Type': 'application/json',
};

const getWebtaskHeaders = () => {
    const token = localStorage.getItem('id_token');
    return Object.assign({}, fetchHeaders, {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    });
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

async function parseJSON(response) {
    const jsonObj = await response.json();
    return jsonObj;
}

export function subscribe(subscription) {
    return fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: getWebtaskHeaders(),
    }).then(checkStatus).then(parseJSON);
}
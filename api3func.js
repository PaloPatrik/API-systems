const showProtocol = () => {
    document.getElementById('protocol').textContent = `Protokolla: ${window.location.protocol}`;
};

const showHost = () => {
    document.getElementById('host').textContent = `Host: ${window.location.hostname || 'Ei hostia'}`;
};

const showPort = () => {
    document.getElementById('port').textContent = `Portti: ${window.location.port || 'Ei porttia'}`;
};

const showPathname = () => {
    document.getElementById('pathname').textContent = `Polku: ${window.location.pathname}`;
};

const showSearch = () => {
    document.getElementById('search').textContent = `Kyselyparametrit: ${window.location.search || 'Ei kyselyparametrejä'}`;
};

const showHash = () => {
    document.getElementById('hash').textContent = `Fragmentti: ${window.location.hash || 'Ei fragmenttia'}`;
};

const displayLocationInfo = () => {
    showProtocol();
    showHost();
    showPort();
    showPathname();
    showSearch();
    showHash();
};

window.onload = displayLocationInfo;

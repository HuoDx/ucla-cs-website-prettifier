async function pullContentFromSrc(url) {
    return await (await fetch(url, {
        headers: {
            'Host': 'web.cs.ucla.edu',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': `"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"`,
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': "macOS",
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36`,
            'Accept': `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    })).text()
}
function setURLContentToMainContainer(url) {
    pullContentFromSrc(url).then(
        function (content) {
            document.getElementById('main-panel').innerHTML = content;
            document.getElementById('main-panel').querySelectorAll('a').forEach((element) => {
                element.target = '';
                element.setAttribute('onclick', `setURLContentToMainContainer('${element.href}')`);
                element.href = '#';
            });
        }
    )
}
; (async () => {
    var frame = document.querySelector('frameset');
    if (window.location.hostname !== 'web.cs.ucla.edu') alert(`You are currently not at the CS website; please go retry after going there.`);
    else if (frame === null) alert(`Nothing left to do: it has been prettified. `);

    else {
        document.querySelector('head').innerHTML += ` <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Work+Sans:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">`;

        document.querySelector('head').innerHTML += `<link rel='stylesheet' href='https://huodx.github.io/CS31-website-prettifier/prettier.css'>`;
        document.querySelector('html').removeChild(frame);
        document.querySelector('head').innerHTML += `<meta charset="UTF-8" /> \n<meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
        var body = document.createElement('body');
        var navBar = document.createElement('div');
        navBar.classList.add('nav-bar')
        navBar.innerHTML = await pullContentFromSrc('contents.html');
        var mainPanel = document.createElement('div');
        mainPanel.id = 'main-panel';
        setURLContentToMainContainer(navBar.querySelector('a').href);
        navBar.querySelectorAll('a').forEach((element) => {
            element.target = '';
            element.setAttribute('onclick', `javascript: setURLContentToMainContainer('${element.href}');`);
            element.href = '#';
        });

        body.appendChild(navBar);
        body.appendChild(mainPanel);

        document.querySelector('html').appendChild(body);
    }
})();
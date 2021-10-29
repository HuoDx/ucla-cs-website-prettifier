async function pullContentFromSrc(url) {
    return await (await fetch(url)).text()
}
function setURLContentToMainContainer(url) {
    pullContentFromSrc(url).then(
        function (content) {
            document.getElementById('main-panel').innerHTML = content;
            document.getElementById('main-panel').querySelectorAll('a').forEach((element) => {
                console.log(`${url}-> ${element.getAttribute('href')}`);
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
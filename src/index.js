const getClientScript = ({ themeStyle }) => {
    return  `
    const randomDivId = 'vite-plugin-white-screen-progress-' + Math.round(Math.random() * 100 * 1000)
    const div = document.createElement('div');
    div.setAttribute('id', randomDivId);
    div.setAttribute('style', '${themeStyle}');
    document.body.appendChild(div);

    let resourceInfo = {}; // save resource load status
    let curResourceName = '';
    let lastResourceName = '';

    const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
            // script, link, img, xmlhttprequest, fetch, css, iframe, preload / prefetch / other
            // filter xmlhttprequest type
            if (!['xmlhttprequest', 'img'].includes(entry.initiatorType)) {
                // totalBytes += entry.transferSize;
                // loadedBytes += entry.encodedBodySize || entry.decodedBodySize;
                const htmlList = [
                    'Vite dev server, resource loading...<br>',
                    'InitiatorType: ' + entry.initiatorType + '<br>',
                    'StartTime: ' + entry.startTime.toFixed(2) + 'ms <br>',
                    'Duration: ' + entry.duration.toFixed(2) + 'ms <br>',
                    'TransferSize: ' + entry.transferSize +  'KB <br>',
                    'Name: ' + entry.name + '<br>',
                ]
                curResourceName = entry.name
                resourceInfo[entry.name] = false
                div.innerHTML = htmlList.join('')

                if (entry.name && entry.responseEnd) {
                    // console.log('resource' + entry.name + 'load complete');
                    resourceInfo[entry.name] = true
                }

            }
        });
    });

    observer.observe({ entryTypes: ['resource'] });
    window?.addEventListener('DOMContentLoaded', () => {
        const el = document.querySelector('#' + randomDivId);
        if (el) el.remove();
        observer.disconnect();
    });

    // sub app(like qiankun) progress end handler
    let timer = setInterval(() => {
        // console.log('===>timer', curResourceName === lastResourceName, resourceInfo[curResourceName], curResourceName, lastResourceName )
        if (!lastResourceName) {
            lastResourceName = curResourceName
            return;
        }
        if (curResourceName === lastResourceName && resourceInfo[curResourceName]) {
            const el = document.querySelector('#' + randomDivId);
            if (el) el.remove();
            observer.disconnect();
            clearInterval(timer)
            return;
        }
        lastResourceName = curResourceName
    }, 2500)
`;
}

export default function devServerWhiteScreenProgress(config = {
    theme: 'fix-right',
    style: ''
}) {

    const themeStyleConfig = {
        // Default style  fix in right 
        'fix-right': 'font-size: 12px;background: rgba(0, 0, 0, .8);color: white; padding: 22px;border-radius: 8px;position:fixed;top: 200px;z-index: 1000000;right: 9px;width:300px;height: 300px;overflow:hidden;word-break:break-all;',
        // Display in a flat layout on the page
        'middle': 'font-size: 14px;background: #fff;color: #333; padding: 22px;border-radius: 8px;position:absolute;top: 100px;z-index: 1000000',
    }

    return {
        name: 'vite-plugin-white-screen-progress',
        apply: 'serve', // just enabled in dev server（vite dev），ignore when vite build
        // write custom script into index.html <head> 
        transformIndexHtml(html) {
            return {
                html,
                order: 'pre',
                tags: [
                    {
                        tag: 'script',
                        injectTo: 'head-prepend',
                        attrs: {
                            type: 'module'
                        },
                        children: getClientScript({
                            themeStyle: config?.style || themeStyleConfig[config?.theme] || themeStyleConfig['fix-right']
                        })
                    }
                ]
            };
        }
    };
}
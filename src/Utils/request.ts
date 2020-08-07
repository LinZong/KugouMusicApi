import * as http from 'http';
import * as https from 'https';

export const request = (url: string, proxy: string): any => new Promise((resolve, reject) => {
    try {
        const [host, protocol, port] = (() => {
            if (!proxy) {
                return ['songsearch.kugou.com', 'http:', 80];
            }

            const proxyUrl = ((url) => {
                try {
                    return new URL(url);
                } catch {
                    return null;
                }
            })(proxy);

            if (!proxyUrl) {
                return ['songsearch.kugou.com', 'http:', 80];
            }

            return [proxyUrl.hostname, proxyUrl.protocol, proxyUrl.port || ((protocol) => {
                switch (protocol) {
                    case 'https:':
                        return 443;

                    case 'http:':
                    default:
                        return 80;

                }
            })(proxyUrl.protocol)];
        })();

        const client: any = ((protocol) => {
            switch (protocol) {
                case 'http:':
                    return http;

                case 'https:':
                default:
                    return https;
            }
        })(protocol);

        let data = Buffer.from('');

        const clientReq = client.request({
            host,
            port,
            method: 'GET',
            path: url
        }, (clientRes) => {
            clientRes.on('data', (chunk) => {
                data = Buffer.concat([data, chunk]);
            });

            clientRes.on('end', () => {
                try {
                    resolve(JSON.parse(data.toString()));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });

        clientReq.end();
    } catch(e) {
        reject(e);
    }
});

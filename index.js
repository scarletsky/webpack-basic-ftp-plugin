const ftp = require('basic-ftp');
const id = 'WebpackBasicFtpPlugin: ';

function WebpackBasicFtpPlugin(options) {
    this.host = options.host || '';
    this.port = options.port || 21;
    this.user = options.user || '';
    this.password = options.password || '';
    this.secure = options.secure || false;
    this.override = options.override || false;
    this.localDir = options.localDir;
    this.remoteDir = options.remoteDir;

    if (!this.localDir) {
        throw new Error('Missing localDir.');
    }

    if (!this.remoteDir) {
        throw new Error('Missing remoteDir.');
    }
}

WebpackBasicFtpPlugin.prototype.apply = function (compiler) {
    compiler.hooks.done.tapPromise('WebpackBasicFtpPlugin', (_stats) => {
        return new Promise(async (resolve, reject) => {
            try {
                const client = new ftp.Client();
                console.log(id, 'trying to access ftp server.');
                await client.access({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    secure: this.secure
                });
                console.log(id, 'login success.');
                console.log(id, 'ensure remote dir ', this.remoteDir);
                await client.ensureDir(this.remoteDir);

                if (this.override) {
                    console.log(id, 'clear working dir.');
                    await client.clearWorkingDir();
                }

                console.log(id, 'upload dir from ', this.localDir);
                await client.uploadDir(this.localDir);
                console.log(id, 'upload success.');

                client.close();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
};

module.exports = WebpackBasicFtpPlugin;
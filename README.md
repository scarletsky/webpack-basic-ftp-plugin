# webpack-basic-ftp-plugin

This plugin is a wrapper for [basic-ftp](https://github.com/patrickjuchli/basic-ftp). You can upload directory to your ftp server after webpack build done.

## Usage

```js
const WebpackBasicFtpPlugin = require('webpack-basic-ftp-plugin');
module.exports = {
    // ...
    plugins: [
        new WebpackBasicFtpPlugin({
            host: 'your host',
            port: 21,
            user: 'username',
            password: 'password',
            override: true, // it will clean remote dir before uploading.
            localDir: path.resolve(__dirname, '../dist'),
            remoteDir: '/your/remote/dir/' 
        }) 
    ]
}
```


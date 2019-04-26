# webpack-basic-ftp-plugin

This plugin is a wrapper for [basic-ftp](https://github.com/patrickjuchli/basic-ftp). You can upload directory to your ftp server after webpack build done.

**Note: As this plugin and `basic-ftp` both use `async/await`, so you need to use Node.js 8+**.


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
            secure: false,
            override: true, // it will clean remote dir before uploading.
            localDir: path.resolve(__dirname, '../dist'),
            remoteDir: '/your/remote/dir/' 
        }) 
    ]
}
```


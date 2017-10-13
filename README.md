# node-decipher-openssl
Decipher files encrypted with openssl command line from node

Files encrypter using openssl from the command line cannot be directly deciphered using the `crypto` library. The openssl default options generate a key and iv from a random salt and the secret, and prepend it to the encrypted file.

This module uses [stream-peek-remove](https://github.com/jonatan-alama/stream-peek-remove) to extract the salt from the encrypted data, then calculates the key and iv and uses them to decipher the file using `crypto.createDecipheriv` function.

This module only works with streams as input.

`npm install node-decipher-openssl`

## Usage

```javascript
const createDecipherOpenssl = require("node-decipher-openssl");
const fs = require("fs");

const readStream = fs.createReadStream("myEncodedFileToRead");
const writeStream = fs.createWriteStream("myDecryptedFile");

try {
  const decipher = await createDecipherOpenssl(readStream, "aes-256-cbc", "mysecret");
  decipher.pipe(writeStream);
} catch (error) {
  // Handle error
}
```

### Parameters
```
createDecipherOpenssl(readStream, algorithm, key) => Promise;
```

**`readStream`** A readable stream

**`algorithm`** A string with the cipher algorithm. Accepts same values as the native `crypto.createDecipher` method

**`key`** A string withe the key used for encrypting the data

The function returns a `Promise` than can be used with `.then().catch()` or with `async`/`await`

## License
MIT
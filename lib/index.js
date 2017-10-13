const streamPeekRemove = require("stream-peek-remove");
const crypto = require("crypto");

function createDecipherOpenssl(stream, algorithm, secret) {
  return new Promise((resolve, reject) => {
    const peekRemove = streamPeekRemove(
      stream,
      { bytes: 16, remove: true },
      (err, peek) => {
        const { key, iv } = recoverKeyIv(secret, peek);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        resolve(peekRemove.pipe(decipher));
      }
    );
  });
}

// From https://stackoverflow.com/a/19939873
function recoverKeyIv(secret, first16Bytes) {
  // Remove Salted__ prefix 8 bytes, get only salt 8 bytes
  const salt = first16Bytes.slice(8);
  // Ensure Buffer
  secret = Buffer.from(secret);

  const hash0 = new Buffer("");
  const hash1 = md5(Buffer.concat([hash0, secret, salt]));
  const hash2 = md5(Buffer.concat([hash1, secret, salt]));
  const hash3 = md5(Buffer.concat([hash2, secret, salt]));
  const key = Buffer.concat([hash1, hash2]);
  const iv = hash3;

  return { key, iv };
}

function md5(data) {
  const hash = crypto.createHash("md5");
  hash.update(data);
  
  return new Buffer(hash.digest("hex"), "hex");
}

module.exports = createDecipherOpenssl;

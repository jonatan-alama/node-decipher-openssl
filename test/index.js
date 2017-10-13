const tape = require("tape");
const createDecipherOpenssl = require("../lib/index");
const fs = require("fs");

tape("should decipher correctly test1 (small text)", async t => {
  const original = fs.readFileSync(__dirname + "/test1");
  const input = fs.createReadStream(__dirname + "/test1.enc");

  let output = new Buffer([]);

  const decipher = await createDecipherOpenssl(
    input,
    "aes-256-cbc",
    "mysecret"
  );

  decipher.on("data", chunk => {
    output = Buffer.concat([output, chunk]);
  });
  decipher.on("end", () => {
    t.deepEqual(output, original, "output is same as input");
    t.end();
  });
});

tape("should decipher correctly test2 (image)", async t => {
  const original = fs.readFileSync(__dirname + "/test2");
  const input = fs.createReadStream(__dirname + "/test2.enc");

  let output = new Buffer([]);

  const decipher = await createDecipherOpenssl(
    input,
    "aes-256-cbc",
    "mysecret"
  );

  decipher.on("data", chunk => {
    output = Buffer.concat([output, chunk]);
  });
  decipher.on("end", () => {
    t.deepEqual(output, original, "output is same as input");
    t.end();
  });
});

tape("should decipher correctly test3 (image)", async t => {
  const original = fs.readFileSync(__dirname + "/test3");
  const input = fs.createReadStream(__dirname + "/test3.enc");

  let output = new Buffer([]);

  const decipher = await createDecipherOpenssl(
    input,
    "aes-256-cbc",
    "mysecret"
  );

  decipher.on("data", chunk => {
    output = Buffer.concat([output, chunk]);
  });
  decipher.on("end", () => {
    t.deepEqual(output, original, "output is same as input");
    t.end();
  });
});

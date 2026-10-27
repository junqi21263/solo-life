const assert = require('node:assert/strict');
const test = require('node:test');
const forge = require('node-forge');

test('RSA verification rejects extra DigestAlgorithm elements and accepts valid signatures', () => {
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 });
  const md = forge.md.sha256.create().update('Solo Life security regression');
  const digest = md.digest().getBytes();
  const asn1 = forge.asn1;
  const algorithm = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false, asn1.oidToDer(forge.oids.sha256).getBytes()),
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, ''),
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, ''),
  ]);
  const malformed = asn1.toDer(asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
    algorithm,
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, digest),
  ])).getBytes();
  const malformedSignature = privateKey.sign(malformed, 'NONE');
  let accepted = false;
  try {
    accepted = publicKey.verify(digest, malformedSignature);
  } catch {
    // Rejecting malformed ASN.1 with an error is expected.
  }
  assert.equal(accepted, false);
  assert.equal(publicKey.verify(digest, privateKey.sign(md)), true);
});

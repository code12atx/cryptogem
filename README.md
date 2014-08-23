CryptoGem
=========
Project allows you to encrypt content client-side with a secret key. Encrypted content is sent to the server and stored for future access at a given public URL.

1. The secret key used to encrypt content client-side is never sent over the wire to the CryptoGem server
2. All CryptoGems are publicly accessible and subject to an unlimited number of brute force attacks. Weak secret keys, like a dictionary word, will be broken
3. If a secret key is forgotten there is no recovery process for a CryptoGem, the power is where it should be, in your hands
4. A problem that the CryptoGem project does not attempt to solve is how users share secret keys, this is a deliberate design choice

License
========
Cryptogem is released under the [MIT License](http://www.opensource.org/licenses/MIT).

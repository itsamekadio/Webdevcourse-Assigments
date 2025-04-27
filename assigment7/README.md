# Node Authentication Assignment

This repository contains the code for an authentication-related assignment using Node.js. It demonstrates the implementation of user authentication features such as password hashing and JWT token generation.

# EL password utils plus el jwts flow
1. JWT Utils – From Zero to Token
A. `signJWT(payload, secret, expiresInSeconds) – إزاي بيشتغل؟
Step 1: Create el Header
نعمل header بسيط بيقول:

json

{
  "alg": "HS256",
  "typ": "JWT"
}
alg = نوع التشفير (HS256 يعني HMAC-SHA256).

typ = نوع التوكن (JWT).

Step 2: Add Expiration to Payload
نضيف للـ payload expiry وقت:

json
{
  "username": "admin",
  "exp": 1712345678
}
exp = Unix timestamp حالي + expiresInSeconds (مثلا بعد ساعة).

Step 3: Base64URL Encoding
نحوّل كل من header وpayload لـ Base64URL (آمن للـ URL):

{"alg":"HS256"} → eyJhbGciOiJIUzI1NiJ9

{"username":"admin"} → eyJ1c2VybmFtZSI6ImFkbWluIn0

Step 4: Create el Signature
نحسب signature:


signature = HMAC-SHA256(secret, encodedHeader + "." + encodedPayload)
ونحوّله برضه Base64URL.

Step 5: Combine into JWT Token
الـ Token النهائي يبقى بالشكل ده:


<base64url(header)>.<base64url(payload)>.<base64url(signature)>
B. `verifyJWT(token, secret) – إزاي بيشتغل؟
1. Split el Token:
بنقسم التوكن لـ 3 أجزاء:

header

payload

signature

(بنستخدم النقطة . كـ separator).

2. Validate el Signature:
نرجع نكوّن (header + "." + payload).

نعمل HMAC-SHA256 بالـ secret.

نقارن النتيجة بالـ signature اللي جاية جوه التوكن.

✅ لو نفس النتيجة → التوكن صحيح.
❌ لو مختلف → التوكن متلعب فيه.

3. Validate el Expiration:
نعمل decode للـ payload.

نشوف الـ exp field.

لو exp < current time → التوكن منتهي الصلاحية.

4. Validate against eh?
بنعمل validation against el secret اللي استخدمناه واحنا بنعمل signing للـ token.

الserver بيكون حافظ el secret (مثلاً في .env).

2. Password Utils – From Zero to Secure Hash
A. `hashPassword(password) – إزاي بيشتغل؟
Step 1: Generate Random Salt
بنستخدم:


crypto.randomBytes(16)
علشان نطلع salt عشوائي.

Step 2: Hash with PBKDF2 (100,000 Iterations)
بنستخدم:


PBKDF2(password, salt, iterations=100000, keyLength=64, hash="SHA512")
بيطلع معانا hash طوله 64 bytes.

Step 3: Store as salt:hash
بنخزنهم بالشكل ده:


<salt>:<hash>
مثلاً:
a1b2c3d4:x9y8z7w6

B. `verifyPassword(password, storedHash) – إزاي بيشتغل؟
Step 1: Split storedHash
بنقسمه لـ salt وhash.

Step 2: Recompute Hash with Same Parameters
بنعيد hashing تاني بنفس salt وعدد الiterations.

Step 3: Compare Hashes
بنستخدم:

crypto.timingSafeEqual()
للمقارنة بين الهاشات بطريقة آمنة.

✅ لو بيساووا بعض → الباسورد صح.
❌ لو مش بيساووا → الباسورد غلط.


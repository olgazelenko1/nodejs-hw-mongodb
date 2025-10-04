Quick smoke-test for Contacts API

Preconditions:
- MongoDB running and configured (check .env if used)
- API server started: npm run dev (defaults to http://localhost:3000)

1) Register
curl -i -X POST http://localhost:3000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","password":"password123"}'

2) Login
curl -i -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","password":"password123"}'
# copy accessToken from JSON response and cookies sessionId/refreshToken are set in Set-Cookie headers

3) Create contact (replace ACCESS_TOKEN)
curl -i -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -d '{"name":"Alice","phoneNumber":"+123456789","contactType":"private"}'

4) List contacts
curl -i -X GET http://localhost:3000/contacts \
  -H "Authorization: Bearer ACCESS_TOKEN"

5) Get by id (replace CONTACT_ID)
curl -i -X GET http://localhost:3000/contacts/CONTACT_ID \
  -H "Authorization: Bearer ACCESS_TOKEN"

6) Patch contact
curl -i -X PATCH http://localhost:3000/contacts/CONTACT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -d '{"name":"Alice Updated"}'

7) Delete contact
curl -i -X DELETE http://localhost:3000/contacts/CONTACT_ID \
  -H "Authorization: Bearer ACCESS_TOKEN"

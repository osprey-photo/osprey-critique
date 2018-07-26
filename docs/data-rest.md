

POST   - CREATE
GET    - READ
PUT    - UPDATE/REPLACE
PATCH  - PARTIAL-UPDATE
DELETE - DELETE


/v1/photographers

GET     /v1/photographers
GET     /v1/photographers/:uid
POST    /v1/photographers
PATCH   /v1/photographers/:uid
DELETE  /v1/photographers/:uid

GET     /v1/photographers/:uid/critiques
POST    /v1/photographers/:uid/critiques
GET     /v1/photographers/:uid/critiques/:uid
GET     /v1/photographers/:uid/groups
GET     /v1/photographers/:uid/groups/:uid

/v1/critiques

GET     /v1/critiques
GET     /v1/critiques/:uid
POST    /v1/critiques
PATCH   /v1/critiques/:uid
DELETE  /v1/critiques/:uid

GET     /v1/critiques/:uid/comments
GET     /v1/critiques/:uid/comments/:uid
POST    /v1/critiques/:uid/comments
PATCH   /v1/critiques/:uid/comments/:uid

/v1/adjustments

GET     /v1/adjustments/:uid
POST    /v1/adjustments
PATCH   /v1/adjustments/:uid
DELETE  /v1/adjustments/:uid

/v1/groups

GET     /v1/groups
GET     /v1/groups/:uid
POST    /v1/groups
PATCH   /v1/groups/:uid
DELETE  /v1/groups/:uid

GET     /v1/groups/:uid/critiques
GET     /v1/groups/:uid/critiques/:uid

/v1/images

GET     /v1/images/:uid
POST    /v1/images
PATCH   /v1/images/:uid
DELETE  /v1/images/:uid


## Scenarois

- Get all a photographer's critiques
- Get all a groups critiques
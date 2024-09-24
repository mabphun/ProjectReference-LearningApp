import { Card } from "./card"

export class LearningSet {
    public id:  string = ''
    public name: string = ''
    public description: string = ''
    public isPrivate: boolean = false
    public ownerId: string = ''
    public cards: Array<Card> = []
}

/*

{
    "id": "1faf2ef3-2e05-4c07-85c8-4f6dc468f7ea",
    "name": "Test2",
    "description": "TestDesc2",
    "isPrivate": true,
    "ownerId": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
    "owner": {
      "image": "https://picsum.photos/200/300",
      "ownedSets": [
        null
      ],
      "playModels": [
        {
          "id": "4a0113fa-b085-4252-8674-cd804368dc67",
          "timesPlayed": 3,
          "timesCompleted": 2,
          "userId": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
          "setId": "1faf2ef3-2e05-4c07-85c8-4f6dc468f7ea",
          "user": null,
          "set": null
        },
        {
          "id": "b3d1e27e-affe-4291-92ed-fcedebf08875",
          "timesPlayed": 3,
          "timesCompleted": 2,
          "userId": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
          "setId": "1faf2ef3-2e05-4c07-85c8-4f6dc468f7ea",
          "user": null,
          "set": null
        }
      ],
      "id": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
      "userName": "user2",
      "normalizedUserName": "USER2",
      "email": "user2@user.hu",
      "normalizedEmail": null,
      "emailConfirmed": true,
      "passwordHash": "AQAAAAEAACcQAAAAEEzHapv9cNImApc4sAPoVykLfkr8kTzH9UrMZVY81DsLWKrHEcu5xTLmm7jow/4d9g==",
      "securityStamp": "2d7b2707-86a8-4b17-a45c-2fd1e4761bfe",
      "concurrencyStamp": "db8377a2-9d0c-4bc1-ba28-1f8da85fa779",
      "phoneNumber": null,
      "phoneNumberConfirmed": false,
      "twoFactorEnabled": false,
      "lockoutEnd": null,
      "lockoutEnabled": false,
      "accessFailedCount": 0
    },
    "cards": [],
    "playModels": [
      {
        "id": "4a0113fa-b085-4252-8674-cd804368dc67",
        "timesPlayed": 3,
        "timesCompleted": 2,
        "userId": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
        "setId": "1faf2ef3-2e05-4c07-85c8-4f6dc468f7ea",
        "user": {
          "image": "https://picsum.photos/200/300",
          "ownedSets": [
            null
          ],
          "playModels": [
            null,
            {
              "id": "b3d1e27e-affe-4291-92ed-fcedebf08875",
              "timesPlayed": 3,
              "timesCompleted": 2,
              "userId": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
              "setId": "1faf2ef3-2e05-4c07-85c8-4f6dc468f7ea",
              "user": null,
              "set": null
            }
          ],
          "id": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
          "userName": "user2",
          "normalizedUserName": "USER2",
          "email": "user2@user.hu",
          "normalizedEmail": null,
          "emailConfirmed": true,
          "passwordHash": "AQAAAAEAACcQAAAAEEzHapv9cNImApc4sAPoVykLfkr8kTzH9UrMZVY81DsLWKrHEcu5xTLmm7jow/4d9g==",
          "securityStamp": "2d7b2707-86a8-4b17-a45c-2fd1e4761bfe",
          "concurrencyStamp": "db8377a2-9d0c-4bc1-ba28-1f8da85fa779",
          "phoneNumber": null,
          "phoneNumberConfirmed": false,
          "twoFactorEnabled": false,
          "lockoutEnd": null,
          "lockoutEnabled": false,
          "accessFailedCount": 0
        },
        "set": null
      },
      {
        "id": "b3d1e27e-affe-4291-92ed-fcedebf08875",
        "timesPlayed": 3,
        "timesCompleted": 2,
        "userId": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
        "setId": "1faf2ef3-2e05-4c07-85c8-4f6dc468f7ea",
        "user": {
          "image": "https://picsum.photos/200/300",
          "ownedSets": [
            null
          ],
          "playModels": [
            {
              "id": "4a0113fa-b085-4252-8674-cd804368dc67",
              "timesPlayed": 3,
              "timesCompleted": 2,
              "userId": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
              "setId": "1faf2ef3-2e05-4c07-85c8-4f6dc468f7ea",
              "user": null,
              "set": null
            },
            null
          ],
          "id": "6be560fb-cf80-4ae1-beba-1303a0b769f6",
          "userName": "user2",
          "normalizedUserName": "USER2",
          "email": "user2@user.hu",
          "normalizedEmail": null,
          "emailConfirmed": true,
          "passwordHash": "AQAAAAEAACcQAAAAEEzHapv9cNImApc4sAPoVykLfkr8kTzH9UrMZVY81DsLWKrHEcu5xTLmm7jow/4d9g==",
          "securityStamp": "2d7b2707-86a8-4b17-a45c-2fd1e4761bfe",
          "concurrencyStamp": "db8377a2-9d0c-4bc1-ba28-1f8da85fa779",
          "phoneNumber": null,
          "phoneNumberConfirmed": false,
          "twoFactorEnabled": false,
          "lockoutEnd": null,
          "lockoutEnabled": false,
          "accessFailedCount": 0
        },
        "set": null
      }
    ]
  }
*/

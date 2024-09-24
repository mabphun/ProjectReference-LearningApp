import { LearningSet } from "./learning-set"

export class AppUser {
    public id:  string = ''
    public userName: string = ''
    public email: string = ''
    public image: string = ''
    public ownedSets: Array<LearningSet> = []
    public timesPlayed: number = 0
    public timesCompleted: number = 0
}

/*
{
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2023-05-23T12:48:03.533Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0,
    "image": "string",
    "ownedSets": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "isPrivate": true,
        "ownerId": "string",
        "owner": "string",
        "cards": [
          {
            "id": "string",
            "question": "string",
            "answer": "string",
            "image": "string",
            "learningSetId": "string",
            "learningSet": "string"
          }
        ],
        "playModels": [
          {
            "id": "string",
            "timesPlayed": 0,
            "timesCompleted": 0,
            "userId": "string",
            "setId": "string",
            "user": "string",
            "set": "string"
          }
        ]
      }
    ],
    "playModels": [
      {
        "id": "string",
        "timesPlayed": 0,
        "timesCompleted": 0,
        "userId": "string",
        "setId": "string",
        "user": "string",
        "set": "string"
      }
    ]
  }
*/
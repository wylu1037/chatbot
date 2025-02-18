/* eslint-disable */
const metadata = {
    models: {
        account: {
            name: 'Account', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, type: {
                    name: "type",
                    type: "String",
                }, provider: {
                    name: "provider",
                    type: "String",
                }, providerAccountId: {
                    name: "providerAccountId",
                    type: "String",
                }, refresh_token: {
                    name: "refresh_token",
                    type: "String",
                    isOptional: true,
                }, access_token: {
                    name: "access_token",
                    type: "String",
                    isOptional: true,
                }, expires_at: {
                    name: "expires_at",
                    type: "Int",
                    isOptional: true,
                }, token_type: {
                    name: "token_type",
                    type: "String",
                    isOptional: true,
                }, scope: {
                    name: "scope",
                    type: "String",
                    isOptional: true,
                }, id_token: {
                    name: "id_token",
                    type: "String",
                    isOptional: true,
                }, session_state: {
                    name: "session_state",
                    type: "String",
                    isOptional: true,
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'accounts',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, refresh_token_expires_in: {
                    name: "refresh_token_expires_in",
                    type: "Int",
                    isOptional: true,
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, provider_providerAccountId: {
                    name: "provider_providerAccountId",
                    fields: ["provider", "providerAccountId"]
                },
            }
            ,
        }
        ,
        session: {
            name: 'Session', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, sessionToken: {
                    name: "sessionToken",
                    type: "String",
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'sessions',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, sessionToken: {
                    name: "sessionToken",
                    fields: ["sessionToken"]
                },
            }
            ,
        }
        ,
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                    isOptional: true,
                }, email: {
                    name: "email",
                    type: "String",
                    isOptional: true,
                }, emailVerified: {
                    name: "emailVerified",
                    type: "DateTime",
                    isOptional: true,
                }, password: {
                    name: "password",
                    type: "String",
                    isOptional: true,
                }, image: {
                    name: "image",
                    type: "String",
                    isOptional: true,
                }, accounts: {
                    name: "accounts",
                    type: "Account",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, sessions: {
                    name: "sessions",
                    type: "Session",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, chats: {
                    name: "chats",
                    type: "Chat",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, email: {
                    name: "email",
                    fields: ["email"]
                },
            }
            ,
        }
        ,
        verificationToken: {
            name: 'VerificationToken', fields: {
                identifier: {
                    name: "identifier",
                    type: "String",
                }, token: {
                    name: "token",
                    type: "String",
                    isId: true,
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                },
            }
            , uniqueConstraints: {
                token: {
                    name: "token",
                    fields: ["token"]
                }, identifier_token: {
                    name: "identifier_token",
                    fields: ["identifier", "token"]
                },
            }
            ,
        }
        ,
        chat: {
            name: 'Chat', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, title: {
                    name: "title",
                    type: "String",
                }, visibility: {
                    name: "visibility",
                    type: "Visibility",
                    attributes: [{ "name": "@default", "args": [] }],
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'chats',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, messages: {
                    name: "messages",
                    type: "Message",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'chat',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        message: {
            name: 'Message', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, chatId: {
                    name: "chatId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'chat',
                }, role: {
                    name: "role",
                    type: "Role",
                }, content: {
                    name: "content",
                    type: "String",
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, chat: {
                    name: "chat",
                    type: "Chat",
                    isDataModel: true,
                    backLink: 'messages',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "chatId" },
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
        user: ['Account', 'Session', 'Chat'],
        chat: ['Message'],
    }
    ,
    authModel: 'User'
};
export default metadata;

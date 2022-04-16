import { UserValidationEmailData, UserWithPassword } from "@shortform-flashcards/types";
export declare const userApi: {
    createUser: (user: UserWithPassword) => Promise<void>;
    createUserValidationEmailData: ({ emailData, userId, }: {
        emailData: UserValidationEmailData;
        userId: string;
    }) => Promise<void>;
    deleteUserValidationEmailData: (userId: string) => Promise<void>;
    getUserByEmail: (email: string) => Promise<UserWithPassword | undefined>;
    getUserValidationEmailDataByKey: (key: string) => Promise<UserValidationEmailData | undefined>;
};
//# sourceMappingURL=user_api.d.ts.map
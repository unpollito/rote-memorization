import { User, UserValidationEmailData, UserValidationEmailDataWithUserWithPassword, UserWithPassword } from "@shortform-flashcards/types";
export declare const userApi: {
    createUser: (user: UserWithPassword) => Promise<void>;
    createUserValidationEmailData: ({ emailData, userId, }: {
        emailData: UserValidationEmailData;
        userId: string;
    }) => Promise<void>;
    deleteUserValidationEmailData: (userId: string) => Promise<void>;
    getUserByEmail: (email: string) => Promise<UserWithPassword | undefined>;
    getUserById: (id: string) => Promise<UserWithPassword | undefined>;
    getUserValidationEmailDataByKey: (key: string) => Promise<UserValidationEmailDataWithUserWithPassword | undefined>;
    updateUser: (user: User) => Promise<void>;
};
//# sourceMappingURL=user_api.d.ts.map
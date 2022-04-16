import { UserDb, UserValidationEmailDb } from "./user_db_types";
import { UserValidationEmailData, UserWithPassword } from "@shortform-flashcards/types";
export declare const userDbToUser: (userDb: UserDb) => UserWithPassword;
export declare const userToUserDb: (user: UserWithPassword) => UserDb;
export declare const userValidationDbToUserValidationEmailData: (emailData: UserValidationEmailDb) => UserValidationEmailData;
//# sourceMappingURL=user_adapters.d.ts.map
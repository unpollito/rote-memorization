-- migrate:up
DELETE FROM flashcards;
DELETE FROM users;

ALTER TABLE users ADD "password" varchar NOT NULL;
ALTER TABLE users ADD is_active boolean NOT NULL;

CREATE TABLE user_validation_emails (
	user_id uuid NULL,
	"key" varchar NOT NULL,
	sent_at timestamp NOT NULL,
	CONSTRAINT user_validation_emails_pk PRIMARY KEY (user_id),
	CONSTRAINT user_validation_emails_un UNIQUE ("key"),
	CONSTRAINT user_validation_emails_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- migrate:down

DROP TABLE user_validation_emails;

ALTER TABLE users DROP "password";
ALTER TABLE users DROP "is_active";

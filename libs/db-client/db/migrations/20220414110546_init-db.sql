-- migrate:up
CREATE TABLE users (
	id uuid NULL,
	email varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_unique_email UNIQUE (email)
);

INSERT INTO users(id, email) VALUES ('ef66487a-bbe2-11ec-8422-0242ac120002', 'davidmartingonzalez@mailbox.org');

CREATE TABLE flashcards (
	id uuid NULL,
	user_id uuid NOT NULL,
	bin int2 NOT NULL DEFAULT 0,
	num_failed_answers int4 NOT NULL DEFAULT 0,
	front_text varchar NOT NULL,
	back_text varchar NOT NULL,
	CONSTRAINT flashcards_pk PRIMARY KEY (id),
	CONSTRAINT flashcards_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE flashcards;

DROP TABLE users;

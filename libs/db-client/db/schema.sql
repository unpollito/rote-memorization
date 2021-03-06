SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: flashcards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flashcards (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    bin smallint DEFAULT 0 NOT NULL,
    last_answer_at timestamp without time zone,
    num_failed_answers integer DEFAULT 0 NOT NULL,
    front_text character varying NOT NULL,
    back_text character varying NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: user_validation_emails; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_validation_emails (
    user_id uuid NOT NULL,
    key character varying NOT NULL,
    sent_at timestamp without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: flashcards flashcards_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flashcards
    ADD CONSTRAINT flashcards_pk PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: user_validation_emails user_validation_emails_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_validation_emails
    ADD CONSTRAINT user_validation_emails_pk PRIMARY KEY (user_id);


--
-- Name: user_validation_emails user_validation_emails_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_validation_emails
    ADD CONSTRAINT user_validation_emails_un UNIQUE (key);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users users_unique_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_unique_email UNIQUE (email);


--
-- Name: flashcards flashcards_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flashcards
    ADD CONSTRAINT flashcards_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_validation_emails user_validation_emails_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_validation_emails
    ADD CONSTRAINT user_validation_emails_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20220414110546'),
    ('20220415192942');

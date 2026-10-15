SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 0XCoCswisRAXzcc7lmONTozukeuAQhkIYchcnmfNMosdVbY8OG7Wo7qRLDczn2u

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '41e5290e-b250-4663-8ca4-b8f2131497dd', 'authenticated', 'authenticated', 'esteban6@gmail.com', '$2a$10$TX5PvaMb7LFqWN/8ZKK1ButSOTV4Y.NbGYBTdkfYY4Ecr0ijdjDGa', '2026-06-30 04:13:24.30213+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-01 04:31:16.701812+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Esteban", "email_verified": true}', NULL, '2026-06-30 04:13:24.285665+00', '2026-07-01 04:31:16.737844+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '808a419d-5acf-4503-bdf3-0fb1253a134d', 'authenticated', 'authenticated', 'lucely5@gmail.com', '$2a$10$goycO0szM7jF0ppA3lTNiO7wC4EOTOxuYSnTCHU7eTfBhVWFhYHO2', '2026-06-30 04:02:44.302866+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-01 05:04:14.846391+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Lucely", "email_verified": true}', NULL, '2026-06-30 04:02:44.283659+00', '2026-07-01 05:04:14.883737+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '5b32eb78-0b0e-43a4-9930-be2f07d13849', 'authenticated', 'authenticated', 'dianaz123@gmail.com', '$2a$10$nuhDPvamGajhiTj48WpUYuDvHVfAeu7xzV7MeP/Di.yaCHhPOqFce', '2026-06-24 04:34:56.481144+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-29 02:35:14.30853+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Diana", "email_verified": true}', NULL, '2026-06-24 04:34:56.454794+00', '2026-06-29 02:35:14.331512+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '77cb8fc6-95c6-4595-a944-7e8f9290de1b', 'authenticated', 'authenticated', 'anyela@gmail.com', '$2a$10$Jpd3KJkgWTa7kgkarT2fl.R9m4hE7im5E5IJwj0KGvPd2F7PdSugu', '2026-10-08 21:05:28.431204+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Anyela", "email_verified": true}', NULL, '2026-10-08 21:05:28.396215+00', '2026-10-08 21:05:28.432141+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', 'authenticated', 'authenticated', 'eduardo4@gmail.com', '$2a$10$cR0demQcYQ.LmqWv0n3OIetgud6JC16h1B0aFv/DOQVozdOKb287e', '2026-06-29 03:06:38.653293+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 07:55:43.570332+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Eduardo", "email_verified": true}', NULL, '2026-06-29 03:06:38.608684+00', '2026-09-22 07:55:43.583645+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'authenticated', 'authenticated', 'cliente2@gmail.com', '$2a$10$XetkX.CaVcIcuWVGiil3gu3fyfHlYUlX00pLhK0DgUyzutMF6q5JG', '2026-06-03 05:03:56.015395+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-03 05:05:23.414277+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Carlos", "email_verified": true}', NULL, '2026-06-03 05:03:55.977731+00', '2026-06-03 05:05:23.439119+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', 'authenticated', 'authenticated', 'cliente4@gmail.com', '$2a$10$vV5wG3ndkPW2krCWLuYiWeXqqZjXRstffTTsdoZiD2Fx5zcxQQJxm', '2026-06-09 01:08:00.323356+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-15 00:29:57.878784+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Andres", "email_verified": true}', NULL, '2026-06-09 01:08:00.288243+00', '2026-06-15 00:29:57.891017+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '54645d6a-3d1b-404e-ab84-87d74859c708', 'authenticated', 'authenticated', 'cliente10@gmail.com', '$2a$10$CDrdgeM1XEH9C1GerZxh9.0yemGuFXvQWh5q8oXj7XSDe6kQgpHA2', '2026-06-16 04:52:11.282786+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-19 03:39:21.547747+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Luis", "email_verified": true}', NULL, '2026-06-16 04:52:11.243939+00', '2026-06-19 05:35:39.226042+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '2a40859f-f54e-46eb-aab0-aa27258c138f', 'authenticated', 'authenticated', 'cliente8@gmail.com', '$2a$10$zrdP464s7jFFAjFjdGe3Y.8zCwURftFFXndAFBAZ5Nkbuyi28h.JK', '2026-06-14 21:43:30.95731+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-15 03:13:20.53156+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "kevin", "email_verified": true}', NULL, '2026-06-14 21:43:30.929531+00', '2026-06-15 03:13:20.560493+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7f87420e-25b0-4289-b2f2-c24c378cfd89', 'authenticated', 'authenticated', 'cliente11@gmail.com', '$2a$10$wbXeBZAtzi37NfpJobqKOOvqyoEup3iQ3JmviCy2dXG8.duSZSIKG', '2026-06-19 20:06:47.940222+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "camilo", "email_verified": true}', NULL, '2026-06-19 20:06:47.90658+00', '2026-06-19 20:06:47.941114+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd4afcde5-cb61-4e03-8813-574ec433d404', 'authenticated', 'authenticated', 'maria12@gmail.com', '$2a$10$t5ZsfYHN2/lJFyDzPunK7Oqro4LsmgrdxxaNvcYaxxWmbXfvIeqPC', '2026-06-30 03:52:33.357462+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-30 03:52:52.417016+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Maria", "email_verified": true}', NULL, '2026-06-30 03:52:33.334836+00', '2026-06-30 03:52:52.437943+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '280093d2-276e-49f6-849e-5e67120bbd34', 'authenticated', 'authenticated', 'cliente13@gmail.com', '$2a$10$NYR3F8FfijYArMYwtIOvBeEd54oabo7wzKS.e43JqqG1knseC0SiK', '2026-06-24 03:55:50.73481+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "pepito", "email_verified": true}', NULL, '2026-06-24 03:55:50.703687+00', '2026-06-24 03:55:50.735777+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '2185299f-e8f7-4c64-8530-8c17f3ec747b', 'authenticated', 'authenticated', 'cliente6@gmail.com', '$2a$10$Bt9Q3nitb3KGv78CaZD94.4yy05JwAs1AQf2FUPwPlik7PkluDVv2', '2026-06-10 20:27:55.577451+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-10 20:28:20.225117+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Sara", "email_verified": true}', NULL, '2026-06-10 20:27:55.533247+00', '2026-06-10 20:28:20.250709+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '058216a3-ad1f-4082-a17d-8e576fb7ae49', 'authenticated', 'authenticated', 'cliente12@gmail.com', '$2a$10$XTLDEB4vs7wxuMHiepINBuxWEo394hWeTk4QP8zXF4p8ncUfNipCi', '2026-06-24 02:39:47.446863+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "pepe", "email_verified": true}', NULL, '2026-06-24 02:39:47.415212+00', '2026-06-24 02:39:47.452318+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '523f2158-8ab6-4e3e-aec4-0ff94a21237a', 'authenticated', 'authenticated', 'cliente9@gmail.com', '$2a$10$bnCcJ2RUiMb60LhFrTO24.rrDaTn7cIdh2VLa8RSat7smRE0mM0n.', '2026-06-15 03:15:22.362135+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-17 05:02:46.712859+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "salome", "email_verified": true}', NULL, '2026-06-15 03:15:22.335126+00', '2026-07-17 05:02:46.725759+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f7b79f48-c3df-485e-b929-d7c09f18919c', 'authenticated', 'authenticated', 'catalinag@gmail.com', '$2a$10$KlQFM341i1.rbpt4GpbBC.siKfCVhm/7iz9zihPF4mNfrQryfGBGm', '2026-06-25 06:47:02.524874+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-25 06:48:26.089399+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "catalina", "email_verified": true}', NULL, '2026-06-25 06:47:02.496271+00', '2026-06-25 06:48:26.101312+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', 'authenticated', 'authenticated', 'cliente3@gmail.com', '$2a$10$Ud2W1iLb0O/A5demry9huOHYlElLUvPCy19jbS.rUivQtDYGZ6XZu', '2026-06-03 21:57:05.605678+00', NULL, '', NULL, '788c28b1e9b3f00da55c87ce4d73b734e5cf59a22f0dba7131e47690', '2026-06-16 02:07:32.40593+00', '', '', NULL, '2026-06-14 23:25:02.897875+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Solecito", "email_verified": true}', NULL, '2026-06-03 21:57:05.573025+00', '2026-06-16 02:07:33.494408+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ac87d52c-d943-4f71-862e-7da9972f483e', 'authenticated', 'authenticated', 'cliente7@gmail.com', '$2a$10$/35m15NWOl2svoob0dGr5eiDbSZrblazmcpHnOAXgv04ZPaZZ5TCu', '2026-06-12 05:16:22.476847+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-12 05:40:31.254512+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Laura", "email_verified": true}', NULL, '2026-06-12 05:16:22.443818+00', '2026-06-12 05:40:31.269814+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '49c36675-554b-4d86-aeb7-bfec99c13186', 'authenticated', 'authenticated', 'miguel1@gmail.com', '$2a$10$8y/mRY7ZD0YergaDbc0vceHs6DRzzS/TPWCwFnD8e/vIvtqGaHUiO', '2026-06-30 02:54:26.860657+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-30 23:14:30.719055+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Miguel", "email_verified": true}', NULL, '2026-06-30 02:54:26.825898+00', '2026-08-30 23:14:30.729767+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', 'authenticated', 'authenticated', 'neutron@gmail.com', '$2a$10$8oBXhBkW/1c4Mi/nV6rAoOrtI91XbqcXGpRQm67N766xE4uYsGNoS', '2026-09-22 02:15:34.679566+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 20:19:12.69147+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "1a8c15ee-2646-4ee1-90d2-d25dd899154f", "name": "Jimmy", "email": "neutron@gmail.com", "phone": "369258147", "lastname": "Neutron", "email_verified": true, "phone_verified": false}', NULL, '2026-09-22 02:15:34.652404+00', '2026-09-22 20:19:12.696313+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', 'authenticated', 'authenticated', 'gabrielolaya0517@gmail.com', '$2a$10$8lcbL8vqQXWhOuFlHKNVNu7PJbzZ04a/JkyVAAPwhrFpPFjfB.ySC', '2026-09-16 21:01:09.448021+00', NULL, '', '2026-09-16 21:00:48.729698+00', '', NULL, '', '', NULL, '2026-09-22 20:21:18.161661+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d5774ae1-e20b-423a-8c8f-a77a94bba742", "name": "Gabriel ", "email": "gabrielolaya0517@gmail.com", "phone": "987654321", "lastname": "Olaya", "email_verified": true, "phone_verified": false}', NULL, '2026-09-16 21:00:48.708006+00', '2026-10-07 13:51:16.51937+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6ba049bb-458d-4725-b797-baf9bd73c697', 'authenticated', 'authenticated', 'marianazukin3@gmail.com', '$2a$10$U.5ef99.gzwE6PXaSUiYKubDJCvMOxSY1BdkmTTtsdoAK7AlpMr/O', '2026-06-02 04:26:57.46305+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-10-08 21:00:51.153231+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-06-02 04:26:57.441073+00', '2026-10-08 21:00:51.186948+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'e7034024-d89a-4baf-b65c-2bc9d639d163', 'authenticated', 'authenticated', 'camilita1@gmail.com', '$2a$10$.uN6tHphocEUNJPWh1yVPe0SGlBT4JR6iVF6gGradQrlDUVAJ9ncu', '2026-07-01 08:17:58.929606+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-01 14:55:17.265482+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Camila", "email_verified": true}', NULL, '2026-07-01 08:17:58.865156+00', '2026-07-01 14:55:17.306625+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '1cbf28ce-6f02-421b-90ea-85aa7541b264', 'authenticated', 'authenticated', 'jorge1@gmail.com', '$2a$10$nUBUpcAPgziqnDKIZYprtOVyESKq/jeQzGaRqRmJe/.sTl//XI/IO', '2026-09-22 16:16:33.311584+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 16:16:57.894068+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Jorge", "email_verified": true}', NULL, '2026-09-22 16:16:33.289258+00', '2026-09-22 16:16:57.897348+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', 'authenticated', 'authenticated', 'lukako@gmail.com', '$2a$10$eo/5WlNZ81YwtikZRhj1O.7iMPMxx9D7PhA7mu09GomuidkDQ1Mh2', '2026-06-30 21:37:14.189155+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-01 19:50:45.912519+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Lucas", "email_verified": true}', NULL, '2026-06-30 21:37:14.126729+00', '2026-07-01 19:50:45.936721+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '22cf8333-51c9-414e-b7ae-cfe4176b8ced', 'authenticated', 'authenticated', 'tatiana1@gmail.com', '$2a$10$smfY6sqlKC2bMsbVtus2bOfeRVcXBeo7UTtBeDIyPxFXwLuqiYH6q', '2026-07-01 19:37:52.47819+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-28 22:39:22.401988+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Tatiana", "email_verified": true}', NULL, '2026-07-01 19:37:52.437674+00', '2026-08-28 22:39:22.425091+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c9d19e19-e43a-4952-b8df-819d769e3210', 'authenticated', 'authenticated', 'laurita1@gmail.com', '$2a$10$J8EzsnRlwR5P9t.hCK6QuugB2J2Axm8x23hzKi459VnhpqogrHgWq', '2026-07-14 02:25:21.694892+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-02 02:26:54.753972+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Laura", "email_verified": true}', NULL, '2026-07-14 02:25:21.656789+00', '2026-08-02 04:23:25.079081+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '0badffdb-50a4-4e23-953f-639ac55ddd21', 'authenticated', 'authenticated', 'samuel1@gmail.com', '$2a$10$BeqbH1rMnAThNGnsG1LY5e/GrU7vltPLSlJN6at5GBheb6KZKwbHa', '2026-07-01 21:02:32.997437+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-01 21:03:14.016968+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Samuel", "email_verified": true}', NULL, '2026-07-01 21:02:32.957507+00', '2026-07-01 21:03:14.043482+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '150db9f6-1674-4fbd-90c2-2587b14ec05a', 'authenticated', 'authenticated', 'gloria1@gmail.com', '$2a$10$AsAsQsK9k77UWBJ0OuqeCe0epVleV4sVUomuAmSyH4YG0DCQe9FRm', '2026-09-22 16:23:06.735869+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 17:20:53.652511+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Gloria", "email_verified": true}', NULL, '2026-09-22 16:23:06.703463+00', '2026-09-22 17:20:53.669582+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', 'authenticated', 'authenticated', 'rene1@gmail.com', '$2a$10$3DMWNjxFia3S5N7wG4S5W.S6C3IrMmrdJsxp0TxpvolYPd5KyWBgO', '2026-09-21 19:34:15.608385+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 17:30:53.652299+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Rene", "email_verified": true}', NULL, '2026-09-21 19:34:15.572773+00', '2026-09-22 17:30:53.670846+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', 'authenticated', 'authenticated', 'jose1@gmail.com', '$2a$10$/YcbJQfpb7TPn9b5BBbdDepOZ.ITt3bk2jinKgwpOMm9pYpoja5X6', '2026-09-21 17:30:05.635961+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 18:06:38.481195+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Jose ", "email_verified": true}', NULL, '2026-09-21 17:30:05.587003+00', '2026-09-22 18:06:38.486171+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', 'authenticated', 'authenticated', 'aleja45@gmail.com', '$2a$10$7Ge/qpv0LM7BE7/9SAF54eSaU.pasRsasOhmijImdKpahE58XIsAa', '2026-07-03 20:10:36.139727+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-03 21:59:15.305394+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Alejandra", "email_verified": true}', NULL, '2026-07-03 20:10:36.104246+00', '2026-07-03 21:59:15.319236+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 'authenticated', 'authenticated', 'valentina1@gmail.com', '$2a$10$/SHisKMIJOseD3PdS/rXEeXf9CSwVVkGVSih72jDUnlJb9KpicSy6', '2026-07-01 21:25:07.901858+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-08 02:27:04.02056+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Valentina", "email_verified": true}', NULL, '2026-07-01 21:25:07.869948+00', '2026-07-08 03:25:20.352753+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '684e5a46-6c9a-4ad8-af36-bbc79288f761', 'authenticated', 'authenticated', 'luchito@gmail.com', '$2a$10$vdMHDInws9HYxB6LYYu1UuYejCX/eIcGRl0k9eTztzr1b5pdE4ceC', '2026-09-21 19:54:53.748067+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 20:01:47.169238+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "684e5a46-6c9a-4ad8-af36-bbc79288f761", "name": "Lucho", "email": "luchito@gmail.com", "phone": "6579487358", "lastname": "Diaz", "email_verified": true, "phone_verified": false}', NULL, '2026-09-21 19:54:53.718207+00', '2026-09-22 20:01:47.18235+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'b9e30ba1-6fca-4ffe-9515-250f68e0c76b', 'authenticated', 'authenticated', 'cmorgan17@gmail.com', '$2a$10$FxG66WyJZVAFyxFNQ1vsL.y0yK2dAzVc.dgVboMU743CAcKVfYOoa', '2026-09-08 02:04:23.923104+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-08 02:04:51.176407+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Christofer Morgan", "email_verified": true}', NULL, '2026-09-08 02:04:23.845864+00', '2026-09-08 02:04:51.229482+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 'authenticated', 'authenticated', 'gabriela1@gmail.com', '$2a$10$Sw7uWY3aPTBfD.CvY51UdOhmwfL3ZMVWe93CXxKleT3JiHj/llznC', '2026-08-28 22:43:03.696383+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-09 20:03:04.213169+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Gabriela ", "email_verified": true}', NULL, '2026-08-28 22:43:03.669758+00', '2026-09-09 20:03:04.225645+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '12a19e47-623e-4b9f-8153-fad83e74887c', 'authenticated', 'authenticated', 'santiago1@gmail.com', '$2a$10$TE06PHijpQyCunO9WnahHuRT1QCFA5Glsyai72Nr0Kc4bcVWlFMcq', '2026-09-17 19:00:31.906244+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 08:08:46.676207+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Santiago", "email_verified": true}', NULL, '2026-09-17 19:00:31.872778+00', '2026-09-22 08:08:46.690395+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '0b7375ce-96d9-4406-b261-add20a435547', 'authenticated', 'authenticated', 'paredes@gmail.com', '$2a$10$wVpXKxF4OeGdeMYjq9mfpOGm5jgyXErqUzm0Dr9HZK1h8S4asKf0G', '2026-09-22 02:13:21.114125+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 02:13:21.121614+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "0b7375ce-96d9-4406-b261-add20a435547", "name": "Armando", "email": "paredes@gmail.com", "phone": "9864812537", "lastname": "Paredes", "email_verified": true, "phone_verified": false}', NULL, '2026-09-22 02:13:21.080009+00', '2026-09-22 02:13:21.147004+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a9269c80-80ea-4e3f-aa0b-587582193077', 'authenticated', 'authenticated', 'andresadmi@gmail.com', '$2a$10$vsIbUX3LsTsU7XyqaLGu6udulxG2naXe1zvKfeouXPtPi7D58mVua', '2026-09-22 18:53:18.245988+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 19:00:07.164097+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Andres", "email_verified": true}', NULL, '2026-09-22 18:53:18.17945+00', '2026-09-22 19:00:07.185191+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7ba9a100-e00e-4737-be7c-83e4bccd3ecb', 'authenticated', 'authenticated', 'robledoyineth@gmail.com', '$2a$10$BUO4/59c/IWYiTGKoE0hhOymb7CIIjRjp7puc.g48Ce6sGaCIuA5G', '2026-09-22 16:19:53.517154+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 16:39:41.783525+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Monica ", "email_verified": true}', NULL, '2026-09-22 16:19:53.491398+00', '2026-09-22 16:39:41.787374+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf', 'authenticated', 'authenticated', 'mari@gmail.com', '$2a$10$Tv78bB.LMNVm73teI6g4x.cqStT7xzurvAF90Gu9p8HogzXTlaUdi', '2026-09-22 20:03:33.305704+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 20:03:33.323454+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf", "name": "Mariana ", "email": "mari@gmail.com", "phone": "9753724351", "lastname": "Perez", "email_verified": true, "phone_verified": false}', NULL, '2026-09-22 20:03:33.238352+00', '2026-09-22 20:03:33.331537+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', 'authenticated', 'authenticated', 'susanita@gmail.com', '$2a$10$Xj7T267pIoeSqvFH7evhkupbRMZG1Scj2xejR8AM5tdoZUK9ta6Ci', '2026-09-22 18:02:11.119293+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 18:26:15.303285+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Susana", "email_verified": true}', NULL, '2026-09-22 18:02:11.064472+00', '2026-09-22 18:26:15.330944+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '489f28a8-3b68-48c3-b490-d6bb6883f3f5', 'authenticated', 'authenticated', 'clara1@gmail.com', '$2a$10$VNSH.b0wJQjjUFg1WOOoEu977NbBPgEA08hGMD.xwF4vV7IE6JP7S', '2026-09-22 19:10:36.867285+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 19:10:49.614885+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Clara", "email_verified": true}', NULL, '2026-09-22 19:10:36.845197+00', '2026-09-22 19:10:49.644179+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8b49f28b-30c1-410e-83ba-43fb0e518a28', 'authenticated', 'authenticated', 'luisito@gmail.com', '$2a$10$mATi4hWJAQjf9K57.nqrpuRYgpqfO22nP9vJyaXVj01v0Rr56pNpe', '2026-09-22 19:17:16.61356+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-22 19:17:33.981373+00', '{"provider": "email", "providers": ["email"]}', '{"primer_nombre": "Luis", "email_verified": true}', NULL, '2026-09-22 19:17:16.586368+00', '2026-09-22 19:17:33.989293+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('6ba049bb-458d-4725-b797-baf9bd73c697', '6ba049bb-458d-4725-b797-baf9bd73c697', '{"sub": "6ba049bb-458d-4725-b797-baf9bd73c697", "email": "marianazukin3@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-02 04:26:57.456604+00', '2026-06-02 04:26:57.457228+00', '2026-06-02 04:26:57.457228+00', '3cfb1aa6-9235-44e3-893e-4f640fa7e5d4'),
	('7bc33740-6ded-4ae5-9469-f1713a1cd28f', '7bc33740-6ded-4ae5-9469-f1713a1cd28f', '{"sub": "7bc33740-6ded-4ae5-9469-f1713a1cd28f", "email": "cliente2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-03 05:03:56.006783+00', '2026-06-03 05:03:56.007329+00', '2026-06-03 05:03:56.007329+00', '9d8b661b-9e70-4060-939a-6753bb219e9b'),
	('ffb069f8-dbf2-4506-8768-85b95cf9ab14', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '{"sub": "ffb069f8-dbf2-4506-8768-85b95cf9ab14", "email": "cliente3@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-03 21:57:05.60016+00', '2026-06-03 21:57:05.600799+00', '2026-06-03 21:57:05.600799+00', '15c6e26e-f8f3-4266-bcb1-392e675427b3'),
	('084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '{"sub": "084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab", "email": "cliente4@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-09 01:08:00.317632+00', '2026-06-09 01:08:00.31832+00', '2026-06-09 01:08:00.31832+00', '0acc3945-9beb-495d-b069-828398e8dc70'),
	('2185299f-e8f7-4c64-8530-8c17f3ec747b', '2185299f-e8f7-4c64-8530-8c17f3ec747b', '{"sub": "2185299f-e8f7-4c64-8530-8c17f3ec747b", "email": "cliente6@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-10 20:27:55.570296+00', '2026-06-10 20:27:55.570831+00', '2026-06-10 20:27:55.570831+00', 'c7a91fcb-9b2f-4733-a90e-e8320b89b799'),
	('ac87d52c-d943-4f71-862e-7da9972f483e', 'ac87d52c-d943-4f71-862e-7da9972f483e', '{"sub": "ac87d52c-d943-4f71-862e-7da9972f483e", "email": "cliente7@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-12 05:16:22.471689+00', '2026-06-12 05:16:22.472317+00', '2026-06-12 05:16:22.472317+00', '42b99ead-9907-46ac-a60e-7811ef33db13'),
	('2a40859f-f54e-46eb-aab0-aa27258c138f', '2a40859f-f54e-46eb-aab0-aa27258c138f', '{"sub": "2a40859f-f54e-46eb-aab0-aa27258c138f", "email": "cliente8@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-14 21:43:30.953478+00', '2026-06-14 21:43:30.953535+00', '2026-06-14 21:43:30.953535+00', '060ca7ed-5dce-4ffa-a0aa-70b7fbde9fa4'),
	('523f2158-8ab6-4e3e-aec4-0ff94a21237a', '523f2158-8ab6-4e3e-aec4-0ff94a21237a', '{"sub": "523f2158-8ab6-4e3e-aec4-0ff94a21237a", "email": "cliente9@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-15 03:15:22.359422+00', '2026-06-15 03:15:22.360077+00', '2026-06-15 03:15:22.360077+00', 'b480d0a6-07ef-4cd5-b032-b9aa536e9330'),
	('54645d6a-3d1b-404e-ab84-87d74859c708', '54645d6a-3d1b-404e-ab84-87d74859c708', '{"sub": "54645d6a-3d1b-404e-ab84-87d74859c708", "email": "cliente10@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-16 04:52:11.276658+00', '2026-06-16 04:52:11.276725+00', '2026-06-16 04:52:11.276725+00', 'bd7defaf-7a5a-45f1-a2a0-0663376cf135'),
	('7f87420e-25b0-4289-b2f2-c24c378cfd89', '7f87420e-25b0-4289-b2f2-c24c378cfd89', '{"sub": "7f87420e-25b0-4289-b2f2-c24c378cfd89", "email": "cliente11@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-19 20:06:47.934983+00', '2026-06-19 20:06:47.935041+00', '2026-06-19 20:06:47.935041+00', 'f846b8c8-8a3b-4a96-af0a-12495adc68da'),
	('058216a3-ad1f-4082-a17d-8e576fb7ae49', '058216a3-ad1f-4082-a17d-8e576fb7ae49', '{"sub": "058216a3-ad1f-4082-a17d-8e576fb7ae49", "email": "cliente12@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-24 02:39:47.442556+00', '2026-06-24 02:39:47.442611+00', '2026-06-24 02:39:47.442611+00', 'fb76b64b-d4f1-44b8-8bcc-b670a1375e10'),
	('280093d2-276e-49f6-849e-5e67120bbd34', '280093d2-276e-49f6-849e-5e67120bbd34', '{"sub": "280093d2-276e-49f6-849e-5e67120bbd34", "email": "cliente13@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-24 03:55:50.730028+00', '2026-06-24 03:55:50.730084+00', '2026-06-24 03:55:50.730084+00', '0c5dab27-7c1d-4a9e-87aa-0d5996758c55'),
	('5b32eb78-0b0e-43a4-9930-be2f07d13849', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '{"sub": "5b32eb78-0b0e-43a4-9930-be2f07d13849", "email": "dianaz123@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-24 04:34:56.477664+00', '2026-06-24 04:34:56.47775+00', '2026-06-24 04:34:56.47775+00', '1160c0fb-9808-4e76-8dd6-762b77743153'),
	('f7b79f48-c3df-485e-b929-d7c09f18919c', 'f7b79f48-c3df-485e-b929-d7c09f18919c', '{"sub": "f7b79f48-c3df-485e-b929-d7c09f18919c", "email": "catalinag@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-25 06:47:02.520991+00', '2026-06-25 06:47:02.521048+00', '2026-06-25 06:47:02.521048+00', '13a30c3b-0900-4985-aa76-d501df9cd28e'),
	('ad59ce8a-28a6-4608-9446-afa6e6ac9e23', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{"sub": "ad59ce8a-28a6-4608-9446-afa6e6ac9e23", "email": "eduardo4@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-29 03:06:38.646092+00', '2026-06-29 03:06:38.646158+00', '2026-06-29 03:06:38.646158+00', '6c21db3a-760b-4561-afbd-36baede48cc7'),
	('49c36675-554b-4d86-aeb7-bfec99c13186', '49c36675-554b-4d86-aeb7-bfec99c13186', '{"sub": "49c36675-554b-4d86-aeb7-bfec99c13186", "email": "miguel1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-30 02:54:26.855419+00', '2026-06-30 02:54:26.855478+00', '2026-06-30 02:54:26.855478+00', '74e23e7c-bc80-4b65-bad0-a774d0ba847a'),
	('d4afcde5-cb61-4e03-8813-574ec433d404', 'd4afcde5-cb61-4e03-8813-574ec433d404', '{"sub": "d4afcde5-cb61-4e03-8813-574ec433d404", "email": "maria12@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-30 03:52:33.353775+00', '2026-06-30 03:52:33.353864+00', '2026-06-30 03:52:33.353864+00', '5deda4d5-bdfa-40aa-b308-317598da2691'),
	('808a419d-5acf-4503-bdf3-0fb1253a134d', '808a419d-5acf-4503-bdf3-0fb1253a134d', '{"sub": "808a419d-5acf-4503-bdf3-0fb1253a134d", "email": "lucely5@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-30 04:02:44.298885+00', '2026-06-30 04:02:44.298943+00', '2026-06-30 04:02:44.298943+00', 'c1136e61-435a-4cbc-904d-2ae1e31942a2'),
	('41e5290e-b250-4663-8ca4-b8f2131497dd', '41e5290e-b250-4663-8ca4-b8f2131497dd', '{"sub": "41e5290e-b250-4663-8ca4-b8f2131497dd", "email": "esteban6@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-30 04:13:24.299048+00', '2026-06-30 04:13:24.299109+00', '2026-06-30 04:13:24.299109+00', 'eb878900-dfde-45fc-accc-4688cd1081c0'),
	('6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '{"sub": "6bcc1883-ccec-4e60-b1d8-cc1ae373f586", "email": "lukako@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-06-30 21:37:14.177773+00', '2026-06-30 21:37:14.17783+00', '2026-06-30 21:37:14.17783+00', '037fc57d-2a7a-4571-b57e-a8e895e17abf'),
	('e7034024-d89a-4baf-b65c-2bc9d639d163', 'e7034024-d89a-4baf-b65c-2bc9d639d163', '{"sub": "e7034024-d89a-4baf-b65c-2bc9d639d163", "email": "camilita1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-01 08:17:58.920481+00', '2026-07-01 08:17:58.920537+00', '2026-07-01 08:17:58.920537+00', '4d001cd2-763e-421a-8de0-cf0e916d2639'),
	('22cf8333-51c9-414e-b7ae-cfe4176b8ced', '22cf8333-51c9-414e-b7ae-cfe4176b8ced', '{"sub": "22cf8333-51c9-414e-b7ae-cfe4176b8ced", "email": "tatiana1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-01 19:37:52.470699+00', '2026-07-01 19:37:52.470755+00', '2026-07-01 19:37:52.470755+00', '62101e71-5992-4f56-b307-3dccad3c53a4'),
	('0badffdb-50a4-4e23-953f-639ac55ddd21', '0badffdb-50a4-4e23-953f-639ac55ddd21', '{"sub": "0badffdb-50a4-4e23-953f-639ac55ddd21", "email": "samuel1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-01 21:02:32.992437+00', '2026-07-01 21:02:32.992493+00', '2026-07-01 21:02:32.992493+00', 'e5c931df-3df6-4549-bb22-e6bdf69d51aa'),
	('c948a629-a78a-450b-a4c5-17b15c0e2da5', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '{"sub": "c948a629-a78a-450b-a4c5-17b15c0e2da5", "email": "valentina1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-01 21:25:07.898614+00', '2026-07-01 21:25:07.898671+00', '2026-07-01 21:25:07.898671+00', '06ad1d4a-f16e-4e77-b5cc-88e74b28347f'),
	('b724fd53-02d8-4f18-bb9a-1c036e6515ae', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', '{"sub": "b724fd53-02d8-4f18-bb9a-1c036e6515ae", "email": "aleja45@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-03 20:10:36.133614+00', '2026-07-03 20:10:36.133671+00', '2026-07-03 20:10:36.133671+00', '13006589-5c5e-4315-a070-5acd020680ec'),
	('c9d19e19-e43a-4952-b8df-819d769e3210', 'c9d19e19-e43a-4952-b8df-819d769e3210', '{"sub": "c9d19e19-e43a-4952-b8df-819d769e3210", "email": "laurita1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-14 02:25:21.68752+00', '2026-07-14 02:25:21.687608+00', '2026-07-14 02:25:21.687608+00', '88216764-cf83-4fa8-936b-e9047046c4b4'),
	('fd9a7ba2-c79d-46e3-b845-3f28166529c1', 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', '{"sub": "fd9a7ba2-c79d-46e3-b845-3f28166529c1", "email": "gabriela1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-08-28 22:43:03.69164+00', '2026-08-28 22:43:03.691714+00', '2026-08-28 22:43:03.691714+00', '5a113bb4-8154-4742-a600-905ffd22aa8c'),
	('b9e30ba1-6fca-4ffe-9515-250f68e0c76b', 'b9e30ba1-6fca-4ffe-9515-250f68e0c76b', '{"sub": "b9e30ba1-6fca-4ffe-9515-250f68e0c76b", "email": "cmorgan17@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-08 02:04:23.910842+00', '2026-09-08 02:04:23.91091+00', '2026-09-08 02:04:23.91091+00', '82e00351-ba70-4f4f-8fdd-2b237bd5818b'),
	('d5774ae1-e20b-423a-8c8f-a77a94bba742', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '{"sub": "d5774ae1-e20b-423a-8c8f-a77a94bba742", "name": "Gabriel ", "email": "gabrielolaya0517@gmail.com", "phone": "987654321", "lastname": "Olaya", "email_verified": true, "phone_verified": false}', 'email', '2026-09-16 21:00:48.723677+00', '2026-09-16 21:00:48.723731+00', '2026-09-16 21:00:48.723731+00', '90846cf7-5db9-48ea-aaba-958194c31e7f'),
	('12a19e47-623e-4b9f-8153-fad83e74887c', '12a19e47-623e-4b9f-8153-fad83e74887c', '{"sub": "12a19e47-623e-4b9f-8153-fad83e74887c", "email": "santiago1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-17 19:00:31.901943+00', '2026-09-17 19:00:31.902608+00', '2026-09-17 19:00:31.902608+00', '97964f59-8174-4edc-8e19-c9982720a2e9'),
	('41b4d45e-fdf8-4578-9f7b-66788b87ae46', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '{"sub": "41b4d45e-fdf8-4578-9f7b-66788b87ae46", "email": "jose1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-21 17:30:05.628023+00', '2026-09-21 17:30:05.628086+00', '2026-09-21 17:30:05.628086+00', 'ee3a89f1-4974-4c78-a00c-02d69ab35a40'),
	('4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '{"sub": "4a36d5f2-7d8d-4986-b272-f2547ad8a4b8", "email": "rene1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-21 19:34:15.60421+00', '2026-09-21 19:34:15.604265+00', '2026-09-21 19:34:15.604265+00', '0dc53f90-6609-4edd-8dc4-d95d4d69e41f'),
	('684e5a46-6c9a-4ad8-af36-bbc79288f761', '684e5a46-6c9a-4ad8-af36-bbc79288f761', '{"sub": "684e5a46-6c9a-4ad8-af36-bbc79288f761", "name": "Lucho", "email": "luchito@gmail.com", "phone": "6579487358", "lastname": "Diaz", "email_verified": false, "phone_verified": false}', 'email', '2026-09-21 19:54:53.743975+00', '2026-09-21 19:54:53.744025+00', '2026-09-21 19:54:53.744025+00', 'f0c7d2d4-4db1-46a5-bffd-41606c30aaba'),
	('0b7375ce-96d9-4406-b261-add20a435547', '0b7375ce-96d9-4406-b261-add20a435547', '{"sub": "0b7375ce-96d9-4406-b261-add20a435547", "name": "Armando", "email": "paredes@gmail.com", "phone": "9864812537", "lastname": "Paredes", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 02:13:21.107998+00', '2026-09-22 02:13:21.108048+00', '2026-09-22 02:13:21.108048+00', '14428247-5f9e-4430-a1bf-e430f3b4782f'),
	('1a8c15ee-2646-4ee1-90d2-d25dd899154f', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '{"sub": "1a8c15ee-2646-4ee1-90d2-d25dd899154f", "name": "Jimmy", "email": "neutron@gmail.com", "phone": "369258147", "lastname": "Neutron", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 02:15:34.6752+00', '2026-09-22 02:15:34.675244+00', '2026-09-22 02:15:34.675244+00', 'a790b76e-7bcd-47f7-877d-1525ea61ba30'),
	('1cbf28ce-6f02-421b-90ea-85aa7541b264', '1cbf28ce-6f02-421b-90ea-85aa7541b264', '{"sub": "1cbf28ce-6f02-421b-90ea-85aa7541b264", "email": "jorge1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 16:16:33.307205+00', '2026-09-22 16:16:33.307259+00', '2026-09-22 16:16:33.307259+00', '285c9e5b-cbfd-42d7-8d5a-2cc56d0f49a9'),
	('7ba9a100-e00e-4737-be7c-83e4bccd3ecb', '7ba9a100-e00e-4737-be7c-83e4bccd3ecb', '{"sub": "7ba9a100-e00e-4737-be7c-83e4bccd3ecb", "email": "robledoyineth@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 16:19:53.509191+00', '2026-09-22 16:19:53.51173+00', '2026-09-22 16:19:53.51173+00', '3d8fac5f-2882-48a7-8254-31b8fb871848'),
	('150db9f6-1674-4fbd-90c2-2587b14ec05a', '150db9f6-1674-4fbd-90c2-2587b14ec05a', '{"sub": "150db9f6-1674-4fbd-90c2-2587b14ec05a", "email": "gloria1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 16:23:06.732685+00', '2026-09-22 16:23:06.732751+00', '2026-09-22 16:23:06.732751+00', '375293ea-572f-458e-bb13-6c0ce3b47d16'),
	('dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', 'dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', '{"sub": "dcd8f3ec-6a39-4718-9b95-3f7c676b65ff", "email": "susanita@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 18:02:11.114224+00', '2026-09-22 18:02:11.114284+00', '2026-09-22 18:02:11.114284+00', 'b4624aa3-bce8-48f5-837f-a71a3e0added'),
	('a9269c80-80ea-4e3f-aa0b-587582193077', 'a9269c80-80ea-4e3f-aa0b-587582193077', '{"sub": "a9269c80-80ea-4e3f-aa0b-587582193077", "email": "andresadmi@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 18:53:18.232992+00', '2026-09-22 18:53:18.233052+00', '2026-09-22 18:53:18.233052+00', '47add79a-5be0-4c85-afef-cdffcd1ab4dd'),
	('489f28a8-3b68-48c3-b490-d6bb6883f3f5', '489f28a8-3b68-48c3-b490-d6bb6883f3f5', '{"sub": "489f28a8-3b68-48c3-b490-d6bb6883f3f5", "email": "clara1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 19:10:36.863576+00', '2026-09-22 19:10:36.863631+00', '2026-09-22 19:10:36.863631+00', 'b93d4231-133e-4e4b-83e8-9e7a647d6976'),
	('8b49f28b-30c1-410e-83ba-43fb0e518a28', '8b49f28b-30c1-410e-83ba-43fb0e518a28', '{"sub": "8b49f28b-30c1-410e-83ba-43fb0e518a28", "email": "luisito@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 19:17:16.610191+00', '2026-09-22 19:17:16.610242+00', '2026-09-22 19:17:16.610242+00', '3f45212f-cbd1-4668-b6f6-0ef154e57002'),
	('c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf', 'c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf', '{"sub": "c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf", "name": "Mariana ", "email": "mari@gmail.com", "phone": "9753724351", "lastname": "Perez", "email_verified": false, "phone_verified": false}', 'email', '2026-09-22 20:03:33.29596+00', '2026-09-22 20:03:33.296551+00', '2026-09-22 20:03:33.296551+00', '2c62221b-dc58-4c06-8a8a-aea5fbd92347'),
	('77cb8fc6-95c6-4595-a944-7e8f9290de1b', '77cb8fc6-95c6-4595-a944-7e8f9290de1b', '{"sub": "77cb8fc6-95c6-4595-a944-7e8f9290de1b", "email": "anyela@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-10-08 21:05:28.42506+00', '2026-10-08 21:05:28.425116+00', '2026-10-08 21:05:28.425116+00', 'beed7281-6489-4d0d-8ddd-b08e6db22d8a');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('c6d24181-01df-42a2-8dd5-452d7e427b7e', '684e5a46-6c9a-4ad8-af36-bbc79288f761', '2026-09-22 01:47:32.746479+00', '2026-09-22 01:47:32.746479+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('02fcfa95-75ee-422d-8d87-f90eed7380d1', '0b7375ce-96d9-4406-b261-add20a435547', '2026-09-22 02:13:21.125648+00', '2026-09-22 02:13:21.125648+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('072f7117-9441-46c1-8b82-55fc58aa18fa', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-03 21:58:23.78002+00', '2026-06-03 21:58:23.78002+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('ae7d94ca-9e24-447f-9781-0b1f36e622dd', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-04 03:01:23.691041+00', '2026-06-04 03:01:23.691041+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.179', NULL, NULL, NULL, NULL, NULL),
	('9435e1d7-29b9-40d6-9988-d0c3f5166694', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-04 05:02:04.147018+00', '2026-06-04 05:02:04.147018+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.179', NULL, NULL, NULL, NULL, NULL),
	('b19566ca-e512-49de-9434-1f701aff98bf', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-05 03:39:40.969014+00', '2026-06-05 04:45:00.610598+00', NULL, 'aal1', NULL, '2026-06-05 04:45:00.610491', 'node', '181.59.2.179', NULL, NULL, NULL, NULL, NULL),
	('e6d91371-0672-4ac6-9c3a-334649206c7e', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:20:21.168398+00', '2026-09-22 02:20:21.168398+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('2ee51268-c66d-4d75-a9d4-5257c7187b75', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:20:23.595626+00', '2026-09-22 02:20:23.595626+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('a456198c-9481-494a-953b-afd6011ffa00', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-05 20:47:10.060423+00', '2026-06-05 20:47:10.060423+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('27092ffa-eec5-4972-b054-9749afa85ffa', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-05 21:55:39.757437+00', '2026-06-05 21:55:39.757437+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('cdda3348-2373-475c-9502-e57b253b6922', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:20:42.947937+00', '2026-09-22 02:20:42.947937+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('d50976ed-24fc-4538-b7d7-4536683e4034', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:21:02.993224+00', '2026-09-22 02:21:02.993224+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('25d4fc8e-3de7-420e-a98f-2fbc48283b4f', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-07 01:56:07.332282+00', '2026-06-07 04:50:56.485899+00', NULL, 'aal1', NULL, '2026-06-07 04:50:56.485796', 'node', '181.59.3.114', NULL, NULL, NULL, NULL, NULL),
	('b61676e8-1978-4453-ae2b-2f5b5c73d211', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-08 01:38:40.613478+00', '2026-06-08 01:38:40.613478+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.17', NULL, NULL, NULL, NULL, NULL),
	('3ec49594-b800-4812-ae44-1eae11f8ae17', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-08 02:50:59.271265+00', '2026-06-08 02:50:59.271265+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.17', NULL, NULL, NULL, NULL, NULL),
	('72d1494c-f8d0-42d6-9841-464514b021ee', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-09 01:08:38.96477+00', '2026-06-09 01:08:38.96477+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.17', NULL, NULL, NULL, NULL, NULL),
	('e21a1240-f1b9-4d53-aa43-23ee33699338', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-09 01:22:58.734649+00', '2026-06-09 01:22:58.734649+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.17', NULL, NULL, NULL, NULL, NULL),
	('b3532012-e453-4930-9192-23e910088c15', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-09 03:25:55.572108+00', '2026-06-09 03:25:55.572108+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.17', NULL, NULL, NULL, NULL, NULL),
	('d83602f3-95fb-445e-b77f-46bd120e689e', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-09 03:26:35.095786+00', '2026-06-09 03:26:35.095786+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.17', NULL, NULL, NULL, NULL, NULL),
	('61b0ca77-3101-4749-a35d-19111584a763', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-09 04:13:47.40624+00', '2026-06-09 04:13:47.40624+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.17', NULL, NULL, NULL, NULL, NULL),
	('8a583c6e-3054-4763-9d2a-eb4d45fa7e10', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-09 20:31:34.468224+00', '2026-06-09 20:31:34.468224+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('ed8e34e6-0d18-47f2-a88d-feadb7be2d47', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-09 20:32:53.691104+00', '2026-06-09 20:32:53.691104+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('9da4d876-a3d3-43b4-b50a-9f541612cb93', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-09 22:00:42.852488+00', '2026-06-09 22:00:42.852488+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('75715ce6-6852-4c66-8f9e-17d03b9ceb40', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-09 22:17:14.644883+00', '2026-06-09 22:17:14.644883+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('9717f149-84aa-4bd6-9bd8-5eb4b946714b', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-10 19:45:10.920639+00', '2026-06-10 19:45:10.920639+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('9e27b4b9-eb70-49f5-bf6a-fe5925c3aeee', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-10 19:45:31.270567+00', '2026-06-10 19:45:31.270567+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('53ff428c-a2f8-45f7-927f-8ea7436fde83', '2185299f-e8f7-4c64-8530-8c17f3ec747b', '2026-06-10 20:28:20.226444+00', '2026-06-10 20:28:20.226444+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('9b2d3963-5ca6-4cdf-9a7b-69609a640041', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-10 20:32:23.77427+00', '2026-06-10 20:32:23.77427+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('558143c7-8146-4f2d-a441-1707f80f1935', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-10 22:01:26.062232+00', '2026-06-10 22:01:26.062232+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('e7500256-1908-4440-af98-9c2ddbe72580', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-11 20:04:08.471266+00', '2026-06-11 21:38:44.450288+00', NULL, 'aal1', NULL, '2026-06-11 21:38:44.448677', 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('43f5040b-c264-4882-9a59-16579818234d', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-11 21:46:13.110148+00', '2026-06-11 21:46:13.110148+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('9d83b8d3-6525-4922-a72e-a09655ad9e3c', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-12 00:09:57.454552+00', '2026-06-12 00:09:57.454552+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('39153b69-5bb0-4740-9d4c-41189cbcacf4', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-12 01:02:03.661953+00', '2026-06-12 01:02:03.661953+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('503e8baa-c534-4558-a24f-ef9a6e14a4da', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-12 01:22:45.488146+00', '2026-06-12 01:22:45.488146+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('cb07db64-d9c0-4f5f-a7fd-5fddcfce70ee', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:21:18.62751+00', '2026-09-22 02:21:18.62751+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('c5692a7f-8ed8-44e8-bcab-ba31a2c05a65', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:35:51.107701+00', '2026-09-22 02:35:51.107701+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('8eed1596-e7f1-4c7e-a03f-f45f22bdfa4e', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:41:07.977084+00', '2026-09-22 02:41:07.977084+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('5b501f15-4f53-49f1-9a3d-1c17b4668033', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:41:16.813697+00', '2026-09-22 02:41:16.813697+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('912491ac-4bb9-41a1-b5d9-5980ce8ed981', 'ac87d52c-d943-4f71-862e-7da9972f483e', '2026-06-12 05:27:44.771262+00', '2026-06-12 05:27:44.771262+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('a235b3c9-37c5-4e20-9c0a-126a897eb946', 'ac87d52c-d943-4f71-862e-7da9972f483e', '2026-06-12 05:29:22.819568+00', '2026-06-12 05:29:22.819568+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('e67d8cb2-14af-4bd9-b386-6ba6e9a696f0', 'ac87d52c-d943-4f71-862e-7da9972f483e', '2026-06-12 05:31:39.996834+00', '2026-06-12 05:31:39.996834+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('db270814-30ad-4255-83cf-165aeee2a73a', 'ac87d52c-d943-4f71-862e-7da9972f483e', '2026-06-12 05:40:31.256844+00', '2026-06-12 05:40:31.256844+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('ea345117-dc1f-40d9-8315-ef5cce5701d5', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-12 07:10:15.515896+00', '2026-06-12 07:10:15.515896+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('cb445e71-d34a-4c59-8fb4-125619e4afd8', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:46:56.997758+00', '2026-09-22 02:46:56.997758+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('9fcdb43c-1df3-41e2-8d40-743978883155', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:47:29.411766+00', '2026-09-22 02:47:29.411766+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('b589ee49-b254-4126-9d41-9de289340bd4', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:47:59.867915+00', '2026-09-22 02:47:59.867915+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('1faee9ea-229e-436c-bc50-3597b88b4091', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-12 20:48:50.575853+00', '2026-06-12 20:48:50.575853+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('e3343038-4930-4103-b622-8f403b1f74b0', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-12 20:49:03.87436+00', '2026-06-12 20:49:03.87436+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('cab3e198-2cec-43ec-ac26-304dad7281bb', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:55:53.986961+00', '2026-09-22 02:55:53.986961+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('066dd7d5-2aa1-4457-a074-5f5a36fe3eae', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 21:58:34.991985+00', '2026-09-16 21:58:34.991985+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('eee67efb-f20b-4d9b-a147-b30070407457', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-14 04:17:41.306556+00', '2026-06-14 04:17:41.306556+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('64826cb0-0d1e-4342-8bf0-1defa3c03bca', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-14 05:09:14.669541+00', '2026-06-14 05:09:14.669541+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('12e498d7-c2be-4948-874e-886558f4ee7f', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 22:18:14.394307+00', '2026-09-16 22:18:14.394307+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('4b4a0024-6257-460b-bb8c-df14feda8306', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 22:18:40.574053+00', '2026-09-16 22:18:40.574053+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('b3bbce3d-26a3-4693-a330-5106e011c6f2', '2a40859f-f54e-46eb-aab0-aa27258c138f', '2026-06-14 21:43:59.869782+00', '2026-06-14 21:43:59.869782+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('1f9431a0-d3c4-4b97-b18d-d20bef50d5f8', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 22:19:01.994528+00', '2026-09-16 22:19:01.994528+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('12dbc3b3-0321-41be-823b-b796cb9a576b', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:56:01.036742+00', '2026-09-22 02:56:01.036742+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('73009d51-bd7e-44d4-8f31-99e8531406e6', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '2026-06-14 23:25:02.897981+00', '2026-06-14 23:25:02.897981+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('dd7b409c-d11e-4586-9623-c21b8ca8623b', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:56:33.635028+00', '2026-09-22 02:56:33.635028+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('dfbfe25c-9235-48f1-a271-9f248f8abbad', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-14 23:36:03.844439+00', '2026-06-14 23:36:03.844439+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('f580669d-8e09-479b-971f-46b17b7ed40b', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-15 00:29:57.879833+00', '2026-06-15 00:29:57.879833+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('f6f25ded-c307-4a8b-bb3c-e10c149458c9', '2a40859f-f54e-46eb-aab0-aa27258c138f', '2026-06-15 03:13:20.532909+00', '2026-06-15 03:13:20.532909+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.16', NULL, NULL, NULL, NULL, NULL),
	('cde52396-202d-4c0b-8f59-b83bb8e8ce5e', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-17 22:13:11.155276+00', '2026-09-17 22:13:11.155276+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.141', NULL, NULL, NULL, NULL, NULL),
	('9e37bb33-cebe-4cd3-b0d1-75a145662757', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 16:14:37.735117+00', '2026-09-22 16:14:37.735117+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('a7ce5236-cd31-4e36-966a-ddb13713006e', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-21 19:46:22.230864+00', '2026-09-21 19:46:22.230864+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('8c13eb42-5061-406c-9f5a-c61f9f1380c9', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 16:15:16.300297+00', '2026-09-22 16:15:16.300297+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('8410bc98-8439-4eec-9c43-d4d4a3b86450', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 16:15:51.298786+00', '2026-09-22 16:15:51.298786+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('7734449a-8ef4-44e3-91e3-cd1ed5ca4996', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 16:16:12.725697+00', '2026-09-22 16:16:12.725697+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('c94d4640-f1c0-4f5c-a5a8-2508c59ab3b8', '1cbf28ce-6f02-421b-90ea-85aa7541b264', '2026-09-22 16:16:57.894158+00', '2026-09-22 16:16:57.894158+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.201', NULL, NULL, NULL, NULL, NULL),
	('014ce5aa-cf9d-42f4-96a5-c4c4935e2471', '150db9f6-1674-4fbd-90c2-2587b14ec05a', '2026-09-22 17:20:53.653208+00', '2026-09-22 17:20:53.653208+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.201', NULL, NULL, NULL, NULL, NULL),
	('3a734a37-e936-4ab2-b698-f91a675a1c97', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-22 20:01:26.939104+00', '2026-09-22 20:01:26.939104+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('90b3ece4-e55c-4d58-afaa-bdd73a966bf1', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-22 20:21:18.161751+00', '2026-10-07 13:51:16.536506+00', NULL, 'aal1', NULL, '2026-10-07 13:51:16.536355', 'okhttp/4.12.0', '181.50.217.28', NULL, NULL, NULL, NULL, NULL),
	('25ee3fdb-a1b3-4dc9-ac3d-cc7bab223511', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-22 01:51:26.369052+00', '2026-09-22 01:51:26.369052+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('dc597087-08de-46f4-8211-22687cef4fb2', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:15:34.684072+00', '2026-09-22 02:15:34.684072+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('9cdc6fd0-8ec4-413e-abf6-50e916a955f9', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:24:54.682403+00', '2026-09-22 02:24:54.682403+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('173472d3-b0b1-44e2-b54d-7f0132fd5882', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:25:14.57264+00', '2026-09-22 02:25:14.57264+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('f024a101-69e8-49ec-ae34-2735b5a3a6ed', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:37:07.048501+00', '2026-09-22 02:37:07.048501+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('c9c4455b-7291-4c8e-84e0-d092c72ec6bd', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:37:30.09548+00', '2026-09-22 02:37:30.09548+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('033a9d1e-f669-42d3-8192-df58211c502e', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 04:52:37.71885+00', '2026-06-16 04:52:37.71885+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('dae2d5d5-04ce-40ce-95a4-e64046c7cdb8', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 05:18:47.936487+00', '2026-06-16 05:18:47.936487+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('257b1f62-8bb1-4eac-a562-1b9fe16fe965', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:43:07.262206+00', '2026-09-22 02:43:07.262206+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('9bde81c9-3049-4ca5-b83c-bac156a5c870', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 05:21:25.563988+00', '2026-06-16 05:21:25.563988+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('387261d5-d020-4b3d-947f-58bf102c2847', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 05:57:04.185009+00', '2026-06-16 05:57:04.185009+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('13e7f644-2125-4b52-9ef6-2f4678745c4f', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:43:34.538345+00', '2026-09-22 02:43:34.538345+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('d842af1a-b173-406b-87e1-a8c8044d3557', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 06:27:22.43213+00', '2026-06-16 06:27:22.43213+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('371aa2fe-757b-4b60-b8c4-e477a4d8a76e', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:50:33.585172+00', '2026-09-22 02:50:33.585172+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('dbe961df-7668-4b0e-a4f6-ea2b2e03f2fb', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 06:31:16.979525+00', '2026-06-16 06:31:16.979525+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('1e897f69-ed87-4c4a-95a2-aca0b57087c7', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:50:57.467934+00', '2026-09-22 02:50:57.467934+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('a2555d7a-522d-40bd-88bd-92952b5e2e06', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 07:16:08.146626+00', '2026-06-16 07:16:08.146626+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('0937cb46-18c6-4cea-b269-8a062f40d1d2', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:57:53.125522+00', '2026-09-22 02:57:53.125522+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('ce896df7-143b-459d-bd0f-009cd88d7bd7', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 07:58:46.57018+00', '2026-06-16 07:58:46.57018+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('50f82dbe-a4dd-49cb-9d17-8af401433851', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-16 08:28:22.61701+00', '2026-06-16 08:28:22.61701+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.158', NULL, NULL, NULL, NULL, NULL),
	('578af184-06ed-4222-87d0-f4583f4f02b6', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-19 03:07:51.106551+00', '2026-06-19 03:07:51.106551+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.96', NULL, NULL, NULL, NULL, NULL),
	('a1da1ac9-136d-4d9e-a212-183bd73f1c8d', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 21:46:12.554319+00', '2026-09-16 21:46:12.554319+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('e1dd9432-b942-4d7a-a446-50a30435ab99', '54645d6a-3d1b-404e-ab84-87d74859c708', '2026-06-19 03:39:21.548843+00', '2026-06-19 05:35:39.23845+00', NULL, 'aal1', NULL, '2026-06-19 05:35:39.238341', 'node', '181.59.148.96', NULL, NULL, NULL, NULL, NULL),
	('ec2be270-d474-4e92-9884-5d54514af60e', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 22:02:29.135183+00', '2026-09-16 22:02:29.135183+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('0cbf41c4-326a-445f-8d5e-bc3b2287fe72', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-24 04:36:22.151667+00', '2026-06-24 05:34:28.439696+00', NULL, 'aal1', NULL, '2026-06-24 05:34:28.439576', 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('edf3a54b-3bfc-49d0-8be9-d1dcd38c6e35', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-24 05:50:43.863827+00', '2026-06-24 05:50:43.863827+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('dab26c02-f9e6-4747-9e3f-16f4a7b2ba0a', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 22:21:57.01262+00', '2026-09-16 22:21:57.01262+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('e60521cd-fa21-4811-b693-e73221d6d4d2', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-08-02 02:26:54.754074+00', '2026-08-02 04:23:25.094815+00', NULL, 'aal1', NULL, '2026-08-02 04:23:25.094705', 'node', '181.59.2.223', NULL, NULL, NULL, NULL, NULL),
	('eac66f5d-1e85-442f-ad6f-4b0f4c0395b4', '41e5290e-b250-4663-8ca4-b8f2131497dd', '2026-06-30 04:13:48.299999+00', '2026-06-30 04:13:48.299999+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('4fb9ad5e-636d-4bd5-8dbc-945af0d60014', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-24 19:39:40.94767+00', '2026-06-24 21:45:48.163648+00', NULL, 'aal1', NULL, '2026-06-24 21:45:48.163485', 'node', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('a5e19bf8-9d59-4a3d-b77d-ebf1969f139d', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 22:22:18.312565+00', '2026-09-16 22:22:18.312565+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('550c77da-856b-4fe0-a6ae-9d3d64803ce0', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-25 04:00:07.259529+00', '2026-06-25 06:04:05.363924+00', NULL, 'aal1', NULL, '2026-06-25 06:04:05.363816', 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('4f23745f-1767-4751-bfcb-014afe757465', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-25 06:13:39.872272+00', '2026-06-25 06:13:39.872272+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('ad31465a-2785-47d4-a245-a7f884cd5cab', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-25 06:20:08.698548+00', '2026-06-25 06:20:08.698548+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('8efed52d-6a1f-4447-94ca-3ff68331ce32', 'f7b79f48-c3df-485e-b929-d7c09f18919c', '2026-06-25 06:48:26.089525+00', '2026-06-25 06:48:26.089525+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('110e8e0e-2d20-47e0-9024-c690da2312fc', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-25 06:53:07.263599+00', '2026-06-25 06:53:07.263599+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('7060150a-9043-4641-b456-a57f02944d79', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-26 04:33:49.147406+00', '2026-06-26 04:33:49.147406+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('f59dca84-8a17-45e8-9343-aa6f70cdb05e', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-26 16:58:22.238554+00', '2026-06-26 16:58:22.238554+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.15', NULL, NULL, NULL, NULL, NULL),
	('6c316c50-228a-4011-b5ec-2a6b68797e0b', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-26 19:45:23.646108+00', '2026-06-26 19:45:23.646108+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('bd4decca-2cc2-46db-b2fd-5d2a8cc43e02', '5b32eb78-0b0e-43a4-9930-be2f07d13849', '2026-06-29 02:35:14.309315+00', '2026-06-29 02:35:14.309315+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('0b5fc738-58b9-42d8-a73e-56672ef550f4', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-21 19:42:24.652064+00', '2026-09-21 19:42:24.652064+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('770471b3-df5c-4fbd-8413-420672d052d5', '684e5a46-6c9a-4ad8-af36-bbc79288f761', '2026-09-21 19:54:53.754508+00', '2026-09-21 19:54:53.754508+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('c59cce30-5c05-4b66-b9b2-ea7a15d51d0a', '684e5a46-6c9a-4ad8-af36-bbc79288f761', '2026-09-21 19:55:18.311505+00', '2026-09-21 19:55:18.311505+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('0fa361a9-3b3f-4f90-a423-90e0a1634141', '684e5a46-6c9a-4ad8-af36-bbc79288f761', '2026-09-21 21:35:28.94002+00', '2026-09-21 21:35:28.94002+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('4185f4f0-9288-437b-a72e-cc4697873ea9', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 19:41:07.285407+00', '2026-09-22 19:41:07.285407+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('f690a823-2df7-4c36-8ac0-da20c3aebb58', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 19:41:28.372452+00', '2026-09-22 19:41:28.372452+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('2dc14c09-24fc-4f5e-83d1-cd513dee9a46', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-22 20:01:26.938821+00', '2026-09-22 20:01:26.938821+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('7b0e2495-7d97-4c59-9bd0-f6aee146b2bf', '684e5a46-6c9a-4ad8-af36-bbc79288f761', '2026-09-22 20:01:47.171961+00', '2026-09-22 20:01:47.171961+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('61e89d63-da1a-4606-aecf-388526b6f9a3', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 20:18:52.019341+00', '2026-09-22 20:18:52.019341+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('dd842b62-4403-44d2-88e8-e312e357de96', 'd4afcde5-cb61-4e03-8813-574ec433d404', '2026-06-30 03:52:52.419026+00', '2026-06-30 03:52:52.419026+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('c145fc55-4c45-42b8-9c1f-c0194c4d071d', '808a419d-5acf-4503-bdf3-0fb1253a134d', '2026-06-30 04:02:58.416824+00', '2026-06-30 04:02:58.416824+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('ab1d8645-d790-43eb-badd-1c1bef0cf91c', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '2026-06-30 21:37:34.801822+00', '2026-06-30 21:37:34.801822+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('77d157c9-6ede-466c-a421-55a8485ae31a', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '2026-06-30 22:03:12.144568+00', '2026-06-30 22:03:12.144568+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('29f6b1a9-37bf-47ed-9eae-d1173e9b31c4', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '2026-06-30 22:12:51.35208+00', '2026-06-30 22:12:51.35208+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('b079c45f-640c-4bb9-9373-0b840f04b201', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:17:14.711726+00', '2026-09-22 02:17:14.711726+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('01ebfb45-6886-4d45-8c0c-fc160ee753ce', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:18:03.910863+00', '2026-09-22 02:18:03.910863+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('2e36ab6e-f04c-4c26-8842-65a340b5232b', 'b9e30ba1-6fca-4ffe-9515-250f68e0c76b', '2026-09-08 02:04:51.177353+00', '2026-09-08 02:04:51.177353+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.217.28', NULL, NULL, NULL, NULL, NULL),
	('3eec3b5a-def3-447e-809d-3bb7b24da3e9', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:18:29.406264+00', '2026-09-22 02:18:29.406264+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('41728fba-0d12-42c0-ad75-b9223318049b', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:26:36.66783+00', '2026-09-22 02:26:36.66783+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('07c988ec-ea65-4310-a99e-b5ea32d0331a', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:39:08.113228+00', '2026-09-22 02:39:08.113228+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('77fd9d2d-9b3d-473f-b5d1-b9a83cc6b5ec', '41e5290e-b250-4663-8ca4-b8f2131497dd', '2026-07-01 03:06:48.766175+00', '2026-07-01 03:06:48.766175+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('55848592-9e39-4b35-aba4-882a09844fcb', '808a419d-5acf-4503-bdf3-0fb1253a134d', '2026-07-01 03:08:05.978352+00', '2026-07-01 03:08:05.978352+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('44abe878-09b0-4099-83d1-e9c21336f4d0', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:45:30.991216+00', '2026-09-22 02:45:30.991216+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('76e99187-8a2e-4809-becd-ae6dac8dbbba', '41e5290e-b250-4663-8ca4-b8f2131497dd', '2026-07-01 03:39:53.435174+00', '2026-07-01 03:39:53.435174+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('9ba5cc47-4fe6-4c8a-b693-9fae0a404e42', '808a419d-5acf-4503-bdf3-0fb1253a134d', '2026-07-01 03:41:07.606789+00', '2026-07-01 03:41:07.606789+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('2d13857c-3b7b-4813-b2c8-2b403cedac80', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-21 19:45:16.928768+00', '2026-09-21 19:45:16.928768+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('a9849a76-1670-495a-9d88-bf0b18d9e735', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 02:52:54.015649+00', '2026-09-22 02:52:54.015649+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('9bea0e16-20a0-407a-abd4-ba1d10b67a83', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 03:02:28.893324+00', '2026-09-22 03:02:28.893324+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('471e7f55-e95f-45f5-8ccb-c16bfc512734', '41e5290e-b250-4663-8ca4-b8f2131497dd', '2026-07-01 04:31:16.703162+00', '2026-07-01 04:31:16.703162+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('0557ab8c-9727-448f-abe5-095ebf4174bd', '808a419d-5acf-4503-bdf3-0fb1253a134d', '2026-07-01 05:04:14.847673+00', '2026-07-01 05:04:14.847673+00', NULL, 'aal1', NULL, NULL, 'node', '181.50.59.178', NULL, NULL, NULL, NULL, NULL),
	('9606b875-7746-4d01-968f-e432e583b8ae', 'e7034024-d89a-4baf-b65c-2bc9d639d163', '2026-07-01 08:18:24.022654+00', '2026-07-01 08:18:24.022654+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('3b28f895-54ff-484f-9335-74d46721722e', 'e7034024-d89a-4baf-b65c-2bc9d639d163', '2026-07-01 08:28:55.313692+00', '2026-07-01 08:28:55.313692+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('0c79bffe-afde-4631-92e0-c7f34b257c1e', 'e7034024-d89a-4baf-b65c-2bc9d639d163', '2026-07-01 13:32:45.56217+00', '2026-07-01 13:32:45.56217+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('6fa48f16-6f6c-41b0-af41-627f2efc24f2', 'e7034024-d89a-4baf-b65c-2bc9d639d163', '2026-07-01 14:55:17.26558+00', '2026-07-01 14:55:17.26558+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('444e3d6e-f104-4fca-8e38-ac7ef1596f45', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 03:03:12.993874+00', '2026-09-22 03:03:12.993874+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('53d31fd8-0dc4-4a6a-965d-c26125b1eb16', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 03:03:27.031277+00', '2026-09-22 03:03:27.031277+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('4c31a24f-f9a7-4690-8a13-31ba4ecc0f1c', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 21:01:09.453176+00', '2026-09-16 21:01:09.453176+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('dc1bd8ab-64b0-4a64-8375-df7889152dd9', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '2026-07-01 19:50:45.915399+00', '2026-07-01 19:50:45.915399+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.141', NULL, NULL, NULL, NULL, NULL),
	('c6e0d6b5-58bc-4873-bb13-c2df8fcac826', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 21:49:52.105305+00', '2026-09-16 21:49:52.105305+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('1837f728-5340-43d4-8eba-922357d05976', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 21:51:47.98664+00', '2026-09-16 21:51:47.98664+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('f28dfd9b-c765-4128-ae24-e380e4d099ae', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 21:53:30.205973+00', '2026-09-16 21:53:30.205973+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('8f02d685-db9f-47af-a071-9f54029413d9', '0badffdb-50a4-4e23-953f-639ac55ddd21', '2026-07-01 21:03:14.018884+00', '2026-07-01 21:03:14.018884+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.141', NULL, NULL, NULL, NULL, NULL),
	('a5d27d2a-9030-4d04-a364-e3bbb159c223', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-16 22:05:13.594271+00', '2026-09-16 22:05:13.594271+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('4822af12-e217-460e-9bb2-daf329fb8c06', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-01 21:25:29.635912+00', '2026-07-01 21:25:29.635912+00', NULL, 'aal1', NULL, NULL, 'node', '179.1.218.141', NULL, NULL, NULL, NULL, NULL),
	('5c205ab9-5b99-4149-9f4d-65c01ca52e9c', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 16:11:35.278536+00', '2026-09-22 16:11:35.278536+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('d8636ec1-b9cd-4ad9-9eca-607d64009b0b', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 02:20:21.866771+00', '2026-07-03 02:20:21.866771+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('01eb02fa-d672-4da7-99a2-0972f970733f', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 03:38:42.654859+00', '2026-07-03 03:38:42.654859+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('9c5c1388-68c0-4b45-b555-6b9aa8208f88', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 04:24:03.526706+00', '2026-07-03 04:24:03.526706+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('2f409b1f-6462-4b3d-a91f-5100722f4fd6', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 05:19:26.621809+00', '2026-07-03 05:19:26.621809+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('0257d1f3-1c1d-4d92-866e-ddd184e5b495', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 06:30:48.243216+00', '2026-07-03 06:30:48.243216+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('24e4dd66-40cf-466f-9449-f1dae645d8b7', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 18:49:01.973495+00', '2026-07-03 18:49:01.973495+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('64f6cc23-c037-4a64-a856-412af162691a', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 19:09:47.544817+00', '2026-07-03 19:09:47.544817+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('9dc2c254-5fda-4df3-b09e-27d159a668c2', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 19:36:50.942059+00', '2026-07-03 19:36:50.942059+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('7bf76703-569e-463c-a50a-1621391701d4', '150db9f6-1674-4fbd-90c2-2587b14ec05a', '2026-09-22 16:38:23.912315+00', '2026-09-22 16:38:23.912315+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.2.201', NULL, NULL, NULL, NULL, NULL),
	('09c8e3e3-f2c2-4821-8a8f-900e5f77e754', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', '2026-07-03 20:22:30.156651+00', '2026-07-03 20:22:30.156651+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('bd93d092-df29-4637-ab77-33277e0e923c', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', '2026-07-03 21:06:45.903616+00', '2026-07-03 21:06:45.903616+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('d172b79e-a458-4f49-b6fe-0ed7edb2e10c', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-17 20:25:02.16959+00', '2026-09-17 20:25:02.16959+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.141', NULL, NULL, NULL, NULL, NULL),
	('b8e41429-b21c-472d-9ac0-3437ae59e837', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 21:37:10.224999+00', '2026-07-03 21:37:10.224999+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('338f7987-aba8-42f4-9b05-38697620f15c', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', '2026-07-03 21:57:21.7194+00', '2026-07-03 21:57:21.7194+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('7cee9f53-17b2-4780-b77e-a3c069a542df', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', '2026-07-03 21:59:15.307157+00', '2026-07-03 21:59:15.307157+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('165c5965-dc5f-4ec0-b65f-bb78163added', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-03 22:12:26.486573+00', '2026-07-03 22:12:26.486573+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.148.68', NULL, NULL, NULL, NULL, NULL),
	('70cd4b05-d23e-4c20-aa6a-3d14fa441158', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-08 02:27:04.021681+00', '2026-07-08 03:25:20.364791+00', NULL, 'aal1', NULL, '2026-07-08 03:25:20.364674', 'node', '181.59.148.91', NULL, NULL, NULL, NULL, NULL),
	('e7598d60-2e41-4292-bfa3-e44cf38d7f0a', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-22 19:45:21.711507+00', '2026-09-22 19:45:21.711507+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('f0a8441d-1c29-4a40-b9ea-5fb2e152748b', 'c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf', '2026-09-22 20:03:33.323571+00', '2026-09-22 20:03:33.323571+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('f6acafff-0be6-4767-ad45-752a2a29bbd6', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', '2026-09-22 20:19:12.691558+00', '2026-09-22 20:19:12.691558+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.142', NULL, NULL, NULL, NULL, NULL),
	('1a7fb80a-39ec-449a-b51d-b8f361de41e1', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-21 19:45:03.755977+00', '2026-09-21 19:45:03.755977+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('3e88d383-410c-47c5-897f-40f92e6427e0', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', '2026-09-21 19:45:15.589957+00', '2026-09-21 19:45:15.589957+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '179.1.218.140', NULL, NULL, NULL, NULL, NULL),
	('14bbeb26-541d-4640-b2f2-bf2793096c4c', '684e5a46-6c9a-4ad8-af36-bbc79288f761', '2026-09-22 00:48:25.698691+00', '2026-09-22 00:48:25.698691+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '181.140.71.202', NULL, NULL, NULL, NULL, NULL),
	('5aae5ae8-19a5-4f0f-b99b-1ab4d40fa69e', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-07-14 02:25:54.488014+00', '2026-07-14 02:25:54.488014+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.202', NULL, NULL, NULL, NULL, NULL),
	('c931c145-ff8a-4627-8f49-e7e8bf5e2fde', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-07-14 03:24:05.792734+00', '2026-07-14 03:24:05.792734+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.202', NULL, NULL, NULL, NULL, NULL),
	('9d57d883-b891-41c9-bcff-85aeda9c3aaa', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-07-14 03:51:07.393323+00', '2026-07-14 03:51:07.393323+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.202', NULL, NULL, NULL, NULL, NULL),
	('a084e4fb-5571-483a-bb09-8eac9bc654d0', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-07-14 05:22:04.193544+00', '2026-07-14 05:22:04.193544+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.202', NULL, NULL, NULL, NULL, NULL),
	('60f9528b-148b-4da9-b28f-7cfd4e975f58', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-07-14 05:43:46.95909+00', '2026-07-14 05:43:46.95909+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.202', NULL, NULL, NULL, NULL, NULL),
	('7dc98bf6-eedc-41bc-a48a-6df07a96d9e5', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-07-14 05:56:43.702096+00', '2026-07-14 05:56:43.702096+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.202', NULL, NULL, NULL, NULL, NULL),
	('81f14246-629c-4e10-bb6d-c3d8a91b8b79', 'c9d19e19-e43a-4952-b8df-819d769e3210', '2026-07-14 05:57:32.582095+00', '2026-07-14 05:57:32.582095+00', NULL, 'aal1', NULL, NULL, 'node', '181.59.3.202', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('072f7117-9441-46c1-8b82-55fc58aa18fa', '2026-06-03 21:58:23.804986+00', '2026-06-03 21:58:23.804986+00', 'password', 'cbf7963f-03e8-4535-8417-cc07bb431aff'),
	('ae7d94ca-9e24-447f-9781-0b1f36e622dd', '2026-06-04 03:01:23.731443+00', '2026-06-04 03:01:23.731443+00', 'password', '95da6401-3832-46c2-863e-f230840545ec'),
	('9435e1d7-29b9-40d6-9988-d0c3f5166694', '2026-06-04 05:02:04.191351+00', '2026-06-04 05:02:04.191351+00', 'password', '4b81c2ed-53b7-4cb7-ab4a-41b22b11e9b6'),
	('b19566ca-e512-49de-9434-1f701aff98bf', '2026-06-05 03:39:41.027091+00', '2026-06-05 03:39:41.027091+00', 'password', 'dabdbf1e-98c2-4614-98ff-bfefe5ff375f'),
	('a456198c-9481-494a-953b-afd6011ffa00', '2026-06-05 20:47:10.071361+00', '2026-06-05 20:47:10.071361+00', 'password', '3d262506-2bc3-40b9-92b3-9213d11442ec'),
	('27092ffa-eec5-4972-b054-9749afa85ffa', '2026-06-05 21:55:39.782055+00', '2026-06-05 21:55:39.782055+00', 'password', 'd767601a-2c13-43d3-ba01-4ebc72453614'),
	('25d4fc8e-3de7-420e-a98f-2fbc48283b4f', '2026-06-07 01:56:07.366358+00', '2026-06-07 01:56:07.366358+00', 'password', '4a3e5d5c-7979-4d9b-addc-bca9aa720c64'),
	('b61676e8-1978-4453-ae2b-2f5b5c73d211', '2026-06-08 01:38:40.656479+00', '2026-06-08 01:38:40.656479+00', 'password', '17207d4c-8736-49b4-a193-024832536e6a'),
	('3ec49594-b800-4812-ae44-1eae11f8ae17', '2026-06-08 02:50:59.303639+00', '2026-06-08 02:50:59.303639+00', 'password', 'fa3cd327-c3cc-4e64-ae1e-62d6cf4d9cc8'),
	('72d1494c-f8d0-42d6-9841-464514b021ee', '2026-06-09 01:08:38.988995+00', '2026-06-09 01:08:38.988995+00', 'password', '38a3ee9a-20e6-43ed-92fb-c9dc3020e017'),
	('e21a1240-f1b9-4d53-aa43-23ee33699338', '2026-06-09 01:22:58.743948+00', '2026-06-09 01:22:58.743948+00', 'password', '6dc1ae33-e968-4e90-8331-1286a664ae32'),
	('b3532012-e453-4930-9192-23e910088c15', '2026-06-09 03:25:55.604598+00', '2026-06-09 03:25:55.604598+00', 'password', '6db5f4d5-6f30-4ad9-aa88-df6691bf292d'),
	('d83602f3-95fb-445e-b77f-46bd120e689e', '2026-06-09 03:26:35.099335+00', '2026-06-09 03:26:35.099335+00', 'password', 'e87c9ed7-505d-4e9b-a3cd-dfa5194f7371'),
	('61b0ca77-3101-4749-a35d-19111584a763', '2026-06-09 04:13:47.423053+00', '2026-06-09 04:13:47.423053+00', 'password', '70ddabc4-3c2c-4271-a5b3-2291ae3a668e'),
	('8a583c6e-3054-4763-9d2a-eb4d45fa7e10', '2026-06-09 20:31:34.512807+00', '2026-06-09 20:31:34.512807+00', 'password', '3bb3b03a-d160-4160-9c9c-26032384b0a0'),
	('ed8e34e6-0d18-47f2-a88d-feadb7be2d47', '2026-06-09 20:32:53.697796+00', '2026-06-09 20:32:53.697796+00', 'password', 'a1666ca1-7e9c-4b87-8798-ab4576827dd5'),
	('9da4d876-a3d3-43b4-b50a-9f541612cb93', '2026-06-09 22:00:42.866659+00', '2026-06-09 22:00:42.866659+00', 'password', '72057de1-45d7-4adf-b413-b506b40673d9'),
	('75715ce6-6852-4c66-8f9e-17d03b9ceb40', '2026-06-09 22:17:14.657207+00', '2026-06-09 22:17:14.657207+00', 'password', 'b73b2181-81ae-4c2a-90d4-4ecbafbd91e2'),
	('9717f149-84aa-4bd6-9bd8-5eb4b946714b', '2026-06-10 19:45:10.966018+00', '2026-06-10 19:45:10.966018+00', 'password', '54f693d4-4b52-40d4-8d49-a10de9386610'),
	('9e27b4b9-eb70-49f5-bf6a-fe5925c3aeee', '2026-06-10 19:45:31.289971+00', '2026-06-10 19:45:31.289971+00', 'password', 'e1423ebe-4edb-450d-b165-50a9ccf730f8'),
	('53ff428c-a2f8-45f7-927f-8ea7436fde83', '2026-06-10 20:28:20.2513+00', '2026-06-10 20:28:20.2513+00', 'password', '38ceeb48-7f0b-4e56-a601-4487df768191'),
	('9b2d3963-5ca6-4cdf-9a7b-69609a640041', '2026-06-10 20:32:23.788383+00', '2026-06-10 20:32:23.788383+00', 'password', '96fff2cf-7cd4-4672-919c-158dcccc14b5'),
	('558143c7-8146-4f2d-a441-1707f80f1935', '2026-06-10 22:01:26.08112+00', '2026-06-10 22:01:26.08112+00', 'password', 'c10dbb00-658f-4e9a-8a55-51f591515865'),
	('e7500256-1908-4440-af98-9c2ddbe72580', '2026-06-11 20:04:08.526186+00', '2026-06-11 20:04:08.526186+00', 'password', 'b5b38c47-c249-452c-9bbf-0c60e93b2d97'),
	('43f5040b-c264-4882-9a59-16579818234d', '2026-06-11 21:46:13.121747+00', '2026-06-11 21:46:13.121747+00', 'password', 'a84b9adb-140e-43e4-bcc3-28e819d3fb7a'),
	('9d83b8d3-6525-4922-a72e-a09655ad9e3c', '2026-06-12 00:09:57.486441+00', '2026-06-12 00:09:57.486441+00', 'password', 'c4a9a586-e9a1-435a-a52d-2694a3852c29'),
	('39153b69-5bb0-4740-9d4c-41189cbcacf4', '2026-06-12 01:02:03.681336+00', '2026-06-12 01:02:03.681336+00', 'password', '813629ac-282a-47b6-a011-bc26efbc2753'),
	('503e8baa-c534-4558-a24f-ef9a6e14a4da', '2026-06-12 01:22:45.501554+00', '2026-06-12 01:22:45.501554+00', 'password', '637f95f9-7da9-4db5-a17a-43185b27c506'),
	('912491ac-4bb9-41a1-b5d9-5980ce8ed981', '2026-06-12 05:27:44.80347+00', '2026-06-12 05:27:44.80347+00', 'password', '3cf8d720-1eb2-4f04-ad89-473aa8898b2e'),
	('a235b3c9-37c5-4e20-9c0a-126a897eb946', '2026-06-12 05:29:22.836264+00', '2026-06-12 05:29:22.836264+00', 'password', 'f2b3c3b4-b4ca-479d-94c3-61077fc80700'),
	('e67d8cb2-14af-4bd9-b386-6ba6e9a696f0', '2026-06-12 05:31:40.0122+00', '2026-06-12 05:31:40.0122+00', 'password', '3241b778-7790-490f-8675-324e9ace5d11'),
	('db270814-30ad-4255-83cf-165aeee2a73a', '2026-06-12 05:40:31.272998+00', '2026-06-12 05:40:31.272998+00', 'password', '84e59760-cc01-4d92-936d-8f2a5464af67'),
	('ea345117-dc1f-40d9-8315-ef5cce5701d5', '2026-06-12 07:10:15.561586+00', '2026-06-12 07:10:15.561586+00', 'password', '2a36e06b-3618-4b94-b571-5f22bf8227a4'),
	('9e37bb33-cebe-4cd3-b0d1-75a145662757', '2026-09-22 16:14:37.764378+00', '2026-09-22 16:14:37.764378+00', 'password', '5cee67fa-ac37-44c2-9fb7-90dd9c356878'),
	('8c13eb42-5061-406c-9f5a-c61f9f1380c9', '2026-09-22 16:15:16.303232+00', '2026-09-22 16:15:16.303232+00', 'password', 'd8d27ac2-6b0b-46b9-bb49-b86d1fb95505'),
	('8410bc98-8439-4eec-9c43-d4d4a3b86450', '2026-09-22 16:15:51.311607+00', '2026-09-22 16:15:51.311607+00', 'password', '2b3f930e-045f-449a-9193-9ba57767e9b6'),
	('1faee9ea-229e-436c-bc50-3597b88b4091', '2026-06-12 20:48:50.587813+00', '2026-06-12 20:48:50.587813+00', 'password', 'a093d242-1bdf-47d3-ae7a-1f59dbfdc798'),
	('e3343038-4930-4103-b622-8f403b1f74b0', '2026-06-12 20:49:03.878195+00', '2026-06-12 20:49:03.878195+00', 'password', '38cf7af1-6a6f-419e-9e3c-8a50a5a4c933'),
	('7734449a-8ef4-44e3-91e3-cd1ed5ca4996', '2026-09-22 16:16:12.741696+00', '2026-09-22 16:16:12.741696+00', 'password', 'b0a2180b-3f59-49f2-bed7-ecc7f6de9951'),
	('c94d4640-f1c0-4f5c-a5a8-2508c59ab3b8', '2026-09-22 16:16:57.897778+00', '2026-09-22 16:16:57.897778+00', 'password', '42b898dc-1f90-4e28-b0bb-4612da4f676a'),
	('eee67efb-f20b-4d9b-a147-b30070407457', '2026-06-14 04:17:41.351018+00', '2026-06-14 04:17:41.351018+00', 'password', '7f703b7b-a75b-4d7b-9073-457d5f2b15fd'),
	('64826cb0-0d1e-4342-8bf0-1defa3c03bca', '2026-06-14 05:09:14.68433+00', '2026-06-14 05:09:14.68433+00', 'password', '77b176ed-9e99-4397-9f5c-a5ec8b486a5f'),
	('014ce5aa-cf9d-42f4-96a5-c4c4935e2471', '2026-09-22 17:20:53.670378+00', '2026-09-22 17:20:53.670378+00', 'password', '46fc516d-f679-47a9-882c-c482b60f63da'),
	('b3bbce3d-26a3-4693-a330-5106e011c6f2', '2026-06-14 21:43:59.875361+00', '2026-06-14 21:43:59.875361+00', 'password', 'adf368ca-5a28-49e6-af06-a9cc93fdb664'),
	('066dd7d5-2aa1-4457-a074-5f5a36fe3eae', '2026-09-16 21:58:35.018239+00', '2026-09-16 21:58:35.018239+00', 'password', 'dad5a4f9-83aa-439e-8dca-256d5c8d9ee0'),
	('12e498d7-c2be-4948-874e-886558f4ee7f', '2026-09-16 22:18:14.414357+00', '2026-09-16 22:18:14.414357+00', 'password', '66dda73e-0955-4748-9353-338865c497ee'),
	('73009d51-bd7e-44d4-8f31-99e8531406e6', '2026-06-14 23:25:02.911863+00', '2026-06-14 23:25:02.911863+00', 'password', '349de650-fb57-4a7b-ae03-a77fa1a3ccc1'),
	('4b4a0024-6257-460b-bb8c-df14feda8306', '2026-09-16 22:18:40.577273+00', '2026-09-16 22:18:40.577273+00', 'password', 'cb5578c3-194d-42ec-b87b-840560f231c7'),
	('dfbfe25c-9235-48f1-a271-9f248f8abbad', '2026-06-14 23:36:03.872323+00', '2026-06-14 23:36:03.872323+00', 'password', 'a66fcde5-3f64-4b42-a869-1fd2c732167c'),
	('f580669d-8e09-479b-971f-46b17b7ed40b', '2026-06-15 00:29:57.892074+00', '2026-06-15 00:29:57.892074+00', 'password', 'f8cb4de7-7062-43b9-ad7a-12beeaaf74bb'),
	('1f9431a0-d3c4-4b97-b18d-d20bef50d5f8', '2026-09-16 22:19:01.996983+00', '2026-09-16 22:19:01.996983+00', 'password', 'cf583fbf-dacc-4437-b1b4-ec7d49315e10'),
	('f6f25ded-c307-4a8b-bb3c-e10c149458c9', '2026-06-15 03:13:20.565993+00', '2026-06-15 03:13:20.565993+00', 'password', '62b5885c-3af0-4c32-a9f1-cb34a3826af6'),
	('3a734a37-e936-4ab2-b698-f91a675a1c97', '2026-09-22 20:01:26.964141+00', '2026-09-22 20:01:26.964141+00', 'password', '7a063e6d-2dab-4b4d-9ddf-339e7a1afe73'),
	('cde52396-202d-4c0b-8f59-b83bb8e8ce5e', '2026-09-17 22:13:11.197409+00', '2026-09-17 22:13:11.197409+00', 'password', '26d92918-feb0-44ad-a78d-37373427b658'),
	('a7ce5236-cd31-4e36-966a-ddb13713006e', '2026-09-21 19:46:22.256769+00', '2026-09-21 19:46:22.256769+00', 'password', 'ec47f4b8-3c99-45d7-a53b-2aafdfd1b502'),
	('b079c45f-640c-4bb9-9373-0b840f04b201', '2026-09-22 02:17:14.736013+00', '2026-09-22 02:17:14.736013+00', 'password', '77964312-be90-47cd-8936-7957392b8740'),
	('01ebfb45-6886-4d45-8c0c-fc160ee753ce', '2026-09-22 02:18:03.935744+00', '2026-09-22 02:18:03.935744+00', 'password', '157f0af8-7fe9-42f0-8442-af427a7db688'),
	('3eec3b5a-def3-447e-809d-3bb7b24da3e9', '2026-09-22 02:18:29.410293+00', '2026-09-22 02:18:29.410293+00', 'password', '22ae6496-7c54-40a0-b7e0-4d1f01b459f2'),
	('41728fba-0d12-42c0-ad75-b9223318049b', '2026-09-22 02:26:36.690199+00', '2026-09-22 02:26:36.690199+00', 'password', '8b5e9aa0-6126-403a-ab29-5d1ca359dce8'),
	('07c988ec-ea65-4310-a99e-b5ea32d0331a', '2026-09-22 02:39:08.131667+00', '2026-09-22 02:39:08.131667+00', 'password', '62e5d5bd-6b47-4361-ab44-0118c33b4964'),
	('44abe878-09b0-4099-83d1-e9c21336f4d0', '2026-09-22 02:45:31.003643+00', '2026-09-22 02:45:31.003643+00', 'password', '8491fdfc-1573-41c7-9784-9222e55aff62'),
	('a9849a76-1670-495a-9d88-bf0b18d9e735', '2026-09-22 02:52:54.036218+00', '2026-09-22 02:52:54.036218+00', 'password', '2f3f6a06-40d8-4310-90b8-0e70c054321d'),
	('9bea0e16-20a0-407a-abd4-ba1d10b67a83', '2026-09-22 03:02:28.944952+00', '2026-09-22 03:02:28.944952+00', 'password', 'f312c6f8-c533-4597-9fc7-91022249ab74'),
	('444e3d6e-f104-4fca-8e38-ac7ef1596f45', '2026-09-22 03:03:12.999136+00', '2026-09-22 03:03:12.999136+00', 'password', '4e5e160d-1d23-432e-bc56-934ab5350b62'),
	('53d31fd8-0dc4-4a6a-965d-c26125b1eb16', '2026-09-22 03:03:27.03642+00', '2026-09-22 03:03:27.03642+00', 'password', 'd64291e3-369d-4dc0-8274-4728e0ad94c5'),
	('033a9d1e-f669-42d3-8192-df58211c502e', '2026-06-16 04:52:37.724695+00', '2026-06-16 04:52:37.724695+00', 'password', 'd78b7046-54c7-46bc-aab6-5e47373af82f'),
	('dae2d5d5-04ce-40ce-95a4-e64046c7cdb8', '2026-06-16 05:18:47.956527+00', '2026-06-16 05:18:47.956527+00', 'password', 'e50b796c-1d9c-4bdf-82dd-333e0e45678f'),
	('9bde81c9-3049-4ca5-b83c-bac156a5c870', '2026-06-16 05:21:25.580503+00', '2026-06-16 05:21:25.580503+00', 'password', '9cab2fee-71c1-44b9-9633-15a975de6a6e'),
	('387261d5-d020-4b3d-947f-58bf102c2847', '2026-06-16 05:57:04.199104+00', '2026-06-16 05:57:04.199104+00', 'password', '7f620c04-3ec1-4319-8ad2-e03f67135fcc'),
	('d842af1a-b173-406b-87e1-a8c8044d3557', '2026-06-16 06:27:22.455319+00', '2026-06-16 06:27:22.455319+00', 'password', '4a89ca4a-5c0d-42a1-a976-cbfced776c25'),
	('dbe961df-7668-4b0e-a4f6-ea2b2e03f2fb', '2026-06-16 06:31:16.982539+00', '2026-06-16 06:31:16.982539+00', 'password', '05258ed7-3ccf-4ef7-9d00-9f099deb07de'),
	('a2555d7a-522d-40bd-88bd-92952b5e2e06', '2026-06-16 07:16:08.15704+00', '2026-06-16 07:16:08.15704+00', 'password', '50166d77-dd15-450d-b5ad-1c08e2d3fa9e'),
	('ce896df7-143b-459d-bd0f-009cd88d7bd7', '2026-06-16 07:58:46.589205+00', '2026-06-16 07:58:46.589205+00', 'password', 'ac15c96a-7117-47c4-8c79-414162e56102'),
	('50f82dbe-a4dd-49cb-9d17-8af401433851', '2026-06-16 08:28:22.628525+00', '2026-06-16 08:28:22.628525+00', 'password', '1855d67b-3e6b-4dcb-bcb1-84453378ebd9'),
	('578af184-06ed-4222-87d0-f4583f4f02b6', '2026-06-19 03:07:51.184457+00', '2026-06-19 03:07:51.184457+00', 'password', 'de1a6654-b79f-4f48-835f-f0746687a649'),
	('e1dd9432-b942-4d7a-a446-50a30435ab99', '2026-06-19 03:39:21.560989+00', '2026-06-19 03:39:21.560989+00', 'password', '5993c958-aad4-427e-8af7-ed5d80a49639'),
	('0cbf41c4-326a-445f-8d5e-bc3b2287fe72', '2026-06-24 04:36:22.185642+00', '2026-06-24 04:36:22.185642+00', 'password', 'd238d5d8-b243-406c-a36a-849f822c4a55'),
	('edf3a54b-3bfc-49d0-8be9-d1dcd38c6e35', '2026-06-24 05:50:43.890313+00', '2026-06-24 05:50:43.890313+00', 'password', '130c4dd1-317d-4521-ad08-a71cc30ebd40'),
	('4fb9ad5e-636d-4bd5-8dbc-945af0d60014', '2026-06-24 19:39:40.967697+00', '2026-06-24 19:39:40.967697+00', 'password', '1ec818f3-d206-418f-90cf-7c56fd4ab810'),
	('e60521cd-fa21-4811-b693-e73221d6d4d2', '2026-08-02 02:26:54.804768+00', '2026-08-02 02:26:54.804768+00', 'password', 'b102ac2e-fea4-4a0a-a6d6-380c2000d04c'),
	('550c77da-856b-4fe0-a6ae-9d3d64803ce0', '2026-06-25 04:00:07.322759+00', '2026-06-25 04:00:07.322759+00', 'password', 'fa9aa074-c2b3-463b-9d25-5eec12b87048'),
	('4f23745f-1767-4751-bfcb-014afe757465', '2026-06-25 06:13:39.895388+00', '2026-06-25 06:13:39.895388+00', 'password', '34505f98-e0bb-445c-821c-f6f5ed88658e'),
	('ad31465a-2785-47d4-a245-a7f884cd5cab', '2026-06-25 06:20:08.729474+00', '2026-06-25 06:20:08.729474+00', 'password', 'b567900f-e1a2-4883-ac92-2854801afe2a'),
	('8efed52d-6a1f-4447-94ca-3ff68331ce32', '2026-06-25 06:48:26.102245+00', '2026-06-25 06:48:26.102245+00', 'password', 'e02a67bb-a854-4db3-bf76-61622ee283ef'),
	('110e8e0e-2d20-47e0-9024-c690da2312fc', '2026-06-25 06:53:07.310823+00', '2026-06-25 06:53:07.310823+00', 'password', '4e8feb83-bd2e-4e78-9220-5b9d3701af05'),
	('7060150a-9043-4641-b456-a57f02944d79', '2026-06-26 04:33:49.184865+00', '2026-06-26 04:33:49.184865+00', 'password', '60a38937-540d-44bc-bc26-9751770205c4'),
	('a1da1ac9-136d-4d9e-a212-183bd73f1c8d', '2026-09-16 21:46:12.593025+00', '2026-09-16 21:46:12.593025+00', 'password', 'a9c8b16b-887a-45ee-8d01-0e09d2933d87'),
	('f59dca84-8a17-45e8-9343-aa6f70cdb05e', '2026-06-26 16:58:22.256787+00', '2026-06-26 16:58:22.256787+00', 'password', '5ae6f301-f068-4459-b161-68a16f3bd403'),
	('6c316c50-228a-4011-b5ec-2a6b68797e0b', '2026-06-26 19:45:23.671368+00', '2026-06-26 19:45:23.671368+00', 'password', 'd9e60a24-a3c6-406f-aa5d-4fbe71b85bde'),
	('ec2be270-d474-4e92-9884-5d54514af60e', '2026-09-16 22:02:29.181739+00', '2026-09-16 22:02:29.181739+00', 'password', '5cff727f-7c4e-4073-a74a-385eb562ce73'),
	('dab26c02-f9e6-4747-9e3f-16f4a7b2ba0a', '2026-09-16 22:21:57.025819+00', '2026-09-16 22:21:57.025819+00', 'password', 'c008bb52-db9b-4d68-b0f2-3785da35bd1f'),
	('a5e19bf8-9d59-4a3d-b77d-ebf1969f139d', '2026-09-16 22:22:18.315273+00', '2026-09-16 22:22:18.315273+00', 'password', '78400258-7e19-4c70-901b-b1cb9e311dae'),
	('4185f4f0-9288-437b-a72e-cc4697873ea9', '2026-09-22 19:41:07.33446+00', '2026-09-22 19:41:07.33446+00', 'password', 'ba05f8d8-9d8c-4add-8021-05057c99b3a4'),
	('bd4decca-2cc2-46db-b2fd-5d2a8cc43e02', '2026-06-29 02:35:14.337216+00', '2026-06-29 02:35:14.337216+00', 'password', 'dbbcc423-0e2e-487d-a900-4037f06aba50'),
	('f690a823-2df7-4c36-8ac0-da20c3aebb58', '2026-09-22 19:41:28.378663+00', '2026-09-22 19:41:28.378663+00', 'password', 'ca3884d1-8e10-40f4-9dbd-c3ca72b9a600'),
	('2dc14c09-24fc-4f5e-83d1-cd513dee9a46', '2026-09-22 20:01:26.98738+00', '2026-09-22 20:01:26.98738+00', 'password', 'f88a332f-0200-4a51-af84-8716e16b0888'),
	('7b0e2495-7d97-4c59-9bd0-f6aee146b2bf', '2026-09-22 20:01:47.183081+00', '2026-09-22 20:01:47.183081+00', 'password', '7c54782f-aec3-4749-a2be-c04d1f89e73f'),
	('61e89d63-da1a-4606-aecf-388526b6f9a3', '2026-09-22 20:18:52.075217+00', '2026-09-22 20:18:52.075217+00', 'password', '9a9aa2ea-2ed5-47ce-8870-b19691e27a91'),
	('f6acafff-0be6-4767-ad45-752a2a29bbd6', '2026-09-22 20:19:12.696741+00', '2026-09-22 20:19:12.696741+00', 'password', '5af1a292-76b7-4959-b010-6cab462fce1b'),
	('dd842b62-4403-44d2-88e8-e312e357de96', '2026-06-30 03:52:52.438675+00', '2026-06-30 03:52:52.438675+00', 'password', '658f8395-333a-46bc-bdb9-196e464c0d8a'),
	('0b5fc738-58b9-42d8-a73e-56672ef550f4', '2026-09-21 19:42:24.667696+00', '2026-09-21 19:42:24.667696+00', 'password', '2815e0e1-b3f2-4253-bd64-716c123560d0'),
	('c145fc55-4c45-42b8-9c1f-c0194c4d071d', '2026-06-30 04:02:58.424588+00', '2026-06-30 04:02:58.424588+00', 'password', '97935257-c6e4-458a-966e-4c6b36dd47fa'),
	('770471b3-df5c-4fbd-8413-420672d052d5', '2026-09-21 19:54:53.761106+00', '2026-09-21 19:54:53.761106+00', 'password', '6ad14133-ba2a-47f3-984f-b11dc0e44426'),
	('eac66f5d-1e85-442f-ad6f-4b0f4c0395b4', '2026-06-30 04:13:48.306982+00', '2026-06-30 04:13:48.306982+00', 'password', '145dbda9-748f-4d7d-9a62-d9ed165165b1'),
	('c59cce30-5c05-4b66-b9b2-ea7a15d51d0a', '2026-09-21 19:55:18.314982+00', '2026-09-21 19:55:18.314982+00', 'password', 'f7d93c92-bd90-4076-a59d-9ac10a773763'),
	('0fa361a9-3b3f-4f90-a423-90e0a1634141', '2026-09-21 21:35:28.980316+00', '2026-09-21 21:35:28.980316+00', 'password', '0ba1b16e-f9f9-4019-96df-55161c991e4a'),
	('c6d24181-01df-42a2-8dd5-452d7e427b7e', '2026-09-22 01:47:32.796778+00', '2026-09-22 01:47:32.796778+00', 'password', '8b470fb8-ddf9-48d4-8752-c85bda972c9e'),
	('02fcfa95-75ee-422d-8d87-f90eed7380d1', '2026-09-22 02:13:21.147638+00', '2026-09-22 02:13:21.147638+00', 'password', 'd1271e6c-b161-489f-b6b4-9f6c040c9f61'),
	('e6d91371-0672-4ac6-9c3a-334649206c7e', '2026-09-22 02:20:21.196083+00', '2026-09-22 02:20:21.196083+00', 'password', 'f7474ac1-9ac3-4ac5-afd3-af4d377dc635'),
	('2ee51268-c66d-4d75-a9d4-5257c7187b75', '2026-09-22 02:20:23.599521+00', '2026-09-22 02:20:23.599521+00', 'password', 'e22ffda2-c539-4829-9d91-03980541f596'),
	('cdda3348-2373-475c-9502-e57b253b6922', '2026-09-22 02:20:42.950575+00', '2026-09-22 02:20:42.950575+00', 'password', '66f28f9f-3890-4424-9f4d-2533521a25a4'),
	('d50976ed-24fc-4538-b7d7-4536683e4034', '2026-09-22 02:21:02.995743+00', '2026-09-22 02:21:02.995743+00', 'password', '0f5dd714-2a91-49e4-a3c4-71c7ad294ea1'),
	('cb07db64-d9c0-4f5f-a7fd-5fddcfce70ee', '2026-09-22 02:21:18.63027+00', '2026-09-22 02:21:18.63027+00', 'password', 'e52e6d17-d767-4e16-adfa-fea797a02e00'),
	('c5692a7f-8ed8-44e8-bcab-ba31a2c05a65', '2026-09-22 02:35:51.150469+00', '2026-09-22 02:35:51.150469+00', 'password', 'cf3c6fc2-49a6-4b74-a9a7-56973f4dcb52'),
	('8eed1596-e7f1-4c7e-a03f-f45f22bdfa4e', '2026-09-22 02:41:07.992209+00', '2026-09-22 02:41:07.992209+00', 'password', 'b962d129-3560-4448-bc8a-567198a2a931'),
	('ab1d8645-d790-43eb-badd-1c1bef0cf91c', '2026-06-30 21:37:34.818419+00', '2026-06-30 21:37:34.818419+00', 'password', '96f55676-fb8f-40f9-b626-ebebd6c0488d'),
	('77d157c9-6ede-466c-a421-55a8485ae31a', '2026-06-30 22:03:12.160578+00', '2026-06-30 22:03:12.160578+00', 'password', 'a91c1c7c-bf6d-4706-8057-d57ca28f706a'),
	('5b501f15-4f53-49f1-9a3d-1c17b4668033', '2026-09-22 02:41:16.818651+00', '2026-09-22 02:41:16.818651+00', 'password', 'fc93a56f-4511-4fac-a4f8-3753a5ad910f'),
	('29f6b1a9-37bf-47ed-9eae-d1173e9b31c4', '2026-06-30 22:12:51.382796+00', '2026-06-30 22:12:51.382796+00', 'password', '9f2342eb-d4ae-442f-8bec-b0ce9d497fd7'),
	('cb445e71-d34a-4c59-8fb4-125619e4afd8', '2026-09-22 02:46:57.011275+00', '2026-09-22 02:46:57.011275+00', 'password', '1d4c2f2e-ef4f-4d73-90c6-62a77e8353c4'),
	('9fcdb43c-1df3-41e2-8d40-743978883155', '2026-09-22 02:47:29.414917+00', '2026-09-22 02:47:29.414917+00', 'password', 'e74c9607-65ce-4eda-bfd5-5dd64460c8dd'),
	('b589ee49-b254-4126-9d41-9de289340bd4', '2026-09-22 02:47:59.899162+00', '2026-09-22 02:47:59.899162+00', 'password', '106159f0-582d-4a79-9ff9-4eb418c8c03c'),
	('cab3e198-2cec-43ec-ac26-304dad7281bb', '2026-09-22 02:55:54.007832+00', '2026-09-22 02:55:54.007832+00', 'password', 'b89ff726-d540-4e5c-b8ac-7aaa6d88c8c1'),
	('12dbc3b3-0321-41be-823b-b796cb9a576b', '2026-09-22 02:56:01.053743+00', '2026-09-22 02:56:01.053743+00', 'password', '3db5a900-4eb3-420a-b37d-0dd9096747cd'),
	('dd7b409c-d11e-4586-9623-c21b8ca8623b', '2026-09-22 02:56:33.637808+00', '2026-09-22 02:56:33.637808+00', 'password', '63a28637-4ca0-4048-90b1-20473a84fa5b'),
	('77fd9d2d-9b3d-473f-b5d1-b9a83cc6b5ec', '2026-07-01 03:06:48.782749+00', '2026-07-01 03:06:48.782749+00', 'password', 'da3a7cd3-7761-4024-9cfd-1a9d036b15fa'),
	('55848592-9e39-4b35-aba4-882a09844fcb', '2026-07-01 03:08:05.983722+00', '2026-07-01 03:08:05.983722+00', 'password', '5f4dc026-9625-476f-98f0-25b7db97df83'),
	('76e99187-8a2e-4809-becd-ae6dac8dbbba', '2026-07-01 03:39:53.475816+00', '2026-07-01 03:39:53.475816+00', 'password', 'db2e5c70-1fc3-4500-b8da-95a3e05dc28b'),
	('9ba5cc47-4fe6-4c8a-b693-9fae0a404e42', '2026-07-01 03:41:07.634355+00', '2026-07-01 03:41:07.634355+00', 'password', '9defe83b-a578-410e-9834-9f2e6d318ccf'),
	('471e7f55-e95f-45f5-8ccb-c16bfc512734', '2026-07-01 04:31:16.748908+00', '2026-07-01 04:31:16.748908+00', 'password', '19ae8697-966b-4e10-a319-6d61e777535c'),
	('0557ab8c-9727-448f-abe5-095ebf4174bd', '2026-07-01 05:04:14.889942+00', '2026-07-01 05:04:14.889942+00', 'password', 'd883d2b3-6412-45bc-a61f-7a9d586f19f4'),
	('9606b875-7746-4d01-968f-e432e583b8ae', '2026-07-01 08:18:24.063405+00', '2026-07-01 08:18:24.063405+00', 'password', 'ae528982-3c4e-4ec3-b655-cec713f4fdb8'),
	('3b28f895-54ff-484f-9335-74d46721722e', '2026-07-01 08:28:55.334091+00', '2026-07-01 08:28:55.334091+00', 'password', '20baebc7-b7cc-46d4-b5b2-74568f263c5b'),
	('0c79bffe-afde-4631-92e0-c7f34b257c1e', '2026-07-01 13:32:45.605545+00', '2026-07-01 13:32:45.605545+00', 'password', 'b1a82c7a-c60b-4d37-9943-ca856959fa4b'),
	('6fa48f16-6f6c-41b0-af41-627f2efc24f2', '2026-07-01 14:55:17.313001+00', '2026-07-01 14:55:17.313001+00', 'password', 'd3ae39b5-5b36-41de-8ce3-df016d629b45'),
	('dc1bd8ab-64b0-4a64-8375-df7889152dd9', '2026-07-01 19:50:45.939993+00', '2026-07-01 19:50:45.939993+00', 'password', 'f927a9f3-d318-4cbf-940a-b9ef11173011'),
	('2e36ab6e-f04c-4c26-8842-65a340b5232b', '2026-09-08 02:04:51.233914+00', '2026-09-08 02:04:51.233914+00', 'password', '63ca9c67-2583-4a07-bf93-56667af27896'),
	('5c205ab9-5b99-4149-9f4d-65c01ca52e9c', '2026-09-22 16:11:35.32951+00', '2026-09-22 16:11:35.32951+00', 'password', '70160174-d0bb-403d-a46e-bdf343c08b63'),
	('7bf76703-569e-463c-a50a-1621391701d4', '2026-09-22 16:38:23.938872+00', '2026-09-22 16:38:23.938872+00', 'password', 'd94754fc-d9d7-4c98-991a-9c9799651a23'),
	('8f02d685-db9f-47af-a071-9f54029413d9', '2026-07-01 21:03:14.046206+00', '2026-07-01 21:03:14.046206+00', 'password', '6a3f0e8a-439d-4ac3-8e4d-daef7065e199'),
	('4822af12-e217-460e-9bb2-daf329fb8c06', '2026-07-01 21:25:29.64415+00', '2026-07-01 21:25:29.64415+00', 'password', '3db033e3-30f5-4ecb-b789-1a465febfc9b'),
	('4c31a24f-f9a7-4690-8a13-31ba4ecc0f1c', '2026-09-16 21:01:09.478129+00', '2026-09-16 21:01:09.478129+00', 'otp', '1988af16-4728-4137-8a2d-c421817cd3e2'),
	('d8636ec1-b9cd-4ad9-9eca-607d64009b0b', '2026-07-03 02:20:21.882226+00', '2026-07-03 02:20:21.882226+00', 'password', 'fb069f25-c2aa-48aa-97a2-bc8882dc4e97'),
	('01eb02fa-d672-4da7-99a2-0972f970733f', '2026-07-03 03:38:42.716423+00', '2026-07-03 03:38:42.716423+00', 'password', '028a3471-e9a1-4b2d-8cab-763616d6ceea'),
	('9c5c1388-68c0-4b45-b555-6b9aa8208f88', '2026-07-03 04:24:03.554426+00', '2026-07-03 04:24:03.554426+00', 'password', 'fe804961-ebd5-4c8f-b05c-2fdd13037d91'),
	('2f409b1f-6462-4b3d-a91f-5100722f4fd6', '2026-07-03 05:19:26.654056+00', '2026-07-03 05:19:26.654056+00', 'password', '5fdbb4e3-af69-4566-868e-200124f7f5fb'),
	('0257d1f3-1c1d-4d92-866e-ddd184e5b495', '2026-07-03 06:30:48.283543+00', '2026-07-03 06:30:48.283543+00', 'password', '83217f3b-9a5d-4039-af31-44a180e36375'),
	('24e4dd66-40cf-466f-9449-f1dae645d8b7', '2026-07-03 18:49:02.013672+00', '2026-07-03 18:49:02.013672+00', 'password', '122ce1a2-5082-4690-908d-93c39953540d'),
	('c6e0d6b5-58bc-4873-bb13-c2df8fcac826', '2026-09-16 21:49:52.121052+00', '2026-09-16 21:49:52.121052+00', 'password', '6b64fd88-cf07-481b-a171-84ba08184825'),
	('64f6cc23-c037-4a64-a856-412af162691a', '2026-07-03 19:09:47.555653+00', '2026-07-03 19:09:47.555653+00', 'password', 'fe76a5e2-d3e3-45f3-b707-c170c50d30d1'),
	('9dc2c254-5fda-4df3-b09e-27d159a668c2', '2026-07-03 19:36:50.954563+00', '2026-07-03 19:36:50.954563+00', 'password', 'af121ca5-fcde-4887-981a-c191efc1d6c1'),
	('1837f728-5340-43d4-8eba-922357d05976', '2026-09-16 21:51:48.001421+00', '2026-09-16 21:51:48.001421+00', 'password', 'acd4b5c9-a4d2-4087-aa40-a3949bd6775f'),
	('09c8e3e3-f2c2-4821-8a8f-900e5f77e754', '2026-07-03 20:22:30.194066+00', '2026-07-03 20:22:30.194066+00', 'password', 'db93ba92-7141-47f1-9ec1-53e479d6166a'),
	('bd93d092-df29-4637-ab77-33277e0e923c', '2026-07-03 21:06:45.937683+00', '2026-07-03 21:06:45.937683+00', 'password', '48969d92-793a-453c-b3d3-16d6769a94f9'),
	('b8e41429-b21c-472d-9ac0-3437ae59e837', '2026-07-03 21:37:10.242226+00', '2026-07-03 21:37:10.242226+00', 'password', '3cb5a77e-696f-409b-b6de-a67169b798e3'),
	('338f7987-aba8-42f4-9b05-38697620f15c', '2026-07-03 21:57:21.73394+00', '2026-07-03 21:57:21.73394+00', 'password', 'dec2abe1-1bd6-417f-82c5-983a35c89762'),
	('7cee9f53-17b2-4780-b77e-a3c069a542df', '2026-07-03 21:59:15.322356+00', '2026-07-03 21:59:15.322356+00', 'password', '8dc9c786-43e0-4c42-b2e2-d948ec1c7b00'),
	('f28dfd9b-c765-4128-ae24-e380e4d099ae', '2026-09-16 21:53:30.263665+00', '2026-09-16 21:53:30.263665+00', 'password', '69a6d865-892c-46d2-ac24-8b9eb49b313f'),
	('165c5965-dc5f-4ec0-b65f-bb78163added', '2026-07-03 22:12:26.506289+00', '2026-07-03 22:12:26.506289+00', 'password', 'a9ef405a-2537-401f-be9e-d73132d20840'),
	('a5d27d2a-9030-4d04-a364-e3bbb159c223', '2026-09-16 22:05:13.616478+00', '2026-09-16 22:05:13.616478+00', 'password', '8dbfc67c-8c8c-4e29-9a29-3a3f1379f910'),
	('e7598d60-2e41-4292-bfa3-e44cf38d7f0a', '2026-09-22 19:45:21.761853+00', '2026-09-22 19:45:21.761853+00', 'password', '45656aeb-6b6c-42bc-a3a3-185c8010f394'),
	('70cd4b05-d23e-4c20-aa6a-3d14fa441158', '2026-07-08 02:27:04.088567+00', '2026-07-08 02:27:04.088567+00', 'password', '286f88dc-d59c-4f56-a416-0647bb732b6e'),
	('f0a8441d-1c29-4a40-b9ea-5fb2e152748b', '2026-09-22 20:03:33.333334+00', '2026-09-22 20:03:33.333334+00', 'password', '4dfcf91e-8c28-48f3-be8c-4af62639a1ee'),
	('90b3ece4-e55c-4d58-afaa-bdd73a966bf1', '2026-09-22 20:21:18.181267+00', '2026-09-22 20:21:18.181267+00', 'password', '4dc50adc-16de-4015-ab87-617f32383c7e'),
	('d172b79e-a458-4f49-b6fe-0ed7edb2e10c', '2026-09-17 20:25:02.190463+00', '2026-09-17 20:25:02.190463+00', 'password', '9f155b32-31ff-489a-8214-e45b63abade4'),
	('1a7fb80a-39ec-449a-b51d-b8f361de41e1', '2026-09-21 19:45:03.766956+00', '2026-09-21 19:45:03.766956+00', 'password', '1dda4c92-79b1-4ebc-b845-3e7b01551eb9'),
	('3e88d383-410c-47c5-897f-40f92e6427e0', '2026-09-21 19:45:15.592539+00', '2026-09-21 19:45:15.592539+00', 'password', 'ef64f89b-0315-4eba-9024-b87357f65fbe'),
	('2d13857c-3b7b-4813-b2c8-2b403cedac80', '2026-09-21 19:45:16.931538+00', '2026-09-21 19:45:16.931538+00', 'password', '09136153-1620-42f3-8ffd-cea04ccb0030'),
	('5aae5ae8-19a5-4f0f-b99b-1ab4d40fa69e', '2026-07-14 02:25:54.513859+00', '2026-07-14 02:25:54.513859+00', 'password', 'd3396a10-75ec-4e24-9bf5-d3edd3b610de'),
	('c931c145-ff8a-4627-8f49-e7e8bf5e2fde', '2026-07-14 03:24:05.837063+00', '2026-07-14 03:24:05.837063+00', 'password', 'dba32b14-2c08-4956-81b9-8a95be9cc0a2'),
	('9d57d883-b891-41c9-bcff-85aeda9c3aaa', '2026-07-14 03:51:07.477516+00', '2026-07-14 03:51:07.477516+00', 'password', '518acb29-81d6-4143-8fd6-b5c0943a0a20'),
	('a084e4fb-5571-483a-bb09-8eac9bc654d0', '2026-07-14 05:22:04.229175+00', '2026-07-14 05:22:04.229175+00', 'password', '6cf5f189-353b-4099-9cf3-c2bede315e3c'),
	('60f9528b-148b-4da9-b28f-7cfd4e975f58', '2026-07-14 05:43:46.981236+00', '2026-07-14 05:43:46.981236+00', 'password', '7b603a75-4247-4a52-9b1b-a836e0d1f58c'),
	('7dc98bf6-eedc-41bc-a48a-6df07a96d9e5', '2026-07-14 05:56:43.72077+00', '2026-07-14 05:56:43.72077+00', 'password', 'c83ac15d-0a55-4051-83ae-e49fc5168976'),
	('81f14246-629c-4e10-bb6d-c3d8a91b8b79', '2026-07-14 05:57:32.584523+00', '2026-07-14 05:57:32.584523+00', 'password', '4ee2f1e4-065e-4d7c-818b-35987d0f8f52'),
	('14bbeb26-541d-4640-b2f2-bf2793096c4c', '2026-09-22 00:48:25.757406+00', '2026-09-22 00:48:25.757406+00', 'password', '147ef9ef-0bcc-4d7e-ae90-acaa8cf050d8'),
	('25ee3fdb-a1b3-4dc9-ac3d-cc7bab223511', '2026-09-22 01:51:26.387858+00', '2026-09-22 01:51:26.387858+00', 'password', '58dbc137-1265-42f9-aa8d-caaca4823366'),
	('dc597087-08de-46f4-8211-22687cef4fb2', '2026-09-22 02:15:34.691166+00', '2026-09-22 02:15:34.691166+00', 'password', 'bff5305b-f0d8-451d-970b-ba3e80afdb4c'),
	('9cdc6fd0-8ec4-413e-abf6-50e916a955f9', '2026-09-22 02:24:54.692033+00', '2026-09-22 02:24:54.692033+00', 'password', '475c945f-fa7c-4e43-887b-579d0f3b2eb8'),
	('173472d3-b0b1-44e2-b54d-7f0132fd5882', '2026-09-22 02:25:14.575513+00', '2026-09-22 02:25:14.575513+00', 'password', 'eaf2e51d-ef7d-4d79-b2cd-a3a331240646'),
	('f024a101-69e8-49ec-ae34-2735b5a3a6ed', '2026-09-22 02:37:07.056285+00', '2026-09-22 02:37:07.056285+00', 'password', 'c2d88696-271e-4e79-a0bd-27f90ca5c398'),
	('c9c4455b-7291-4c8e-84e0-d092c72ec6bd', '2026-09-22 02:37:30.099939+00', '2026-09-22 02:37:30.099939+00', 'password', '659316d8-1339-4399-8ce1-825e5389903b'),
	('257b1f62-8bb1-4eac-a562-1b9fe16fe965', '2026-09-22 02:43:07.300671+00', '2026-09-22 02:43:07.300671+00', 'password', '3ca3a5d1-76ec-4cb5-b97f-fecef22ff8d4'),
	('13e7f644-2125-4b52-9ef6-2f4678745c4f', '2026-09-22 02:43:34.542007+00', '2026-09-22 02:43:34.542007+00', 'password', '398e6a33-dee8-49c3-8b02-046d1aac228f'),
	('371aa2fe-757b-4b60-b8c4-e477a4d8a76e', '2026-09-22 02:50:33.607165+00', '2026-09-22 02:50:33.607165+00', 'password', 'e85326ef-8ef1-4184-9b2f-9866c1d7063d'),
	('1e897f69-ed87-4c4a-95a2-aca0b57087c7', '2026-09-22 02:50:57.470696+00', '2026-09-22 02:50:57.470696+00', 'password', 'bb468c14-9d5c-41db-bbda-862909d41b06'),
	('0937cb46-18c6-4cea-b269-8a062f40d1d2', '2026-09-22 02:57:53.131262+00', '2026-09-22 02:57:53.131262+00', 'password', 'a2e6c6eb-d6dd-4f22-9340-01d45144f4f4');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_recovery_code_sets; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_recovery_codes; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at", "expires_at") VALUES
	('fb542b2e-ac64-41f9-a4b5-fc5e17bc546f', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', 'recovery_token', '788c28b1e9b3f00da55c87ce4d73b734e5cf59a22f0dba7131e47690', 'cliente3@gmail.com', '2026-06-16 02:07:33.531178', '2026-06-16 02:07:33.531178', NULL);


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 3, 'gp2u3eiq5bab', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-03 21:58:23.794101+00', '2026-06-03 21:58:23.794101+00', NULL, '072f7117-9441-46c1-8b82-55fc58aa18fa'),
	('00000000-0000-0000-0000-000000000000', 4, '7b3zf6tqi3kt', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-04 03:01:23.715179+00', '2026-06-04 03:01:23.715179+00', NULL, 'ae7d94ca-9e24-447f-9781-0b1f36e622dd'),
	('00000000-0000-0000-0000-000000000000', 5, 'lv6uaptxto6l', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-04 05:02:04.173728+00', '2026-06-04 05:02:04.173728+00', NULL, '9435e1d7-29b9-40d6-9988-d0c3f5166694'),
	('00000000-0000-0000-0000-000000000000', 441, 'rrm2ckqia42o', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:26:36.683633+00', '2026-09-22 02:26:36.683633+00', NULL, '41728fba-0d12-42c0-ad75-b9223318049b'),
	('00000000-0000-0000-0000-000000000000', 6, 'mxsvim5cnjmi', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', true, '2026-06-05 03:39:41.001283+00', '2026-06-05 04:45:00.589557+00', NULL, 'b19566ca-e512-49de-9434-1f701aff98bf'),
	('00000000-0000-0000-0000-000000000000', 7, 'mert6ydvgbxf', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-05 04:45:00.596703+00', '2026-06-05 04:45:00.596703+00', 'mxsvim5cnjmi', 'b19566ca-e512-49de-9434-1f701aff98bf'),
	('00000000-0000-0000-0000-000000000000', 450, '3z2jyt7vkl54', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:45:31.000598+00', '2026-09-22 02:45:31.000598+00', NULL, '44abe878-09b0-4099-83d1-e9c21336f4d0'),
	('00000000-0000-0000-0000-000000000000', 461, 'q2pc7sszifrk', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 03:02:28.918842+00', '2026-09-22 03:02:28.918842+00', NULL, '9bea0e16-20a0-407a-abd4-ba1d10b67a83'),
	('00000000-0000-0000-0000-000000000000', 10, 'qj6ckgbxwlmh', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-05 20:47:10.068603+00', '2026-06-05 20:47:10.068603+00', NULL, 'a456198c-9481-494a-953b-afd6011ffa00'),
	('00000000-0000-0000-0000-000000000000', 11, 'tvy46tiw7oxo', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-05 21:55:39.768402+00', '2026-06-05 21:55:39.768402+00', NULL, '27092ffa-eec5-4972-b054-9749afa85ffa'),
	('00000000-0000-0000-0000-000000000000', 462, 'c2znq4js4dqb', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 03:03:12.995245+00', '2026-09-22 03:03:12.995245+00', NULL, '444e3d6e-f104-4fca-8e38-ac7ef1596f45'),
	('00000000-0000-0000-0000-000000000000', 12, 'vqe2hw4sbfjt', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', true, '2026-06-07 01:56:07.351849+00', '2026-06-07 02:54:32.974494+00', NULL, '25d4fc8e-3de7-420e-a98f-2fbc48283b4f'),
	('00000000-0000-0000-0000-000000000000', 463, 'wwjgm2xn42tu', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 03:03:27.033462+00', '2026-09-22 03:03:27.033462+00', NULL, '53d31fd8-0dc4-4a6a-965d-c26125b1eb16'),
	('00000000-0000-0000-0000-000000000000', 13, 'uwdmqfu3bmht', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', true, '2026-06-07 02:54:32.986995+00', '2026-06-07 03:52:55.697445+00', 'vqe2hw4sbfjt', '25d4fc8e-3de7-420e-a98f-2fbc48283b4f'),
	('00000000-0000-0000-0000-000000000000', 14, 'xz7z64b5wrty', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', true, '2026-06-07 03:52:55.706522+00', '2026-06-07 04:50:56.465056+00', 'uwdmqfu3bmht', '25d4fc8e-3de7-420e-a98f-2fbc48283b4f'),
	('00000000-0000-0000-0000-000000000000', 15, '3jibvar4jmg5', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-07 04:50:56.472332+00', '2026-06-07 04:50:56.472332+00', 'xz7z64b5wrty', '25d4fc8e-3de7-420e-a98f-2fbc48283b4f'),
	('00000000-0000-0000-0000-000000000000', 16, '4gqty76jwxxz', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-08 01:38:40.633279+00', '2026-06-08 01:38:40.633279+00', NULL, 'b61676e8-1978-4453-ae2b-2f5b5c73d211'),
	('00000000-0000-0000-0000-000000000000', 17, '2d3ol4faxdi6', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-08 02:50:59.286269+00', '2026-06-08 02:50:59.286269+00', NULL, '3ec49594-b800-4812-ae44-1eae11f8ae17'),
	('00000000-0000-0000-0000-000000000000', 18, 'lmd44n3y34sh', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-09 01:08:38.975311+00', '2026-06-09 01:08:38.975311+00', NULL, '72d1494c-f8d0-42d6-9841-464514b021ee'),
	('00000000-0000-0000-0000-000000000000', 19, 'kr5qaehrr5et', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-09 01:22:58.739777+00', '2026-06-09 01:22:58.739777+00', NULL, 'e21a1240-f1b9-4d53-aa43-23ee33699338'),
	('00000000-0000-0000-0000-000000000000', 20, 'fe2bw2lmdmez', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-09 03:25:55.590947+00', '2026-06-09 03:25:55.590947+00', NULL, 'b3532012-e453-4930-9192-23e910088c15'),
	('00000000-0000-0000-0000-000000000000', 21, '33mew5dnsy2n', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-09 03:26:35.098038+00', '2026-06-09 03:26:35.098038+00', NULL, 'd83602f3-95fb-445e-b77f-46bd120e689e'),
	('00000000-0000-0000-0000-000000000000', 22, 'fbbhd6fwa6tb', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-09 04:13:47.419382+00', '2026-06-09 04:13:47.419382+00', NULL, '61b0ca77-3101-4749-a35d-19111584a763'),
	('00000000-0000-0000-0000-000000000000', 23, 'qiwj76isyrsk', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-09 20:31:34.492796+00', '2026-06-09 20:31:34.492796+00', NULL, '8a583c6e-3054-4763-9d2a-eb4d45fa7e10'),
	('00000000-0000-0000-0000-000000000000', 24, 'limujriovo2q', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-09 20:32:53.696295+00', '2026-06-09 20:32:53.696295+00', NULL, 'ed8e34e6-0d18-47f2-a88d-feadb7be2d47'),
	('00000000-0000-0000-0000-000000000000', 25, '4o4kratnmnlf', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-09 22:00:42.862234+00', '2026-06-09 22:00:42.862234+00', NULL, '9da4d876-a3d3-43b4-b50a-9f541612cb93'),
	('00000000-0000-0000-0000-000000000000', 26, 'pnaujqhzdisd', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-09 22:17:14.653199+00', '2026-06-09 22:17:14.653199+00', NULL, '75715ce6-6852-4c66-8f9e-17d03b9ceb40'),
	('00000000-0000-0000-0000-000000000000', 27, 'jeif6jjjhn7m', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-10 19:45:10.942944+00', '2026-06-10 19:45:10.942944+00', NULL, '9717f149-84aa-4bd6-9bd8-5eb4b946714b'),
	('00000000-0000-0000-0000-000000000000', 28, 'jzceklirmeml', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-10 19:45:31.285687+00', '2026-06-10 19:45:31.285687+00', NULL, '9e27b4b9-eb70-49f5-bf6a-fe5925c3aeee'),
	('00000000-0000-0000-0000-000000000000', 29, 'rvsvlftjnt2h', '2185299f-e8f7-4c64-8530-8c17f3ec747b', false, '2026-06-10 20:28:20.235079+00', '2026-06-10 20:28:20.235079+00', NULL, '53ff428c-a2f8-45f7-927f-8ea7436fde83'),
	('00000000-0000-0000-0000-000000000000', 30, 'i64og3zc3fxi', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-10 20:32:23.784895+00', '2026-06-10 20:32:23.784895+00', NULL, '9b2d3963-5ca6-4cdf-9a7b-69609a640041'),
	('00000000-0000-0000-0000-000000000000', 31, 'kxf3jrbq3xnw', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-10 22:01:26.07357+00', '2026-06-10 22:01:26.07357+00', NULL, '558143c7-8146-4f2d-a441-1707f80f1935'),
	('00000000-0000-0000-0000-000000000000', 360, 'w4yvuc7kc6lh', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 21:01:09.461092+00', '2026-09-16 21:01:09.461092+00', NULL, '4c31a24f-f9a7-4690-8a13-31ba4ecc0f1c'),
	('00000000-0000-0000-0000-000000000000', 32, 'vsndg4265pfl', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', true, '2026-06-11 20:04:08.50116+00', '2026-06-11 21:38:44.425577+00', NULL, 'e7500256-1908-4440-af98-9c2ddbe72580'),
	('00000000-0000-0000-0000-000000000000', 33, 'c3xw3sf4ngrd', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-11 21:38:44.429742+00', '2026-06-11 21:38:44.429742+00', 'vsndg4265pfl', 'e7500256-1908-4440-af98-9c2ddbe72580'),
	('00000000-0000-0000-0000-000000000000', 34, 'uju37qg6j36w', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-11 21:46:13.116941+00', '2026-06-11 21:46:13.116941+00', NULL, '43f5040b-c264-4882-9a59-16579818234d'),
	('00000000-0000-0000-0000-000000000000', 35, 'c5irdebvt6jt', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-12 00:09:57.470365+00', '2026-06-12 00:09:57.470365+00', NULL, '9d83b8d3-6525-4922-a72e-a09655ad9e3c'),
	('00000000-0000-0000-0000-000000000000', 36, 'gjyk57p42vcv', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-12 01:02:03.676253+00', '2026-06-12 01:02:03.676253+00', NULL, '39153b69-5bb0-4740-9d4c-41189cbcacf4'),
	('00000000-0000-0000-0000-000000000000', 37, '6wo2c425j6nx', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-12 01:22:45.494645+00', '2026-06-12 01:22:45.494645+00', NULL, '503e8baa-c534-4558-a24f-ef9a6e14a4da'),
	('00000000-0000-0000-0000-000000000000', 369, 'ql7yyn7blthw', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 22:05:13.608923+00', '2026-09-16 22:05:13.608923+00', NULL, 'a5d27d2a-9030-4d04-a364-e3bbb159c223'),
	('00000000-0000-0000-0000-000000000000', 481, 'rfqx7vi6frkj', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 16:11:35.309174+00', '2026-09-22 16:11:35.309174+00', NULL, '5c205ab9-5b99-4149-9f4d-65c01ca52e9c'),
	('00000000-0000-0000-0000-000000000000', 401, 'v5digpxjkr7w', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-17 22:13:11.176716+00', '2026-09-17 22:13:11.176716+00', NULL, 'cde52396-202d-4c0b-8f59-b83bb8e8ce5e'),
	('00000000-0000-0000-0000-000000000000', 42, 'jmxon5ild45w', 'ac87d52c-d943-4f71-862e-7da9972f483e', false, '2026-06-12 05:27:44.792325+00', '2026-06-12 05:27:44.792325+00', NULL, '912491ac-4bb9-41a1-b5d9-5980ce8ed981'),
	('00000000-0000-0000-0000-000000000000', 43, 'ifdriu33anoy', 'ac87d52c-d943-4f71-862e-7da9972f483e', false, '2026-06-12 05:29:22.831943+00', '2026-06-12 05:29:22.831943+00', NULL, 'a235b3c9-37c5-4e20-9c0a-126a897eb946'),
	('00000000-0000-0000-0000-000000000000', 44, 'hj3bfxzhgj37', 'ac87d52c-d943-4f71-862e-7da9972f483e', false, '2026-06-12 05:31:40.009459+00', '2026-06-12 05:31:40.009459+00', NULL, 'e67d8cb2-14af-4bd9-b386-6ba6e9a696f0'),
	('00000000-0000-0000-0000-000000000000', 45, '7h5brgd2biar', 'ac87d52c-d943-4f71-862e-7da9972f483e', false, '2026-06-12 05:40:31.266957+00', '2026-06-12 05:40:31.266957+00', NULL, 'db270814-30ad-4255-83cf-165aeee2a73a'),
	('00000000-0000-0000-0000-000000000000', 46, '4ywcjo64zzuh', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-12 07:10:15.53604+00', '2026-06-12 07:10:15.53604+00', NULL, 'ea345117-dc1f-40d9-8315-ef5cce5701d5'),
	('00000000-0000-0000-0000-000000000000', 510, 'fexhruyyou2d', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-22 19:45:21.738977+00', '2026-09-22 19:45:21.738977+00', NULL, 'e7598d60-2e41-4292-bfa3-e44cf38d7f0a'),
	('00000000-0000-0000-0000-000000000000', 413, 'abx4zft7qsr4', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-21 19:45:03.761551+00', '2026-09-21 19:45:03.761551+00', NULL, '1a7fb80a-39ec-449a-b51d-b8f361de41e1'),
	('00000000-0000-0000-0000-000000000000', 414, '25wt4kbfz2nj', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-21 19:45:15.591079+00', '2026-09-21 19:45:15.591079+00', NULL, '3e88d383-410c-47c5-897f-40f92e6427e0'),
	('00000000-0000-0000-0000-000000000000', 415, '6vnv4abe66n7', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-21 19:45:16.93004+00', '2026-09-21 19:45:16.93004+00', NULL, '2d13857c-3b7b-4813-b2c8-2b403cedac80'),
	('00000000-0000-0000-0000-000000000000', 517, '52w34m7w4agw', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 20:19:12.693676+00', '2026-09-22 20:19:12.693676+00', NULL, 'f6acafff-0be6-4767-ad45-752a2a29bbd6'),
	('00000000-0000-0000-0000-000000000000', 423, '6qakacot3wt3', '684e5a46-6c9a-4ad8-af36-bbc79288f761', false, '2026-09-21 21:35:28.962697+00', '2026-09-21 21:35:28.962697+00', NULL, '0fa361a9-3b3f-4f90-a423-90e0a1634141'),
	('00000000-0000-0000-0000-000000000000', 50, '7aq372yylyiz', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-12 20:48:50.583946+00', '2026-06-12 20:48:50.583946+00', NULL, '1faee9ea-229e-436c-bc50-3597b88b4091'),
	('00000000-0000-0000-0000-000000000000', 51, 'mf4ttscicuwf', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-12 20:49:03.875777+00', '2026-06-12 20:49:03.875777+00', NULL, 'e3343038-4930-4103-b622-8f403b1f74b0'),
	('00000000-0000-0000-0000-000000000000', 429, 'v5fcv5sojvxm', '0b7375ce-96d9-4406-b261-add20a435547', false, '2026-09-22 02:13:21.131984+00', '2026-09-22 02:13:21.131984+00', NULL, '02fcfa95-75ee-422d-8d87-f90eed7380d1'),
	('00000000-0000-0000-0000-000000000000', 442, 'di3rwww647ki', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:35:51.128311+00', '2026-09-22 02:35:51.128311+00', NULL, 'c5692a7f-8ed8-44e8-bcab-ba31a2c05a65'),
	('00000000-0000-0000-0000-000000000000', 54, 'i6nmocnpijr4', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-14 04:17:41.325399+00', '2026-06-14 04:17:41.325399+00', NULL, 'eee67efb-f20b-4d9b-a147-b30070407457'),
	('00000000-0000-0000-0000-000000000000', 55, '4sbf42ynmqav', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-14 05:09:14.680147+00', '2026-06-14 05:09:14.680147+00', NULL, '64826cb0-0d1e-4342-8bf0-1defa3c03bca'),
	('00000000-0000-0000-0000-000000000000', 451, 'y3vkrbvyepx2', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:46:57.008347+00', '2026-09-22 02:46:57.008347+00', NULL, 'cb445e71-d34a-4c59-8fb4-125619e4afd8'),
	('00000000-0000-0000-0000-000000000000', 452, 'lucqa6obdcef', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:47:29.412812+00', '2026-09-22 02:47:29.412812+00', NULL, '9fcdb43c-1df3-41e2-8d40-743978883155'),
	('00000000-0000-0000-0000-000000000000', 58, 'o4ruplusskbr', '2a40859f-f54e-46eb-aab0-aa27258c138f', false, '2026-06-14 21:43:59.873014+00', '2026-06-14 21:43:59.873014+00', NULL, 'b3bbce3d-26a3-4693-a330-5106e011c6f2'),
	('00000000-0000-0000-0000-000000000000', 453, 'ttvjosvunuzw', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:47:59.892666+00', '2026-09-22 02:47:59.892666+00', NULL, 'b589ee49-b254-4126-9d41-9de289340bd4'),
	('00000000-0000-0000-0000-000000000000', 62, 'vbil5c73hr4k', 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', false, '2026-06-14 23:25:02.908238+00', '2026-06-14 23:25:02.908238+00', NULL, '73009d51-bd7e-44d4-8f31-99e8531406e6'),
	('00000000-0000-0000-0000-000000000000', 370, 'jasfkgwhsy2j', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 22:18:14.404977+00', '2026-09-16 22:18:14.404977+00', NULL, '12e498d7-c2be-4948-874e-886558f4ee7f'),
	('00000000-0000-0000-0000-000000000000', 64, 'h7zc6kktvpci', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-14 23:36:03.859328+00', '2026-06-14 23:36:03.859328+00', NULL, 'dfbfe25c-9235-48f1-a271-9f248f8abbad'),
	('00000000-0000-0000-0000-000000000000', 65, 'uwcxc7cbxdro', '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', false, '2026-06-15 00:29:57.888095+00', '2026-06-15 00:29:57.888095+00', NULL, 'f580669d-8e09-479b-971f-46b17b7ed40b'),
	('00000000-0000-0000-0000-000000000000', 371, 'qczbuh6y2lrs', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 22:18:40.575409+00', '2026-09-16 22:18:40.575409+00', NULL, '4b4a0024-6257-460b-bb8c-df14feda8306'),
	('00000000-0000-0000-0000-000000000000', 372, 'qjlyosb63ivg', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 22:19:01.995645+00', '2026-09-16 22:19:01.995645+00', NULL, '1f9431a0-d3c4-4b97-b18d-d20bef50d5f8'),
	('00000000-0000-0000-0000-000000000000', 68, 'nj2bcys426lm', '2a40859f-f54e-46eb-aab0-aa27258c138f', false, '2026-06-15 03:13:20.548167+00', '2026-06-15 03:13:20.548167+00', NULL, 'f6f25ded-c307-4a8b-bb3c-e10c149458c9'),
	('00000000-0000-0000-0000-000000000000', 482, 'f6ibjcszgz5r', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 16:14:37.755617+00', '2026-09-22 16:14:37.755617+00', NULL, '9e37bb33-cebe-4cd3-b0d1-75a145662757'),
	('00000000-0000-0000-0000-000000000000', 483, 'eaabi34oxv3y', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 16:15:16.301689+00', '2026-09-22 16:15:16.301689+00', NULL, '8c13eb42-5061-406c-9f5a-c61f9f1380c9'),
	('00000000-0000-0000-0000-000000000000', 484, 'qt47ipzza5tl', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 16:15:51.309333+00', '2026-09-22 16:15:51.309333+00', NULL, '8410bc98-8439-4eec-9c43-d4d4a3b86450'),
	('00000000-0000-0000-0000-000000000000', 485, 'izawvlvy5zno', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 16:16:12.737085+00', '2026-09-22 16:16:12.737085+00', NULL, '7734449a-8ef4-44e3-91e3-cd1ed5ca4996'),
	('00000000-0000-0000-0000-000000000000', 486, 'pmskjsfcxn27', '1cbf28ce-6f02-421b-90ea-85aa7541b264', false, '2026-09-22 16:16:57.895796+00', '2026-09-22 16:16:57.895796+00', NULL, 'c94d4640-f1c0-4f5c-a5a8-2508c59ab3b8'),
	('00000000-0000-0000-0000-000000000000', 416, 'hvl5rko7udgp', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-21 19:46:22.250703+00', '2026-09-21 19:46:22.250703+00', NULL, 'a7ce5236-cd31-4e36-966a-ddb13713006e'),
	('00000000-0000-0000-0000-000000000000', 512, '7ptgtjkj7h2n', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-22 20:01:26.950104+00', '2026-09-22 20:01:26.950104+00', NULL, '3a734a37-e936-4ab2-b698-f91a675a1c97'),
	('00000000-0000-0000-0000-000000000000', 518, '2uwkzewx3a46', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', true, '2026-09-22 20:21:18.176533+00', '2026-10-07 13:51:16.49256+00', NULL, '90b3ece4-e55c-4d58-afaa-bdd73a966bf1'),
	('00000000-0000-0000-0000-000000000000', 519, 'ublbe6lntdig', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-10-07 13:51:16.506613+00', '2026-10-07 13:51:16.506613+00', '2uwkzewx3a46', '90b3ece4-e55c-4d58-afaa-bdd73a966bf1'),
	('00000000-0000-0000-0000-000000000000', 96, 'hr4nzypskkb6', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 04:52:37.722235+00', '2026-06-16 04:52:37.722235+00', NULL, '033a9d1e-f669-42d3-8192-df58211c502e'),
	('00000000-0000-0000-0000-000000000000', 97, 'ynkgoxjtlzfj', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 05:18:47.95064+00', '2026-06-16 05:18:47.95064+00', NULL, 'dae2d5d5-04ce-40ce-95a4-e64046c7cdb8'),
	('00000000-0000-0000-0000-000000000000', 99, 'g4cdnfms47lq', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 05:21:25.57813+00', '2026-06-16 05:21:25.57813+00', NULL, '9bde81c9-3049-4ca5-b83c-bac156a5c870'),
	('00000000-0000-0000-0000-000000000000', 100, 'ixo2ng6datdz', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 05:57:04.195787+00', '2026-06-16 05:57:04.195787+00', NULL, '387261d5-d020-4b3d-947f-58bf102c2847'),
	('00000000-0000-0000-0000-000000000000', 102, 'vf3et7f5aftb', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 06:27:22.448715+00', '2026-06-16 06:27:22.448715+00', NULL, 'd842af1a-b173-406b-87e1-a8c8044d3557'),
	('00000000-0000-0000-0000-000000000000', 424, 'ugergcvx2axy', '684e5a46-6c9a-4ad8-af36-bbc79288f761', false, '2026-09-22 00:48:25.725491+00', '2026-09-22 00:48:25.725491+00', NULL, '14bbeb26-541d-4640-b2f2-bf2793096c4c'),
	('00000000-0000-0000-0000-000000000000', 104, 'efwhxsvhigkj', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 06:31:16.98106+00', '2026-06-16 06:31:16.98106+00', NULL, 'dbe961df-7668-4b0e-a4f6-ea2b2e03f2fb'),
	('00000000-0000-0000-0000-000000000000', 430, '4vggjnms7x2a', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:15:34.686533+00', '2026-09-22 02:15:34.686533+00', NULL, 'dc597087-08de-46f4-8211-22687cef4fb2'),
	('00000000-0000-0000-0000-000000000000', 106, 'u74upd3jz4fj', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 07:16:08.153948+00', '2026-06-16 07:16:08.153948+00', NULL, 'a2555d7a-522d-40bd-88bd-92952b5e2e06'),
	('00000000-0000-0000-0000-000000000000', 443, 'acqnw5en2nmh', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:37:07.053057+00', '2026-09-22 02:37:07.053057+00', NULL, 'f024a101-69e8-49ec-ae34-2735b5a3a6ed'),
	('00000000-0000-0000-0000-000000000000', 444, 'scpntyl65ppr', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:37:30.098458+00', '2026-09-22 02:37:30.098458+00', NULL, 'c9c4455b-7291-4c8e-84e0-d092c72ec6bd'),
	('00000000-0000-0000-0000-000000000000', 109, 'ok5s54hgjqlc', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 07:58:46.584396+00', '2026-06-16 07:58:46.584396+00', NULL, 'ce896df7-143b-459d-bd0f-009cd88d7bd7'),
	('00000000-0000-0000-0000-000000000000', 454, 'ljhxadxr7pgb', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:50:33.597379+00', '2026-09-22 02:50:33.597379+00', NULL, '371aa2fe-757b-4b60-b8c4-e477a4d8a76e'),
	('00000000-0000-0000-0000-000000000000', 111, '6x7mqnsmlti4', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-16 08:28:22.625256+00', '2026-06-16 08:28:22.625256+00', NULL, '50f82dbe-a4dd-49cb-9d17-8af401433851'),
	('00000000-0000-0000-0000-000000000000', 455, 'qwmp4fsxytib', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:50:57.469222+00', '2026-09-22 02:50:57.469222+00', NULL, '1e897f69-ed87-4c4a-95a2-aca0b57087c7'),
	('00000000-0000-0000-0000-000000000000', 113, 'lzo7mmlnoyfz', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-19 03:07:51.139114+00', '2026-06-19 03:07:51.139114+00', NULL, '578af184-06ed-4222-87d0-f4583f4f02b6'),
	('00000000-0000-0000-0000-000000000000', 114, '7qgvejxh3nfj', '54645d6a-3d1b-404e-ab84-87d74859c708', true, '2026-06-19 03:39:21.557983+00', '2026-06-19 04:37:37.778213+00', NULL, 'e1dd9432-b942-4d7a-a446-50a30435ab99'),
	('00000000-0000-0000-0000-000000000000', 115, 'nspghxfx5yvn', '54645d6a-3d1b-404e-ab84-87d74859c708', true, '2026-06-19 04:37:37.78428+00', '2026-06-19 05:35:39.21815+00', '7qgvejxh3nfj', 'e1dd9432-b942-4d7a-a446-50a30435ab99'),
	('00000000-0000-0000-0000-000000000000', 116, '7ptdnpomh4a3', '54645d6a-3d1b-404e-ab84-87d74859c708', false, '2026-06-19 05:35:39.222996+00', '2026-06-19 05:35:39.222996+00', 'nspghxfx5yvn', 'e1dd9432-b942-4d7a-a446-50a30435ab99'),
	('00000000-0000-0000-0000-000000000000', 291, '4ljnlry2xgoe', 'c9d19e19-e43a-4952-b8df-819d769e3210', true, '2026-08-02 02:26:54.776434+00', '2026-08-02 03:25:01.916488+00', NULL, 'e60521cd-fa21-4811-b693-e73221d6d4d2'),
	('00000000-0000-0000-0000-000000000000', 362, 'abfzdvvykszs', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 21:46:12.570745+00', '2026-09-16 21:46:12.570745+00', NULL, 'a1da1ac9-136d-4d9e-a212-183bd73f1c8d'),
	('00000000-0000-0000-0000-000000000000', 119, 'mnhw5szn2mou', '5b32eb78-0b0e-43a4-9930-be2f07d13849', true, '2026-06-24 04:36:22.172813+00', '2026-06-24 05:34:28.409075+00', NULL, '0cbf41c4-326a-445f-8d5e-bc3b2287fe72'),
	('00000000-0000-0000-0000-000000000000', 120, 'hhaipzn3kpv2', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-24 05:34:28.420341+00', '2026-06-24 05:34:28.420341+00', 'mnhw5szn2mou', '0cbf41c4-326a-445f-8d5e-bc3b2287fe72'),
	('00000000-0000-0000-0000-000000000000', 121, '42jyntxruxyv', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-24 05:50:43.885043+00', '2026-06-24 05:50:43.885043+00', NULL, 'edf3a54b-3bfc-49d0-8be9-d1dcd38c6e35'),
	('00000000-0000-0000-0000-000000000000', 373, 'xz2swdkq45ax', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 22:21:57.021346+00', '2026-09-16 22:21:57.021346+00', NULL, 'dab26c02-f9e6-4747-9e3f-16f4a7b2ba0a'),
	('00000000-0000-0000-0000-000000000000', 374, 'rlm7omobzfkf', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 22:22:18.313782+00', '2026-09-16 22:22:18.313782+00', NULL, 'a5e19bf8-9d59-4a3d-b77d-ebf1969f139d'),
	('00000000-0000-0000-0000-000000000000', 124, 'ck2xwn2ktasd', '5b32eb78-0b0e-43a4-9930-be2f07d13849', true, '2026-06-24 19:39:40.964558+00', '2026-06-24 20:37:53.042837+00', NULL, '4fb9ad5e-636d-4bd5-8dbc-945af0d60014'),
	('00000000-0000-0000-0000-000000000000', 125, 'osqdxpu3qms4', '5b32eb78-0b0e-43a4-9930-be2f07d13849', true, '2026-06-24 20:37:53.050597+00', '2026-06-24 21:45:48.139164+00', 'ck2xwn2ktasd', '4fb9ad5e-636d-4bd5-8dbc-945af0d60014'),
	('00000000-0000-0000-0000-000000000000', 126, 'wyc5oocuxbca', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-24 21:45:48.145289+00', '2026-06-24 21:45:48.145289+00', 'osqdxpu3qms4', '4fb9ad5e-636d-4bd5-8dbc-945af0d60014'),
	('00000000-0000-0000-0000-000000000000', 128, 'ih7yu4wp4g2f', '5b32eb78-0b0e-43a4-9930-be2f07d13849', true, '2026-06-25 04:00:07.284187+00', '2026-06-25 04:58:15.462313+00', NULL, '550c77da-856b-4fe0-a6ae-9d3d64803ce0'),
	('00000000-0000-0000-0000-000000000000', 129, 'evv3srrpec3p', '5b32eb78-0b0e-43a4-9930-be2f07d13849', true, '2026-06-25 04:58:15.467255+00', '2026-06-25 06:04:05.343432+00', 'ih7yu4wp4g2f', '550c77da-856b-4fe0-a6ae-9d3d64803ce0'),
	('00000000-0000-0000-0000-000000000000', 130, 'l24f6x2zmimk', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-25 06:04:05.350781+00', '2026-06-25 06:04:05.350781+00', 'evv3srrpec3p', '550c77da-856b-4fe0-a6ae-9d3d64803ce0'),
	('00000000-0000-0000-0000-000000000000', 131, 'hcfo7zzkmeao', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-25 06:13:39.887057+00', '2026-06-25 06:13:39.887057+00', NULL, '4f23745f-1767-4751-bfcb-014afe757465'),
	('00000000-0000-0000-0000-000000000000', 132, 'lkrdmindyswq', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-25 06:20:08.721049+00', '2026-06-25 06:20:08.721049+00', NULL, 'ad31465a-2785-47d4-a245-a7f884cd5cab'),
	('00000000-0000-0000-0000-000000000000', 133, 'r4p2tfvje4aq', 'f7b79f48-c3df-485e-b929-d7c09f18919c', false, '2026-06-25 06:48:26.097522+00', '2026-06-25 06:48:26.097522+00', NULL, '8efed52d-6a1f-4447-94ca-3ff68331ce32'),
	('00000000-0000-0000-0000-000000000000', 134, 'vr4lpdtfaddx', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-25 06:53:07.302418+00', '2026-06-25 06:53:07.302418+00', NULL, '110e8e0e-2d20-47e0-9024-c690da2312fc'),
	('00000000-0000-0000-0000-000000000000', 136, 'myusv5b6i4bl', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-26 04:33:49.1686+00', '2026-06-26 04:33:49.1686+00', NULL, '7060150a-9043-4641-b456-a57f02944d79'),
	('00000000-0000-0000-0000-000000000000', 417, 'vggp76myqxl6', '684e5a46-6c9a-4ad8-af36-bbc79288f761', false, '2026-09-21 19:54:53.756757+00', '2026-09-21 19:54:53.756757+00', NULL, '770471b3-df5c-4fbd-8413-420672d052d5'),
	('00000000-0000-0000-0000-000000000000', 138, 'kpyq6eabe7co', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-26 16:58:22.251695+00', '2026-06-26 16:58:22.251695+00', NULL, 'f59dca84-8a17-45e8-9343-aa6f70cdb05e'),
	('00000000-0000-0000-0000-000000000000', 139, 'ntdln5v42rgq', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-26 19:45:23.660471+00', '2026-06-26 19:45:23.660471+00', NULL, '6c316c50-228a-4011-b5ec-2a6b68797e0b'),
	('00000000-0000-0000-0000-000000000000', 418, 'bkhcrgvu4nmj', '684e5a46-6c9a-4ad8-af36-bbc79288f761', false, '2026-09-21 19:55:18.31353+00', '2026-09-21 19:55:18.31353+00', NULL, 'c59cce30-5c05-4b66-b9b2-ea7a15d51d0a'),
	('00000000-0000-0000-0000-000000000000', 511, '47442gmtamai', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-22 20:01:26.950194+00', '2026-09-22 20:01:26.950194+00', NULL, '2dc14c09-24fc-4f5e-83d1-cd513dee9a46'),
	('00000000-0000-0000-0000-000000000000', 513, 'epnclp47zzt7', '684e5a46-6c9a-4ad8-af36-bbc79288f761', false, '2026-09-22 20:01:47.180066+00', '2026-09-22 20:01:47.180066+00', NULL, '7b0e2495-7d97-4c59-9bd0-f6aee146b2bf'),
	('00000000-0000-0000-0000-000000000000', 145, '6zbvqkzg4pph', '5b32eb78-0b0e-43a4-9930-be2f07d13849', false, '2026-06-29 02:35:14.329321+00', '2026-06-29 02:35:14.329321+00', NULL, 'bd4decca-2cc2-46db-b2fd-5d2a8cc43e02'),
	('00000000-0000-0000-0000-000000000000', 431, 'hdfdkgbck6v5', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:17:14.725129+00', '2026-09-22 02:17:14.725129+00', NULL, 'b079c45f-640c-4bb9-9373-0b840f04b201'),
	('00000000-0000-0000-0000-000000000000', 432, 'kk43zfojpcv7', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:18:03.928352+00', '2026-09-22 02:18:03.928352+00', NULL, '01ebfb45-6886-4d45-8c0c-fc160ee753ce'),
	('00000000-0000-0000-0000-000000000000', 159, 'opaqketz2g75', 'd4afcde5-cb61-4e03-8813-574ec433d404', false, '2026-06-30 03:52:52.42859+00', '2026-06-30 03:52:52.42859+00', NULL, 'dd842b62-4403-44d2-88e8-e312e357de96'),
	('00000000-0000-0000-0000-000000000000', 433, '4gjexpxbq5mq', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:18:29.408258+00', '2026-09-22 02:18:29.408258+00', NULL, '3eec3b5a-def3-447e-809d-3bb7b24da3e9'),
	('00000000-0000-0000-0000-000000000000', 161, 'mq6ekzpzmqaj', '808a419d-5acf-4503-bdf3-0fb1253a134d', false, '2026-06-30 04:02:58.421618+00', '2026-06-30 04:02:58.421618+00', NULL, 'c145fc55-4c45-42b8-9c1f-c0194c4d071d'),
	('00000000-0000-0000-0000-000000000000', 445, '3wqg3rmbehy7', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:39:08.12546+00', '2026-09-22 02:39:08.12546+00', NULL, '07c988ec-ea65-4310-a99e-b5ea32d0331a'),
	('00000000-0000-0000-0000-000000000000', 163, 'u6szmg4zyv5s', '41e5290e-b250-4663-8ca4-b8f2131497dd', false, '2026-06-30 04:13:48.303914+00', '2026-06-30 04:13:48.303914+00', NULL, 'eac66f5d-1e85-442f-ad6f-4b0f4c0395b4'),
	('00000000-0000-0000-0000-000000000000', 456, 'ejonu3orl4tf', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:52:54.030173+00', '2026-09-22 02:52:54.030173+00', NULL, 'a9849a76-1670-495a-9d88-bf0b18d9e735'),
	('00000000-0000-0000-0000-000000000000', 363, 'ob7spkbpniqj', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 21:49:52.115631+00', '2026-09-16 21:49:52.115631+00', NULL, 'c6e0d6b5-58bc-4873-bb13-c2df8fcac826'),
	('00000000-0000-0000-0000-000000000000', 292, 'vgjyt4nj7eg5', 'c9d19e19-e43a-4952-b8df-819d769e3210', true, '2026-08-02 03:25:01.923275+00', '2026-08-02 04:23:25.054077+00', '4ljnlry2xgoe', 'e60521cd-fa21-4811-b693-e73221d6d4d2'),
	('00000000-0000-0000-0000-000000000000', 364, 'jpik6mcpab22', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 21:51:47.994315+00', '2026-09-16 21:51:47.994315+00', NULL, '1837f728-5340-43d4-8eba-922357d05976'),
	('00000000-0000-0000-0000-000000000000', 366, 'aurp7lljg64k', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 21:53:30.249686+00', '2026-09-16 21:53:30.249686+00', NULL, 'f28dfd9b-c765-4128-ae24-e380e4d099ae'),
	('00000000-0000-0000-0000-000000000000', 491, '4ikdszvffumq', '150db9f6-1674-4fbd-90c2-2587b14ec05a', false, '2026-09-22 16:38:23.933941+00', '2026-09-22 16:38:23.933941+00', NULL, '7bf76703-569e-463c-a50a-1621391701d4'),
	('00000000-0000-0000-0000-000000000000', 176, 'egt7n3sqqasg', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', false, '2026-06-30 21:37:34.809448+00', '2026-06-30 21:37:34.809448+00', NULL, 'ab1d8645-d790-43eb-badd-1c1bef0cf91c'),
	('00000000-0000-0000-0000-000000000000', 177, 'qvzbtpffqxwm', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', false, '2026-06-30 22:03:12.156413+00', '2026-06-30 22:03:12.156413+00', NULL, '77d157c9-6ede-466c-a421-55a8485ae31a'),
	('00000000-0000-0000-0000-000000000000', 514, 'dj2t6jovwa5x', 'c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf', false, '2026-09-22 20:03:33.327119+00', '2026-09-22 20:03:33.327119+00', NULL, 'f0a8441d-1c29-4a40-b9ea-5fb2e152748b'),
	('00000000-0000-0000-0000-000000000000', 179, 'amnhmhsxvf6m', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', false, '2026-06-30 22:12:51.375195+00', '2026-06-30 22:12:51.375195+00', NULL, '29f6b1a9-37bf-47ed-9eae-d1173e9b31c4'),
	('00000000-0000-0000-0000-000000000000', 188, 'yq5hy6bbgt75', '41e5290e-b250-4663-8ca4-b8f2131497dd', false, '2026-07-01 03:06:48.779546+00', '2026-07-01 03:06:48.779546+00', NULL, '77fd9d2d-9b3d-473f-b5d1-b9a83cc6b5ec'),
	('00000000-0000-0000-0000-000000000000', 189, 'qeu37opkfzjd', '808a419d-5acf-4503-bdf3-0fb1253a134d', false, '2026-07-01 03:08:05.980474+00', '2026-07-01 03:08:05.980474+00', NULL, '55848592-9e39-4b35-aba4-882a09844fcb'),
	('00000000-0000-0000-0000-000000000000', 191, '4grfqfp7cp6l', '41e5290e-b250-4663-8ca4-b8f2131497dd', false, '2026-07-01 03:39:53.461224+00', '2026-07-01 03:39:53.461224+00', NULL, '76e99187-8a2e-4809-becd-ae6dac8dbbba'),
	('00000000-0000-0000-0000-000000000000', 192, 'oxf26kju6haj', '808a419d-5acf-4503-bdf3-0fb1253a134d', false, '2026-07-01 03:41:07.629305+00', '2026-07-01 03:41:07.629305+00', NULL, '9ba5cc47-4fe6-4c8a-b693-9fae0a404e42'),
	('00000000-0000-0000-0000-000000000000', 196, 'vgl456zzzebn', '41e5290e-b250-4663-8ca4-b8f2131497dd', false, '2026-07-01 04:31:16.725381+00', '2026-07-01 04:31:16.725381+00', NULL, '471e7f55-e95f-45f5-8ccb-c16bfc512734'),
	('00000000-0000-0000-0000-000000000000', 197, 'vw2eletuwdqv', '808a419d-5acf-4503-bdf3-0fb1253a134d', false, '2026-07-01 05:04:14.874731+00', '2026-07-01 05:04:14.874731+00', NULL, '0557ab8c-9727-448f-abe5-095ebf4174bd'),
	('00000000-0000-0000-0000-000000000000', 198, 'fglnn67zcnko', 'e7034024-d89a-4baf-b65c-2bc9d639d163', false, '2026-07-01 08:18:24.044827+00', '2026-07-01 08:18:24.044827+00', NULL, '9606b875-7746-4d01-968f-e432e583b8ae'),
	('00000000-0000-0000-0000-000000000000', 199, 'qsxdmzym5fic', 'e7034024-d89a-4baf-b65c-2bc9d639d163', false, '2026-07-01 08:28:55.328509+00', '2026-07-01 08:28:55.328509+00', NULL, '3b28f895-54ff-484f-9335-74d46721722e'),
	('00000000-0000-0000-0000-000000000000', 200, 'xzo2j7i73vo6', 'e7034024-d89a-4baf-b65c-2bc9d639d163', false, '2026-07-01 13:32:45.58521+00', '2026-07-01 13:32:45.58521+00', NULL, '0c79bffe-afde-4631-92e0-c7f34b257c1e'),
	('00000000-0000-0000-0000-000000000000', 201, 'tiusymbadfr4', 'e7034024-d89a-4baf-b65c-2bc9d639d163', false, '2026-07-01 14:55:17.290649+00', '2026-07-01 14:55:17.290649+00', NULL, '6fa48f16-6f6c-41b0-af41-627f2efc24f2'),
	('00000000-0000-0000-0000-000000000000', 205, 'fni3wezac3av', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', false, '2026-07-01 19:50:45.933877+00', '2026-07-01 19:50:45.933877+00', NULL, 'dc1bd8ab-64b0-4a64-8375-df7889152dd9'),
	('00000000-0000-0000-0000-000000000000', 426, 'rufuwtpmne7b', '684e5a46-6c9a-4ad8-af36-bbc79288f761', false, '2026-09-22 01:47:32.771298+00', '2026-09-22 01:47:32.771298+00', NULL, 'c6d24181-01df-42a2-8dd5-452d7e427b7e'),
	('00000000-0000-0000-0000-000000000000', 434, 'bigakqw5vhdh', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:20:21.189015+00', '2026-09-22 02:20:21.189015+00', NULL, 'e6d91371-0672-4ac6-9c3a-334649206c7e'),
	('00000000-0000-0000-0000-000000000000', 210, 'obqpo2zheljr', '0badffdb-50a4-4e23-953f-639ac55ddd21', false, '2026-07-01 21:03:14.035263+00', '2026-07-01 21:03:14.035263+00', NULL, '8f02d685-db9f-47af-a071-9f54029413d9'),
	('00000000-0000-0000-0000-000000000000', 435, 'vzosumnuebi7', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:20:23.596824+00', '2026-09-22 02:20:23.596824+00', NULL, '2ee51268-c66d-4d75-a9d4-5257c7187b75'),
	('00000000-0000-0000-0000-000000000000', 212, 'ckdvyl3cwjjo', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-01 21:25:29.640397+00', '2026-07-01 21:25:29.640397+00', NULL, '4822af12-e217-460e-9bb2-daf329fb8c06'),
	('00000000-0000-0000-0000-000000000000', 436, 'alehaeocwbo3', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:20:42.948999+00', '2026-09-22 02:20:42.948999+00', NULL, 'cdda3348-2373-475c-9502-e57b253b6922'),
	('00000000-0000-0000-0000-000000000000', 437, 'njuqhtsbuzim', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:21:02.994339+00', '2026-09-22 02:21:02.994339+00', NULL, 'd50976ed-24fc-4538-b7d7-4536683e4034'),
	('00000000-0000-0000-0000-000000000000', 293, 'twopmu36fcb3', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-08-02 04:23:25.07207+00', '2026-08-02 04:23:25.07207+00', 'vgjyt4nj7eg5', 'e60521cd-fa21-4811-b693-e73221d6d4d2'),
	('00000000-0000-0000-0000-000000000000', 438, 'eji4dm7jinvh', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:21:18.628803+00', '2026-09-22 02:21:18.628803+00', NULL, 'cb07db64-d9c0-4f5f-a7fd-5fddcfce70ee'),
	('00000000-0000-0000-0000-000000000000', 217, 'zrnikrpeh4j2', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 02:20:21.878838+00', '2026-07-03 02:20:21.878838+00', NULL, 'd8636ec1-b9cd-4ad9-9eca-607d64009b0b'),
	('00000000-0000-0000-0000-000000000000', 218, 'ukgvlixmjfks', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 03:38:42.684024+00', '2026-07-03 03:38:42.684024+00', NULL, '01eb02fa-d672-4da7-99a2-0972f970733f'),
	('00000000-0000-0000-0000-000000000000', 219, 'czpkh3643hqw', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 04:24:03.543331+00', '2026-07-03 04:24:03.543331+00', NULL, '9c5c1388-68c0-4b45-b555-6b9aa8208f88'),
	('00000000-0000-0000-0000-000000000000', 220, 'ozq2vl5u5h6i', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 05:19:26.641165+00', '2026-07-03 05:19:26.641165+00', NULL, '2f409b1f-6462-4b3d-a91f-5100722f4fd6'),
	('00000000-0000-0000-0000-000000000000', 221, 'kw5pjpy7oq7j', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 06:30:48.260078+00', '2026-07-03 06:30:48.260078+00', NULL, '0257d1f3-1c1d-4d92-866e-ddd184e5b495'),
	('00000000-0000-0000-0000-000000000000', 222, 'al7donunw7ih', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 18:49:01.994794+00', '2026-07-03 18:49:01.994794+00', NULL, '24e4dd66-40cf-466f-9449-f1dae645d8b7'),
	('00000000-0000-0000-0000-000000000000', 446, 'g55g5i3qn5bi', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:41:07.98701+00', '2026-09-22 02:41:07.98701+00', NULL, '8eed1596-e7f1-4c7e-a03f-f45f22bdfa4e'),
	('00000000-0000-0000-0000-000000000000', 224, 'pa2xb63dm6nv', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 19:09:47.551117+00', '2026-07-03 19:09:47.551117+00', NULL, '64f6cc23-c037-4a64-a856-412af162691a'),
	('00000000-0000-0000-0000-000000000000', 225, '3wkw7h6r6r7r', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 19:36:50.950168+00', '2026-07-03 19:36:50.950168+00', NULL, '9dc2c254-5fda-4df3-b09e-27d159a668c2'),
	('00000000-0000-0000-0000-000000000000', 367, 'lbyu6hbi2dt6', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 21:58:35.010514+00', '2026-09-16 21:58:35.010514+00', NULL, '066dd7d5-2aa1-4457-a074-5f5a36fe3eae'),
	('00000000-0000-0000-0000-000000000000', 227, 'gonzxszus3zs', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', false, '2026-07-03 20:22:30.177038+00', '2026-07-03 20:22:30.177038+00', NULL, '09c8e3e3-f2c2-4821-8a8f-900e5f77e754'),
	('00000000-0000-0000-0000-000000000000', 228, 'hxcmkx2r7acx', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', false, '2026-07-03 21:06:45.918941+00', '2026-07-03 21:06:45.918941+00', NULL, 'bd93d092-df29-4637-ab77-33277e0e923c'),
	('00000000-0000-0000-0000-000000000000', 447, 'hemjht42zy5f', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:41:16.814743+00', '2026-09-22 02:41:16.814743+00', NULL, '5b501f15-4f53-49f1-9a3d-1c17b4668033'),
	('00000000-0000-0000-0000-000000000000', 230, 'jp4andojn2md', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 21:37:10.237698+00', '2026-07-03 21:37:10.237698+00', NULL, 'b8e41429-b21c-472d-9ac0-3437ae59e837'),
	('00000000-0000-0000-0000-000000000000', 231, 'rtsx4qb6myqd', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', false, '2026-07-03 21:57:21.728825+00', '2026-07-03 21:57:21.728825+00', NULL, '338f7987-aba8-42f4-9b05-38697620f15c'),
	('00000000-0000-0000-0000-000000000000', 232, 'laragxzlgbzv', 'b724fd53-02d8-4f18-bb9a-1c036e6515ae', false, '2026-07-03 21:59:15.317212+00', '2026-07-03 21:59:15.317212+00', NULL, '7cee9f53-17b2-4780-b77e-a3c069a542df'),
	('00000000-0000-0000-0000-000000000000', 457, 'jwvlvjfguz2g', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:55:54.00168+00', '2026-09-22 02:55:54.00168+00', NULL, 'cab3e198-2cec-43ec-ac26-304dad7281bb'),
	('00000000-0000-0000-0000-000000000000', 234, 'wwfwoejf4unt', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-03 22:12:26.499148+00', '2026-07-03 22:12:26.499148+00', NULL, '165c5965-dc5f-4ec0-b65f-bb78163added'),
	('00000000-0000-0000-0000-000000000000', 458, 't227g6y54xjg', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:56:01.050538+00', '2026-09-22 02:56:01.050538+00', NULL, '12dbc3b3-0321-41be-823b-b796cb9a576b'),
	('00000000-0000-0000-0000-000000000000', 459, 'ct2s6qdpskj5', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:56:33.636335+00', '2026-09-22 02:56:33.636335+00', NULL, 'dd7b409c-d11e-4586-9623-c21b8ca8623b'),
	('00000000-0000-0000-0000-000000000000', 237, 'b6zpfiawuojd', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', true, '2026-07-08 02:27:04.053148+00', '2026-07-08 03:25:20.324525+00', NULL, '70cd4b05-d23e-4c20-aa6a-3d14fa441158'),
	('00000000-0000-0000-0000-000000000000', 238, 's7tpzyid7eaw', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', false, '2026-07-08 03:25:20.346445+00', '2026-07-08 03:25:20.346445+00', 'b6zpfiawuojd', '70cd4b05-d23e-4c20-aa6a-3d14fa441158'),
	('00000000-0000-0000-0000-000000000000', 494, 'f44zqnir42bc', '150db9f6-1674-4fbd-90c2-2587b14ec05a', false, '2026-09-22 17:20:53.664777+00', '2026-09-22 17:20:53.664777+00', NULL, '014ce5aa-cf9d-42f4-96a5-c4c4935e2471'),
	('00000000-0000-0000-0000-000000000000', 257, 'hylz25rcze7b', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-07-14 02:25:54.496917+00', '2026-07-14 02:25:54.496917+00', NULL, '5aae5ae8-19a5-4f0f-b99b-1ab4d40fa69e'),
	('00000000-0000-0000-0000-000000000000', 258, 'srvtzjcps2ia', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-07-14 03:24:05.80741+00', '2026-07-14 03:24:05.80741+00', NULL, 'c931c145-ff8a-4627-8f49-e7e8bf5e2fde'),
	('00000000-0000-0000-0000-000000000000', 259, '473o5swgmbhv', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-07-14 03:51:07.435718+00', '2026-07-14 03:51:07.435718+00', NULL, '9d57d883-b891-41c9-bcff-85aeda9c3aaa'),
	('00000000-0000-0000-0000-000000000000', 260, 'wlhuhv47xotw', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-07-14 05:22:04.210595+00', '2026-07-14 05:22:04.210595+00', NULL, 'a084e4fb-5571-483a-bb09-8eac9bc654d0'),
	('00000000-0000-0000-0000-000000000000', 261, 'frzxaaccl3qw', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-07-14 05:43:46.966705+00', '2026-07-14 05:43:46.966705+00', NULL, '60f9528b-148b-4da9-b28f-7cfd4e975f58'),
	('00000000-0000-0000-0000-000000000000', 262, 'dthqiebsvxai', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-07-14 05:56:43.714069+00', '2026-07-14 05:56:43.714069+00', NULL, '7dc98bf6-eedc-41bc-a48a-6df07a96d9e5'),
	('00000000-0000-0000-0000-000000000000', 263, 'xjf7twizsqzp', 'c9d19e19-e43a-4952-b8df-819d769e3210', false, '2026-07-14 05:57:32.583105+00', '2026-07-14 05:57:32.583105+00', NULL, '81f14246-629c-4e10-bb6d-c3d8a91b8b79'),
	('00000000-0000-0000-0000-000000000000', 427, '2n3ru2pk4i6a', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-22 01:51:26.383978+00', '2026-09-22 01:51:26.383978+00', NULL, '25ee3fdb-a1b3-4dc9-ac3d-cc7bab223511'),
	('00000000-0000-0000-0000-000000000000', 331, 'xyd7mtvpi45f', 'b9e30ba1-6fca-4ffe-9515-250f68e0c76b', false, '2026-09-08 02:04:51.209507+00', '2026-09-08 02:04:51.209507+00', NULL, '2e36ab6e-f04c-4c26-8842-65a340b5232b'),
	('00000000-0000-0000-0000-000000000000', 439, 'uewafhpcxeoo', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:24:54.687947+00', '2026-09-22 02:24:54.687947+00', NULL, '9cdc6fd0-8ec4-413e-abf6-50e916a955f9'),
	('00000000-0000-0000-0000-000000000000', 440, '4qzvlllfu5v7', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:25:14.573991+00', '2026-09-22 02:25:14.573991+00', NULL, '173472d3-b0b1-44e2-b54d-7f0132fd5882'),
	('00000000-0000-0000-0000-000000000000', 448, 'z3igomwc2rcv', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:43:07.288209+00', '2026-09-22 02:43:07.288209+00', NULL, '257b1f62-8bb1-4eac-a562-1b9fe16fe965'),
	('00000000-0000-0000-0000-000000000000', 449, 'phujwem7e33b', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:43:34.539942+00', '2026-09-22 02:43:34.539942+00', NULL, '13e7f644-2125-4b52-9ef6-2f4678745c4f'),
	('00000000-0000-0000-0000-000000000000', 368, 't3blbq4j4w5q', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-16 22:02:29.166475+00', '2026-09-16 22:02:29.166475+00', NULL, 'ec2be270-d474-4e92-9884-5d54514af60e'),
	('00000000-0000-0000-0000-000000000000', 460, 'd5gk7pnpyszy', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 02:57:53.128493+00', '2026-09-22 02:57:53.128493+00', NULL, '0937cb46-18c6-4cea-b269-8a062f40d1d2'),
	('00000000-0000-0000-0000-000000000000', 389, '724qmhbdt3tm', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-17 20:25:02.183325+00', '2026-09-17 20:25:02.183325+00', NULL, 'd172b79e-a458-4f49-b6fe-0ed7edb2e10c'),
	('00000000-0000-0000-0000-000000000000', 508, 'odfxcu47hqpl', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 19:41:07.315726+00', '2026-09-22 19:41:07.315726+00', NULL, '4185f4f0-9288-437b-a72e-cc4697873ea9'),
	('00000000-0000-0000-0000-000000000000', 412, 'yf6z4qgajkxh', 'd5774ae1-e20b-423a-8c8f-a77a94bba742', false, '2026-09-21 19:42:24.66086+00', '2026-09-21 19:42:24.66086+00', NULL, '0b5fc738-58b9-42d8-a73e-56672ef550f4'),
	('00000000-0000-0000-0000-000000000000', 509, 'jx6k25nh2ew7', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 19:41:28.375953+00', '2026-09-22 19:41:28.375953+00', NULL, 'f690a823-2df7-4c36-8ac0-da20c3aebb58'),
	('00000000-0000-0000-0000-000000000000', 516, 'pvh5ng6uwn2y', '1a8c15ee-2646-4ee1-90d2-d25dd899154f', false, '2026-09-22 20:18:52.045232+00', '2026-09-22 20:18:52.045232+00', NULL, '61e89d63-da1a-4606-aecf-388526b6f9a3');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: scim_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: scim_users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: categoria; Type: TABLE DATA; Schema: catalogo; Owner: postgres
--

INSERT INTO "catalogo"."categoria" ("id_categoria", "nombre_categoria", "id_categoria_padre") OVERRIDING SYSTEM VALUE VALUES
	(8, 'Accesorios', NULL),
	(9, 'Anillos', 8),
	(5, 'Ropa', 8),
	(13, 'Hogar y Decoración', 3),
	(3, 'Antiguedades', 13),
	(7, 'Artesanias', 8),
	(16, 'Relojería de Época', 3),
	(14, 'Arte Esculturas y Artesanías Ancestrales', 7),
	(17, 'Curiosidades Rústicas', 7),
	(18, 'Joyeria', 8);


--
-- Data for Name: rol; Type: TABLE DATA; Schema: cliente; Owner: postgres
--

INSERT INTO "cliente"."rol" ("id_rol", "nombre_rol") OVERRIDING SYSTEM VALUE VALUES
	(1, 'SUPER_ADMIN'),
	(2, 'ADMINISTRADOR'),
	(4, 'CLIENTE'),
	(3, 'VENDEDOR');


--
-- Data for Name: tipo_documento; Type: TABLE DATA; Schema: cliente; Owner: postgres
--

INSERT INTO "cliente"."tipo_documento" ("id_tipo_documento", "sigla", "nombre_documento") OVERRIDING SYSTEM VALUE VALUES
	(1, 'CC', 'Cédula de Ciudadanía'),
	(2, 'CE', 'Cédula de Extranjería');


--
-- Data for Name: perfil; Type: TABLE DATA; Schema: cliente; Owner: postgres
--

INSERT INTO "cliente"."perfil" ("id_perfil", "id_rol", "id_tipo_documento", "numero_documento", "primer_nombre", "segundo_nombre", "primer_apellido", "segundo_apellido", "foto_perfil", "fecha_creacion", "estado_usuario") VALUES
	('b9e30ba1-6fca-4ffe-9515-250f68e0c76b', 4, 1, NULL, 'Christofer ', '', 'Morgan', '', NULL, '2026-09-08 02:04:23.843744', 'ACTIVO'),
	('7bc33740-6ded-4ae5-9469-f1713a1cd28f', 2, NULL, NULL, 'Carlos', NULL, NULL, NULL, NULL, '2026-06-03 05:03:55.977374', 'ACTIVO'),
	('084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', 4, NULL, NULL, 'Andres', NULL, NULL, NULL, NULL, '2026-06-09 01:08:00.287904', 'ACTIVO'),
	('2185299f-e8f7-4c64-8530-8c17f3ec747b', 4, NULL, NULL, 'Sara', NULL, NULL, NULL, NULL, '2026-06-10 20:27:55.532069', 'ACTIVO'),
	('d5774ae1-e20b-423a-8c8f-a77a94bba742', 4, NULL, NULL, 'Usuario', NULL, NULL, NULL, NULL, '2026-09-16 21:00:48.705931', 'ACTIVO'),
	('ac87d52c-d943-4f71-862e-7da9972f483e', 4, NULL, NULL, 'Laura', NULL, NULL, NULL, NULL, '2026-06-12 05:16:22.443467', 'INACTIVO'),
	('6ba049bb-458d-4725-b797-baf9bd73c697', 1, 1, '1012376814', 'Mariana', ' ', 'zukin', 'duarte', NULL, '2026-06-02 04:26:57.44067', 'ACTIVO'),
	('2a40859f-f54e-46eb-aab0-aa27258c138f', 4, NULL, NULL, 'kevin', NULL, NULL, NULL, NULL, '2026-06-14 21:43:30.928503', 'INACTIVO'),
	('523f2158-8ab6-4e3e-aec4-0ff94a21237a', 3, NULL, NULL, 'salome', NULL, NULL, NULL, NULL, '2026-06-15 03:15:22.334158', 'ACTIVO'),
	('54645d6a-3d1b-404e-ab84-87d74859c708', 4, NULL, NULL, 'Luis', NULL, NULL, NULL, NULL, '2026-06-16 04:52:11.243557', 'ACTIVO'),
	('7f87420e-25b0-4289-b2f2-c24c378cfd89', 4, NULL, NULL, 'camilo', NULL, NULL, NULL, NULL, '2026-06-19 20:06:47.906227', 'ACTIVO'),
	('058216a3-ad1f-4082-a17d-8e576fb7ae49', 4, NULL, NULL, 'pepe', NULL, NULL, NULL, NULL, '2026-06-24 02:39:47.413435', 'ACTIVO'),
	('280093d2-276e-49f6-849e-5e67120bbd34', 4, NULL, NULL, 'pepito', NULL, NULL, NULL, NULL, '2026-06-24 03:55:50.701088', 'ACTIVO'),
	('5b32eb78-0b0e-43a4-9930-be2f07d13849', 4, NULL, NULL, 'Diana', NULL, NULL, NULL, NULL, '2026-06-24 04:34:56.453104', 'ACTIVO'),
	('f7b79f48-c3df-485e-b929-d7c09f18919c', 4, 1, '1012674965', 'catalina', '', 'González', '', NULL, '2026-06-25 06:47:02.495122', 'ACTIVO'),
	('49c36675-554b-4d86-aeb7-bfec99c13186', 3, NULL, NULL, 'Miguel', NULL, NULL, NULL, NULL, '2026-06-30 02:54:26.824466', 'ACTIVO'),
	('ffb069f8-dbf2-4506-8768-85b95cf9ab14', 3, NULL, NULL, 'Solecito', NULL, NULL, NULL, NULL, '2026-06-03 21:57:05.571857', 'ACTIVO'),
	('d4afcde5-cb61-4e03-8813-574ec433d404', 4, NULL, NULL, 'Maria', NULL, NULL, NULL, NULL, '2026-06-30 03:52:33.333482', 'ACTIVO'),
	('ad59ce8a-28a6-4608-9446-afa6e6ac9e23', 3, NULL, NULL, 'Eduardo', NULL, NULL, NULL, NULL, '2026-06-29 03:06:38.607294', 'ACTIVO'),
	('41e5290e-b250-4663-8ca4-b8f2131497dd', 3, NULL, NULL, 'Esteban', NULL, NULL, NULL, NULL, '2026-06-30 04:13:24.285327', 'ACTIVO'),
	('808a419d-5acf-4503-bdf3-0fb1253a134d', 3, NULL, NULL, 'Lucely', NULL, NULL, NULL, NULL, '2026-06-30 04:02:44.282065', 'ACTIVO'),
	('6bcc1883-ccec-4e60-b1d8-cc1ae373f586', 4, NULL, NULL, 'Lucas', '', '', '', NULL, '2026-06-30 21:37:14.125555', 'ACTIVO'),
	('e7034024-d89a-4baf-b65c-2bc9d639d163', 4, NULL, NULL, 'Camila', NULL, NULL, NULL, NULL, '2026-07-01 08:17:58.863935', 'ACTIVO'),
	('0badffdb-50a4-4e23-953f-639ac55ddd21', 4, NULL, NULL, 'Samuel', NULL, NULL, NULL, NULL, '2026-07-01 21:02:32.955053', 'ACTIVO'),
	('dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', 4, 1, '1012376818', 'Susana', '', 'Ramirez', 'Zuleta', NULL, '2026-09-22 18:02:11.063146', 'ACTIVO'),
	('b724fd53-02d8-4f18-bb9a-1c036e6515ae', 4, NULL, NULL, 'Alejandra', 'Luna', 'Ariza', '', NULL, '2026-07-03 20:10:36.103206', 'ACTIVO'),
	('c948a629-a78a-450b-a4c5-17b15c0e2da5', 3, 1, '1012674968', 'Valentina', '', 'Cortina', 'Velez', NULL, '2026-07-01 21:25:07.868615', 'ACTIVO'),
	('a9269c80-80ea-4e3f-aa0b-587582193077', 4, NULL, NULL, 'Andres', NULL, NULL, NULL, NULL, '2026-09-22 18:53:18.17705', 'ACTIVO'),
	('489f28a8-3b68-48c3-b490-d6bb6883f3f5', 4, 1, '1012671757', 'Clara', 'Ines', 'Rico', 'Amaya', NULL, '2026-09-22 19:10:36.843216', 'ACTIVO'),
	('c9d19e19-e43a-4952-b8df-819d769e3210', 4, 1, '1000374802', 'Laura', 'Ximena', 'Cordoba', 'Lopez', NULL, '2026-07-14 02:25:21.655605', 'ACTIVO'),
	('22cf8333-51c9-414e-b7ae-cfe4176b8ced', 4, 1, '1000374800', 'Tatiana', '', 'Alvarez', 'Hurtado', NULL, '2026-07-01 19:37:52.436421', 'ACTIVO'),
	('8b49f28b-30c1-410e-83ba-43fb0e518a28', 4, 1, '1012674984', 'Luis', 'Alfredo', 'Acevedo', 'Galindo', NULL, '2026-09-22 19:17:16.584293', 'ACTIVO'),
	('c2f7cfaa-feb6-48d9-8b0a-a9c94e996faf', 4, NULL, NULL, 'Mariana ', NULL, NULL, NULL, NULL, '2026-09-22 20:03:33.235725', 'ACTIVO'),
	('fd9a7ba2-c79d-46e3-b845-3f28166529c1', 4, 1, '1234567890', 'Gabriela ', 'Maria', 'Rodriguez', 'Paez', NULL, '2026-08-28 22:43:03.668707', 'ACTIVO'),
	('77cb8fc6-95c6-4595-a944-7e8f9290de1b', 4, NULL, NULL, 'Anyela', NULL, NULL, NULL, NULL, '2026-10-08 21:05:28.39584', 'ACTIVO'),
	('12a19e47-623e-4b9f-8153-fad83e74887c', 4, 1, '1012674960', 'Santiago', '', 'Martinez', 'Ojeda', NULL, '2026-09-17 19:00:31.87198', 'ACTIVO'),
	('684e5a46-6c9a-4ad8-af36-bbc79288f761', 4, NULL, NULL, 'Usuario', NULL, NULL, NULL, NULL, '2026-09-21 19:54:53.714541', 'ACTIVO'),
	('0b7375ce-96d9-4406-b261-add20a435547', 4, NULL, NULL, 'Armando', NULL, 'Paredes', NULL, NULL, '2026-09-22 02:13:21.078052', 'ACTIVO'),
	('1a8c15ee-2646-4ee1-90d2-d25dd899154f', 2, NULL, NULL, 'Jimmy', NULL, 'Neutron', NULL, NULL, '2026-09-22 02:15:34.651449', 'ACTIVO'),
	('41b4d45e-fdf8-4578-9f7b-66788b87ae46', 3, 1, '1012674969', 'Jose ', 'Hernando', 'Vergara', 'Martinez', NULL, '2026-09-21 17:30:05.585259', 'ACTIVO'),
	('4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', 3, 1, '1012674933', 'Rene', 'Alejandro', 'Sosa', '', NULL, '2026-09-21 19:34:15.568364', 'ACTIVO'),
	('1cbf28ce-6f02-421b-90ea-85aa7541b264', 4, NULL, NULL, 'Jorge', NULL, NULL, NULL, NULL, '2026-09-22 16:16:33.288924', 'ACTIVO'),
	('150db9f6-1674-4fbd-90c2-2587b14ec05a', 3, 1, '1012671754', 'Gloria', 'Victoria', 'Campos', 'Valle', NULL, '2026-09-22 16:23:06.70063', 'ACTIVO'),
	('7ba9a100-e00e-4737-be7c-83e4bccd3ecb', 4, 1, '1140915928', 'Monica ', 'Yineth', 'Robledo', 'Meza', NULL, '2026-09-22 16:19:53.489649', 'ACTIVO');


--
-- Data for Name: negocio; Type: TABLE DATA; Schema: negocio; Owner: postgres
--

INSERT INTO "negocio"."negocio" ("id_negocio", "id_perfil", "nombre_negocio", "descripcion_negocio", "telefono_negocio", "logo", "estado_negocio", "fecha_creacion", "observacion_admin") OVERRIDING SYSTEM VALUE VALUES
	(19, 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 'cat', 'gatos', '3456785433qwdq', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/bc41f580-5f6a-434d-8bfb-645b9537c645.png', 'RECHAZADO', '2026-09-02 22:19:29.494401', 'No perteneces al Mercado de las pulgas'),
	(22, '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', 'RanaRene', 'Artículos como herramientas, Art. domésticos, Esculturas, Bronces, etc...', '3134536049', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/b0932856-e374-437d-8e6e-07243d79f8b9.PNG', 'APROBADO', '2026-09-21 19:38:09.385086', NULL),
	(25, '684e5a46-6c9a-4ad8-af36-bbc79288f761', 'prueba', '[Ropa] Ropa proo', '9634512764', NULL, 'PENDIENTE', '2026-09-22 01:48:00.973424', NULL),
	(20, '12a19e47-623e-4b9f-8153-fad83e74887c', 'Indi', 'Collares indígenas hechos a mano ', '31181804689', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/14e9546c-477a-423f-a2fb-7ea3cca29130.PNG', 'RECHAZADO', '2026-09-17 19:12:11.726045', 'Ese puesto ya fue asignado'),
	(10, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', 'Home', 'Objetos para el hogar.', '31181804689', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/3242096d-871f-4c91-b688-dae59e0e1583.PNG', 'APROBADO', '2026-06-29 04:53:59.333394', NULL),
	(11, '49c36675-554b-4d86-aeb7-bfec99c13186', 'Estamp', 'Ropa de todo tipo y camisetas estampadas con diferentes diseños. ', '3108180465', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/733f48cf-0e3f-45b5-a1ab-04307b47b4c6.PNG', 'APROBADO', '2026-06-30 02:58:37.697941', NULL),
	(12, 'd4afcde5-cb61-4e03-8813-574ec433d404', 'En tu cabeza', 'Venta de sombreros de todos los estilos.', '31481804680', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/c2faf51e-3331-4a6e-a9ed-ae36ffb7e7d7.PNG', 'APROBADO', '2026-06-30 03:55:09.239483', NULL),
	(13, '808a419d-5acf-4503-bdf3-0fb1253a134d', 'Joy-Bi', 'Joyería y Bisutería, Ropa y calzado, Artesanías y oficios', '30081804686', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/f09597f7-a564-49a3-a239-3e99f1f8fcf3.PNG', 'APROBADO', '2026-06-30 04:04:48.768769', NULL),
	(14, '41e5290e-b250-4663-8ca4-b8f2131497dd', 'Anti', 'Herramientas, Art. Militares, Art. domésticos, Libros y ediciones', '30081804681', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/e2ff279b-37eb-4a94-b20d-614d9693f333.PNG', 'APROBADO', '2026-06-30 04:15:17.160984', NULL),
	(21, '41b4d45e-fdf8-4578-9f7b-66788b87ae46', 'JoseAnti', 'Vendemos teléfonos, Objetos decorativos, Art. domésticos, Antigüedades, Juguetería', '3134536040', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/ea6aa378-3b4f-4a2b-a6ac-dbc423837a35.PNG', 'APROBADO', '2026-09-21 19:12:42.723273', NULL),
	(17, '22cf8333-51c9-414e-b7ae-cfe4176b8ced', 'Flores Tatiana ', 'Flores naturales y artificiales ', '321349193', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/f00fc6e7-b610-4105-8e93-61f2e4364867.jpg', 'RECHAZADO', '2026-07-01 19:54:50.783533', 'No cumple con lo requerido'),
	(26, '150db9f6-1674-4fbd-90c2-2587b14ec05a', 'RetroVibe', 'Venta de accesorios, antigüedades y ropa de segunda mano.', '3123223486', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/6fec1d50-7e2d-4920-aa62-d4a4875509ad.PNG', 'APROBADO', '2026-09-22 16:33:15.228357', NULL),
	(27, '489f28a8-3b68-48c3-b490-d6bb6883f3f5', 'Amarantis', 'Productos colombianos elaborados con retazos', '3132301006', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/b6f7fb92-9fd2-45d2-ab53-7c3cc76c3e6c.PNG', 'PENDIENTE', '2026-09-22 19:13:35.784342', NULL),
	(28, '8b49f28b-30c1-410e-83ba-43fb0e518a28', 'Vini', 'Venta de vinilos de todo tipo de música', '3153533511', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/logos-negocios/92e2a440-9b65-43a1-86e2-b1c9c5cc5c36.PNG', 'PENDIENTE', '2026-09-22 19:20:22.484936', NULL);


--
-- Data for Name: producto; Type: TABLE DATA; Schema: catalogo; Owner: postgres
--

INSERT INTO "catalogo"."producto" ("id_producto", "id_negocio", "id_categoria", "nombre_producto", "descripcion", "caracteristicas", "stock", "precio", "estado_producto", "imagen", "fecha_creacion") OVERRIDING SYSTEM VALUE VALUES
	(22, 22, 16, 'Reloj de Pared Antiguo', 'Un reloj de pared tradicional con una estructura de madera tallada ornamentada en la parte superior (copete). Cuenta con una esfera decorada con detalles florales y números arábigos legibles.', 'Caja y marco de madera oscura con relieves torneados en las columnas laterales.

Esfera de tono claro con motivos decorativos ornamentales en las esquinas y en el fondo.

Agujas de estilo clásico y orificios visibles para cuerda o maquinaria mecánica.

Copete superior tallado con silueta decorativa.', 3, 42000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/e3b26017-b0e1-4aa5-b40e-fe4638b06150.PNG', '2026-09-22 04:53:30.188192'),
	(23, 22, 14, 'Figurillas Precolombinas / Réplicas en Piedra o Cerámica', 'Figurillas decorativas dispuestas dentro de una caja, esculpidas con diseños antropomorfos y zoomorfos inspirados en culturas ancestrales americanas. Tienen una textura rugosa que simula piedra tallada o cerámica envejecida.', 'Representaciones de figuras humanas y chamanes con iconografía tradicional.

Tonos oscuros y grises con acabados artesanales rústicos.

Tamaño pequeño, ideales para colección, decoración o como piezas artesanales temáticas.', 1, 60000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/31edd97c-760f-4fa4-ad9d-8039a02faed0.PNG', '2026-09-22 04:55:13.484648'),
	(24, 22, 14, 'Esculturas de Madera Tallada / Máscaras Rústicas', 'Tres piezas escultóricas alargadas hechas de madera maciza, esculpidas a mano con rostros humanos estilizados, tocados o coronas texturizadas en la parte superior. Muestran vetas naturales y acabados rústicos.', 'Elaboradas en madera tallada con relieves profundos en las facciones y los tocados.

Acabado texturizado con líneas geométricas y orgánicas.

Diseños verticales pensados para exhibición decorativa en pared o superficies planas.', 1, 85000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/a69193f9-b729-4a27-a05d-c804f329bc86.PNG', '2026-09-22 04:56:30.346528'),
	(19, 21, 13, 'Radio Antiguo "Explorer"', 'Un radio receptor de estilo retro, diseñado con una carcasa compacta de plástico o baquelita oscura y una característica esfera de sintonización circular grande en el frente.', 'Dial circular frontal para la sintonización de emisoras con aguja indicadora.

Rejilla de altavoz integrada en el lateral izquierdo.

Placa con la inscripción "Explorer" y selector de banda Standard Broadcast.

Botón inferior de encendido y control de volumen.', 5, 95000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/52121044-9a23-494a-a801-de6764010acd.PNG', '2026-09-22 04:32:43.332312'),
	(16, 10, 13, 'Lampara de pie ', 'Lampara Retro de Pie color blanco marfil con pantalla acordeón estilo antiguo', 'Color: Blanco
Material Base: Metal dorado
Estado: Usado, en buen estado', 0, 50000.00, 'AGOTADO', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/9b1bb8fa-9ee6-4ae2-b20f-28a29bb68598.PNG', '2026-09-17 20:25:08.256864'),
	(8, 10, 13, 'Candelabro', 'Lámpara Candelabro Metálica Plata, estilo Antiguo para Sala o Comedor', '- Color: Plata envejecida/acabado metalizado plata
- Material: Metal / Aleación de aluminio con acabado pintura electrostática
- Medidas: 45 cm Alto x 35 cm Ancho
- Estilo: Vintage, Antiguo, Barroco, Neoclásico
- Uso: Interior - Sala, Comedor, Decoración', 6, 30000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/a75a38a4-78a6-4e18-acc6-67ab627017ef.PNG', '2026-07-01 01:47:39.387885'),
	(17, 21, 13, 'Acordeón diatónico Hohner antiguo.', 'n instrumento musical clásico de la reconocida marca Hohner, fabricado con acabados ornamentados en los marcos laterales y un fuelle tradicional de múltiples capas. Es un artículo muy cotizado por músicos y coleccionistas de instrumentos folclóricos y tradicionales.', 'Cuerpo de madera y celuloide con detalles florales decorativos impresos en los bordes.

Teclado lateral con botones blancos.

Fuelle de cartón y tela resistente con esquineros protectores metálicos.

Marca visible "HOHNER" en el panel lateral.', 2, 80000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/5746a8f7-4d5c-4d9c-9179-17b08fd8b755.PNG', '2026-09-22 04:29:00.597807'),
	(18, 21, 13, 'Teléfono Antiguo de Disco', 'Un icónico teléfono analógico de mediados del siglo XX, fabricado en baquelita o plástico negro de alta resistencia. Cuenta con el clásico sistema de marcación giratoria y un auricular ergonómico pesado.', 'Color negro brillante con acabado sólido.

Disco de marcación circular con números del 0 al 9.

Auricular de una sola pieza conectado mediante cable en espiral de tela o goma resistente.

Diseño clásico de sobremesa con base robusta.', 4, 150000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/d17eb9b1-6735-4eb6-b4f0-62d97ef7c0f9.PNG', '2026-09-22 04:31:24.690427'),
	(20, 21, 3, 'Grabadora de Cintas de Bobina Abierta', 'Un dispositivo de audio portátil de época, diseñado para la grabación y reproducción de sonido mediante carretes de cinta magnética transparente. Viene en una carcasa metálica plegable tipo maletín.', 'Sistema de doble bobina (carretes) transparente para cinta magnética.

Tapa metálica superior con ranuras de ventilación y diseño abatible.

Controles mecánicos frontales para reproducción, avance y retroceso.

Diseño compacto con asa de transporte.', 1, 35000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/ce07f1d4-f4b2-493a-a74e-db3665d15314.PNG', '2026-09-22 04:34:14.261198'),
	(21, 22, 17, 'Cucharas y Utensilios Antiguos', 'Un conjunto de utensilios de cocina antiguos, posiblemente forjados a mano en hierro, latón o peltre desgastado. Presentan pátinas de oxidación natural propias de la antigüedad y el uso prolongado.', 'Mangos largos y estilizados, algunos con diseños texturizados o trenzados.

Cucharas de diferentes tamaños y formas de concavidad (redondas y ovaladas).

Materiales metálicos pesados con signos visibles de envejecimiento y pátina rústica.', 1, 30000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/3e57e2d6-f761-44dc-86c5-9e3c8abc1c4e.PNG', '2026-09-22 04:52:07.672371'),
	(30, 26, 8, 'Llavero con Dije de Rosa', 'Un accesorio pequeño y elegante para llaves o para usar como charm decorativo en bolsos y carteras. Destaca por su diseño floral romántico y de estilo gótico-chic.', 'Anillo metálico redondo principal y gancho tipo mosquetón articulado.

Dije colgante en forma de rosa estilizada con esmalte negro brillante y bordes plateados con brillos incrustados.

Cadena corta de eslabones resistentes.', 1, 9000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/01e5395d-405b-4350-9c7d-266d3efcc25a.PNG', '2026-09-22 17:17:59.701466'),
	(31, 26, 8, 'Broche Antiguo en Forma de Búho', 'Una pieza de bisutería fina de estilo clásico y nostálgico, ideal para decorar solapas de sacos, abrigos, chales o boinas.', 'Estructura de aleación metálica con acabado dorado viejo o bronce texturizado.

Incrustaciones de pequeñas piedras brillantes (pedrería tipo strass) simulando los ojos y el plumaje.

Sistema de cierre de seguridad posterior con aguja basculante.', 1, 7000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/a40bb502-095b-4f18-bf3f-f694297a6ed5.PNG', '2026-09-22 17:19:02.23247'),
	(26, 26, 18, 'Collar Largo Estilo Étnico con Conchas y Cintas', 'Una pieza llamativa de estilo bohemio y artesanal, ideal para looks de verano o estilos vanguardistas. Combina elementos naturales como conchas marinas con apliques metálicos y texturas trenzadas.', 'Diseño de múltiples hilos que mezcla una cinta de tela negra trenzada con cadena de eslabones plateados.

Aplique colgante principal en forma de flor abstracta con detalles de concha nácar y cuentas oscuras.

Cuentas de cristal transparente, piedras semipreciosas en tonos oscuros y conchas naturales talladas.', 1, 15000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/a2cc33f1-fc18-4c0a-aabb-96379cc81caa.PNG', '2026-09-22 17:11:45.502054'),
	(28, 26, 18, 'Collar Multicapa de Cuentas Blancas, Negras y Tubos Metálicos', 'Un collar sofisticado de inspiración retro/tribal, con un contraste clásico en blanco y negro realzado por cilindros metálicos plateados con grabados ornamentales.', 'Diseño de varias hileras con cuentas circulares aplanadas (tipo disco) en tonos marfil y negro.

Tubos metálicos centrales con relieves texturizados de estilo envejecido.

Detalles colgantes en la parte inferior con formas geométricas metálicas.', 1, 16000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/a622946d-9c56-49a2-b87b-6d08d9c41620.PNG', '2026-09-22 17:14:24.169611'),
	(25, 26, 18, 'Collar con Piedras Rojas y Detalle Metálico', 'Un accesorio delicado y elegante, perfecto para dar un toque de color a un atuendo casual o formal. Cuenta con un diseño sutil distribuido a lo largo de una delgada cadena flexible.', 'Base de hilo de acero o cable revestido plateado.

Decorado con pequeñas cuentas y una pieza central cilíndrica de color rojo intenso.

Separadores metálicos texturizados con acabados en tono plateado viejo.

Cierre cilíndrico de rosca integrado.', 1, 12000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/9932f90e-d811-4434-a3fb-8295733b8c7d.PNG', '2026-09-22 17:09:54.255761'),
	(27, 26, 18, 'Collar Largo de Semillas y Cuentas Naturales', 'Un accesorio ecológico y de diseño orgánico, elaborado con semillas tinturadas y componentes naturales que evocan la artesanía tradicional colombiana.', 'Estructura basada en hilos resistentes con semillas vegetales de tonos fucsia, rosa y beige natural.

Remate inferior con un diseño colgante de borla o cascada de semillas.

Texturas suaves al tacto y acabado artesanal único en cada pieza.', 1, 16000.00, 'DISPONIBLE', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/4eabafcb-4227-4342-99c6-dcc1b9809830.PNG', '2026-09-22 17:13:26.931549'),
	(29, 26, 5, 'Set de tirantes Elásticos de Colores', 'Un accesorio de moda unisex muy versátil, ideal para dar un acento de color vibrante (como fucsia, naranja o negro) a un pantalón de estilo vintage, formal o urbano.', 'Bandas elásticas de alta resistencia con textura suave.

Herrajes metálicos ajustables de deslizamiento y pinzas o "caimanes" de sujeción firme.

Diseño en forma de "Y" en la parte posterior con triángulo de unión metálico.', 0, 20000.00, 'AGOTADO', 'https://conhkkkqfqshgafjpaes.supabase.co/storage/v1/object/public/imagenes-productos/5429b446-1dfe-4550-8e36-7f475a52c9aa.PNG', '2026-09-22 17:16:01.309651');


--
-- Data for Name: comentario; Type: TABLE DATA; Schema: catalogo; Owner: postgres
--



--
-- Data for Name: movimiento_stock; Type: TABLE DATA; Schema: catalogo; Owner: postgres
--

INSERT INTO "catalogo"."movimiento_stock" ("id_movimiento", "id_producto", "fecha_movimiento", "tipo_movimiento", "cantidad_productos", "motivo") OVERRIDING SYSTEM VALUE VALUES
	(8, 8, '2026-07-03 06:36:04.736601', 'SALIDA', 1, 'Venta #8'),
	(9, 8, '2026-07-03 06:36:06.410414', 'SALIDA', 1, 'Venta #9'),
	(11, 8, '2026-07-14 05:45:20.938163', 'SALIDA', 1, 'Venta #11'),
	(12, 8, '2026-07-14 05:59:34.251298', 'SALIDA', 2, 'Venta #12'),
	(14, 8, '2026-07-14 06:12:03.230875', 'SALIDA', 1, 'Venta #14'),
	(15, 8, '2026-07-14 06:26:19.821808', 'SALIDA', 1, 'Venta #15'),
	(17, 8, '2026-07-14 06:58:10.827327', 'SALIDA', 1, 'Venta #17'),
	(19, 8, '2026-09-02 22:29:20.984738', 'SALIDA', 1, 'Venta #19'),
	(21, 8, '2026-09-02 22:29:21.813329', 'SALIDA', 1, 'Venta #20'),
	(22, 8, '2026-09-16 22:07:03.293649', 'ENTRADA', 1, 'Actualización de stock (Ingreso de mercancía)'),
	(23, 8, '2026-09-17 20:01:09.95384', 'SALIDA', 2, 'Venta #21'),
	(24, 8, '2026-09-17 20:10:51.563788', 'SALIDA', 1, 'Venta #22'),
	(25, 8, '2026-09-17 20:19:24.408621', 'ENTRADA', 8, 'Actualización de stock (Ingreso de mercancía)'),
	(26, 16, '2026-09-17 20:25:08.491515', 'ENTRADA', 5, 'Stock inicial por creación de producto'),
	(27, 16, '2026-09-17 20:26:53.2603', 'SALIDA', 1, 'Venta #23'),
	(28, 16, '2026-09-17 20:32:36.73757', 'SALIDA', 1, 'Venta #24'),
	(29, 8, '2026-09-17 20:41:38.268611', 'SALIDA', 1, 'Venta #25'),
	(30, 16, '2026-09-17 20:41:38.843616', 'SALIDA', 1, 'Venta #25'),
	(31, 16, '2026-09-17 20:49:11.319698', 'ENTRADA', 4, 'Actualización de stock (Ingreso de mercancía)'),
	(32, 16, '2026-09-17 20:50:12.723134', 'SALIDA', 2, 'Venta #26'),
	(33, 16, '2026-09-17 20:50:13.058885', 'SALIDA', 2, 'Venta #27'),
	(34, 16, '2026-09-17 20:58:26.923564', 'ENTRADA', 4, 'Actualización de stock (Ingreso de mercancía)'),
	(35, 16, '2026-09-17 20:59:52.704566', 'SALIDA', 2, 'Venta #28'),
	(36, 16, '2026-09-17 21:09:17.082799', 'ENTRADA', 6, 'Actualización de stock (Ingreso de mercancía)'),
	(37, 16, '2026-09-17 21:11:53.595793', 'SALIDA', 4, 'Venta #29'),
	(38, 16, '2026-09-17 21:35:23.555962', 'ENTRADA', 2, 'Actualización de stock (Ingreso de mercancía)'),
	(39, 16, '2026-09-17 21:36:48.135738', 'SALIDA', 2, 'Venta #30'),
	(40, 17, '2026-09-22 04:29:00.81158', 'ENTRADA', 2, 'Stock inicial por creación de producto'),
	(41, 18, '2026-09-22 04:31:24.935049', 'ENTRADA', 4, 'Stock inicial por creación de producto'),
	(42, 19, '2026-09-22 04:32:43.530504', 'ENTRADA', 6, 'Stock inicial por creación de producto'),
	(43, 20, '2026-09-22 04:34:14.463001', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(44, 21, '2026-09-22 04:52:07.880817', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(45, 22, '2026-09-22 04:53:30.388152', 'ENTRADA', 3, 'Stock inicial por creación de producto'),
	(46, 23, '2026-09-22 04:55:13.680269', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(47, 24, '2026-09-22 04:56:30.553438', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(48, 25, '2026-09-22 17:09:54.461133', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(49, 26, '2026-09-22 17:11:45.741675', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(50, 27, '2026-09-22 17:13:27.127081', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(51, 28, '2026-09-22 17:14:24.373957', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(52, 29, '2026-09-22 17:16:01.52903', 'ENTRADA', 2, 'Stock inicial por creación de producto'),
	(53, 30, '2026-09-22 17:17:59.921204', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(54, 31, '2026-09-22 17:19:02.42265', 'ENTRADA', 1, 'Stock inicial por creación de producto'),
	(55, 19, '2026-09-22 18:04:48.189715', 'SALIDA', 2, 'Venta #31'),
	(56, 19, '2026-09-22 18:25:11.574042', 'ENTRADA', 3, 'Actualización de stock (Ingreso de mercancía)'),
	(57, 29, '2026-09-22 18:29:27.634687', 'SALIDA', 1, 'Venta #32');


--
-- Data for Name: notificacion; Type: TABLE DATA; Schema: cliente; Owner: postgres
--

INSERT INTO "cliente"."notificacion" ("id_notificacion", "id_perfil", "mensaje", "tipo", "fecha_notificacion", "estado_notificacion") OVERRIDING SYSTEM VALUE VALUES
	(1, '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-06-09 05:06:51.613473', false),
	(2, '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', 'Tu pedido ahora está en estado: ENVIADO', 'SISTEMA', '2026-06-09 05:08:07.333589', false),
	(3, '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', 'Tu pedido ahora está en estado: ENTREGADO', 'SISTEMA', '2026-06-09 05:08:21.162429', false),
	(4, '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-06-09 20:33:08.979287', false),
	(7, '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', 'Tu pedido ha sido a sido entregado', 'INFORMATIVA', '2026-06-14 23:32:38.234588', true),
	(8, '54645d6a-3d1b-404e-ab84-87d74859c708', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-06-16 08:34:32.466156', false),
	(10, '49c36675-554b-4d86-aeb7-bfec99c13186', '¡Felicitaciones! Tu solicitud de negocio fue aprobada. Ahora eres vendedor y ya puedes publicar tus productos.', 'INFORMATIVA', '2026-06-30 02:59:43.652814', false),
	(11, 'ffb069f8-dbf2-4506-8768-85b95cf9ab14', '¡Felicitaciones! Tu solicitud de negocio fue aprobada. Ahora eres vendedor y ya puedes publicar tus productos.', 'INFORMATIVA', '2026-06-30 03:40:19.390067', false),
	(12, 'd4afcde5-cb61-4e03-8813-574ec433d404', '¡Felicitaciones! Tu solicitud de negocio fue aprobada. Ahora eres vendedor y ya puedes publicar tus productos.', 'INFORMATIVA', '2026-06-30 03:56:16.689497', false),
	(13, '808a419d-5acf-4503-bdf3-0fb1253a134d', '¡Felicitaciones! Tu solicitud de negocio fue aprobada. Ahora eres vendedor y ya puedes publicar tus productos.', 'INFORMATIVA', '2026-06-30 04:05:46.63029', false),
	(14, '41e5290e-b250-4663-8ca4-b8f2131497dd', '¡Felicitaciones! Tu solicitud de negocio fue aprobada. Ahora eres vendedor y ya puedes publicar tus productos.', 'INFORMATIVA', '2026-06-30 04:16:13.859094', false),
	(15, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Felicitaciones! Tu solicitud de negocio fue aprobada. Ahora eres vendedor y ya puedes publicar tus productos.', 'INFORMATIVA', '2026-06-30 04:33:09.895386', true),
	(9, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Felicitaciones! Tu solicitud de negocio fue aprobada. Ahora eres vendedor y ya puedes publicar tus productos.', 'INFORMATIVA', '2026-06-30 01:58:19.481081', true),
	(16, '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', 'Tu solicitud de negocio fue rechazada.

Observación del administrador:
No eres vendedor del mercado de las pulgas', 'ALERTA', '2026-07-01 19:49:00.44205', false),
	(17, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '¡Felicitaciones! Tu negocio fue aprobado. Ya puedes comunicarte con el administrador para activar tu rol de vendedor.', 'INFORMATIVA', '2026-07-01 21:28:29.30176', true),
	(18, '22cf8333-51c9-414e-b7ae-cfe4176b8ced', 'Tu solicitud de negocio fue rechazada.

Observación del administrador:
No cumple con lo requerido', 'ALERTA', '2026-07-01 21:28:53.725129', true),
	(19, 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 'Tu pedido ahora está en estado: ENTREGADO', 'SISTEMA', '2026-08-30 00:56:14.765699', false),
	(20, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-08-31 00:09:31.884898', false),
	(21, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 'Tu pedido ahora está en estado: ENTREGADO', 'SISTEMA', '2026-09-02 22:33:49.403093', false),
	(22, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-09-02 22:34:12.329226', false),
	(23, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-09-07 04:40:40.16937', false),
	(24, 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-09-07 04:49:00.989145', false),
	(25, 'c9d19e19-e43a-4952-b8df-819d769e3210', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-09-07 04:59:37.973472', false),
	(26, 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 'Tu solicitud de negocio fue rechazada.

Observación del administrador:
No perteneces al Mercado de las pulgas', 'ALERTA', '2026-09-16 06:02:26.307062', false),
	(27, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 'Tu pedido ahora está en estado: ENVIADO', 'SISTEMA', '2026-09-16 20:25:02.205542', false),
	(28, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 'Tu pedido ahora está en estado: ENVIADO', 'SISTEMA', '2026-09-16 21:15:17.926602', false),
	(29, '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'Hay una nueva solicitud de negocio pendiente: "Indi".', 'SISTEMA', '2026-09-17 19:12:12.511357', false),
	(30, '6ba049bb-458d-4725-b797-baf9bd73c697', 'Hay una nueva solicitud de negocio pendiente: "Indi".', 'SISTEMA', '2026-09-17 19:12:12.511357', true),
	(31, '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'Se ha creado un nuevo PQRS que requiere atención.', 'ALERTA', '2026-09-17 19:38:39.881538', false),
	(33, '12a19e47-623e-4b9f-8153-fad83e74887c', 'Tu PQRS ha recibido una respuesta.', 'INFORMATIVA', '2026-09-17 19:44:23.011662', false),
	(34, '12a19e47-623e-4b9f-8153-fad83e74887c', '¡Tu compra #25 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-17 20:41:39.804885', false),
	(36, '12a19e47-623e-4b9f-8153-fad83e74887c', '¡Tu compra #26 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-17 20:50:13.637777', false),
	(38, '12a19e47-623e-4b9f-8153-fad83e74887c', '¡Tu compra #27 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-17 20:50:14.038341', false),
	(40, '12a19e47-623e-4b9f-8153-fad83e74887c', '¡Tu compra #28 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-17 20:59:53.451181', false),
	(41, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Has recibido una nueva venta (#28) en tu negocio!', 'ALERTA', '2026-09-17 20:59:53.451181', true),
	(39, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Has recibido una nueva venta (#27) en tu negocio!', 'ALERTA', '2026-09-17 20:50:14.038341', true),
	(37, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Has recibido una nueva venta (#26) en tu negocio!', 'ALERTA', '2026-09-17 20:50:13.637777', true),
	(35, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Has recibido una nueva venta (#25) en tu negocio!', 'ALERTA', '2026-09-17 20:41:39.804885', true),
	(42, '12a19e47-623e-4b9f-8153-fad83e74887c', '¡Tu compra #29 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-17 21:11:54.387028', false),
	(43, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Has recibido una nueva venta (#29) en tu negocio!', 'ALERTA', '2026-09-17 21:11:54.387028', true),
	(44, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '⚠️ Alerta: El producto "Lampara de pie " tiene stock bajo (Quedan 0 unidades).', 'ALERTA', '2026-09-17 21:36:48.705955', false),
	(45, '12a19e47-623e-4b9f-8153-fad83e74887c', '¡Tu compra #30 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-17 21:36:49.084463', false),
	(46, 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '¡Has recibido una nueva venta (#30) en tu negocio!', 'ALERTA', '2026-09-17 21:36:49.084463', false),
	(47, '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'Hay una nueva solicitud de negocio pendiente: "JoseAnti".', 'SISTEMA', '2026-09-21 19:12:43.517473', false),
	(49, '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'Hay una nueva solicitud de negocio pendiente: "RanaRene".', 'SISTEMA', '2026-09-21 19:38:10.196097', false),
	(51, '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '¡Felicitaciones! Tu negocio fue aprobado. Ya puedes comunicarte con el administrador para activar tu rol de vendedor.', 'INFORMATIVA', '2026-09-21 21:10:02.050363', false),
	(52, '12a19e47-623e-4b9f-8153-fad83e74887c', 'Tu solicitud de negocio fue rechazada.

Observación del administrador:
Ese puesto ya fue asignado', 'ALERTA', '2026-09-22 04:16:28.151018', false),
	(53, '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '¡Felicitaciones! Tu negocio fue aprobado. Ya puedes comunicarte con el administrador para activar tu rol de vendedor.', 'INFORMATIVA', '2026-09-22 04:17:46.378872', false),
	(54, '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'Hay una nueva solicitud de negocio pendiente: "RetroVibe".', 'SISTEMA', '2026-09-22 16:33:16.059956', false),
	(56, '1a8c15ee-2646-4ee1-90d2-d25dd899154f', 'Hay una nueva solicitud de negocio pendiente: "RetroVibe".', 'SISTEMA', '2026-09-22 16:33:16.059956', false),
	(57, '150db9f6-1674-4fbd-90c2-2587b14ec05a', '¡Felicitaciones! Tu negocio fue aprobado. Ya puedes comunicarte con el administrador para activar tu rol de vendedor.', 'INFORMATIVA', '2026-09-22 16:37:29.765342', false),
	(58, '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '⚠️ Alerta: El producto "Radio Antiguo "Explorer"" tiene stock bajo (Quedan 2 unidades).', 'ALERTA', '2026-09-22 18:04:48.772335', false),
	(59, 'dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', '¡Tu compra #31 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-22 18:04:49.158025', false),
	(48, '6ba049bb-458d-4725-b797-baf9bd73c697', 'Hay una nueva solicitud de negocio pendiente: "JoseAnti".', 'SISTEMA', '2026-09-21 19:12:43.517473', true),
	(32, '6ba049bb-458d-4725-b797-baf9bd73c697', 'Se ha creado un nuevo PQRS que requiere atención.', 'ALERTA', '2026-09-17 19:38:39.881538', true),
	(50, '6ba049bb-458d-4725-b797-baf9bd73c697', 'Hay una nueva solicitud de negocio pendiente: "RanaRene".', 'SISTEMA', '2026-09-21 19:38:10.196097', true),
	(60, '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '¡Has recibido una nueva venta (#31) en tu negocio!', 'ALERTA', '2026-09-22 18:04:49.158025', false),
	(61, 'dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', 'Tu pedido ahora está en estado: PREPARANDO', 'SISTEMA', '2026-09-22 18:24:27.953093', false),
	(62, '150db9f6-1674-4fbd-90c2-2587b14ec05a', '⚠️ Alerta: El producto "Set de tirantes Elásticos de Colores" tiene stock bajo (Quedan 0 unidades).', 'ALERTA', '2026-09-22 18:29:28.302015', false),
	(63, 'dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', '¡Tu compra #32 ha sido creada exitosamente!', 'INFORMATIVA', '2026-09-22 18:29:28.675167', false),
	(64, '150db9f6-1674-4fbd-90c2-2587b14ec05a', '¡Has recibido una nueva venta (#32) en tu negocio!', 'ALERTA', '2026-09-22 18:29:28.675167', false),
	(65, '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'Hay una nueva solicitud de negocio pendiente: "Amarantis".', 'SISTEMA', '2026-09-22 19:13:36.639665', false),
	(67, '1a8c15ee-2646-4ee1-90d2-d25dd899154f', 'Hay una nueva solicitud de negocio pendiente: "Amarantis".', 'SISTEMA', '2026-09-22 19:13:36.639665', false),
	(68, '7bc33740-6ded-4ae5-9469-f1713a1cd28f', 'Hay una nueva solicitud de negocio pendiente: "Vini".', 'SISTEMA', '2026-09-22 19:20:23.348074', false),
	(70, '1a8c15ee-2646-4ee1-90d2-d25dd899154f', 'Hay una nueva solicitud de negocio pendiente: "Vini".', 'SISTEMA', '2026-09-22 19:20:23.348074', false),
	(69, '6ba049bb-458d-4725-b797-baf9bd73c697', 'Hay una nueva solicitud de negocio pendiente: "Vini".', 'SISTEMA', '2026-09-22 19:20:23.348074', true),
	(66, '6ba049bb-458d-4725-b797-baf9bd73c697', 'Hay una nueva solicitud de negocio pendiente: "Amarantis".', 'SISTEMA', '2026-09-22 19:13:36.639665', true),
	(55, '6ba049bb-458d-4725-b797-baf9bd73c697', 'Hay una nueva solicitud de negocio pendiente: "RetroVibe".', 'SISTEMA', '2026-09-22 16:33:16.059956', true);


--
-- Data for Name: pqrs; Type: TABLE DATA; Schema: cliente; Owner: postgres
--

INSERT INTO "cliente"."pqrs" ("id_pqrs", "id_perfil", "fecha_pqrs", "mensaje_pqrs", "respuesta_pqrs") OVERRIDING SYSTEM VALUE VALUES
	(1, '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-15 00:37:17.1326', 'El producto llegó con una pieza faltante.', 'Hemos revisado tu caso y te enviaremos la pieza faltante.'),
	(3, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-08 03:06:02.926826', 'La pagina carga muy lento ', NULL),
	(2, '084e3bc7-d4c2-4d9d-beaf-bf3184c5dfab', '2026-06-15 00:39:15.650197', 'La pagina esta lenta.', 'Estamos trabajando en eso.'),
	(4, '12a19e47-623e-4b9f-8153-fad83e74887c', '2026-09-17 19:38:39.268798', 'Mande un registro de mi negocio, necesito una respuesta los más pronto posible.', 'Estamos en revisión de su registro.');


--
-- Data for Name: medio_pago; Type: TABLE DATA; Schema: negocio; Owner: postgres
--

INSERT INTO "negocio"."medio_pago" ("id_medio_pago", "id_negocio", "nombre_medio", "numero_medio", "llave_medio") OVERRIDING SYSTEM VALUE VALUES
	(8, 10, 'Nequi', '31181804689', '31181804689'),
	(10, 26, 'Nequi', '3123223486', '3123223486'),
	(11, 22, 'Daviplata', '3134536049', '3134536049'),
	(12, 21, 'Nequi', '3134536040', '3134536040');


--
-- Data for Name: metodo_envio; Type: TABLE DATA; Schema: negocio; Owner: postgres
--

INSERT INTO "negocio"."metodo_envio" ("id_metodo_envio", "id_negocio", "nombre_metodo", "descripcion_metodo", "costo_envio") OVERRIDING SYSTEM VALUE VALUES
	(5, 10, 'Domicilio en Bogotá', 'Entrega a la puerta de tu casa u oficina en Bogotá y alrededores. ', 10500.00),
	(6, 26, 'Inter Rapidísimo', 'Servicio logístico de amplia cobertura, ideal para despachar tus prendas, accesorios y joyas de segunda mano de forma ágil y protegida hasta la puerta del cliente.', 6000.00),
	(7, 22, 'Servientrega', 'Amplia cobertura, con entregas estándar eficientes que aseguran la trazabilidad completa del paquete desde la recolección hasta la puerta del cliente.', 8000.00),
	(8, 21, 'Inter Rapidísimo', 'Servicio logístico de alta calidad y amplia cobertura, diseñado para despachar cualquier tipo de producto de forma ágil, segura y protegida directamente hasta la puerta del cliente.', 7000.00);


--
-- Data for Name: puesto; Type: TABLE DATA; Schema: negocio; Owner: postgres
--

INSERT INTO "negocio"."puesto" ("id_puesto", "id_negocio", "numero_puesto") OVERRIDING SYSTEM VALUE VALUES
	(7, 10, '84'),
	(8, 11, '62'),
	(9, 12, '157'),
	(10, 13, '160'),
	(11, 14, '146'),
	(14, 17, '34'),
	(16, 19, '2'),
	(18, 21, '113'),
	(19, 22, '19'),
	(20, 26, '224'),
	(21, 27, '42'),
	(22, 28, '87');


--
-- Data for Name: negocios; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: perfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."perfiles" ("id", "nombre", "es_administrador", "es_superadmin") VALUES
	('41b4d45e-fdf8-4578-9f7b-66788b87ae46', NULL, false, false),
	('4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', NULL, false, false),
	('684e5a46-6c9a-4ad8-af36-bbc79288f761', NULL, false, false);


--
-- Data for Name: puestos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."puestos" ("id", "numero", "x", "y", "ancho", "alto", "color", "estado", "created_at") VALUES
	(7461, '101', 711, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7460, '100', 669, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7459, '99', 627, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7432, '72', 459, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7554, '168', 870, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7555, '193', 912, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7556, '192', 912, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7557, '191', 912, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7558, '190', 912, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7559, '189', 912, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7560, '202', 992, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7614, '23', 1624, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7615, '22', 1624, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7616, '21', 1624, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7617, '20', 1624, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7618, '19', 1624, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7619, '18', 1624, 486, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7620, '17', 1624, 518, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7697, '255', 1150, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7698, '283', 1230, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7699, '284', 1230, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7700, '285', 1230, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7701, '286', 1230, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7702, '287', 1230, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7561, '203', 992, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7562, '204', 992, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7563, '205', 992, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7564, '206', 992, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7565, '231', 1034, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7566, '230', 1034, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7567, '229', 1034, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7568, '228', 1034, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7569, '227', 1034, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7703, '288', 1230, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7704, '289', 1230, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7705, '290', 1230, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7706, '291', 1230, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7687, '254', 1108, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7688, '264', 1150, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7677, '217', 1028, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7678, '245', 1108, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7679, '246', 1108, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7680, '247', 1108, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7681, '248', 1108, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7682, '249', 1108, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7683, '250', 1108, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7684, '251', 1108, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7685, '252', 1108, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7686, '253', 1108, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7689, '263', 1150, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7690, '262', 1150, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7691, '261', 1150, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7692, '260', 1150, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7693, '259', 1150, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7694, '258', 1150, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7695, '257', 1150, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7696, '256', 1150, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7659, '208', 986, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7660, '209', 986, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7661, '210', 986, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7662, '211', 986, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7663, '212', 986, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7664, '213', 986, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7665, '214', 986, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7666, '215', 986, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7462, '114', 207, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7463, '113', 249, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7464, '112', 291, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7465, '111', 333, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7466, '110', 375, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7467, '109', 417, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7468, '108', 459, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7469, '107', 501, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7470, '106', 543, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7471, '105', 585, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7472, '104', 627, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7473, '103', 669, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7474, '102', 711, 466, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7475, '116', 291, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7476, '117', 333, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7477, '118', 375, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7478, '119', 417, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7479, '120', 459, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7480, '121', 501, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7481, '122', 543, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7482, '123', 585, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7483, '124', 627, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7484, '125', 669, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7485, '126', 711, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7486, '137', 291, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7487, '136', 333, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7488, '135', 375, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7489, '134', 417, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7490, '133', 459, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7491, '132', 501, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7492, '131', 543, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7493, '130', 585, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7494, '129', 627, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7495, '128', 669, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7496, '127', 711, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7497, '139', 207, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7498, '140', 249, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7499, '142', 291, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7608, '347', 1522, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7609, '346', 1522, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7610, '345', 1522, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7611, '344', 1522, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7612, '343', 1522, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7613, '342', 1522, 486, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7667, '216', 986, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7668, '226', 1028, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7669, '225', 1028, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7670, '224', 1028, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7671, '223', 1028, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7672, '222', 1028, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7673, '221', 1028, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7674, '220', 1028, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7675, '219', 1028, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7676, '218', 1028, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7500, '143', 333, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7501, '144', 375, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7502, '145', 417, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7503, '146', 459, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7430, '70', 375, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7431, '71', 417, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7570, '240', 1114, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7571, '241', 1114, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7572, '242', 1114, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7573, '243', 1114, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7574, '244', 1114, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7575, '269', 1156, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7576, '268', 1156, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7577, '267', 1156, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7578, '266', 1156, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7579, '265', 1156, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7580, '278', 1236, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7581, '279', 1236, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7582, '280', 1236, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7583, '281', 1236, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7584, '282', 1236, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7585, '307', 1278, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7586, '306', 1278, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7587, '305', 1278, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7588, '304', 1278, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7589, '303', 1278, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7590, '316', 1358, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7591, '317', 1358, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7592, '318', 1358, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7593, '319', 1358, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7594, '320', 1358, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7595, '321', 1358, 486, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7596, '327', 1400, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7597, '326', 1400, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7598, '325', 1400, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7599, '324', 1400, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7600, '323', 1400, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7601, '322', 1400, 486, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7602, '336', 1480, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7603, '337', 1480, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7604, '338', 1480, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7605, '339', 1480, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7606, '340', 1480, 454, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7607, '341', 1480, 486, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7458, '98', 585, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7457, '97', 543, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7456, '96', 501, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7707, '292', 1230, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7708, '302', 1272, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7709, '301', 1272, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7710, '300', 1272, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7711, '299', 1272, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7712, '298', 1272, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7713, '297', 1272, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7714, '296', 1272, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7715, '295', 1272, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7716, '294', 1272, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7717, '293', 1272, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7455, '95', 459, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7454, '94', 417, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7453, '93', 375, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7452, '92', 333, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7451, '91', 291, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7378, '46A', 746, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7379, '46', 788, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7380, '45', 830, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7381, '44', 872, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7382, '43', 914, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7383, '42', 956, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7384, '41', 998, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7385, '40', 1040, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7386, '39', 1082, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7387, '38', 1124, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7388, '37', 1166, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7389, '36', 1208, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7390, '35', 1250, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7391, '34', 1292, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7392, '33', 1334, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7393, '32', 1376, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7394, '31', 1418, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7395, '30', 1460, 70, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7396, '47', 746, 102, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7397, '48', 746, 134, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7398, '49', 746, 166, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7399, '50', 746, 198, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7400, '51', 746, 230, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7401, '52', 746, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7420, '53', 704, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7419, '54', 662, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7418, '55', 620, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7417, '56', 578, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7416, '57', 536, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7415, '58', 494, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7414, '59', 452, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7413, '60', 410, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7412, '61', 368, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7411, '62', 326, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7410, '63', 284, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7409, '64', 242, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7408, '65', 200, 262, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7421, '66', 200, 294, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7422, '67', 200, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7423, '88', 200, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7424, '89', 200, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7425, '115', 207, 498, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7426, '138', 207, 530, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7427, '141', 207, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7428, '68', 291, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7429, '69', 333, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7450, '90', 249, 434, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7433, '73', 501, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7434, '73b', 543, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7435, '74', 585, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7436, '75', 627, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7437, '76', 669, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7438, '77', 711, 334, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7439, '87', 291, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7440, '86', 333, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7441, '85', 375, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7442, '84b', 417, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7443, '84', 459, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7444, '83', 501, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7445, '82', 543, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7446, '81', 585, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7447, '80', 627, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7448, '79', 669, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7449, '78', 711, 366, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7504, '147', 501, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7505, '148', 543, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7506, '149', 585, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7507, '150', 627, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7510, '160', 870, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7511, '161', 870, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7512, '162', 870, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7513, '163', 870, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7514, '197', 912, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7515, '196', 912, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7516, '195', 912, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7517, '194', 912, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7550, '164', 870, 326, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7551, '165', 870, 358, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7552, '166', 870, 390, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7553, '167', 870, 422, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7518, '198', 992, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7519, '199', 992, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7520, '200', 992, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7521, '201', 992, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7522, '235', 1034, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7523, '234', 1034, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7524, '233', 1034, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7525, '232', 1034, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7526, '236', 1114, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7527, '237', 1114, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7528, '238', 1114, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7529, '239', 1114, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7530, '273', 1156, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7531, '272', 1156, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7532, '271', 1156, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7533, '270', 1156, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7534, '274', 1236, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7535, '275', 1236, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7536, '276', 1236, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7537, '277', 1236, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7538, '311', 1278, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7539, '310', 1278, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7540, '309', 1278, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7541, '308', 1278, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7542, '312', 1358, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7543, '313', 1358, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7544, '314', 1358, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7545, '315', 1358, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7546, '331', 1400, 155, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7547, '330', 1400, 187, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7548, '329', 1400, 219, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7549, '328', 1400, 251, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7508, '151', 669, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7509, '152', 711, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7638, '169', 864, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7639, '170', 864, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7621, '11', 1370, 554, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7622, '12', 1412, 554, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7623, '13', 1454, 554, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7624, '14', 1496, 554, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7625, '15', 1538, 554, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7626, '16', 1580, 554, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7627, 'B', 1622, 554, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7628, '10', 1370, 586, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7629, '9', 1370, 618, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7630, '8', 1370, 650, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7631, '7', 1370, 682, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7632, '6', 1370, 714, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7633, '5', 1370, 746, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7634, '4', 1370, 778, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7635, '3', 1370, 810, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7640, '171', 864, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7641, '172', 864, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7642, '173', 864, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7643, '174', 864, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7644, '175', 864, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7645, '176', 864, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7646, '177', 864, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7647, '178', 864, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7648, '188', 906, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7649, '187', 906, 594, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7650, '186', 906, 626, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7637, '1', 1365, 907, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7636, '2', 1365, 875, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7729, '332', 1230, 946, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7730, '333', 1272, 946, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7731, '334', 1314, 946, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7732, '335', 1356, 946, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7725, '351', 960, 920, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7726, '350', 1002, 920, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7651, '185', 906, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7652, '184', 906, 690, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7653, '183', 906, 722, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7654, '182', 906, 754, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7655, '181', 906, 786, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7656, '180', 906, 818, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7657, '179', 906, 850, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7658, '207', 986, 562, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7402, '29', 1500, 110, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7403, '28', 1500, 142, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7404, '27', 1500, 174, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7405, '26', 1500, 206, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7406, '25', 1500, 238, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7407, '24', 1550, 238, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7727, '349', 1044, 920, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7728, '348', 1086, 920, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7722, '157', 751, 886, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7723, '158', 791, 886, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7724, '159', 831, 916, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7733, '352', 831, 948, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7718, '153', 711, 658, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7719, '154', 711, 792, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7720, '155', 711, 824, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00'),
	(7721, '156', 711, 856, 40, 30, '#FFFFFF', 'disponible', '2026-09-20 20:58:41.883954+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type", "versioning_status", "lifecycle_configuration", "lifecycle_configuration_generation") VALUES
	('logos-negocios', 'logos-negocios', NULL, '2026-06-26 02:10:51.317526+00', '2026-06-26 02:10:51.317526+00', true, false, NULL, NULL, NULL, 'STANDARD', 'DISABLED', NULL, NULL),
	('imagenes-productos', 'imagenes-productos', NULL, '2026-06-30 23:37:09.245208+00', '2026-06-30 23:37:09.245208+00', true, false, NULL, NULL, NULL, 'STANDARD', 'DISABLED', NULL, NULL);


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "archived_at", "is_delete_marker", "is_versioned") VALUES
	('f753cde2-f3a3-4046-9c4e-fc66b4fbd1dc', 'logos-negocios', '3242096d-871f-4c91-b688-dae59e0e1583.PNG', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '2026-06-29 04:53:55.628373+00', '2026-06-29 04:53:55.628373+00', '2026-06-29 04:53:55.628373+00', '{"eTag": "\"36c8e713cdbfc703958aa9a3388403ab\"", "size": 1170973, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-29T04:53:56.000Z", "contentLength": 1170973, "httpStatusCode": 200}', 'f1d41c40-1988-42fa-b615-55890d73cf5a', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{}', NULL, false, false),
	('4f2f3b8f-3b8a-434d-9342-6fda9765b66c', 'logos-negocios', '733f48cf-0e3f-45b5-a1ab-04307b47b4c6.PNG', '49c36675-554b-4d86-aeb7-bfec99c13186', '2026-06-30 02:58:34.730157+00', '2026-06-30 02:58:34.730157+00', '2026-06-30 02:58:34.730157+00', '{"eTag": "\"4009374f500e7759e1efe88b57ac75c3\"", "size": 1053248, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-30T02:58:35.000Z", "contentLength": 1053248, "httpStatusCode": 200}', '8efbd970-977a-4713-8231-1ae64ecc6f98', '49c36675-554b-4d86-aeb7-bfec99c13186', '{}', NULL, false, false),
	('b3cc749d-1b6f-4eda-bbe1-6799262f2f28', 'logos-negocios', 'c2faf51e-3331-4a6e-a9ed-ae36ffb7e7d7.PNG', 'd4afcde5-cb61-4e03-8813-574ec433d404', '2026-06-30 03:55:06.616287+00', '2026-06-30 03:55:06.616287+00', '2026-06-30 03:55:06.616287+00', '{"eTag": "\"5214aa4c638ca034a3cc96e392d1e4d5\"", "size": 502635, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-30T03:55:07.000Z", "contentLength": 502635, "httpStatusCode": 200}', 'd79ff441-b37d-4dd3-b679-f3cf3619e686', 'd4afcde5-cb61-4e03-8813-574ec433d404', '{}', NULL, false, false),
	('81f34705-9e2f-448b-88b1-b00cc7223cee', 'logos-negocios', 'f09597f7-a564-49a3-a239-3e99f1f8fcf3.PNG', '808a419d-5acf-4503-bdf3-0fb1253a134d', '2026-06-30 04:04:46.471707+00', '2026-06-30 04:04:46.471707+00', '2026-06-30 04:04:46.471707+00', '{"eTag": "\"3c0184a598347af9bb0bb4f96909b3a8\"", "size": 1105624, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-30T04:04:47.000Z", "contentLength": 1105624, "httpStatusCode": 200}', '7aa3e739-3cb9-4711-8f1a-9b5caf420469', '808a419d-5acf-4503-bdf3-0fb1253a134d', '{}', NULL, false, false),
	('2435328c-23b5-4a43-b977-65aa4f897e08', 'logos-negocios', 'e2ff279b-37eb-4a94-b20d-614d9693f333.PNG', '41e5290e-b250-4663-8ca4-b8f2131497dd', '2026-06-30 04:15:13.949755+00', '2026-06-30 04:15:13.949755+00', '2026-06-30 04:15:13.949755+00', '{"eTag": "\"ce357dd0b2577ee10ae8728ce7b499aa\"", "size": 929188, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-30T04:15:14.000Z", "contentLength": 929188, "httpStatusCode": 200}', '4483ae2f-3fcf-4a62-97e0-2428aeebac9d', '41e5290e-b250-4663-8ca4-b8f2131497dd', '{}', NULL, false, false),
	('60f86957-1ab0-4df4-ab9f-b6252e415b56', 'logos-negocios', '1b964770-5216-4657-98ea-261964a43ab1.PNG', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '2026-06-30 04:30:39.17121+00', '2026-06-30 04:30:39.17121+00', '2026-06-30 04:30:39.17121+00', '{"eTag": "\"36c8e713cdbfc703958aa9a3388403ab\"", "size": 1170973, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-30T04:30:40.000Z", "contentLength": 1170973, "httpStatusCode": 200}', 'a9cd684a-7c97-4498-b828-bc293517ce23', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{}', NULL, false, false),
	('1ef970e4-29b7-4a32-a8a6-3088f120c062', 'logos-negocios', '3a654a26-ab4b-4239-b355-16ed5f52ac6f.png', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '2026-06-30 21:43:51.824427+00', '2026-06-30 21:43:51.824427+00', '2026-06-30 21:43:51.824427+00', '{"eTag": "\"3d7adb3da484debc9bcca9b5a4c442e5\"", "size": 19361, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-30T21:43:52.000Z", "contentLength": 19361, "httpStatusCode": 200}', '3ad30b5c-c5cf-4c49-b271-e9fd702bbfbd', '6bcc1883-ccec-4e60-b1d8-cc1ae373f586', '{}', NULL, false, false),
	('27098a14-7d3d-494b-a915-d8eff49d2429', 'imagenes-productos', 'a75a38a4-78a6-4e18-acc6-67ab627017ef.PNG', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '2026-07-01 01:39:27.72579+00', '2026-07-01 01:39:27.72579+00', '2026-07-01 01:39:27.72579+00', '{"eTag": "\"165bc92cab7ffabc19c2e4eb3b46f13f\"", "size": 742289, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-01T01:39:28.000Z", "contentLength": 742289, "httpStatusCode": 200}', 'f7896977-7411-4571-b9a3-8c4ecae3da90', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{}', NULL, false, false),
	('cd37f2ee-6747-47bf-9dcf-6ea12d4a2401', 'imagenes-productos', '8a18cc0a-2b45-47fc-be91-35d31d60bed9.png', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '2026-07-01 03:32:23.096257+00', '2026-07-01 03:32:23.096257+00', '2026-07-01 03:32:23.096257+00', '{"eTag": "\"6554507f4d25b8ac9ddf9bd306de688e\"", "size": 847101, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-01T03:32:24.000Z", "contentLength": 847101, "httpStatusCode": 200}', '3c0994fa-6f29-4f04-8b5f-70f950d26d3e', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{}', NULL, false, false),
	('63af8ebc-2e6d-4b97-a5eb-6af8696643e2', 'imagenes-productos', '6c939cb4-244c-404a-9410-b11fd8e50016.png', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '2026-07-01 03:33:04.180753+00', '2026-07-01 03:33:04.180753+00', '2026-07-01 03:33:04.180753+00', '{"eTag": "\"6554507f4d25b8ac9ddf9bd306de688e\"", "size": 847101, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-01T03:33:05.000Z", "contentLength": 847101, "httpStatusCode": 200}', '5291615d-29d6-4d11-bbca-16ca1c6f54a6', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{}', NULL, false, false),
	('750e5c3c-8f77-4c8d-8cf3-ba026e8fa7b6', 'imagenes-productos', '72dc4d51-23bf-4479-ad92-b628963aaa2e.PNG', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '2026-07-01 03:47:21.690681+00', '2026-07-01 03:47:21.690681+00', '2026-07-01 03:47:21.690681+00', '{"eTag": "\"3001291c643ca1a740ccbf0fede1624d\"", "size": 721159, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-01T03:47:22.000Z", "contentLength": 721159, "httpStatusCode": 200}', '9bdf28e4-3818-4944-bfd6-18e7c76ac893', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{}', NULL, false, false),
	('fb778266-7042-44ed-b9ba-df42fd08abc5', 'imagenes-productos', '60dc1a64-91d7-49c0-8869-17d548f94c85.png', NULL, '2026-07-01 03:58:48.600889+00', '2026-07-01 03:58:48.600889+00', '2026-07-01 03:58:48.600889+00', '{"eTag": "\"1a2a463f6148e8b523e714be45f3aeda\"", "size": 86381, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-01T03:58:49.000Z", "contentLength": 86381, "httpStatusCode": 200}', 'da9145d4-80d2-451f-a995-25abf449b1e7', NULL, '{}', NULL, false, false),
	('581a0368-17e5-4699-8e38-bfe6986db13f', 'logos-negocios', 'f00fc6e7-b610-4105-8e93-61f2e4364867.jpg', '22cf8333-51c9-414e-b7ae-cfe4176b8ced', '2026-07-01 19:54:09.025128+00', '2026-07-01 19:54:09.025128+00', '2026-07-01 19:54:09.025128+00', '{"eTag": "\"885f8916f21cc0ef6fef8a892c145721\"", "size": 88427, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-01T19:54:09.000Z", "contentLength": 88427, "httpStatusCode": 200}', '58ae6ecb-8e96-4717-b239-565fff369d98', '22cf8333-51c9-414e-b7ae-cfe4176b8ced', '{}', NULL, false, false),
	('4c50272f-765b-40c1-a133-1561ea8528f1', 'logos-negocios', '34f0641a-4534-4d3f-8a90-8e42e973bd0a.jpg', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '2026-07-01 21:25:47.307727+00', '2026-07-01 21:25:47.307727+00', '2026-07-01 21:25:47.307727+00', '{"eTag": "\"c26c0dacb2851715f964395ce3e2d427\"", "size": 258623, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-01T21:25:48.000Z", "contentLength": 258623, "httpStatusCode": 200}', '97311a1e-92d0-492f-b982-ff8b5ad53620', 'c948a629-a78a-450b-a4c5-17b15c0e2da5', '{}', NULL, false, false),
	('5c5bcb6b-e544-4ff4-ac58-f9ba6652e495', 'logos-negocios', 'bc41f580-5f6a-434d-8bfb-645b9537c645.png', 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', '2026-09-02 22:19:00.303654+00', '2026-09-02 22:19:00.303654+00', '2026-09-02 22:19:00.303654+00', '{"eTag": "\"6a9d754d15ee69d818f03b669abe8491\"", "size": 733337, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-02T22:19:01.000Z", "contentLength": 733337, "httpStatusCode": 200}', '10fc2e06-c386-47ab-b291-4a15de93666b', 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', '{}', NULL, false, false),
	('e9cc5005-3077-407d-b810-8fce152e80e9', 'logos-negocios', '14e9546c-477a-423f-a2fb-7ea3cca29130.PNG', '12a19e47-623e-4b9f-8153-fad83e74887c', '2026-09-17 19:11:09.251191+00', '2026-09-17 19:11:09.251191+00', '2026-09-17 19:11:09.251191+00', '{"eTag": "\"d2da935751534ecaba570134fd58b852\"", "size": 152534, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-17T19:11:10.000Z", "contentLength": 152534, "httpStatusCode": 200}', '473063c8-3699-40f0-a55e-c7602a6f04a3', '12a19e47-623e-4b9f-8153-fad83e74887c', '{}', NULL, false, false),
	('75c7b019-bdac-4ec3-8dd6-53fca878d216', 'imagenes-productos', '9b1bb8fa-9ee6-4ae2-b20f-28a29bb68598.PNG', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '2026-09-17 20:20:00.475683+00', '2026-09-17 20:20:00.475683+00', '2026-09-17 20:20:00.475683+00', '{"eTag": "\"3001291c643ca1a740ccbf0fede1624d\"", "size": 721159, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-17T20:20:01.000Z", "contentLength": 721159, "httpStatusCode": 200}', 'a3a40e83-1a8d-4bec-9caf-d7c804c4b7ed', 'ad59ce8a-28a6-4608-9446-afa6e6ac9e23', '{}', NULL, false, false),
	('41f3e171-6e31-42db-8d42-1ebd5622dcc2', 'logos-negocios', 'ea6aa378-3b4f-4a2b-a6ac-dbc423837a35.PNG', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '2026-09-21 19:10:14.239562+00', '2026-09-21 19:10:14.239562+00', '2026-09-21 19:10:14.239562+00', '{"eTag": "\"9a54e5c8e1fd21c432519bd4e5d6198a\"", "size": 1409678, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-21T19:10:15.000Z", "contentLength": 1409678, "httpStatusCode": 200}', '8a511bf7-97c2-49f4-ba74-292eb697ebd5', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '{}', NULL, false, false),
	('74875e27-d98a-44c8-b7b0-0af7b8fb0607', 'logos-negocios', 'b0932856-e374-437d-8e6e-07243d79f8b9.PNG', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '2026-09-21 19:35:42.279519+00', '2026-09-21 19:35:42.279519+00', '2026-09-21 19:35:42.279519+00', '{"eTag": "\"128c55a729951fd43b776decfb66dff4\"", "size": 861890, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-21T19:35:43.000Z", "contentLength": 861890, "httpStatusCode": 200}', '30d9568c-6ec2-4aa2-b351-a6064dc3a09b', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '{}', NULL, false, false),
	('f80b5a74-63a8-4844-afdf-1ef4e4acf9b4', 'imagenes-productos', '5746a8f7-4d5c-4d9c-9179-17b08fd8b755.PNG', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '2026-09-22 04:27:33.217015+00', '2026-09-22 04:27:33.217015+00', '2026-09-22 04:27:33.217015+00', '{"eTag": "\"76c1302e188defb86c6c25ce078b576f\"", "size": 964989, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:27:34.000Z", "contentLength": 964989, "httpStatusCode": 200}', '822d3064-9d63-4d10-922b-167dae15ae7f', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '{}', NULL, false, false),
	('1d369ba8-00a3-4f16-9c12-1161639e85df', 'imagenes-productos', 'd17eb9b1-6735-4eb6-b4f0-62d97ef7c0f9.PNG', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '2026-09-22 04:30:15.365356+00', '2026-09-22 04:30:15.365356+00', '2026-09-22 04:30:15.365356+00', '{"eTag": "\"2ed917ba93e0f6a28b53ba805e8ab939\"", "size": 323084, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:30:16.000Z", "contentLength": 323084, "httpStatusCode": 200}', '8899ffe6-5b51-40fb-bad2-65712838f5b8', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '{}', NULL, false, false),
	('49fb61ba-28d1-48b3-956e-c63c86733b72', 'imagenes-productos', '52121044-9a23-494a-a801-de6764010acd.PNG', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '2026-09-22 04:31:45.44019+00', '2026-09-22 04:31:45.44019+00', '2026-09-22 04:31:45.44019+00', '{"eTag": "\"9f0852dddac9f8e72d1bdd8c7e12f9e4\"", "size": 98754, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:31:46.000Z", "contentLength": 98754, "httpStatusCode": 200}', '542e7352-26d3-44fe-99bc-57eddd498db3', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '{}', NULL, false, false),
	('457df719-369a-42b3-8b2c-67c719a9beab', 'imagenes-productos', 'ce07f1d4-f4b2-493a-a74e-db3665d15314.PNG', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '2026-09-22 04:33:05.6206+00', '2026-09-22 04:33:05.6206+00', '2026-09-22 04:33:05.6206+00', '{"eTag": "\"167f03c34b3172f5cf8c67148982db72\"", "size": 360280, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:33:06.000Z", "contentLength": 360280, "httpStatusCode": 200}', '3e37be22-9a2c-4666-9602-4a44f4994fea', '41b4d45e-fdf8-4578-9f7b-66788b87ae46', '{}', NULL, false, false),
	('2c3f92d7-dcd1-449c-8eb0-3996b67b14d3', 'imagenes-productos', '3e57e2d6-f761-44dc-86c5-9e3c8abc1c4e.PNG', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '2026-09-22 04:51:10.225151+00', '2026-09-22 04:51:10.225151+00', '2026-09-22 04:51:10.225151+00', '{"eTag": "\"1559a280ca8fa3184b0a6611207d2867\"", "size": 300814, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:51:11.000Z", "contentLength": 300814, "httpStatusCode": 200}', '7fd7b4e9-ef3c-48bb-b8c7-dd2c6aca8617', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '{}', NULL, false, false),
	('03da8b8d-9cd0-47eb-a43d-c4fa7b4c0243', 'imagenes-productos', 'e3b26017-b0e1-4aa5-b40e-fe4638b06150.PNG', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '2026-09-22 04:52:29.628962+00', '2026-09-22 04:52:29.628962+00', '2026-09-22 04:52:29.628962+00', '{"eTag": "\"62d768af0aede2d2e879620a48b38585\"", "size": 335884, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:52:30.000Z", "contentLength": 335884, "httpStatusCode": 200}', '8a17f77b-ab12-45c0-9716-9d8821c31dfe', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '{}', NULL, false, false),
	('235d9021-c0c2-4d60-841b-9823e95791e3', 'imagenes-productos', '31edd97c-760f-4fa4-ad9d-8039a02faed0.PNG', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '2026-09-22 04:54:35.852395+00', '2026-09-22 04:54:35.852395+00', '2026-09-22 04:54:35.852395+00', '{"eTag": "\"e6b5fe6c9ea4f05e9b41efeb763c092d\"", "size": 262237, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:54:36.000Z", "contentLength": 262237, "httpStatusCode": 200}', '45a9a001-98bb-46cd-bec6-2cf6a497c529', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '{}', NULL, false, false),
	('beef1118-c4f4-455b-b860-02cd38fc35dc', 'imagenes-productos', 'a69193f9-b729-4a27-a05d-c804f329bc86.PNG', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '2026-09-22 04:55:34.67559+00', '2026-09-22 04:55:34.67559+00', '2026-09-22 04:55:34.67559+00', '{"eTag": "\"52f92dc9222b71feddcb23e48f2c6c42\"", "size": 535693, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T04:55:35.000Z", "contentLength": 535693, "httpStatusCode": 200}', '2c972df2-bb83-456a-bed1-038e0c82ccdf', '4a36d5f2-7d8d-4986-b272-f2547ad8a4b8', '{}', NULL, false, false),
	('a10ea77f-56d0-4547-a077-67197ee8bd12', 'logos-negocios', '6fec1d50-7e2d-4920-aa62-d4a4875509ad.PNG', '150db9f6-1674-4fbd-90c2-2587b14ec05a', '2026-09-22 16:29:53.54841+00', '2026-09-22 16:29:53.54841+00', '2026-09-22 16:29:53.54841+00', '{"eTag": "\"68e39f6e719fd27c174067698dba9d8e\"", "size": 601918, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T16:29:54.000Z", "contentLength": 601918, "httpStatusCode": 200}', '6fdadf0c-07e2-4f3b-ad3e-993b404ee9d9', '150db9f6-1674-4fbd-90c2-2587b14ec05a', '{}', NULL, false, false),
	('d85015c7-48bd-4297-8ee7-024d730f4663', 'logos-negocios', '898f518e-04ab-4840-8343-9cbd292e2602.PNG', '150db9f6-1674-4fbd-90c2-2587b14ec05a', '2026-09-22 16:35:06.09603+00', '2026-09-22 16:35:06.09603+00', '2026-09-22 16:35:06.09603+00', '{"eTag": "\"68e39f6e719fd27c174067698dba9d8e\"", "size": 601918, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T16:35:06.000Z", "contentLength": 601918, "httpStatusCode": 200}', '91e25f87-b01c-4da1-82ed-b3360160a1ab', '150db9f6-1674-4fbd-90c2-2587b14ec05a', '{}', NULL, false, false),
	('f06de912-477c-463f-a1e0-5ed362d1c9c9', 'imagenes-productos', '9932f90e-d811-4434-a3fb-8295733b8c7d.PNG', NULL, '2026-09-22 17:08:57.083018+00', '2026-09-22 17:08:57.083018+00', '2026-09-22 17:08:57.083018+00', '{"eTag": "\"37be9311c2265970a65f1abc3582ab4c\"", "size": 212521, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T17:08:58.000Z", "contentLength": 212521, "httpStatusCode": 200}', '6f96fa77-bb04-4615-9b8c-b78d03740452', NULL, '{}', NULL, false, false),
	('36598b7e-49f5-4469-9cc8-f5e4fafff670', 'imagenes-productos', 'a2cc33f1-fc18-4c0a-aabb-96379cc81caa.PNG', NULL, '2026-09-22 17:10:51.658368+00', '2026-09-22 17:10:51.658368+00', '2026-09-22 17:10:51.658368+00', '{"eTag": "\"b8ed475d97ea7eb3e176ce2c6ed240f3\"", "size": 172824, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T17:10:52.000Z", "contentLength": 172824, "httpStatusCode": 200}', '76135be1-4a48-4228-b9bd-aa792f7fc756', NULL, '{}', NULL, false, false),
	('c20519fe-9c72-4956-8bc2-754d4d4b9d1a', 'imagenes-productos', '4eabafcb-4227-4342-99c6-dcc1b9809830.PNG', NULL, '2026-09-22 17:12:29.164234+00', '2026-09-22 17:12:29.164234+00', '2026-09-22 17:12:29.164234+00', '{"eTag": "\"fd8ecc9bb5254bfb2fd3da8905cd558e\"", "size": 135879, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T17:12:30.000Z", "contentLength": 135879, "httpStatusCode": 200}', 'cbd5c15f-868f-4575-bc57-c509ca33291a', NULL, '{}', NULL, false, false),
	('644c44ed-ce56-4db5-8ffd-2e10f654503c', 'imagenes-productos', 'a622946d-9c56-49a2-b87b-6d08d9c41620.PNG', NULL, '2026-09-22 17:13:40.122351+00', '2026-09-22 17:13:40.122351+00', '2026-09-22 17:13:40.122351+00', '{"eTag": "\"17ceaf94277ec3c9ce74aec47b526de4\"", "size": 157840, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T17:13:41.000Z", "contentLength": 157840, "httpStatusCode": 200}', 'a03c389a-eb94-4045-b776-cbec37dcceb2', NULL, '{}', NULL, false, false),
	('6fdfc892-32d9-4832-a91b-be5dd0bf8c14', 'imagenes-productos', '5429b446-1dfe-4550-8e36-7f475a52c9aa.PNG', NULL, '2026-09-22 17:15:00.665167+00', '2026-09-22 17:15:00.665167+00', '2026-09-22 17:15:00.665167+00', '{"eTag": "\"7daed6fc43803a9dc0759d2c2e51431f\"", "size": 189528, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T17:15:01.000Z", "contentLength": 189528, "httpStatusCode": 200}', 'e932d448-8e65-43f5-af9b-6b0e3209f402', NULL, '{}', NULL, false, false),
	('bac0be07-cb04-4c97-ae06-b3f11737a816', 'imagenes-productos', '01e5395d-405b-4350-9c7d-266d3efcc25a.PNG', NULL, '2026-09-22 17:16:45.818398+00', '2026-09-22 17:16:45.818398+00', '2026-09-22 17:16:45.818398+00', '{"eTag": "\"57f8694b673bf411d7a053141529cbf2\"", "size": 75990, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T17:16:46.000Z", "contentLength": 75990, "httpStatusCode": 200}', '23db25de-f2c4-440c-b9aa-7b7577c5fe3c', NULL, '{}', NULL, false, false),
	('6a0782c4-44d5-41a6-8fea-e79cf772123e', 'imagenes-productos', 'a40bb502-095b-4f18-bf3f-f694297a6ed5.PNG', NULL, '2026-09-22 17:18:16.394761+00', '2026-09-22 17:18:16.394761+00', '2026-09-22 17:18:16.394761+00', '{"eTag": "\"dfbc8f07fb005112bf49446431f5b785\"", "size": 60961, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T17:18:17.000Z", "contentLength": 60961, "httpStatusCode": 200}', 'ae4d687c-2207-42d2-b9ed-353ad13c9e76', NULL, '{}', NULL, false, false),
	('6638b0da-e2c2-4080-b16b-115b74970b08', 'logos-negocios', 'b6f7fb92-9fd2-45d2-ab53-7c3cc76c3e6c.PNG', '489f28a8-3b68-48c3-b490-d6bb6883f3f5', '2026-09-22 19:12:07.150936+00', '2026-09-22 19:12:07.150936+00', '2026-09-22 19:12:07.150936+00', '{"eTag": "\"6e1a15a9201500ef9221d5488331ca89\"", "size": 686740, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T19:12:08.000Z", "contentLength": 686740, "httpStatusCode": 200}', '8468359e-c5a3-4c7c-9a98-fb0d5342ba71', '489f28a8-3b68-48c3-b490-d6bb6883f3f5', '{}', NULL, false, false),
	('ba2f8889-5f5c-4195-8252-39f243da1dd7', 'logos-negocios', '92e2a440-9b65-43a1-86e2-b1c9c5cc5c36.PNG', '8b49f28b-30c1-410e-83ba-43fb0e518a28', '2026-09-22 19:18:49.066666+00', '2026-09-22 19:18:49.066666+00', '2026-09-22 19:18:49.066666+00', '{"eTag": "\"8d772cf2a12b419a735e3c71e7e78bc3\"", "size": 1074627, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-09-22T19:18:49.000Z", "contentLength": 1074627, "httpStatusCode": 200}', '42225736-980c-40b7-894b-4ee3d8f1eaa2', '8b49f28b-30c1-410e-83ba-43fb0e518a28', '{}', NULL, false, false);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: venta; Type: TABLE DATA; Schema: ventas; Owner: postgres
--

INSERT INTO "ventas"."venta" ("id_venta", "id_perfil", "id_negocio", "id_medio_pago", "id_metodo_envio", "telefono", "direccion", "fecha_venta", "total") OVERRIDING SYSTEM VALUE VALUES
	(8, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 10, 8, 5, '315 7826531', 'Calle 78 bis sur ', '2026-07-03 06:36:04.533833', 40500.00),
	(9, 'c948a629-a78a-450b-a4c5-17b15c0e2da5', 10, 8, 5, '315 7826531', 'Calle 78 bis sur ', '2026-07-03 06:36:06.234064', 40500.00),
	(10, 'c9d19e19-e43a-4952-b8df-819d769e3210', 10, 8, 5, '300 3182798', 'Calle 87 ', '2026-07-14 05:37:14.712747', 35500.00),
	(11, 'c9d19e19-e43a-4952-b8df-819d769e3210', 10, 8, 5, '315 7826531', 'Calle 78 bis sur ', '2026-07-14 05:45:20.749559', 40500.00),
	(12, 'c9d19e19-e43a-4952-b8df-819d769e3210', 10, 8, 5, '300 3182798', 'Calle 87 ', '2026-07-14 05:59:34.063348', 70500.00),
	(13, 'c9d19e19-e43a-4952-b8df-819d769e3210', 10, 8, 5, '300 3182798', 'Calle 87 ', '2026-07-14 06:05:43.076201', 60500.00),
	(14, 'c9d19e19-e43a-4952-b8df-819d769e3210', 10, 8, 5, '300 3182798', 'Calle 87 ', '2026-07-14 06:12:03.044187', 40500.00),
	(15, '22cf8333-51c9-414e-b7ae-cfe4176b8ced', 10, 8, 5, '3132866410', 'Calle 60', '2026-07-14 06:26:19.612692', 40500.00),
	(16, '22cf8333-51c9-414e-b7ae-cfe4176b8ced', 10, 8, 5, '3132866410', 'Calle 60', '2026-07-14 06:38:07.757236', 35500.00),
	(17, '22cf8333-51c9-414e-b7ae-cfe4176b8ced', 10, 8, 5, '3132866410', 'Calle 60', '2026-07-14 06:58:10.619426', 40500.00),
	(18, 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 10, 8, 5, '123456789', 'Calle 25a - 12', '2026-08-29 01:12:14.294252', 35500.00),
	(19, 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 10, 8, 5, '34556667', 'calle 70', '2026-09-02 22:29:20.869389', 65500.00),
	(20, 'fd9a7ba2-c79d-46e3-b845-3f28166529c1', 10, 8, 5, '34556667', 'calle 70', '2026-09-02 22:29:21.705744', 65500.00),
	(21, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:01:09.741536', 70500.00),
	(22, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:10:51.375399', 40500.00),
	(23, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:26:53.041474', 60500.00),
	(24, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:32:36.54124', 60500.00),
	(25, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:41:38.064155', 90500.00),
	(26, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:50:12.528421', 110500.00),
	(27, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:50:12.86514', 110500.00),
	(28, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 20:59:52.338846', 110500.00),
	(29, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 21:11:53.22242', 210500.00),
	(30, '12a19e47-623e-4b9f-8153-fad83e74887c', 10, 8, 5, '36883381773', 'calle 50', '2026-09-17 21:36:47.754304', 110500.00),
	(31, 'dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', 21, 12, 8, '3772838262', 'Calle 40 #89', '2026-09-22 18:04:47.787023', 197000.00),
	(32, 'dcd8f3ec-6a39-4718-9b95-3f7c676b65ff', 26, 10, 6, '3772838262', 'Calle 40 #89', '2026-09-22 18:29:27.26184', 26000.00);


--
-- Data for Name: detalle_venta; Type: TABLE DATA; Schema: ventas; Owner: postgres
--

INSERT INTO "ventas"."detalle_venta" ("id_detalle", "id_venta", "id_producto", "cantidad", "precio_unitario", "subtotal") OVERRIDING SYSTEM VALUE VALUES
	(8, 8, 8, 1, 30000.00, 30000.00),
	(9, 9, 8, 1, 30000.00, 30000.00),
	(11, 11, 8, 1, 30000.00, 30000.00),
	(12, 12, 8, 2, 30000.00, 60000.00),
	(14, 14, 8, 1, 30000.00, 30000.00),
	(15, 15, 8, 1, 30000.00, 30000.00),
	(17, 17, 8, 1, 30000.00, 30000.00),
	(19, 19, 8, 1, 30000.00, 30000.00),
	(21, 20, 8, 1, 30000.00, 30000.00),
	(23, 21, 8, 2, 30000.00, 60000.00),
	(24, 22, 8, 1, 30000.00, 30000.00),
	(25, 23, 16, 1, 50000.00, 50000.00),
	(26, 24, 16, 1, 50000.00, 50000.00),
	(27, 25, 8, 1, 30000.00, 30000.00),
	(28, 25, 16, 1, 50000.00, 50000.00),
	(29, 26, 16, 2, 50000.00, 100000.00),
	(30, 27, 16, 2, 50000.00, 100000.00),
	(31, 28, 16, 2, 50000.00, 100000.00),
	(32, 29, 16, 4, 50000.00, 200000.00),
	(33, 30, 16, 2, 50000.00, 100000.00),
	(34, 31, 19, 2, 95000.00, 190000.00),
	(35, 32, 29, 1, 20000.00, 20000.00);


--
-- Data for Name: seguimiento; Type: TABLE DATA; Schema: ventas; Owner: postgres
--

INSERT INTO "ventas"."seguimiento" ("id_seguimiento", "id_venta", "estado_seguimiento", "fecha_entrega") OVERRIDING SYSTEM VALUE VALUES
	(10, 10, 'PENDIENTE', NULL),
	(11, 11, 'PENDIENTE', NULL),
	(13, 13, 'PENDIENTE', NULL),
	(14, 14, 'PENDIENTE', NULL),
	(15, 15, 'PENDIENTE', NULL),
	(16, 16, 'PENDIENTE', NULL),
	(17, 17, 'PENDIENTE', NULL),
	(18, 18, 'ENTREGADO', '2026-08-30 00:56:14.765699'),
	(20, 20, 'PENDIENTE', NULL),
	(19, 19, 'PREPARANDO', NULL),
	(12, 12, 'PREPARANDO', NULL),
	(8, 8, 'ENVIADO', NULL),
	(9, 9, 'ENVIADO', NULL),
	(23, 21, 'PENDIENTE', NULL),
	(24, 22, 'PENDIENTE', NULL),
	(25, 23, 'PENDIENTE', NULL),
	(26, 24, 'PENDIENTE', NULL),
	(27, 25, 'PENDIENTE', NULL),
	(28, 26, 'PENDIENTE', NULL),
	(29, 27, 'PENDIENTE', NULL),
	(30, 28, 'PENDIENTE', NULL),
	(31, 29, 'PENDIENTE', NULL),
	(32, 30, 'PENDIENTE', NULL),
	(33, 31, 'PREPARANDO', NULL),
	(35, 32, 'PENDIENTE', NULL);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 520, true);


--
-- Name: categoria_id_categoria_seq; Type: SEQUENCE SET; Schema: catalogo; Owner: postgres
--

SELECT pg_catalog.setval('"catalogo"."categoria_id_categoria_seq"', 18, true);


--
-- Name: comentario_id_comentario_seq; Type: SEQUENCE SET; Schema: catalogo; Owner: postgres
--

SELECT pg_catalog.setval('"catalogo"."comentario_id_comentario_seq"', 7, true);


--
-- Name: movimiento_stock_id_movimiento_seq; Type: SEQUENCE SET; Schema: catalogo; Owner: postgres
--

SELECT pg_catalog.setval('"catalogo"."movimiento_stock_id_movimiento_seq"', 57, true);


--
-- Name: producto_id_producto_seq; Type: SEQUENCE SET; Schema: catalogo; Owner: postgres
--

SELECT pg_catalog.setval('"catalogo"."producto_id_producto_seq"', 31, true);


--
-- Name: notificacion_id_notificacion_seq; Type: SEQUENCE SET; Schema: cliente; Owner: postgres
--

SELECT pg_catalog.setval('"cliente"."notificacion_id_notificacion_seq"', 70, true);


--
-- Name: pqrs_id_pqrs_seq; Type: SEQUENCE SET; Schema: cliente; Owner: postgres
--

SELECT pg_catalog.setval('"cliente"."pqrs_id_pqrs_seq"', 4, true);


--
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: cliente; Owner: postgres
--

SELECT pg_catalog.setval('"cliente"."rol_id_rol_seq"', 9, true);


--
-- Name: tipo_documento_id_tipo_documento_seq; Type: SEQUENCE SET; Schema: cliente; Owner: postgres
--

SELECT pg_catalog.setval('"cliente"."tipo_documento_id_tipo_documento_seq"', 5, true);


--
-- Name: medio_pago_id_medio_pago_seq; Type: SEQUENCE SET; Schema: negocio; Owner: postgres
--

SELECT pg_catalog.setval('"negocio"."medio_pago_id_medio_pago_seq"', 12, true);


--
-- Name: metodo_envio_id_metodo_envio_seq; Type: SEQUENCE SET; Schema: negocio; Owner: postgres
--

SELECT pg_catalog.setval('"negocio"."metodo_envio_id_metodo_envio_seq"', 8, true);


--
-- Name: negocio_id_negocio_seq; Type: SEQUENCE SET; Schema: negocio; Owner: postgres
--

SELECT pg_catalog.setval('"negocio"."negocio_id_negocio_seq"', 28, true);


--
-- Name: puesto_id_puesto_seq; Type: SEQUENCE SET; Schema: negocio; Owner: postgres
--

SELECT pg_catalog.setval('"negocio"."puesto_id_puesto_seq"', 22, true);


--
-- Name: puestos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."puestos_id_seq"', 7733, true);


--
-- Name: detalle_venta_id_detalle_seq; Type: SEQUENCE SET; Schema: ventas; Owner: postgres
--

SELECT pg_catalog.setval('"ventas"."detalle_venta_id_detalle_seq"', 35, true);


--
-- Name: seguimiento_id_seguimiento_seq; Type: SEQUENCE SET; Schema: ventas; Owner: postgres
--

SELECT pg_catalog.setval('"ventas"."seguimiento_id_seguimiento_seq"', 35, true);


--
-- Name: venta_id_venta_seq; Type: SEQUENCE SET; Schema: ventas; Owner: postgres
--

SELECT pg_catalog.setval('"ventas"."venta_id_venta_seq"', 32, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 0XCoCswisRAXzcc7lmONTozukeuAQhkIYchcnmfNMosdVbY8OG7Wo7qRLDczn2u

RESET ALL;

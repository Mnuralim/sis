--
-- PostgreSQL database dump
--

\restrict Qbm0aJQGBEcuz6b49L00NIERv1RwQUS0owGl1ZLZNABGKv9p205JMTsobgkBA6q

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.6 (Ubuntu 17.6-1.pgdg24.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    image text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: announcements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.announcements (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    image text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.announcements OWNER TO postgres;

--
-- Name: facilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facilities (
    id text NOT NULL,
    name text NOT NULL,
    image text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    description text
);


ALTER TABLE public.facilities OWNER TO postgres;

--
-- Name: galleries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galleries (
    id text NOT NULL,
    title text NOT NULL,
    image text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    description text
);


ALTER TABLE public.galleries OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id text NOT NULL,
    school_name text NOT NULL,
    address text NOT NULL,
    description text NOT NULL,
    accreditation text NOT NULL,
    contact text NOT NULL,
    history text NOT NULL,
    vision text NOT NULL,
    mission text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    logo text NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c46ddc1e-3540-4877-a838-db9f042e4cbd	338262d5caf4eda9b222c3070b728d6e45dbf6cdb1aa25171bda4abb09ddc5af	2025-08-28 14:05:22.433234+00	20250828140522_update	\N	\N	2025-08-28 14:05:22.405838+00	1
3c3added-4139-4c38-af2a-50fa13486e48	0c4357b6490cbf5181121076e53eb62182536398807663b384822569e29bf0dc	2025-08-31 06:33:44.67059+00	20250831063344_update	\N	\N	2025-08-31 06:33:44.667611+00	1
9ebf01c5-301a-4e25-bd30-d12843da46e9	8356104995841e34893bbf015e9be8038ea5bbe31687306e6097763b5e5112d6	2025-08-31 07:11:08.543716+00	20250831071108_update	\N	\N	2025-08-31 07:11:08.540964+00	1
1757429b-82fe-4780-a0aa-6c9f4b39d8e0	901253dc816cec17d5fe266610969304fc023b0e81f1fbec0a8e1cc573691c21	2025-08-31 08:14:28.570801+00	20250831081428_update	\N	\N	2025-08-31 08:14:28.566539+00	1
\.


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activities (id, name, description, image, created_at, updated_at, created_by, updated_by) FROM stdin;
548fa48a-3e81-4788-91cc-565a13c093fd	Kegiatan Pembelajaran	Proses belajar mengajar yang interaktif dengan metode modern dan teknologi terkini	https://ik.imagekit.io/ctvvdwhk0/sis/activities/image-1756624929072_IDBXFtJJB.png	2025-08-31 07:22:12.387	2025-08-31 14:01:21.02	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
deaecffa-fbc0-4fc7-8a6c-a24c4c44be79	Praktikum Laboratorium	Kegiatan praktikum di laboratorium IPA untuk memperdalam pemahaman materi	https://ik.imagekit.io/ctvvdwhk0/sis/activities/image-1756648903929_xngK9CpYd.png	2025-08-31 14:01:48.093	2025-08-31 14:01:48.093	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
c6c2703b-a4c0-40ac-bb55-7637deb0d8a3	Seminar dan Workshop	Kegiatan seminar dan workshop untuk pengembangan wawasan dan keterampilan siswa	https://ik.imagekit.io/ctvvdwhk0/sis/activities/image-1756648931098_M_Zn41dcA.png	2025-08-31 14:02:14.007	2025-08-31 14:02:14.007	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
ea4bb898-0051-4ef7-b9c1-a34dfc530873	Ujian dan Evaluasi	Sistem evaluasi komprehensif untuk mengukur kemajuan belajar siswa	https://ik.imagekit.io/ctvvdwhk0/sis/activities/image-1756648952917_iGS8i4Nxj.png	2025-08-31 14:02:35.914	2025-08-31 14:02:35.914	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
0bb953e5-a428-4912-817d-e3d3beffe751	Kegiatan Olahraga	Program olahraga dan kesehatan untuk menjaga kebugaran fisik siswa	https://ik.imagekit.io/ctvvdwhk0/sis/activities/image-1756649019032_kbL3eU4lE.png	2025-08-31 14:03:42.055	2025-08-31 14:03:42.055	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
b6cbd83a-5652-48b4-8018-11fb8894ee34	Kegiatan Sosial abc	Program kegiatan sosial dan pengabdian masyarakat untuk membentuk karakter siswa	https://ik.imagekit.io/ctvvdwhk0/sis/activities/image-1756649043280_6EcygXP3X.png	2025-08-31 14:04:07.179	2025-09-03 06:32:54.072	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, password, name, created_at, updated_at) FROM stdin;
dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	admin	$2b$10$kGCzx.Lla8kijJ.Zq3Z5qulEl4im7tElslEelA58JWXcGYc0hkyPe	Admin Magang	2025-08-31 02:46:39.21	2025-08-31 08:43:00.214
\.


--
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.announcements (id, title, content, image, created_at, updated_at, created_by, updated_by) FROM stdin;
0e7b52cf-8d18-4ed3-8bdb-35c9d328726c	Penerimaan Siswa Baru 2025/2026	Pendaftaran siswa baru telah dibuka mulai 1 Februari 2025. Dapatkan informasi lengkap di website resmi sekolah atau datang langsung ke kantor pendaftaran.	https://ik.imagekit.io/ctvvdwhk0/sis/announcements/image-1756627849983_okOA2BeP8.png	2025-08-31 08:10:55.308	2025-08-31 13:38:50.929	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
9cdb932d-e68f-4695-97e4-605b34325653	Prestasi Olimpiade Matematika	Selamat kepada siswa kelas VI yang meraih juara 1 Olimpiade Matematika tingkat Provinsi Sulawesi Tenggara 2024.	https://ik.imagekit.io/ctvvdwhk0/sis/announcements/image-1756647599397_6YgDvI8WJ.png	2025-08-31 13:40:03.216	2025-08-31 13:40:03.216	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
e2bc4ac0-51c6-40c1-8a6d-b2f238956375	Kegiatan Study Tour ke Jakarta	Study tour kelas V ke Jakarta akan dilaksanakan pada minggu ketiga Februari 2025. Siswa akan mengunjungi museum dan landmark bersejarah.	https://ik.imagekit.io/ctvvdwhk0/sis/announcements/image-1756647642821_ojOKNu6Oc.png	2025-08-31 13:40:47.252	2025-08-31 13:40:47.252	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
a6f3cd89-4132-4626-a419-c6de662ff91f	Workshop Digital Literacy untuk Siswa Kelas X	Sekolah akan mengadakan workshop literasi digital khusus untuk siswa kelas X. Workshop ini bertujuan untuk meningkatkan kemampuan siswa dalam menggunakan teknologi secara bijak dan produktif.	https://ik.imagekit.io/ctvvdwhk0/sis/announcements/image-1757552494725_DzmPW0juE.png	2025-09-11 01:01:39.011	2025-09-11 01:01:39.011	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
f58eb721-9a5c-412f-baeb-9400d589047a	Rapat Orang Tua/Wali Siswa	Mengundang seluruh orang tua/wali siswa untuk menghadiri rapat koordinasi yang akan membahas perkembangan akademik siswa dan program sekolah semester ini.	\N	2025-09-11 01:02:30.815	2025-09-11 01:02:30.815	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
099f1965-1bfa-42e9-85a3-d575c9b01143	Libur Hari Raya Idul Fitri 1445 H	Assalamualaikum warahmatullahi wabarakatuh,\r\n\r\nBerdasarkan Surat Keputusan Kepala Sekolah Nomor: 145/SK/SMAN-1/IV/2024, dengan ini disampaikan bahwa sekolah akan melaksanakan libur dalam rangka perayaan Hari Raya Idul Fitri 1445 Hijriah.\r\n\r\n**KETENTUAN LIBUR:**\r\n\r\n**Periode Libur:**\r\nLibur dimulai pada hari Rabu, 10 April 2024 hingga Rabu, 17 April 2024.\r\n\r\n**Kembali Masuk:**\r\nAktivitas pembelajaran akan kembali normal pada hari Kamis, 18 April 2024 pukul 07.00 WIB dengan menggunakan seragam lengkap.\r\n\r\n**HAL-HAL YANG PERLU DIPERHATIKAN:**\r\n\r\n1. **Kegiatan Selama Libur:**\r\n   - Siswa diharapkan menggunakan waktu libur dengan kegiatan yang bermanfaat\r\n   - Tetap menjaga protokol kesehatan dan keamanan\r\n   - Mengerjakan tugas liburan yang telah diberikan oleh masing-masing guru mata pelajaran\r\n\r\n2. **Tugas Liburan:**\r\n   - Setiap siswa wajib mengerjakan tugas yang telah diberikan\r\n   - Tugas dikumpulkan pada hari pertama masuk sekolah (18 April 2024)\r\n   - Bagi yang tidak mengumpulkan tugas akan mendapat sanksi sesuai tata tertib sekolah\r\n\r\n3. **Persiapan Masuk Sekolah:**\r\n   - Pastikan seragam dalam kondisi bersih dan rapi\r\n   - Bawa perlengkapan sekolah lengkap\r\n   - Datang tepat waktu sesuai jadwal normal\r\n\r\n**KEGIATAN PASCA LIBUR:**\r\n\r\nSetelah libur Idul Fitri, sekolah akan mengadakan beberapa kegiatan khusus:\r\n- Upacara Halal Bihalal pada hari Kamis, 18 April 2024\r\n- Evaluasi pembelajaran semester genap\r\n- Persiapan Ujian Akhir Semester (UAS)\r\n\r\nDemikian pengumuman ini disampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.\r\n\r\nSelamat Hari Raya Idul Fitri 1445 H, mohon maaf lahir dan batin. Taqabbalallahu minna wa minkum.\r\n\r\nWassalamualaikum warahmatullahi wabarakatuh.	https://ik.imagekit.io/ctvvdwhk0/sis/announcements/image-1757554131324_gM4JrokCd.png	2025-09-11 01:28:55.347	2025-09-11 01:28:55.347	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
\.


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facilities (id, name, image, created_at, updated_at, created_by, updated_by, description) FROM stdin;
e7c67406-0ba7-40ea-9790-58e99cbaf50c	Laboratorium Komputer	https://ik.imagekit.io/ctvvdwhk0/sis/facilities/image-1756624839273_kf0cOxzDg.png	2025-08-31 07:20:42.786	2025-08-31 13:49:32.422	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Dilengkapi dengan 40 unit komputer terbaru dan koneksi internet berkecepatan tinggi
aafd032d-c00f-417b-9263-77f6fd37493c	Perpustakaan Modern	https://ik.imagekit.io/ctvvdwhk0/sis/facilities/image-1756623988232_GIPeCiWsK.png	2025-08-31 07:01:05.499	2025-08-31 13:49:50.156	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Koleksi lebih dari 10.000 buku dan akses ke perpustakaan digital
513e0425-646f-49b9-a5eb-5bead828ba49	Aula Serbaguna	https://ik.imagekit.io/ctvvdwhk0/sis/facilities/image-1756648243939_Z5qvDQfvu.png	2025-08-31 13:50:47.129	2025-08-31 13:50:47.129	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Aula berkapasitas 500 orang untuk berbagai kegiatan sekolah
e0d6f197-50cd-4964-9709-81605cfb80d7	Kantin Sehat	https://ik.imagekit.io/ctvvdwhk0/sis/facilities/image-1756648286976_erUavBOdUi.png	2025-08-31 13:51:30.236	2025-08-31 13:51:30.236	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Kantin dengan menu makanan sehat dan bergizi
0d90dae9-7da0-43a6-b641-cc3d22b063d4	Lapangan Olahraga	https://ik.imagekit.io/ctvvdwhk0/sis/facilities/image-1756648338992_L2WCkiIlD.png	2025-08-31 13:52:24.707	2025-08-31 13:52:24.707	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Lapangan basket, voli, dan sepak bola dengan standar internasional
\.


--
-- Data for Name: galleries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.galleries (id, title, image, created_at, updated_at, created_by, updated_by, description) FROM stdin;
25c53d76-bad1-42c3-9bb7-b975839a5fde	Upacara Bendera	https://ik.imagekit.io/ctvvdwhk0/sis/gallery/image-1756629174978_vsO7XdlS4.png	2025-08-31 08:33:13.109	2025-08-31 14:07:05.033	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Kegiatan upacara bendera setiap hari Senin
780efd2d-c192-47ea-b814-8a905eeb42ef	Laboratorium Kimia	https://ik.imagekit.io/ctvvdwhk0/sis/gallery/image-1756649245141_lHhIOacJH.png	2025-08-31 14:07:29.059	2025-08-31 14:07:29.059	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Fasilitas laboratorium kimia yang modern
c961f54d-56ff-473c-a087-5503738a5286	Perpustakaan Digital	https://ik.imagekit.io/ctvvdwhk0/sis/gallery/image-1756649270983_NVU-lDwul.png	2025-08-31 14:07:53.968	2025-08-31 14:07:53.968	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Perpustakaan dengan koleksi buku digital terlengkap
c2cbe124-584e-49d4-aa64-867adaa50b76	Kegiatan Pembelajaran	https://ik.imagekit.io/ctvvdwhk0/sis/gallery/image-1756649298912_WsGTtfkev.png	2025-08-31 14:08:21.881	2025-08-31 14:08:21.881	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Suasana pembelajaran yang kondusif dan interaktif
b36f9d45-0752-421c-9644-74ce8a7c2c87	Lapangan Olahraga	https://ik.imagekit.io/ctvvdwhk0/sis/gallery/image-1756649333331_JsqfdddLy.png	2025-08-31 14:08:56.622	2025-08-31 14:08:56.622	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	Lapangan olahraga yang luas dan terawat
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, school_name, address, description, accreditation, contact, history, vision, mission, created_at, updated_at, logo, created_by, updated_by) FROM stdin;
a20c3953-8869-4937-8d1c-316013831f65	SD NEGERI 2 MAWASANGKA	Jl. Pendidikan No. 123, Mawasangka, Sulawesi Tenggara	Sekolah unggulan yang mengutamakan pendidikan berkualitas dengan fasilitas modern dan tenaga pengajar yang kompeten untuk menciptakan generasi penerus bangsa yang cerdas dan berkarakter.	A	+62 401 3241234	Didirikan pada tahun 1985, SD NEGERI 2 MAWASANGKA telah menjadi salah satu sekolah terbaik di Sulawesi Tenggara dengan berbagai prestasi akademik dan non-akademik.	Menjadi sekolah yang unggul, berkarakter, dan berwawasan global dalam mencetak generasi yang cerdas dan berakhlak mulia.	Menyelenggarakan pendidikan berkualitas, mengembangkan potensi siswa secara optimal, dan menciptakan lingkungan belajar yang kondusif dan inovatif.	2025-08-31 03:30:05.52	2025-08-31 13:28:20.896	https://ik.imagekit.io/ctvvdwhk0/sis/logo/logo-1756611000911_EooLzl2ve.jpeg	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c	dc3f7ab5-59db-4a01-b5f7-4c6dd906c44c
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (id);


--
-- Name: galleries galleries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galleries
    ADD CONSTRAINT galleries_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: activities_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX activities_id_key ON public.activities USING btree (id);


--
-- Name: admins_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX admins_id_key ON public.admins USING btree (id);


--
-- Name: admins_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX admins_username_key ON public.admins USING btree (username);


--
-- Name: announcements_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX announcements_id_key ON public.announcements USING btree (id);


--
-- Name: facilities_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX facilities_id_key ON public.facilities USING btree (id);


--
-- Name: galleries_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX galleries_id_key ON public.galleries USING btree (id);


--
-- Name: profiles_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (id);


--
-- Name: activities activities_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: activities activities_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: announcements announcements_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: announcements announcements_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: facilities facilities_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: facilities facilities_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: galleries galleries_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galleries
    ADD CONSTRAINT galleries_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: galleries galleries_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galleries
    ADD CONSTRAINT galleries_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: profiles profiles_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: profiles profiles_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict Qbm0aJQGBEcuz6b49L00NIERv1RwQUS0owGl1ZLZNABGKv9p205JMTsobgkBA6q


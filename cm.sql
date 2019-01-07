-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 18, 2018 at 05:00 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `cm`
--

-- --------------------------------------------------------

--
-- Table structure for table `credit`
--

CREATE TABLE `credit` (
  `creditid` int(10) UNSIGNED NOT NULL,
  `songid` int(10) UNSIGNED NOT NULL,
  `credit_typeid` smallint(5) UNSIGNED NOT NULL,
  `description` varchar(500) NOT NULL,
  `crediteeid` int(10) UNSIGNED NOT NULL,
  `creditee_ailias` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `flags`
--

CREATE TABLE `flags` (
  `songid` int(10) UNSIGNED NOT NULL,
  `submitted` date NOT NULL,
  `username` varchar(100) NOT NULL,
  `flag_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `flags`
--

INSERT INTO `flags` (`songid`, `submitted`, `username`, `flag_type`) VALUES
(301, '2018-12-17', 'Array', 'multiple-in-one');

-- --------------------------------------------------------

--
-- Table structure for table `link`
--

CREATE TABLE `link` (
  `songid` int(11) NOT NULL,
  `sc_link` varchar(500) DEFAULT NULL,
  `yt_link` varchar(50) DEFAULT NULL,
  `spot_link` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `link`
--

INSERT INTO `link` (`songid`, `sc_link`, `yt_link`, `spot_link`) VALUES
(1, 'sirdouglasfresh/sir-douglas-fresh-awake-with-a-dedication', 'Fd-OjWW5DwY', '05ujUIwh4HOW7RaahG6rqd'),
(2, NULL, 'z6wjKlZjYfQ', '1LuOcOk3H8qdWctJC80JQN');

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `songid` int(11) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(100) NOT NULL,
  `lat` decimal(8,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `mood` varchar(30) DEFAULT NULL,
  `genre` varchar(40) NOT NULL,
  `format` varchar(30) DEFAULT NULL,
  `cxc_views` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `ups` int(10) UNSIGNED DEFAULT '0',
  `sc_link` varchar(126) DEFAULT NULL,
  `yt_link` varchar(50) DEFAULT NULL,
  `spot_link` varchar(50) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`songid`, `created`, `username`, `lat`, `lng`, `mood`, `genre`, `format`, `cxc_views`, `ups`, `sc_link`, `yt_link`, `spot_link`, `title`) VALUES
(222, '2018-11-16 22:10:17', '1', '-17.404373', '-66.223526', 'light', 'hip-hop', NULL, 13, 4, NULL, 'Ygo5VcMGMCs', NULL, 'Chillhop Yearmix 2017 • jazz & lofi hiphop'),
(228, '2018-11-16 23:11:38', '1', '-17.403882', '-66.232796', 'chill', 'pop', NULL, 8, 23, 'dae_zhen/friday', 'e5zZVOPzn3A', NULL, '432 Hz - Ambient Angelic Music ➤ Manifesting Harmony, Peace & Happiness | Deep Theta Binaural Beat'),
(230, '2018-11-17 00:06:45', '1', '-17.388648', '-66.179409', 'party', 'pop', NULL, 10, 2, 'harlem_fetty/fetty-wap-trap-queen-rough', '3hxvULliUa0', NULL, '432 Hz Destroy Unconscious Blockages & Fear, Binaural Beats'),
(231, '2018-11-17 00:07:43', '1', '-17.415307', '-66.162500', 'light', 'pop', NULL, 6, 44444, 'lil-dicky/freaky-friday-feat-chris-brown', NULL, NULL, 'Freaky Friday (feat. Chris Brown) by Lil Dicky'),
(233, '2018-11-25 16:21:29', '1', '-17.425994', '-66.199150', 'energizing', 'hip-hop', 'song', 12, 444, NULL, NULL, '05ujUIwh4HOW7RaahG6rqd', 'Mystery Spotify Song'),
(234, '2018-11-27 19:32:12', '1', '-17.434511', '-66.250305', 'energizing', 'hip-hop', 'instrumental', 12, 2, 'aymanx/hundreds22', NULL, NULL, 'Hundreds by aymanx'),
(236, '2018-11-28 21:41:07', '1', '-17.377180', '-66.206360', 'emo', 'hip-hop', 'instrumental', 16, 1, NULL, 'n-SzLWLlRHA', NULL, '[Free] \"Noire\" - Tory Lanez x Young Thug Type Beat | Wxlfstealth & Delariva'),
(237, '2018-11-28 21:44:23', '1', '-17.377180', '-66.206360', 'emo', 'hip-hop', 'preview', 4, 0, NULL, 'rnu6IVNjMKw', NULL, '\"Darkfall (Intro)\" - DzC & Isaiah Farmer'),
(238, '2018-11-28 21:52:49', '1', '-17.428287', '-66.098213', 'chill', 'hip-hop', 'instrumental', 22, 1, NULL, '_2Pe7CMlW-c', NULL, '\"3:47\" - Isaiah Farmer'),
(239, '2018-11-28 22:02:01', '1', '-17.392579', '-66.130142', 'chill', 'hip-hop', 'song', 29, 32, NULL, '9t6jwBP8T7E', NULL, '\"Yellowtape\" - DzC, Isaiah Farmer, & JAI'),
(240, '2018-11-28 22:33:36', '1', '-17.478397', '-66.296310', 'happy', 'hip-hop', 'instrumental', 1, 0, NULL, 'N858PlUyvg4', NULL, '[Free] '),
(241, '2018-11-28 22:37:04', '1', '-17.372757', '-66.172714', 'joyful', 'hip-hop', 'instrumental', 6, 0, NULL, 'X7BsS-V7Ks8', NULL, '[Free] \"Travelers.\" - Kanye West x Travis Scott Type Beat | Wxlfstealth x GodR'),
(242, '2018-11-28 22:38:12', '1', '-17.362435', '-66.112289', 'chill', 'hip-hop', 'instrumental', 38, 24, NULL, 'YC6rrGL2iEw', NULL, '[Free] \"Weekend\" - Tory Lanez x Travis Scott ft. The Weeknd Type Beat | Wxlfstealth'),
(243, '2018-12-03 15:09:01', '1', '-22.024546', '-67.631836', 'angry', 'blues-soul', 'instrumental', 17, 0, NULL, 'eZ035TTG574', NULL, 'Awon & Phoniks - The Actual Proof [Full Album]'),
(244, '2018-12-03 19:23:33', '1', '41.286062', '-69.807129', 'angry', 'country', 'song', 61, 8, NULL, 'oTl5Zopx4os', NULL, 'Phoniks - Down To Earth [Full Album]'),
(245, '2018-12-05 01:00:52', '1', '-55.776573', '-17.578125', 'happy', 'edm', 'album', 44, 0, NULL, 'e05rLVZQKiU', NULL, 'Tommy Guerrero - No Mans Land [Full Album]'),
(247, '2018-12-05 01:07:38', '1', '-17.340479', '-65.950756', 'chill', 'hip-hop', 'song', 0, 0, NULL, 'We1a2_mtupg', NULL, NULL),
(248, '2018-12-05 01:14:03', '1', '-47.159840', '-90.878906', 'chill', 'hip-hop', 'song', 12, 1, NULL, 'yiGweP--BRs', NULL, '639 Hz ❯ Attract Love ❯ Raise Positive Energy ❯ Marimba Meditation Music'),
(249, '2018-12-05 01:21:51', '1', '-84.052561', '35.859375', 'chill', 'hip-hop', 'song', 0, 0, NULL, '_yltbaXRoVM', NULL, NULL),
(250, '2018-12-05 01:24:50', '1', '-73.824820', '287.578125', 'chill', 'hip-hop', 'song', 6, 0, NULL, 'K_i4ZmRcKvY', NULL, NULL),
(252, '2018-12-05 01:28:25', '1', '-17.340479', '-65.950756', 'chill', 'hip-hop', 'song', 18, 0, NULL, '6wcKCdpelaU', NULL, 'Philanthrope - Waking Dreams [Full BeatTape]'),
(253, '2018-12-05 01:29:26', '1', '-62.915233', '-299.531250', 'chill', 'hip-hop', 'song', 5, 0, NULL, 'bmvlKWRe18o', NULL, NULL),
(256, '2018-12-05 01:38:58', '1', '-62.915233', '-837.421875', 'chill', 'hip-hop', 'song', 0, 0, NULL, 'MWcf_ZkYJhY', NULL, NULL),
(257, '2018-12-05 01:40:33', '1', '37.718590', '-686.953125', 'chill', 'hip-hop', 'song', 2, 0, NULL, 'M8HDvTuctOU', NULL, NULL),
(259, '2018-12-05 01:43:29', '1', '-80.058050', '-238.359375', 'chill', 'hip-hop', 'song', 0, 0, NULL, 'dERHuusmoNc', NULL, NULL),
(260, '2018-12-05 01:45:08', '1', '-78.767792', '-348.046875', 'chill', 'world', 'song', 1, 0, NULL, 'RHyFFHa3eIk', NULL, NULL),
(261, '2018-12-05 01:46:22', '1', '-29.535230', '211.640625', 'chill', 'conscious', 'song', 3, 1, NULL, 'K_2NKYExRkE', NULL, NULL),
(262, '2018-12-05 01:47:39', '1', '44.087585', '-322.031250', 'chill', 'hip-hop', 'song', 11, 1, NULL, 'rLhrfCZROlQ', NULL, NULL),
(263, '2018-12-05 01:51:16', '1', '4.915833', '-277.031250', 'chill', 'hip-hop', 'song', 10, 0, NULL, '5AEbq6X33A8', NULL, NULL),
(264, '2018-12-05 01:52:26', '1', '41.508577', '-432.421875', 'chill', 'hip-hop', 'song', 6, 0, NULL, 'fZwWQhfwjK0', NULL, NULL),
(268, '2018-12-06 13:27:00', '1', '21.289374', '-200.390625', 'chill', 'classical', 'song', 5, 0, NULL, '3EEcVA4670o', NULL, 'cozy chillhop radio 24/7 - chill study/relax/gaming beats '),
(269, '2018-12-06 13:30:13', '1', '-26.431228', '-580.781250', 'chill', 'hip-hop', 'song', 25, 1, NULL, 'aDK7-pzzXvo', NULL, NULL),
(270, '2018-12-06 17:07:23', '1', '-33.137551', '-339.257813', 'chill', 'hip-hop', 'song', 6, 4, 'adonisthegreek/no-lie-prod-al-x-x-thom-genius', NULL, NULL, NULL),
(271, '2018-12-06 18:52:27', '1', '-38.822591', '-503.437500', 'chill', 'hip-hop', 'song', 7, 0, NULL, 'a8bOg1IOcBc', NULL, NULL),
(272, '2018-12-07 14:24:22', '1', '-48.690960', '-140.976563', 'chill', 'pop', 'song', 14, 0, NULL, NULL, '5p7ujcrUXASCNwRaWNHR1C', 'Without Me'),
(273, '2018-12-07 15:18:05', '1', '7.710992', '-77.871094', 'chill', 'hip-hop', 'song', 77, 11, NULL, 'p8UKhq2HjvY', NULL, 'INDIAN FLUTE MUSIC ┇No Loops┇Just Pure Positive Energy Meditation Music'),
(274, '2018-12-08 02:04:05', '1', '78.490552', '-412.734375', 'chill', 'hip-hop', 'song', 50, 0, NULL, 'OxKnO9GzgQM', NULL, NULL),
(275, '2018-12-08 17:11:09', '1', '-64.244595', '-60.117188', '', '', 'livesong', 20, 0, NULL, '8xiGTLynSo8', NULL, 'Thievery Corporation - Sounds From the Thievery Hi-Fi [Full Album Stream]'),
(281, '2018-12-10 16:34:41', '1', '28.488005', '-81.502075', 'happy', 'hip-hop', 'song', 16, 0, 'max-wassen/psa-final-master', 'k8q9OhJ9XtA', '2lVtDKAu3BDKoNwp8Lk2tA', 'Max Wassen - PSA (tripping)'),
(282, '2018-12-10 18:37:25', '1', '-17.365712', '-66.309700', 'trance', 'conscious', 'album', 30, 0, NULL, 'op1wkW_Nieo', NULL, 'Handpan Music with Binaural Beats for Focus and Concentration, Focus Music, Study Music'),
(283, '2018-12-11 01:47:49', '1', '-17.535368', '-66.242065', 'chill', 'conscious', 'song', 24, 1, NULL, 'N0LZ20ppkNo', NULL, 'Tommy Guerrero - Road to Knowhere [Full Album]'),
(285, '2018-12-11 21:41:03', '1', '38.685510', '-4.394531', 'chill', 'pop', 'song', 39, 6, 'docdaneeka/doc-daneeka-abigail-wyles', NULL, NULL, 'Doc Daneeka & Abigail Wyles - Tobyjug (TTY007) by Doc Daneeka'),
(286, '2018-12-12 01:04:39', '1', '63.704722', '-18.632813', 'heavy', 'edm', 'song', 20, 9, 'goldchildmusic/dark_matter', NULL, NULL, 'Dark Matter by Golden Child'),
(287, '2018-12-12 02:25:42', '1', '37.160317', '88.945313', 'light', 'conscious', 'song', 4, 0, NULL, 'cyBBZGfUnMs', NULL, 'Healing Chinese ZEN music of Anxiety & Stress | To pacify the body & Mind | Relax Music'),
(288, '2018-12-12 02:57:38', '1', '50.289339', '87.890625', 'light', 'country', 'song', 3, 0, NULL, 'oJuP-4Hsvkg', NULL, 'Inner Ocean Records Present: BLESS Vol. 2 [Full BeatTape]'),
(289, '2018-12-12 03:22:01', '1', '37.718590', '141.328125', 'chill', 'pop', 'song', 16, 1, 'foxyj360/never-gonna-quit', NULL, NULL, 'Maestro- Never Gonna Quit by Foxy J'),
(290, '2018-12-12 03:39:33', '1', '64.774125', '49.570313', 'chill', 'hip-hop', 'song', 5, 1, 'kieran_prince/keep-on-moving', NULL, NULL, 'Keep On Moving by Kieran_Prince'),
(291, '2018-12-15 04:21:16', '1', '40.775992', '-74.093342', 'chill', 'hip-hop', 'song', 7, 3, NULL, 'c_IVcbEez8o', NULL, 'lofi hip hop radio - beats to sleep/relax to '),
(292, '2018-12-15 04:24:28', '1', '40.765722', '-74.101582', 'chill', 'hip-hop', 'song', 5, 1, NULL, 'yrmftUvH0x4', NULL, 'Smoke & Study 2 | Chill Mix'),
(293, '2018-12-15 18:41:25', '1', '68.399180', '-45.000000', 'energizing', 'rock', 'album', 5, 0, NULL, '-gXrS6eKfjk', NULL, 'The Sound Defects - The Iron Horse [Full album]'),
(294, '2018-12-16 18:39:39', '1', '-32.960282', '-60.739632', 'energizing', 'blues-soul', 'song', 8, 0, NULL, 'tYO5STzXxC0', NULL, 'Emapea - Jazzy Tape [Full BeatTape]'),
(295, '2018-12-16 18:40:47', '1', '-32.964315', '-60.664787', 'energizing', 'blues-soul', 'song', 7, 0, NULL, 'KzFkN-1-gjA', NULL, 'Flamingosis - Pleasure Palette (Full Album)'),
(296, '2018-12-16 18:42:02', '1', '-32.925996', '-60.669250', 'emo', 'rock', 'song', 7, 0, NULL, '4IJFIAQ_aiY', NULL, 'Mujo情 - Autumn Joints [Full BeatTape]'),
(297, '2018-12-16 18:43:02', '1', '-32.945301', '-60.700493', 'angry', 'classical', 'song', 3, 0, NULL, 'fiaq2dgkbyw', NULL, 'A Fall Journey... '),
(298, '2018-12-17 17:06:35', '1', '-32.949119', '-60.682554', 'happy', 'jazz', 'song', 54, 1, 'engelwoodmusic/brazil', 'cvv2nB6bi-0', '1wjzpz6veq4AnQpsFxqWXX', 'engelwood - brazil'),
(301, '2018-12-18 02:28:33', '1', '-71.524909', '-7.734375', 'chill', 'hip-hop', 'song', 5, 0, NULL, 'yrmfuUvH0x4', NULL, NULL),
(302, '2018-12-18 06:16:14', 'douglasjames', '-15.834536', '-70.620117', 'happy', 'edm', 'song', 0, 0, NULL, 'AXW2PbDDa3c', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `song_meta`
--

CREATE TABLE `song_meta` (
  `songid` int(10) UNSIGNED NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `steem_author` varchar(100) DEFAULT NULL,
  `permalink` varchar(500) DEFAULT NULL,
  `checked` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `song_meta`
--

INSERT INTO `song_meta` (`songid`, `title`, `steem_author`, `permalink`, `checked`) VALUES
(236, '[Free] \"Noire\" - Tory Lanez x Young Thug Type Beat | Wxlfstealth & Delariva', 'douglasjames', 'free-noire-tory-lanez-x-young-thug-type-beat-or-wxlfstealth-and-delariva', 0),
(246, 'Tommy Guerrero : Lifeboats And Follies 2011 - Full Album', 'douglasjames', 'tommy-guerrero-lifeboats-and-follies-2011-full-album', 0),
(266, 'Coubo - Selcouth [Full Beat Tape]', 'douglasjames', 'coubo-selcouth-full-beat-tape', 0),
(272, 'Mystery Spotify Song', 'douglasjames', 'mystery-spotify-song', 0),
(275, 'Thievery Corporation - Sounds From the Thievery Hi-Fi [Full Album Stream]', 'douglasjames', 'thievery-corporation-sounds-from-the-thievery-hi-fi-full-album-stream', 0),
(276, 'For The Record [Prod. Glassic] by Danny Diamonds', 'douglasjames', 'for-the-record-prod-glassic-by-danny-diamonds', 0),
(281, 'Max Wassen - PSA (tripping)', 'douglasjames', 'max-wassen-psa-tripping', 0),
(282, 'Handpan Music with Binaural Beats for Focus and Concentration, Focus Music, Study Music', 'douglasjames', 'handpan-music-with-binaural-beats-for-focus-and-concentration-focus-music-study-music', 0),
(283, 'Tommy Guerrero - Road to Knowhere [Full Album]', 'douglasjames', 'tommy-guerrero-road-to-knowhere-full-album', 0),
(285, 'Doc Daneeka & Abigail Wyles - Tobyjug (TTY007) by Doc Daneeka', 'currentxchange', 'doc-daneeka-and-abigail-wyles-tobyjug-tty007-by-doc-daneeka', 0),
(286, 'Dark Matter by Golden Child', 'douglasjames', 'dark-matter-by-golden-child', 0),
(287, 'Healing Chinese ZEN music of Anxiety & Stress | To pacify the body & Mind | Relax Music', 'douglasjames', 'healing-chinese-zen-music-of-anxiety-and-stress-or-to-pacify-the-body-and-mind-or-relax-music', 0),
(289, 'Maestro- Never Gonna Quit by Foxy J', 'currentxchange', 'maestro-never-gonna-quit-by-foxy-j', 0),
(292, 'Smoke & Study 2 | Chill Mix', 'douglasjames', 'smoke-and-study-2-or-chill-mix', 0),
(293, 'The Sound Defects - The Iron Horse [Full album]', 'douglasjames', 'the-sound-defects-the-iron-horse-full-album', 0),
(296, 'Mujo情 - Autumn Joints [Full BeatTape]', 'currentxchange', 'mujo-autumn-joints-full-beattape', 0);

-- --------------------------------------------------------

--
-- Table structure for table `song_song_rel`
--

CREATE TABLE `song_song_rel` (
  `ssrid` int(10) UNSIGNED NOT NULL,
  `song_1_id` int(10) UNSIGNED NOT NULL,
  `song_2_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sc_channel` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `yt_channel` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spot_channel` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `steemname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `preffered_alias` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `created`, `sc_channel`, `yt_channel`, `spot_channel`, `steemname`, `birthday`, `preffered_alias`) VALUES
(1, '2018-10-27 16:24:31', 'sirdouglasfresh', NULL, '4seBsQrvamB7bbQ2UIftxU', 'douglasjames', '1992-04-17', 'Ammon'),
(2, '2018-10-27 16:24:31', NULL, 'UCBjTUosp2R_FN6AFdHV-v-Q', NULL, 'currentxchange', '1992-04-20', 'cXc');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `credit`
--
ALTER TABLE `credit`
  ADD PRIMARY KEY (`creditid`);

--
-- Indexes for table `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`songid`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`songid`),
  ADD UNIQUE KEY `yt_link` (`yt_link`),
  ADD UNIQUE KEY `spot_link` (`spot_link`),
  ADD UNIQUE KEY `sc_link` (`sc_link`);

--
-- Indexes for table `song_meta`
--
ALTER TABLE `song_meta`
  ADD PRIMARY KEY (`songid`);

--
-- Indexes for table `song_song_rel`
--
ALTER TABLE `song_song_rel`
  ADD PRIMARY KEY (`ssrid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD KEY `userid` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `songid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;
--
-- AUTO_INCREMENT for table `song_song_rel`
--
ALTER TABLE `song_song_rel`
  MODIFY `ssrid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

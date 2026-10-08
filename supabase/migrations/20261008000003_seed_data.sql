-- Migration: 20261008000003_seed_data.sql
-- Description: Realistic initial seed dataset for The Chronicle publication (Valid Hex UUIDs)

-- 1. CATEGORIES
INSERT INTO public.categories (id, name, slug, description) VALUES
    ('10000000-0000-0000-0000-000000000001', 'Hollywood', 'hollywood', 'Studio system, box office milestones, guild negotiations, and major theatrical releases.'),
    ('10000000-0000-0000-0000-000000000002', 'Bollywood', 'bollywood', 'Pan-India cinema, multilingual box office metrics, and South Asian entertainment industries.'),
    ('10000000-0000-0000-0000-000000000003', 'Celebrities', 'celebrities', 'Talent dossiers, high-profile cast commitments, agency filings, and guild registers.'),
    ('10000000-0000-0000-0000-000000000004', 'Movies', 'movies', 'Theatrical release calendar, reviews, production pipelines, and festival dispatches.'),
    ('10000000-0000-0000-0000-000000000005', 'TV & OTT', 'tv-ott', 'Global streaming platforms, subscriber metrics, episodic greenlights, and licensing accords.'),
    ('10000000-0000-0000-0000-000000000006', 'Gaming', 'gaming', 'AAA studios, hardware cycles, publisher disclosures, and game director interviews.'),
    ('10000000-0000-0000-0000-000000000007', 'Trailers', 'trailers', 'Curated teasers, official full-length theatrical trailers, and gameplay premieres.'),
    ('10000000-0000-0000-0000-000000000008', 'Reviews', 'reviews', 'Authoritative critical verdicts on theatrical, streaming, and interactive releases.')
ON CONFLICT (slug) DO NOTHING;

-- 2. SOURCES
INSERT INTO public.sources (id, name, slug, domain, base_url, source_type, credibility_tier, is_active) VALUES
    ('20000000-0000-0000-0000-000000000001', 'Variety', 'variety', 'variety.com', 'https://variety.com', 'publication', 2, true),
    ('20000000-0000-0000-0000-000000000002', 'Deadline Hollywood', 'deadline', 'deadline.com', 'https://deadline.com', 'publication', 2, true),
    ('20000000-0000-0000-0000-000000000003', 'The Hollywood Reporter', 'hollywood-reporter', 'hollywoodreporter.com', 'https://www.hollywoodreporter.com', 'publication', 2, true),
    ('20000000-0000-0000-0000-000000000004', 'Reuters Entertainment', 'reuters-entertainment', 'reuters.com', 'https://www.reuters.com', 'publication', 1, true),
    ('20000000-0000-0000-0000-000000000005', 'IGN', 'ign', 'ign.com', 'https://www.ign.com', 'publication', 2, true),
    ('20000000-0000-0000-0000-000000000006', 'Warner Bros. Discovery Press', 'warner-bros-press', 'wbd.com', 'https://wbd.com/newsroom', 'official', 1, true),
    ('20000000-0000-0000-0000-000000000007', 'Sony Interactive Entertainment', 'sie-press', 'playstation.com', 'https://www.playstation.com', 'official', 1, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. PEOPLE
INSERT INTO public.people (id, name, slug, role, bio, image_url) VALUES
    ('30000000-0000-0000-0000-000000000001', 'Christopher Nolan', 'christopher-nolan', 'Director / Writer / Producer', 'Academy Award-winning filmmaker known for Oppenheimer, Inception, and Interstellar.', 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop'),
    ('30000000-0000-0000-0000-000000000002', 'Shah Rukh Khan', 'shah-rukh-khan', 'Actor / Producer', 'Globally celebrated Indian superstar with unprecedented historic pan-India box office milestones.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'),
    ('30000000-0000-0000-0000-000000000003', 'Zendaya', 'zendaya', 'Actress / Producer', 'Emmy Award-winning performer leading Dune: Part Two, Euphoria, and upcoming theatrical features.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'),
    ('30000000-0000-0000-0000-000000000004', 'Hideo Kojima', 'hideo-kojima', 'Game Director / Studio Head', 'Visionary creator behind Metal Gear Solid and Death Stranding, heading Kojima Productions.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'),
    ('30000000-0000-0000-0000-000000000005', 'Cillian Murphy', 'cillian-murphy', 'Actor', 'Academy Award winner acclaimed for Oppenheimer, Peaky Blinders, and 28 Years Later.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop')
ON CONFLICT (slug) DO NOTHING;

-- 4. MOVIES
INSERT INTO public.movies (id, title, slug, overview, poster_url, release_date, director) VALUES
    ('40000000-0000-0000-0000-000000000001', 'Oppenheimer', 'oppenheimer', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop', '2023-07-21', 'Christopher Nolan'),
    ('40000000-0000-0000-0000-000000000002', 'Dune: Part Two', 'dune-part-two', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop', '2024-03-01', 'Denis Villeneuve'),
    ('40000000-0000-0000-0000-000000000003', 'Jawan', 'jawan', 'A high-octane action thriller outlining the emotional journey of a man who is set out to rectify the wrongs in the society.', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', '2023-09-07', 'Atlee'),
    ('40000000-0000-0000-0000-000000000004', 'Gladiator II', 'gladiator-ii', 'Years after witnessing the death of Maximus, Lucius must enter the Colosseum after his home is conquered.', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop', '2024-11-22', 'Ridley Scott'),
    ('40000000-0000-0000-0000-000000000005', 'Avatar: Fire and Ash', 'avatar-fire-and-ash', 'The third installment in James Cameron expansive sci-fi franchise exploring Pandora ash clans.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', '2025-12-19', 'James Cameron')
ON CONFLICT (slug) DO NOTHING;

-- 5. TV SHOWS
INSERT INTO public.tv_shows (id, title, slug, overview, poster_url, release_date, network) VALUES
    ('50000000-0000-0000-0000-000000000001', 'The Last of Us', 'the-last-of-us', 'Post-apocalyptic drama exploring survival, parenthood, and fungal pathogens in ruins of civilization.', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', '2023-01-15', 'HBO / Max'),
    ('50000000-0000-0000-0000-000000000002', 'Succession', 'succession', 'The Roy family is known for controlling the biggest media and entertainment company in the world.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', '2018-06-03', 'HBO'),
    ('50000000-0000-0000-0000-000000000003', 'Stranger Things', 'stranger-things', 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments and supernatural forces.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop', '2016-07-15', 'Netflix')
ON CONFLICT (slug) DO NOTHING;

-- 6. GAMES
INSERT INTO public.games (id, title, slug, overview, cover_url, release_date, developer, publisher) VALUES
    ('60000000-0000-0000-0000-000000000001', 'Death Stranding 2: On The Beach', 'death-stranding-2', 'Sam Porter Bridges embarks on an inspiring journey across international wilderness beyond the UCA.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', '2025-06-01', 'Kojima Productions', 'Sony Interactive Entertainment'),
    ('60000000-0000-0000-0000-000000000002', 'Grand Theft Auto VI', 'grand-theft-auto-vi', 'Next-generation open-world crime thriller set across the neon-soaked streets of Vice City and beyond.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop', '2025-10-01', 'Rockstar North', 'Rockstar Games'),
    ('60000000-0000-0000-0000-000000000003', 'Final Fantasy VII Rebirth', 'final-fantasy-vii-rebirth', 'Cloud and his comrades escape Midgar into the wider planet in an epic reimagining of the classic RPG.', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop', '2024-02-29', 'Square Enix Creative Business Unit I', 'Square Enix'),
    ('60000000-0000-0000-0000-000000000004', 'Elden Ring: Shadow of the Erdtree', 'elden-ring-shadow-of-erdtree', 'Expansive dark fantasy adventure guided by Empyrean Miquella in the Land of Shadow.', 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop', '2024-06-21', 'FromSoftware', 'Bandai Namco'),
    ('60000000-0000-0000-0000-000000000005', 'Hollow Knight: Silksong', 'hollow-knight-silksong', 'Hornet battles through a vast, haunted kingdom ruled by silk and song.', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop', '2025-11-01', 'Team Cherry', 'Team Cherry')
ON CONFLICT (slug) DO NOTHING;

-- 7. COMPANIES
INSERT INTO public.companies (id, name, slug, company_type, website_url) VALUES
    ('70000000-0000-0000-0000-000000000001', 'Warner Bros. Discovery', 'warner-bros-discovery', 'Studio / Conglomerate', 'https://wbd.com'),
    ('70000000-0000-0000-0000-000000000002', 'Kojima Productions', 'kojima-productions', 'Game Studio', 'https://www.kojimaproductions.jp'),
    ('70000000-0000-0000-0000-000000000003', 'Red Chillies Entertainment', 'red-chillies-entertainment', 'Production House', 'https://www.redchillies.com'),
    ('70000000-0000-0000-0000-000000000004', 'A24', 'a24', 'Independent Studio', 'https://a24films.com'),
    ('70000000-0000-0000-0000-000000000005', 'Rockstar Games', 'rockstar-games', 'Game Publisher', 'https://www.rockstargames.com')
ON CONFLICT (slug) DO NOTHING;

-- 8. STORIES (12 Canonical Editorial Records)
INSERT INTO public.stories (
    id, slug, title, dek, summary, body, excerpt, category, subcategory,
    status, hero_image_url, thumbnail_url, author_name, published_at,
    is_published, is_featured, is_trending, read_time_minutes, source_count, verification_notes
) VALUES
-- LEAD STORY
(
    '80000000-0000-0000-0000-000000000001',
    'christopher-nolan-next-feature-imax-release-window',
    'Christopher Nolan Next Feature Sets IMAX Global Release Date & Multi-Studio Bidding War',
    'Exclusive: The Academy Award winner reunites with principal technical collaborators for an original large-format theatrical production scheduled for summer delivery.',
    'Senior production executives confirm that Christopher Nolan has locked principal camera testing and exclusive IMAX 70mm worldwide theatrical windows for his upcoming top-secret original feature.',
    'LOS ANGELES — Following the monumental Academy Award triumphs of Oppenheimer, director Christopher Nolan has finalized key technical pacts for his next ambitious cinematic undertaking.\n\nIndustry records filed with guild authorities indicate production will utilize bespoke large-format film stocks developed in partnership with IMAX laboratories. Principal photography is scheduled to span three continents under complete security seals.\n\nStudio heads who reviewed preliminary technical treatments note that Nolan remains uniquely committed to photochemically captured spectacle with minimal reliance on digital post-processing.',
    'Nolan locks principal camera testing and exclusive IMAX 70mm worldwide theatrical windows.',
    'Hollywood', 'Studio System', 'confirmed',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    'Jonathan Sterling', NOW() - INTERVAL '2 hours',
    true, true, true, 5, 4,
    'Corroborated across 4 primary studio filings, guild register notices, and IMAX technical exhibition reservations.'
),
-- SECONDARY LEAD 1
(
    '80000000-0000-0000-0000-000000000002',
    'sony-pictures-quentin-tarantino-curated-archive-pact',
    'Sony Pictures Acquires Global Distribution Rights for Quentin Tarantino Curated Archive Project',
    'The landmark studio partnership includes theatrical repertory restorations and exclusive behind-the-scenes 35mm prints across major festival hubs.',
    'Sony Pictures has sealed worldwide theatrical distribution rights for a series of restored 35mm and 70mm motion picture prints hand-curated and annotated by Quentin Tarantino.',
    'CULVER CITY — Sony Pictures Entertainment has confirmed an unprecedented distribution accord that pairs master cinematic preservation with modern theatrical presentation.\n\nThe pact establishes exclusive seasonal exhibition engagements across flagship heritage cinema palaces in Los Angeles, London, Tokyo, and Paris.',
    'Sony Pictures seals worldwide theatrical distribution for Tarantino curated archival restoration prints.',
    'Hollywood', 'Distribution', 'confirmed',
    'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop',
    'Victoria Vance', NOW() - INTERVAL '4 hours',
    true, false, false, 4, 3,
    'Confirmed via studio joint press wire disclosures and official repertory booking notices.'
),
-- SECONDARY LEAD 2
(
    '80000000-0000-0000-0000-000000000003',
    'hbo-the-last-of-us-season-3-extended-filming-schedule',
    'HBO Officially Commences Pre-Production on The Last of Us Season 3 with Extended Location Filming',
    'Showrunners Craig Mazin and Neil Druckmann confirm broader episodic architecture to honor the complex non-linear scale of Part II.',
    'HBO drama chiefs have greenlit comprehensive location scouting across Vancouver Island and Pacific Northwest forests as production schedules for The Last of Us Season 3 take shape.',
    'VANCOUVER — Following critical accolades and record ratings, HBO is expanding the physical production scope for the continuing adaptation of the award-winning Naughty Dog franchise.\n\nCrew call sheets indicate multiple concurrent photography units will document complex action sequences throughout Autumn and Winter seasons.',
    'HBO drama chiefs greenlight expanded location production for The Last of Us next chapter.',
    'TV & OTT', 'Production', 'confirmed',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    'Marcus Thorne', NOW() - INTERVAL '5 hours',
    true, false, true, 4, 3,
    'Verified with local British Columbia film commission permits and union notices.'
),
-- TRENDING 1
(
    '80000000-0000-0000-0000-000000000004',
    'denis-villeneuve-dune-messiah-script-treatment-update',
    'Denis Villeneuve Confirms Early Treatment Scripts Underway for Dune Messiah',
    'Legendary Pictures and Warner Bros. slate completion window following historical worldwide box office performance of Dune: Part Two.',
    'Director Denis Villeneuve indicates that script work on Dune Messiah has entered its advanced development phase, promising a definitive conclusion to Paul Atreides cinematic arc.',
    'MONTREAL — Speaking at an international cinematography symposium, filmmaker Denis Villeneuve revealed that thematic outlines for the third chapter of Frank Herbert saga are progressing rapidly.',
    'Villeneuve indicates that script treatments for Dune Messiah have entered advanced development.',
    'Hollywood', 'Development', 'reported',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    'Elena Rostova', NOW() - INTERVAL '6 hours',
    true, false, true, 3, 2,
    'Reported via symposium transcript records and Legendary developmental summaries.'
),
-- TRENDING 2 / BOLLYWOOD
(
    '80000000-0000-0000-0000-000000000005',
    'shah-rukh-khan-king-action-thriller-international-schedule',
    'Shah Rukh Khan & Suhana Khan Action Thriller King Locks International Filming Window',
    'Director Sujoy Ghosh and Red Chillies Entertainment mobilize stunt coordination teams in Budapest and London for high-budget thriller.',
    'Production units for King, starring Shah Rukh Khan and Suhana Khan, have finalized international shooting schedules spanning Eastern Europe and United Kingdom soundstages.',
    'MUMBAI — Red Chillies Entertainment has confirmed logistical arrangements for its upcoming tentpole action spectacle.\n\nStunt choreographers from prominent Western action franchises have been contracted to design practical vehicle chases and visceral combat sequences.',
    'Red Chillies Entertainment finalizes international location dates for action tentpole King.',
    'Bollywood', 'Pan-India', 'confirmed',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    'Devika Sharma', NOW() - INTERVAL '7 hours',
    true, false, true, 4, 3,
    'Corroborated through Mumbai guild registrations and European production dispatch filings.'
),
-- GAMING 1
(
    '80000000-0000-0000-0000-000000000006',
    'grand-theft-auto-vi-rockstar-second-broadcast-window',
    'Grand Theft Auto VI Trailer 2 Slated for Mid-Autumn Broadcast Window',
    'Industry analysts project record engagement as Rockstar Games prepares next gameplay deep-dive for Vice City return.',
    'Take-Two Interactive quarterly disclosures highlight upcoming marketing milestones as developer Rockstar Games enters polishing phases for Grand Theft Auto VI.',
    'NEW YORK — Publisher earnings call filings indicate major consumer engagement campaigns scheduled for late autumn, heralding the arrival of the highly anticipated second full trailer.',
    'Take-Two quarterly disclosures highlight impending marketing milestones for GTA VI.',
    'Gaming', 'AAA Industry', 'developing',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    'Alexander Cole', NOW() - INTERVAL '8 hours',
    true, false, true, 4, 2,
    'Derived from SEC financial reports, executive earnings conference disclosures, and marketing register bookings.'
),
-- GAMING 2
(
    '80000000-0000-0000-0000-000000000007',
    'death-stranding-2-hideo-kojima-audio-engine-breakthrough',
    'Death Stranding 2 On The Beach Showcases Spatial Acoustic Engine & Decima Refinements',
    'Kojima Productions details advanced procedural terrain deformation and real-time natural disaster systems in PlayStation 5 exclusive.',
    'Game Director Hideo Kojima has unveiled new technical breakdowns demonstrating real-time earthquake physics, flood dynamics, and full spatial binaural audio capture.',
    'TOKYO — At a specialized technical developer panel in Yokohama, Kojima Productions presented deep dives into their customized iteration of Guerrilla Games Decima Engine.',
    'Kojima Productions details real-time terrain physics and environmental disaster mechanics.',
    'Gaming', 'Tech Deep-Dive', 'confirmed',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    'Kenji Sato', NOW() - INTERVAL '10 hours',
    true, false, false, 5, 2,
    'Verified via official developer symposium stream and SIE technical press disclosures.'
),
-- BOLLYWOOD 2
(
    '80000000-0000-0000-0000-000000000008',
    'ss-rajamouli-mahesh-babu-globetrotting-action-epic',
    'SS Rajamouli & Mahesh Babu Jungle Adventure Epic Commences Scale Prototype Testing',
    'Following RRR global Oscar impact, director Rajamouli prepares high-concept African safari action spectacle with Hollywood VFX teams.',
    'Preliminary camera and VFX simulation teams have assembled in Hyderabad for the untitled action extravaganza colloquially titled SSMB29.',
    'HYDERABAD — Director S.S. Rajamouli has initiated intensive visual effects prototyping alongside international post-production facilities in London and New Zealand.',
    'VFX simulation teams assemble in Hyderabad for Rajamouli next international tentpole.',
    'Bollywood', 'Pan-India', 'confirmed',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    'Rohan Kulkarni', NOW() - INTERVAL '12 hours',
    true, false, false, 4, 3,
    'Corroborated with studio press statements and Telugu Film Chamber of Commerce production slips.'
),
-- CELEBRITIES 1
(
    '80000000-0000-0000-0000-000000000009',
    'zendaya-leading-auteur-cinema-production-slate',
    'Zendaya Expands Dual-Studio Footprint Across Independent Features and Global Franchises',
    'Talent bureau dossier reveals strategic producing credits alongside leading European directors for upcoming festival circuits.',
    'Emmy-winning performer and producer Zendaya continues her ascent through both auteur festival dramas and blockbuster global tentpoles.',
    'LOS ANGELES — Agency booking sheets confirm Zendaya has boarded two critically anticipated prestige projects with European financing accords.',
    'Agency booking sheets confirm Zendaya will headline prestige festival projects.',
    'Celebrities', 'Talent Dossier', 'confirmed',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    'Victoria Vance', NOW() - INTERVAL '14 hours',
    true, false, false, 3, 2,
    'Cross-verified through talent agency announcements and guild contract filings.'
),
-- MOVIES / REVIEWS 1
(
    '80000000-0000-0000-0000-000000000010',
    'gladiator-ii-ridley-scott-critical-consensus-box-office',
    'Gladiator II Early Exhibition Tracking Points to Major Overseas Theatrical Milestone',
    'Paramount Pictures unleashes epic Colosseum practical battles with Paul Mescal and Denzel Washington leading historical spectacle.',
    'Exhibitor trade forecasts project robust worldwide turnout for Ridley Scott long-anticipated Roman historical sequel.',
    'LONDON — Early distributor feedback highlights monumental battle set pieces filmed in Malta and Morocco with practical chariot reconstructions.',
    'Exhibitor trade forecasts project high-volume overseas turnout for Ridley Scott epic sequel.',
    'Movies', 'Box Office', 'confirmed',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    'Jonathan Sterling', NOW() - INTERVAL '16 hours',
    true, false, false, 4, 3,
    'Confirmed by international cinema circuit tracking bodies and studio distributor bulletins.'
),
-- TV / OTT 1
(
    '80000000-0000-0000-0000-000000000011',
    'stranger-things-season-5-final-run-times-revealed',
    'Stranger Things Season 5 Finale Expected to Exceed Feature-Length Run Time',
    'The Duffer Brothers finalize climatic Hawkins battles with cinema-quality sound mixing and extended episodic cuts on Netflix.',
    'Post-production sound mixing reports indicate that multiple episodes in the culminating season of Stranger Things will match feature film duration.',
    'ATLANTA — Studio soundstages have commenced final scoring sessions for the beloved sci-fi series culminating chapter.',
    'Post-production audio reports indicate feature-length scale for Stranger Things farewell.',
    'TV & OTT', 'Streaming', 'developing',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
    'Marcus Thorne', NOW() - INTERVAL '18 hours',
    true, false, false, 3, 2,
    'Reported via post-production union bulletins and editorial facility schedule sheets.'
),
-- GAMING 3
(
    '80000000-0000-0000-0000-000000000012',
    'final-fantasy-vii-part-3-story-framework-complete',
    'Square Enix Finalizes Core Narrative Draft for Final Fantasy VII Remake Trilogy Conclusion',
    'Director Naoki Hamaguchi and Tetsuya Nomura confirm seamless worldwide airship navigation system currently in engine testing.',
    'Creative leads at Square Enix have locked the principal scenario draft for the climactic final installment of the Final Fantasy VII Remake trilogy.',
    'TOKYO — In an official studio developer update, game director Naoki Hamaguchi confirmed that development has progressed significantly ahead of initial internal projections.',
    'Square Enix locks primary narrative scenario for Final Fantasy VII trilogy finale.',
    'Gaming', 'JRPG', 'confirmed',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
    'Kenji Sato', NOW() - INTERVAL '20 hours',
    true, false, false, 4, 2,
    'Confirmed via Square Enix official investor symposium transcript and developer interview releases.'
)
ON CONFLICT (slug) DO NOTHING;

-- 9. STORY SOURCES (Linking stories to publications)
INSERT INTO public.story_sources (story_id, source_id, source_url, source_title, is_primary) VALUES
    ('80000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'https://variety.com/nolan-next-feature-imax', 'Variety: Christopher Nolan Sets Next Project at Universal with IMAX Commitment', true),
    ('80000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'https://deadline.com/nolan-movie-filming-timeline', 'Deadline: Inside the Multi-Studio Race for Nolan Next Cinematic Vision', false),
    ('80000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'https://reuters.com/entertainment/nolan-film-deal', 'Reuters: Christopher Nolan Secures Broad 70mm Worldwide Release Windows', false),
    ('80000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', 'https://hollywoodreporter.com/sony-tarantino-deal', 'THR: Sony Acquires Tarantino Film Archives for Theatrical Repertory', true),
    ('80000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'https://deadline.com/the-last-of-us-season-3-plans', 'Deadline: The Last of Us Season 3 Filming Preparations Begin in Canada', true),
    ('80000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', 'https://variety.com/srk-king-suhana-khan-action', 'Variety: Shah Rukh Khan and Suhana Khan Action Thriller King Eyes London Filming', true),
    ('80000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000005', 'https://ign.com/articles/gta-6-take-two-earnings-fall-trailer-target', 'IGN: Take-Two Financials Reiterate Fall 2025 Target Window for GTA 6', true),
    ('80000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000007', 'https://playstation.com/death-stranding-2-decima-tech', 'PlayStation Blog: Behind Kojima Productions Decima Engine Advancements', true)
ON CONFLICT (story_id, source_url) DO NOTHING;

-- 10. STORY ENTITIES (Cross-indexing stories with entities)
INSERT INTO public.story_entities (story_id, entity_type, entity_id, relevance_score) VALUES
    ('80000000-0000-0000-0000-000000000001', 'person', '30000000-0000-0000-0000-000000000001', 1.0),
    ('80000000-0000-0000-0000-000000000001', 'company', '70000000-0000-0000-0000-000000000001', 0.8),
    ('80000000-0000-0000-0000-000000000003', 'tv_show', '50000000-0000-0000-0000-000000000001', 1.0),
    ('80000000-0000-0000-0000-000000000004', 'movie', '40000000-0000-0000-0000-000000000002', 1.0),
    ('80000000-0000-0000-0000-000000000004', 'person', '30000000-0000-0000-0000-000000000003', 0.9),
    ('80000000-0000-0000-0000-000000000005', 'person', '30000000-0000-0000-0000-000000000002', 1.0),
    ('80000000-0000-0000-0000-000000000005', 'company', '70000000-0000-0000-0000-000000000003', 0.9),
    ('80000000-0000-0000-0000-000000000006', 'game', '60000000-0000-0000-0000-000000000002', 1.0),
    ('80000000-0000-0000-0000-000000000006', 'company', '70000000-0000-0000-0000-000000000005', 0.9),
    ('80000000-0000-0000-0000-000000000007', 'game', '60000000-0000-0000-0000-000000000001', 1.0),
    ('80000000-0000-0000-0000-000000000007', 'person', '30000000-0000-0000-0000-000000000004', 1.0),
    ('80000000-0000-0000-0000-000000000007', 'company', '70000000-0000-0000-0000-000000000002', 0.9)
ON CONFLICT (story_id, entity_type, entity_id) DO NOTHING;

-- 11. TRAILERS
INSERT INTO public.trailers (id, title, video_url, thumbnail_url, platform, movie_id, game_id, published_at) VALUES
    ('90000000-0000-0000-0000-000000000001', 'Gladiator II | Official Teaser Trailer (Paramount Pictures)', 'https://www.youtube.com/watch?v=4rgYUipGJNo', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop', 'YouTube', '40000000-0000-0000-0000-000000000004', null, NOW() - INTERVAL '3 days'),
    ('90000000-0000-0000-0000-000000000002', 'Death Stranding 2: On The Beach | State of Play Presentation', 'https://www.youtube.com/watch?v=test', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', 'YouTube', null, '60000000-0000-0000-0000-000000000001', NOW() - INTERVAL '5 days'),
    ('90000000-0000-0000-0000-000000000003', 'Grand Theft Auto VI | Trailer 1 (Rockstar Games)', 'https://www.youtube.com/watch?v=QdBZY2fkU-0', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop', 'YouTube', null, '60000000-0000-0000-0000-000000000002', NOW() - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;

-- 12. RELEASE DATES
INSERT INTO public.release_dates (id, title, release_type, movie_id, game_id, platform, release_date, region) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Gladiator II Worldwide Release', 'Theatrical', '40000000-0000-0000-0000-000000000004', null, 'IMAX & Standard Theaters', '2024-11-22', 'Global'),
    ('a0000000-0000-0000-0000-000000000002', 'Death Stranding 2: On The Beach', 'Video Game', null, '60000000-0000-0000-0000-000000000001', 'PlayStation 5 Exclusive', '2025-06-01', 'Worldwide'),
    ('a0000000-0000-0000-0000-000000000003', 'Grand Theft Auto VI', 'Video Game', null, '60000000-0000-0000-0000-000000000002', 'PlayStation 5 / Xbox Series X|S', '2025-10-01', 'Worldwide')
ON CONFLICT (id) DO NOTHING;

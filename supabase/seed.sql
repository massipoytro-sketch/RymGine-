-- DeSiaVe Seed Data
-- Inserts default quests and bounty missions

insert into public.quests (id, title, category, description, reward_coins, reward_xp, reward_usd, icon, difficulty, max_progress, multiplier)
values
  ('q_01', 'Daily Check-In & Streak Boost', 'daily', 'Claim your consecutive day login streak bonus to earn double energy and coins.', 250, 120, 0.25, 'hfire', 'Easy', 1, 2),
  ('q_02', 'Complete 3 High-Yield Tasks', 'daily', 'Finish any three sponsored partner quests or surveys from the explore feed.', 1200, 450, 1.20, 'pv_loot', 'Medium', 3, 1),
  ('q_03', 'Unlock Dragon Vault Chest', 'special', 'Use your collected key fragments to crack open the legendary reward vault.', 3500, 1000, 3.50, 'chest', 'Legendary', 1, 3),
  ('q_04', 'Play Fantasy Arena (Level 5)', 'gaming', 'Install partner game and reach level 5 within 24 hours to claim huge reward.', 4800, 1600, 4.80, 'pv_cpx', 'Hard', 5, 1),
  ('q_05', 'Quick Opinion Survey (Tech)', 'survey', 'Answer 8 quick questions about mobile gaming preferences.', 850, 300, 0.85, 'pv_ot', 'Easy', 1, 1),
  ('q_06', 'Join DeSiaVe Discord Community', 'social', 'Connect with verified players, participate in weekly coin giveaways and tournaments.', 500, 200, 0.50, 'pv_tw', 'Easy', 1, 1)
on conflict (id) do nothing;

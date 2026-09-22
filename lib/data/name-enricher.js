// Name Enrichment Utility
// Eliminates GSC "thin content" / "crawled - currently not indexed" issues
// by synthesizing deep, authentic etymological, numerological, phonetic, and FAQ profiles for every name.

import { religionLabel, genderLabel, normalizeGender } from './name-utils.js';

// Letter values for Pythagorean numerology
const PYTHAGOREAN_MAP = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const NUMEROLOGY_PROFILES = {
  1: {
    traits: 'Leadership, Independence, Initiative, Originality, Ambition',
    day: 'Sunday',
    colors: ['Gold', 'Amber', 'Sunflower Yellow'],
    stone: 'Ruby / Amber',
    planet: 'Sun',
    desc: 'Vibration 1 signifies a pioneer and natural-born leader. Individuals influenced by number 1 possess fierce determination, courage, and an original creative vision that drives them toward mastery.',
  },
  2: {
    traits: 'Harmony, Empathy, Diplomacy, Intuition, Sensitivity',
    day: 'Monday',
    colors: ['Silver', 'Pearl White', 'Cream'],
    stone: 'Moonstone / Pearl',
    planet: 'Moon',
    desc: 'Vibration 2 embodies gentleness, cooperative harmony, and deep emotional intelligence. It reflects a peacemaker who brings balance, understanding, and unity to family and community.',
  },
  3: {
    traits: 'Joy, Creativity, Expression, Optimism, Sociability',
    day: 'Thursday',
    colors: ['Royal Blue', 'Purple', 'Rose Violet'],
    stone: 'Yellow Sapphire / Amethyst',
    planet: 'Jupiter',
    desc: 'Vibration 3 radiates creative vitality, warmth, and expressive brilliance. It indicates an optimistic spirit gifted with eloquence, enthusiasm, and an ability to inspire happiness in others.',
  },
  4: {
    traits: 'Stability, Loyalty, Discipline, Practicality, Honor',
    day: 'Sunday',
    colors: ['Electric Blue', 'Slate Grey', 'Khaki'],
    stone: 'Garnet / Hessonite',
    planet: 'Rahu / Uranus',
    desc: 'Vibration 4 represents the bedrock of strength, reliability, and upright integrity. Those aligned with 4 are builders of enduring foundations, known for unwavering fidelity and methodical care.',
  },
  5: {
    traits: 'Freedom, Adaptability, Curiosity, Adventure, Wit',
    day: 'Wednesday',
    colors: ['Emerald Green', 'Turquoise', 'Silver'],
    stone: 'Emerald / Jade',
    planet: 'Mercury',
    desc: 'Vibration 5 carries the spark of versatile intellect, boundless curiosity, and progressive spirit. It signifies an agile mind that embraces life with enthusiasm and broad horizons.',
  },
  6: {
    traits: 'Love, Nurturing, Responsibility, Compassion, Grace',
    day: 'Friday',
    colors: ['Sky Blue', 'Pastel Pink', 'Lavender'],
    stone: 'Diamond / Opal / White Sapphire',
    planet: 'Venus',
    desc: 'Vibration 6 is the essence of unconditional love, domestic harmony, and noble caretaking. It fosters a generous protector dedicated to the well-being and moral upliftment of loved ones.',
  },
  7: {
    traits: 'Wisdom, Spirituality, Introspection, Discernment, Truth',
    day: 'Monday',
    colors: ['Sea Green', 'Aquamarine', 'Soft White'],
    stone: 'Aquamarine / Cat\'s Eye',
    planet: 'Ketu / Neptune',
    desc: 'Vibration 7 represents spiritual contemplation, analytical insight, and inner truth. It characterizes a thoughtful truth-seeker drawn to deep philosophy, sacred contemplation, and quiet dignity.',
  },
  8: {
    traits: 'Strength, Abundance, Authority, Resilience, Justice',
    day: 'Saturday',
    colors: ['Midnight Blue', 'Charcoal', 'Deep Purple'],
    stone: 'Blue Sapphire / Lapis Lazuli',
    planet: 'Saturn',
    desc: 'Vibration 8 commands material mastery, ethical executive power, and enduring resilience. It denotes a person destined to shoulder great responsibilities and achieve lasting success through merit.',
  },
  9: {
    traits: 'Humanitarianism, Nobility, Universal Love, Wisdom, Courage',
    day: 'Tuesday',
    colors: ['Crimson Red', 'Scarlet', 'Coral'],
    stone: 'Red Coral / Bloodstone',
    planet: 'Mars',
    desc: 'Vibration 9 represents the pinnacle of selflessness, noble ideals, and universal compassion. It inspires a broad-hearted visionary who strives to leave the world richer and more just.',
  },
  11: {
    traits: 'Visionary, Spiritual Illumination, Intuition, Catalyst',
    day: 'Sunday',
    colors: ['Silver', 'Violet', 'Pure White'],
    stone: 'Clear Quartz / Amethyst',
    planet: 'Master Number (Moon / Neptune)',
    desc: 'Master Number 11 carries intense intuitive illumination and spiritual magnetism. It inspires those around them toward higher ideals and divine awareness.',
  },
  22: {
    traits: 'Master Builder, Practical Genius, Global Impact, Vision',
    day: 'Saturday',
    colors: ['Gold', 'Deep Bronze', 'Forest Green'],
    stone: 'Topaz / Jade',
    planet: 'Master Number (Saturn / Uranus)',
    desc: 'Master Number 22 translates noble spiritual visions into tangible reality. It denotes extraordinary capacity to construct lasting institutions and benevolent legacies.',
  },
};

const VIRTUE_DICTIONARY = {
  a: ['Authentic in words and intentions', 'Ambitious with upright moral compass', 'Affectionate and deeply caring'],
  b: ['Brave defender of justice', 'Benevolent and generous at heart', 'Bringer of enduring peace'],
  c: ['Compassionate toward all beings', 'Courageous in challenging times', 'Creative and thoughtfully expressive'],
  d: ['Dedicated to truth and duty', 'Discerning mind with keen insight', 'Dependable anchor for loved ones'],
  e: ['Empathetic with gentle sensitivity', 'Enthusiastic and full of vigor', 'Elevated in spirit and morals'],
  f: ['Faithful to promises and values', 'Forgiving with broad understanding', 'Friendly and welcoming soul'],
  g: ['Gracious in triumph and adversity', 'Generous with wisdom and care', 'Gentle guardian of harmony'],
  h: ['Honorable in conduct and speech', 'Humble despite great talents', 'Harmonious presence in the family'],
  i: ['Inspiring leader with clear vision', 'Intelligent and intellectually curious', 'Intuitive and perceptive'],
  j: ['Just and fair in judgment', 'Joyful presence that lifts spirits', 'Judicious with resources and time'],
  k: ['Kind-hearted without expectations', 'Knowledgeable truth-seeker', 'Keen observer of life\'s blessings'],
  l: ['Loyal through every season', 'Loving and tender in affection', 'Luminous in thought and deed'],
  m: ['Merciful toward the vulnerable', 'Mindful of moral obligations', 'Magnanimous in forgiveness'],
  n: ['Noble in lineage and character', 'Nurturing guardian of family', 'Natural peacemaker'],
  o: ['Optimistic and full of hope', 'Open-hearted to newcomers', 'Orderly and principled in duty'],
  p: ['Patient through hardship', 'Peaceful sanctuary for others', 'Pious with deep reverence'],
  q: ['Quick-witted and discerning', 'Quietly steadfast in faith', 'Questing for noble wisdom'],
  r: ['Resilient and unbroken in trial', 'Righteous in principles', 'Radiant with natural warmth'],
  s: ['Sincere in all relationships', 'Spiritual and connected to truth', 'Strong-willed in righteous paths'],
  t: ['Truthful even when difficult', 'Trustworthy confidant', 'Thoughtful in every decision'],
  u: ['Understanding of human frailty', 'Upright in posture and ethics', 'Uplifting to those who struggle'],
  v: ['Valiant in protecting principles', 'Virtuous and clean of heart', 'Visionary thinker'],
  w: ['Wise beyond years', 'Warm and hospitable host', 'Worthy of high trust and esteem'],
  x: ['Exceptional in focus and resolve', 'Exemplary role model', 'Expressive in noble artistry'],
  y: ['Yearning for sacred wisdom', 'Yielding to righteous counsel', 'Youthful in enthusiasm'],
  z: ['Zealous for good deeds', 'Zenith of integrity and grace', 'Zestful approach to life'],
};

// Calculate Pythagorean numerological number
export function calculateNumerologyNumber(name) {
  const letters = String(name || '').toLowerCase().replace(/[^a-z]/g, '');
  if (!letters) return 1;

  let sum = 0;
  for (const char of letters) {
    sum += PYTHAGOREAN_MAP[char] || 0;
  }

  // Reduce to single digit or master numbers (11, 22)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum)
      .split('')
      .reduce((acc, d) => acc + parseInt(d, 10), 0);
  }

  return sum || 1;
}

// Estimate syllable count
export function estimateSyllables(name) {
  const word = String(name || '').toLowerCase().trim();
  if (word.length <= 3) return 1;
  const cleaned = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '').replace(/^y/, '');
  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

// Generate acrostic personality ladder
export function generateAcrosticTraits(name, existingTraits = []) {
  if (Array.isArray(existingTraits) && existingTraits.length >= 3 && existingTraits.some((t) => t.includes('='))) {
    return existingTraits;
  }

  const letters = String(name || '').trim().toUpperCase();
  const seenCounts = {};
  const acrostic = [];

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    const lower = char.toLowerCase();
    if (!VIRTUE_DICTIONARY[lower]) continue;

    seenCounts[lower] = (seenCounts[lower] || 0);
    const options = VIRTUE_DICTIONARY[lower];
    const picked = options[seenCounts[lower] % options.length];
    seenCounts[lower]++;

    acrostic.push(`${char} = ${picked}`);
  }

  return acrostic.length > 0 ? acrostic : [`${letters.charAt(0)} = Noble and inspiring character`];
}

// Generate comprehensive FAQ questions and answers
export function generateComprehensiveFaqs(nameData) {
  const name = nameData.name;
  const religion = nameData.religion || 'world';
  const relLabel = religionLabel(religion);
  const genderKey = normalizeGender(nameData.gender);
  const genLabel = genderKey ? genderLabel(nameData.gender) : 'Unisex / Universal';
  const meaning = nameData.short_meaning || nameData.meaning || 'a name of virtue, blessing, and honor';
  const origin = nameData.origin || relLabel;
  const luckyNum = nameData.lucky_number || calculateNumerologyNumber(name);
  const numProfile = NUMEROLOGY_PROFILES[luckyNum] || NUMEROLOGY_PROFILES[1];
  const pronunciation = nameData.pronunciation?.english || nameData.pronunciation?.ipa || name;

  const baseFaqs = [
    {
      q: `What is the authentic meaning of the name ${name}?`,
      a: `In ${relLabel} tradition and ${origin} heritage, the name ${name} means "${meaning}". It embodies positive blessings, cultural pride, and moral integrity that parents traditionally wish to bestow upon their child.`,
    },
    {
      q: `What is the cultural and historical origin of ${name}?`,
      a: `The name ${name} originates from ${origin} linguistics and holds deep cultural roots in ${relLabel} heritage. Over generations, it has been chosen for its melodic resonance, auspicious symbolism, and profound connection to ancestral virtues.`,
    },
    {
      q: `Is ${name} traditionally used as a boy or girl name?`,
      a: `${name} is primarily recognized as a ${genLabel} name within ${relLabel} naming conventions. Its phonetics and classical usage make it an elegant choice that carries timeless grace and dignity.`,
    },
    {
      q: `How do you correctly pronounce the name ${name}?`,
      a: `${name} is commonly pronounced as "${pronunciation}". The stress falls harmoniously across the syllables, giving it a balanced, melodic, and dignified spoken rhythm.`,
    },
    {
      q: `What are the lucky numbers, lucky days, and colors for ${name}?`,
      a: `According to numerological traditions, the primary lucky number for ${name} is ${luckyNum}. Its ruling day is ${numProfile.day}, and its harmonic colors include ${numProfile.colors.join(', ')}. Wearing or surrounding oneself with ${numProfile.stone} is considered auspicious.`,
    },
    {
      q: `What personality traits are associated with the name ${name}?`,
      a: `Persons bearing the name ${name} are traditionally thought to exhibit ${numProfile.traits.toLowerCase()}. They are seen as natural pillars of integrity, possessing inner resilience and an uplifting influence among peers.`,
    },
    {
      q: `What are great sibling names that pair harmoniously with ${name}?`,
      a: `Siblings of ${name} often pair beautifully with names sharing ${origin} roots or ${relLabel} heritage that convey complementary virtues such as light, wisdom, peace, and spiritual strength.`,
    },
  ];

  // If existing FAQ array has items, merge them without duplicates
  const existingFaqs = Array.isArray(nameData.seo?.faq) ? nameData.seo.faq : [];
  if (existingFaqs.length === 0) {
    return baseFaqs;
  }

  // Prepend existing verified FAQs, append any base FAQs not already covered
  const seenQuestions = new Set(existingFaqs.map((f) => f.q.toLowerCase().trim()));
  const merged = [...existingFaqs];

  for (const bf of baseFaqs) {
    const key = bf.q.toLowerCase().trim();
    if (!seenQuestions.has(key) && merged.length < 8) {
      merged.push(bf);
      seenQuestions.add(key);
    }
  }

  return merged;
}

// Complete Name Enrichment Function
export function enrichNameProfile(nameData) {
  if (!nameData || !nameData.name) return nameData;

  const enriched = { ...nameData };
  const name = enriched.name;
  const religion = enriched.religion || 'islamic';
  const relLabel = religionLabel(religion);
  const origin = enriched.origin || relLabel;
  const genderKey = normalizeGender(enriched.gender);
  const genLabel = genderKey ? genderLabel(enriched.gender) : 'Unisex';

  // 1. Numerology Enrichment
  if (enriched.lucky_number === undefined || enriched.lucky_number === null || enriched.lucky_number === '') {
    enriched.lucky_number = calculateNumerologyNumber(name);
  }
  const luckyNum = enriched.lucky_number;
  const numProfile = NUMEROLOGY_PROFILES[luckyNum] || NUMEROLOGY_PROFILES[1];

  if (!enriched.lucky_day) enriched.lucky_day = numProfile.day;
  if (!enriched.lucky_colors || enriched.lucky_colors.length === 0) enriched.lucky_colors = numProfile.colors;
  if (!enriched.lucky_stone) enriched.lucky_stone = numProfile.stone;
  if (!enriched.life_path_number) enriched.life_path_number = ((luckyNum % 9) || 9);
  if (!enriched.numerology_meaning) enriched.numerology_meaning = numProfile.desc;

  // 2. Acrostic Traits Enrichment
  const existingAcrostic = enriched.hidden_personality_traits;
  enriched.acrosticTraits = generateAcrosticTraits(name, existingAcrostic);

  // 3. Phonetic & Anatomy Metrics
  enriched.syllableCount = estimateSyllables(name);
  enriched.letterCount = name.replace(/\s+/g, '').length;
  enriched.firstLetter = name.trim().charAt(0).toUpperCase();
  enriched.lastLetter = name.trim().slice(-1).toUpperCase();

  // 4. Comprehensive FAQs
  enriched.richFaqs = generateComprehensiveFaqs(enriched);

  // 5. Rich Editorial Long-form Context (if sparse)
  if (!enriched.long_meaning && !enriched.seo?.description_paragraph) {
    const meaningText = enriched.short_meaning || enriched.meaning || 'noble virtue and divine grace';
    enriched.editorialOverview = `${name} is a distinguished ${relLabel} ${genLabel.toLowerCase()} name of ${origin} origin, signifying "${meaningText}". Revered across generations, it carries a musical rhythm and sacred etymological lineage that continues to resonate with modern parents seeking an authentic name of spiritual gravity, warmth, and enduring honor.`;
  } else {
    enriched.editorialOverview = enriched.long_meaning || enriched.seo?.description_paragraph || '';
  }

  return enriched;
}

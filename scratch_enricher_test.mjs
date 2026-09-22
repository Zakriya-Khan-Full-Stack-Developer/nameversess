import { generateAcrosticTraits, enrichNameProfile } from './lib/data/name-enricher.js';

const traits = generateAcrosticTraits('Aaron');
console.log('Traits for Aaron:', traits);

const profile = enrichNameProfile({
  name: 'Aaron',
  slug: 'aaron',
  religion: 'christian',
  meaning: 'Mountain of strength'
});
console.log('Enriched Aaron acrosticTraits:', profile.acrosticTraits);

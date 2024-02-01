// Fetch bulk data from Scryfall API and filter for commander legal cards
// Download the Oracle cards JSON from https://scryfall.com/docs/api/bulk-data

const cardsData = require('./oraclecards.json');
const fs = require('fs');

const commanders = cardsData
  .filter(
    (card) =>
      (card.type_line.includes('Legendary') &&
        card.type_line.includes('Creature') &&
        card.legalities.commander === 'legal') ||
      (card.oracle_text?.includes('can be your commander') &&
        card.legalities.commander === 'legal')
  )
  .map((card) => {
    const smallImageUrl =
      card.image_uris?.small || card.card_faces?.[0].image_uris?.small;
    return {
      scryfallId: card.id,
      name: card.name,
      cmc: card.cmc,
      color_identity: card.color_identity,
      image_uris: { small: smallImageUrl },
    };
  });

// Convert to a JSON string
const dataToWrite = JSON.stringify(commanders, null, 2);

fs.writeFile('bulkCommanders.json', dataToWrite, 'utf-8', (err) => {
  if (err) {
    console.error('An error occurred writing bulkCommanders.json', err);
    return;
  }
  console.log('bulkCommanders.json has been written successfully!');
});

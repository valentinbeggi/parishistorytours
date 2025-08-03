// Exemple avec Google Places API
export async function GET() {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`
  );
  const data = await response.json();
  return new Response(JSON.stringify(data.result.reviews));
}

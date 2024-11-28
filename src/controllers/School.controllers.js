import { db } from "../db/dbConnection.js";
const addSchool = async (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  // Input validation
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

    // Promisify query for async/await support
    const insertSchool = () =>
      new Promise((resolve, reject) => {
        db.query(query, [name, address, latitude, longitude], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    

    const result = await insertSchool();
    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (err) {
    console.error("Error inserting school:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// List Schools Controller
export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Validate coordinates
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const query = 'SELECT id, name, address, latitude, longitude FROM schools';

    const getSchools = () =>
      new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

    const results = await getSchools();

    // Calculate distances and sort by proximity
    const sortedSchools = results
      .map(school => {
        const distance = getDistance(userLat, userLon, school.latitude, school.longitude);
        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(201).json({
      message: "School List fetched",
      data: sortedSchools,
    });
  } catch (err) {
    console.error('Error fetching schools:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Function to calculate distance using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export { addSchool };

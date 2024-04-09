import { Router } from 'express';

const router = Router();

// Get all clients
router.get('/', async (req, res) => {
  const [rows] = await req.db.query('SELECT * FROM Clients');
  res.json(rows);
});

// Get a single client by ID
router.get('/:id', async (req, res) => {
  const [rows] = await req.db.query('SELECT * FROM Clients WHERE id = ?', [req.params.id]);
  if (rows.length > 0) {
    res.json(rows[0]);
  } else {
    res.status(404).send('Client not found');
  }
});

// Add a new client
router.post('/', async (req, res) => {
  const { name, company, email, telephone, notes } = req.body;
  const [result] = await req.db.query('INSERT INTO Clients (name, company, email, telephone, notes) VALUES (?, ?, ?, ?, ?)', [name, company, email, telephone, notes]);
  res.status(201).send({ id: result.insertId, ...req.body });
});

// Update a client
router.put('/:id', async (req, res) => {
  const { name, company, email, telephone, notes } = req.body;
  await req.db.query('UPDATE Clients SET name = ?, company = ?, email = ?, telephone = ?, notes = ? WHERE id = ?', [name, company, email, telephone, notes, req.params.id]);
  res.send('Client updated successfully');
});

// Delete a client
router.delete('/:id', async (req, res) => {
  await req.db.query('DELETE FROM Clients WHERE id = ?', [req.params.id]);
  res.send('Client deleted successfully');
});

export default router;
